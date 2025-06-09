"use client"

import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { MoreVertical, ChevronRight } from "lucide-react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext" 

function AdminDashboard() {
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [activeTimeframe, setActiveTimeframe] = useState("12 months")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { token, isAuthenticated } = useAuth()

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions)
  }

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/admin/dashboard",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.request(config)
        setDashboardData(response.data)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [isAuthenticated, token])

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${Number.parseFloat(amount).toLocaleString()}`
  }

  // Format percentage
  const formatPercentage = (percentage) => {
    return `${percentage > 0 ? "+" : ""}${percentage}%`
  }

  // Generate chart path from monthly trend data
  const generateChartPath = (monthlyData) => {
    if (!monthlyData || monthlyData.length === 0) return ""

    const maxAmount = Math.max(...monthlyData.map((d) => d.amount))
    const width = 1000
    const height = 200
    const stepX = width / (monthlyData.length - 1)

    return monthlyData
      .map((data, index) => {
        const x = index * stepX
        const y = height - (data.amount / (maxAmount || 1)) * (height * 0.8)
        return index === 0 ? `M${x},${y}` : `L${x},${y}`
      })
      .join(" ")
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen font-instrument bg-white p-4 md:p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading dashboard data...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen font-instrument bg-white p-4 md:p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen font-instrument bg-white p-4 md:p-6">
        <div className="w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-xl md:text-2xl font-medium">
              Welcome, <span className="font-bold">Admin</span>
            </h1>
            <div className="relative">
              <button
                onClick={toggleQuickActions}
                className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-1 w-full sm:w-auto justify-center"
              >
                Quick Actions
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-200 ${showQuickActions ? "rotate-90" : ""}`}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Donations Card */}
            <div className="bg-white p-4 md:p-5 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Donations</h2>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold">
                      {dashboardData?.donations?.active?.count || 0}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(dashboardData?.donations?.active?.percentage_increase || 0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expired</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold">
                      {dashboardData?.donations?.expired?.count || 0}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(dashboardData?.donations?.expired?.percentage_increase || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Members Card */}
            <div className="bg-white p-4 md:p-5 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Members</h2>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold">
                      {dashboardData?.members?.pending?.count || 0}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(dashboardData?.members?.pending?.percentage_increase || 0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold">
                      {dashboardData?.members?.approved?.count || 0}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(dashboardData?.members?.approved?.percentage_increase || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Insights */}
          <div className="bg-white p-4 md:p-5 rounded-lg border shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="font-medium">Donation Insights</h2>
              <button className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto">
                View report
              </button>
            </div>

            {/* Time filters */}
            <div className="flex gap-2 md:gap-4 mb-6 overflow-x-auto pb-2">
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

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                {/* Line Chart */}
                <div className="w-full h-48 relative">
                  {/* Chart background */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full h-px bg-gray-200"></div>
                  </div>

                  {/* Chart line */}
                  <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <path
                      d={generateChartPath(dashboardData?.donation_insights?.monthly_trend) || "M0,150 L1000,150"}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Month labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
                    {dashboardData?.donation_insights?.monthly_trend?.map((data, index) => (
                      <span key={index} className="hidden sm:block">
                        {data.month}
                      </span>
                    )) || (
                      <>
                        <span>Jan</span>
                        <span className="hidden sm:block">Feb</span>
                        <span className="hidden sm:block">Mar</span>
                        <span className="hidden sm:block">Apr</span>
                        <span className="hidden sm:block">May</span>
                        <span>Jun</span>
                        <span className="hidden sm:block">Jul</span>
                        <span className="hidden sm:block">Aug</span>
                        <span className="hidden sm:block">Sep</span>
                        <span className="hidden sm:block">Oct</span>
                        <span className="hidden sm:block">Nov</span>
                        <span>Dec</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Total Donations</p>
                  <div className="flex items-center">
                    <span className="text-2xl md:text-3xl font-bold">
                      {dashboardData?.donation_insights?.total_donations?.count || 0}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(dashboardData?.donation_insights?.total_donations?.percentage_increase || 0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Participants</p>
                  <div className="flex items-center">
                    <span className="text-2xl md:text-3xl font-bold">
                      {dashboardData?.donation_insights?.total_participants?.count || 0}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(dashboardData?.donation_insights?.total_participants?.percentage_increase || 0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount Donated</p>
                  <div className="flex items-center">
                    <span className="text-2xl md:text-3xl font-bold">
                      {formatCurrency(dashboardData?.donation_insights?.total_amount_donated?.amount || 0)}
                    </span>
                    <span className="ml-2 text-xs p-1 items-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {formatPercentage(
                        dashboardData?.donation_insights?.total_amount_donated?.percentage_increase || 0,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
