import React from 'react';

const DeadlineTimelineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-400">No upcoming deadlines</div>
      </div>
    );
  }

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft < 0) return 'bg-red-600 text-red-100'; // Overdue
    if (daysLeft <= 1) return 'bg-red-500 text-red-100'; // Critical
    if (daysLeft <= 3) return 'bg-orange-500 text-orange-100'; // Urgent
    if (daysLeft <= 7) return 'bg-yellow-500 text-yellow-100'; // Soon
    return 'bg-green-500 text-green-100'; // Normal
  };

  const getUrgencyIcon = (daysLeft) => {
    if (daysLeft < 0) return '⚠️'; // Overdue
    if (daysLeft <= 1) return '🔥'; // Critical
    if (daysLeft <= 3) return '⏰'; // Urgent
    if (daysLeft <= 7) return '📅'; // Soon
    return '✅'; // Normal
  };

  const sortedData = [...data].sort((a, b) => a.daysUntilDeadline - b.daysUntilDeadline);

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4 text-white">Upcoming Deadlines</h3>
      <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
        {sortedData.slice(0, 8).map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
              item.daysUntilDeadline <= 3 ? 'bg-red-900/20 border border-red-500/30' : 'bg-gray-700/50 border border-gray-600/30'
            }`}
          >
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-lg">
                {getUrgencyIcon(item.daysUntilDeadline)}
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium text-white truncate">
                  {item.goalTitle}
                </div>
                <div className="text-xs text-gray-400">
                  {item.subject}
                </div>
              </div>
            </div>
            
            <div className="text-right flex-shrink-0 ml-4">
              <div className="text-sm text-white">
                {new Date(item.date).toLocaleDateString('en', { 
                  month: 'short', 
                  day: 'numeric',
                  year: new Date(item.date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                })}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full text-center min-w-16 ${getUrgencyColor(item.daysUntilDeadline)}`}>
                {item.daysUntilDeadline < 0 
                  ? `${Math.abs(item.daysUntilDeadline)} days overdue`
                  : item.daysUntilDeadline === 0 
                    ? 'Due today!' 
                    : item.daysUntilDeadline === 1 
                      ? 'Due tomorrow'
                      : `${item.daysUntilDeadline} days left`
                }
              </div>
            </div>
          </div>
        ))}
        
        {data.length > 8 && (
          <div className="text-center py-2">
            <span className="text-xs text-gray-500">
              +{data.length - 8} more deadlines...
            </span>
          </div>
        )}
      </div>
      
      {/* Summary stats */}
      <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-400 border-t border-gray-700 pt-2">
        <span>Overdue: {data.filter(item => item.daysUntilDeadline < 0).length}</span>
        <span>This week: {data.filter(item => item.daysUntilDeadline >= 0 && item.daysUntilDeadline <= 7).length}</span>
        <span>Total: {data.length}</span>
      </div>
    </div>
  );
};

export default DeadlineTimelineChart;