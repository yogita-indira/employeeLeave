// ProtectedRoute.js

import useAuth from './useAuth'; // Import the custom hook

const ProtectedRoute = ({ children }) => {
  useAuth(); // Use the custom hook for authentication
  return children; // Render the children components if authentication is successful
};

export default ProtectedRoute;
