import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"

const NewDonation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description1: "",
    description2: "",
    startDate: "",
    endDate: "",
    additionalComment: "",
    bannerImage: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle file upload logic here
      setFormData((prev) => ({ ...prev, bannerImage: file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center py-4 border-b">
          <button className="flex items-center shadow p-1 text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button className="bg-[#D15300] text-white px-5 py-2 rounded-md" onClick={handleSubmit}>
            Publish
          </button>
        </div>

        {/* Form Content */}
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-6">New Donation</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border rounded p-4">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title of the Donation</label>
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
                  name="description1"
                  placeholder="Enter"
                  value={formData.description1}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  name="description2"
                  placeholder="Enter"
                  value={formData.description2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    placeholder="DD / MM / YYYY"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    placeholder="DD / MM / YYYY"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Additional Comment</label>
                <textarea
                  name="additionalComment"
                  placeholder="Enter"
                  value={formData.additionalComment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <p className="font-medium mb-2">Place Banner Image Here</p>
              <div
                className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-md p-6 flex flex-col items-center justify-center h-56 cursor-pointer"
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

export default NewDonation
