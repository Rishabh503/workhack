"use client"
import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Target, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const StudyPlanner = () => {
  const [formData, setFormData] = useState({
    subject: '',
    examDate: '',
    syllabus: '',
    studyHoursPerDay: 2
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const email = localStorage.getItem('userEmail') || 'user@example.com'; 
      
      const response = await fetch('/api/study-planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: email
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create study plan');
      }

      setStudyPlan(data);
      setSuccess(true);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'learning': return <BookOpen className="h-4 w-4" />;
      case 'revision': return <Target className="h-4 w-4" />;
      case 'practice': return <CheckCircle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex justify-center items-center gap-3 mb-4">
            <Sparkles className="text-blue-400" />
            AI Study Planner
          </h1>
          <p className="text-gray-400 text-lg">
            Create personalized study schedules with AI-powered planning
          </p>
        </div>

        {/* Form */}
        {!success && (
          <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg mb-8">
            <div className="space-y-6">
              {/* Subject Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics, Physics, History"
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Exam Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Exam Date
                </label>
                <input
                  type="date"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                />
              </div>

              {/* Study Hours Per Day */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Study Hours Per Day
                </label>
                <select
                  name="studyHoursPerDay"
                  value={formData.studyHoursPerDay}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value={1}>1 hour</option>
                  <option value={2}>2 hours</option>
                  <option value={3}>3 hours</option>
                  <option value={4}>4 hours</option>
                  <option value={5}>5 hours</option>
                  <option value={6}>6 hours</option>
                </select>
              </div>

              {/* Syllabus/Topics */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Syllabus/Topics to Cover
                </label>
                <textarea
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleInputChange}
                  placeholder="Enter all the topics, chapters, or syllabus points you need to study. Be as detailed as possible for better planning."
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <span className="text-red-300">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Your Study Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Study Plan
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && !isLoading && (
          <div className="bg-green-900/50 border border-green-500 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-green-300">Study Plan Created Successfully!</h3>
            </div>
            <p className="text-green-200">
              Your personalized study plan has been generated and {studyPlan?.goalsCreated} goals have been added to your goals list.
            </p>
          </div>
        )}

        {/* Study Plan Results */}
        {studyPlan && (
          <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Your Study Plan</h2>
              <p className="text-gray-400">{studyPlan.studyPlan?.summary}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-300">
                <span>📚 {studyPlan.goalsCreated} goals created</span>
                <span>📅 {studyPlan.studyPlan?.totalDays} days to exam</span>
              </div>
            </div>

            {/* Study Plan Timeline */}
            <div className="space-y-4">
              {studyPlan.studyPlan?.studyPlan?.map((item, index) => (
                <div key={index} className="bg-[#0f172a] rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(item.type)}
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="text-sm text-gray-400">Day {item.day}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{item.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.estimatedHours}h estimated
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSuccess(false);
                  setStudyPlan(null);
                  setFormData({
                    subject: '',
                    examDate: '',
                    syllabus: '',
                    studyHoursPerDay: 2
                  });
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Create Another Plan
              </button>
              <button
                onClick={() => window.location.href = '/goals'} // Adjust route as needed
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                View My Goals
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanner;