"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Download, Plus, ChevronDown } from "lucide-react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import EditMemberModal from "../../Components/Edit-Member";

const MemberProfile = () => {
  const [activeTab, setActiveTab] = useState("basicInfo")
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    yearOfGraduation: "",
    courseOfStudy: "",
    programme: "",
    career: "Senior Product Engineer",
    chapter: "",
    positionHeld: "IT Support",
    bio: "",
    socials: [
      {
        platform: "LinkedIn",
        url: "",
      },
    ],
  })

  // Fetch member data when component mounts
  useEffect(() => {
    fetchMemberData()
  }, [id, token, isAuthenticated, authLoading])

  const fetchMemberData = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view member details.")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/member?member_id=${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      const memberData = response.data.member

      setMember(memberData)

      // Update form data with member details
      setFormData({
        firstName: memberData.first_name,
        lastName: memberData.last_name,
        yearOfGraduation: memberData.graduation_year?.toString() || "",
        courseOfStudy: "Electronics and Computer Engineering",
        programme: "MSC",
        career: "Senior Product Engineer",
        chapter: memberData.chapter_of_interest || "",
        positionHeld: "IT Support",
        bio: "",
        socials: [
          {
            platform: "LinkedIn",
            url: "",
          },
        ],
      })
    } catch (err) {
      console.error("Error fetching member data:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to load member details. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMemberUpdated = (updatedMember) => {
    // Refresh member data after successful update
    fetchMemberData()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...formData.socials]
    updatedSocials[index] = { ...updatedSocials[index], [field]: value }
    setFormData((prev) => ({ ...prev, socials: updatedSocials }))
  }

  const addNewSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }))
  }

  // Function to format date string
  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    } catch (error) {
      return dateString
    }
  }

  // Function to render the Basic Information tab content
  const renderBasicInfo = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Basic Information</h2>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-gray-600 text-sm px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Edit
        </button>
      </div>

      {member && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">First Name</label>
            <p>{member.first_name}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Last Name</label>
            <p>{member.last_name}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email Address</label>
            <p>{member.email}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Phone</label>
            <p>{member.phone}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Birth Month</label>
            <p>{formatDate(member.birth_month)}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Marital Status</label>
            <p className="capitalize">{member.marital_status}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Course of Study</label>
            <p>{member.course_name}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Programme</label>
            <p>{member.programme_name}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Graduation year</label>
            <p>{member.graduation_year}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Location</label>
            <p>{member.location}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Chapter of Interest</label>
            <p>{member.chapter_name}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Employment Status</label>
            <p className="capitalize">{member.employment_status}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Place of Work</label>
            <p>{member.place_of_work}</p>
          </div>
        </div>
      )}
    </div>
  )

  // Function to render the Profile View tab content
  const renderProfileView = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      {/* Profile Photo */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
          {member?.profile_photo_url ? (
            <img
              src={member.profile_photo_url || "/placeholder.svg"}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/150"
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
        <button className="text-blue-600 text-sm flex items-center">
          Change Photo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year of Graduation</label>
          <input
            type="text"
            name="yearOfGraduation"
            value={formData.yearOfGraduation}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course of Study</label>
          <input
            type="text"
            name="courseOfStudy"
            value={formData.courseOfStudy}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Programme</label>
          <input
            type="text"
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Career</label>
          <input
            type="text"
            name="career"
            value={formData.career}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Chapter</label>
          <input
            type="text"
            name="chapter"
            value={formData.chapter}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Position held</label>
          <input
            type="text"
            name="positionHeld"
            value={formData.positionHeld}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">BIO</label>
        <textarea
          name="bio"
          placeholder="Enter your suggestion"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
        ></textarea>
      </div>

      {/* Socials Section */}
      <div className="mt-6">
        <h3 className="font-medium mb-4">Socials</h3>

        {formData.socials.map((social, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Social</label>
              <div className="relative">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addNewSocial}
          className="flex items-center text-orange-500 font-medium text-sm mt-2"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </button>
      </div>
    </div>
  )

  // Function to render the Survey Responses tab content
  const renderSurveyResponses = () => (
    <div className="p-4">
      <div className="flex justify-between items-center pt-2 mb-6">
        <h2 className="text-lg font-medium">Survey Response</h2>
        <button className="flex items-center gap-1 text-gray-600 text-sm px-4 py-1.5 border border-gray-300 rounded-md">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
      <hr className="mb-6" />
      <div className="space-y-6">
        <div className="text-center text-gray-500 py-8">No survey responses available for this member.</div>
      </div>
    </div>
  )

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading...</div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
          Please log in to access this page.
        </div>
      </DashboardLayout>
    )
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading member details...</div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Error: {error}</div>
      </DashboardLayout>
    )
  }

  if (!member) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Member not found</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto px-6 py-4">
          {/* Header */}
          <div className="pb-4 border-b">
            <Link to="/members" className="flex p-1 rounded shadow items-center text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </div>

          {/* User Profile Header */}
          <div className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={member.profile_photo_url || "/placeholder.svg"}
                alt={`${member.first_name} ${member.last_name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://via.placeholder.com/150"
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-center sm:text-left">
                {member.first_name} {member.last_name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-600 text-sm text-center sm:text-left">
                <span>{member.email}</span>
                <span className="hidden sm:inline">|</span>
                <span>{member.phone}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex justify-center overflow-x-auto">
              <button
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === "basicInfo" ? "border-b-2 border-orange-500 text-base font-semibold" : "text-gray-700"
                }`}
                onClick={() => setActiveTab("basicInfo")}
              >
                Basic Information
              </button>
              <button
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === "profileView" ? "border-b-2 border-orange-500 text-base font-semibold" : "text-gray-700"
                }`}
                onClick={() => setActiveTab("profileView")}
              >
                Profile View
              </button>
              <button
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === "surveyResponses"
                    ? "border-b-2 border-orange-500 text-base font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("surveyResponses")}
              >
                Survey Responses
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="border rounded-md border-t-0 pb-6">
            {activeTab === "basicInfo" && renderBasicInfo()}
            {activeTab === "profileView" && renderProfileView()}
            {activeTab === "surveyResponses" && renderSurveyResponses()}
          </div>
        </div>

        {/* Edit Member Modal */}
        <EditMemberModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          member={member}
          onMemberUpdated={handleMemberUpdated}
        />
      </div>
    </DashboardLayout>
  )
}

export default MemberProfile
