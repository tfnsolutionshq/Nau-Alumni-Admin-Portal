"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Edit, Link2, Eye, Check } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import EditEventModal from "../../Components/EventsAndNews/Edit-Events"
import EventPreviewModal from "../../Components/EventsAndNews/Preview-Events"

const EventDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Fetch event details when component mounts
  useEffect(() => {
    fetchEventDetails()
  }, [id, token, isAuthenticated, authLoading])

  const fetchEventDetails = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view event details.")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/event?event_id=${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      setEventData(response.data)
    } catch (err) {
      console.error("Error fetching event details:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else if (err.response?.status === 404) {
        setError("Event not found.")
      } else {
        setError("Failed to load event details. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEventUpdated = (updatedEvent) => {
    // Refresh event data after successful update
    fetchEventDetails()
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

  const formatDateTime = (startDate, endDate) => {
    if (!startDate || !endDate) return ""
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleCopyLink = async () => {
    try {
      const eventUrl = `${window.location.origin}/event/${id}`
      await navigator.clipboard.writeText(eventUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = `${window.location.origin}/event/${id}`
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
    setIsPreviewModalOpen(true)
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
          <div className="text-gray-500">Loading event details...</div>
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

  if (!eventData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-red-500">Event not found</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full px-6 py-4 mx-auto">
          {/* Header */}
          <div className="pb-4 border-b">
            <button className="flex items-center p-1 shadow rounded text-gray-600" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Copy Success Message */}
          {copySuccess && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>Event link copied to clipboard!</span>
              </div>
            </div>
          )}

          {/* Event Details */}
          <div className="p-4 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Event Details</h2>
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
                src={eventData.banner_image_url || "/placeholder.svg"}
                alt={eventData.title}
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://via.placeholder.com/800x300"
                }}
              />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm text-gray-500 mb-1">Title of Event</label>
                <p className="font-medium">{eventData.title}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Type</label>
                <p>{eventData.type}</p>
              </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">About the Event</label>
                <p>{eventData.description}</p>
              </div>

              {eventData.additional_comment && (
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Additional Comment</label>
                  <p>{eventData.additional_comment}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Chapter</label>
                  <p>{eventData.chapter}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Date/Time</label>
                  <p>{formatDateTime(eventData.start_date, eventData.end_date)}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Venue</label>
                  <p>{eventData.venue}</p>
                </div>

                {eventData.map_url && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Map URL</label>
                    <a
                      href={eventData.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {eventData.map_url}
                    </a>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Does it require Registration?</label>
                  <p>{eventData.requires_registration ? "Yes" : "No"}</p>
                </div>

                {eventData.requires_registration && eventData.registration_url && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Registration URL</label>
                    <a
                      href={eventData.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {eventData.registration_url}
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Created At</label>
                  <p>{formatDate(eventData.created_at)}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Last Updated</label>
                  <p>{formatDate(eventData.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Event Modal */}
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          eventData={eventData}
          onEventUpdated={handleEventUpdated}
        />

        {/* Event Preview Modal */}
        <EventPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          eventData={eventData}
        />
      </div>
    </DashboardLayout>
  )
}

export default EventDetailsPage
