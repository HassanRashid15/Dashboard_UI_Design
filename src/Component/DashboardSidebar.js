import React from 'react';
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

function DashboardSidebar({ isOpen, toggleSidebar }) {
  const links = [
    { icon: <FaHome />, name: 'Overview', href: '/dashboard' },
    { name: 'Tables', href: '/dashboard/table' },
    { name: 'Setting', href: '/dashboard/setting' },
  ];

  return (
    <div className={`bg-gray-800 text-white w-64 min-h-screen ${isOpen ? 'block' : 'hidden'} md:block`}>
      {/* Sidebar Toggle Button for Mobile View */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <h1 className="text-xl font-bold">TeamPassword</h1>
        <button onClick={toggleSidebar}>
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
      </div>
      
      <h1 className="text-2xl font-bold p-4 hidden md:block">TeamPassword</h1>

      {/* Sidebar Navigation */}
      <nav className="p-4">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="block px-4 py-2 rounded hover:bg-gray-700">
               {link.icon} {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default DashboardSidebar;
