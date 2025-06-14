import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { api } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizStats, setQuizStats] = useState({
    total_quizzes: 0,
    average_score: 0,
    highest_score: 0,
    lowest_score: 0
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasNoData, setHasNoData] = useState(false);
  const [profile, setProfile] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [recentResults, setRecentResults] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        // First get the user profile
        const profileData = await api.get('/user/me');
        setProfile(profileData);

        // Then fetch statistics and recent data
        const statsData = await api.get(`/user/${profileData.user_id}/statistics`);
        const recentQuizzesData = await api.get('/quiz/recent/5');
        const recentResultsData = await api.get('/quiz/result/recent/5');

        setStatistics(statsData);
        setRecentQuizzes(recentQuizzesData);
        setRecentResults(recentResultsData);

        // Check if we have any statistics data
        if (!statsData || Object.keys(statsData).length === 0) {
          setHasNoData(true);
        } else {
          setQuizStats(statsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (hasNoData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Welcome to your AI Quiz Dashboard</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Quiz Data Yet</h2>
          <p className="text-gray-600 mb-6">You haven't taken any quizzes yet. Create your first quiz to get started!</p>
          <Button onClick={() => navigate('/create-quiz')}>
            Create Your First Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
        <Button onClick={() => navigate('/create-quiz')} variant="secondary">
          Create New Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Welcome to your AI Quiz Dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Quizzes</h2>
          <p className="text-3xl font-bold text-indigo-600">{quizStats.total_quizzes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Average Score</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {Number.isInteger(quizStats.average_score) ? quizStats.average_score : quizStats.average_score.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Highest Score</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {Number.isInteger(quizStats.highest_score) ? quizStats.highest_score : quizStats.highest_score.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lowest Score</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {Number.isInteger(quizStats.lowest_score) ? quizStats.lowest_score : quizStats.lowest_score.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        {recentQuizzes.length > 0 ? (
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.quiz_id} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{quiz.topic}</h3>
                    <p className="text-sm text-gray-600">
                      Difficulty: {quiz.difficulty} • {quiz.number_of_questions} questions
                    </p>
                  </div>
                  {recentResults.find(result => result.quiz_id === quiz.quiz_id) && (
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        recentResults.find(result => result.quiz_id === quiz.quiz_id).score >= 70 ? 'bg-green-100 text-green-800' :
                        recentResults.find(result => result.quiz_id === quiz.quiz_id).score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(() => {
                          const score = recentResults.find(result => result.quiz_id === quiz.quiz_id).score;
                          return Number.isInteger(score) ? score : score.toFixed(2);
                        })()}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent activity</p>
        )}
      </div>

      {/* Create New Quiz Button */}
      <div className="flex justify-center">
        <Button onClick={() => navigate('/create-quiz')}>
          Create New Quiz
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;