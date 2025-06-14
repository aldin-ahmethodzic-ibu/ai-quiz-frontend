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

        const response = await fetch('http://localhost:8000/user/me', {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-lg text-gray-600">Your account information</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Username</h2>
            <p className="mt-1 text-lg text-gray-900">{profile.username}</p>
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-gray-500">Email</h2>
            <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">User ID</h2>
            <p className="mt-1 text-lg text-gray-900">{profile.user_id}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Joined At</h2>
            <p className="mt-1 text-lg text-gray-900">{formatDate(profile.joined_at)}</p>
          </div>
        </div>

        <div className="pt-6">
          <Button onClick={() => navigate('/dashboard')} variant="secondary">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;