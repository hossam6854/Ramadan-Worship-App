import { useEffect, useState } from "react";
import axios from "axios";
import { useQuran } from "../context/QuranContext";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const removeDiacritics = (text) => {
  return text.normalize("NFD").replace(/[\u064B-\u065F]/g, "");
};

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const { setSelectedSurah, darkMode, selectedSurah } = useQuran();


  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((res) => {
        setSurahs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Surah list", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search) {
      setIsListVisible(true);
    }
  }, [search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const filteredSurahs = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(search) ||
      removeDiacritics(s.name).includes(search) ||
      s.number.toString().includes(search)
  );

  return (
    <div
      className={`p-4 rounded-xl transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="... ابحث عن سورة"
          className={`w-full pr-10 pl-4 py-2 rounded-lg outline-none transition-colors text-right ${
            darkMode
              ? "bg-gray-800 text-white placeholder-gray-500 border-gray-700"
              : "bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200"
          } border`}
          onChange={(e) =>
            setSearch(removeDiacritics(e.target.value.toLowerCase()))
          }
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      <button
        onClick={() => setIsListVisible(!isListVisible)}
        className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <span>{isListVisible ? <ChevronUp /> : <ChevronDown />}</span>
        <div className="text-right">
          <h3 className="font-bold">
            {selectedSurah ? selectedSurah.name : "اختر سورة"}
          </h3>
          {selectedSurah && (
            <p>
              {selectedSurah.englishName} • {selectedSurah.numberOfAyahs} آية
            </p>
          )}
        </div>
      </button>

      {(isListVisible || search) && (
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => {
                setSelectedSurah(surah);
                setSearch("");
                setIsListVisible(false);
              }}
              className={`w-full text-right p-3 rounded-lg mb-2 transition-colors cursor-pointer ${
                darkMode
                  ? "hover:bg-gray-800 focus:bg-gray-800"
                  : "hover:bg-gray-100 focus:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-75">#{surah.number}</span>
                <div>
                  <h3 className="font-bold">{surah.name}</h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {surah.englishName} • {surah.numberOfAyahs} آية
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurahList;
