// src/AuthGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// AuthGuard component to protect routes
const AuthGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('User'));

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
