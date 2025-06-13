// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState } from "react"
// import { ArrowLeft, Plus, ChevronDown } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// const NewUserPage = () => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     name: "",
//     chapter: "",
//     email: "",
//     phoneCountry: "+234",
//     phoneNumber: "",
//     role: "",
//     permissions: [],
//     profileImage: null,
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePermissionChange = (permission) => {
//     if (formData.permissions.includes(permission)) {
//       setFormData((prev) => ({
//         ...prev,
//         permissions: prev.permissions.filter((p) => p !== permission),
//       }))
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         permissions: [...prev.permissions, permission],
//       }))
//     }
//   }

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       // Handle file upload logic here
//       setFormData((prev) => ({ ...prev, profileImage: file }))
//     }
//   }

//   const handleGoBack = () => {
//     navigate(-1)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle form submission
//     console.log("Form submitted:", formData)
//     // Navigate back to users list
//     navigate("/")
//   }

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-white">
//       <div className="w-full px-6 py-4 mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center pb-4 border-b">
//           <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Go Back
//           </button>
//           <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
//             Save
//           </button>
//         </div>

//         {/* Form Content */}
//         <div className="py-4">
//           <h1 className="text-2xl font-bold mb-6">New User</h1>

//           <div className="grid border p-4 rounded grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Form Fields */}
//             <div className="lg:col-span-2 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter Title"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Chapter</label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="chapter"
//                     placeholder="Enter Title"
//                     value={formData.chapter}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                   />
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Phone Number</label>
//                   <div className="flex">
//                     <div className="relative">
//                       <select
//                         name="phoneCountry"
//                         value={formData.phoneCountry}
//                         onChange={handleChange}
//                         className="appearance-none w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
//                       >
//                         <option value="+234">+234</option>
//                         <option value="+1">+1</option>
//                         <option value="+44">+44</option>
//                       </select>
//                       <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                     </div>
//                     <input
//                       type="tel"
//                       name="phoneNumber"
//                       placeholder="90 0000 0000"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <div className="relative">
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                   >
//                     <option value="" disabled>
//                       Select
//                     </option>
//                     <option value="admin">Admin</option>
//                     <option value="member">Member</option>
//                     <option value="moderator">Moderator</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Select Permission</label>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {["Members", "Member Chamber", "Galleria", "Event/News", "Suggestion box"].map((permission) => (
//                     <button
//                       key={permission}
//                       type="button"
//                       className={`px-3 py-1 text-sm rounded-md ${
//                         formData.permissions.includes(permission)
//                           ? "bg-orange-500 text-white"
//                           : "border border-gray-300 text-gray-700"
//                       }`}
//                       onClick={() => handlePermissionChange(permission)}
//                     >
//                       {permission}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Image Upload */}
//             <div>
//               <p className="font-medium mb-2">Place Image Here</p>
//               <div
//                 className="border-2 border-dashed bg-gray-50 border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
//                 onClick={() => document.getElementById("profile-upload").click()}
//               >
//                 <Plus className="w-6 h-6 text-gray-400 mb-2" />
//                 <p className="text-sm text-gray-500 text-center">
//                   Drag image here
//                   <br />
//                   or click to upload
//                 </p>
//                 <input
//                   id="profile-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </div>
//               <div className="mt-2 text-sm">
//                 <p>Image frame size: 8000px x 1320px</p>
//                 <p className="text-gray-500">File size (Not more than 10mb)</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </DashboardLayout>
//   )
// }

// export default NewUserPage










"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft, Plus, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const NewUserPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneCountry: "+234",
    phoneNumber: "",
    role: "",
    profileImage: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear messages on input change
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle file upload logic here
      setFormData((prev) => ({ ...prev, profileImage: file }))
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated || !token) {
      setError("Please log in to perform this action.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phoneCountry + formData.phoneNumber,
      role: formData.role,
    }

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/admin/create",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      }

      const response = await axios.request(config)
      console.log("User created successfully:", response.data)
      setSuccess("User created successfully!")

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phoneCountry: "+234",
        phoneNumber: "",
        role: "",
        profileImage: null,
      })

      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(-1)
      }, 2000)
    } catch (error) {
      console.error("Error creating user:", error)
      if (error.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else if (error.response && error.response.data) {
        if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat().join(". ")
          setError(error.response.data.message + ": " + errorMessages)
        } else {
          setError(error.response.data.message || "Failed to create user.")
        }
      } else {
        setError("Failed to connect to the server. Please check your network.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full px-6 py-4 mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Save"}
            </button>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {success}</span>
            </div>
          )}

          {/* Form Content */}
          <div className="py-4">
            <h1 className="text-2xl font-bold mb-6">New User</h1>

            <div className="grid border p-4 rounded grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form Fields */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter first name"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter last name"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <div className="flex">
                      <div className="relative">
                        <select
                          name="phoneCountry"
                          value={formData.phoneCountry}
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
                        name="phoneNumber"
                        placeholder="90 0000 0000"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                      required
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div>
                <p className="font-medium mb-2">Place Image Here</p>
                <div
                  className="border-2 border-dashed bg-gray-50 border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
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

export default NewUserPage
