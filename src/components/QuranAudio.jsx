import { useEffect, useRef, useState } from "react";
import { useQuran } from "../context/QuranContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ListMusic,
  Plus,
  VolumeX,
} from "lucide-react";

import React from "react";

const RECITERS = [
  { id: "ar.alafasy", name: "مشاري العفاسي" },
  { id: "ar.abdulbasitmurattal", name: "عبدالباسط عبدالصمد" },
  { id: "ar.muhammadsiddiqalminshawimujawwad", name: "محمد صديق المنشاوي" },
  { id: "ar.saudalshuraim", name: "سعود الشريم" },
  { id: "ar.aliabdurrahmanalhuthaifyqaloon", name: "علي عبد الرحمن الحذيفي" },
  { id: "ar.yasseraldossari", name: "ياسر الدوسري" },
  { id: "ar.khaledalqahtani", name: "خالد القحطاني" },
  { id: "ar.ahmedalajmi", name: "احمد العجمي" },
];

const QuranAudio = () => {
  const {
    selectedSurah,
    playlist,
    addToPlaylist,
    removeFromPlaylist,
    setSelectedSurah,
  } = useQuran();
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const savedMuted = localStorage.getItem("muted") === "true";
  const savedVolume = parseFloat(localStorage.getItem("volume")) || 1;
  const savedPreviousVolume = parseFloat(localStorage.getItem("previousVolume")) || savedVolume;

  const [muted, setMuted] = useState(savedMuted);
  const [volume, setVolume] = useState(savedMuted ? 0 : savedVolume);
  const [previousVolume, setPreviousVolume] = useState(savedPreviousVolume);
  const [selectedReciter, setSelectedReciter] = useState(() => {
    return localStorage.getItem("selectedReciter") || "ar.alafasy";
  });
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    if (selectedSurah) {
      setLoading(true);
      const url = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${selectedSurah.number}.mp3`;
      setAudioUrl(url);
      setLoading(false);
    }
  }, [selectedSurah, selectedReciter]);

  useEffect(() => {
    localStorage.setItem("selectedReciter", selectedReciter);
  }, [selectedReciter]);

  useEffect(() => {
    if (audioUrl && selectedSurah) {
      const storageData = JSON.parse(
        localStorage.getItem("quran_audio") || "{}"
      );
      const savedTime = parseFloat(
        storageData[selectedSurah.number]?.currentTime || 0
      );
      setCurrentTime(isNaN(savedTime) ? 0 : savedTime);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(audioUrl);
      audioRef.current.currentTime = savedTime;
      audioRef.current.volume = volume;

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.onloadeddata = () => {
        if (isPlaying) {
          audioRef.current
            .play()
            .catch((error) => console.warn("Playback Error:", error));
        }
      };

      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        localStorage.setItem(
          "quran_audio",
          JSON.stringify({
            ...storageData,
            [selectedSurah.number]: {
              currentTime: audioRef.current.currentTime,
            },
          })
        );
      };

      audioRef.current.addEventListener("timeupdate", updateTime);
      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.pause();
      };
    }
  }, [audioUrl, selectedSurah, isPlaying, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Error playing:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekAudio = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      duration
    );
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };



useEffect(() => {
  localStorage.setItem("volume", volume);
  localStorage.setItem("muted", muted);
  localStorage.setItem("previousVolume", previousVolume);
}, [volume, muted, previousVolume]);

const handleVolumeToggle = () => {
  setMuted((prevMuted) => {
    const newMuted = !prevMuted;

    if (audioRef.current) {
      if (newMuted) {
        setPreviousVolume(volume); 
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        setVolume(previousVolume); 
        audioRef.current.volume = previousVolume;
      }
      audioRef.current.muted = newMuted;
    }

    return newMuted;
  });
};

const handleVolumeChange = (e) => {
  const newVolume = parseFloat(e.target.value);
  setVolume(newVolume);

  if (audioRef.current) {
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setMuted(true);
      audioRef.current.muted = true;
    } else {
      setMuted(false);
      audioRef.current.muted = false;
      setPreviousVolume(newVolume); 
    }
  }
};


  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="قائمة التشغيل"
        >
          <ListMusic className="w-5 h-5 cursor-pointer" />
        </button>
        <h2 className="text-xl font-semibold text-center">
          🎧 استمع إلى {selectedSurah?.name}
        </h2>
      </div>

      <div className="relative mb-4 ">
        <select
          value={selectedReciter}
          onChange={(e) => setSelectedReciter(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 text-right appearance-none pr-5 cursor-pointer"
        >
          {RECITERS.map((reciter) => (
            <option key={reciter.id} value={reciter.id}>
              {reciter.name}
            </option>
          ))}
        </select>

        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          🔽
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={() => seekAudio(-10)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={() => seekAudio(10)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {selectedSurah &&
              !playlist?.find((s) => s.number === selectedSurah.number) && (
                <button
                  onClick={() => addToPlaylist(selectedSurah)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleTimeChange}
              className="flex-1 h-2 rounded-lg appearance-none bg-gray-700 accent-blue-500 cursor-pointer"
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-2">
      <button onClick={handleVolumeToggle}>
        {muted ? <VolumeX className="w-5 h-5 cursor-pointer" /> : <Volume2 className="w-5 h-5 cursor-pointer" />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-2 rounded-lg appearance-none bg-gray-700 accent-blue-500 cursor-pointer"
      />
    </div>

          {showPlaylist && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-right">
                قائمة التشغيل
              </h3>
              {playlist?.length > 0 ? (
                <ul className="space-y-2  ">
                  {playlist.map((surah) => (
                    <li
                      onClick={() => {
                        setSelectedSurah(surah);
                      }}
                      key={surah.number}
                      className="flex flex-row-reverse justify-between items-center bg-gray-600 rounded-lg p-2  gap-2 cursor-pointer"
                    >
                      <span>{surah.name}</span>
                      <button
                        onClick={() => removeFromPlaylist(surah.number)}
                        className="text-red-500 hover:text-red-400 cursor-pointer"
                      >
                        حذف
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-right">
                  لا توجد سور في قائمة التشغيل
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuranAudio;
