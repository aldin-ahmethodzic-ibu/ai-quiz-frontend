import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    recentQuizzes: []
  });

  // This would typically be populated from an API call when the component mounts
  // For now, we'll just show a placeholder UI

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Welcome to your AI Quiz Dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Quizzes</h2>
          <p className="text-3xl font-bold text-indigo-600">{quizStats.totalQuizzes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Average Score</h2>
          <p className="text-3xl font-bold text-indigo-600">{quizStats.averageScore}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Last Quiz</h2>
          <p className="text-lg text-gray-600">
            {quizStats.recentQuizzes.length > 0 
              ? quizStats.recentQuizzes[0].topic 
              : 'No quizzes taken yet'}
          </p>
        </div>
      </div>

      {/* Create New Quiz Button */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a New Quiz</h2>
        <p className="text-gray-600 mb-6">
          Generate a custom quiz based on your preferred topic, difficulty level, and number of questions.
        </p>
        <Button 
          onClick={() => navigate('/create-quiz')}
          className="w-full md:w-auto"
        >
          Create New Quiz
        </Button>
      </div>

      {/* Recent Quizzes */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Quizzes</h2>
        
        {quizStats.recentQuizzes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizStats.recentQuizzes.map((quiz, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quiz.topic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quiz.difficulty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quiz.score}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quiz.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't taken any quizzes yet.</p>
            <p className="text-gray-500 mt-2">Create your first quiz to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;