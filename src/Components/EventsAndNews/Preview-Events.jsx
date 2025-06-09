"use client"

import { X, Calendar, MapPin, Users, ExternalLink } from "lucide-react"

const EventPreviewModal = ({ isOpen, onClose, eventData }) => {
  if (!isOpen || !eventData) return null

  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return ""
    if (startDate === endDate) {
      return formatDate(startDate)
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Event Preview</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-0">
          {/* Banner Image */}
          <div className="w-full h-64 bg-gray-200 overflow-hidden">
            <img
              src={eventData.banner_image_url || "/placeholder.svg"}
              alt={eventData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/800x300"
              }}
            />
          </div>

          {/* Event Content */}
          <div className="p-6">
            {/* Event Type Badge */}
            <div className="mb-4">
              <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {eventData.type}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{eventData.title}</h1>

            {/* Event Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDateRange(eventData.start_date, eventData.end_date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-medium">{eventData.venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Chapter</p>
                  <p className="font-medium">{eventData.chapter}</p>
                </div>
              </div>

              {eventData.map_url && (
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <a
                      href={eventData.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About This Event</h2>
              <p className="text-gray-700 leading-relaxed">{eventData.description}</p>
            </div>

            {/* Additional Comment */}
            {eventData.additional_comment && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                <p className="text-gray-700">{eventData.additional_comment}</p>
              </div>
            )}

            {/* Registration Section */}
            {eventData.requires_registration && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Registration Required</h3>
                <p className="text-orange-700 mb-3">This event requires registration to attend.</p>
                {eventData.registration_url && (
                  <a
                    href={eventData.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            {/* Event Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Event Type:</span>
                  <span className="ml-2 font-medium">{eventData.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Chapter:</span>
                  <span className="ml-2 font-medium">{eventData.chapter}</span>
                </div>
                <div>
                  <span className="text-gray-500">Start Date:</span>
                  <span className="ml-2 font-medium">{formatDate(eventData.start_date)}</span>
                </div>
                <div>
                  <span className="text-gray-500">End Date:</span>
                  <span className="ml-2 font-medium">{formatDate(eventData.end_date)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Venue:</span>
                  <span className="ml-2 font-medium">{eventData.venue}</span>
                </div>
                <div>
                  <span className="text-gray-500">Registration:</span>
                  <span className="ml-2 font-medium">
                    {eventData.requires_registration ? "Required" : "Not Required"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPreviewModal
