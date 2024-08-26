import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import DashboardSidebar from '../Component/DashboardSidebar';
import DashboardNavbar from '../Component/DashboardNavbar';
import DashboardTable from '../Pages/DashboardTable';

function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current route
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Determine the page title based on the current path
  const getPageTitle = () => {
    if (location.pathname === '/dashboard/table') {
      return 'Table View';
    } else if (location.pathname === '/dashboard') {
      return 'Dashboard Overview'; // Default title for the dashboard route
    } else {
      return 'Dashboard'; // Fallback title for other routes
    }
  };

  const breadcrumbPaths = [
    { name: 'Dashboards', link: '/dashboard' },
    { name: 'Table', link: '/dashboard/table' },
    // Add more breadcrumb paths if needed
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar 
          toggleSidebar={toggleSidebar}
          pageTitle={getPageTitle()} // Use dynamic page title
          paths={breadcrumbPaths}
          
        />
        
        {/* Main content area with routing */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/table" element={<DashboardTable />} />
            {/* Add other routes here as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
