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
      { text: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3 },
      { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا", count: 1 },
      { text: "لا إله إلا الله وحده لا شريك له", count: 100 },
    ]
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
    ]
  },
  sleep: {
    icon: <Star className="w-6 h-6" />,
    title: "أذكار النوم",
    time: "قبل النوم",
    items: [
      { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", count: 1 },
      { text: "آية الكرسي", count: 1 },
      { text: "سورة الإخلاص والمعوذتين", count: 3 },
    ]
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
    ]
  }
};

const AzkarTracker = () => {
  const { azkar, setAzkar } = useContext(WorshipContext);
  const [activeCategory, setActiveCategory] = useState("morning");
  const [progress, setProgress] = useState({});
  const [streaks, setStreaks] = useState(() => 
    JSON.parse(localStorage.getItem("azkarStreaks")) || {}
  );

  useEffect(() => {
    localStorage.setItem("azkarStreaks", JSON.stringify(streaks));
  }, [streaks]);

  useEffect(() => {
    calculateProgress();
  }, [azkar]);

  const calculateProgress = () => {
    const newProgress = {};
    Object.keys(azkarCategories).forEach(category => {
      const completed = Object.values(azkar[category] || {}).filter(Boolean).length;
      const total = azkarCategories[category].items.length;
      newProgress[category] = (completed / total) * 100;
    });
    setProgress(newProgress);
  };

  const markZekr = (category, index) => {
    setAzkar(prev => {
      const newAzkar = {
        ...prev,
        [category]: { ...(prev[category] || {}), [index]: !(prev[category]?.[index]) }
      };

      // Update streaks if category is completed
      const categoryCompleted = Object.values(newAzkar[category] || {}).every(Boolean);
      if (categoryCompleted) {
        setStreaks(prev => ({
          ...prev,
          [category]: (prev[category] || 0) + 1
        }));
      }

      return newAzkar;
    });
  };

  const resetCategory = (category) => {
    setAzkar(prev => ({
      ...prev,
      [category]: {}
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(azkarCategories).map(([key, { icon, title }]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeCategory === key
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 shadow hover:shadow-md"
            }`}
          >
            {icon}
            <span>{title}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {azkarCategories[activeCategory].title}
            </h2>
            <p className="text-gray-600 mt-1">
              {azkarCategories[activeCategory].time}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">
                سلسلة: {streaks[activeCategory] || 0} يوم
              </span>
            </div>
            <button
              onClick={() => resetCategory(activeCategory)}
              className="p-2 rounded-full hover:bg-gray-100"
              title="إعادة تعيين"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mb-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress[activeCategory] || 0}%` }}
          ></div>
        </div>

        <div className="space-y-4">
          {azkarCategories[activeCategory].items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-800">{item.text}</p>
                <p className="text-sm text-gray-600">التكرار: {item.count} مرة</p>
              </div>
              <button
                onClick={() => markZekr(activeCategory, index)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  azkar[activeCategory]?.[index]
                    ? "bg-green-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
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