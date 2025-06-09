"use client"

import { useState, useEffect } from "react"
import { X, Upload, ChevronDown } from "lucide-react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext"

const EditMemberModal = ({ isOpen, onClose, member, onMemberUpdated }) => {
  const [formData, setFormData] = useState({
    member_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_month: "",
    marital_status: "",
    course_id: "",
    programme_id: "",
    graduation_year: "",
    location: "",
    chapter_of_interest: "",
    employment_status: "",
    place_of_work: "",
    profile_photo: null,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [courses, setCourses] = useState([])
  const [programmes, setProgrammes] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingProgrammes, setLoadingProgrammes] = useState(true)
  const { token } = useAuth()

  const birthMonths = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]

  const maritalStatuses = ["single", "married", "divorced", "widowed"]
  const employmentStatuses = ["employed", "self-employed", "unemployed", "student", "retired"]

  // Populate form data when member prop changes
  useEffect(() => {
    if (member && isOpen) {
      setFormData({
        member_id: member.id,
        first_name: member.first_name || "",
        last_name: member.last_name || "",
        email: member.email || "",
        phone: member.phone || "",
        birth_month: member.birth_month ? formatBirthMonth(member.birth_month) : "",
        marital_status: member.marital_status || "",
        course_id: member.course_id || "",
        programme_id: member.programme_id || "",
        graduation_year: member.graduation_year?.toString() || "",
        location: member.location || "",
        chapter_of_interest: member.chapter_of_interest || "",
        employment_status: member.employment_status || "",
        place_of_work: member.place_of_work || "",
        profile_photo: null,
      })
      setError(null)
      setSuccess(false)
    }
  }, [member, isOpen])

  // Fetch courses and programmes
  useEffect(() => {
    if (isOpen) {
      fetchCourses()
      fetchProgrammes()
    }
  }, [isOpen])

  const formatBirthMonth = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      const month = date.getMonth()
      return birthMonths[month] || ""
    } catch (error) {
      return ""
    }
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
    } finally {
      setLoadingProgrammes(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profile_photo: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const data = new FormData()

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "profile_photo" && formData[key]) {
          data.append(key, formData[key])
        } else if (key !== "profile_photo" && formData[key] !== null) {
          data.append(key, formData[key])
        }
      })

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/members",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      setSuccess(true)

      // Call the callback to refresh member data
      if (onMemberUpdated) {
        onMemberUpdated(response.data.member || response.data)
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      console.error("Error updating member:", err)

      if (err.response?.data) {
        if (err.response.data.errors) {
          // Handle validation errors
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Failed to update member")
        }
      } else {
        setError("Failed to connect to the server. Please check your network.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Member updated successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Birth Month</label>
                  <div className="relative">
                    <select
                      name="birth_month"
                      value={formData.birth_month}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                    >
                      <option value="">Select Month</option>
                      {birthMonths.map((month) => (
                        <option key={month} value={month}>
                          {month.charAt(0).toUpperCase() + month.slice(1)}
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
                      name="marital_status"
                      value={formData.marital_status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                    >
                      <option value="">Select Status</option>
                      {maritalStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course of Study</label>
                  <div className="relative">
                    <select
                      name="course_id"
                      value={formData.course_id}
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
                      name="programme_id"
                      value={formData.programme_id}
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
                <label className="block text-sm font-medium mb-1">Graduation Year</label>
                <input
                  type="number"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  min="1950"
                  max="2030"
                />
              </div>

              {/* Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chapter of Interest</label>
                  <input
                    type="text"
                    name="chapter_of_interest"
                    value={formData.chapter_of_interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Employment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Employment Status</label>
                  <div className="relative">
                    <select
                      name="employment_status"
                      value={formData.employment_status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white"
                    >
                      <option value="">Select Status</option>
                      {employmentStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
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
                    name="place_of_work"
                    value={formData.place_of_work}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Profile Photo</label>
              <div className="space-y-4">
                {/* Current Photo */}
                {member?.profile_photo_url && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current Photo:</p>
                    <img
                      src={member.profile_photo_url || "/placeholder.svg"}
                      alt="Current profile"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {/* Upload New Photo */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  onClick={() => document.getElementById("profile-photo-upload").click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {formData.profile_photo ? formData.profile_photo.name : "Click to upload new photo"}
                  </p>
                  <input
                    id="profile-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMemberModal
