import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AddRecordForm from './AddRecordForm';

function DashboardRecord() {
  const [records, setRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveRecord = (newRecord) => {
    if (newRecord) {
      if (isEditing) {
        setRecords(records.map(record =>
          record.id === newRecord.id ? newRecord : record
        ));
      } else {
        setRecords([...records, newRecord]);
        setCurrentIndex(records.length);
      }
    }
    setFormVisible(false);
    setIsEditing(false);
  };

  const handleEditRecord = (updatedRecord) => {
    setRecords(records.map(record =>
      record.id === updatedRecord.id ? updatedRecord : record
    ));
    setCurrentIndex(records.findIndex(record => record.id === updatedRecord.id));
    setFormVisible(false);
    setIsEditing(false);
  };

  const handleRemoveRecord = () => {
    if (currentIndex !== null) {
      const updatedRecords = records.filter((_, index) => index !== currentIndex);
      setRecords(updatedRecords);
      setCurrentIndex(updatedRecords.length > 0 ? (currentIndex % updatedRecords.length) : null);
    }
  };

  const currentRecord = records[currentIndex];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white shadow-md p-4 lg:sticky rounded-lg lg:top-0 lg:h-screen border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Records</h2>
        <div className="mb-4">
          <ul className="space-y-2">
            {records.length === 0 ? (
              <li className="text-gray-600">No records available</li>
            ) : (
              records.map((record, index) => (
                <li
                  key={record.id}
                  className={`cursor-pointer p-2 rounded-lg ${index === currentIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {record.name}
                </li>
              ))
            )}
          </ul>
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mt-4"
            onClick={() => {
              setFormVisible(true);
              setIsEditing(false);
            }}
          >
            Add New Record
          </button>
        </div>
      </div>

      <div className="flex-1 px-0 p-4 overflow-y-auto mt-5 record-main-content-area">
        {currentRecord ? (
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">{currentRecord.name}</h2>
            {currentRecord.username && <p className="text-gray-600 mb-2">Username: {currentRecord.username}</p>}
            {currentRecord.loginUrl && (
              <p className="text-gray-600 mb-2">
                Login URL: <a href={currentRecord.loginUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{currentRecord.loginUrl}</a>
              </p>
            )}
            {currentRecord.password && (
              <div className="flex items-center mb-2">
                <p className="text-gray-600 flex-1">Password: {showPassword ? currentRecord.password : '••••••••'}</p>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600 ml-2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            )}
            {currentRecord.notes && <p className="text-gray-600 mb-2">Notes: {currentRecord.notes}</p>}
            {currentRecord.shareWith && <p className="text-gray-600 mb-2"> {currentRecord.shareWith === 'myTeam' ? 'My Team' : 'Private'}</p>}
            {currentRecord.setReminder && <p className="text-gray-600 mb-2">Reminder: {currentRecord.setReminder}</p>}
            {currentRecord.attachFiles && (
              <p className="text-gray-600 mb-2">Attached File: <a href={URL.createObjectURL(currentRecord.attachFiles)} className="text-blue-500 hover:underline" download>{currentRecord.attachFiles.name}</a></p>
            )}
            <div className="flex justify-between mt-4">
              <button
                className="p-2 bg-blue-500 text-white rounded-lg w-1/12 hover:bg-blue-600 transition-all"
                onClick={() => {
                  setFormVisible(true);
                  setIsEditing(true);
                }}
                disabled={currentRecord === undefined}
              >
                Edit
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                onClick={handleRemoveRecord}
                disabled={currentRecord === undefined}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-center">Select a record to view details</p>
          </div>
        )}
        {isFormVisible && (
          <AddRecordForm
            onSave={handleSaveRecord}
            existingRecord={isEditing ? currentRecord : null}
            onEdit={handleEditRecord}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardRecord;
