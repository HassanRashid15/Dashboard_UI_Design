import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../FirbaseAuth/Config'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function DashboardNavbar({ toggleSidebar, username, email, pageTitle, paths, currentView }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = pageTitle || 'Dashboard';
  }, [pageTitle]); 

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully!', {
        autoClose: 2000,
        hideProgressBar: true,
        onClose: () => navigate('/login'),
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(`Error signing out: ${error.message}`, {
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  };
  const getInitial = (str) => {
    if (str) {
      const trimmedStr = str.trim();
      if (trimmedStr.length === 0) return 'N/A'; 
      const firstChar = trimmedStr.charAt(0).toUpperCase();
      return /^[A-Za-z]$/.test(firstChar) ? firstChar : 'N/A';
    }
    return 'N/A';
  };
  const userInitial = getInitial(username || email || 'Guest');
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('User Initial:', userInitial);
  return (
    <div className="custom-navbar">
      <button
        className="custom-navbar-toggle"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <h1 className="custom-navbar-title">
        {pageTitle || 'Dashboard'}
      </h1>
      {currentView === 'table' && (
        <div className="table-view">
        </div>
      )}
      <div className="custom-navbar-actions hidden md:flex items-center">
        <div className="relative ml-4 flex">
          <button
            className="profile-avatar"
            onClick={handleProfileMenuToggle}
          >
            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
              {userInitial}
            </div>
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border avatar-profile-custom border-gray-200 rounded-lg shadow-lg">
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Profile</button>
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Settings</button>
              <button 
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left" 
                onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <div className="relative ml-4">
          <button
            className="profile-avatar"
            onClick={handleProfileMenuToggle}
          >
            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
              {userInitial}
            </div>
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Profile</button>
              <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Settings</button>
              <button 
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left" 
                onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
