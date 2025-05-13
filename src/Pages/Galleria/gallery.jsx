import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const GalleryListPage = () => {

  // Sample gallery items
  const galleryItems = [
    {
      id: 1,
      title: "Alumni Get together",
      date: "Jan 25, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23.jpg-Bdjl6VtpMpUOmogZHEaKfGbHRNVQIl.jpeg",
    },
    {
      id: 2,
      title: "Alumni Get together",
      date: "Jan 25, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23.jpg-Bdjl6VtpMpUOmogZHEaKfGbHRNVQIl.jpeg",
    },
    {
      id: 3,
      title: "Alumni Get together",
      date: "Jan 25, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23.jpg-Bdjl6VtpMpUOmogZHEaKfGbHRNVQIl.jpeg",
    },
    {
      id: 4,
      title: "Alumni Get together",
      date: "Jan 25, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23.jpg-Bdjl6VtpMpUOmogZHEaKfGbHRNVQIl.jpeg",
    },
    {
      id: 5,
      title: "Alumni Get together",
      date: "Jan 25, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23.jpg-Bdjl6VtpMpUOmogZHEaKfGbHRNVQIl.jpeg",
    },
    {
      id: 6,
      title: "Alumni Get together",
      date: "Jan 25, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23.jpg-Bdjl6VtpMpUOmogZHEaKfGbHRNVQIl.jpeg",
    },
  ]

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
            Sort By
            <ChevronDown className="w-4 h-4" />
          </button>
          <Link
            to="/add-gallery">
          <button
            className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm"
          >
            Add New Gallery
            <ChevronRight className="w-4 h-4" />
          </button>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-md overflow-hidden cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default GalleryListPage
