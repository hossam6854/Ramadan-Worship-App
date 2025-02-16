import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

const QuranContext = createContext(null);

export const QuranProvider = ({ children }) => {
  const [selectedSurah, setSelectedSurah] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedSurah');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('fontSize');
      return saved ? JSON.parse(saved) : 18;
    } catch {
      return 18;
    }
  });

  const [currentPage, setCurrentPage] = useState(1); // يتم تصفيره عند تغيير السورة

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [readingProgress, setReadingProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('readingProgress');
      return saved ? JSON.parse(saved) : { totalPages: 604, currentPage: 1 };
    } catch {
      return { totalPages: 604, currentPage: 1 };
    }
  });

  const [showBookmarks, setShowBookmarks] = useState(false);

  const [debouncedDarkMode] = useDebounce(darkMode, 1000);
  const [debouncedFontSize] = useDebounce(fontSize, 1000);
  const [debouncedBookmarks] = useDebounce(bookmarks, 1000);
  const [debouncedReadingProgress] = useDebounce(readingProgress, 1000);

  const addBookmark = useCallback((bookmark) => {
    setBookmarks(prev => [...prev, bookmark]);
  }, []);

  const removeBookmark = useCallback((id) => {
    const isConfirmed = confirm('Are you sure you want to remove this bookmark?');
    if (!isConfirmed) return;

    setBookmarks(prev => prev.filter(b => b.id !== id));
}, []);


  const updateReadingProgress = useCallback((page) => {
    setReadingProgress(prev => ({
      ...prev,
      currentPage: page,
      percentage: Math.round((page / prev.totalPages) * 100)
    }));
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      setCurrentPage(1); // تصفير الصفحة عند تغيير السورة
    }
  }, [selectedSurah]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(debouncedDarkMode));
    if (debouncedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [debouncedDarkMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', JSON.stringify(debouncedFontSize));
  }, [debouncedFontSize]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(debouncedBookmarks));
  }, [debouncedBookmarks]);

  useEffect(() => {
    localStorage.setItem('readingProgress', JSON.stringify(debouncedReadingProgress));
  }, [debouncedReadingProgress]);

  return (
    <QuranContext.Provider
      value={{
        selectedSurah,
        setSelectedSurah,
        darkMode,
        setDarkMode,
        fontSize,
        setFontSize,
        currentPage,
        setCurrentPage,
        bookmarks,
        addBookmark,
        removeBookmark,
        readingProgress,
        updateReadingProgress,
        showBookmarks,
        setShowBookmarks
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = () => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
