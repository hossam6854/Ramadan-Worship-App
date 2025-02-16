import { useContext, useEffect, useState, useCallback } from "react";
import { WorshipContext } from "../context/WorshipContext";
import { format, formatDistanceToNow, parseISO, set } from "date-fns";
import { ar } from "date-fns/locale";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import React from "react";

const PrayerTracker = () => {
  const {
    prayers,
    setPrayers,
    missedPrayers,
    nextPrayer,
    prayerTimes,
    isPrayerTimePassed,
    loading,
    error
  } = useContext(WorshipContext);

  const [message, setMessage] = useState({ text: "", type: "" });
  const [timeToNext, setTimeToNext] = useState("");

  const prayerNames = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
  };

  const updateTimeToNext = useCallback(() => {
    if (nextPrayer && prayerTimes[nextPrayer]) {
      const now = new Date();
      const [hours, minutes] = prayerTimes[nextPrayer].split(':');
      
      // Create prayer time for today
      const nextTime = set(now, {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: 0,
        milliseconds: 0
      });

      // If prayer time has passed for today, add one day
      if (nextTime < now) {
        nextTime.setDate(nextTime.getDate() + 1);
      }

      const distance = formatDistanceToNow(nextTime, { 
        locale: ar,
        addSuffix: false
      });
      setTimeToNext(distance);
    }
  }, [nextPrayer, prayerTimes]);

  useEffect(() => {
    updateTimeToNext();
    const interval = setInterval(updateTimeToNext, 1000);
    return () => clearInterval(interval);
  }, [updateTimeToNext]);

  const markPrayer = async (prayer) => {
    if (!isPrayerTimePassed(prayer)) {
      setMessage({
        text: "لا يمكن إتمام الصلاة قبل موعدها",
        type: "error"
      });
      return;
    }

    const now = new Date();
    setPrayers((prev) => ({
      ...prev,
      [prayer]: {
        completed: true,
        time: format(now, "HH:mm"),
        date: format(now, "yyyy-MM-dd")
      }
    }));

    setMessage({
      text: "تقبل الله! أتممت الصلاة بنجاح 🌟",
      type: "success"
    });
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">متابعة الصلاة</h1>
      
      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(prayerTimes).map(([prayer, time]) => (
          <div
            key={prayer}
            className={`p-6 rounded-xl shadow-lg transition-all ${
              prayers[prayer]?.completed
                ? "bg-green-50 border border-green-200"
                : missedPrayers.includes(prayer)
                ? "bg-red-50 border border-red-200"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{prayerNames[prayer]}</h3>
              <span className="text-gray-600">{time}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {prayers[prayer]?.completed
                  ? `تم الأداء: ${prayers[prayer].time}`
                  : missedPrayers.includes(prayer)
                  ? "فائتة"
                  : "لم يحن الوقت بعد"}
              </span>
              <button
                onClick={() => markPrayer(prayer)}
                disabled={!isPrayerTimePassed(prayer)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  prayers[prayer]?.completed
                    ? "bg-green-500 text-white"
                    : isPrayerTimePassed(prayer)
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {prayers[prayer]?.completed ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    تم
                  </span>
                ) : (
                  "إتمام"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {nextPrayer && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="text-xl font-bold text-blue-800">
                الصلاة القادمة: {prayerNames[nextPrayer]}
              </h2>
              <p className="text-blue-600 mt-1">
                متبقي: {timeToNext}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTracker;