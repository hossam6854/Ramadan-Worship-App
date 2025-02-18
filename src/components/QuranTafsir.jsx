import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuran } from "../context/QuranContext";
import { ChevronDown, ChevronUp, Play, Pause, X } from "lucide-react";
import { motion } from "framer-motion";

const scholars = [
  { id: "1", name: "تفسير الميسر" },
  { id: "2", name: "تفسير الجلالين" },
  { id: "8", name: "تفسير الطبري" },
  { id: "7", name: "تفسير القرطبي" },
  { id: "4", name: "تفسير ابن كثير" },
];

const QuranTafsir = ({ ayahNumberInSurah, ayahNumber, onClose }) => {
  const [tafsir, setTafsir] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedScholar, setSelectedScholar] = useState(scholars[0]);
  const [isExpanded, setIsExpanded] = useState(true);
  const { selectedSurah, darkMode } = useQuran();
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchTafsir = async () => {
      if (!selectedSurah?.number || !ayahNumberInSurah || !isExpanded) return;
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `http://api.quran-tafseer.com/tafseer/${selectedScholar.id}/${selectedSurah.number}/${ayahNumberInSurah}`,
          { cancelToken: source.token }
        );
        setTafsir(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching tafsir", err);
          setError("فشل في جلب التفسير. يرجى المحاولة مرة أخرى لاحقًا.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTafsir();

    return () => {
      source.cancel("تم إلغاء الطلب بسبب تغيير الآية أو المفسر.");
    };
  }, [selectedSurah, ayahNumberInSurah, selectedScholar, isExpanded]);

  useEffect(() => {
    if (!ayahNumber) return;
    setAudioSrc(
      `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`
    );
  }, [ayahNumber]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [ayahNumber]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!ayahNumber || !ayahNumberInSurah) return null;

  return (
    <div
      className={`mt-6 p-5 rounded-xl shadow-lg transition-all ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-2 text-lg font-semibold border-b border-gray-300 hover:text-blue-500 transition-all"
        >
          التفسير
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {/* زر الإغلاق */}
        <button
          onClick={onClose} // استدعاء دالة الإغلاق
          className="p-2 ml-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <div className="flex flex-row-reverse gap-2">
              {scholars.map((scholar) => (
                <button
                  key={scholar.id}
                  onClick={() => setSelectedScholar(scholar)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all shadow-md ${
                    selectedScholar.id === scholar.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {scholar.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : (
            <div className="text-right leading-loose text-lg">
              {tafsir.text}
            </div>
          )}

          {audioSrc && (
            <div className="mt-6 flex items-center justify-center">
              <audio ref={audioRef} src={audioSrc} />
              <button
                onClick={toggleAudio}
                className={`px-5 py-2 rounded-full flex items-center gap-2 text-lg font-medium transition-all shadow-md ${
                  isPlaying
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    : "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                }`}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isPlaying ? "إيقاف" : "تشغيل"}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default QuranTafsir;