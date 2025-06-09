"use client"

import { useState, useEffect } from "react"
import { X, Upload, ChevronDown } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const EditEventModal = ({ isOpen, onClose, eventData, onEventUpdated }) => {
  const [formData, setFormData] = useState({
    event_id: "",
    type: "Event",
    title: "",
    description: "",
    chapter: "",
    start_date: "",
    end_date: "",
    venue: "",
    map_url: "",
    additional_comment: "",
    requires_registration: "0",
    registration_url: "",
    banner_image: null,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [chapters, setChapters] = useState([]) // State for chapters, initialized as an empty array
  const { token } = useAuth()

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

  // Populate form data when eventData changes
  useEffect(() => {
    if (eventData && isOpen) {
      setFormData({
        event_id: eventData.id,
        type: eventData.type || "Event",
        title: eventData.title || "",
        description: eventData.description || "",
        chapter: eventData.chapter || "",
        start_date: eventData.start_date || "",
        end_date: eventData.end_date || "",
        venue: eventData.venue || "",
        map_url: eventData.map_url || "",
        additional_comment: eventData.additional_comment || "",
        requires_registration: eventData.requires_registration ? "1" : "0",
        registration_url: eventData.registration_url || "",
        banner_image: null,
      })
      setImagePreview(eventData.banner_image_url)
      setError(null)
      setSuccess(false)
    }
  }, [eventData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

      setFormData((prev) => ({ ...prev, banner_image: file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, banner_image: null }))
    setImagePreview(eventData?.banner_image_url || null)
    // Reset file input
    const fileInput = document.getElementById("edit-banner-upload")
    if (fileInput) fileInput.value = ""
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required")
      return false
    }
    if (!formData.description.trim()) {
      setError("Description is required")
      return false
    }
    if (!formData.chapter) {
      setError("Chapter is required")
      return false
    }
    if (!formData.start_date) {
      setError("Start date is required")
      return false
    }
    if (!formData.end_date) {
      setError("End date is required")
      return false
    }
    if (!formData.venue.trim()) {
      setError("Venue is required")
      return false
    }
    if (formData.requires_registration === "1" && !formData.registration_url.trim()) {
      setError("Registration URL is required when registration is enabled")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const data = new FormData()

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "banner_image" && formData[key]) {
          data.append(key, formData[key])
        } else if (key !== "banner_image" && formData[key] !== null) {
          data.append(key, formData[key])
        }
      })

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/event",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      setSuccess(true)

      // Call the callback to refresh event data
      if (onEventUpdated) {
        onEventUpdated(response.data)
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      console.error("Error updating event:", err)

      if (err.response?.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Failed to update event")
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
          <h2 className="text-xl font-semibold">Edit Event</h2>
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
              <span className="block sm:inline"> Event updated successfully!</span>
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
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">About the Event *</label>
                <textarea
                  name="description"
                  value={formData.description}
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
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date *</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
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
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Enter venue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Map URL</label>
                <input
                  type="url"
                  name="map_url"
                  value={formData.map_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Enter Google Maps URL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Additional Comment</label>
                <textarea
                  name="additional_comment"
                  value={formData.additional_comment}
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
                      name="requires_registration"
                      value="1"
                      checked={formData.requires_registration === "1"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="requires_registration"
                      value="0"
                      checked={formData.requires_registration === "0"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.requires_registration === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Enter Registration URL *</label>
                  <input
                    type="url"
                    name="registration_url"
                    value={formData.registration_url}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required={formData.requires_registration === "1"}
                  />
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image</label>
              <div className="space-y-4">
                {/* Current/Preview Image */}
                {imagePreview && (
                  <div className="relative border-2 border-gray-300 rounded-md overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Banner preview"
                      className="w-full h-48 object-cover"
                    />
                    {formData.banner_image && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Upload New Image */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  onClick={() => document.getElementById("edit-banner-upload").click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {formData.banner_image ? formData.banner_image.name : "Click to upload new image"}
                  </p>
                  <input
                    id="edit-banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <p>Recommended: 1200px x 600px</p>
                <p className="text-gray-500">File size (Not more than 10MB)</p>
                <p className="text-gray-500">Formats: JPG, PNG, GIF</p>
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
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEventModal