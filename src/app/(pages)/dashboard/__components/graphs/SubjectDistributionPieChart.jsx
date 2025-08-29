import React from 'react';

const SubjectDistributionPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-400">No subject data available</div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-400">No goals in subjects yet</div>
      </div>
    );
  }

  // Generate consistent colors for subjects
  const getSubjectColor = (index) => {
    const colors = [
      '#3B82F6', // Blue
      '#EF4444', // Red
      '#10B981', // Green
      '#F59E0B', // Yellow
      '#8B5CF6', // Purple
      '#06B6D4', // Cyan
      '#F97316', // Orange
      '#84CC16', // Lime
      '#EC4899', // Pink
      '#6B7280'  // Gray
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4 text-white">Subject Distribution</h3>
      <div className="flex items-center justify-center h-48">
        <div className="relative w-32 h-32 group">
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
                  stroke={item.color || getSubjectColor(index)}
                  strokeWidth="6"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:stroke-8 cursor-pointer"
                  title={`${item.name}: ${item.value} goals (${Math.round(percentage)}%)`}
                />
              );
            })}
          </svg>
          
          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{total}</div>
              <div className="text-xs text-gray-300">Goals</div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="ml-6 space-y-1 max-h-48 overflow-y-auto">
          {data.map((item, index) => (
            <div key={index} className="flex items-center group hover:bg-gray-700/30 p-1 rounded transition-colors">
              <div 
                className="w-3 h-3 rounded mr-2 flex-shrink-0" 
                style={{ backgroundColor: item.color || getSubjectColor(index) }}
              ></div>
              <div className="text-xs text-gray-300 flex-1">
                <div className="font-medium truncate max-w-24" title={item.name}>
                  {item.name}
                </div>
                <div className="text-gray-400">
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="text-center mt-2">
        <div className="text-xs text-gray-500">
          {data.length} subjects • {total} total goals
        </div>
      </div>
    </div>
  );
};

export default SubjectDistributionPieChart;