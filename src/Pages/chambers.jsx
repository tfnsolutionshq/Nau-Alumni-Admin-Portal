import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useState } from "react"

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState("nomination")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex justify-center">
            <button
              className={`px-6 py-4 text-sm ${
                activeTab === "nomination" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("nomination")}
            >
              Nomination
            </button>
            <button
              className={`px-6 py-4 text-sm ${
                activeTab === "election" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("election")}
            >
              Election
            </button>
            <button
              className={`px-6 py-4 text-sm ${
                activeTab === "chapters" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("chapters")}
            >
              Chapters
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <h2 className="text-xl font-medium mb-2">Coming Soon</h2>
          <p className="text-gray-500">Check back Later</p>
        </div>

        {/* Divider */}
        <div className="max-w-md mx-auto border-t border-gray-200 my-8"></div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default TabsPage
