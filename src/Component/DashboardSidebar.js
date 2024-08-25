import React from 'react';

function DashboardSidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Toggle Button for Mobile View */}
      <button
        className="dashboard-sidebar-toggle"
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
      <h1 className="dashboard-sidebar-title">
        Dashboard
      </h1>
      
      {/* Sidebar Navigation */}
      <nav className="dashboard-sidebar-nav">
        <ul>
          <li>
            <a href="#" className="dashboard-sidebar-link">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="dashboard-sidebar-link">
              Users
            </a>
          </li>
          <li>
            <a href="#" className="dashboard-sidebar-link">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardSidebar;
