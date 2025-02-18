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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-6">
        <header className="flex justify-between items-center mb-6">
          

          <div className="flex space-x-4">
            <Link
              to="/quran"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="mr-2 h-4 w-4" /> القرآن الكريم
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              الرئيسية
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
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
