import React from "react";
import { useQuran } from "../context/QuranContext";
import { Bookmark, X, ArrowLeft } from "lucide-react";

const BookmarksList = () => {
  const {
    bookmarks,
    removeBookmark,
    setSelectedSurah,
    setShowBookmarks,
    darkMode,
  } = useQuran();

  const handleBookmarkClick = (bookmark) => {
    fetch(`https://api.alquran.cloud/v1/surah/${bookmark.number}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedSurah(data.data);
        setShowBookmarks(false);
      })
      .catch((err) => console.error("Error loading surah:", err));
  };

  return (
    <div
      className={`p-4 rounded-xl transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowBookmarks(false)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-400 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold flex items-center gap-2 text-right">
          <Bookmark className="w-5 h-5" />
          الإشارات المرجعية
        </h2>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className=" text-center">لم تقم بإضافة أي إشارات مرجعية بعد</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto cursor-pointer">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className={`flex items-center justify-between p-4 dark:bg-gray-200 rounded-lg  cursor-pointer dark:hover:bg-gray-600 transition-colors ${
                darkMode
                  ? "bg-gray-50 dark:bg-gray-700"
                  : "bg-white text-gray-900"
              }`}
            >
              <button
                onClick={() => handleBookmarkClick(bookmark)}
                className="flex-1 text-right"
              >
                <h3 className="font-bold cursor-pointer">{bookmark.surah}</h3>
                <p className="text-sm  cursor-pointer">
                  صفحة {bookmark.page} • آية {bookmark.ayah}
                </p>
              </button>
              <button
                onClick={() => removeBookmark(bookmark.id)}
                className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksList;
