import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

function AddRecordForm({ onSave, existingRecord }) {
  const [formValues, setFormValues] = useState({
    id: existingRecord ? existingRecord.id : Math.random(),
    name: existingRecord?.name || '',
    role: existingRecord?.role || '',
    email: existingRecord?.email || '',
    phone: existingRecord?.phone || '',
    loginUrl: existingRecord?.loginUrl || '',
    linkToTeams: existingRecord?.linkToTeams || '',
    username: existingRecord?.username || '',
    password: existingRecord?.password || '',
    notes: existingRecord?.notes || '',
    shareWith: existingRecord?.shareWith || '',
    attachFiles: null,
    setReminder: existingRecord?.setReminder || '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formValues);
  };

  const handleCancel = () => {
    onSave(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full record-form-custom-alignment sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleCancel}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Login URL</label>
              <input
                type="url"
                name="loginUrl"
                value={formValues.loginUrl}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Link to Teams</label>
              <input
                type="url"
                name="linkToTeams"
                value={formValues.linkToTeams}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Notes</label>
              <textarea
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Share With</label>
              <input
                type="text"
                name="shareWith"
                value={formValues.shareWith}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Attach Files</label>
              <input
                type="file"
                name="attachFiles"
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-800 text-lg font-semibold mb-2">Set Reminder</label>
              <input
                type="datetime-local"
                name="setReminder"
                value={formValues.setReminder}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
    
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all sm:px-6 sm:py-3"
        >
          <FaSave className="block sm:hidden mr-2" />
          Create
        </button>
      </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecordForm;
