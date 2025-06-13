// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState, useEffect } from 'react'
// import { Link, useNavigate } from "react-router-dom" // Import useNavigate
// import {
//   Search,
//   ChevronDown,
//   ChevronRight,
//   ChevronLeft,
//   Edit,
//   Users,
//   X,
//   Upload,
//   SortAscIcon,
//   Link2,
//   Trash2,
// } from "lucide-react"
// import axios from "axios"
// import { useAuth } from "../../Context/AuthContext"
// import EditDonationModal from "../../Components/Donations/Edit-Donations-Modal"

// const DonationManagement = () => {
//   const [activeTab, setActiveTab] = useState("All")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [openActionMenu, setOpenActionMenu] = useState(null)
//   const [donations, setDonations] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [selectedDonation, setSelectedDonation] = useState(null)
//   const [deleteLoading, setDeleteLoading] = useState(null)
//   const { token, isAuthenticated, loading: authLoading } = useAuth()
//   const navigate = useNavigate() // Initialize navigate

//   const tabs = ["All", "Active", "Draft", "Deactivated", "Expired"]

//   // Fetch donations based on active tab
//   useEffect(() => {
//     fetchDonations()
//   }, [activeTab, token, isAuthenticated, authLoading])

//   const fetchDonations = async () => {
//     if (authLoading) return

//     if (!isAuthenticated || !token) {
//       setError("Please log in to view donations")
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)

//       let url = "https://unizikalumni-api.tfnsolutions.us/api/donations"

//       // Add filter for specific status tabs
//       if (activeTab !== "All") {
//         url += `/filter?status=${activeTab}`
//       }

//       const config = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: url,
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       const response = await axios.request(config)

//       // Handle the response structure based on the API
//       if (response.data && response.data.data) {
//         setDonations(response.data.data)
//       } else {
//         setDonations([])
//       }
//     } catch (err) {
//       console.error("Error fetching donations:", err)
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please log in again.")
//       } else {
//         setError("Failed to load donations. Please try again later.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value)
//   }

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   const toggleActionMenu = (id) => {
//     setOpenActionMenu(openActionMenu === id ? null : id)
//   }

//   const handleEdit = (donation) => {
//     setSelectedDonation(donation)
//     setIsEditModalOpen(true)
//     setOpenActionMenu(null)
//   }

//   const handleCopyLink = (donationId) => {
//     const donationUrl = `${window.location.origin}/donation/${donationId}`
//     navigator.clipboard.writeText(donationUrl)
//     alert("Donation link copied to clipboard!")
//     setOpenActionMenu(null)
//   }

//   const handleStatusUpdate = async (donationId, newStatus) => {
//     try {
//       const config = {
//         method: "post",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: `https://unizikalumni-api.tfnsolutions.us/api/donations/update-status?donation_id=${donationId}`,
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           donation_id: donationId,
//           status: newStatus,
//         },
//       }

//       await axios.request(config)
//       fetchDonations() // Refresh the list
//       setOpenActionMenu(null)
//     } catch (err) {
//       console.error("Error updating donation status:", err)
//       alert("Failed to update donation status")
//     }
//   }

//   const handleDelete = async (donationId) => {
//     if (!window.confirm("Are you sure you want to delete this donation? This action cannot be undone.")) {
//       return
//     }

//     try {
//       setDeleteLoading(donationId)
//       const config = {
//         method: "delete",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: `https://unizikalumni-api.tfnsolutions.us/api/donations/donation?donation_id=${donationId}`,
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       await axios.request(config)
//       fetchDonations() // Refresh the list
//       setOpenActionMenu(null)
//     } catch (err) {
//       console.error("Error deleting donation:", err)
//       alert("Failed to delete donation")
//     } finally {
//       setDeleteLoading(null)
//     }
//   }

//   const handleDonationUpdated = () => {
//     fetchDonations() // Refresh the list after update
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "text-green-600 bg-green-100"
//       case "Draft":
//         return "text-gray-600 bg-gray-100"
//       case "Expired":
//         return "text-red-600 bg-red-100"
//       case "Deactivated":
//         return "text-red-600 bg-red-100"
//       default:
//         return "text-gray-600 bg-gray-100"
//     }
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return ""
//     try {
//       const date = new Date(dateString)
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     } catch (error) {
//       return dateString
//     }
//   }

//   const formatDateRange = (startDate, endDate) => {
//     if (!startDate || !endDate) return ""
//     return `${formatDate(startDate)} - ${formatDate(endDate)}`
//   }

//   // Filter donations based on search query
//   const filteredDonations = donations.filter((donation) =>
//     donation.title.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   if (authLoading) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-white flex justify-center items-center">
//           <div className="text-gray-500">Loading...</div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (!isAuthenticated) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-white flex justify-center items-center">
//           <div className="text-red-500">Please log in to access this page.</div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen bg-white">
//         <div className="w-full py-4 px-6 mx-auto">
//           {/* Tabs */}
//           <div className="border-b">
//             <div className="flex overflow-x-auto">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-4 py-3 whitespace-nowrap ${
//                     activeTab === tab ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Search and Actions */}
//           <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//               />
//             </div>

//             <div className="flex gap-2 w-full md:w-auto">
//               <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//                 <SortAscIcon className="w-4 h-4" />
//                 Sort By
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//                 <Upload className="w-4 h-4" />
//                 Export
//               </button>
//               <Link to={`/create-donation`}>
//                 <button className="bg-[#FF6900] text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
//                   Create New Donation
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <hr className="mb-4" />

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//               <strong className="font-bold">Error!</strong>
//               <span className="block sm:inline"> {error}</span>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex justify-center items-center py-8">
//               <div className="text-gray-500">Loading donations...</div>
//             </div>
//           ) : (
//             <>
//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full border">
//                   <thead className="bg-gray-100 rounded-md">
//                     <tr>
//                       <th className="text-left py-3 px-4 font-medium">DONATION</th>
//                       <th className="text-left py-3 px-4 font-medium">START - END DATE</th>
//                       <th className="text-left py-3 px-4 font-medium">NO. OF PARTICIPANT</th>
//                       <th className="text-left py-3 px-4 font-medium">TOTAL CONTRIBUTION</th>
//                       <th className="text-left py-3 px-4 font-medium">STATUS</th>
//                       <th className="text-right py-3 px-4 font-medium"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredDonations.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="py-8 text-center text-gray-500">
//                           No donations found
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredDonations.map((donation) => (
//                         <tr key={donation.id} className="border-b">
//                           <td className="py-3 px-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
//                                 {donation.banner_image_url ? (
//                                   <img
//                                     src={donation.banner_image_url || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"}
//                                     alt={donation.title}
//                                     className="w-full h-full object-cover"
//                                     onError={(e) => {
//                                       e.target.onerror = null
//                                       e.target.src = "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"
//                                     }}
//                                   />
//                                 ) : (
//                                   <div className="w-full h-full bg-gray-200"></div>
//                                 )}
//                               </div>
//                               {/* Link to donators page with donation ID */}
//                               <Link to={`/donators/${donation.id}`} className="text-black underline hover:underline">
//                                 {donation.title}
//                               </Link>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">{formatDateRange(donation.start_date, donation.end_date)}</td>
//                           <td className="py-3 px-4">
//                             <span className="inline-block border px-2 py-1 rounded text-center min-w-[40px]">
//                               {donation.no_of_participants || "-"}
//                             </span>
//                           </td>
//                           <td className="py-3 px-4">{donation.total_contribution || "-"}</td>
//                           <td className="py-3 px-4">
//                             <span className={`inline-block px-3 py-1 rounded ${getStatusColor(donation.status)}`}>
//                               {donation.status}
//                             </span>
//                           </td>
//                           <td className="py-3 px-4 text-right relative">
//                             {openActionMenu === donation.id && (
//                               <div className="absolute right-4 top-10 bg-white border shadow-md rounded-md z-10 w-36">
//                                 <button
//                                   className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                                   onClick={() => handleEdit(donation)}
//                                 >
//                                   <Edit className="w-4 h-4" />
//                                   Edit
//                                 </button>
//                                 {/* Updated Link for Donors button */}
//                                 <Link
//                                   to={`/donators/${donation.id}`}
//                                   className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                                 >
//                                   <Users className="w-4 h-4" />
//                                   Donors
//                                 </Link>
//                                 <button
//                                   className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                                   onClick={() => handleCopyLink(donation.id)}
//                                 >
//                                   <Link2 className="w-4 h-4" />
//                                   Copy Link
//                                 </button>
//                                 {donation.status === "Active" ? (
//                                   <button
//                                     className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                                     onClick={() => handleStatusUpdate(donation.id, "Deactivated")}
//                                   >
//                                     <X className="w-4 h-4" />
//                                     Deactivate
//                                   </button>
//                                 ) : (
//                                   <button
//                                     className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                                     onClick={() => handleStatusUpdate(donation.id, "Active")}
//                                   >
//                                     <X className="w-4 h-4" />
//                                     Activate
//                                   </button>
//                                 )}
//                                 <button
//                                   className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
//                                   onClick={() => handleDelete(donation.id)}
//                                   disabled={deleteLoading === donation.id}
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                   {deleteLoading === donation.id ? "Deleting..." : "Delete"}
//                                 </button>
//                               </div>
//                             )}
//                             <button className="text-gray-600" onClick={() => toggleActionMenu(donation.id)}>
//                               <ChevronRight
//                                 className={`w-5 h-5 ml-auto transition-transform duration-200 ${openActionMenu === donation.id ? "rotate-90" : ""}`}
//                               />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="p-4 flex flex-col md:flex-row justify-between items-center">
//                 <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {filteredDonations.length}</div>
//                 <div className="flex items-center gap-1">
//                   <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                   <button
//                     className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 1 ? "bg-gray-100" : ""}`}
//                     onClick={() => handlePageChange(1)}
//                   >
//                     1
//                   </button>
//                   <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
//                   {filteredDonations.length} / page
//                   <ChevronDown className="w-4 h-4" />
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Edit Donation Modal */}
//         <EditDonationModal
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           donationData={selectedDonation}
//           onDonationUpdated={handleDonationUpdated}
//         />
//       </div>
//     </DashboardLayout>
//   )
// }

// export default DonationManagement











"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Edit,
  Users,
  X,
  SortAscIcon,
  Link2,
  Trash2,
  Download,
} from "lucide-react"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import EditDonationModal from "../../Components/Donations/Edit-Donations-Modal"

const DonationManagement = () => {
  const [activeTab, setActiveTab] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [openActionMenu, setOpenActionMenu] = useState(null)
  const [donations, setDonations] = useState([])
  const [filteredDonations, setFilteredDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const sortDropdownRef = useRef(null)
  const itemsPerPage = 10
  const tabs = ["All", "Active", "Draft", "Deactivated", "Expired"]

  // Fetch donations based on active tab
  useEffect(() => {
    fetchDonations()
  }, [activeTab, token, isAuthenticated, authLoading])

  // Handle search and sorting
  useEffect(() => {
    const filtered = donations.filter((donation) => donation.title.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "start_date":
          aValue = new Date(a.start_date)
          bValue = new Date(b.start_date)
          break
        case "participants":
          aValue = a.no_of_participants || 0
          bValue = b.no_of_participants || 0
          break
        case "contribution":
          aValue = Number.parseFloat(a.total_contribution || 0)
          bValue = Number.parseFloat(b.total_contribution || 0)
          break
        case "status":
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        default:
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredDonations(filtered)
    setCurrentPage(1)
  }, [searchQuery, donations, sortBy, sortOrder])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false)
      }
      if (!event.target.closest(".action-menu")) {
        setOpenActionMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchDonations = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view donations")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      let url = "https://unizikalumni-api.tfnsolutions.us/api/donations"

      // Add filter for specific status tabs
      if (activeTab !== "All") {
        url += `/filter?status=${activeTab}`
      }

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: url,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)

      // Handle the response structure based on the API
      if (response.data && response.data.data) {
        setDonations(response.data.data)
        setFilteredDonations(response.data.data)
      } else {
        setDonations([])
        setFilteredDonations([])
      }
    } catch (err) {
      console.error("Error fetching donations:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to load donations. Please try again later.")
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
    const csvContent = [
      ["Donation Title", "Start Date", "End Date", "Participants", "Total Contribution", "Status"],
      ...filteredDonations.map((donation) => [
        donation.title,
        donation.start_date,
        donation.end_date,
        donation.no_of_participants || 0,
        donation.total_contribution || 0,
        donation.status,
      ]),
    ]

    const csvString = csvContent.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `donations-${activeTab.toLowerCase()}-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const toggleActionMenu = (id) => {
    setOpenActionMenu(openActionMenu === id ? null : id)
  }

  const handleEdit = (donation) => {
    setSelectedDonation(donation)
    setIsEditModalOpen(true)
    setOpenActionMenu(null)
  }

  const handleCopyLink = (donationId) => {
    const donationUrl = `${window.location.origin}/donation/${donationId}`
    navigator.clipboard.writeText(donationUrl)
    alert("Donation link copied to clipboard!")
    setOpenActionMenu(null)
  }

  const handleStatusUpdate = async (donationId, newStatus) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/donations/update-status?donation_id=${donationId}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          donation_id: donationId,
          status: newStatus,
        },
      }

      await axios.request(config)
      fetchDonations() // Refresh the list
      setOpenActionMenu(null)
    } catch (err) {
      console.error("Error updating donation status:", err)
      alert("Failed to update donation status")
    }
  }

  const handleDelete = async (donationId) => {
    if (!window.confirm("Are you sure you want to delete this donation? This action cannot be undone.")) {
      return
    }

    try {
      setDeleteLoading(donationId)
      const config = {
        method: "delete",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/donations/donation?donation_id=${donationId}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.request(config)
      fetchDonations() // Refresh the list
      setOpenActionMenu(null)
    } catch (err) {
      console.error("Error deleting donation:", err)
      alert("Failed to delete donation")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleDonationUpdated = () => {
    fetchDonations() // Refresh the list after update
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100"
      case "Draft":
        return "text-gray-600 bg-gray-100"
      case "Expired":
        return "text-red-600 bg-red-100"
      case "Deactivated":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return ""
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDonations = filteredDonations.slice(startIndex, endIndex)

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-red-500">Please log in to access this page.</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full py-4 px-6 mx-auto">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 whitespace-nowrap ${
                    activeTab === tab ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Actions */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search donations..."
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
                  <SortAscIcon className="w-4 h-4" />
                  Sort By:{" "}
                  {sortBy === "title"
                    ? "Title"
                    : sortBy === "start_date"
                      ? "Date"
                      : sortBy === "participants"
                        ? "Participants"
                        : sortBy === "contribution"
                          ? "Contribution"
                          : "Status"}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("title")}
                    >
                      Title
                      {sortBy === "title" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("start_date")}
                    >
                      Start Date
                      {sortBy === "start_date" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("participants")}
                    >
                      Participants
                      {sortBy === "participants" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("contribution")}
                    >
                      Contribution
                      {sortBy === "contribution" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortBy === "status" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </button>
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-50"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <Link to={`/create-donation`}>
                <button className="bg-[#FF6900] text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm hover:bg-orange-600">
                  Create New Donation
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <hr className="mb-4" />

          {/* Results info */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredDonations.length} of {donations.length} donations
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading donations...</div>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border">
                  <thead className="bg-gray-100 rounded-md">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">DONATION</th>
                      <th className="text-left py-3 px-4 font-medium">START - END DATE</th>
                      <th className="text-left py-3 px-4 font-medium">NO. OF PARTICIPANT</th>
                      <th className="text-left py-3 px-4 font-medium">TOTAL CONTRIBUTION</th>
                      <th className="text-left py-3 px-4 font-medium">STATUS</th>
                      <th className="text-right py-3 px-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDonations.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500">
                          {searchQuery ? "No donations found matching your search." : "No donations found"}
                        </td>
                      </tr>
                    ) : (
                      currentDonations.map((donation) => (
                        <tr key={donation.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                                {donation.banner_image_url ? (
                                  <img
                                    src={
                                      donation.banner_image_url || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"
                                    }
                                    alt={donation.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src = "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200"></div>
                                )}
                              </div>
                              <Link
                                to={`/donators/${donation.id}`}
                                className="text-black underline hover:underline hover:text-orange-600"
                              >
                                {donation.title}
                              </Link>
                            </div>
                          </td>
                          <td className="py-3 px-4">{formatDateRange(donation.start_date, donation.end_date)}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block border px-2 py-1 rounded text-center min-w-[40px]">
                              {donation.no_of_participants || "-"}
                            </span>
                          </td>
                          <td className="py-3 px-4">{donation.total_contribution || "-"}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-3 py-1 rounded ${getStatusColor(donation.status)}`}>
                              {donation.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right relative">
                            {openActionMenu === donation.id && (
                              <div className="action-menu absolute right-4 top-10 bg-white border shadow-lg rounded-md z-50 w-36">
                                <button
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                                  onClick={() => handleEdit(donation)}
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <Link
                                  to={`/donators/${donation.id}`}
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                                >
                                  <Users className="w-4 h-4" />
                                  Donors
                                </Link>
                                <button
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                                  onClick={() => handleCopyLink(donation.id)}
                                >
                                  <Link2 className="w-4 h-4" />
                                  Copy Link
                                </button>
                                {donation.status === "Active" ? (
                                  <button
                                    className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                                    onClick={() => handleStatusUpdate(donation.id, "Deactivated")}
                                  >
                                    <X className="w-4 h-4" />
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                                    onClick={() => handleStatusUpdate(donation.id, "Active")}
                                  >
                                    <X className="w-4 h-4" />
                                    Activate
                                  </button>
                                )}
                                <button
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                                  onClick={() => handleDelete(donation.id)}
                                  disabled={deleteLoading === donation.id}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  {deleteLoading === donation.id ? "Deleting..." : "Delete"}
                                </button>
                              </div>
                            )}
                            <button
                              className="text-gray-600 hover:text-orange-600"
                              onClick={() => toggleActionMenu(donation.id)}
                            >
                              <ChevronRight
                                className={`w-5 h-5 ml-auto transition-transform duration-200 ${openActionMenu === donation.id ? "rotate-90" : ""}`}
                              />
                            </button>
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
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredDonations.length)} of {filteredDonations.length}{" "}
                  donations
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
        </div>

        {/* Edit Donation Modal */}
        <EditDonationModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          donationData={selectedDonation}
          onDonationUpdated={handleDonationUpdated}
        />
      </div>
    </DashboardLayout>
  )
}

export default DonationManagement
