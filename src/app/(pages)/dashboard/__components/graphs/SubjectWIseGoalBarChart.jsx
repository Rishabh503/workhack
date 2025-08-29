import React from 'react';

const SubjectWiseGoalBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-gray-400">No subject data available</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.total));
  
  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4 text-white">Goals by Subject</h3>
      <div className="h-64 flex items-end space-x-4 overflow-x-auto pb-8">
        {data.map((item, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center min-w-16">
            <div className="flex flex-col space-y-0 mb-2 relative group">
              {/* Completed Goals */}
              <div 
                className="w-12 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-400"
                style={{ height: `${Math.max((item.completed / maxValue) * 200, item.completed > 0 ? 8 : 0)}px` }}
                title={`Completed: ${item.completed}`}
              >
                {item.completed > 0 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.completed}
                  </div>
                )}
              </div>
              
              {/* In Progress Goals */}
              <div 
                className="w-12 bg-yellow-500 transition-all duration-300 hover:bg-yellow-400"
                style={{ height: `${Math.max((item.inProgress / maxValue) * 200, item.inProgress > 0 ? 8 : 0)}px` }}
                title={`In Progress: ${item.inProgress}`}
              >
                {item.inProgress > 0 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.inProgress}
                  </div>
                )}
              </div>
              
              {/* Pending Goals */}
              <div 
                className="w-12 bg-red-500 rounded-b transition-all duration-300 hover:bg-red-400"
                style={{ height: `${Math.max((item.pending / maxValue) * 200, item.pending > 0 ? 8 : 0)}px` }}
                title={`Pending: ${item.pending}`}
              >
                {item.pending > 0 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.pending}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center mt-2">
              <span className="text-xs text-gray-300 text-center max-w-16 truncate block">
                {item.subject}
              </span>
              <span className="text-xs text-gray-500 block">
                Total: {item.total}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-xs text-gray-300">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-xs text-gray-300">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-xs text-gray-300">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectWiseGoalBarChart;