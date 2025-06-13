// import DashboardLayout from "../Components/Layout/DashboardLayout"
// import { useState, useEffect } from "react" // Import useEffect
// import { ArrowLeft, Search, ChevronDown, ChevronRight, Filter, ChevronLeft } from "lucide-react"
// import axios from "axios" // Import axios
// import { useAuth } from "../Context/AuthContext" // Import useAuth

// const DonorsListWithCommentModal = () => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [showCommentModal, setShowCommentModal] = useState(false)
//   const [currentDonor, setCurrentDonor] = useState(null)
//   const [suggestions, setSuggestions] = useState([]) // State to store fetched suggestions
//   const [loading, setLoading] = useState(true) // Loading state for API call
//   const [error, setError] = useState(null) // Error state for API call
//   const { token } = useAuth() // Get token from useAuth

//   // Fetch suggestions from API
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         const config = {
//           method: 'get',
//           maxBodyLength: Infinity,
//           url: 'https://unizikalumni-api.tfnsolutions.us/api/suggestions',
//           headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}` // Use the token from useAuth
//           }
//         };

//         const response = await axios.request(config);
//         console.log("Suggestions API response:", response.data);

//         // Assuming the API returns a direct array of suggestions
//         if (Array.isArray(response.data)) {
//           setSuggestions(response.data);
//         } else {
//           console.error("Suggestions API response is not an array:", response.data);
//           setError("Failed to load suggestions: Invalid data format from API.");
//           setSuggestions([]); // Ensure it's an array even if data format is invalid
//         }
//       } catch (err) {
//         console.error("Error fetching suggestions:", err);
//         if (err.response && err.response.response.data && err.response.data.message) {
//             setError(err.response.data.message);
//         } else {
//             setError("Failed to load suggestions. Please check your network or try again.");
//         }
//         setSuggestions([]); // Ensure it's an array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) { // Only fetch if token is available
//         fetchSuggestions();
//     } else {
//         // Handle case where token is not available (e.g., user not logged in)
//         setLoading(false);
//         setError("Authentication token not available. Please log in.");
//     }
//   }, [token]); // Refetch when token changes

//   // Filtered suggestions based on search query
//   const filteredSuggestions = suggestions.filter(suggestion =>
//     suggestion.member?.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     suggestion.member?.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     suggestion.member?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     suggestion.member?.phone.includes(searchQuery)
//   );

//   // Pagination logic (simple client-side for now, can be extended with API pagination)
//   const itemsPerPage = 10; // You can adjust this
//   const totalPages = Math.ceil(filteredSuggestions.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSuggestions = filteredSuggestions.slice(startIndex, endIndex);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value)
//     setCurrentPage(1); // Reset to first page on new search
//   }

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page)
//     }
//   }

//   const openCommentModal = (donor) => {
//     setCurrentDonor(donor)
//     setShowCommentModal(true)
//   }

//   const closeCommentModal = () => {
//     setShowCommentModal(false)
//   }

//   // Handle click outside modal to close it
//   const handleModalBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       closeCommentModal()
//     }
//   }

//   return (
//   <DashboardLayout>
//     <div className="min-h-screen bg-white">
//       <div className="w-full px-6 mx-auto">
//         {/* Header */}
//         <div className="py-4 border-b">
//           <button className="flex shadow p-1 rounded items-center text-gray-600">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Go Back
//           </button>
//         </div>

//         {/* Search and Actions */}
//         <div className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
//               <Filter className="w-4 h-4" />
//               Sort By
//               <ChevronDown className="w-4 h-4" />
//             </button>
//             <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
//               Download List
//             </button>
//           </div>
//         </div>
//         <hr className="mb-4"/>

//         {loading && <div className="text-center py-4">Loading suggestions...</div>}
//         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

//         {!loading && !error && (
//           <>
//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full border rounded-md">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="text-left py-3 px-4 font-medium">DONATORS</th>
//                     <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
//                     <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
//                     <th className="text-right py-3 px-4 font-medium"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentSuggestions.length > 0 ? (
//                     currentSuggestions.map((suggestion) => (
//                       <tr key={suggestion.id} className="border-b">
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//                               {suggestion.member?.first_name?.charAt(0) || ''}
//                             </div>
//                             {`${suggestion.member?.first_name || ''} ${suggestion.member?.last_name || ''}`}
//                           </div>
//                         </td>
//                         <td className="py-3 px-4">{suggestion.member?.email}</td>
//                         <td className="py-3 px-4">{suggestion.member?.phone}</td>
//                         <td className="py-3 px-4 text-right">
//                           <button
//                             className="text-gray-600 flex items-center gap-1 ml-auto"
//                             onClick={() => openCommentModal(suggestion.member ? { ...suggestion.member, comment: suggestion.comment } : { name: "Unknown", comment: suggestion.comment })}
//                           >
//                             View Comment
//                             <ChevronRight className="w-4 h-4" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center py-4 text-gray-500">No suggestions found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="p-4 flex flex-col md:flex-row justify-between items-center">
//               <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {filteredSuggestions.length}</div>
//               <div className="flex items-center gap-1">
//                 <button
//                   className="w-8 h-8 flex items-center justify-center border rounded-md"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <button
//                     key={page}
//                     className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === page ? "bg-gray-100" : ""}`}
//                     onClick={() => handlePageChange(page)}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   className="w-8 h-8 flex items-center justify-center border rounded-md"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
//                 {itemsPerPage} / page
//                 <ChevronDown className="w-4 h-4" />
//               </div>
//             </div>
//           </>
//         )}


//         {/* Comment Modal */}
//         {showCommentModal && currentDonor && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={handleModalBackdropClick}
//           >
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-4">'{currentDonor.name ? currentDonor.name.split(" ")[0] : currentDonor.first_name}' Comment</h2>
//                 <div className="bg-gray-50 rounded p-4 mb-4 max-h-60 overflow-y-auto">
//                   <p className="text-gray-700">{currentDonor.comment}</p>
//                 </div>
//                 <div className="flex justify-center">
//                   <button className="px-6 py-2 bg-gray-200 rounded-md text-gray-800" onClick={closeCommentModal}>
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   </DashboardLayout>
//   )
// }

// export default DonorsListWithCommentModal









"use client"

import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Search, ChevronDown, ChevronRight, Filter, ChevronLeft, Download } from "lucide-react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext"

const DonorsListWithCommentModal = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [currentDonor, setCurrentDonor] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const { token } = useAuth()

  const sortDropdownRef = useRef(null)
  const itemsPerPage = 10

  // Fetch suggestions from API
  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true)
      setError(null)
      try {
        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/suggestions",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.request(config)
        console.log("Suggestions API response:", response.data)

        if (Array.isArray(response.data)) {
          setSuggestions(response.data)
          setFilteredSuggestions(response.data)
        } else {
          console.error("Suggestions API response is not an array:", response.data)
          setError("Failed to load suggestions: Invalid data format from API.")
          setSuggestions([])
          setFilteredSuggestions([])
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err)
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message)
        } else {
          setError("Failed to load suggestions. Please check your network or try again.")
        }
        setSuggestions([])
        setFilteredSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchSuggestions()
    } else {
      setLoading(false)
      setError("Authentication token not available. Please log in.")
    }
  }, [token])

  // Handle search and sorting
  useEffect(() => {
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.member?.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.member?.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.member?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.member?.phone.includes(searchQuery),
    )

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "name":
          aValue = `${a.member?.first_name || ""} ${a.member?.last_name || ""}`.toLowerCase()
          bValue = `${b.member?.first_name || ""} ${b.member?.last_name || ""}`.toLowerCase()
          break
        case "email":
          aValue = (a.member?.email || "").toLowerCase()
          bValue = (b.member?.email || "").toLowerCase()
          break
        case "phone":
          aValue = a.member?.phone || ""
          bValue = b.member?.phone || ""
          break
        case "date":
          aValue = new Date(a.created_at || 0)
          bValue = new Date(b.created_at || 0)
          break
        default:
          aValue = `${a.member?.first_name || ""} ${a.member?.last_name || ""}`.toLowerCase()
          bValue = `${b.member?.first_name || ""} ${b.member?.last_name || ""}`.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredSuggestions(filtered)
    setCurrentPage(1)
  }, [searchQuery, suggestions, sortBy, sortOrder])

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

  // Pagination logic
  const totalPages = Math.ceil(filteredSuggestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSuggestions = filteredSuggestions.slice(startIndex, endIndex)

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
      ["Name", "Email", "Phone", "Comment", "Date"],
      ...filteredSuggestions.map((suggestion) => [
        `${suggestion.member?.first_name || ""} ${suggestion.member?.last_name || ""}`,
        suggestion.member?.email || "",
        suggestion.member?.phone || "",
        suggestion.comment || "",
        suggestion.created_at || "",
      ]),
    ]

    const csvString = csvContent.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `suggestions-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const openCommentModal = (donor) => {
    setCurrentDonor(donor)
    setShowCommentModal(true)
  }

  const closeCommentModal = () => {
    setShowCommentModal(false)
  }

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCommentModal()
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full px-6 mx-auto">
          {/* Header */}
          <div className="py-4 border-b">
            <button className="flex shadow p-1 rounded items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Search and Actions */}
          <div className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search suggestions..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative" ref={sortDropdownRef}>
                <button
                  className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <Filter className="w-4 h-4" />
                  Sort By:{" "}
                  {sortBy === "name" ? "Name" : sortBy === "email" ? "Email" : sortBy === "phone" ? "Phone" : "Date"}
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
                      onClick={() => handleSort("phone")}
                    >
                      Phone
                      {sortBy === "phone" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("date")}
                    >
                      Date
                      {sortBy === "date" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                  </div>
                )}
              </div>
              <button
                className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm hover:bg-orange-600"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
                Download List
              </button>
            </div>
          </div>
          <hr className="mb-4" />

          {/* Results info */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredSuggestions.length} of {suggestions.length} suggestions
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}

          {loading && <div className="text-center py-4">Loading suggestions...</div>}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
          )}

          {!loading && !error && (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">DONORS</th>
                      <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
                      <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
                      <th className="text-right py-3 px-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSuggestions.length > 0 ? (
                      currentSuggestions.map((suggestion) => (
                        <tr key={suggestion.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                {suggestion.member?.first_name?.charAt(0) || ""}
                              </div>
                              {`${suggestion.member?.first_name || ""} ${suggestion.member?.last_name || ""}`}
                            </div>
                          </td>
                          <td className="py-3 px-4">{suggestion.member?.email}</td>
                          <td className="py-3 px-4">{suggestion.member?.phone}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              className="text-gray-600 flex items-center gap-1 ml-auto hover:text-orange-600"
                              onClick={() =>
                                openCommentModal(
                                  suggestion.member
                                    ? { ...suggestion.member, comment: suggestion.comment }
                                    : { name: "Unknown", comment: suggestion.comment },
                                )
                              }
                            >
                              View Comment
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">
                          {searchQuery ? "No suggestions found matching your search." : "No suggestions found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-600 mb-2 md:mb-0">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredSuggestions.length)} of{" "}
                  {filteredSuggestions.length} suggestions
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
                <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
                  {itemsPerPage} per page
                </div>
              </div>
            </>
          )}

          {/* Comment Modal */}
          {showCommentModal && currentDonor && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={handleModalBackdropClick}
            >
              <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    '{currentDonor.name ? currentDonor.name.split(" ")[0] : currentDonor.first_name}' Comment
                  </h2>
                  <div className="bg-gray-50 rounded p-4 mb-4 max-h-60 overflow-y-auto">
                    <p className="text-gray-700">{currentDonor.comment}</p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="px-6 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
                      onClick={closeCommentModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DonorsListWithCommentModal
