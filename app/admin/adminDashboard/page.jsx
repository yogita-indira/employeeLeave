
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import jwt from 'jsonwebtoken'; // Import jwt
import { FaToggleOn } from 'react-icons/fa';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [decodedToken, setDecodedToken] = useState({}); // State to store decoded token

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          setDecodedToken(decodedToken); // Set decoded token in state
        } else {
          console.error('Failed to decode token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/getEmployee');
      setUsers(response.data.users);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      setError('Failed to fetch users. Please try again.');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/deleteEmployee/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOut = () => {
    // Add signout logic here
    console.log('Signing out...');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`h-screen w-64 bg-sky-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <h1 className="text-3xl font-bold text-white p-4">Admin Panel</h1>
        <p className="text-white p-4">{decodedToken.username}</p> {/* Display username */}
        <button className="text-white p-4" onClick={handleSignOut}>Sign Out</button>
        {/* Add any additional sidebar content here */}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <nav className="bg-blue-300 p-4">
          <div className="container mx-auto flex justify-between items-center">
        
            <button className="text-white" onClick={handleToggleSidebar}><FaToggleOn size={28} /></button>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                 
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                  
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md mr-2"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
