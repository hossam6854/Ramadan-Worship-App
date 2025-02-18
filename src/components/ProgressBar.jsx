import { useContext, useMemo } from "react";
import { WorshipContext } from "../context/WorshipContext";
import { Award, Calendar } from "lucide-react";
import React from "react";

const ProgressBar = () => {
  const { prayers, missedPrayers, prayerHistory } = useContext(WorshipContext);

  const stats = useMemo(() => {
    const totalPrayers = 5;
    const completed = Object.values(prayers).filter(
      (prayer) => prayer.completed
    ).length;
    const missed = missedPrayers.length;
    const progress = (completed / totalPrayers) * 100;

    // Calculate streak from history
    let streak = 0;
    const history = [...prayerHistory].reverse();
    for (const day of history) {
      if (day.total === 5) {
        streak++;
      } else {
        break;
      }
    }

    return { completed, missed, progress, streak };
  }, [prayers, missedPrayers, prayerHistory]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8" dir="rtl">
      <div className="flex items-center gap-3 mb-4">
        <Award className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800 text-right">
          إحصائيات اليوم
        </h2>
      </div>

      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 right-0 h-full bg-green-500 transition-all duration-500"
          style={{ width: `${stats.progress}%` }}
        />
        {stats.missed > 0 && (
          <div
            className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
            style={{ width: `${(stats.missed / 5) * 100}%` }}
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4 text-right">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">الصلوات المكتملة</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-600">الصلوات الفائتة</p>
          <p className="text-2xl font-bold text-red-600">{stats.missed}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">نسبة الإكمال</p>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round(stats.progress)}%
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600">سلسلة الإكمال</p>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.streak} يوم
          </p>
        </div>
      </div>

      {stats.progress === 100 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-center">
          <p className="text-yellow-800 font-semibold">
            🎉 أحسنت! أكملت جميع صلوات اليوم
          </p>
        </div>
      )}

      {prayerHistory.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              سجل الصلوات السابقة
            </h3>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {[...prayerHistory].reverse().map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-600">{day.date}</span>
                <div className="flex gap-4">
                  <span className="text-green-600">تم: {day.total}</span>
                  <span className="text-red-600">فات: {day.missedCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
