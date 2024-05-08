"use client"
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchTotalLeaves();
  }, []);

  const fetchTotalLeaves = async () => {
    try {
      const response = await axios.get('/api/total-leaves'); // Replace with your API endpoint
      setTotalLeaves(response.data.totalLeaves);
    } catch (error) {
      console.error('Error fetching total leaves:', error);
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
    } catch (error) {
      console.error('Error applying leave:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to apply leave. Please try again.');
    }
  };

  return (
    <div>
      <h2>Total Leaves Applied: {totalLeaves}</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" value={leaveForm.startDate} onChange={handleFormChange} required />
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" value={leaveForm.endDate} onChange={handleFormChange} required />
        <label htmlFor="reason">Reason:</label>
        <textarea id="reason" name="reason" value={leaveForm.reason} onChange={handleFormChange} required />
        <button type="submit">Apply Leave</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Dashboard;
