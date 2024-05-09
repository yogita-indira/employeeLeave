
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/getEmployee'); 
      setUsers(response.data.users);
      console.log(response)
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      setError('Failed to fetch users. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-flow-row auto-rows-max">
          {users.map((user, index) => (
            <div key={index} className="w-full md:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;