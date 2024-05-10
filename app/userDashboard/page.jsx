'use client';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
const UserDashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwt.decode(token);

        if (decodedToken) {
          const userEmail = decodedToken.email;
          setEmail(userEmail);
          // You can also set other user data from the token here if needed
        } else {
          console.error('Failed to decode token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const userPassword = localStorage.getItem('userPassword');
    if (userPassword) setPassword(userPassword);
  }, []);

  useEffect(() => {
    // Fetch leave data from LeaveTable or use dummy data
    const dummyLeaves = [
      { id: 1, startDate: '2024-05-10', endDate: '2024-05-12', leaveType: 'Sick Leave', status: 'Approved', reason: 'Fever' },
      { id: 2, startDate: '2024-06-15', endDate: '2024-06-20', leaveType: 'Annual Leave', status: 'Pending', reason: 'Vacation' },
      // Add more leave entries as needed
    ];

    setLeaves(dummyLeaves);
  }, []);

  const handleFetchCredentials = () => {
    const userPassword = localStorage.getItem('userPassword');
    setPassword(userPassword || 'Password not found');
  };

  const handleApplyLeave = () => {
    // Add logic for applying leave
    console.log('Leave application logic here');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleSignOut = () => {
    // Add logic for signing out
    console.log('Sign out logic here');
  };

  return (
    <div>
      <nav className="bg-sky-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold">My Dashboard</div>
          <div className="relative">
            {email ? (
              <div>
                <button className="text-white p-2 rounded-full focus:outline-none" onClick={toggleProfileDropdown}>
                <FaUser size={28} />

</button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleSignOut}>Profile</button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleSignOut}>Sign out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleFetchCredentials}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
          </div>
          <div className="ml-auto">
          <Link href="/register">
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Apply for Leave
  </button>
</Link>


            
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">My Previous Leaves</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
