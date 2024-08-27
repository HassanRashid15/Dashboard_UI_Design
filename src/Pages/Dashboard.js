import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardSidebar from '../Component/DashboardSidebar';
import DashboardNavbar from '../Component/DashboardNavbar';
import DashboardTable from '../Pages/DashboardTable';
import DashboardSetting from './../Pages/DashboardSetting.js';
import DashboardContent from '../Pages/DashboardContent';

function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard/table':
        return 'Table View';
      case '/dashboard/analytics':
        return 'Analytics';
      case '/dashboard/setting':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const breadcrumbPaths = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Table', link: '/table' },
    { name: 'Setting', link: '/setting' },
  ];

  return (
    <div className="relative flex flex-col md:flex-row">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <DashboardNavbar
          toggleSidebar={toggleSidebar}
          pageTitle={getPageTitle()}
          paths={breadcrumbPaths}
        />

        <main className="flex-1 p-5">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/table" element={<DashboardTable />} />
            <Route path="/setting" element={<DashboardSetting />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;