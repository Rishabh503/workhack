import React from 'react';

const SessionsPerDayCountChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-400">No session data available</div>
      </div>
    );
  }

  const maxSessions = Math.max(...data.map(item => item.sessions), 1);
  const totalSessions = data.reduce((sum, item) => sum + item.sessions, 0);
  const avgSessions = totalSessions / data.length;
  
  return (
    <div className="w-full h-64">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Sessions per Day</h3>
        <div className="text-sm text-gray-400">
          Avg: {avgSessions.toFixed(1)}/day
        </div>
      </div>
      
      <div className="h-48 flex items-end space-x-1 overflow-x-auto pb-6 relative">
        {/* Average line indicator */}
        <div 
          className="absolute w-full border-t border-dashed border-gray-500 opacity-50"
          style={{ bottom: `${24 + (avgSessions / maxSessions) * 180}px` }}
        ></div>
        
        {data.map((item, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center group relative">
            <div 
              className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t hover:from-purple-500 hover:to-purple-300 transition-all duration-300 cursor-pointer"
              style={{ height: `${Math.max((item.sessions / maxSessions) * 180, item.sessions > 0 ? 4 : 0)}px` }}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                <div>{new Date(item.date).toLocaleDateString()}</div>
                <div className="font-semibold">{item.sessions} session{item.sessions !== 1 ? 's' : ''}</div>
              </div>
            </div>
            
            <span className="text-xs text-gray-400 mt-1 transform rotate-45 origin-bottom-left whitespace-nowrap">
              {new Date(item.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 -ml-6">
        <span>{maxSessions}</span>
        <span>{Math.ceil(maxSessions * 0.75)}</span>
        <span>{Math.ceil(maxSessions * 0.5)}</span>
        <span>{Math.ceil(maxSessions * 0.25)}</span>
        <span>0</span>
      </div>
      
      {/* Summary stats */}
      <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-400">
        <span>Total: {totalSessions}</span>
        <span>Max: {maxSessions}/day</span>
        <span>Active days: {data.filter(item => item.sessions > 0).length}</span>
      </div>
    </div>
  );
};

export default SessionsPerDayCountChart;