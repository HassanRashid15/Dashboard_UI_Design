import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import AddRecordForm from './AddRecordForm';
import { ref, set, push, onValue, remove } from 'firebase/database';
import { database } from "./../../FirbaseAuth/Config.js";


function DashboardRecord() {
  const [records, setRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveRecord =  (newRecord) => {
    if (newRecord) {
      if (isEditing) {
        console.log("func called",newRecord)
        const recordRef =  ref(database, `records/${newRecord.id}`);
        console.log("recordRef", recordRef)

        set(recordRef, newRecord);
        setRecords(records.map(record => (record.id === newRecord.id ? newRecord : record)));
      } else {
        const recordRef = push(ref(database, 'records'));
        const newId = recordRef.key;
        set(recordRef, { ...newRecord, id: newId });
        setRecords([...records, { ...newRecord, id: newId }]);
        setCurrentIndex(records.length);
      }
    }
    setFormVisible(false);
    setIsEditing(false);
  };
  React.useEffect(() => {
    const recordsRef = ref(database, 'records');
    onValue(recordsRef, (snapshot) => {
      const data = snapshot.val();
      const recordsList = data ? Object.values(data) : [];
      setRecords(recordsList);
    });
  }, []);
  

  const handleEditRecord = (updatedRecord) => {
    setRecords(records.map(record =>
      record.id === updatedRecord.id ? updatedRecord : record
    ));
    setCurrentIndex(records.findIndex(record => record.id === updatedRecord.id));
    setFormVisible(false);
    setIsEditing(false);
  };

  const handleRemoveRecord = () => {
    if (currentIndex !== null && records[currentIndex]) {
      const recordRef = ref(database, `records/${records[currentIndex].id}`);
      remove(recordRef);
      const updatedRecords = records.filter((_, index) => index !== currentIndex);
      setRecords(updatedRecords);
      setCurrentIndex(updatedRecords.length > 0 ? (currentIndex % updatedRecords.length) : null);
    }
  };
  

  const currentRecord = records[currentIndex];

  return (
    <div className="flex flex-col lg:flex-row h-screen record-form-parent bg-gray-100">
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
                  <div className="font-semibold">{record.name}</div>
                  <div className="text-sm text-gray-600">{record.role}</div>
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

      <div className="flex-1 p-4 overflow-y-auto record-main-content-area">
        {currentRecord ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-6">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="rounded-full w-16 h-16 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{currentRecord.name} ({currentRecord.initials})</h2>
                <p className="text-gray-600">{currentRecord.role}</p>
              </div>
              <button  className="ml-auto text-blue-500 hover:text-blue-700"
               onClick={() => {
                setFormVisible(true);
                setIsEditing(true);
              }}
              disabled={currentRecord === undefined}>
                <FaEdit />
              </button>
              
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
  <div className="space-y-4">
    <p className="text-gray-600 break-all"><strong>Email:</strong> {currentRecord.email}</p>
    <p className="text-gray-600"><strong>Phone:</strong> {currentRecord.phone}</p>
    <p className="text-gray-600">
      <strong>Login URL:</strong> 
      <a 
        href={currentRecord.loginUrl} 
        className="text-blue-500 hover:underline break-all" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {currentRecord.loginUrl}
      </a>
    </p>
  </div>
  <div className="space-y-4">
    <p className="text-gray-600"><strong>Link to Teams:</strong> {currentRecord.linkToTeams}</p>
    <p className="text-gray-600 flex items-center">
      <strong>Password:</strong> 
      <span className="ml-2">{showPassword ? currentRecord.password : '••••••••'}</span>
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="text-gray-600 ml-2"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </p>
    <p className="text-gray-600"><strong>Reminder:</strong> {currentRecord.setReminder}</p>
  </div>
</div>



            {/* Actions */}
            <div className="flex justify-end mt-6">
           
              <button
                className=" text-red-500 transition-all "
                onClick={handleRemoveRecord}
                disabled={currentRecord === undefined}
              >
                <FaTrash className="" />
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
