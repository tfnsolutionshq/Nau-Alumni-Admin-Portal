import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { Search, ChevronDown, ChevronRight, ChevronLeft, X } from "lucide-react"

const MembersPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)

  // Sample data
  const members = [
    {
      id: 1,
      name: "Uche ThankGod Chukwuebuka",
      chapter: "LAGOS",
      email: "tuche@gmail.com",
      phone: "07069790950",
      profileDetails: {
        joinDate: "January 15, 2022",
        membershipType: "Full Member",
        occupation: "Software Engineer",
        address: "123 Main Street, Lagos",
        bio: "Passionate about technology and community development.",
      },
    },
    {
      id: 2,
      name: "Martins Ologbowu",
      chapter: "ENUGU",
      email: "tuche@gmail.com",
      phone: "07069790950",
      profileDetails: {
        joinDate: "March 22, 2022",
        membershipType: "Associate Member",
        occupation: "Marketing Executive",
        address: "456 Park Avenue, Enugu",
        bio: "Marketing professional with 10+ years of experience.",
      },
    },
    {
      id: 3,
      name: "Ekene Ezeasor",
      chapter: "LAGOS",
      email: "tuche@gmail.com",
      phone: "07069790950",
      profileDetails: {
        joinDate: "November 5, 2021",
        membershipType: "Full Member",
        occupation: "Doctor",
        address: "789 Hospital Road, Lagos",
        bio: "Medical professional committed to healthcare improvement.",
      },
    },
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const openProfileModal = (member) => {
    setCurrentMember(member)
    setShowProfileModal(true)
  }

  const closeProfileModal = () => {
    setShowProfileModal(false)
  }

  // Handle click outside modal to close it
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeProfileModal()
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
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
              Export
            </button>
            <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
              Create New Member
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <hr className="mb-4"/>
        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">MEMBER NAME</th>
                  <th className="text-left py-3 px-4 font-medium">CHAPTER</th>
                  <th className="text-left py-3 px-4 font-medium">EMAIL ADDRESS</th>
                  <th className="text-left py-3 px-4 font-medium">CONTACT NUMBER</th>
                  <th className="text-right py-3 px-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          {member.name.charAt(0)}
                        </div>
                        {member.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">{member.chapter}</td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">{member.phone}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="text-gray-600 flex items-center gap-1 ml-auto"
                        onClick={() => openProfileModal(member)}
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

        {/* Profile Modal */}
        {showProfileModal && currentMember && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleModalBackdropClick}
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-bold">Member Profile</h2>
                <button onClick={closeProfileModal} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
                    {currentMember.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{currentMember.name}</h3>
                    <p className="text-gray-600">{currentMember.chapter} Chapter</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{currentMember.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{currentMember.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Join Date:</span>
                    <span className="font-medium">{currentMember.profileDetails.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membership Type:</span>
                    <span className="font-medium">{currentMember.profileDetails.membershipType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupation:</span>
                    <span className="font-medium">{currentMember.profileDetails.occupation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{currentMember.profileDetails.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block mb-1">Bio:</span>
                    <p className="text-sm">{currentMember.profileDetails.bio}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={closeProfileModal}
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

export default MembersPage
