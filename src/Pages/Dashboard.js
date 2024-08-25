import React, { useState } from 'react';
import DashboardSidebar from '../Component/DashboardSidebar';
import DashboardNavbar from '../Component/DashboardNavbar';



function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        {/* Main content goes here */}
        <main className="flex-1 p-6">
        <h1>hekldmflsdkmlsamdlkas</h1>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
