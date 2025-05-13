import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AddNewGalleriaPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    dateOfEvent: "",
    chapter: "",
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle file upload logic here
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Navigate back to gallery list
    navigate("/gallery")
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 pb-4">
        {/* Header */}
        <div className="flex justify-between items-center py-4 border-b">
          <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
            Save and Publish
          </button>
        </div>

        {/* Form Content */}
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-6">Add New Galleria</h1>

          <div className="grid border p-4 grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="TFN Solutions"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Event</label>
                <div className="relative">
                  <input
                    type="text"
                    name="dateOfEvent"
                    placeholder="10/09/2024"
                    value={formData.dateOfEvent}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 pr-8"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chapter</label>
                <div className="relative">
                  <input
                    type="text"
                    name="chapter"
                    placeholder="Lagos Chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 pr-8"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <p className="font-medium mb-2">Place Image Here</p>
              <div
                className="border-2 bg-gray-50 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
                onClick={() => document.getElementById("gallery-upload").click()}
              >
                <Plus className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Drag image here
                  <br />
                  or click to upload
                </p>
                <input
                  id="gallery-upload"
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

export default AddNewGalleriaPage
