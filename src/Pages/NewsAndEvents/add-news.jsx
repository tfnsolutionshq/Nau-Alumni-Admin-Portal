"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const NewNewsPage = () => {
  const navigate = useNavigate()
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    type: "News",
    title: "",
    description: "",
    bannerImage: null,
  })

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
    if (!formData.description.trim()) {
      setError("Description is required")
      return false
    }
    return true
  }

  const submitNews = async (isDraft = false) => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to create news")
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
      data.append("description", formData.description)

      if (formData.bannerImage) {
        data.append("banner_image", formData.bannerImage)
      }

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/news/create",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)

      setSuccess(true)
      console.log("News created successfully:", response.data)

      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/events-news")
      }, 2000)
    } catch (err) {
      console.error("Error creating news:", err)

      if (err.response?.data) {
        if (err.response.data.errors) {
          // Handle validation errors
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Failed to create news")
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
    submitNews(false)
  }

  const handleSaveAsDraft = () => {
    submitNews(true)
  }

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-red-500">Please log in to access this page.</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full px-6 py-4 mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <button className="flex p-1 shadow rounded items-center text-gray-600" onClick={handleGoBack}>
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
            <h1 className="text-2xl font-bold mb-6">New News</h1>

            {/* Success Message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> News created successfully! Redirecting...</span>
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
              <div className="grid border p-4 rounded grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Form Fields */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      >
                        <option value="News">News</option>
                        <option value="Announcement">Announcement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Title of the News *</label>
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
                    <label className="block text-sm font-medium mb-1">Description *</label>
                    <textarea
                      name="description"
                      placeholder="Enter news description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>
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

export default NewNewsPage
