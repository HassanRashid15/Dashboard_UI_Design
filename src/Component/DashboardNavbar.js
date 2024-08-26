import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../FirbaseAuth/Config'; // Ensure correct path
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function DashboardNavbar({ toggleSidebar, username, email, pageTitle, paths, currentView }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title dynamically based on pageTitle prop
    document.title = pageTitle || 'Dashboard';
  }, [pageTitle]); // Dependency array ensures this runs when pageTitle changes

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

  // Determine the display name for the avatar
  const getInitial = (str) => {
    if (str) {
      const trimmedStr = str.trim();
      if (trimmedStr.length === 0) return 'N/A'; // Handle empty strings
      const firstChar = trimmedStr.charAt(0).toUpperCase();
      return /^[A-Za-z]$/.test(firstChar) ? firstChar : 'N/A';
    }
    return 'N/A';
  };

  // Get the initial from either username or email
  const userInitial = getInitial(username || email || 'Guest');

  // Debugging logs
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('User Initial:', userInitial);

  return (
    <div className="custom-navbar">
      {/* Sidebar Toggle Button for Mobile View */}
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

      {/* Displaying the Dynamic Page Title */}
      <h1 className="custom-navbar-title">
        {pageTitle || 'Dashboard'}
      </h1>

      {/* Conditional Rendering Based on View */}
      {currentView === 'table' && (
        <div className="table-view">
          {/* Render content specific to the table view */}
        </div>
      )}

      {/* Navbar Actions */}
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
          {/* Profile Menu Dropdown */}
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

      {/* Mobile View */}
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
