"use client"
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Save } from "lucide-react";

export function MyClock() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);
  const [startTimeReal, setStartTimeReal] = useState(null);

  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStartPause = () => {
    if (!running) {
      setStartTimeReal(new Date()); 
    }
    setRunning(!running);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setRunning(false);
    setStartTimeReal(null);
  };

  const handleSave = async () => {
    const now = new Date();

    const sessionData = {
      date: now.toISOString().split("T")[0],
      startTime: startTimeReal?.toLocaleTimeString() || "00:00:00",
      endTime: now.toLocaleTimeString(),
    };

    try {
      const res = await fetch("/api/sessions/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });

      if (res.ok) {
        const saved = await res.json();
        console.log("Session saved:", saved);
        setSavedTimes((prev) => [...prev, sessionData.endTime]);
      } else {
        console.error("Failed to save session");
      }
    } catch (error) {
      console.log("Error from frontend:", error);
    }
  };

  return (
    <div className="min-h-auto  text-white flex flex-col justify-start items-start p-6">
      <div className="w-full max-w-4xl bg-[#0f0f0f] shadow-[0_0_20px_#00ffe1] rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* timer  */}
          <div className="text-5xl font-mono tracking-widest text-[#00ffe1]">
            {formatTime(seconds)}
          </div>

          {/* Controls */}
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={handleStartPause}
              className="px-4 py-2 rounded-full bg-[#00ffe1] text-black hover:scale-105 duration-300 flex items-center gap-2 shadow-lg"
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
              {running ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-full bg-white text-black hover:scale-105 duration-300 flex items-center gap-2 shadow-lg"
            >
              <RotateCcw size={16} /> Reset
            </button>

            {!running && seconds > 0 && (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-full bg-green-400 text-black hover:scale-105 duration-300 flex items-center gap-2 shadow-lg"
              >
                <Save size={16} /> Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
