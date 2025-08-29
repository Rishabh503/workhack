import React from 'react';

const GoalStatusPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-400">No goal data available</div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-400">No goals created yet</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4 text-white">Goal Status Distribution</h3>
      <div className="flex items-center justify-center h-48">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = data.slice(0, index).reduce((acc, prev) => 
                acc - (prev.value / total) * 100, 0);
              
              return (
                <circle
                  key={item.name}
                  cx="50"
                  cy="50"
                  r="15.915"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-sm text-gray-300">Total Goals</div>
            </div>
          </div>
        </div>
        <div className="ml-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div 
                className="w-4 h-4 rounded mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-300">
                {item.name}: {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalStatusPieChart;