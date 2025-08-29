import React from "react";

const AverageSessionTimeCard = ({
  averageTime = 0,     // in minutes
  totalSessions = 0,
  goalMinutes = 120,   // default: 2h
}) => {
  if (!averageTime || averageTime === 0) {
    return (
      <div className="text-center h-full flex flex-col justify-center p-4">
        <h3 className="text-lg font-semibold mb-2 text-white">
          Average Session Time
        </h3>
        <div className="text-2xl font-bold text-gray-400">No data</div>
        <div className="text-sm text-gray-500 mt-1">
          Start logging sessions
        </div>

        {/* Show empty progress bar */}
        <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gray-500 h-2 rounded-full w-0"></div>
        </div>
      </div>
    );
  }

  const hours = Math.floor(averageTime / 60);
  const minutes = averageTime % 60;

  // Session quality mapping
  const getSessionQuality = (avgTime) => {
    if (avgTime >= 90) return { text: "Excellent", color: "text-green-400", icon: "🏆" };
    if (avgTime >= 60) return { text: "Great", color: "text-blue-400", icon: "⭐" };
    if (avgTime >= 30) return { text: "Good", color: "text-yellow-400", icon: "👍" };
    if (avgTime >= 15) return { text: "Fair", color: "text-orange-400", icon: "⚡" };
    return { text: "Short", color: "text-red-400", icon: "⏱️" };
  };

  const quality = getSessionQuality(averageTime);
  const progress = Math.min((averageTime / goalMinutes) * 100, 100);

  return (
    <div className="text-center h-full flex flex-col justify-center p-4">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Average Session Time
      </h3>

      {/* Duration */}
      <div className="mb-4">
        <div className="text-4xl font-bold text-blue-400 mb-2">
          {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
        </div>
        <div className="text-sm text-gray-400">per study session</div>
      </div>

      {/* Quality */}
      <div className="mb-4">
        <div className="text-2xl mb-1" aria-label={quality.text}>
          {quality.icon}
        </div>
        <div className={`text-sm font-medium ${quality.color}`}>
          {quality.text} Duration
        </div>
      </div>

      {/* Session count */}
      <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
        Based on {totalSessions} session{totalSessions !== 1 ? "s" : ""}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Goal: {Math.floor(goalMinutes / 60)}h sessions
        </div>
      </div>
    </div>
  );
};

export default AverageSessionTimeCard;
