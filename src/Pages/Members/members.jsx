// "use client"

// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState, useEffect } from "react"
// import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
// import { Link } from "react-router-dom"
// import axios from "axios"
// import { useAuth } from "../../Context/AuthContext"

// const MembersList = () => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [members, setMembers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const { token, isAuthenticated, loading: authLoading } = useAuth()

//   useEffect(() => {
//     const fetchMembers = async () => {
//       // Wait for auth to load and check if authenticated
//       if (authLoading) return

//       if (!isAuthenticated || !token) {
//         setError("Please log in to view members.")
//         setLoading(false)
//         return
//       }

//       try {
//         setLoading(true)
//         setError(null)
//         const config = {
//           method: "get",
//           maxBodyLength: Number.POSITIVE_INFINITY,
//           url: "https://unizikalumni-api.tfnsolutions.us/api/members",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//         const response = await axios.request(config)
//         setMembers(response.data.members.data)
//       } catch (err) {
//         console.error("Error fetching members:", err)
//         if (err.response?.status === 401) {
//           setError("Authentication failed. Please log in again.")
//         } else {
//           setError("Failed to load members. Please try again later.")
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMembers()
//   }, [token, isAuthenticated, authLoading])

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value)
//   }

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   if (authLoading) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading...</div>
//       </DashboardLayout>
//     )
//   }

//   if (!isAuthenticated) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
//           Please log in to access this page.
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading members...</div>
//       </DashboardLayout>
//     )
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Error: {error}</div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen px-6 py-4">
//         <div className="w-full mx-auto">
//           {/* Search and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
//               />
//             </div>

//             <div className="flex gap-2 w-full md:w-auto">
//               <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
//                 Sort By
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
//                 Export
//               </button>
//               <Link to={`/add-member`}>
//                 <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
//                   Create New Member
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <hr className="mb-4" />
//           {/* Table */}
//           <div className="bg-white rounded-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full border">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="text-left py-3 px-4 font-medium">MEMBER NAME</th>
//                     <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
//                     <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
//                     <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
//                     <th className="text-right py-3 px-4 font-medium"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {members.map((member) => (
//                     <tr key={member.id} className="border-b">
//                       <td className="py-3 px-4">
//                         <Link to={`/member-profile/${member.id}`} className="flex underline items-center gap-3">
//                           <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//                             {member.first_name.charAt(0)}
//                           </div>
//                           {member.first_name} {member.last_name}
//                         </Link>
//                       </td>
//                       <td className="py-3 px-4">{member.chapter_name}</td>
//                       <td className="py-3 px-4">{member.email}</td>
//                       <td className="py-3 px-4">{member.phone}</td>
//                       <td className="py-3 px-4 text-right">
//                         <Link
//                           to={`/member-profile/${member.id}`}
//                           className="text-gray-600 flex items-center gap-1 ml-auto"
//                         >
//                           View Profile
//                           <ChevronRight className="w-4 h-4" />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="p-4 flex flex-col md:flex-row justify-between items-center">
//               <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {members.length}</div>
//               <div className="flex items-center gap-1">
//                 <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <button
//                   className={`w-8 h-8 flex items-center justify-center border rounded-md ${
//                     currentPage === 1 ? "bg-gray-100" : ""
//                   }`}
//                   onClick={() => handlePageChange(1)}
//                 >
//                   1
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
//                 {members.length} / page
//                 <ChevronDown className="w-4 h-4" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default MembersList









"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft, Download } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const MembersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const sortDropdownRef = useRef(null)
  const itemsPerPage = 10

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
        setFilteredMembers(response.data.members.data)
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

  // Handle search functionality
  useEffect(() => {
    const filtered = members.filter((member) => {
      const searchLower = searchQuery.toLowerCase()
      return (
        member.first_name.toLowerCase().includes(searchLower) ||
        member.last_name.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.phone.includes(searchQuery) ||
        member.chapter_name.toLowerCase().includes(searchLower)
      )
    })

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "name":
          aValue = `${a.first_name} ${a.last_name}`.toLowerCase()
          bValue = `${b.first_name} ${b.last_name}`.toLowerCase()
          break
        case "email":
          aValue = a.email.toLowerCase()
          bValue = b.email.toLowerCase()
          break
        case "chapter":
          aValue = a.chapter_name.toLowerCase()
          bValue = b.chapter_name.toLowerCase()
          break
        case "phone":
          aValue = a.phone
          bValue = b.phone
          break
        default:
          aValue = `${a.first_name} ${a.last_name}`.toLowerCase()
          bValue = `${b.first_name} ${b.last_name}`.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredMembers(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchQuery, members, sortBy, sortOrder])

  // Close dropdown when clicking outside
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
    const csvContent = [
      ["Member Name", "Chapter", "Email Address", "Contact Number"],
      ...filteredMembers.map((member) => [
        `${member.first_name} ${member.last_name}`,
        member.chapter_name,
        member.email,
        member.phone,
      ]),
    ]

    const csvString = csvContent.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `members-list-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

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
                placeholder="Search members..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative" ref={sortDropdownRef}>
                <button
                  className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  Sort By:{" "}
                  {sortBy === "name"
                    ? "Name"
                    : sortBy === "email"
                      ? "Email"
                      : sortBy === "chapter"
                        ? "Chapter"
                        : "Phone"}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {sortBy === "name" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("email")}
                    >
                      Email
                      {sortBy === "email" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("chapter")}
                    >
                      Chapter
                      {sortBy === "chapter" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("phone")}
                    >
                      Phone
                      {sortBy === "phone" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <Link to={`/add-member`}>
                <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm hover:bg-orange-600">
                  Create New Member
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
          <hr className="mb-4" />

          {/* Results info */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredMembers.length} of {members.length} members
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}

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
                  {currentMembers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        {searchQuery ? "No members found matching your search." : "No members found."}
                      </td>
                    </tr>
                  ) : (
                    currentMembers.map((member) => (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <Link
                            to={`/member-profile/${member.id}`}
                            className="flex underline items-center gap-3 hover:text-orange-600"
                          >
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                              {member.first_name.charAt(0)}
                            </div>
                            {member.first_name} {member.last_name}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{member.chapter_name}</td>
                        <td className="py-3 px-4">{member.email}</td>
                        <td className="py-3 px-4">{member.phone}</td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            to={`/member-profile/${member.id}`}
                            className="text-gray-600 flex items-center gap-1 ml-auto hover:text-orange-600"
                          >
                            View Profile
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600 mb-2 md:mb-0">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length}{" "}
                members
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 ${
                        currentPage === page ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                })}
                {totalPages > 5 && <span className="px-2">...</span>}
                <button
                  className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">{itemsPerPage} per page</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MembersList
