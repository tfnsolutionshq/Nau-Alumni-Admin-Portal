"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Plus, ChevronDown } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const AddNewMemberForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactCountry: "+234",
    contactNumber: "",
    birthMonth: "",
    maritalStatus: "",
    courseId: "",
    programmeId: "",
    // Initialize with a default or empty string
    graduationYear: "",
    location: "",
    chapterOfInterest: "", // Change to empty string for dropdown selection, will store ID
    employmentStatus: "", // Change to empty string for dropdown selection
    placeOfWork: "",
    profileImage: null,
  })

  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [courses, setCourses] = useState([])
  const [programmes, setProgrammes] = useState([])
  const [chapters, setChapters] = useState([]) // New state for chapters
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingProgrammes, setLoadingProgrammes] = useState(true)
  const [loadingChapters, setLoadingChapters] = useState(true) // New loading state for chapters
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const birthMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"]

  // New array for employment statuses
  const employmentStatuses = ["employed", "self-employed", "unemployed", "retired", "other"]

  // Generate graduation years from current year back 40 years
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 41 }, (_, i) => currentYear - i);


  useEffect(() => {
    // Authentication checks for forms that require login
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setApiError("Please log in to access this page.")
      return
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://unizikalumni-api.tfnsolutions.us/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        setCourses(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setApiError("Failed to load courses. Please try again.")
      } finally {
        setLoadingCourses(false)
      }
    }

    const fetchProgrammes = async () => {
      try {
        const response = await axios.get("https://unizikalumni-api.tfnsolutions.us/api/programmes", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        setProgrammes(response.data)
      } catch (error) {
        console.error("Error fetching programmes:", error)
        setApiError("Failed to load programmes. Please try again.")
      } finally {
        setLoadingProgrammes(false)
      }
    }

    // New fetch for chapters (no authentication needed based on user provided snippet)
    const fetchChapters = async () => {
      try {
        const response = await axios.get("https://unizikalumni-api.tfnsolutions.us/api/chapters", {
          headers: {
            Accept: "application/json",
          },
        })
        // Assuming response.data.chapters.data contains the array of chapters
        if (response.data && response.data.chapters && Array.isArray(response.data.chapters.data)) {
          setChapters(response.data.chapters.data)
        } else {
          console.error("Unexpected chapters API response format:", response.data);
          setApiError("Failed to load chapters: Invalid data format.");
        }
      } catch (error) {
        console.error("Error fetching chapters:", error)
        setApiError("Failed to load chapters. Please try again.")
      } finally {
        setLoadingChapters(false)
      }
    }

    fetchCourses()
    fetchProgrammes()
    fetchChapters() // Call the new fetch function
  }, [token, isAuthenticated, authLoading])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated || !token) {
      setApiError("Please log in to perform this action.")
      return
    }

    setApiError(null)
    setSuccessMessage(null)

    const data = new FormData()
    data.append("first_name", formData.firstName)
    data.append("last_name", formData.lastName)
    data.append("email", formData.email)
    data.append("phone", formData.contactCountry + formData.contactNumber)
    data.append("birth_month", formData.birthMonth.toLowerCase())
    data.append("marital_status", formData.maritalStatus.toLowerCase())
    data.append("course_id", formData.courseId)
    data.append("programme_id", formData.programmeId)
    data.append("graduation_year", formData.graduationYear)
    data.append("location", formData.location)
    data.append("chapter_of_interest", formData.chapterOfInterest) // This will now send the ID
    data.append("employment_status", formData.employmentStatus)
    data.append("place_of_work", formData.placeOfWork)
    if (formData.profileImage) {
      data.append("profile_photo", formData.profileImage)
    }

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/member/activate",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      console.log("Form submitted successfully:", response.data)
      setSuccessMessage("Member added successfully!")
      // Reset form fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactCountry: "+234",
        contactNumber: "",
        birthMonth: "",
        maritalStatus: "",
        courseId: "",
        programmeId: "",
        graduationYear: "",
        location: "",
        chapterOfInterest: "",
        employmentStatus: "",
        placeOfWork: "",
        profileImage: null,
      })
    } catch (error) {
      console.error("Form submission error:", error)
      if (error.response?.status === 401) {
        setApiError("Authentication failed. Please log in again.")
      } else if (error.response && error.response.data) {
        if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat().join(". ")
          setApiError(error.response.data.message + ": " + errorMessages)
        } else {
          setApiError(error.response.data.message || "An unknown error occurred.")
        }
      } else {
        setApiError("Failed to connect to the server. Please check your network.")
      }
    }
  }

  if (authLoading || loadingCourses || loadingProgrammes || loadingChapters) {
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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <button className="flex shadow p-1 rounded items-center text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
              Continue
            </button>
          </div>

          {/* Form Content */}
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold mb-6">Add New Member</h1>

            {apiError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {apiError}</span>
              </div>
            )}

            {successMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {successMessage}</span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium">Basic Information</h2>
                <div className="flex items-center">
                  <div className="w-6 h-1 bg-orange-500 rounded-full"></div>
                  <div className="w-6 h-1 bg-gray-200 rounded-full ml-1"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 border p-4 rounded lg:grid-cols-3 gap-6">
              {/* Left Column - Form Fields */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="hello@figma.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact</label>
                    <div className="flex">
                      <div className="relative">
                        <select
                          name="contactCountry"
                          value={formData.contactCountry}
                          onChange={handleChange}
                          className="appearance-none w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                        >
                          <option value="+234">+234</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        name="contactNumber"
                        placeholder="8000000000"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Birth Month</label>
                    <div className="relative">
                      <select
                        name="birthMonth"
                        value={formData.birthMonth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                      >
                        <option value="">Select Month</option>
                        {birthMonths.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Marital Status</label>
                    <div className="relative">
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                      >
                        <option value="">Select Status</option>
                        {maritalStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course of Study</label>
                    <div className="relative">
                      <select
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                        disabled={loadingCourses}
                      >
                        <option value="">{loadingCourses ? "Loading Courses..." : "Select Course"}</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Programme</label>
                    <div className="relative">
                      <select
                        name="programmeId"
                        value={formData.programmeId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                        disabled={loadingProgrammes}
                      >
                        <option value="">{loadingProgrammes ? "Loading Programmes..." : "Select Programme"}</option>
                        {programmes.map((programme) => (
                          <option key={programme.id} value={programme.id}>
                            {programme.name} ({programme.level})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Graduation year</label>
                  <div className="relative">
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                    >
                      <option value="">Select Year</option>
                      {graduationYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter your location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    {/* Removed redundant ChevronDown for a simple text input */}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Chapter of Interest</label>
                  <div className="relative">
                    <select
                      name="chapterOfInterest"
                      value={formData.chapterOfInterest}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                      disabled={loadingChapters}
                    >
                      <option value="">{loadingChapters ? "Loading Chapters..." : "Select Chapter"}</option>
                      {chapters.map((chapter) => (
                        // Set the value of the option to chapter.id
                        <option key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Employment Status</label>
                  <div className="relative">
                    <select
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                    >
                      <option value="">Select Status</option>
                      {employmentStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} {/* Capitalize first letter and replace dash */}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Place of Work</label>
                  <input
                    type="text"
                    name="placeOfWork"
                    placeholder="Enter your place of work"
                    value={formData.placeOfWork}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div>
                <p className="font-medium mb-2">Place Image Here</p>
                <div
                  className="border-2 bg-gray-50 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
                  onClick={() => document.getElementById("profile-upload").click()}
                >
                  <Plus className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    Drag image here
                    <br />
                    or click to upload
                  </p>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="mt-2 text-sm">
                  <p>Image frame size: 8000px x 1320px</p>
                  <p className="text-gray-500">File size (Not more than 10mb)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AddNewMemberForm
