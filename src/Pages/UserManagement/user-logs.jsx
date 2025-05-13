import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LogDetailsPage = () => {
  const navigate = useNavigate()

  // Sample log data - in a real app, you would fetch this based on logId
  const logData = {
    id: "TX1289HUE",
    ipAddress: "192.168.0.1",
    module: "Event/News",
    activity: "Created New Event",
    activityDetails: "See details",
    performedBy: "Uche ThankGod Chukwuebuka",
    timestamp: "2025-09-09 | 09:00",
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full px-6 py-4 mx-auto">
        {/* Header */}
        <div className="pb-4 border-b">
          <button className="flex p-1 rounded shadow items-center text-gray-600" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Log Information */}
        <div className="p-4 border mt-4 rounded">
          <h2 className="text-lg font-medium mb-6">Log Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">LOG ID</label>
              <p>{logData.id}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">IP ADDRESS</label>
              <p>{logData.ipAddress}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Module</label>
              <p>{logData.module}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Activity performed</label>
              <p>
                {logData.activity} (
                <a href="#" className="text-blue-500">
                  See details
                </a>
                )
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Performed by</label>
              <p>{logData.performedBy}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Time Stamp</label>
              <p>{logData.timestamp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default LogDetailsPage
