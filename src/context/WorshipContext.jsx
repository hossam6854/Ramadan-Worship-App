import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { format, set, isToday, startOfDay, endOfDay } from "date-fns";
import { useDebounce } from "use-debounce";
import React from "react";

export const WorshipContext = createContext(null);

export const WorshipProvider = ({ children }) => {
  // Current prayers state
  const [prayers, setPrayers] = useState(() => {
    const stored = localStorage.getItem("currentPrayers");
    return stored ? JSON.parse(stored) : {};
  });

  // Prayer history state
  const [prayerHistory, setPrayerHistory] = useState(() => {
    const stored = localStorage.getItem("prayerHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const [azkar, setAzkar] = useState(() => {
    const stored = localStorage.getItem("azkar");
    return stored ? JSON.parse(stored) : {};
  });

  const [missedPrayers, setMissedPrayers] = useState([]);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [debouncedPrayers] = useDebounce(prayers, 1000);
  const [debouncedAzkar] = useDebounce(azkar, 1000);

  // Function to save daily statistics
  const saveDailyStatistics = useCallback(() => {
    const date = format(new Date(), "yyyy-MM-dd");
    const completedPrayers = Object.entries(prayers)
      .filter(([_, prayer]) => prayer.completed)
      .map(([name]) => name);
    const missedPrayersList = [...missedPrayers];

    setPrayerHistory(prev => {
      const newHistory = [...prev, {
        date,
        completed: completedPrayers,
        missed: missedPrayersList,
        total: completedPrayers.length,
        missedCount: missedPrayersList.length
      }];
      
      // Keep only last 30 days of history
      if (newHistory.length > 30) {
        newHistory.shift();
      }
      
      localStorage.setItem("prayerHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  }, [prayers, missedPrayers]);

  // Function to reset prayers at midnight
  const resetPrayers = useCallback(() => {
    // Save statistics before reset
    saveDailyStatistics();
    
    // Reset prayers
    const emptyPrayers = {};
    setPrayers(emptyPrayers);
    localStorage.setItem("currentPrayers", JSON.stringify(emptyPrayers));
    
    // Reset missed prayers
    setMissedPrayers([]);
  }, [saveDailyStatistics]);

  // Check for midnight reset
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetPrayers();
      }
    };

    const interval = setInterval(checkMidnight, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [resetPrayers]);

  const fetchPrayerTimes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
        params: {
          city: "Cairo",
          country: "EG",
          method: 2,
          date: format(new Date(), "dd-MM-yyyy"),
        },
      });

      const timings = response.data.data.timings;
      const formattedTimes = {
        fajr: timings.Fajr,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha,
      };

      setPrayerTimes(formattedTimes);
    } catch (err) {
      setError("Failed to fetch prayer times. Please try again later.");
      console.error("Error fetching prayer times:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  useEffect(() => {
    localStorage.setItem("currentPrayers", JSON.stringify(debouncedPrayers));
  }, [debouncedPrayers]);

  useEffect(() => {
    localStorage.setItem("azkar", JSON.stringify(debouncedAzkar));
  }, [debouncedAzkar]);

  const isPrayerTimePassed = useCallback(
    (prayer) => {
      if (!prayerTimes[prayer]) return false;
      const now = new Date();
      const [hours, minutes] = prayerTimes[prayer].split(":");
      const prayerTime = set(now, {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: 0,
        milliseconds: 0,
      });
      return now >= prayerTime;
    },
    [prayerTimes]
  );

  const updatePrayerStatus = useCallback(() => {
    const now = new Date();
    const missed = [];
    let next = null;

    Object.entries(prayerTimes).forEach(([prayer, time]) => {
      const [hours, minutes] = time.split(":");
      const prayerTime = set(now, {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: 0,
        milliseconds: 0,
      });

      if (now > prayerTime && !prayers[prayer]?.completed) {
        missed.push(prayer);
      } else if (now < prayerTime && !prayers[prayer]?.completed) {
        if (!next || prayerTimes[next] > time) {
          next = prayer;
        }
      }
    });

    setMissedPrayers(missed);
    setNextPrayer(next);
  }, [prayers, prayerTimes]);

  useEffect(() => {
    updatePrayerStatus();
    const interval = setInterval(updatePrayerStatus, 60000);
    return () => clearInterval(interval);
  }, [updatePrayerStatus]);

  return (
    <WorshipContext.Provider
      value={{
        prayers,
        setPrayers,
        azkar,
        setAzkar,
        missedPrayers,
        nextPrayer,
        prayerTimes,
        isPrayerTimePassed,
        loading,
        error,
        prayerHistory
      }}
    >
      {children}
    </WorshipContext.Provider>
  );
};