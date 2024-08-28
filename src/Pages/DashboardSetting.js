import React, { useState } from 'react';
import { MdCancel, MdSave } from 'react-icons/md';

const DashboardSettings = () => {
  const [preferences, setPreferences] = useState({
    timeZone: 'UTC-08:00',
    language: 'English (US)',
    sidebarSize: 'Medium (200px)',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', preferences);
  };

  const handleCancel = () => {
    console.log('Changes canceled');
  };

  return (
    <div className="flex flex-col md:flex-row p-5 px-0 min-h-screen">
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
        <ul className="space-y-4">
          <li className="font-medium text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-md">General</li>
          <li className="font-medium text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-md">Preferences</li>
          <li className="font-medium text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-md">Notifications</li>
          <li className="font-medium text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-md">Account</li>
          <li className="font-medium text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-md">User Permissions</li>
          <li className="font-medium text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-md">Billings</li>
        </ul>
      </div>
      <div className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Preferences</h3>
            <p className="text-gray-600">Customize your experience with these preferences.</p>
          </div>
          <div className='flex'>
  <button 
    onClick={handleCancel} 
    className="mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-300"
  >
    <MdCancel className="text-2xl md:hidden  rounded-full p-1 bg-gray-300 text-gray-700" />
    <span className="hidden md:inline">Cancel</span>
  </button>
  <button 
    onClick={handleSave} 
    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
  >
    <MdSave className="text-2xl md:hidden  rounded-full p-1 bg-blue-500 text-white" />
    <span className="hidden md:inline">Save</span>
  </button>
</div>

        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Time Zone</label>
            <select
              name="timeZone"
              value={preferences.timeZone}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
              <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
              <option value="UTC+01:00">UTC+01:00 (Central European Time)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="English (US)">English (US)</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Sidebar Size</label>
            <select
              name="sidebarSize"
              value={preferences.sidebarSize}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Small (120px)">Small (120px)</option>
              <option value="Medium (200px)">Medium (200px)</option>
              <option value="Large (280px)">Large (280px)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
