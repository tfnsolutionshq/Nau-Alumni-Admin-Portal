import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus, ChevronDown } from "lucide-react"

const AddNewMemberForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactCountry: "+234",
    contactNumber: "",
    birthMonth: "",
    maritalStatus: "",
    courseOfStudy: "",
    programme: "",
    graduationYear: "",
    location: "",
    chapterOfInterest: "Lagos Chapter",
    employmentStatus: "Employed",
    placeOfWork: "TFN Solutions",
    profileImage: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle file upload logic here
      setFormData((prev) => ({ ...prev, profileImage: file }))
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
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <button className="flex shadow p-1 rounded items-center text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
            Continue
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-6">Add New Member</h1>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Basic Information</h2>
              <div className="flex items-center">
                <div className="w-6 h-1 bg-orange-500 rounded-full"></div>
                <div className="w-6 h-1 bg-gray-200 rounded-full ml-1"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 border p-4 rounded lg:grid-cols-3 gap-6">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="hello@figma.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact</label>
                  <div className="flex">
                    <div className="relative">
                      <select
                        name="contactCountry"
                        value={formData.contactCountry}
                        onChange={handleChange}
                        className="appearance-none w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                      >
                        <option value="+234">+234</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="8000000000"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Birth Month</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="birthMonth"
                      placeholder="30/09/2024"
                      value={formData.birthMonth}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Marital Status</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="maritalStatus"
                      placeholder="Single"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course of Study</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="courseOfStudy"
                      placeholder="Select"
                      value={formData.courseOfStudy}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Programme</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="programme"
                      placeholder="Select"
                      value={formData.programme}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Graduation year</label>
                <div className="relative">
                  <input
                    type="text"
                    name="graduationYear"
                    placeholder="Select"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Select"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chapter of Interest</label>
                <div className="relative">
                  <input
                    type="text"
                    name="chapterOfInterest"
                    placeholder="Lagos Chapter"
                    value={formData.chapterOfInterest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Employment Status</label>
                <div className="relative">
                  <input
                    type="text"
                    name="employmentStatus"
                    placeholder="Employed"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Place of Work</label>
                <input
                  type="text"
                  name="placeOfWork"
                  placeholder="TFN Solutions"
                  value={formData.placeOfWork}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <p className="font-medium mb-2">Place Image Here</p>
              <div
                className="border-2 bg-gray-50 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
                onClick={() => document.getElementById("profile-upload").click()}
              >
                <Plus className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Drag image here
                  <br />
                  or click to upload
                </p>
                <input
                  id="profile-upload"
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

export default AddNewMemberForm
