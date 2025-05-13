import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users")
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    // Sample data for users
    const users = [
        {
            id: 1,
            name: "Uche ThankGod Chukwuebuka",
            chapter: "LAGOS",
            email: "tuche@gmail.com",
            phone: "07069790950",
        },
        {
            id: 2,
            name: "Martins Ologbowu",
            chapter: "ENUGU",
            email: "tuche@gmail.com",
            phone: "07069790950",
        },
        {
            id: 3,
            name: "Ekene Ezeasor",
            chapter: "LAGOS",
            email: "tuche@gmail.com",
            phone: "07069790950",
        },
    ]

    // Sample data for logs
    const logs = [
        {
            id: "TX1289HUE",
            module: "Event/News",
            activity: "Created New Event",
            timestamp: "2025-09-09 | 09:00",
            performedBy: "Uche ThankGod",
            performedByFull: "Uche ThankGod Chukwuebuka",
        },
        {
            id: "TX1289HUE",
            module: "Event/News",
            activity: "Created New Event",
            timestamp: "2025-09-09 | 09:00",
            performedBy: "Uche ThankGod Chukwuebuka",
            performedByFull: "Uche ThankGod Chukwuebuka",
        },
        {
            id: "TX1289HUE",
            module: "Event/News",
            activity: "Created New Event",
            timestamp: "2025-09-09 | 09:00",
            performedBy: "Uche ThankGod Chukwuebuka",
            performedByFull: "Uche ThankGod Chukwuebuka",
        },
    ]

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
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

    // Render Users Tab Content
    const renderUsersTab = () => (
        <div className="overflow-x-auto">
            <table className="w-full rounded border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left py-3 px-4 font-medium">USER NAME</th>
                        <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
                        <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
                        <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
                        <th className="text-right py-3 px-4 font-medium"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                        {user.name.charAt(0)}
                                    </div>
                                    {user.name}
                                </div>
                            </td>
                            <td className="py-3 px-4">{user.chapter}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">{user.phone}</td>
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
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                                Sort By
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
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
                                className={`px-4 py-3 text-sm ${activeTab === "users" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
                                    }`}
                                onClick={() => setActiveTab("users")}
                            >
                                Users
                            </button>
                            <button
                                className={`px-4 py-3 text-sm ${activeTab === "logs" ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
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
                        <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: 48</div>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center border rounded-md">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 1 ? "bg-gray-100" : ""
                                    }`}
                                onClick={() => handlePageChange(1)}
                            >
                                1
                            </button>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 2 ? "bg-gray-100" : ""
                                    }`}
                                onClick={() => handlePageChange(2)}
                            >
                                2
                            </button>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 3 ? "bg-gray-100" : ""
                                    }`}
                                onClick={() => handlePageChange(3)}
                            >
                                3
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center">...</span>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 16 ? "bg-gray-100" : ""
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

export default AdminDashboard
