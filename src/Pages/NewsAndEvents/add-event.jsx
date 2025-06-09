"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Plus, ChevronDown, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const NewEventPage = () => {
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [chapters, setChapters] = useState([]) // State for chapters, initialized as an empty array

  const [formData, setFormData] = useState({
    type: "Event",
    title: "",
    about: "",
    chapter: "",
    startDate: "",
    endDate: "",
    venue: "",
    mapUrl: "",
    additionalComment: "",
    requiresRegistration: "No",
    registrationUrl: "",
    bannerImage: null,
  })

  // Fetch chapters on component mount
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: 'https://unizikalumni-api.tfnsolutions.us/api/chapters',
          headers: {
            'Accept': 'application/json'
          }
        };
        const response = await axios.request(config);

        // Debugging logs (keep these to verify API response structure)
        console.log("API response for chapters:", response.data);
        console.log("Extracted chapters data:", response.data.chapters?.data); // Updated path

        // Ensure response.data.chapters.data is an array before setting state
        if (response.data.chapters && Array.isArray(response.data.chapters.data)) {
          setChapters(response.data.chapters.data); // Updated path
        } else {
          console.error("API response for chapters data is not an array or missing:", response.data.chapters?.data); // Updated path
          setChapters([]); // Explicitly ensure chapters is an empty array if data format is invalid
        }
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setError("Failed to load chapters. Please try again.");
        setChapters([]); // Explicitly ensure chapters is an empty array on fetch error
      }
    };

    fetchChapters();
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must not exceed 10MB")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      setFormData((prev) => ({ ...prev, bannerImage: file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, bannerImage: null }))
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById("banner-upload")
    if (fileInput) fileInput.value = ""
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required")
      return false
    }
    if (!formData.about.trim()) {
      setError("Event description is required")
      return false
    }
    if (!formData.chapter) {
      setError("Chapter is required")
      return false
    }
    if (!formData.startDate) {
      setError("Start date is required")
      return false
    }
    if (!formData.endDate) {
      setError("End date is required")
      return false
    }
    if (!formData.venue.trim()) {
      setError("Venue is required")
      return false
    }
    if (formData.requiresRegistration === "Yes" && !formData.registrationUrl.trim()) {
      setError("Registration URL is required when registration is enabled")
      return false
    }
    return true
  }

  const formatDateForAPI = (dateString) => {
    // Convert DD/MM/YYYY to YYYY-MM-DD format
    if (!dateString) return ""

    // If already in YYYY-MM-DD format, return as is
    if (dateString.includes("-") && dateString.length === 10) {
      return dateString
    }

    // Handle DD/MM/YYYY format
    const parts = dateString.split("/")
    if (parts.length === 3) {
      const [day, month, year] = parts
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    }

    return dateString
  }

  const submitEvent = async (isDraft = false) => {
    if (!isAuthenticated || !token) {
      setError("Please log in to create an event")
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const data = new FormData()

      // Map form fields to API fields
      data.append("type", formData.type)
      data.append("title", formData.title)
      data.append("description", formData.about)
      data.append("chapter", formData.chapter)
      data.append("start_date", formatDateForAPI(formData.startDate))
      data.append("end_date", formatDateForAPI(formData.endDate))
      data.append("venue", formData.venue)
      data.append("map_url", formData.mapUrl)
      data.append("additional_comment", formData.additionalComment)
      data.append("requires_registration", formData.requiresRegistration === "Yes" ? "1" : "0")
      data.append("registration_url", formData.registrationUrl)

      if (formData.bannerImage) {
        data.append("banner_image", formData.bannerImage)
      }

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/event/create",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)

      setSuccess(true)
      console.log("Event created successfully:", response.data)

      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/events-news")
      }, 2000)
    } catch (err) {
      console.error("Error creating event:", err)

      if (err.response?.data) {
        if (err.response.data.errors) {
          // Handle validation errors
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Failed to create event")
        }
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to connect to the server. Please check your network.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitEvent(false)
  }

  const handleSaveAsDraft = () => {
    submitEvent(true)
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto px-6 py-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <div className="flex gap-2">
              <button
                className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSaveAsDraft}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save as Draft"}
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">New Event</h1>

            {/* Success Message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Event created successfully! Redirecting...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid p-4 border grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Form Fields */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                        required
                      >
                        <option value="Event">Event</option>
                        <option value="Announcement">Announcement</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Title of the Event *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">About the Event *</label>
                    <textarea
                      name="about"
                      placeholder="Enter event description"
                      value={formData.about}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Chapter *</label>
                    <div className="relative">
                      <select
                        name="chapter"
                        value={formData.chapter}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                        required
                      >
                        <option value="">Select Chapter</option>
                        {Array.isArray(chapters) && chapters.map((chapter) => (
                          <option key={chapter.id} value={chapter.name}>
                            {chapter.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Venue *</label>
                    <input
                      type="text"
                      name="venue"
                      placeholder="Enter venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Map URL</label>
                    <input
                      type="url"
                      name="mapUrl"
                      placeholder="Enter Google Maps URL"
                      value={formData.mapUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Additional Comment</label>
                    <textarea
                      name="additionalComment"
                      placeholder="Enter additional comments"
                      value={formData.additionalComment}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Does it require Registration?</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="requiresRegistration"
                          value="Yes"
                          checked={formData.requiresRegistration === "Yes"}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="requiresRegistration"
                          value="No"
                          checked={formData.requiresRegistration === "No"}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {formData.requiresRegistration === "Yes" && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Enter Registration URL *</label>
                      <input
                        type="url"
                        name="registrationUrl"
                        placeholder="Enter registration URL"
                        value={formData.registrationUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required={formData.requiresRegistration === "Yes"}
                      />
                    </div>
                  )}
                </div>

                {/* Right Column - Image Upload */}
                <div>
                  <p className="font-medium mb-2">Place Banner Image Here</p>

                  {/* Image Preview */}
                  {imagePreview ? (
                    <div className="relative border-2 border-gray-300 rounded-md overflow-hidden">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Banner preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs">
                        {formData.bannerImage?.name}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="border-2 bg-gray-50 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer hover:border-orange-500 transition-colors"
                      onClick={() => document.getElementById("banner-upload").click()}
                    >
                      <Plus className="w-6 h-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">
                        Drag image here
                        <br />
                        or click to upload
                      </p>
                    </div>
                  )}

                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div className="mt-2 text-sm">
                    <p>Recommended: 1200px x 600px</p>
                    <p className="text-gray-500">File size (Not more than 10MB)</p>
                    <p className="text-gray-500">Formats: JPG, PNG, GIF</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NewEventPage