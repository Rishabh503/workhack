// /api/dashboard/data/route.js
import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect
// import Student from "@/models/Student";
// import Subject from "@/models/Subject";
// import Goal from "@/models/Goal";
// import Session from "@/models/Session";
import Student from "@/models/studentModel";
import Subject from "@/models/subjectModel";
import Goal from "@/models/goalModel";
import Session from "@/models/sessionModel";
import { connectDB } from "@/lib/db";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the student
    const student = await Student.findOne({ email })
      .populate({
        path: 'subjects',
        populate: {
          path: 'goals',
          model: 'Goal'
        }
      })
      .populate('goals')
      .populate('sessions');

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Get all goals for this student
    const allGoals = await Goal.find({ student: student._id })
      .populate('subject', 'name')
      .sort({ deadline: 1 });

    // Get all sessions for this student
    const allSessions = await Session.find({ student: student._id })
      .populate('goal', 'title')
      .sort({ date: -1 });

    // Calculate dashboard metrics
    const totalGoals = allGoals.length;
    const completedGoals = allGoals.filter(goal => goal.completionStatus === 'completed').length;
    const pendingGoals = allGoals.filter(goal => goal.completionStatus === 'pending').length;
    const inProgressGoals = allGoals.filter(goal => goal.completionStatus === 'in-progress').length;

    // Upcoming deadlines (next 7 days)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const upcomingDeadlines = allGoals.filter(goal => 
      new Date(goal.deadline) <= sevenDaysFromNow && 
      goal.completionStatus !== 'completed'
    ).length;

    // Goal status distribution
    const goalStatusData = [
      { name: 'Completed', value: completedGoals, color: '#10B981' },
      { name: 'In Progress', value: inProgressGoals, color: '#F59E0B' },
      { name: 'Pending', value: pendingGoals, color: '#EF4444' }
    ];

    // Subject-wise goal distribution
    const subjectGoalMap = {};
    allGoals.forEach(goal => {
      const subjectName = goal.subject.name;
      if (!subjectGoalMap[subjectName]) {
        subjectGoalMap[subjectName] = { total: 0, completed: 0, pending: 0, inProgress: 0 };
      }
      subjectGoalMap[subjectName].total++;
      if (goal.completionStatus === 'completed') subjectGoalMap[subjectName].completed++;
      else if (goal.completionStatus === 'in-progress') subjectGoalMap[subjectName].inProgress++;
      else subjectGoalMap[subjectName].pending++;
    });

    const subjectWiseGoalData = Object.entries(subjectGoalMap).map(([subject, data]) => ({
      subject,
      total: data.total,
      completed: data.completed,
      pending: data.pending,
      inProgress: data.inProgress
    }));

    // Subject distribution (total goals per subject)
    const subjectDistributionData = Object.entries(subjectGoalMap).map(([subject, data]) => ({
      name: subject,
      value: data.total,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));

    // Deadline timeline (goals by deadline)
    const deadlineTimelineData = allGoals
      .filter(goal => goal.completionStatus !== 'completed')
      .map(goal => ({
        date: new Date(goal.deadline).toISOString().split('T')[0],
        goalTitle: goal.title,
        subject: goal.subject.name,
        status: goal.completionStatus,
        daysUntilDeadline: Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Daily study time (from sessions)
    const dailyStudyTime = {};
    allSessions.forEach(session => {
      const date = new Date(session.date).toISOString().split('T')[0];
      
      // Calculate duration in minutes
      const startTime = new Date(`1970-01-01T${session.startTime}`);
      const endTime = new Date(`1970-01-01T${session.endTime}`);
      const durationMinutes = (endTime - startTime) / (1000 * 60);
      
      if (!dailyStudyTime[date]) {
        dailyStudyTime[date] = 0;
      }
      dailyStudyTime[date] += durationMinutes;
    });

    const dailyStudyTimeData = Object.entries(dailyStudyTime)
      .map(([date, minutes]) => ({
        date,
        studyTime: Math.round(minutes),
        hours: Math.round(minutes / 60 * 10) / 10
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30); // Last 30 days

    // Sessions per day count
    const sessionsPerDay = {};
    allSessions.forEach(session => {
      const date = new Date(session.date).toISOString().split('T')[0];
      if (!sessionsPerDay[date]) {
        sessionsPerDay[date] = 0;
      }
      sessionsPerDay[date]++;
    });

    const sessionsPerDayData = Object.entries(sessionsPerDay)
      .map(([date, count]) => ({
        date,
        sessions: count
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30); // Last 30 days

    // Average session time
    const totalSessionTime = allSessions.reduce((total, session) => {
      const startTime = new Date(`1970-01-01T${session.startTime}`);
      const endTime = new Date(`1970-01-01T${session.endTime}`);
      const durationMinutes = (endTime - startTime) / (1000 * 60);
      return total + durationMinutes;
    }, 0);

    const averageSessionTime = allSessions.length > 0 
      ? Math.round(totalSessionTime / allSessions.length) 
      : 0;

    // Recent sessions for timeline
    const recentSessions = allSessions.slice(0, 10).map(session => ({
      id: session._id,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      goalTitle: session.goal?.title || 'No goal linked',
      duration: (() => {
        const startTime = new Date(`1970-01-01T${session.startTime}`);
        const endTime = new Date(`1970-01-01T${session.endTime}`);
        return Math.round((endTime - startTime) / (1000 * 60));
      })()
    }));

    const dashboardData = {
      student: {
        name: student.name,
        email: student.email,
        totalSubjects: student.subjects.length
      },
      metrics: {
        totalGoals,
        completedGoals,
        pendingGoals,
        inProgressGoals,
        upcomingDeadlines,
        totalSessions: allSessions.length,
        averageSessionTime,
        totalStudyTime: Math.round(totalSessionTime / 60), // in hours
        completionRate: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0
      },
      charts: {
        goalStatusData,
        subjectWiseGoalData,
        subjectDistributionData,
        deadlineTimelineData,
        dailyStudyTimeData,
        sessionsPerDayData
      },
      recent: {
        sessions: recentSessions,
        upcomingGoals: allGoals
          .filter(goal => 
            new Date(goal.deadline) >= new Date() && 
            goal.completionStatus !== 'completed'
          )
          .slice(0, 5)
          .map(goal => ({
            id: goal._id,
            title: goal.title,
            subject: goal.subject.name,
            deadline: goal.deadline,
            status: goal.completionStatus,
            daysUntilDeadline: Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
          }))
      }
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}