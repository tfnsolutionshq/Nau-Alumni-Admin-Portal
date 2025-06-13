// "use client"

// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState, useEffect } from "react" // Removed useRef as infinite scroll is removed
// import { Search, ChevronDown, ChevronRight, Loader2 } from "lucide-react" // Removed ChevronLeft
// import { Link } from "react-router-dom"
// import axios from "axios"
// import { useAuth } from "../../Context/AuthContext" // Import useAuth

// const ApplicantListPage = () => {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [applicants, setApplicants] = useState([])
//   const [loading, setLoading] = useState(true) // Loading state for initial fetch
//   const [error, setError] = useState(null)
//   const { token, isAuthenticated, loading: authLoading } = useAuth()

//   const fetchApplicants = async () => { // Removed page and append parameters
//     setLoading(true)
//     setError(null)

//     if (authLoading) {
//       setLoading(false);
//       return;
//     }
//     if (!isAuthenticated || !token) {
//       setError("Please log in to view pending applications.")
//       setLoading(false)
//       return
//     }

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://unizikalumni-api.tfnsolutions.us/api/applications/pending`, // Removed ?page=${page}
//         headers: {
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       };
//       const response = await axios.request(config);

//       // --- FIX: Now expecting a direct array response ---
//       if (response.data && Array.isArray(response.data)) {
//         setApplicants(response.data); // Directly use response.data as the array
//       } else {
//         // Fallback for unexpected data format (e.g., empty object, or non-array)
//         setApplicants([]);
//         setError("Unexpected data format from API. Expected a direct array of applicants.");
//       }
//     } catch (err) {
//       console.error("Error fetching applicants:", err);
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please log in again.");
//       } else if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to load applicants. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch applicants when component mounts or auth state changes
//   useEffect(() => {
//     if (!authLoading && isAuthenticated) {
//         fetchApplicants();
//     }
//   }, [authLoading, isAuthenticated, token]); // Dependencies for fetch

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value)
//     // Client-side filtering will occur automatically as `filteredApplicants` recomputes
//     // If you need server-side search, API would need to support a search query parameter
//   }

//   // Filter applicants based on search query (client-side filter)
//   const filteredApplicants = applicants.filter((applicant) =>
//     `${applicant.first_name || ''} ${applicant.last_name || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     applicant.chapter_of_interest?.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming chapter_of_interest has a 'name'
//   );

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         {/* Search and Actions */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
//           <div className="relative w-full md:w-64">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//             />
//           </div>

//           <div className="flex gap-2 w-full md:w-auto">
//             <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//               Sort By
//               <ChevronDown className="w-4 h-4" />
//             </button>
//             <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//               Export
//             </button>
//           </div>
//         </div>

//         {/* Applicants Table */}
//         {loading ? ( // Show loading spinner only for the initial fetch
//           <div className="flex justify-center items-center py-8">
//             <Loader2 className="animate-spin mr-2" size={24} /> Loading applications...
//           </div>
//         ) : error ? (
//           <div className="flex justify-center items-center py-8 text-red-500">
//             {error}
//           </div>
//         ) : filteredApplicants.length === 0 ? ( // No applicants found after initial load
//           <div className="flex justify-center items-center py-8 text-gray-500">
//             No pending applications found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto border rounded-md">
//             <table className="w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">APPLICANT</th>
//                   <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">CHAPTER OF INTEREST</th>
//                   <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">EMAIL ADDRESS</th>
//                   <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">CONTACT NUMBER</th>
//                   <th className="text-right py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider"></th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredApplicants.map((applicant) => (
//                   <tr key={applicant.id} className="border-b">
//                     <td className="py-3 px-4 text-sm text-gray-900">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//                           {applicant.first_name ? applicant.first_name.charAt(0) : 'U'}
//                         </div>
//                         {`${applicant.first_name || ''} ${applicant.last_name || ''}`.trim()}
//                       </div>
//                     </td>
//                     <td className="py-3 px-4 text-sm text-gray-900">{applicant.chapter?.name || 'N/A'}</td> {/* Assuming chapter_of_interest has a 'name' */}
//                     <td className="py-3 px-4 text-sm text-gray-900">{applicant.email}</td>
//                     <td className="py-3 px-4 text-sm text-gray-900">{applicant.phone}</td>
//                     <td className="py-3 px-4 text-right">
//                       <Link to={`/application-details/${applicant.id}`} className="text-gray-600 flex items-center gap-1 ml-auto justify-end hover:text-orange-500">
//                         View Application
//                         <ChevronRight className="w-4 h-4" />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Removed Pagination/Infinite Scroll UI */}
//         {/*
//         {loadingMore && (
//           <div className="flex justify-center items-center py-4">
//             <Loader2 className="animate-spin mr-2" size={24} /> Loading more applications...
//           </div>
//         )}
//         {currentPage < totalPages && !loading && !error && filteredApplicants.length > 0 && (
//           <div ref={loadingRef} className="h-10 invisible"></div>
//         )}
//         {currentPage >= totalPages && !loading && !error && filteredApplicants.length > 0 && !loadingMore && (
//             <div className="flex justify-center items-center py-4 text-gray-500">
//                 You've reached the end of the list.
//             </div>
//         )}
//         */}
//       </div>
//     </div>
//     </DashboardLayout>
//   )
// }

// export default ApplicantListPage










"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown, ChevronRight, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const ApplicantListPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

  const fetchApplicants = async () => {
    setLoading(true)
    setError(null)

    if (authLoading) {
      setLoading(false)
      return
    }
    if (!isAuthenticated || !token) {
      setError("Please log in to view pending applications.")
      setLoading(false)
      return
    }

    try {
      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/applications/pending`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.request(config)

      if (response.data && Array.isArray(response.data)) {
        setApplicants(response.data)
      } else {
        setApplicants([])
        setError("Unexpected data format from API. Expected a direct array of applicants.")
      }
    } catch (err) {
      console.error("Error fetching applicants:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Failed to load applicants. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchApplicants()
    }
  }, [authLoading, isAuthenticated, token])

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
    if (filteredAndSortedApplicants.length === 0) {
      alert("No data to export")
      return
    }

    const headers = ["Name", "Chapter of Interest", "Email", "Phone"]
    let csvContent = headers.join(",") + "\n"

    filteredAndSortedApplicants.forEach((applicant) => {
      const row = [
        `"${applicant.first_name || ""} ${applicant.last_name || ""}"`,
        `"${applicant.chapter?.name || "N/A"}"`,
        `"${applicant.email || ""}"`,
        `"${applicant.phone || ""}"`,
      ]
      csvContent += row.join(",") + "\n"
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `applications_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter applicants based on search query
  const filteredApplicants = applicants.filter(
    (applicant) =>
      `${applicant.first_name || ""} ${applicant.last_name || ""}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.chapter?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.phone?.includes(searchQuery),
  )

  // Sort filtered applicants
  const filteredAndSortedApplicants = [...filteredApplicants].sort((a, b) => {
    let aValue = ""
    let bValue = ""

    switch (sortBy) {
      case "name":
        aValue = `${a.first_name || ""} ${a.last_name || ""}`.trim()
        bValue = `${b.first_name || ""} ${b.last_name || ""}`.trim()
        break
      case "email":
        aValue = a.email || ""
        bValue = b.email || ""
        break
      case "chapter":
        aValue = a.chapter?.name || ""
        bValue = b.chapter?.name || ""
        break
      case "phone":
        aValue = a.phone || ""
        bValue = b.phone || ""
        break
      default:
        aValue = `${a.first_name || ""} ${a.last_name || ""}`.trim()
        bValue = `${b.first_name || ""} ${b.last_name || ""}`.trim()
    }

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "chapter", label: "Chapter" },
    { value: "phone", label: "Phone" },
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                    {sortOptions.map((option) => (
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
            </div>
          </div>

          {/* Applicants Table */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin mr-2" size={24} /> Loading applications...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8 text-red-500">{error}</div>
          ) : filteredAndSortedApplicants.length === 0 ? (
            <div className="flex justify-center items-center py-8 text-gray-500">No pending applications found.</div>
          ) : (
            <div className="overflow-x-auto border rounded-md">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">
                      APPLICANT
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">
                      CHAPTER OF INTEREST
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">
                      EMAIL ADDRESS
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">
                      CONTACT NUMBER
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedApplicants.map((applicant) => (
                    <tr key={applicant.id} className="border-b">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            {applicant.first_name ? applicant.first_name.charAt(0) : "U"}
                          </div>
                          {`${applicant.first_name || ""} ${applicant.last_name || ""}`.trim()}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{applicant.chapter?.name || "N/A"}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{applicant.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{applicant.phone}</td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/application-details/${applicant.id}`}
                          className="text-gray-600 flex items-center gap-1 ml-auto justify-end hover:text-orange-500"
                        >
                          View Application
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Results Summary */}
          {!loading && !error && (
            <div className="p-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredAndSortedApplicants.length} of {applicants.length} applications
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ApplicantListPage
