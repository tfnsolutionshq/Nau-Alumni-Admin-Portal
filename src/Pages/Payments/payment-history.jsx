import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft, MoreVertical, X } from "lucide-react"

const PaymentsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [showReceiptModal, setShowReceiptModal] = useState(false)
    const [currentTransaction, setCurrentTransaction] = useState(null)

    // Sample data
    const transactions = [
        {
            id: "PAY928-09244",
            type: "DONATION",
            date: "April 14, 2023",
            amount: "₦100,000.00",
            receiptDetails: {
                donor: "Uche ThankGod",
                purpose: "School Building Project",
                reference: "REF-2023-04-14-001",
                status: "Completed",
            },
        },
        {
            id: "PAY928-09244",
            type: "MEMBERSHIP REG",
            date: "April 14, 2023",
            amount: "₦100,000.00",
            receiptDetails: {
                member: "Uche ThankGod",
                membershipType: "Annual",
                reference: "REF-2023-04-14-002",
                status: "Completed",
            },
        },
        {
            id: "PAY928-09244",
            type: "DONATION",
            date: "April 14, 2023",
            amount: "₦100,000.00",
            receiptDetails: {
                donor: "Martins Ologbowu",
                purpose: "Scholarship Fund",
                reference: "REF-2023-04-14-003",
                status: "Completed",
            },
        },
        {
            id: "PAY928-09244",
            type: "MEMBERSHIP REG",
            date: "April 14, 2023",
            amount: "₦100,000.00",
            receiptDetails: {
                member: "Ekene Ezeasor",
                membershipType: "Lifetime",
                reference: "REF-2023-04-14-004",
                status: "Completed",
            },
        },
        {
            id: "PAY928-09244",
            type: "MEMBERSHIP REG",
            date: "April 14, 2023",
            amount: "₦100,000.00",
            receiptDetails: {
                member: "John Doe",
                membershipType: "Annual",
                reference: "REF-2023-04-14-005",
                status: "Completed",
            },
        },
    ]

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const openReceiptModal = (transaction) => {
        setCurrentTransaction(transaction)
        setShowReceiptModal(true)
    }

    const closeReceiptModal = () => {
        setShowReceiptModal(false)
    }

    // Handle click outside modal to close it
    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeReceiptModal()
        }
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen p-4">
                <div className="w-full mx-auto">
                    {/* Search and Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                                Sort By
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
                                Download List
                            </button>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Summary Card */}
                    <div className="bg-white p-5 rounded-lg border mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-medium">Payments</h2>
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Total Accumulated Amount</p>
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold">20993</span>
                                    <span className="ml-2 text-xs text-green-500">+ 3.4</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Donation</p>
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold">N4456</span>
                                    <span className="ml-2 text-xs text-green-500">+ 3.4</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Membership</p>
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold">N20000</span>
                                    <span className="ml-2 text-xs text-green-500">+ 3.4</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left py-3 px-4 font-medium">TRANSACTION ID</th>
                                        <th className="text-left py-3 px-4 font-medium">TRANSACTION TYPE</th>
                                        <th className="text-left py-3 px-4 font-medium">TRANSACTION DATE</th>
                                        <th className="text-left py-3 px-4 font-medium">AMOUNT</th>
                                        <th className="text-right py-3 px-4 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-3 px-4">{transaction.id}</td>
                                            <td className="py-3 px-4">{transaction.type}</td>
                                            <td className="py-3 px-4">{transaction.date}</td>
                                            <td className="py-3 px-4 font-semibold text-green-600">{transaction.amount}</td>
                                            <td className="py-3 px-4 text-right">
                                                <button
                                                    className="text-gray-600 flex items-center gap-1 ml-auto"
                                                    onClick={() => openReceiptModal(transaction)}
                                                >
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

                    {/* Receipt Modal */}
                    {showReceiptModal && currentTransaction && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                            onClick={handleModalBackdropClick}
                        >
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
                                <div className="flex justify-between items-center border-b p-4">
                                    <h2 className="text-xl font-bold">Receipt Details</h2>
                                    <button onClick={closeReceiptModal} className="text-gray-500 hover:text-gray-700">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transaction ID:</span>
                                            <span className="font-medium">{currentTransaction.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Date:</span>
                                            <span className="font-medium">{currentTransaction.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Type:</span>
                                            <span className="font-medium">{currentTransaction.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Amount:</span>
                                            <span className="font-medium text-green-600">{currentTransaction.amount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                {currentTransaction.type === "DONATION" ? "Donor:" : "Member:"}
                                            </span>
                                            <span className="font-medium">
                                                {currentTransaction.type === "DONATION"
                                                    ? currentTransaction.receiptDetails.donor
                                                    : currentTransaction.receiptDetails.member}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                {currentTransaction.type === "DONATION" ? "Purpose:" : "Membership Type:"}
                                            </span>
                                            <span className="font-medium">
                                                {currentTransaction.type === "DONATION"
                                                    ? currentTransaction.receiptDetails.purpose
                                                    : currentTransaction.receiptDetails.membershipType}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Reference:</span>
                                            <span className="font-medium">{currentTransaction.receiptDetails.reference}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <span className="font-medium text-green-600">{currentTransaction.receiptDetails.status}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-center">
                                        <button
                                            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                            onClick={closeReceiptModal}
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

export default PaymentsPage
