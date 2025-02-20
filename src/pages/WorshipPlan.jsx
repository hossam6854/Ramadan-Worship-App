import { WorshipProvider } from "../context/WorshipContext";
import PrayerTracker from "../components/PrayerTracker";
import AzkarTracker from "../components/AzkarTracker";
import ProgressBar from "../components/ProgressBar";
import { Home as HomeIcon, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

function Worship() {
  
  return (
    <WorshipProvider>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10  px-6">
    <header className="flex flex-wrap justify-between items-center mb-8 gap-4 sm:gap-6">
  <div className="flex flex-wrap items-center gap-2 sm:gap-4 order-1 md:order-2">
    <Link
      to="/quran"
      className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <BookOpen className="mr-1 sm:mr-2 h-4 w-4" />
      القرآن الكريم
    </Link>

    <Link
      to="/"
      className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <HomeIcon className="mr-1 sm:mr-2 h-4 w-4" />
      الرئيسية
    </Link>
  </div>
  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold w-full text-center md:w-auto md:text-right">
    🕌 العبادات اليومية
  </h1>
</header>
        <PrayerTracker />
        <ProgressBar />
        <AzkarTracker />
      </div>
    </WorshipProvider>
  );
}

export default Worship;
