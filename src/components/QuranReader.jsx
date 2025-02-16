import { useEffect, useState } from "react";
import axios from "axios";
import { useQuran } from '../context/QuranContext';
import { Moon, Sun, BookmarkPlus, Type } from 'lucide-react';
import React from "react";
import ToastMessage from './ToastMessage';


const QuranReader = () => {
  const [ayahs, setAyahs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const {
    selectedSurah,
    darkMode,
    setDarkMode,
    fontSize,
    setFontSize,
    currentPage,
    setCurrentPage,
    addBookmark,
    updateReadingProgress
  } = useQuran();
  useEffect(() => {
    if (selectedSurah) {
      setLoading(true);
      axios
        .get(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}`)
        .then((res) => {
          setAyahs(res.data.data.ayahs);
          setTotalPages(Math.ceil(res.data.data.ayahs.length / 10));
          setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير السورة
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching Surah text", err);
          setLoading(false);
        });
    }
  }, [selectedSurah]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      updateReadingProgress(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateReadingProgress(currentPage - 1);
    }
  };

  const handleAddBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      surah: selectedSurah.name,
      page: currentPage,
      number: selectedSurah.number,
      ayah: ayahs[(currentPage - 1) * 10]?.numberInSurah
    };

    addBookmark(newBookmark);
    setToastMessage(`تمت إضافة إشارة مرجعية لسورة ${selectedSurah.name}، الصفحة ${currentPage}`);
    setShowToast(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl transition-colors duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setFontSize(prev => prev + 2)}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            <Type className="w-5 h-5" />+
          </button>
          <button
            onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            <Type className="w-5 h-5" />-
          </button>
        </div>
        <button
          onClick={handleAddBookmark}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <BookmarkPlus className="w-5 h-5" />
        </button>

        {showToast && (
          <ToastMessage
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>

      {/* عرض الآيات بجوار بعضها */}
      <div 
        className={` leading-relaxed text-right ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
        style={{ fontSize: `${fontSize}px` }}
      >
         {ayahs.slice((currentPage - 1) * 10, currentPage * 10).map((ayah) => (
          <span key={ayah.number} className="px-1 py-2 font-semibold">
            {ayah.text} <span className="text-gray-500">({ayah.number})</span>
          </span>
        ))}

      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          }`}
        >
          السابق
        </button>
        <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
          صفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          }`}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default QuranReader;