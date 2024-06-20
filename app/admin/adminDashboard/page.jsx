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
      <div className="flex-1 overflow-y-auto">
        <nav className="bg-blue-300 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <button className="text-white" onClick={handleToggleSidebar}><FaToggleOn size={28} /></button>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className='flex flex-wrap gap-4 mb-8'>
            <div className='count-employee bg-orange-400'>Total No. of Employees 18</div>
            <div className='count-employee bg-green-400'>Employees on leave</div>
            <div className='count-employee bg-blue-400'>Pending Leave</div>
            <div className='count-employee bg-red-400'>Approved Leave</div>
            <div className='count-employee bg-purple-400'>Rejected Leaves </div>
            <div className='count-employee bg-yellow-400'>Available leaves</div>
          </div>
        
          {loading ? (
            <p className="text-gray-600 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
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
