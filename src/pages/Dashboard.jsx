import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizStats, setQuizStats] = useState({
    total_quizzes: 0,
    average_score: 0,
    highest_score: 0,
    lowest_score: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasNoData, setHasNoData] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('token_type') || 'Bearer';
        
        if (!token) {
          navigate('/login');
          return;
        }

        // First get the user profile to get the user_id
        const profileResponse = await fetch('http://localhost:8000/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `${tokenType} ${token}`
          }
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const profileData = await profileResponse.json();

        // Then fetch the statistics using the user_id
        const statsResponse = await fetch(`http://localhost:8000/user/${profileData.user_id}/statistics`, {
          method: 'GET',
          headers: {
            'Authorization': `${tokenType} ${token}`
          }
        });

        if (!statsResponse.ok) {
          if (statsResponse.status === 404) {
            setHasNoData(true);
            return;
          }
          throw new Error('Failed to fetch statistics');
        }

        const statsData = await statsResponse.json();
        setQuizStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

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
          <p className="text-3xl font-bold text-indigo-600">{quizStats.average_score}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Highest Score</h2>
          <p className="text-3xl font-bold text-indigo-600">{quizStats.highest_score}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lowest Score</h2>
          <p className="text-3xl font-bold text-indigo-600">{quizStats.lowest_score}%</p>
        </div>
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