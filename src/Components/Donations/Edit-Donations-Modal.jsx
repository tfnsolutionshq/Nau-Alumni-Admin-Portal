// "use client"

// import { useState, useEffect } from "react"
// import { X, Upload } from "lucide-react"
// import axios from "axios"
// import { useAuth } from "../../Context/AuthContext"

// const EditDonationModal = ({ isOpen, onClose, donationData, onDonationUpdated }) => {
//   const [formData, setFormData] = useState({
//     donation_id: "",
//     title: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     comment: "",
//     banner_image: null,
//   })

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(false)
//   const [imagePreview, setImagePreview] = useState(null)
//   const { token } = useAuth()

//   // Populate form data when donationData changes
//   useEffect(() => {
//     if (donationData && isOpen) {
//       setFormData({
//         donation_id: donationData.id,
//         title: donationData.title || "",
//         description: donationData.description || "",
//         start_date: donationData.start_date || "",
//         end_date: donationData.end_date || "",
//         comment: donationData.comment || "",
//         banner_image: null,
//       })
//       setImagePreview(donationData.banner_image_url)
//       setError(null)
//       setSuccess(false)
//     }
//   }, [donationData, isOpen])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (error) setError(null)
//   }

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       // Validate file size (10MB limit)
//       if (file.size > 10 * 1024 * 1024) {
//         setError("File size must not exceed 10MB")
//         return
//       }

//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         setError("Please select a valid image file")
//         return
//       }

//       setFormData((prev) => ({ ...prev, banner_image: file }))

//       // Create preview
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setImagePreview(e.target.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const removeImage = () => {
//     setFormData((prev) => ({ ...prev, banner_image: null }))
//     setImagePreview(donationData?.banner_image_url || null)
//     // Reset file input
//     const fileInput = document.getElementById("edit-banner-upload")
//     if (fileInput) fileInput.value = ""
//   }

//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       setError("Title is required")
//       return false
//     }
//     if (!formData.description.trim()) {
//       setError("Description is required")
//       return false
//     }
//     if (!formData.start_date) {
//       setError("Start date is required")
//       return false
//     }
//     if (!formData.end_date) {
//       setError("End date is required")
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setLoading(true)
//     setError(null)
//     setSuccess(false)

//     try {
//       const data = new FormData()

//       // Append all form fields
//       Object.keys(formData).forEach((key) => {
//         if (key === "banner_image" && formData[key]) {
//           data.append(key, formData[key])
//         } else if (key !== "banner_image" && formData[key] !== null) {
//           data.append(key, formData[key])
//         }
//       })

//       const config = {
//         method: "post",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/donations/update",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: data,
//       }

//       const response = await axios.request(config)
//       setSuccess(true)

//       // Call the callback to refresh donation data
//       if (onDonationUpdated) {
//         onDonationUpdated(response.data)
//       }

//       // Close modal after a short delay
//       setTimeout(() => {
//         onClose()
//         setSuccess(false)
//       }, 2000)
//     } catch (err) {
//       console.error("Error updating donation:", err)

//       if (err.response?.data) {
//         if (err.response.data.errors) {
//           const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
//           setError(err.response.data.message + ": " + errorMessages)
//         } else {
//           setError(err.response.data.message || "Failed to update donation")
//         }
//       } else {
//         setError("Failed to connect to the server. Please check your network.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-xl font-semibold">Edit Donation</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6">
//           {/* Success Message */}
//           {success && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
//               <strong className="font-bold">Success!</strong>
//               <span className="block sm:inline"> Donation updated successfully!</span>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//               <strong className="font-bold">Error!</strong>
//               <span className="block sm:inline"> {error}</span>
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Form Fields */}
//             <div className="lg:col-span-2 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Title of the Donation *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Start Date *</label>
//                   <input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">End Date *</label>
//                   <input
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Additional Comment</label>
//                 <textarea
//                   name="comment"
//                   value={formData.comment}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 />
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Banner Image</label>
//               <div className="space-y-4">
//                 {/* Current/Preview Image */}
//                 {imagePreview && (
//                   <div className="relative border-2 border-gray-300 rounded-md overflow-hidden">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Banner preview"
//                       className="w-full h-48 object-cover"
//                     />
//                     {formData.banner_image && (
//                       <button
//                         type="button"
//                         onClick={removeImage}
//                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 )}

//                 {/* Upload New Image */}
//                 <div
//                   className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
//                   onClick={() => document.getElementById("edit-banner-upload").click()}
//                 >
//                   <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600 text-center">
//                     {formData.banner_image ? formData.banner_image.name : "Click to upload new image"}
//                   </p>
//                   <input
//                     id="edit-banner-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </div>
//               </div>

//               <div className="mt-2 text-sm">
//                 <p>Recommended: 1200px x 600px</p>
//                 <p className="text-gray-500">File size (Not more than 10MB)</p>
//                 <p className="text-gray-500">Formats: JPG, PNG, GIF</p>
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={loading}
//             >
//               {loading ? "Updating..." : "Update Donation"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditDonationModal









"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const EditDonationModal = ({ isOpen, onClose, donationData, onDonationUpdated }) => {
  const [formData, setFormData] = useState({
    donation_id: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    comment: "",
    privacy: "", // Add privacy field
    banner_image: null,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const { token } = useAuth()

  // Populate form data when donationData changes
  useEffect(() => {
    if (donationData && isOpen) {
      setFormData({
        donation_id: donationData.id,
        title: donationData.title || "",
        description: donationData.description || "",
        start_date: donationData.start_date || "",
        end_date: donationData.end_date || "",
        comment: donationData.comment || "",
        privacy: donationData.privacy || "", // Add privacy field
        banner_image: null,
      })
      setImagePreview(donationData.banner_image_url)
      setError(null)
      setSuccess(false)
    }
  }, [donationData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must not exceed 10MB")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      setFormData((prev) => ({ ...prev, banner_image: file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, banner_image: null }))
    setImagePreview(donationData?.banner_image_url || null)
    // Reset file input
    const fileInput = document.getElementById("edit-banner-upload")
    if (fileInput) fileInput.value = ""
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required")
      return false
    }
    if (!formData.description.trim()) {
      setError("Description is required")
      return false
    }
    if (!formData.start_date) {
      setError("Start date is required")
      return false
    }
    if (!formData.end_date) {
      setError("End date is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const data = new FormData()

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "banner_image" && formData[key]) {
          data.append(key, formData[key])
        } else if (key !== "banner_image" && formData[key] !== null) {
          data.append(key, formData[key])
        }
      })

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/donations/update",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      setSuccess(true)

      // Call the callback to refresh donation data
      if (onDonationUpdated) {
        onDonationUpdated(response.data)
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      console.error("Error updating donation:", err)

      if (err.response?.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Failed to update donation")
        }
      } else {
        setError("Failed to connect to the server. Please check your network.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Donation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Donation updated successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title of the Donation *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date *</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Additional Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Privacy Setting</label>
                <select
                  name="privacy"
                  value={formData.privacy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">Select Privacy Setting (Optional)</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image</label>
              <div className="space-y-4">
                {/* Current/Preview Image */}
                {imagePreview && (
                  <div className="relative border-2 border-gray-300 rounded-md overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Banner preview"
                      className="w-full h-48 object-cover"
                    />
                    {formData.banner_image && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Upload New Image */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  onClick={() => document.getElementById("edit-banner-upload").click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {formData.banner_image ? formData.banner_image.name : "Click to upload new image"}
                  </p>
                  <input
                    id="edit-banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <p>Recommended: 1200px x 600px</p>
                <p className="text-gray-500">File size (Not more than 10MB)</p>
                <p className="text-gray-500">Formats: JPG, PNG, GIF</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditDonationModal
