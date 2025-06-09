"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const EditNewsModal = ({ isOpen, onClose, newsData, onNewsUpdated }) => {
  const [formData, setFormData] = useState({
    news_id: "",
    type: "", // Initialize as empty string to ensure a valid type is selected or comes from newsData
    title: "",
    description: "",
    banner_image: null,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const { token } = useAuth()

  // Populate form data when newsData changes
  useEffect(() => {
    if (newsData && isOpen) {
      setFormData({
        news_id: newsData.id,
        // Use newsData.type directly to preserve original casing, provide a fallback.
        type: newsData.type || "", 
        title: newsData.title || "",
        description: newsData.description || "",
        banner_image: null,
      })
      setImagePreview(newsData.banner_image_url)
      setError(null)
      setSuccess(false)
    }
  }, [newsData, isOpen])

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
    setImagePreview(newsData?.banner_image_url || null)
    // Reset file input
    const fileInput = document.getElementById("edit-news-banner-upload")
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
    if (!formData.type) { // Ensure type is selected
      setError("Type is required");
      return false;
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
          // Append type as is, without converting case
          data.append(key, formData[key])
        }
      })

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/news/update",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      setSuccess(true)

      // Call the callback to refresh news data
      if (onNewsUpdated) {
        onNewsUpdated(response.data)
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      console.error("Error updating news:", err)

      if (err.response?.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Failed to update news")
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
          <h2 className="text-xl font-semibold">Edit News</h2>
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
              <span className="block sm:inline"> News updated successfully!</span>
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
                    <option value="">Select Type</option> {/* Added a default empty option */}
                    {/* Updated option values to match API's possible casing based on provided data */}
                    <option value="News">News</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title of the News *</label>
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
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image</label>
              <div className="space-y-4">
                {/* Current/Preview Image */}
                {imagePreview && (
                  <div className="relative border-2 border-gray-300 rounded-md overflow-hidden">
                    <img
                      src={imagePreview || "https://placehold.co/40x40/cccccc/ffffff?text=NoImg"}
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
                  onClick={() => document.getElementById("edit-news-banner-upload").click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {formData.banner_image ? formData.banner_image.name : "Click to upload new image"}
                  </p>
                  <input
                    id="edit-news-banner-upload"
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
              {loading ? "Updating..." : "Update News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditNewsModal
