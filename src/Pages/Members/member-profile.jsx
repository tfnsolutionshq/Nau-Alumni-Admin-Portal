import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Download, Plus, ChevronDown } from "lucide-react"

const MemberProfile = () => {
  const [activeTab, setActiveTab] = useState("basicInfo")

  const [formData, setFormData] = useState({
    firstName: "ThankGod",
    lastName: "Uche",
    yearOfGraduation: "2019",
    courseOfStudy: "Electronics and Computer Engineering",
    programme: "MSC",
    career: "Senior Product Engineer",
    chapter: "Lagos",
    positionHeld: "IT Support",
    bio: "",
    socials: [
      {
        platform: "LinkedIn",
        url: "Linkedin.com/tuche",
      },
    ],
  })

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

  // Sample user data
  const userData = {
    firstName: "Uche",
    lastName: "ThankGod",
    fullName: "Uche ThankGod Chukwuebuka",
    email: "tuche@gmail.com",
    phone: "07069790950",
    birthMonth: "10/09/2024",
    maritalStatus: "Single",
    courseOfStudy: "Electronics and Computer Engineering",
    programme: "Bachelor",
    graduationYear: "Electronics and Computer Engineering",
    location: "Bachelor",
    chapterOfInterest: "Electronics and Computer Engineering",
    employmentStatus: "Employed",
    placeOfWork: "TFN Solutions",
    profileImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12.jpg-18Wj8sqqyq0NwXT3zQGsuBEGIEDy82.jpeg",
    surveyResponses: [
      {
        question: "Who was your favorite lecturer back in school, and why?",
        answer: "Ekene Ezeasor",
      },
      {
        question: "What course or subject did you enjoy the most – and what made it special for you?",
        answer: "Ekene Ezeasor",
      },
      {
        question: "Describe your most memorable school experience in one sentence.",
        answer: "Ekene Ezeasor",
      },
      {
        question: "If you could go back and change one thing about your time in school, what would it be?",
        answer: "Ekene Ezeasor",
      },
      {
        question: "What skill or lesson from school has helped you the most in your current journey?",
        answer: "Ekene Ezeasor",
      },
    ],
  }

  // Function to render the Basic Information tab content
  const renderBasicInfo = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Basic Information</h2>
        <button className="text-gray-600 text-sm px-4 py-1 border border-gray-300 rounded-md">Edit</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">First Name</label>
          <p>{userData.firstName}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Name</label>
          <p>{userData.lastName}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email Address</label>
          <p>{userData.email}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Phone</label>
          <p>{userData.phone}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Birth Month</label>
          <p>{userData.birthMonth}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Marital Status</label>
          <p>{userData.maritalStatus}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Course of Study</label>
          <p>{userData.courseOfStudy}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Programme</label>
          <p>{userData.programme}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Graduation year</label>
          <p>{userData.graduationYear}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Location</label>
          <p>{userData.location}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Chapter of Interest</label>
          <p>{userData.chapterOfInterest}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Employment Status</label>
          <p>{userData.employmentStatus}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Place of Work</label>
          <p>{userData.placeOfWork}</p>
        </div>
      </div>
    </div>
  )

  // Function to render the Profile View tab content
  const renderProfileView = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
          {/* Profile Photo */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
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
        <hr className="mb-6"/>
      <div className="space-y-6">
        {userData.surveyResponses.map((item, index) => (
          <div key={index}>
            <p className="text-gray-500 mb-1">{item.question}</p>
            <p className="font-medium">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 py-4">
        {/* Header */}
        <div className="pb-4 border-b">
          <button className="flex p-1 rounded shadow items-center text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* User Profile Header */}
        <div className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={userData.profileImage || "/placeholder.svg"}
              alt={userData.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/150"
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-center sm:text-left">{userData.fullName}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-600 text-sm text-center sm:text-left">
              <span>{userData.email}</span>
              <span className="hidden sm:inline">|</span>
              <span>{userData.phone}</span>
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
                activeTab === "surveyResponses" ? "border-b-2 border-orange-500 text-base font-semibold" : "text-gray-700"
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
    </div>
  </DashboardLayout>
  )
}

export default MemberProfile
