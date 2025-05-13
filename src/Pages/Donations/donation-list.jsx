import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronDown, ChevronRight, ChevronLeft, Edit, Users, X, Upload, SortAscIcon } from "lucide-react"

const DonationManagement = () => {
    const [activeTab, setActiveTab] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [openActionMenu, setOpenActionMenu] = useState(null)

    // Sample data
    const donations = [
        {
            id: 1,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: 200,
            contribution: "₦200,000",
            status: "Active",
        },
        {
            id: 2,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: null,
            contribution: null,
            status: "Draft",
        },
        {
            id: 3,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: 200,
            contribution: "₦200,000",
            status: "Expired",
        },
        {
            id: 4,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: 200,
            contribution: "₦200,000",
            status: "Deactivated",
        },
        {
            id: 5,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: 200,
            contribution: "₦200,000",
            status: "Active",
        },
        {
            id: 6,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: 200,
            contribution: "₦200,000",
            status: "Active",
        },
        {
            id: 7,
            title: "Mbanugo GO Fund Me",
            dateRange: "April 14, 2023 - April 14, 2023",
            participants: 200,
            contribution: "₦200,000",
            status: "Active",
        },
    ]

    const tabs = ["All", "Active", "Draft", "Deactivated", "Expired"]

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const toggleActionMenu = (id) => {
        setOpenActionMenu(openActionMenu === id ? null : id)
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
                return "text-gray-600"
        }
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
                                    className={`px-4 py-3 whitespace-nowrap ${activeTab === tab ? "border-b-2 border-orange-500 font-medium" : "text-gray-600"
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
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <SortAscIcon className="w-4 h-4" />
                                Sort By
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <Upload className="w-4 h-4" />
                                Export
                            </button>
                            <Link to={`/create-donation`}>
                                <button className="bg-[#FF6900] text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
                                    Create New Donation
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border ">
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
                                {donations.map((donation) => (
                                    <tr key={donation.id} className="border-b">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded"></div>
                                                <Link to={`/donators`} className="text-black underline hover:underline">
                                                    {donation.title}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{donation.dateRange}</td>
                                        <td className="py-3 px-4">
                                            <span className="inline-block border px-2 py-1 rounded text-center min-w-[40px]">
                                                {donation.participants || "-"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{donation.contribution || "-"}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-block px-3 py-1 rounded ${getStatusColor(donation.status)}`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right relative">
                                            {openActionMenu === donation.id && (
                                                <div className="absolute right-4 top-10 bg-white border shadow-md rounded-md z-10 w-36">
                                                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                                                        <Users className="w-4 h-4" />
                                                        Donors
                                                    </button>
                                                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                                                        <Link className="w-4 h-4" />
                                                        Copy Link
                                                    </button>
                                                    <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                                                        <X className="w-4 h-4" />
                                                        Deactivate
                                                    </button>
                                                </div>
                                            )}
                                            <button className="text-gray-600" onClick={() => toggleActionMenu(donation.id)}>
                                                <ChevronRight className={`w-5 h-5 ml-auto transition-transform duration-200 ${openActionMenu === donation.id ? 'rotate-90' : ''}`} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: 48</div>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center border rounded-md">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 1 ? "bg-gray-100" : ""}`}
                                onClick={() => handlePageChange(1)}
                            >
                                1
                            </button>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 2 ? "bg-gray-100" : ""}`}
                                onClick={() => handlePageChange(2)}
                            >
                                2
                            </button>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 3 ? "bg-gray-100" : ""}`}
                                onClick={() => handlePageChange(3)}
                            >
                                3
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center">...</span>
                            <button
                                className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 16 ? "bg-gray-100" : ""}`}
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

export default DonationManagement
