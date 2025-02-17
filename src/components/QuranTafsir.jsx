import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuran } from '../context/QuranContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const scholars = [
    { id: 'arabic_muyassar', name: 'تفسير الميسر' },
    { id: 'arabic_jalalayn', name: 'تفسير الجلالين' },
    { id: 'arabic_tabari', name: 'تفسير الطبري' },
];

const QuranTafsir = ({ ayahNumber }) => {
  const [tafsir, setTafsir] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedScholar, setSelectedScholar] = useState(scholars[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedSurah, darkMode } = useQuran();

  useEffect(() => {
    if (!selectedSurah?.number || !ayahNumber || !isExpanded) return;

    setLoading(true);
    setError(null);

    axios
      .get(`https://quranenc.com/api/v1/translation/tafsir/${selectedScholar.id}/${selectedSurah.number}/${ayahNumber}`)
      .then((res) => {
        if (res.data.result && res.data.result.translation) {
          setTafsir(res.data.result.translation);
        } else {
          setError('لا يوجد تفسير متاح لهذه الآية.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tafsir", err);
        setError('فشل في جلب التفسير. يرجى المحاولة مرة أخرى لاحقًا.');
        setLoading(false);
      });
  }, [selectedSurah, ayahNumber, selectedScholar, isExpanded]);

  if (!ayahNumber) return null;

  return (
    <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          التفسير
        </span>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <div className="mt-4">
          <div className="flex gap-2 mb-4">
            {scholars.map((scholar) => (
              <button
                key={scholar.id}
                onClick={() => setSelectedScholar(scholar)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedScholar.id === scholar.id
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {scholar.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className={`text-center py-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </div>
          ) : (
            <div className={`text-right leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {tafsir.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuranTafsir;