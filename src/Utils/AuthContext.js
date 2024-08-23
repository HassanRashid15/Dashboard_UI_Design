// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './../FirbaseAuth/Config.js';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingSpinner from '../Utils/LoadingSpinner';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
