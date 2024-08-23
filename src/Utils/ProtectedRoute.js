// src/Utils/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from './../FirbaseAuth/Config.js'; // Ensure path is correct

function ProtectedRoute({ element }) {
  // Check if the user is authenticated
  const user = auth.currentUser;

  return user ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
