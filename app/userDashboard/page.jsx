'use client';import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [previousLeaves, setPreviousLeaves] = useState([]);

  useEffect(() => {
    fetchTotalLeaves();
    fetchUsername();
    fetchPreviousLeaves(); // Fetch previous leaves on component mount
  }, []);

  const fetchTotalLeaves = async () => {
    try {
      const response = await axios.get('/api/total-leaves'); // Replace with your API endpoint
      setTotalLeaves(response.data.totalLeaves);
    } catch (error) {
      console.error('Error fetching total leaves:', error);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await axios.get('/api/login'); // Replace with your API endpoint for username
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const fetchPreviousLeaves = async () => {
    try {
      const response = await axios.get('/api/previous-leaves'); // Replace with your API endpoint for previous leaves
      setPreviousLeaves(response.data.previousLeaves);
    } catch (error) {
      console.error('Error fetching previous leaves:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/apply-leave', leaveForm); // Replace with your API endpoint
      setTotalLeaves(totalLeaves + 1); // Assuming successful application increments total leaves
      setLeaveForm({ startDate: '', endDate: '', reason: '' });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      fetchPreviousLeaves(); // Fetch updated previous leaves after applying a new leave
    } catch (error) {
      console.error('Error applying leave:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to apply leave. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{username}</h2>
      <h1>My previous Leaves</h1>
      <ul>
        {previousLeaves.map((leave, index) => (
          <li key={index}>
            Start Date: {leave.startDate}, End Date: {leave.endDate}
          </li>
        ))}
      </ul>
      <h3 className="text-xl mb-4">Total Leaves Applied: {totalLeaves}</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={leaveForm.startDate} onChange={handleFormChange} required className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={leaveForm.endDate} onChange={handleFormChange} required className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason:</label>
          <textarea id="reason" name="reason" value={leaveForm.reason} onChange={handleFormChange} required className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full" />
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300">Apply Leave</button>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Dashboard;
