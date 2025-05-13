import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft, Edit, Eye, Link2, X } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"

const EventsNewsPage = () => {
  const [activeTab, setActiveTab] = useState("events")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showActionMenu, setShowActionMenu] = useState(null)
  const navigate = useNavigate()

  // Sample data for events
  const events = [
    {
      id: 1,
      title: "Alumni Get together",
      dateRange: "April 14, 2025 - April 14, 2025",
      chapter: "All",
      type: "Event, Announcement",
      status: "Active",
    },
    {
      id: 2,
      title: "Alumni Get together",
      dateRange: "April 14, 2025 - April 14, 2025",
      chapter: "Lagos",
      type: "Event, Announcement",
      status: "Deactivated",
    },
    {
      id: 3,
      title: "Alumni Get together",
      dateRange: "April 14, 2025 - April 14, 2025",
      chapter: "Enugu",
      type: "Event, Announcement",
      status: "Expired",
    },
    {
      id: 4,
      title: "Alumni Get together",
      dateRange: "April 14, 2025 - April 14, 2025",
      chapter: "All",
      type: "Event, Announcement",
      status: "Draft",
    },
  ]

  // Sample data for news
  const news = [
    {
      id: 1,
      title: "Alumni Get together",
      chapter: "All",
      type: "Event, Announcement",
      status: "Active",
    },
    {
      id: 2,
      title: "Alumni Get together",
      chapter: "All",
      type: "Event, Announcement",
      status: "Deactivated",
    },
    {
      id: 3,
      title: "Alumni Get together",
      chapter: "All",
      type: "Event, Announcement",
      status: "Expired",
    },
    {
      id: 4,
      title: "Alumni Get together",
      chapter: "All",
      type: "Event, Announcement",
      status: "Draft",
    },
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }


  const handleViewDetails = (id) => {
    if (activeTab === "events") {
      navigate(`/event/${id}`)
    } else {
      navigate(`/news/${id}`)
    }
  }

  const toggleActionMenu = (id) => {
    setShowActionMenu(showActionMenu === id ? null : id)
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

  // Render Events Tab Content
  const renderEventsTab = () => (
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
          {events.map((event) => (
            <tr key={event.id} className="border-b">
              <td className="py-3 px-4">
                <Link to={`/event-details`}>
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <span className="underline">{event.title}</span>
                </div>
                </Link>
              </td>
              <td className="py-3 px-4">{event.dateRange}</td>
              <td className="py-3 px-4">{event.chapter}</td>
              <td className="py-3 px-4">{event.type}</td>
              <td className={`py-3 px-4 ${getStatusColor(event.status)}`}>{event.status}</td>
              <td className="py-3 px-4 text-right relative">
                {showActionMenu === event.id && (
                  <div className="absolute right-4 top-0 bg-white border shadow-md rounded-md z-10 w-36">
                    <button
                      className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </button>
                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                      <X className="w-4 h-4" />
                      Deactivate
                    </button>
                  </div>
                )}
                <button
                  className="text-gray-600"
                  onClick={() => (event.id === 2 ? toggleActionMenu(event.id) : handleViewDetails(event.id))}
                >
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Render News Tab Content
  const renderNewsTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 font-medium">NEWS TITLE</th>
            <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
            <th className="text-left py-3 px-4 font-medium">TYPE</th>
            <th className="text-left py-3 px-4 font-medium">STATUS</th>
            <th className="text-right py-3 px-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3 px-4">
                <Link to={`/news-details`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <span className="underline">{item.title}</span>
                </div>
                </Link>
              </td>
              <td className="py-3 px-4">{item.chapter}</td>
              <td className="py-3 px-4">{item.type}</td>
              <td className={`py-3 px-4 ${getStatusColor(item.status)}`}>{item.status}</td>
              <td className="py-3 px-4 text-right relative">
                {showActionMenu === item.id && (
                  <div className="absolute right-4 top-0 bg-white border shadow-md rounded-md z-10 w-36">
                    <button
                      className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </button>
                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                      <X className="w-4 h-4" />
                      Deactivate
                    </button>
                  </div>
                )}
                <button
                  className="text-gray-600"
                  onClick={() => (item.id === 2 ? toggleActionMenu(item.id) : handleViewDetails(item.id))}
                >
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

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
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
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
          <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: 48</div>
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
            <button
              className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                currentPage === 2 ? "bg-gray-100" : ""
              }`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                currentPage === 3 ? "bg-gray-100" : ""
              }`}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center">...</span>
            <button
              className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                currentPage === 16 ? "bg-gray-100" : ""
              }`}
              onClick={() => handlePageChange(16)}
            >
              16
            </button>
            <button className="w-8 h-8 flex items-center justify-center border rounded-md">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
            2 / page
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default EventsNewsPage
