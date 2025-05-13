import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

const NewEventPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: "Event",
    title: "",
    about: "",
    chapter: "",
    startDate: "",
    endDate: "",
    venue: "",
    mapUrl: "",
    additionalComment: "",
    requiresRegistration: "No",
    registrationUrl: "",
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

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Navigate back to events list
    navigate("/events-news")
  }

  const handleSaveAsDraft = () => {
    console.log("Saved as draft:", formData)
    navigate("/events-news")
  }

  return (
  <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 py-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
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
          <h1 className="text-2xl font-bold mb-6">New Event</h1>

          <div className="grid p-4 border grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="relative">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                  >
                    <option value="Event">Event</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title of the Event</label>
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
                <label className="block text-sm font-medium mb-1">About the Event</label>
                <textarea
                  name="about"
                  placeholder="Enter"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chapter</label>
                <div className="relative">
                  <select
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="All">All</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Enugu">Enugu</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
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
                <label className="block text-sm font-medium mb-1">Venue</label>
                <input
                  type="text"
                  name="venue"
                  placeholder="Enter"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Map URL</label>
                <input
                  type="text"
                  name="mapUrl"
                  placeholder="Enter"
                  value={formData.mapUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
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

              <div>
                <label className="block text-sm font-medium mb-1">Does it require Registration?</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="requiresRegistration"
                      value="Yes"
                      checked={formData.requiresRegistration === "Yes"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="requiresRegistration"
                      value="No"
                      checked={formData.requiresRegistration === "No"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.requiresRegistration === "Yes" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Enter Registration URL</label>
                  <input
                    type="text"
                    name="registrationUrl"
                    placeholder="Enter"
                    value={formData.registrationUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              )}
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

export default NewEventPage
