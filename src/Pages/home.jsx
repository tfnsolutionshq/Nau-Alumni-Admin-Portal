import DashboardLayout from '../Components/Layout/DashboardLayout';
import { useState } from "react"
import { MoreVertical, ChevronRight } from "lucide-react"

function Home() {
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [activeTimeframe, setActiveTimeframe] = useState("12 months")

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions)
  }
  return (
    <DashboardLayout>
      <div className="min-h-screen font-instrument bg-white p-4 md:p-6">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">
            Welcome, <span className="font-bold">Adeola</span>
          </h1>
          <div className="relative">
            <button
              onClick={toggleQuickActions}
              className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-1"
            >
              Quick Actions
              <ChevronRight 
                className={`w-5 h-5 transition-transform duration-200 ${
                  showQuickActions ? 'rotate-90' : ''
                }`} 
              />
            </button>

            {showQuickActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  <li>
                    <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                      New Donation
                    </a>
                  </li>
                  <li>
                    <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                      Add Member
                    </a>
                  </li>
                  <li>
                    <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                      Generate Report
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Donations Card */}
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Donations</h2>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">10</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]"><p>+ 3.4</p></span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expired</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">10</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">+ 3.4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Members Card */}
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Members</h2>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">10</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">+ 3.4</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">10</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">+ 3.4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Insights */}
        <div className="bg-white p-5 rounded-lg border shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Donation Insights</h2>
            <button className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2">View report</button>
          </div>

          {/* Time filters */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {["12 months", "3 months", "30 days", "7 days", "24 hours"].map((timeframe) => (
              <button
                key={timeframe}
                className={`text-sm px-2 py-1 whitespace-nowrap ${
                  activeTimeframe === timeframe ? "text-gray-900 bg-gray-50 p-1 rounded font-medium" : "text-gray-500"
                }`}
                onClick={() => setActiveTimeframe(timeframe)}
              >
                {timeframe}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {/* Line Chart */}
              <div className="w-full h-48 relative">
                {/* Chart background */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-px bg-gray-200"></div>
                </div>

                {/* Chart line */}
                <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                  <path
                    d="M0,150 C50,140 100,160 150,150 C200,140 250,130 300,140 C350,150 400,160 450,150 C500,140 550,130 600,120 C650,110 700,100 750,90 C800,80 850,70 900,60 C950,50 1000,40 1000,40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>

                {/* Month labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold">100</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">+ 8.1%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Participants</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold">4,862</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">+ 9.2%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount Donated</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold">N24,671</span>
                  <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">+ 6.6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default Home;