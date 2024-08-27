import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiBarChartFill } from 'react-icons/ri';

function DashboardSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const links = [
    { icon: <FaHome />, name: 'Overview', href: '/dashboard' },
    { icon: <RiBarChartFill />, name: 'Tables', href: '/dashboard/table' },
    { icon: <IoSettingsSharp />, name: 'Setting', href: '/dashboard/setting' },
  ];

  return (
    <div className={`bg-gray-900 text-gray-200 w-64 min-h-screen fixed top-0 left-0 z-50 transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 md:relative md:translate-x-0`}>
      <div className="flex justify-between items-center p-4 md:hidden">
        <h1 className="text-xl font-bold text-white">TeamPassword</h1>
        <button onClick={toggleSidebar}>
          <svg
            className="w-6 h-6 text-white"
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
      
      <h1 className="text-2xl font-bold p-4 text-white hidden md:block">TeamPassword</h1>

      <nav className="p-4">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`flex items-center px-4 py-2 text-lg font-medium rounded hover:bg-gray-700 ${
                  location.pathname === link.href ? 'bg-gray-700 text-white' : ''
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default DashboardSidebar;
