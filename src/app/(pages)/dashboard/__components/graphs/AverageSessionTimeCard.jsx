"use client";

import React from "react";
import { Card, CardTitle } from "@/components/ui/card";

// Utility to convert hh:mm:ss to total seconds
const timeToSeconds = (timeStr) => {
  const [h, m, s] = timeStr.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

// Convert seconds to mm:ss
const formatMinutes = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

const AverageSessionTimeCard = () => {
    const sessions = [
  { startTime: "4:49:26 PM", endTime: "4:50:47 PM" },
  { startTime: "9:25:42 PM", endTime: "9:32:42 PM" },
  { startTime: "4:49:26 PM", endTime: "4:51:58 PM" },
];
  if (!sessions || sessions.length === 0) return null;

  const totalSeconds = sessions.reduce((acc, session) => {
    const start = timeToSeconds(session.startTime);
    const end = timeToSeconds(session.endTime);
    return acc + (end - start);
  }, 0);

  const avgSeconds = Math.floor(totalSeconds / sessions.length);

  return (
    <Card className="p-4 rounded-xl shadow-sm bg-indigo-500 text-white">
      <CardTitle className="text-sm mb-1">Avg. Session Time</CardTitle>
      <div className="text-3xl font-bold">{formatMinutes(avgSeconds)}</div>
    </Card>
  );
};

export default AverageSessionTimeCard;
