"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const MembersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    const fetchMembers = async () => {
      // Wait for auth to load and check if authenticated
      if (authLoading) return

      if (!isAuthenticated || !token) {
        setError("Please log in to view members.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/members",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.request(config)
        setMembers(response.data.members.data)
      } catch (err) {
        console.error("Error fetching members:", err)
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.")
        } else {
          setError("Failed to load members. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [token, isAuthenticated, authLoading])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading...</div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
          Please log in to access this page.
        </div>
      </DashboardLayout>
    )
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading members...</div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Error: {error}</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen px-6 py-4">
        <div className="w-full mx-auto">
          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                Sort By
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                Export
              </button>
              <Link to={`/add-member`}>
                <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
                  Create New Member
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
          <hr className="mb-4" />
          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">MEMBER NAME</th>
                    <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
                    <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
                    <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
                    <th className="text-right py-3 px-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b">
                      <td className="py-3 px-4">
                        <Link to={`/member-profile/${member.id}`} className="flex underline items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            {member.first_name.charAt(0)}
                          </div>
                          {member.first_name} {member.last_name}
                        </Link>
                      </td>
                      <td className="py-3 px-4">{member.chapter_of_interest}</td>
                      <td className="py-3 px-4">{member.email}</td>
                      <td className="py-3 px-4">{member.phone}</td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/member-profile/${member.id}`}
                          className="text-gray-600 flex items-center gap-1 ml-auto"
                        >
                          View Profile
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {members.length}</div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center border rounded-md">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                    currentPage === 1 ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center border rounded-md">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
                {members.length} / page
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MembersList
