import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import React from "react";


// قائمة التحديات اليومية
const dailyChallenges = [
  { challenge: "ابتسم لشخص غريب اليوم 😊", motivation: "الابتسامة معدية وتزيد الإيجابية!" },
  { challenge: "اقرأ صفحة واحدة من كتاب 📖", motivation: "المعرفة قوة، حتى لو كانت صفحة واحدة!" },
  { challenge: "اشرب كوب ماء إضافي اليوم 💧", motivation: "الماء يحافظ على صحتك ونشاطك." },
  { challenge: "اكتب ٣ أشياء أنت ممتن لها اليوم ✍️", motivation: "الامتنان يجلب السعادة لحياتك!" },
  { challenge: "خذ نفسًا عميقًا ٥ مرات 🎐", motivation: "يساعد على تهدئة الأعصاب وتقليل التوتر." },
];

const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const [participationRate, setParticipationRate] = useState(0);

  // جلب التحدي اليومي مرة واحدة فقط وتخزينه
  const challenge = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedChallenge = localStorage.getItem("dailyChallenge");
    const savedDate = localStorage.getItem("challengeDate");

    if (savedChallenge && savedDate === today) {
      return JSON.parse(savedChallenge);
    } else {
      const newChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
      localStorage.setItem("dailyChallenge", JSON.stringify(newChallenge));
      localStorage.setItem("challengeDate", today);
      return newChallenge;
    }
  }, []);

  useEffect(() => {
    const savedCompletion = localStorage.getItem("challengeCompleted");
    setCompleted(savedCompletion === "true");

    // تقليل الحسابات العشوائية بحيث لا يتم تحديث المشاركة أكثر من اللازم
    setParticipationRate(prevRate => prevRate || Math.floor(Math.random() * 50) + 50);
  }, []);

  const handleComplete = useCallback(() => {
    setCompleted(true);
    localStorage.setItem("challengeCompleted", "true");
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl shadow-lg text-center max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-white">🎯 تحدي اليوم</h2>

      <motion.p
        className="text-lg font-semibold text-gray-900 bg-white p-4 rounded-md shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {challenge.challenge}
      </motion.p>

      <p className="mt-2 text-sm text-gray-200 italic">{challenge.motivation}</p>

      <p className="mt-3 text-white">📊 {participationRate}% من المستخدمين أكملوا التحدي اليوم!</p>

      {!completed ? (
        <button
          onClick={handleComplete}
          className="mt-4 bg-white text-green-600 font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          ✅ أتممت التحدي!
        </button>
      ) : (
        <p className="mt-4 text-lg text-yellow-300">🎉 رائع! لقد أنجزت التحدي اليوم!</p>
      )}
    </div>
  );
};

export default DailyChallenge;
