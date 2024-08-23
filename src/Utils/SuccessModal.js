// SuccessModal.js
import React from 'react';

function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold text-green-600">{message}</h2>
      </div>
    </div>
  );
}

export default SuccessModal;
