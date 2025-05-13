import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Search, ChevronDown, ChevronRight, Filter, ChevronLeft } from "lucide-react"

const DonorsListWithCommentModal = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [currentDonor, setCurrentDonor] = useState(null)

  // Sample data
  const donors = [
    {
      id: 1,
      name: "Uche ThankGod Chukwuebuka",
      email: "tuche@gmail.com",
      phone: "07069790950",
      comment:
        "Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion Enter your suggestion",
    },
    {
      id: 2,
      name: "Martins Ologbowu",
      email: "tuche@gmail.com",
      phone: "07069790950",
      comment: "This is a comment from Martins Ologbowu about the donation.",
    },
    {
      id: 3,
      name: "Ekene Ezeasor",
      email: "tuche@gmail.com",
      phone: "07069790950",
      comment: "Ekene's comment about the donation project and its implementation.",
    },
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const openCommentModal = (donor) => {
    setCurrentDonor(donor)
    setShowCommentModal(true)
  }

  const closeCommentModal = () => {
    setShowCommentModal(false)
  }

  // Handle click outside modal to close it
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
          <button className="flex shadow p-1 rounded items-center text-gray-600">
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
        <hr className="mb-4"/>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium">DONATORS</th>
                <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
                <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
                <th className="text-right py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {donor.name.charAt(0)}
                      </div>
                      {donor.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">{donor.email}</td>
                  <td className="py-3 px-4">{donor.phone}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="text-gray-600 flex items-center gap-1 ml-auto"
                      onClick={() => openCommentModal(donor)}
                    >
                      View Comment
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

        {/* Comment Modal */}
        {showCommentModal && currentDonor && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleModalBackdropClick}
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">'{currentDonor.name.split(" ")[0]}' Comment</h2>
                <div className="bg-gray-50 rounded p-4 mb-4 max-h-60 overflow-y-auto">
                  <p className="text-gray-700">{currentDonor.comment}</p>
                </div>
                <div className="flex justify-center">
                  <button className="px-6 py-2 bg-gray-200 rounded-md text-gray-800" onClick={closeCommentModal}>
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
