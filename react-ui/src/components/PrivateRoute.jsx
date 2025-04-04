import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaSpinner } from "react-icons/fa"
const PrivateRoute = ({ children }) => {
  const { userName, loading } = useAuth();
  if (loading) {
    return <div className="spinner-container"><FaSpinner className="spinner-icon" /></div>;
  }
  
  return userName ? children : <Navigate to="/" />;
};
export default PrivateRoute;