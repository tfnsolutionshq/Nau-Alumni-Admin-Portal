import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { ArrowLeft, Edit, Link2, Eye } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const EventDetailsPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()

  // Sample event data - in a real app, you would fetch this based on eventId
  const eventData = {
    title: "Alumni get together",
    type: "Event, Announcement",
    description:
      "Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind",
    additionalDescription:
      "The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind",
    chapter: "All Chapters",
    dateTime: "January 2nd, 2025 - 12:00PM GMT+1",
    venue: "Oriental Hotel, VI",
    mapUrl: "map.google.com/oriental-10837",
    requiresRegistration: "Yes",
    registrationUrl: "forms.google.com/oriental-10837",
    bannerImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19.jpg-GdBQXbDHs09WvOALWvb7HQRyv1bCzN.jpeg",
    displayAsStories: true,
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/edit-event/${eventId}`)
  }

  const handleCopyLink = () => {
    // Copy event link to clipboard
    navigator.clipboard.writeText(`https://yourdomain.com/event/${eventId}`)
    alert("Link copied to clipboard!")
  }

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/event-preview/${eventId}`, "_blank")
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

        {/* Event Details */}
        <div className="p-4 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Event Details</h2>
            <div className="flex gap-2">
              <button
                className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-md"
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4 inline mr-1" />
                Edit
              </button>
              <button
                className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-md"
                onClick={handleCopyLink}
              >
                <Link2 className="w-4 h-4 inline mr-1" />
                Copy Link
              </button>
              <button
                className="text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-md"
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
              src={eventData.bannerImage || "/placeholder.svg"}
              alt={eventData.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Title of Event</label>
              <p className="font-medium">{eventData.title}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Type</label>
              <p>{eventData.type}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">About the Event</label>
              <p>{eventData.description}</p>
            </div>

            <div>
              <p>{eventData.additionalDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Chapter</label>
                <p>{eventData.chapter}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Date/Time</label>
                <p>{eventData.dateTime}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Venue</label>
                <p>{eventData.venue}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Map URL</label>
                <p>{eventData.mapUrl}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Does it require Registration?</label>
                <p>{eventData.requiresRegistration}</p>
              </div>

              {eventData.requiresRegistration === "Yes" && (
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Registration URL</label>
                  <p>{eventData.registrationUrl}</p>
                </div>
              )}
            </div>

            {eventData.displayAsStories && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm">Display as Stories that Inspire</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default EventDetailsPage
