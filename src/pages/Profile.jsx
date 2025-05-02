import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('token_type') || 'Bearer';
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:8000/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `${tokenType} ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
        <Button onClick={() => navigate('/dashboard')} variant="secondary">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your account information</p>
      </div>

      {profile && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-lg font-medium">{profile.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium">{profile.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Quiz Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Quizzes</p>
                  <p className="text-2xl font-bold text-indigo-600">{profile.total_quizzes || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-2xl font-bold text-indigo-600">{profile.average_score || 0}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Highest Score</p>
                  <p className="text-2xl font-bold text-indigo-600">{profile.highest_score || 0}%</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="secondary"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;