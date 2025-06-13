// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState } from "react"
// import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom"

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState("users")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [searchQuery, setSearchQuery] = useState("")
//     const navigate = useNavigate()

//     // Sample data for users
//     const users = [
//         {
//             id: 1,
//             name: "Uche ThankGod Chukwuebuka",
//             chapter: "LAGOS",
//             email: "tuche@gmail.com",
//             phone: "07069790950",
//         },
//         {
//             id: 2,
//             name: "Martins Ologbowu",
//             chapter: "ENUGU",
//             email: "tuche@gmail.com",
//             phone: "07069790950",
//         },
//         {
//             id: 3,
//             name: "Ekene Ezeasor",
//             chapter: "LAGOS",
//             email: "tuche@gmail.com",
//             phone: "07069790950",
//         },
//     ]

//     // Sample data for logs
//     const logs = [
//         {
//             id: "TX1289HUE",
//             module: "Event/News",
//             activity: "Created New Event",
//             timestamp: "2025-09-09 | 09:00",
//             performedBy: "Uche ThankGod",
//             performedByFull: "Uche ThankGod Chukwuebuka",
//         },
//         {
//             id: "TX1289HUE",
//             module: "Event/News",
//             activity: "Created New Event",
//             timestamp: "2025-09-09 | 09:00",
//             performedBy: "Uche ThankGod Chukwuebuka",
//             performedByFull: "Uche ThankGod Chukwuebuka",
//         },
//         {
//             id: "TX1289HUE",
//             module: "Event/News",
//             activity: "Created New Event",
//             timestamp: "2025-09-09 | 09:00",
//             performedBy: "Uche ThankGod Chukwuebuka",
//             performedByFull: "Uche ThankGod Chukwuebuka",
//         },
//     ]

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value)
//     }

//     const handlePageChange = (page) => {
//         setCurrentPage(page)
//     }

//     const handleViewUserProfile = (userId) => {
//         navigate(`/user/${userId}`)
//     }

//     const handleViewLogDetails = (logId) => {
//         navigate(`/log/${logId}`)
//     }

//     const handleCreateNewUser = () => {
//         navigate("/new-user")
//     }

//     // Render Users Tab Content
//     const renderUsersTab = () => (
//         <div className="overflow-x-auto">
//             <table className="w-full rounded border">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="text-left py-3 px-4 font-medium">USER NAME</th>
//                         <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
//                         <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
//                         <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
//                         <th className="text-right py-3 px-4 font-medium"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id} className="border-b">
//                             <td className="py-3 px-4">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//                                         {user.name.charAt(0)}
//                                     </div>
//                                     {user.name}
//                                 </div>
//                             </td>
//                             <td className="py-3 px-4">{user.chapter}</td>
//                             <td className="py-3 px-4">{user.email}</td>
//                             <td className="py-3 px-4">{user.phone}</td>
//                             <td className="py-3 px-4 text-right">
//                                 <button
//                                     className="text-gray-600 flex items-center gap-1 ml-auto"
//                                     onClick={() => handleViewUserProfile(user.id)}
//                                 >
//                                     View Profile
//                                     <ChevronRight className="w-4 h-4" />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )

//     // Render Logs Tab Content
//     const renderLogsTab = () => (
//         <div className="overflow-x-auto">
//             <table className="w-full border rounded">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="text-left py-3 px-4 font-medium">LOG ID</th>
//                         <th className="text-left py-3 px-4 font-medium">MODULE</th>
//                         <th className="text-left py-3 px-4 font-medium">ACTIVITY PERFORMED</th>
//                         <th className="text-left py-3 px-4 font-medium">TIME STAMP</th>
//                         <th className="text-left py-3 px-4 font-medium">PERFORMED BY</th>
//                         <th className="text-right py-3 px-4 font-medium"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map((log, index) => (
//                         <tr key={index} className="border-b">
//                             <td className="py-3 px-4">{log.id}</td>
//                             <td className="py-3 px-4">{log.module}</td>
//                             <td className="py-3 px-4">{log.activity}</td>
//                             <td className="py-3 px-4">{log.timestamp}</td>
//                             <td className="py-3 px-4">
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
//                                         {log.performedBy.charAt(0)}
//                                     </div>
//                                     <span>{log.performedBy}</span>
//                                 </div>
//                             </td>
//                             <td className="py-3 px-4 text-right">
//                                 <button
//                                     className="text-gray-600 flex items-center gap-1 ml-auto"
//                                     onClick={() => handleViewLogDetails(log.id)}
//                                 >
//                                     View Details
//                                     <ChevronRight className="w-4 h-4" />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )

//     return (
//         <DashboardLayout>
//             <div className="min-h-screen bg-white">
//                 <div className="w-full mx-auto py-4 px-6">
//                     {/* Search and Actions */}
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
//                         <div className="relative w-full md:w-64">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchQuery}
//                                 onChange={handleSearch}
//                                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                             />
//                         </div>

//                         <div className="flex gap-2 w-full md:w-auto">
//                             <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//                                 Sort By
//                                 <ChevronDown className="w-4 h-4" />
//                             </button>
//                             <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//                                 Export
//                             </button>
//                             {activeTab === "users" && (
//                                 <Link to={`/add-new-user`}>
//                                 <button
//                                     className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm"
//                                     onClick={handleCreateNewUser}
//                                 >
//                                     Create New User
//                                 </button>
//                                 </Link>
//                             )}
//                         </div>
//                     </div>

//                     {/* Tabs */}
//                     <div className="border-b mb-4">
//                         <div className="flex">
//                             <button
//                                 className={`px-4 py-3 text-sm ${activeTab === "users" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
//                                     }`}
//                                 onClick={() => setActiveTab("users")}
//                             >
//                                 Users
//                             </button>
//                             <button
//                                 className={`px-4 py-3 text-sm ${activeTab === "logs" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
//                                     }`}
//                                 onClick={() => setActiveTab("logs")}
//                             >
//                                 Logs
//                             </button>
//                         </div>
//                     </div>

//                     {/* Tab Content */}
//                     {activeTab === "users" ? renderUsersTab() : renderLogsTab()}

//                     {/* Pagination */}
//                     <div className="p-4 flex flex-col md:flex-row justify-between items-center">
//                         <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: 48</div>
//                         <div className="flex items-center gap-1">
//                             <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                                 <ChevronLeft className="w-4 h-4" />
//                             </button>
//                             <button
//                                 className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 1 ? "bg-gray-100" : ""
//                                     }`}
//                                 onClick={() => handlePageChange(1)}
//                             >
//                                 1
//                             </button>
//                             <button
//                                 className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 2 ? "bg-gray-100" : ""
//                                     }`}
//                                 onClick={() => handlePageChange(2)}
//                             >
//                                 2
//                             </button>
//                             <button
//                                 className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 3 ? "bg-gray-100" : ""
//                                     }`}
//                                 onClick={() => handlePageChange(3)}
//                             >
//                                 3
//                             </button>
//                             <span className="w-8 h-8 flex items-center justify-center">...</span>
//                             <button
//                                 className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 16 ? "bg-gray-100" : ""
//                                     }`}
//                                 onClick={() => handlePageChange(16)}
//                             >
//                                 16
//                             </button>
//                             <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                                 <ChevronRight className="w-4 h-4" />
//                             </button>
//                         </div>
//                         <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
//                             2 / page
//                             <ChevronDown className="w-4 h-4" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </DashboardLayout>
//     )
// }

// export default AdminDashboard














"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  })
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const sortDropdownRef = useRef(null)

  // Click outside detection for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to access this page.")
      setLoading(false)
      return
    }

    fetchUsers()
  }, [token, isAuthenticated, authLoading, currentPage])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/admin/all?page=${currentPage}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      setUsers(response.data.data)
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total,
        per_page: response.data.per_page,
      })
    } catch (error) {
      console.error("Error fetching users:", error)
      if (error.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to load users. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
    setShowSortDropdown(false)
  }

  const handleExport = () => {
    const dataToExport = activeTab === "users" ? filteredAndSortedUsers : logs

    if (dataToExport.length === 0) {
      alert("No data to export")
      return
    }

    let csvContent = ""
    let headers = []

    if (activeTab === "users") {
      headers = ["Name", "Role", "Email", "Phone", "Status"]
      csvContent = headers.join(",") + "\n"

      dataToExport.forEach((user) => {
        const row = [
          `"${user.firstname || ""} ${user.lastname || ""}"`,
          `"${user.roles && user.roles.length > 0 ? user.roles[0].name : "No Role"}"`,
          `"${user.email || ""}"`,
          `"${user.phone || ""}"`,
          `"${user.status || ""}"`,
        ]
        csvContent += row.join(",") + "\n"
      })
    } else {
      headers = ["Log ID", "Module", "Activity", "Timestamp", "Performed By"]
      csvContent = headers.join(",") + "\n"

      dataToExport.forEach((log) => {
        const row = [
          `"${log.id || ""}"`,
          `"${log.module || ""}"`,
          `"${log.activity || ""}"`,
          `"${log.timestamp || ""}"`,
          `"${log.performedBy || ""}"`,
        ]
        csvContent += row.join(",") + "\n"
      })
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${activeTab}_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewUserProfile = (userId) => {
    navigate(`/user/${userId}`)
  }

  const handleViewLogDetails = (logId) => {
    navigate(`/log/${logId}`)
  }

  const handleCreateNewUser = () => {
    navigate("/new-user")
  }

  // Filter and sort users
  const filteredUsers = users.filter(
    (user) =>
      `${user.firstname || ""} ${user.lastname || ""}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.includes(searchQuery) ||
      (user.roles && user.roles.length > 0 && user.roles[0].name?.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredAndSortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = ""
    let bValue = ""

    switch (sortBy) {
      case "name":
        aValue = `${a.firstname || ""} ${a.lastname || ""}`.trim()
        bValue = `${b.firstname || ""} ${b.lastname || ""}`.trim()
        break
      case "email":
        aValue = a.email || ""
        bValue = b.email || ""
        break
      case "role":
        aValue = a.roles && a.roles.length > 0 ? a.roles[0].name : ""
        bValue = b.roles && b.roles.length > 0 ? b.roles[0].name : ""
        break
      case "phone":
        aValue = a.phone || ""
        bValue = b.phone || ""
        break
      case "status":
        aValue = a.status || ""
        bValue = b.status || ""
        break
      default:
        aValue = `${a.firstname || ""} ${a.lastname || ""}`.trim()
        bValue = `${b.firstname || ""} ${b.lastname || ""}`.trim()
    }

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const renderUsersTab = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading users...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">{error}</div>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full rounded border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-medium">USER NAME</th>
              <th className="text-left py-3 px-4 font-medium">ROLE</th>
              <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
              <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
              <th className="text-left py-3 px-4 font-medium">STATUS</th>
              <th className="text-right py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      {user.firstname.charAt(0)}
                    </div>
                    {user.firstname} {user.lastname}
                  </div>
                </td>
                <td className="py-3 px-4">{user.roles && user.roles.length > 0 ? user.roles[0].name : "No Role"}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    className="text-gray-600 flex items-center gap-1 ml-auto"
                    onClick={() => handleViewUserProfile(user.id)}
                  >
                    View Profile
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Render Logs Tab Content
  const renderLogsTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 font-medium">LOG ID</th>
            <th className="text-left py-3 px-4 font-medium">MODULE</th>
            <th className="text-left py-3 px-4 font-medium">ACTIVITY PERFORMED</th>
            <th className="text-left py-3 px-4 font-medium">TIME STAMP</th>
            <th className="text-left py-3 px-4 font-medium">PERFORMED BY</th>
            <th className="text-right py-3 px-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-4">{log.id}</td>
              <td className="py-3 px-4">{log.module}</td>
              <td className="py-3 px-4">{log.activity}</td>
              <td className="py-3 px-4">{log.timestamp}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                    {log.performedBy.charAt(0)}
                  </div>
                  <span>{log.performedBy}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  className="text-gray-600 flex items-center gap-1 ml-auto"
                  onClick={() => handleViewLogDetails(log.id)}
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const userSortOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "role", label: "Role" },
    { value: "phone", label: "Phone" },
    { value: "status", label: "Status" },
  ]

  const logSortOptions = [
    { value: "id", label: "Log ID" },
    { value: "module", label: "Module" },
    { value: "activity", label: "Activity" },
    { value: "timestamp", label: "Timestamp" },
    { value: "performedBy", label: "Performed By" },
  ]

  const currentSortOptions = activeTab === "users" ? userSortOptions : logSortOptions

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto py-4 px-6">
          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative" ref={sortDropdownRef}>
                <button
                  className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  Sort By
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[150px]">
                    {currentSortOptions.map((option) => (
                      <button
                        key={option.value}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => handleSort(option.value)}
                      >
                        {option.label} {sortBy === option.value && (sortOrder === "asc" ? "↑" : "↓")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                onClick={handleExport}
              >
                Export
              </button>
              {activeTab === "users" && (
                <Link to={`/add-new-user`}>
                  <button
                    className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm"
                    onClick={handleCreateNewUser}
                  >
                    Create New User
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-4">
            <div className="flex">
              <button
                className={`px-4 py-3 text-sm ${
                  activeTab === "users" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
              <button
                className={`px-4 py-3 text-sm ${
                  activeTab === "logs" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("logs")}
              >
                Logs
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "users" ? renderUsersTab() : renderLogsTab()}

          {/* Pagination */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {pagination.total}</div>
            <div className="flex items-center gap-1">
              <button
                className="w-8 h-8 flex items-center justify-center border rounded-md disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                      currentPage === page ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                className="w-8 h-8 flex items-center justify-center border rounded-md disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
              {pagination.per_page} / page
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
