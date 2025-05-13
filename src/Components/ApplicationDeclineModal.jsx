"use client"

import { useState } from "react"

const DeclineReasonModal = ({ onConfirm, onCancel }) => {
  const [reason, setReason] = useState("")

  const handleReasonChange = (e) => {
    setReason(e.target.value)
  }

  const handleConfirm = () => {
    onConfirm(reason)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Reason for Decline</h3>
          <textarea
            value={reason}
            onChange={handleReasonChange}
            placeholder="Enter your suggestion"
            className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeclineReasonModal
