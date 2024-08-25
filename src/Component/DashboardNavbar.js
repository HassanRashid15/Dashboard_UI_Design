import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../FirbaseAuth/Config'; // Ensure correct path
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function DashboardNavbar({ toggleSidebar, username }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logout button clicked'); // Debugging line
    signOut(auth)
      .then(() => {
        console.log('Sign out successful'); // Debugging line
        // Delay before showing the toast message
        setTimeout(() => {
          toast.success('Signed out successfully!', {
            autoClose: 2000,  // Show toast for 2 seconds
            hideProgressBar: true,
            onClose: () => navigate('/login'), // Redirect after the toast closes
          });
        }, 500); // Delay before showing the toast (0.5 second)
      })
      .catch((error) => {
        console.error('Error signing out:', error);
        toast.error('Error signing out. Please try again.', {
          autoClose: 2000, // Auto-close after 2 seconds
          hideProgressBar: true,
        });
      });
  };
  
  
  // Get the first letter of the username
  const userInitial = username ? username.charAt(0).toUpperCase() : '';

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

      {/* Dashboard Title */}
      <h1 className="custom-navbar-title">
        Dashboard
      </h1>

      {/* Navbar Actions */}
      <div className="custom-navbar-actions hidden md:flex items-center">
        <button className="custom-navbar-action">Notifications</button>

        {/* Profile Avatar */}
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
        {/* Mobile Profile Avatar */}
        <div className="relative ml-4">
          <button
            className="profile-avatar"
            onClick={handleProfileMenuToggle}
          >
            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
              {userInitial}
            </div>
          </button>
          {/* Mobile Profile Menu Dropdown */}
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
