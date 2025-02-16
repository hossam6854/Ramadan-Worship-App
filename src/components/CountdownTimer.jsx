import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ar"; // استيراد اللغة العربية لـ moment
import React from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // دالة لتحديد الصيغة الصحيحة لكلمة "ساعة"
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
  
      // استخدام `\u202B` لضبط اتجاه النص عند عرض الأرقام
      const newTimeLeft = `\u202B${days} يوم ${hours} ${hourLabel} ${minutes} دقيقة ${seconds} ثانية`;
      
      if (newTimeLeft !== timeLeft) setTimeLeft(newTimeLeft);
  
      const newDate = now.locale("ar").format("dddd، D MMMM YYYY");
      if (newDate !== currentDate) setCurrentDate(newDate);
    };
  
    updateTime();
  
    const timerInterval = setInterval(updateTime, 1000);
  
    return () => clearInterval(timerInterval);
  }, [timeLeft, currentDate]);
  
  return (
    <div >
      <div >
        {/* العنوان الرئيسي */}
        <h1 className="text-4xl font-bold text-purple-800 mb-6">
          🕌 العدّاد التنازلي لرمضان
        </h1>

        {/* التاريخ */}
        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            📅 التاريخ اليوم:
          </p>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-lg font-medium text-purple-800">{currentDate}</p>
          </div>
        </div>

        {/* العدّاد التنازلي */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            ⏳ الوقت المتبقي لرمضان:
          </h2>
          <p className="text-4xl font-bold text-white">{timeLeft}</p>
        </div>

        {/* تذييل الصفحة */}
        <div className="mt-8 text-gray-600">
          <p>كل لحظة تقربنا من رمضان هي فرصة للتجديد الروحي.</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
