import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Search, ChevronDown, ChevronRight, Filter } from "lucide-react"

const DonationList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")

    // Sample data
    const donations = [
        {
            id: 1,
            donor: "Uche ThankGod Chukwuebuka",
            donation: "Udemba School Renovation",
            date: "April 14, 2023",
            amount: "₦100,000.00",
        },
        {
            id: 2,
            donor: "Uche ThankGod Chukwuebuka",
            donation: "Udemba School Renovation",
            date: "April 14, 2023",
            amount: "₦100,000.00",
        },
        {
            id: 3,
            donor: "Uche ThankGod Chukwuebuka",
            donation: "Udemba School Renovation",
            date: "April 14, 2023",
            amount: "₦100,000.00",
        },
        {
            id: 4,
            donor: "Uche ThankGod Chukwuebuka",
            donation: "Udemba School Renovation",
            date: "April 14, 2023",
            amount: "₦100,000.00",
        },
    ]

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-white">
                <div className="w-full px-6 mx-auto">
                    {/* Header */}
                    <div className="py-4 border-b">
                        <button className="flex items-center shadow p-1 rounded text-gray-600">
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
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <Filter className="w-4 h-4" />
                                Sort By
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
                                Download List
                            </button>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">DONATORS</th>
                                    <th className="text-left py-3 px-4 font-medium">DONATION</th>
                                    <th className="text-left py-3 px-4 font-medium">DONATION DATE</th>
                                    <th className="text-left py-3 px-4 font-medium">AMOUNT</th>
                                    <th className="text-right py-3 px-4 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <tr key={donation.id} className="border-b">
                                        <td className="py-3 px-4">{donation.donor}</td>
                                        <td className="py-3 px-4">
                                            <a href="#" className="text-black underline font-medium hover:underline">
                                                {donation.donation}
                                            </a>
                                        </td>
                                        <td className="py-3 px-4">{donation.date}</td>
                                        <td className="py-3 px-4 text-green-600">{donation.amount}</td>
                                        <td className="py-3 px-4 text-right">
                                            <button className="text-gray-600 flex items-center gap-1 ml-auto">
                                                View Receipt
                                                <ChevronRight className="w-4 h-4" />
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

// Missing ChevronLeft component, let's define it
const ChevronLeft = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}

export default DonationList
