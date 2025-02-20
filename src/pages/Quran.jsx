import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Landmark, BookmarkIcon } from "lucide-react";
import SurahList from "../components/QuranSurahList";
import QuranReader from "../components/QuranReader";
import QuranAudio from "../components/QuranAudio";
import BookmarksList from "../components/BookmarksList";
import { useQuran } from "../context/QuranContext";

function QuranApp() {
  const { selectedSurah, showBookmarks, setShowBookmarks } = useQuran();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-2 px-2">
      <div className="container mx-auto px-4 py-8">
      <header className="flex flex-wrap justify-between items-center mb-8 gap-4 sm:gap-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 order-1 md:order-2">
      <Link
      to="/worship"
      className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <Landmark className="mr-1 sm:mr-2 h-4 w-4" />
      العبادات اليومية
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
    📖 القرآن الكريم
  </h1>
</header>


        <div className="text-center mb-6">
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <BookmarkIcon className="mr-2 h-4 w-4" />
            الإشارات المرجعية
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div >
            {showBookmarks ? <BookmarksList /> : <SurahList />}
          </div>

          {selectedSurah ? (
            <div className="lg:col-span-2 space-y-8">
              <QuranReader />
              <QuranAudio />
            </div>
          ) : (
            <div className="lg:col-span-2 flex items-center justify-center h-[calc(100vh-12rem)]">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  اختر سورة للبدء في القراءة
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  يمكنك البحث عن السورة باسمها أو رقمها من القائمة
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuranApp;
