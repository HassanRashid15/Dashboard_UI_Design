// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Home from './Pages/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import SignupNavbar from './Component/Signupnavbar';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Utils/ProtectedRoute';
import DashboardNavbar from './Component/DashboardNavbar';
import { auth } from './FirbaseAuth/Config'; // Ensure correct path
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  ); // Display loader while checking auth

  const renderNavbar = () => {
    if (location.pathname === '/signup') {
      return <SignupNavbar />;
    } else if (location.pathname.startsWith('/dashboard')) {
      return <DashboardNavbar />;
    } else {
      return <Navbar />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {renderNavbar()}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              currentUser ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route path="/signup" element={<Signup />} />
          {/* Add other routes here */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
