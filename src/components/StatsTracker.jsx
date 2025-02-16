import { useState } from "react";
import React from "react";

const StatsTracker = () => {
  const [stats, setStats] = useState({ prayer: 0, fasting: 0, zikr: 0 });
    
  return (
    <div className="bg-green-200 p-4 rounded-xl">
      <h2 className="text-lg font-semibold">إحصائيات العبادات</h2>
      <p>الصلاة: {stats.prayer}</p>
      <p>الصيام: {stats.fasting}</p>
      <p>الأذكار: {stats.zikr}</p>
    </div>
  );
};

export default StatsTracker;
