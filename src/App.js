import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Home from './Pages/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import SignupNavbar from './Component/Signupnavbar';
import Dashboard from './Pages/Dashboard.js';
import ProtectedRoute from './Utils/ProtectedRoute';
import { auth } from './FirbaseAuth/Config'; // Ensure correct path
import { onAuthStateChanged } from 'firebase/auth';
import ResetPassword from './Component/ResetPassword';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

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
      return null; // Remove DashboardNavbar here
    } else {
      return <Navbar />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {renderNavbar()} {/* Render the appropriate navbar */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              currentUser ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/* Add other routes here */}
        </Routes>
      </div>
      <Footer />
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;

