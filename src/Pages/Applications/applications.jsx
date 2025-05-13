import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

const ApplicantListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for applicants
  const applicants = [
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
              Export
            </button>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium">APPLICANT</th>
                <th className="text-left py-3 px-4 font-medium">CHAPTER OF INTEREST</th>
                <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
                <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
                <th className="text-right py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {applicant.name.charAt(0)}
                      </div>
                      {applicant.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">{applicant.chapter}</td>
                  <td className="py-3 px-4">{applicant.email}</td>
                  <td className="py-3 px-4">{applicant.phone}</td>
                  <Link to={`/application-details`}>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="text-gray-600 flex items-center gap-1 ml-auto"
                    >
                      View Application
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                  </Link>
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

export default ApplicantListPage
