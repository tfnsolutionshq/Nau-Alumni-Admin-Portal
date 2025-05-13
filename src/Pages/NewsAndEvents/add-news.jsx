import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const NewNewsPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: "News",
    title: "",
    description: "",
    displayAsStories: false,
    bannerImage: null,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle file upload logic here
      setFormData((prev) => ({ ...prev, bannerImage: file }))
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Navigate back to news list
    navigate("/events-news")
  }

  const handleSaveAsDraft = () => {
    console.log("Saved as draft:", formData)
    navigate("/events-news")
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
            <button className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md" onClick={handleSaveAsDraft}>
              Save as Draft
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">New News</h1>

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
                  >
                    <option value="News">News</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title of the News</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="displayAsStories"
                  name="displayAsStories"
                  checked={formData.displayAsStories}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="displayAsStories" className="ml-2 text-sm font-medium">
                  Display as Stories that Inspire
                </label>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <p className="font-medium mb-2">Place Banner Image Here</p>
              <div
                className="border-2 bg-gray-50 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
                onClick={() => document.getElementById("banner-upload").click()}
              >
                <Plus className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Drag image here
                  <br />
                  or click to upload
                </p>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="mt-2 text-sm">
                <p>Image frame size: 8000px x 1320px</p>
                <p className="text-gray-500">File size (Not more than 10mb)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default NewNewsPage
