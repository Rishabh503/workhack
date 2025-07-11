import React from 'react'
import GoalStatusPieChart from './__components/graphs/GoalStatusPieChart'
import DeadlineTimelineChart from './__components/graphs/DeadlineTImelineChart'
import DailyStudyTimeGraph from './__components/graphs/DailyStudyTimeGraph'
import SubjectWiseGoalBarChart from './__components/graphs/SubjectWIseGoalBarChart'
import SessionsPerDayCountChart from './__components/graphs/SessionsPerDayCountChart'
import SubjectDistributionPieChart from './__components/graphs/SubjectDistributionPieChart'
import { Card, CardTitle } from "@/components/ui/card";
import { ProfileCard } from './__components/others/ProfileCard'
import AverageSessionTimeCard from './__components/graphs/AverageSessionTimeCard'

const StatCard = ({ title, value, subtitle, icon }) => (
  <Card className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl text-white border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300">
    <div className="flex items-center justify-between mb-2">
      <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
      {icon && <span className="text-lg opacity-70">{icon}</span>}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
  </Card>
);

const ChartCard = ({ children, className = "" }) => (
  <Card className={`p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 ${className}`}>
    {children}
  </Card>
);

const DashboardPage = () => {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* Profile and Quick Stats Section */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
        <div className="xl:col-span-2">
          <div className="h-full">
            <ProfileCard />
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
            <StatCard 
              title="Total Goals" 
              value="9" 
              subtitle="Active learning objectives"
              icon="🎯"
            />
            <StatCard 
              title="Completed Goals" 
              value="3" 
              subtitle="33% completion rate"
              icon="✅"
            />
            <StatCard 
              title="Upcoming Deadlines" 
              value="4" 
              subtitle="Next 7 days"
              icon="⏰"
            />
          </div>
        </div>
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <ChartCard>
            <SubjectWiseGoalBarChart />
          </ChartCard>
        </div>
        <div className="xl:col-span-1">
          <ChartCard>
            <GoalStatusPieChart />
          </ChartCard>
        </div>
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard>
          <DeadlineTimelineChart />
        </ChartCard>
    <ChartCard>
            <SessionsPerDayCountChart />
          </ChartCard>
      </div>

      {/* Study Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartCard>
            <DailyStudyTimeGraph />
          </ChartCard>
        </div>
        <div className="lg:col-span-1">
        <ChartCard>
          <SubjectDistributionPieChart />
        </ChartCard>
        </div>
          
      </div>

      <div className="h-8"></div>
    </main>
  );
};

export default DashboardPage;