import React from 'react';

const DailyStudyTimeGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-gray-400">No study time data available</div>
      </div>
    );
  }

  const maxHours = Math.max(...data.map(item => item.hours), 1);
  const avgHours = data.reduce((sum, item) => sum + item.hours, 0) / data.length;
  
  return (
    <div className="w-full h-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Daily Study Time (Last 30 Days)</h3>
        <div className="text-sm text-gray-400">
          Avg: {avgHours.toFixed(1)}h/day
        </div>
      </div>
      
      <div className="h-64 flex items-end space-x-1 overflow-x-auto pb-6 relative">
        {/* Average line indicator */}
        <div 
          className="absolute w-full border-t border-dashed border-gray-500 opacity-50"
          style={{ bottom: `${24 + (avgHours / maxHours) * 240}px` }}
        ></div>
        
        {data.map((item, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center group relative">
            <div 
              className="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t hover:from-blue-500 hover:to-blue-300 transition-all duration-300 cursor-pointer"
              style={{ height: `${Math.max((item.hours / maxHours) * 240, item.hours > 0 ? 4 : 0)}px` }}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                <div>{new Date(item.date).toLocaleDateString()}</div>
                <div className="font-semibold">{item.hours}h ({item.studyTime}min)</div>
              </div>
            </div>
            
            <span className="text-xs text-gray-400 mt-1 transform rotate-45 origin-bottom-left whitespace-nowrap">
              {new Date(item.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500 -ml-8">
        <span>{maxHours.toFixed(1)}h</span>
        <span>{(maxHours * 0.75).toFixed(1)}h</span>
        <span>{(maxHours * 0.5).toFixed(1)}h</span>
        <span>{(maxHours * 0.25).toFixed(1)}h</span>
        <span>0h</span>
      </div>
      
      {/* Summary stats */}
      <div className="flex justify-center mt-4 space-x-6 text-xs text-gray-400">
        <span>Total: {data.reduce((sum, item) => sum + item.hours, 0).toFixed(1)}h</span>
        <span>Max: {maxHours.toFixed(1)}h</span>
        <span>Days studied: {data.filter(item => item.hours > 0).length}</span>
      </div>
    </div>
  );
};

export default DailyStudyTimeGraph;