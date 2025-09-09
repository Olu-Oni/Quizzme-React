// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const parsedUserId = userId ? JSON.parse(userId) : null;
  
  // If userId doesn't exist, redirect to login
  if (!parsedUserId) {
    return <Navigate to="/login" replace />;
  }
  
  // If userId exists, render the protected content
  return children;
};

export default ProtectedRoute;