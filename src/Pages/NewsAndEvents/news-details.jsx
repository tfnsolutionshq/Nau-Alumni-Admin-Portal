"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Edit, Link2, Eye, Check } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import EditNewsModal from "../../Components/EventsAndNews/EditNews"

const NewsDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Fetch news details when component mounts
  useEffect(() => {
    fetchNewsDetails()
  }, [id, token, isAuthenticated, authLoading])

  const fetchNewsDetails = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view news details.")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/news/article?news_id=${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      setNewsData(response.data)
    } catch (err) {
      console.error("Error fetching news details:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else if (err.response?.status === 404) {
        setError("News article not found.")
      } else {
        setError("Failed to load news details. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleNewsUpdated = (updatedNews) => {
    // Refresh news data after successful update
    fetchNewsDetails()
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleCopyLink = async () => {
    try {
      const newsUrl = `${window.location.origin}/news/${id}`
      await navigator.clipboard.writeText(newsUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = `${window.location.origin}/news/${id}`
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/news-preview/${id}`, "_blank")
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-gray-500">Loading news details...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-red-500">{error}</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!newsData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-red-500">News article not found</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto px-6 py-4">
          {/* Header */}
          <div className="pb-4 border-b">
            <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Copy Success Message */}
          {copySuccess && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>News link copied to clipboard!</span>
              </div>
            </div>
          )}

          {/* News Details */}
          <div className="p-4 border rounded">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">News Details</h2>
              <div className="flex gap-2">
                <button
                  className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={handleEdit}
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
                <button
                  className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={handleCopyLink}
                >
                  <Link2 className="w-4 h-4 inline mr-1" />
                  Copy Link
                </button>
                <button
                  className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={handlePreview}
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  Preview
                </button>
              </div>
            </div>

            {/* Banner Image */}
            <div className="mb-6">
              <img
                src={newsData.banner_image_url || "/placeholder.svg"}
                alt={newsData.title}
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://via.placeholder.com/800x300"
                }}
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Title</label>
                <p className="font-medium">{newsData.title}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Type</label>
                <p>{newsData.type}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Description</label>
                <p className="whitespace-pre-wrap">{newsData.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Status</label>
                  <p className="capitalize">{newsData.status}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Created At</label>
                  <p>{formatDate(newsData.created_at)}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Last Updated</label>
                  <p>{formatDate(newsData.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit News Modal */}
        <EditNewsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          newsData={newsData}
          onNewsUpdated={handleNewsUpdated}
        />
      </div>
    </DashboardLayout>
  )
}

export default NewsDetailsPage
