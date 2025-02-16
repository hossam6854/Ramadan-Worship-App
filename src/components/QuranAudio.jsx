import { useEffect, useRef, useState } from "react";
import { useQuran } from "../context/QuranContext";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import React from "react";

const QuranAudio = () => {
  const { selectedSurah } = useQuran();
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (selectedSurah) {
      setLoading(true);
      const url = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${selectedSurah.number}.mp3`;
      setAudioUrl(url);
      setLoading(false);
    }
  }, [selectedSurah]);

  useEffect(() => {
    if (audioUrl && selectedSurah) {
      const storageData = JSON.parse(localStorage.getItem("quran_audio") || "{}");
      const savedTime = parseFloat(storageData[selectedSurah.number]?.currentTime || 0);
      setCurrentTime(isNaN(savedTime) ? 0 : savedTime);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(audioUrl);
      audioRef.current.currentTime = savedTime;
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.onloadeddata = () => {
        if (isPlaying) {
          audioRef.current.play().catch((error) => console.warn("Playback Error:", error));
        }
      };

      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        localStorage.setItem(
          "quran_audio",
          JSON.stringify({
            ...storageData,
            [selectedSurah.number]: { currentTime: audioRef.current.currentTime },
          })
        );
      };

      audioRef.current.addEventListener("timeupdate", updateTime);
      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.pause();
      };
    }
  }, [audioUrl, selectedSurah, isPlaying, volume, playbackRate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => console.warn("Error playing:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekAudio = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        🎧 استمع إلى {selectedSurah?.name}
      </h2>

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
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button
              onClick={() => seekAudio(10)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>
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
            <Volume2 className="w-5 h-5" />
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

          <div className="flex justify-center gap-2 mt-4">
            {[0.5, 1, 1.5, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  playbackRate === rate
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuranAudio;