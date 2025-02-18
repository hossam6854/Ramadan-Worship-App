import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import React from "react";
import { FaSun, FaMoon, FaCloudSun, FaCloudMoon, FaClock } from "react-icons/fa";


  
const PrayerTimes = () => {
  const [prayers, setPrayers] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [loading, setLoading] = useState(true);


  const prayerNames = useMemo(() => ({
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  }), []);

  
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0]; // الحصول على التاريخ الحالي بصيغة YYYY-MM-DD
        let cachedData = localStorage.getItem("prayerTimes");
        let cachedDate = localStorage.getItem("prayerTimesDate");
  
        if (cachedData && cachedDate === today) {
          setPrayers(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5");
          setPrayers(response.data.data.timings);
          localStorage.setItem("prayerTimes", JSON.stringify(response.data.data.timings));
          localStorage.setItem("prayerTimesDate", today); // حفظ التاريخ الحالي
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching prayer times", err);
        setLoading(false);
      }
    };
  
    fetchPrayerTimes();
  
    // تحديد وقت منتصف الليل للتحقق من التحديثات
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // ضبط الوقت إلى منتصف الليل
    const timeUntilMidnight = midnight - now;
  
    // جدولة التحقق من التحديثات في منتصف الليل
    const midnightUpdate = setTimeout(() => {
      fetchPrayerTimes();
    }, timeUntilMidnight);
  
    // تنظيف الـ timeout عند إلغاء التثبيت
    return () => clearTimeout(midnightUpdate);
  }, []);



  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    const interval = setTimeout(updateTime, 1000);
    return () => clearTimeout(interval);
  }, [currentTime]);

  useEffect(() => {
    if (!Object.keys(prayers).length) return;
  
    const prayerTimes = Object.entries(prayers)
      .filter(([key]) => prayerNames[key])
      .map(([key, time]) => {
        const [hour, minute] = time.split(":").map(Number);
        const prayerTime = new Date();
        prayerTime.setHours(hour, minute, 0, 0);
        
        // إذا كانت الصلاة هي الفجر، اجعلها في اليوم التالي عند الحاجة
        if (key === "Fajr" && prayerTime < currentTime) {
          prayerTime.setDate(prayerTime.getDate() + 1);
        }
  
        return { name: prayerNames[key], time, key, prayerTime };
      });
  
    const now = new Date();
    let upcomingPrayer = null;
    let minDiff = Number.MAX_SAFE_INTEGER;
  
    prayerTimes.forEach((prayer) => {
      const diff = prayer.prayerTime - now;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        upcomingPrayer = prayer;
      }
    });
  
    if (upcomingPrayer) {
      setNextPrayer(upcomingPrayer);
      const updateRemainingTime = () => {
        const now = new Date();
        const diff = upcomingPrayer.prayerTime - now;
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setRemainingTime(
            hours > 10 ? `${hours} ساعة${minutes} دقيقة` :
            hours >= 3 ? `${hours} ساعات${minutes} دقيقة` :
            hours > 0 ? `${hours} ساعة${minutes} دقيقة` :
            minutes > 0 ? `${minutes} دقائق` :
            "الآن"
          );
        } else {
          setRemainingTime("الآن");
        }
      };
  
      updateRemainingTime();
      const interval = setTimeout(updateRemainingTime, 1000);
      return () => clearTimeout(interval);
    }
  }, [prayers, currentTime, prayerNames]);
  


  const getPrayerIcon = (key) => {
    switch (key) {
      case "Fajr":
        return <FaCloudMoon className="text-blue-500" />;
      case "Sunrise":
        return <FaSun className="text-yellow-500" />;
      case "Dhuhr":
        return <FaCloudSun className="text-orange-500" />;
      case "Asr":
        return <FaSun className="text-red-500" />;
      case "Maghrib":
        return <FaCloudMoon className="text-purple-500" />;
      case "Isha":
        return <FaMoon className="text-indigo-500" />;
      default:
        return <FaClock />;
    }
  };

  return (
    <div >
      <div >
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">🕌 أوقات الصلاة</h1>

        {loading ? (
          <p className="text-lg font-semibold text-gray-700 text-center">⏳ ...جاري تحميل أوقات الصلاة</p>
        ) : (
          <>
            <div className="bg-gray-200 p-3 rounded-xl mb-4 ">
              <p className="text-xl font-semibold text-gray-800 text-center">
                ⏰ الوقت الآن: {currentTime.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </p>
            </div>

            {nextPrayer && (
              <div className="bg-green-200 p-4 rounded-xl shadow-md mb-4">
                <p className="text-lg font-bold text-green-800 text-center">🕰️ الصلاة القادمة: {nextPrayer.name} بعد {remainingTime}</p>
              </div>
            )}

            <ul className="space-y-4 ">
              {Object.entries(prayers)
                .filter(([key]) => prayerNames[key])
                .map(([key, value]) => (
                  <li
                    key={key}
                    className="flex items-center justify-between bg-indigo-100 p-3 rounded-xl shadow-sm "
                  >
                    <span className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
                      {getPrayerIcon(key)}
                      {prayerNames[key]}
                    </span>
                    <span className="text-lg font-bold text-gray-900 ">{value}</span>
                  </li>
                ))}
            </ul>

            {/* ملاحظة */}
            <div className="mt-6 text-gray-600 text-right">
              <p>✨ اللهم اجعلنا من المحافظين على الصلاة 🙏</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrayerTimes;
