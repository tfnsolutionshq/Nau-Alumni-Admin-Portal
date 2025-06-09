"use client"

import { useState } from 'react';
import { X } from 'lucide-react';

const DeclineReasonModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Please enter a reason for declining.");
      return;
    }
    setError(null);
    onConfirm(reason); // Pass the reason back to the parent
    setReason(''); // Clear input
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Decline Application</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 mb-4">Please enter the reason for declining this application:</p>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError(null); // Clear error when typing
            }}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="e.g., Incomplete documentation, Failed verification check..."
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclineReasonModal;
