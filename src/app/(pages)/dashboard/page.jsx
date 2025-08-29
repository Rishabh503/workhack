"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";

// Import all the chart components
import GoalStatusPieChart from './__components/graphs/GoalStatusPieChart';
// import SubjectWiseGoalBarChart from './__components/graphs/SubjectWiseGoalBarChart';
import DailyStudyTimeGraph from './__components/graphs/DailyStudyTimeGraph';
import SessionsPerDayCountChart from './__components/graphs/SessionsPerDayCountChart';
// import DeadlineTimelineChart from './__components/graphs/DeadlineTimelineChart';
import SubjectDistributionPieChart from './__components/graphs/SubjectDistributionPieChart';
import AverageSessionTimeCard from './__components/graphs/AverageSessionTimeCard';
import SubjectWiseGoalBarChart from './__components/graphs/SubjectWIseGoalBarChart';
import DeadlineTimelineChart from './__components/graphs/DeadlineTImelineChart';

const StatCard = ({ title, value, subtitle, icon, trend }) => (
  <Card className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl text-white border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-2">
      <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
      {icon && <span className="text-lg opacity-70 group-hover:scale-110 transition-transform">{icon}</span>}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    {trend && (
      <div className={`text-xs mt-1 ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
        {trend.positive ? '↗️' : '↘️'} {trend.text}
      </div>
    )}
  </Card>
);

const ChartCard = ({ children, className = "" }) => (
  <Card className={`p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 ${className}`}>
    {children}
  </Card>
);

const LoadingCard = ({ height = "h-64" }) => (
  <Card className={`p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 ${height}`}>
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  </Card>
);

const DashboardPage = () => {
  const { userEmail } = useUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!userEmail) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/dashboard/data?email=${userEmail}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userEmail]);

  if (loading) {
    return (
      <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="animate-pulse space-y-8">
          {/* Header skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
          
          {/* Stats cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} height="h-32" />
            ))}
          </div>
          
          {/* Charts skeleton */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <LoadingCard height="h-80" />
            </div>
            <LoadingCard height="h-80" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Card className="p-8 bg-red-900/20 border border-red-500/30 text-white text-center max-w-md">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Dashboard Error</h2>
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            Retry
          </button>
        </Card>
      </main>
    );
  }

  if (!dashboardData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Card className="p-8 bg-gray-800/40 border border-gray-700/50 text-white text-center max-w-md">
          <div className="text-gray-400 text-4xl mb-4">📊</div>
          <h2 className="text-xl font-bold mb-2">No Data Available</h2>
          <p className="text-gray-400">Start by creating some goals and study sessions to see your dashboard.</p>
        </Card>
      </main>
    );
  }

  const { metrics, charts, student } = dashboardData;

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome back, {student.name}! 👋
        </h1>
        <p className="text-gray-400 text-lg">Here's your learning progress overview</p>
        <div className="mt-2 text-sm text-gray-500">
          {student.totalSubjects} subjects • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Goals"
          value={metrics.totalGoals}
          subtitle={`${metrics.completionRate}% completion rate`}
          icon="🎯"
          trend={metrics.totalGoals > 0 ? { positive: true, text: 'Active learning' } : null}
        />
        <StatCard
          title="Completed Goals"
          value={metrics.completedGoals}
          subtitle="Successfully finished"
          icon="✅"
          trend={metrics.completedGoals > 0 ? { positive: true, text: 'Great progress!' } : null}
        />
        <StatCard
          title="Upcoming Deadlines"
          value={metrics.upcomingDeadlines}
          subtitle="Next 7 days"
          icon="⏰"
          trend={metrics.upcomingDeadlines > 3 ? { positive: false, text: 'Stay focused!' } : { positive: true, text: 'Manageable pace' }}
        />
        <StatCard
          title="Study Hours"
          value={`${metrics.totalStudyTime}h`}
          subtitle={`${metrics.totalSessions} sessions logged`}
          icon="📚"
          trend={metrics.totalStudyTime > 0 ? { positive: true, text: 'Keep it up!' } : null}
        />
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <ChartCard>
            <SubjectWiseGoalBarChart data={charts.subjectWiseGoalData} />
          </ChartCard>
        </div>
        <div className="xl:col-span-1">
          <ChartCard>
            <GoalStatusPieChart data={charts.goalStatusData} />
          </ChartCard>
        </div>
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard>
          <DeadlineTimelineChart data={charts.deadlineTimelineData} />
        </ChartCard>
        <ChartCard>
          <SessionsPerDayCountChart data={charts.sessionsPerDayData} />
        </ChartCard>
      </div>

      {/* Study Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartCard>
            <DailyStudyTimeGraph data={charts.dailyStudyTimeData} />
          </ChartCard>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ChartCard>
            <SubjectDistributionPieChart data={charts.subjectDistributionData} />
          </ChartCard>
          <ChartCard>
            <AverageSessionTimeCard 
              averageTime={metrics.averageSessionTime} 
              totalSessions={metrics.totalSessions}
            />
          </ChartCard>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mb-8">
        <ChartCard>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-blue-400 font-medium mb-1">Most Active Subject</div>
              <div className="text-gray-300">
                {charts.subjectWiseGoalData.length > 0 
                  ? charts.subjectWiseGoalData.reduce((prev, current) => 
                      (prev.total > current.total) ? prev : current
                    ).subject
                  : 'No subjects yet'
                }
              </div>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-green-400 font-medium mb-1">Success Rate</div>
              <div className="text-gray-300">{metrics.completionRate}% goals completed</div>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="text-purple-400 font-medium mb-1">Study Streak</div>
              <div className="text-gray-300">
                {charts.dailyStudyTimeData.filter(d => d.hours > 0).length} active days
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="h-8"></div>
    </main>
  );
};

export default DashboardPage;