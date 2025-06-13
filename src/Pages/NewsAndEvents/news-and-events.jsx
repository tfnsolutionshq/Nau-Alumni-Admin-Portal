// "use client"

// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState, useEffect } from "react"
// import { Search, ChevronDown, ChevronRight, ChevronLeft, Edit, Eye, Link2, X, Trash2 } from "lucide-react"
// import { useNavigate, Link } from "react-router-dom"
// import axios from "axios"
// import { useAuth } from "../../Context/AuthContext"
// import EditEventModal from "../../Components/EventsAndNews/Edit-Events"
// import EventPreviewModal from "../../Components/EventsAndNews/Preview-Events"
// import EditNewsModal from "../../Components/EventsAndNews/EditNews"

// const EventsNewsPage = () => {
//   const [activeTab, setActiveTab] = useState("events")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [showActionMenu, setShowActionMenu] = useState(null)
//   const [events, setEvents] = useState([])
//   const [news, setNews] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false)
//   const [isEditNewsModalOpen, setIsEditNewsModalOpen] = useState(false)
//   const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
//   const [selectedEvent, setSelectedEvent] = useState(null)
//   const [selectedNews, setSelectedNews] = useState(null)
//   const [deleteLoading, setDeleteLoading] = useState(null)
//   const navigate = useNavigate()
//   const { token, isAuthenticated, loading: authLoading } = useAuth()

//   // Fetch data based on active tab
//   useEffect(() => {
//     if (activeTab === "events") {
//       fetchEvents()
//     } else {
//       fetchNews()
//     }
//   }, [activeTab, token, isAuthenticated, authLoading])

//   const fetchEvents = async () => {
//     if (authLoading) return

//     if (!isAuthenticated || !token) {
//       setError("Please log in to view events")
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)

//       const config = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/events",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       const response = await axios.request(config)
//       setEvents(response.data || [])
//     } catch (err) {
//       console.error("Error fetching events:", err)
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please log in again.")
//       } else {
//         setError("Failed to load events. Please try again later.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchNews = async () => {
//     if (authLoading) return

//     if (!isAuthenticated || !token) {
//       setError("Please log in to view news")
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)

//       const config = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/news",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       const response = await axios.request(config)

//       // Handle the response structure - check if it's in data.data or just data
//       if (response.data && response.data.data) {
//         setNews(response.data.data)
//       } else {
//         setNews(response.data || [])
//       }
//     } catch (err) {
//       console.error("Error fetching news:", err)
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please log in again.")
//       } else {
//         setError("Failed to load news. Please try again later.")
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

//   const handleViewDetails = (id) => {
//     if (activeTab === "events") {
//       navigate(`/event-details/${id}`)
//     } else {
//       navigate(`/news-details/${id}`)
//     }
//   }

//   const toggleActionMenu = (id) => {
//     setShowActionMenu(showActionMenu === id ? null : id)
//   }

//   const handleEditEvent = (event) => {
//     setSelectedEvent(event)
//     setIsEditEventModalOpen(true)
//     setShowActionMenu(null)
//   }

//   const handleEditNews = (newsItem) => {
//     setSelectedNews(newsItem)
//     setIsEditNewsModalOpen(true)
//     setShowActionMenu(null)
//   }

//   const handlePreviewEvent = (event) => {
//     setSelectedEvent(event)
//     setIsPreviewModalOpen(true)
//     setShowActionMenu(null)
//   }

//   const handleCopyLink = (id, type) => {
//     const baseUrl = window.location.origin
//     const linkUrl = type === "event" ? `${baseUrl}/event/${id}` : `${baseUrl}/news/${id}`
//     navigator.clipboard.writeText(linkUrl)
//     // Replaced alert with console log/custom message if needed in production
//     console.log(`${type === "event" ? "Event" : "News"} link copied to clipboard!`);
//     setShowActionMenu(null)
//   }

//   const handleStatusUpdate = async (id, newStatus, type) => {
//     try {
//       let endpoint;
//       let requestData = {};

//       if (type === "event") {
//         endpoint = `https://unizikalumni-api.tfnsolutions.us/api/events/update-status`;
//         requestData = { event_id: id, status: newStatus };
//       } else { // type === "news"
//         // For news, send id and status as query parameters as per the provided API snippet example
//         endpoint = `https://unizikalumni-api.tfnsolutions.us/api/news/update-status?news_id=${id}&status=${newStatus}`;
//         // No data in the body for news, as it's sent in the URL
//         requestData = {}; // Or null, or new FormData() if the API expects it
//       }
      
//       const config = {
//         method: "post",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: endpoint,
//         headers: {
//           Accept: "application/json",
//           // Content-Type might not be strictly needed for POST with query params,
//           // but keeping it for consistency if API expects it even without a body.
//           "Content-Type": "application/json", 
//           Authorization: `Bearer ${token}`,
//         },
//         data: requestData, // Send data in the request body (for events) or empty (for news)
//       };

//       await axios.request(config)

//       // Refresh the appropriate list
//       if (type === "event") {
//         fetchEvents()
//       } else {
//         fetchNews()
//       }
//       setShowActionMenu(null)
//     } catch (err) {
//       console.error(`Error updating ${type} status:`, err)
//       if (err.response) {
//         console.error("Error response data:", err.response.data);
//         console.error("Error response status:", err.response.status);
//         console.error("Error response headers:", err.response.headers);
//         alert(`Failed to update ${type} status: ${err.response.data?.message || 'Server error'}`);
//       } else if (err.request) {
//         console.error("Error request:", err.request);
//         alert(`Failed to update ${type} status: No response from server.`);
//       } else {
//         console.error("Error message:", err.message);
//         alert(`Failed to update ${type} status: ${err.message}`);
//       }
//     }
//   }

//   const handleDelete = async (id, type) => {
//     // Replaced window.confirm with console log/custom modal for non-blocking UI
//     console.warn(`Attempting to delete ${type} with ID: ${id}. Confirming deletion...`);
    
//     // In a real application, you'd use a custom modal for confirmation:
//     // const confirmed = await showConfirmationModal(`Are you sure you want to delete this ${type}?`);
//     // if (!confirmed) return;

//     // For now, let's assume it's confirmed for demonstration purposes if `window.confirm` is removed.
//     // If you explicitly want a blocking confirmation, and acknowledge its impact in an iframe,
//     // you can revert to window.confirm, but it's generally discouraged.
//     if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
//       return
//     }

//     try {
//       setDeleteLoading(id)
//       const endpoint =
//         type === "event"
//           ? `https://unizikalumni-api.tfnsolutions.us/api/events/${id}`
//           : `https://unizikalumni-api.tfnsolutions.us/api/news/${id}`

//       const config = {
//         method: "delete",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: endpoint,
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       await axios.request(config)

//       // Refresh the appropriate list
//       if (type === "event") {
//         fetchEvents()
//       } else {
//         fetchNews()
//       }
//       setShowActionMenu(null)
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err)
//       alert(`Failed to delete ${type}`) // Keep alert for visibility during testing
//     } finally {
//       setDeleteLoading(null)
//     }
//   }

//   const handleEventUpdated = () => {
//     fetchEvents()
//   }

//   const handleNewsUpdated = () => {
//     fetchNews()
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

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "text-green-600"
//       case "Draft":
//         return "text-gray-600"
//       case "Expired":
//         return "text-red-600"
//       case "Deactivated":
//         return "text-red-600"
//       default:
//         return "text-gray-600"
//     }
//   }

//   // Filter events/news based on search query
//   const filteredEvents = events.filter(
//     (event) =>
//       event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       event.chapter?.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const filteredNews = news.filter(
//     (item) =>
//       item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   // Render Events Tab Content
//   const renderEventsTab = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-gray-500">Loading events...</div>
//         </div>
//       )
//     }

//     if (error) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-red-500">{error}</div>
//         </div>
//       )
//     }

//     if (filteredEvents.length === 0) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-gray-500">No events found</div>
//         </div>
//       )
//     }

//     return (
//       <div className="overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left py-3 px-4 font-medium">EVENT TITLE</th>
//               <th className="text-left py-3 px-4 font-medium">START - END DATE</th>
//               <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
//               <th className="text-left py-3 px-4 font-medium">TYPE</th>
//               <th className="text-left py-3 px-4 font-medium">STATUS</th>
//               <th className="text-right py-3 px-4 font-medium"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEvents.map((event) => (
//               <tr key={event.id} className="border-b">
//                 <td className="py-3 px-4">
//                   <Link to={`/event-details/${event.id}`}>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
//                         {event.banner_image_url ? (
//                           <img
//                             src={event.banner_image_url || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"}
//                             alt={event.title}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null
//                               e.target.src = "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"
//                             }}
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gray-200"></div>
//                         )}
//                       </div>
//                       <span className="underline">{event.title}</span>
//                     </div>
//                   </Link>
//                 </td>
//                 <td className="py-3 px-4">
//                   {formatDate(event.start_date)} - {formatDate(event.end_date)}
//                 </td>
//                 <td className="py-3 px-4">{event.chapter}</td>
//                 <td className="py-3 px-4">{event.type}</td>
//                 <td className={`py-3 px-4 ${getStatusColor(event.status || "Active")}`}>{event.status || "Active"}</td>
//                 <td className="py-3 px-4 text-right relative">
//                   {showActionMenu === event.id && (
//                     <div className="absolute right-4 top-0 bg-white border shadow-md rounded-md z-10 w-36">
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleEditEvent(event)}
//                       >
//                         <Edit className="w-4 h-4" />
//                         Edit
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handlePreviewEvent(event)}
//                       >
//                         <Eye className="w-4 h-4" />
//                         Preview
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleCopyLink(event.id, "event")}
//                       >
//                         <Link2 className="w-4 h-4" />
//                         Copy Link
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() =>
//                           handleStatusUpdate(event.id, event.status === "Active" ? "Deactivated" : "Active", "event")
//                         }
//                       >
//                         <X className="w-4 h-4" />
//                         {event.status === "Active" ? "Deactivate" : "Activate"}
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
//                         onClick={() => handleDelete(event.id, "event")}
//                         disabled={deleteLoading === event.id}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         {deleteLoading === event.id ? "Deleting..." : "Delete"}
//                       </button>
//                     </div>
//                   )}
//                   <button className="text-gray-600" onClick={() => toggleActionMenu(event.id)}>
//                     <ChevronRight className="w-5 h-5 ml-auto" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )
//   }

//   // Render News Tab Content
//   const renderNewsTab = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-gray-500">Loading news...</div>
//         </div>
//       )
//     }

//     if (error) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-red-500">{error}</div>
//         </div>
//       )
//     }

//     if (filteredNews.length === 0) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-gray-500">No news found</div>
//         </div>
//       )
//     }

//     return (
//       <div className="overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left py-3 px-4 font-medium">NEWS TITLE</th>
//               <th className="text-left py-3 px-4 font-medium">TYPE</th>
//               <th className="text-left py-3 px-4 font-medium">STATUS</th>
//               <th className="text-left py-3 px-4 font-medium">CREATED</th>
//               <th className="text-right py-3 px-4 font-medium"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredNews.map((item) => (
//               <tr key={item.id} className="border-b">
//                 <td className="py-3 px-4">
//                   <Link to={`/news-details/${item.id}`}>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
//                         {item.banner_image_url ? (
//                           <img
//                             src={item.banner_image_url || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"}
//                             alt={item.title}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null
//                               e.target.src = "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"
//                             }}
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gray-200"></div>
//                         )}
//                       </div>
//                       <span className="underline">{item.title}</span>
//                     </div>
//                   </Link>
//                 </td>
//                 <td className="py-3 px-4">{item.type}</td>
//                 <td className={`py-3 px-4 ${getStatusColor(item.status || "Active")}`}>{item.status || "Active"}</td>
//                 <td className="py-3 px-4">{formatDate(item.created_at)}</td>
//                 <td className="py-3 px-4 text-right relative">
//                   {showActionMenu === item.id && (
//                     <div className="absolute right-4 top-0 bg-white border shadow-md rounded-md z-10 w-36">
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleEditNews(item)}
//                       >
//                         <Edit className="w-4 h-4" />
//                         Edit
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleViewDetails(item.id)}
//                       >
//                         <Eye className="w-4 h-4" />
//                         Preview
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleCopyLink(item.id, "news")}
//                       >
//                         <Link2 className="w-4 h-4" />
//                         Copy Link
//                       </button>
//                       {/* Status Update Options for News */}
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleStatusUpdate(item.id, "Active", "news")}
//                       >
//                         <X className="w-4 h-4" />
//                         Set Active
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleStatusUpdate(item.id, "Deactivated", "news")}
//                       >
//                         <X className="w-4 h-4" />
//                         Set Deactivated
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleStatusUpdate(item.id, "Expired", "news")}
//                       >
//                         <X className="w-4 h-4" />
//                         Set Expired
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
//                         onClick={() => handleStatusUpdate(item.id, "Draft", "news")}
//                       >
//                         <X className="w-4 h-4" />
//                         Set Draft
//                       </button>
//                       <button
//                         className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
//                         onClick={() => handleDelete(item.id, "news")}
//                         disabled={deleteLoading === item.id}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         {deleteLoading === item.id ? "Deleting..." : "Delete"}
//                       </button>
//                     </div>
//                   )}
//                   <button className="text-gray-600" onClick={() => toggleActionMenu(item.id)}>
//                     <ChevronRight className="w-5 h-5 ml-auto" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )
//   }

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
//         <div className="max-w-7xl mx-auto p-4">
//           {/* Tabs */}
//           <div className="border-b mb-4">
//             <div className="flex">
//               <button
//                 className={`px-4 py-3 text-sm ${
//                   activeTab === "events" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("events")}
//               >
//                 Events
//               </button>
//               <button
//                 className={`px-4 py-3 text-sm ${
//                   activeTab === "news" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("news")}
//               >
//                 News
//               </button>
//             </div>
//           </div>

//           {/* Search and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
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
//                 Sort By
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
//                 Export
//               </button>
//               <Link
//                 to={activeTab === "events" ? "/add-event" : "/add-news"}
//                 className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm"
//               >
//                 Create New {activeTab === "events" ? "Event" : "News"}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>

//           {/* Tab Content */}
//           {activeTab === "events" ? renderEventsTab() : renderNewsTab()}

//           {/* Pagination */}
//           <div className="p-4 flex flex-col md:flex-row justify-between items-center">
//             <div className="text-sm text-gray-600 mb-2 md:mb-0">
//               Total: {activeTab === "events" ? filteredEvents.length : filteredNews.length}
//             </div>
//             <div className="flex items-center gap-1">
//               <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 className={`w-8 h-8 flex items-center justify-center border rounded-md ${
//                   currentPage === 1 ? "bg-gray-100" : ""
//                 }`}
//                 onClick={() => handlePageChange(1)}
//               >
//                 1
//               </button>
//               <button className="w-8 h-8 flex items-center justify-center border rounded-md">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
//               {activeTab === "events" ? filteredEvents.length : filteredNews.length} / page
//               <ChevronDown className="w-4 h-4" />
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         <EditEventModal
//           isOpen={isEditEventModalOpen}
//           onClose={() => setIsEditEventModalOpen(false)}
//           eventData={selectedEvent}
//           onEventUpdated={handleEventUpdated}
//         />

//         <EditNewsModal
//           isOpen={isEditNewsModalOpen}
//           onClose={() => setIsEditNewsModalOpen(false)}
//           newsData={selectedNews}
//           onNewsUpdated={handleNewsUpdated}
//         />

//         <EventPreviewModal
//           isOpen={isPreviewModalOpen}
//           onClose={() => setIsPreviewModalOpen(false)}
//           eventData={selectedEvent}
//         />
//       </div>
//     </DashboardLayout>
//   )
// }

// export default EventsNewsPage










"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft, Edit, Eye, Link2, X, Trash2 } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import EditEventModal from "../../Components/EventsAndNews/Edit-Events"
import EventPreviewModal from "../../Components/EventsAndNews/Preview-Events"
import EditNewsModal from "../../Components/EventsAndNews/EditNews"

const EventsNewsPage = () => {
  const [activeTab, setActiveTab] = useState("events")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showActionMenu, setShowActionMenu] = useState(null)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false)
  const [isEditNewsModalOpen, setIsEditNewsModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const navigate = useNavigate()
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const sortDropdownRef = useRef(null)

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "events") {
      fetchEvents()
    } else {
      fetchNews()
    }
  }, [activeTab, token, isAuthenticated, authLoading])

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

  const fetchEvents = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view events")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/events",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      setEvents(response.data || [])
    } catch (err) {
      console.error("Error fetching events:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to load events. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchNews = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view news")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/news",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)

      // Handle the response structure - check if it's in data.data or just data
      if (response.data && response.data.data) {
        setNews(response.data.data)
      } else {
        setNews(response.data || [])
      }
    } catch (err) {
      console.error("Error fetching news:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to load news. Please try again later.")
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
    const dataToExport = activeTab === "events" ? filteredAndSortedEvents : filteredAndSortedNews

    if (dataToExport.length === 0) {
      alert("No data to export")
      return
    }

    let csvContent = ""
    let headers = []

    if (activeTab === "events") {
      headers = ["Title", "Start Date", "End Date", "Chapter", "Type", "Status"]
      csvContent = headers.join(",") + "\n"

      dataToExport.forEach((event) => {
        const row = [
          `"${event.title || ""}"`,
          `"${formatDate(event.start_date)}"`,
          `"${formatDate(event.end_date)}"`,
          `"${event.chapter || ""}"`,
          `"${event.type || ""}"`,
          `"${event.status || "Active"}"`,
        ]
        csvContent += row.join(",") + "\n"
      })
    } else {
      headers = ["Title", "Type", "Status", "Created Date"]
      csvContent = headers.join(",") + "\n"

      dataToExport.forEach((item) => {
        const row = [
          `"${item.title || ""}"`,
          `"${item.type || ""}"`,
          `"${item.status || "Active"}"`,
          `"${formatDate(item.created_at)}"`,
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

  const handleViewDetails = (id) => {
    if (activeTab === "events") {
      navigate(`/event-details/${id}`)
    } else {
      navigate(`/news-details/${id}`)
    }
  }

  const toggleActionMenu = (id) => {
    setShowActionMenu(showActionMenu === id ? null : id)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setIsEditEventModalOpen(true)
    setShowActionMenu(null)
  }

  const handleEditNews = (newsItem) => {
    setSelectedNews(newsItem)
    setIsEditNewsModalOpen(true)
    setShowActionMenu(null)
  }

  const handlePreviewEvent = (event) => {
    setSelectedEvent(event)
    setIsPreviewModalOpen(true)
    setShowActionMenu(null)
  }

  const handleCopyLink = (id, type) => {
    const baseUrl = window.location.origin
    const linkUrl = type === "event" ? `${baseUrl}/event/${id}` : `${baseUrl}/news/${id}`
    navigator.clipboard.writeText(linkUrl)
    console.log(`${type === "event" ? "Event" : "News"} link copied to clipboard!`)
    setShowActionMenu(null)
  }

  const handleStatusUpdate = async (id, newStatus, type) => {
    try {
      let endpoint
      let requestData = {}

      if (type === "event") {
        endpoint = `https://unizikalumni-api.tfnsolutions.us/api/events/update-status`
        requestData = { event_id: id, status: newStatus }
      } else {
        endpoint = `https://unizikalumni-api.tfnsolutions.us/api/news/update-status?news_id=${id}&status=${newStatus}`
        requestData = {}
      }

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: endpoint,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: requestData,
      }

      await axios.request(config)

      if (type === "event") {
        fetchEvents()
      } else {
        fetchNews()
      }
      setShowActionMenu(null)
    } catch (err) {
      console.error(`Error updating ${type} status:`, err)
      if (err.response) {
        alert(`Failed to update ${type} status: ${err.response.data?.message || "Server error"}`)
      } else if (err.request) {
        alert(`Failed to update ${type} status: No response from server.`)
      } else {
        alert(`Failed to update ${type} status: ${err.message}`)
      }
    }
  }

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      return
    }

    try {
      setDeleteLoading(id)
      const endpoint =
        type === "event"
          ? `https://unizikalumni-api.tfnsolutions.us/api/events/${id}`
          : `https://unizikalumni-api.tfnsolutions.us/api/news/${id}`

      const config = {
        method: "delete",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: endpoint,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.request(config)

      if (type === "event") {
        fetchEvents()
      } else {
        fetchNews()
      }
      setShowActionMenu(null)
    } catch (err) {
      console.error(`Error deleting ${type}:`, err)
      alert(`Failed to delete ${type}`)
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleEventUpdated = () => {
    fetchEvents()
  }

  const handleNewsUpdated = () => {
    fetchNews()
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600"
      case "Draft":
        return "text-gray-600"
      case "Expired":
        return "text-red-600"
      case "Deactivated":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // Filter and sort events
  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.chapter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAndSortedEvents = [...filteredEvents].sort((a, b) => {
    let aValue = ""
    let bValue = ""

    switch (sortBy) {
      case "title":
        aValue = a.title || ""
        bValue = b.title || ""
        break
      case "start_date":
        aValue = a.start_date || ""
        bValue = b.start_date || ""
        break
      case "chapter":
        aValue = a.chapter || ""
        bValue = b.chapter || ""
        break
      case "type":
        aValue = a.type || ""
        bValue = b.type || ""
        break
      case "status":
        aValue = a.status || "Active"
        bValue = b.status || "Active"
        break
      default:
        aValue = a.title || ""
        bValue = b.title || ""
    }

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  // Filter and sort news
  const filteredNews = news.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAndSortedNews = [...filteredNews].sort((a, b) => {
    let aValue = ""
    let bValue = ""

    switch (sortBy) {
      case "title":
        aValue = a.title || ""
        bValue = b.title || ""
        break
      case "type":
        aValue = a.type || ""
        bValue = b.type || ""
        break
      case "status":
        aValue = a.status || "Active"
        bValue = b.status || "Active"
        break
      case "created_at":
        aValue = a.created_at || ""
        bValue = b.created_at || ""
        break
      default:
        aValue = a.title || ""
        bValue = b.title || ""
    }

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  // Render Events Tab Content
  const renderEventsTab = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading events...</div>
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

    if (filteredAndSortedEvents.length === 0) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">No events found</div>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-medium">EVENT TITLE</th>
              <th className="text-left py-3 px-4 font-medium">START - END DATE</th>
              <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
              <th className="text-left py-3 px-4 font-medium">TYPE</th>
              <th className="text-left py-3 px-4 font-medium">STATUS</th>
              <th className="text-right py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEvents.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="py-3 px-4">
                  <Link to={`/event-details/${event.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                        {event.banner_image_url ? (
                          <img
                            src={event.banner_image_url || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"}
                            alt={event.title}
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
                      <span className="underline">{event.title}</span>
                    </div>
                  </Link>
                </td>
                <td className="py-3 px-4">
                  {formatDate(event.start_date)} - {formatDate(event.end_date)}
                </td>
                <td className="py-3 px-4">{event.chapter}</td>
                <td className="py-3 px-4">{event.type}</td>
                <td className={`py-3 px-4 ${getStatusColor(event.status || "Active")}`}>{event.status || "Active"}</td>
                <td className="py-3 px-4 text-right relative">
                  {showActionMenu === event.id && (
                    <div className="absolute right-4 top-0 bg-white border shadow-md rounded-md z-50 w-36">
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handlePreviewEvent(event)}
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleCopyLink(event.id, "event")}
                      >
                        <Link2 className="w-4 h-4" />
                        Copy Link
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() =>
                          handleStatusUpdate(event.id, event.status === "Active" ? "Deactivated" : "Active", "event")
                        }
                      >
                        <X className="w-4 h-4" />
                        {event.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => handleDelete(event.id, "event")}
                        disabled={deleteLoading === event.id}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteLoading === event.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                  <button className="text-gray-600" onClick={() => toggleActionMenu(event.id)}>
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Render News Tab Content
  const renderNewsTab = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading news...</div>
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

    if (filteredAndSortedNews.length === 0) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">No news found</div>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-medium">NEWS TITLE</th>
              <th className="text-left py-3 px-4 font-medium">TYPE</th>
              <th className="text-left py-3 px-4 font-medium">STATUS</th>
              <th className="text-left py-3 px-4 font-medium">CREATED</th>
              <th className="text-right py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedNews.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4">
                  <Link to={`/news-details/${item.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                        {item.banner_image_url ? (
                          <img
                            src={item.banner_image_url || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"}
                            alt={item.title}
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
                      <span className="underline">{item.title}</span>
                    </div>
                  </Link>
                </td>
                <td className="py-3 px-4">{item.type}</td>
                <td className={`py-3 px-4 ${getStatusColor(item.status || "Active")}`}>{item.status || "Active"}</td>
                <td className="py-3 px-4">{formatDate(item.created_at)}</td>
                <td className="py-3 px-4 text-right relative">
                  {showActionMenu === item.id && (
                    <div className="absolute right-4 top-0 bg-white border shadow-md rounded-md z-50 w-36">
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleEditNews(item)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleCopyLink(item.id, "news")}
                      >
                        <Link2 className="w-4 h-4" />
                        Copy Link
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleStatusUpdate(item.id, "Active", "news")}
                      >
                        <X className="w-4 h-4" />
                        Set Active
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleStatusUpdate(item.id, "Deactivated", "news")}
                      >
                        <X className="w-4 h-4" />
                        Set Deactivated
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleStatusUpdate(item.id, "Expired", "news")}
                      >
                        <X className="w-4 h-4" />
                        Set Expired
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleStatusUpdate(item.id, "Draft", "news")}
                      >
                        <X className="w-4 h-4" />
                        Set Draft
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => handleDelete(item.id, "news")}
                        disabled={deleteLoading === item.id}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteLoading === item.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                  <button className="text-gray-600" onClick={() => toggleActionMenu(item.id)}>
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

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

  const eventSortOptions = [
    { value: "title", label: "Title" },
    { value: "start_date", label: "Start Date" },
    { value: "chapter", label: "Chapter" },
    { value: "type", label: "Type" },
    { value: "status", label: "Status" },
  ]

  const newsSortOptions = [
    { value: "title", label: "Title" },
    { value: "type", label: "Type" },
    { value: "status", label: "Status" },
    { value: "created_at", label: "Created Date" },
  ]

  const currentSortOptions = activeTab === "events" ? eventSortOptions : newsSortOptions
  const currentData = activeTab === "events" ? filteredAndSortedEvents : filteredAndSortedNews

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto p-4">
          {/* Tabs */}
          <div className="border-b mb-4">
            <div className="flex">
              <button
                className={`px-4 py-3 text-sm ${
                  activeTab === "events" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("events")}
              >
                Events
              </button>
              <button
                className={`px-4 py-3 text-sm ${
                  activeTab === "news" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("news")}
              >
                News
              </button>
            </div>
          </div>

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
              <Link
                to={activeTab === "events" ? "/add-event" : "/add-news"}
                className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm"
              >
                Create New {activeTab === "events" ? "Event" : "News"}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "events" ? renderEventsTab() : renderNewsTab()}

          {/* Pagination */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {currentData.length}</div>
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
              {currentData.length} / page
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Modals */}
        <EditEventModal
          isOpen={isEditEventModalOpen}
          onClose={() => setIsEditEventModalOpen(false)}
          eventData={selectedEvent}
          onEventUpdated={handleEventUpdated}
        />

        <EditNewsModal
          isOpen={isEditNewsModalOpen}
          onClose={() => setIsEditNewsModalOpen(false)}
          newsData={selectedNews}
          onNewsUpdated={handleNewsUpdated}
        />

        <EventPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          eventData={selectedEvent}
        />
      </div>
    </DashboardLayout>
  )
}

export default EventsNewsPage
