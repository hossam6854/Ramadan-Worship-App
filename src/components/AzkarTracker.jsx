import { useContext, useState, useEffect } from "react";
import { WorshipContext } from "../context/WorshipContext";
import { Sun, Moon, Star, Heart, Award, RefreshCw } from "lucide-react";
import React from "react";

const azkarCategories = {
  morning: {
    icon: <Sun className="w-6 h-6" />,
    title: "أذكار الصباح",
    time: "من طلوع الفجر إلى طلوع الشمس",
    items: [
      { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", count: 100 },
      {
        text: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        count: 3,
      },
      { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا", count: 1 },
      { text: "لا إله إلا الله وحده لا شريك له", count: 100 },
    ],
  },
  evening: {
    icon: <Moon className="w-6 h-6" />,
    title: "أذكار المساء",
    time: "من العصر إلى غروب الشمس",
    items: [
      { text: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", count: 3 },
      { text: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
      { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا", count: 1 },
      { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", count: 100 },
    ],
  },
  sleep: {
    icon: <Star className="w-6 h-6" />,
    title: "أذكار النوم",
    time: "قبل النوم",
    items: [
      { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", count: 1 },
      { text: "آية الكرسي", count: 1 },
      { text: "سورة الإخلاص والمعوذتين", count: 3 },
    ],
  },
  general: {
    icon: <Heart className="w-6 h-6" />,
    title: "أذكار عامة",
    time: "في أي وقت",
    items: [
      { text: "لا حول ولا قوة إلا بالله", count: 100 },
      { text: "الحمد لله", count: 33 },
      { text: "سبحان الله", count: 33 },
      { text: "الله أكبر", count: 33 },
    ],
  },
};

const AzkarTracker = () => {
  const { azkar, setAzkar } = useContext(WorshipContext);
  const [activeCategory, setActiveCategory] = useState("morning");
  const [progress, setProgress] = useState({});
  const [streaks, setStreaks] = useState(
    () => JSON.parse(localStorage.getItem("azkarStreaks")) || {}
  );

  useEffect(() => {
    localStorage.setItem("azkarStreaks", JSON.stringify(streaks));
  }, [streaks]);

  useEffect(() => {
    calculateProgress();
  }, [azkar]);

  const calculateProgress = () => {
    const newProgress = {};
    Object.keys(azkarCategories).forEach((category) => {
      const completed = Object.values(azkar[category] || {}).filter(
        Boolean
      ).length;
      const total = azkarCategories[category].items.length;
      newProgress[category] = (completed / total) * 100;
    });
    setProgress(newProgress);
  };

  const markZekr = (category, index) => {
    setAzkar((prev) => {
      const newAzkar = {
        ...prev,
        [category]: {
          ...(prev[category] || {}),
          [index]: !prev[category]?.[index],
        },
      };

      // Update streaks if category is completed
      const categoryCompleted = Object.values(newAzkar[category] || {}).every(
        Boolean
      );
      if (categoryCompleted) {
        setStreaks((prev) => ({
          ...prev,
          [category]: (prev[category] || 0) + 1,
        }));
      }

      return newAzkar;
    });
  };

  const resetCategory = (category) => {
    setAzkar((prev) => ({
      ...prev,
      [category]: {},
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl" dir="rtl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-6">
  {Object.entries(azkarCategories).map(([key, { icon, title }]) => (
    <button
      key={key}
      onClick={() => setActiveCategory(key)}
      className={`flex flex-col justify-center items-center gap-2 px-4 sm:px-5 py-3 rounded-lg cursor-pointer transition-all duration-300
        ${
          activeCategory === key
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md scale-100 md:scale-105"
            : "bg-white text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-100"
        }`}
    >
      <span className="text-2xl">{icon}</span> 
      <span className="text-base sm:text-lg font-medium">{title}</span> 
    </button>
  ))}
</div>


      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-row-reverse justify-between items-center mb-8">
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-800">
              {azkarCategories[activeCategory].title}
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              {azkarCategories[activeCategory].time}
            </p>
          </div>
          <div className="flex flex-row-reverse items-center gap-6">
            <div className="flex flex-row-reverse items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-lg">
                سلسلة: {streaks[activeCategory] || 0} يوم
              </span>
            </div>
            <button
              onClick={() => resetCategory(activeCategory)}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
              title="إعادة تعيين"
            >
              <RefreshCw className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mb-6 bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress[activeCategory] || 0}%` }}
          ></div>
        </div>

        <div className="space-y-6 ">
          {azkarCategories[activeCategory].items.map((item, index) => (
            <div
              key={index}
              className="flex flex-row-reverse justify-between items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex-1 text-right p-6">
                <p className="text-xl font-medium text-gray-800">{item.text}</p>
                <p className="text-sm text-gray-600 mt-2">
                  التكرار: {item.count} مرة
                </p>
              </div>
              <button
                onClick={() => markZekr(activeCategory, index)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  azkar[activeCategory]?.[index]
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                {azkar[activeCategory]?.[index] ? "✓ تم" : "إتمام"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AzkarTracker;
