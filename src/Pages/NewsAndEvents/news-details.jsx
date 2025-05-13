import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { ArrowLeft, Edit, Link2, Eye } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const NewsDetailsPage = () => {
  const { newsId } = useParams()
  const navigate = useNavigate()

  // Sample news data - in a real app, you would fetch this based on newsId
  const newsData = {
    title: "Alumni get together",
    type: "Event, Announcement",
    description:
      "Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind",
    additionalDescription:
      "The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mind",
    bannerImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19.jpg-GdBQXbDHs09WvOALWvb7HQRyv1bCzN.jpeg",
    displayAsStories: true,
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/edit-news/${newsId}`)
  }

  const handleCopyLink = () => {
    // Copy news link to clipboard
    navigator.clipboard.writeText(`https://yourdomain.com/news/${newsId}`)
    alert("Link copied to clipboard!")
  }

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/news-preview/${newsId}`, "_blank")
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

        {/* News Details */}
        <div className="p-4 border rounded">
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
              src={newsData.bannerImage || "/placeholder.svg"}
              alt={newsData.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Title of Event</label>
              <p className="font-medium">{newsData.title}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Type</label>
              <p>{newsData.type}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">About the Event</label>
              <p>{newsData.description}</p>
            </div>

            <div>
              <p>{newsData.additionalDescription}</p>
            </div>

            {newsData.displayAsStories && (
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

export default NewsDetailsPage
