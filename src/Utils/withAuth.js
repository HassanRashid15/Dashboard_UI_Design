// src/Utils/withAuth.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../FirbaseAuth/Config'; // Ensure the path is correct
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    if (loading) return <div className="loader"><div className="spinner"></div></div>; // Show loader while checking auth

    return user ? <WrappedComponent {...props} /> : <Navigate to="/login" />;
  };
};

export default withAuth;
