import React, { useState } from 'react';

function AddRecordForm({ onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: Math.random(), // Random ID for simplicity
      name: e.target.name.value,
      loginUrl: e.target.loginUrl.value,
      username: e.target.username.value,
      password: e.target.password.value,
      notes: e.target.notes.value,
      shareWith: e.target.shareWith.value,
      attachFiles: e.target.attachFiles.files[0],
      setReminder: e.target.setReminder.value,
    };

    onSave(newRecord);
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal on cancel
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${!isModalOpen ? 'hidden' : ''}`}>
      <div className="bg-white rounded-lg w-full record-form-custom sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleCancel}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Login URL</label>
              <input
                type="text"
                name="loginUrl"
                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 text-lg font-semibold mb-2">Notes</label>
            <textarea
              name="notes"
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px] sm:min-h-[120px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Share with</label>
              <select
                name="shareWith"
                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="myTeam">My Team</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Attach files</label>
              <input
                type="file"
                name="attachFiles"
                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 text-lg font-semibold mb-2">Set reminder</label>
            <select
              name="setReminder"
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="none">--Choose a reminder period--</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex justify-between mt-4 sm:mt-6">
            <button
              type="submit"
              className="p-2 sm:p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Save
            </button>
            <button
              type="button"
              className="p-2 sm:p-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecordForm;
