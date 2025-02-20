import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ar";
import React from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const getHourLabel = (hours) => {
    if (hours > 10) return "ساعة";
    if (hours >= 3) return "ساعات";
    return "ساعة";
  };

  useEffect(() => {
    const ramadanStart = moment("2025-03-01", "YYYY-MM-DD");

    const updateTime = () => {
      const now = moment();
      const diff = ramadanStart.diff(now);
      const duration = moment.duration(diff);

      const totalHours = Math.floor(duration.asHours());
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      const hourLabel = getHourLabel(hours);

      const newTimeLeft = `\u202B${days} يوم ${hours} ${hourLabel} ${minutes} دقيقة ${seconds} ثانية`;

      if (newTimeLeft !== timeLeft) setTimeLeft(newTimeLeft);
    };

    updateTime();

    const timerInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  useEffect(() => {
    const updateDate = () => {
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const newDate = new Date().toLocaleDateString("ar-EG", options);
      setCurrentDate(newDate);
    };

    updateDate(); // تحديث التاريخ عند التحميل
    const interval = setInterval(updateDate, 60 * 60 * 1000); // تحديث كل ساعة

    return () => clearInterval(interval); // تنظيف التحديث عند إزالة المكون
  }, []);

  return (
    <div>
      <div>
        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-700 mb-2 text-right">
            📅 التاريخ اليوم
          </p>
          <div className="bg-purple-100 p-4 rounded-lg text-right">
            <p className="text-lg font-medium text-purple-800">{currentDate}</p>
          </div>
        </div>

        {/* العدّاد التنازلي */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4 text-right">
            ⏳ الوقت المتبقي لرمضان
          </h2>
          <p className="text-4xl font-bold text-white text-right">{timeLeft}</p>
        </div>

        {/* تذييل الصفحة */}
        <div className="mt-8 text-gray-600 text-right">
          <p>كل لحظة تقربنا من رمضان هي فرصة للتجديد الروحي.</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
