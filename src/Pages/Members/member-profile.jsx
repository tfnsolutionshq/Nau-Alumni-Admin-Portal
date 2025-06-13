// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { useState, useEffect } from "react"
// import { ArrowLeft, Download, ChevronDown } from "lucide-react"
// import { useParams, Link } from "react-router-dom"
// import axios from "axios"
// import { useAuth } from "../../Context/AuthContext"

// const MemberProfile = () => {
//   const [activeTab, setActiveTab] = useState("publicProfile")
//   const [member, setMember] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [updating, setUpdating] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [surveyResponses, setSurveyResponses] = useState([])
//   const { token, isAuthenticated, loading: authLoading } = useAuth()
//   const { id } = useParams()

//   // Collapsible sections state
//   const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false)
//   const [publicProfileOpen, setPublicProfileOpen] = useState(false)
//   const [imagePreview, setImagePreview] = useState(null)
//   const [existingProfilePhoto, setExistingProfilePhoto] = useState(null)

//   // Dropdown data
//   const [chapters, setChapters] = useState([])
//   const [programmes, setProgrammes] = useState([])
//   const [courses, setCourses] = useState([])

//   const [formData, setFormData] = useState({
//     member_id: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     birth_month: "",
//     marital_status: "",
//     course_id: "",
//     programme_id: "",
//     graduation_year: "",
//     location: "",
//     chapter_of_interest: "",
//     employment_status: "",
//     place_of_work: "",
//     profile_photo: null,
//     bio: "",
//     socials: [],
//   })

//   // Fetch member data when component mounts
//   useEffect(() => {
//     fetchMemberData()
//     fetchDropdownData()
//   }, [id, token, isAuthenticated, authLoading])

//   const fetchMemberData = async () => {
//     if (authLoading) return

//     if (!isAuthenticated || !token) {
//       setError("Please log in to view member details.")
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)

//       const config = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: `https://unizikalumni-api.tfnsolutions.us/api/member?member_id=${id}`,
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }

//       const response = await axios.request(config)
//       const memberData = response.data.member

//       setMember(memberData)
//       if (memberData.survey_responses) setSurveyResponses(memberData.survey_responses)

//       // Update form data with member details
//       setFormData({
//         member_id: memberData.id,
//         first_name: memberData.first_name || "",
//         last_name: memberData.last_name || "",
//         email: memberData.email || "",
//         phone: memberData.phone || "",
//         birth_month: memberData.birth_month || "",
//         marital_status: memberData.marital_status || "",
//         course_id: memberData.course_id || "",
//         programme_id: memberData.programme_id || "",
//         graduation_year: memberData.graduation_year?.toString() || "",
//         location: memberData.location || "",
//         chapter_of_interest: memberData.chapter_of_interest || "",
//         employment_status: memberData.employment_status || "",
//         place_of_work: memberData.place_of_work || "",
//         profile_photo: null,
//         bio: memberData.bio || "",
//         socials: memberData.socials || [],
//       })

//       // Set existing profile photo URL if available
//       if (memberData.profile_photo_url) {
//         setExistingProfilePhoto(memberData.profile_photo_url)
//         setImagePreview(memberData.profile_photo_url)
//       }
//     } catch (err) {
//       console.error("Error fetching member data:", err)
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please log in again.")
//       } else {
//         setError("Failed to load member details. Please try again later.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Fetch dropdown data (chapters, programmes, courses)
//   const fetchDropdownData = async () => {
//     try {
//       // Fetch Chapters
//       const chaptersConfig = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/chapters",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       }
//       const chaptersResponse = await axios.request(chaptersConfig)
//       if (chaptersResponse.data.chapters && Array.isArray(chaptersResponse.data.chapters.data)) {
//         setChapters(chaptersResponse.data.chapters.data)
//       }

//       // Fetch Programmes
//       const programmesConfig = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/programmes",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//       const programmesResponse = await axios.request(programmesConfig)
//       if (Array.isArray(programmesResponse.data)) {
//         setProgrammes(programmesResponse.data)
//       }

//       // Fetch Courses
//       const coursesConfig = {
//         method: "get",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/courses",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//       const coursesResponse = await axios.request(coursesConfig)
//       if (Array.isArray(coursesResponse.data)) {
//         setCourses(coursesResponse.data)
//       }
//     } catch (err) {
//       console.error("Error fetching dropdown data:", err)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, files } = e.target
//     if (name === "profile_photo") {
//       const file = files[0]
//       setFormData((prev) => ({ ...prev, [name]: file }))

//       // Create image preview
//       if (file) {
//         const reader = new FileReader()
//         reader.onloadend = () => {
//           setImagePreview(reader.result)
//         }
//         reader.readAsDataURL(file)
//       } else {
//         setImagePreview(existingProfilePhoto)
//       }
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }))
//     }
//     // Clear messages on input change
//     if (error) setError(null)
//     if (success) setSuccess(null)
//   }

//   const handleSocialChange = (index, field, value) => {
//     const updatedSocials = [...formData.socials]
//     updatedSocials[index] = { ...updatedSocials[index], [field]: value }
//     setFormData((prev) => ({ ...prev, socials: updatedSocials }))
//   }

//   const addNewSocial = () => {
//     setFormData((prev) => ({
//       ...prev,
//       socials: [...prev.socials, { platform: "", url: "" }],
//     }))
//   }

//   const removeSocial = (index) => {
//     const updatedSocials = formData.socials.filter((_, i) => i !== index)
//     setFormData((prev) => ({ ...prev, socials: updatedSocials }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!isAuthenticated || !token) {
//       setError("You must be logged in to update member details.")
//       return
//     }

//     setUpdating(true)
//     setError(null)
//     setSuccess(null)

//     const data = new FormData()

//     // Map form data to API expected field names
//     Object.keys(formData).forEach((key) => {
//       if (key === "profile_photo" && formData[key]) {
//         data.append(key, formData[key])
//       } else if (key === "socials") {
//         formData.socials.forEach((social, index) => {
//           if (social.platform && social.url) {
//             data.append(`socials[${index}][platform]`, social.platform)
//             data.append(`socials[${index}][url]`, social.url)
//           }
//         })
//       } else if (key !== "profile_photo" && formData[key] !== null) {
//         data.append(key, formData[key])
//       }
//     })

//     try {
//       const config = {
//         method: "post",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/member/update",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: data,
//       }

//       const response = await axios.request(config)
//       console.log("Member update response:", response.data)
//       setSuccess("Member updated successfully!")

//       // Refresh member data
//       fetchMemberData()
//     } catch (err) {
//       console.error("Member update error:", err)
//       if (err.response && err.response.data) {
//         if (err.response.data.errors) {
//           const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
//           setError(err.response.data.message + ": " + errorMessages)
//         } else {
//           setError(err.response.data.message || "Member update failed. Please try again.")
//         }
//       } else {
//         setError("Member update failed. Please check your network and try again.")
//       }
//     } finally {
//       setUpdating(false)
//     }
//   }

//   // Generate years for graduation year dropdown
//   const currentYear = new Date().getFullYear()
//   const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

//   const birthMonths = [
//     "january",
//     "february",
//     "march",
//     "april",
//     "may",
//     "june",
//     "july",
//     "august",
//     "september",
//     "october",
//     "november",
//     "december",
//   ]

//   const maritalStatuses = ["single", "married", "divorced", "widowed"]
//   const employmentStatuses = ["employed", "self-employed", "unemployed", "retired", "other"]

//   // Function to format date string
//   const formatDate = (dateString) => {
//     if (!dateString) return ""
//     try {
//       const date = new Date(dateString)
//       return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
//     } catch (error) {
//       return dateString
//     }
//   }

//   if (authLoading) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading...</div>
//       </DashboardLayout>
//     )
//   }

//   if (!isAuthenticated) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
//           Please log in to access this page.
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading member details...</div>
//       </DashboardLayout>
//     )
//   }

//   if (error && !member) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Error: {error}</div>
//       </DashboardLayout>
//     )
//   }

//   if (!member) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Member not found</div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen bg-white">
//         <div className="w-full mx-auto px-6 py-4">
//           {/* Header */}
//           <div className="pb-4 border-b">
//             <Link to="/members" className="flex p-1 w-fit rounded shadow items-center text-gray-600">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Go Back
//             </Link>
//           </div>

//           {/* User Profile Header */}
//           <div className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
//             <div className="w-20 h-20 rounded-full overflow-hidden">
//               <img
//                 src={member.profile_photo_url || "/placeholder.svg"}
//                 alt={`${member.first_name} ${member.last_name}`}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null
//                   e.target.src = "https://via.placeholder.com/150"
//                 }}
//               />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-center sm:text-left">
//                 {member.first_name} {member.last_name}
//               </h1>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-600 text-sm text-center sm:text-left">
//                 <span>{member.email}</span>
//                 <span className="hidden sm:inline">|</span>
//                 <span>{member.phone}</span>
//               </div>
//             </div>
//           </div>

//           {/* Success/Error Messages */}
//           {success && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
//               {success}
//             </div>
//           )}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
//           )}

//           {/* Tabs */}
//           <div className="">
//             <div className="flex justify-center overflow-x-auto">
//               <button
//                 className={`px-4 py-3 text-sm whitespace-nowrap ${
//                   activeTab === "publicProfile"
//                     ? "border-b-2 border-orange-500 text-base font-semibold"
//                     : "text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("publicProfile")}
//               >
//                 Public Profile View
//               </button>
//               <button
//                 className={`px-4 py-3 text-sm whitespace-nowrap ${
//                   activeTab === "surveyResponses"
//                     ? "border-b-2 border-orange-500 text-base font-semibold"
//                     : "text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("surveyResponses")}
//               >
//                 Survey Responses
//               </button>
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="rounded-md pb-6">
//             {/* Public Profile View Tab */}
//             {activeTab === "publicProfile" && (
//               <form onSubmit={handleSubmit} className="space-y-6 py-4">
//                 {/* Personal Details Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => setPersonalDetailsOpen(!personalDetailsOpen)}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <h2 className="text-lg font-medium">Personal Details</h2>
//                     <ChevronDown
//                       className={`w-5 h-5 transition-transform ${personalDetailsOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   {personalDetailsOpen && (
//                     <div className="p-4 border-t border-gray-200 space-y-6">
//                       {/* Profile Photo */}
//                       <div className="flex items-center space-x-4">
//                         <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//                           {imagePreview || existingProfilePhoto ? (
//                             <img
//                               src={imagePreview || existingProfilePhoto || "/placeholder.svg"}
//                               alt="Profile preview"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-8 w-8 text-gray-400"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                               />
//                             </svg>
//                           )}
//                         </div>
//                         <div>
//                           <label htmlFor="profile_photo" className="text-gray-600 flex items-center cursor-pointer">
//                             Upload Photo
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-4 w-4 ml-1"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </label>
//                           <input
//                             type="file"
//                             id="profile_photo"
//                             name="profile_photo"
//                             accept="image/*"
//                             onChange={handleChange}
//                             className="hidden"
//                             disabled={updating}
//                           />
//                         </div>
//                       </div>

//                       {/* Personal Details */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             id="first_name"
//                             name="first_name"
//                             value={formData.first_name}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                             disabled={updating}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             id="last_name"
//                             name="last_name"
//                             value={formData.last_name}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                             disabled={updating}
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                           disabled={updating}
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                           Contact Number
//                         </label>
//                         <input
//                           type="tel"
//                           id="phone"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                           disabled={updating}
//                           required
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Public Profile View Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => setPublicProfileOpen(!publicProfileOpen)}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <h2 className="text-lg font-medium">Public Profile Information</h2>
//                     <ChevronDown className={`w-5 h-5 transition-transform ${publicProfileOpen ? "rotate-180" : ""}`} />
//                   </button>

//                   {publicProfileOpen && (
//                     <div className="p-4 border-t border-gray-200 space-y-6">
//                       <div>
//                         <label htmlFor="birth_month" className="block text-sm font-medium text-gray-700 mb-1">
//                           Birth Month
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="birth_month"
//                             name="birth_month"
//                             value={formData.birth_month}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select month</option>
//                             {birthMonths.map((month) => (
//                               <option key={month} value={month}>
//                                 {month.charAt(0).toUpperCase() + month.slice(1)}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700 mb-1">
//                           Marital Status
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="marital_status"
//                             name="marital_status"
//                             value={formData.marital_status}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select status</option>
//                             {maritalStatuses.map((status) => (
//                               <option key={status} value={status}>
//                                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
//                           Location
//                         </label>
//                         <input
//                           type="text"
//                           id="location"
//                           name="location"
//                           value={formData.location}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                           placeholder="e.g. Lagos, Nigeria"
//                           disabled={updating}
//                         />
//                       </div>

//                       {/* Academic Details */}
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div>
//                           <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700 mb-1">
//                             Year of Graduation
//                           </label>
//                           <div className="relative">
//                             <select
//                               id="graduation_year"
//                               name="graduation_year"
//                               value={formData.graduation_year}
//                               onChange={handleChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                               disabled={updating}
//                             >
//                               <option value="">Select year</option>
//                               {years.map((year) => (
//                                 <option key={year} value={year}>
//                                   {year}
//                                 </option>
//                               ))}
//                             </select>
//                             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                           </div>
//                         </div>
//                         <div>
//                           <label htmlFor="course_id" className="block text-sm font-medium text-gray-700 mb-1">
//                             Course of Study
//                           </label>
//                           <div className="relative">
//                             <select
//                               id="course_id"
//                               name="course_id"
//                               value={formData.course_id}
//                               onChange={handleChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                               disabled={updating}
//                             >
//                               <option value="">Select course</option>
//                               {courses.map((course) => (
//                                 <option key={course.id} value={course.id}>
//                                   {course.name}
//                                 </option>
//                               ))}
//                             </select>
//                             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                           </div>
//                         </div>
//                         <div>
//                           <label htmlFor="programme_id" className="block text-sm font-medium text-gray-700 mb-1">
//                             Programme
//                           </label>
//                           <div className="relative">
//                             <select
//                               id="programme_id"
//                               name="programme_id"
//                               value={formData.programme_id}
//                               onChange={handleChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                               disabled={updating}
//                             >
//                               <option value="">Select programme</option>
//                               {programmes.map((programme) => (
//                                 <option key={programme.id} value={programme.id}>
//                                   {programme.name} ({programme.level})
//                                 </option>
//                               ))}
//                             </select>
//                             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Professional Details */}
//                       <div>
//                         <label htmlFor="employment_status" className="block text-sm font-medium text-gray-700 mb-1">
//                           Employment Status
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="employment_status"
//                             name="employment_status"
//                             value={formData.employment_status}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select option</option>
//                             {employmentStatuses.map((status) => (
//                               <option key={status} value={status}>
//                                 {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>

//                       {(formData.employment_status === "employed" ||
//                         formData.employment_status === "self-employed") && (
//                         <div>
//                           <label htmlFor="place_of_work" className="block text-sm font-medium text-gray-700 mb-1">
//                             Place of Work
//                           </label>
//                           <input
//                             type="text"
//                             id="place_of_work"
//                             name="place_of_work"
//                             value={formData.place_of_work}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                             placeholder="Enter workplace"
//                             disabled={updating}
//                           />
//                         </div>
//                       )}

//                       {/* Bio */}
//                       <div>
//                         <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                           BIO
//                         </label>
//                         <textarea
//                           id="bio"
//                           name="bio"
//                           value={formData.bio}
//                           onChange={handleChange}
//                           placeholder="Enter bio..."
//                           rows={4}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                           disabled={updating}
//                         ></textarea>
//                       </div>

//                       {/* Socials */}
//                       <div>
//                         <h3 className="text-lg font-medium mb-4">Social Media</h3>

//                         {formData.socials.map((social, index) => (
//                           <div
//                             key={index}
//                             className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-md"
//                           >
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
//                               <div className="relative">
//                                 <select
//                                   value={social.platform}
//                                   onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                                   disabled={updating}
//                                 >
//                                   <option value="">Select platform</option>
//                                   <option value="Instagram">Instagram</option>
//                                   <option value="Facebook">Facebook</option>
//                                   <option value="Twitter">Twitter</option>
//                                   <option value="LinkedIn">LinkedIn</option>
//                                   <option value="TikTok">TikTok</option>
//                                   <option value="Github">Github</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                               </div>
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
//                               <div className="flex gap-2">
//                                 <input
//                                   type="url"
//                                   value={social.url}
//                                   onChange={(e) => handleSocialChange(index, "url", e.target.value)}
//                                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
//                                   placeholder="https://..."
//                                   disabled={updating}
//                                 />
//                                 <button
//                                   type="button"
//                                   onClick={() => removeSocial(index)}
//                                   className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                                   disabled={updating}
//                                 >
//                                   Remove
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}

//                         <button
//                           type="button"
//                           onClick={addNewSocial}
//                           className="flex items-center text-orange-500 mt-2 hover:text-orange-600 transition-colors"
//                           disabled={updating}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 mr-1"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           Add Social Media
//                         </button>
//                       </div>

//                       {/* Social Media Links Display */}
//                       {formData.socials.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-700 mb-3">Social Media Links</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {formData.socials.map((social, index) => {
//                               if (!social.platform || !social.url) return null

//                               const getSocialIcon = (platform) => {
//                                 switch (platform.toLowerCase()) {
//                                   case "facebook":
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                                       </svg>
//                                     )
//                                   case "twitter":
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                                       </svg>
//                                     )
//                                   case "instagram":
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
//                                       </svg>
//                                     )
//                                   case "linkedin":
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                                       </svg>
//                                     )
//                                   case "tiktok":
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
//                                       </svg>
//                                     )
//                                   case "github":
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                                       </svg>
//                                     )
//                                   default:
//                                     return (
//                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.391-2.108 4.603-1.212 1.212-2.745 1.939-4.603 2.108-.772.07-1.537.07-2.309 0-1.858-.169-3.391-.896-4.603-2.108C2.733 11.551 2.006 10.018 1.837 8.16c-.07-.772-.07-1.537 0-2.309.169-1.858.896-3.391 2.108-4.603C5.157 0.036 6.69-.691 8.548-.86c.772-.07 1.537-.07 2.309 0 1.858.169 3.391.896 4.603 2.108 1.212 1.212 1.939 2.745 2.108 4.603.07.772.07 1.537 0 2.309z" />
//                                       </svg>
//                                     )
//                                 }
//                               }

//                               const getSocialColor = (platform) => {
//                                 switch (platform.toLowerCase()) {
//                                   case "facebook":
//                                     return "bg-blue-600 hover:bg-blue-700"
//                                   case "twitter":
//                                     return "bg-blue-400 hover:bg-blue-500"
//                                   case "instagram":
//                                     return "bg-pink-600 hover:bg-pink-700"
//                                   case "linkedin":
//                                     return "bg-blue-700 hover:bg-blue-800"
//                                   case "tiktok":
//                                     return "bg-black hover:bg-gray-800"
//                                   case "github":
//                                     return "bg-gray-800 hover:bg-gray-900"
//                                   default:
//                                     return "bg-gray-600 hover:bg-gray-700"
//                                 }
//                               }

//                               return (
//                                 <a
//                                   key={index}
//                                   href={social.url}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className={`${getSocialColor(social.platform)} text-white p-2 rounded-md transition-colors duration-200 flex items-center justify-center`}
//                                   title={`${social.platform} - ${social.url}`}
//                                 >
//                                   {getSocialIcon(social.platform)}
//                                 </a>
//                               )
//                             })}
//                           </div>
//                         </div>
//                       )}

//                       <div>
//                         <label htmlFor="chapter_of_interest" className="block text-sm font-medium text-gray-700 mb-1">
//                           Chapter
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="chapter_of_interest"
//                             name="chapter_of_interest"
//                             value={formData.chapter_of_interest}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select chapter</option>
//                             {chapters.map((chapter) => (
//                               <option key={chapter.id} value={chapter.id}>
//                                 {chapter.name}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={updating}
//                   >
//                     {updating ? "Updating..." : "Update Member"}
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Survey Responses Tab */}
//             {activeTab === "surveyResponses" && (
//               <div className="py-4">
//                 {/* <div className="flex justify-between items-center pt-2 mb-6">
//                   <h2 className="text-lg font-medium">Survey Responses</h2>
//                   <button className="flex items-center gap-1 text-gray-600 text-sm px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
//                     <Download className="w-4 h-4" />
//                     Download
//                   </button>
//                 </div> */}
//                 {/* <hr className="mb-6" /> */}
//                 <div className="space-y-6">
//                   {member.survey_responses && member.survey_responses.length > 0 ? (
//                     member.survey_responses.map((response, index) => (
//                       <div key={response.id} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="font-medium text-gray-900">{`Survey Response ${index + 1}`}</h3>
//                           <span className="text-sm text-gray-500">{formatDate(response.created_at)}</span>
//                         </div>
//                         <div className="border-l-4 border-orange-200 pl-4">
//                           <p className="text-sm font-medium text-gray-700 mb-1">Response:</p>
//                           <p className="text-gray-600">{response.response_data}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center text-gray-500 py-8">No survey responses available for this member.</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default MemberProfile










"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"

const MemberProfile = () => {
  const [activeTab, setActiveTab] = useState("publicProfile")
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [surveyResponses, setSurveyResponses] = useState([])
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const { id } = useParams()

  // Collapsible sections state
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false)
  const [publicProfileOpen, setPublicProfileOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [existingProfilePhoto, setExistingProfilePhoto] = useState(null)

  // Dropdown data
  const [chapters, setChapters] = useState([])
  const [programmes, setProgrammes] = useState([])
  const [courses, setCourses] = useState([])

  const [formData, setFormData] = useState({
    member_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_month: "",
    marital_status: "",
    course_id: "",
    programme_id: "",
    graduation_year: "",
    location: "",
    chapter_of_interest: "",
    employment_status: "",
    place_of_work: "",
    profile_photo: null,
    bio: "",
    socials: [],
  })

  // Fetch member data when component mounts
  useEffect(() => {
    fetchMemberData()
    fetchDropdownData()
  }, [id, token, isAuthenticated, authLoading])

  const fetchMemberData = async () => {
    if (authLoading) return

    if (!isAuthenticated || !token) {
      setError("Please log in to view member details.")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `https://unizikalumni-api.tfnsolutions.us/api/member?member_id=${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }

      const response = await axios.request(config)
      const memberData = response.data.member

      setMember(memberData)
      if (memberData.survey_responses) setSurveyResponses(memberData.survey_responses)

      // Update form data with member details
      setFormData({
        member_id: memberData.id,
        first_name: memberData.first_name || "",
        last_name: memberData.last_name || "",
        email: memberData.email || "",
        phone: memberData.phone || "",
        birth_month: memberData.birth_month || "",
        marital_status: memberData.marital_status || "",
        course_id: memberData.course_id || "",
        programme_id: memberData.programme_id || "",
        graduation_year: memberData.graduation_year?.toString() || "",
        location: memberData.location || "",
        chapter_of_interest: memberData.chapter_of_interest || "",
        employment_status: memberData.employment_status || "",
        place_of_work: memberData.place_of_work || "",
        profile_photo: null,
        bio: memberData.bio || "",
        socials: memberData.socials || [],
      })

      // Set existing profile photo URL if available
      if (memberData.profile_photo_url) {
        setExistingProfilePhoto(memberData.profile_photo_url)
        setImagePreview(memberData.profile_photo_url)
      }
    } catch (err) {
      console.error("Error fetching member data:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to load member details. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch dropdown data (chapters, programmes, courses)
  const fetchDropdownData = async () => {
    try {
      // Fetch Chapters
      const chaptersConfig = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/chapters",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      }
      const chaptersResponse = await axios.request(chaptersConfig)
      if (chaptersResponse.data.chapters && Array.isArray(chaptersResponse.data.chapters.data)) {
        setChapters(chaptersResponse.data.chapters.data)
      }

      // Fetch Programmes
      const programmesConfig = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/programmes",
        headers: { Authorization: `Bearer ${token}` },
      }
      const programmesResponse = await axios.request(programmesConfig)
      if (Array.isArray(programmesResponse.data)) {
        setProgrammes(programmesResponse.data)
      }

      // Fetch Courses
      const coursesConfig = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/courses",
        headers: { Authorization: `Bearer ${token}` },
      }
      const coursesResponse = await axios.request(coursesConfig)
      if (Array.isArray(coursesResponse.data)) {
        setCourses(coursesResponse.data)
      }
    } catch (err) {
      console.error("Error fetching dropdown data:", err)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profile_photo") {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: file }))

      // Create image preview
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setImagePreview(existingProfilePhoto)
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    // Clear messages on input change
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...formData.socials]

    // If changing the platform, set a default URL structure
    if (field === "platform") {
      let baseUrl = ""
      switch (value) {
        case "Instagram":
          baseUrl = "https://instagram.com/"
          break
        case "Facebook":
          baseUrl = "https://facebook.com/"
          break
        case "X":
          baseUrl = "https://x.com/"
          break
        case "LinkedIn":
          baseUrl = "https://linkedin.com/in/"
          break
        case "TikTok":
          baseUrl = "https://tiktok.com/@"
          break
        case "Github":
          baseUrl = "https://github.com/"
          break
        default:
          baseUrl = ""
      }

      updatedSocials[index] = {
        ...updatedSocials[index],
        [field]: value,
        url: baseUrl,
      }
    } else {
      updatedSocials[index] = { ...updatedSocials[index], [field]: value }
    }

    setFormData((prev) => ({ ...prev, socials: updatedSocials }))
  }

  const addNewSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }))
  }

  const removeSocial = (index) => {
    const updatedSocials = formData.socials.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, socials: updatedSocials }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated || !token) {
      setError("You must be logged in to update member details.")
      return
    }

    setUpdating(true)
    setError(null)
    setSuccess(null)

    const data = new FormData()

    // Map form data to API expected field names
    Object.keys(formData).forEach((key) => {
      if (key === "profile_photo" && formData[key]) {
        data.append(key, formData[key])
      } else if (key === "socials") {
        formData.socials.forEach((social, index) => {
          if (social.platform && social.url) {
            data.append(`socials[${index}][platform]`, social.platform)
            data.append(`socials[${index}][url]`, social.url)
          }
        })
      } else if (key !== "profile_photo" && formData[key] !== null) {
        data.append(key, formData[key])
      }
    })

    if (formData.employment_status === "employed" && !formData.place_of_work) {
      setError("Place of work is required when employment status is set to employed.")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/member/update",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      console.log("Member update response:", response.data)
      setSuccess("Member updated successfully!")

      // Refresh member data
      fetchMemberData()
    } catch (err) {
      console.error("Member update error:", err)
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Member update failed. Please try again.")
        }
      } else {
        setError("Member update failed. Please check your network and try again.")
      }
    } finally {
      setUpdating(false)
    }
  }

  // Generate years for graduation year dropdown
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  const birthMonths = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]

  const maritalStatuses = ["single", "married", "divorced", "widowed"]
  const employmentStatuses = ["employed", "self-employed", "unemployed", "retired", "other"]

  // Function to format date string
  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    } catch (error) {
      return dateString
    }
  }

  useEffect(() => {
    if (error || success) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [error, success])

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading...</div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
          Please log in to access this page.
        </div>
      </DashboardLayout>
    )
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading member details...</div>
      </DashboardLayout>
    )
  }

  if (error && !member) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Error: {error}</div>
      </DashboardLayout>
    )
  }

  if (!member) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">Member not found</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto px-6 py-4">
          {/* Header */}
          <div className="pb-4 border-b">
            <Link to="/members" className="flex p-1 w-fit rounded shadow items-center text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </div>

          {/* User Profile Header */}
          <div className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={member.profile_photo_url || "/placeholder.svg"}
                alt={`${member.first_name} ${member.last_name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://via.placeholder.com/150"
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-center sm:text-left">
                {member.first_name} {member.last_name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-600 text-sm text-center sm:text-left">
                <span>{member.email}</span>
                <span className="hidden sm:inline">|</span>
                <span>{member.phone}</span>
              </div>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
          )}

          {/* Tabs */}
          <div className="">
            <div className="flex justify-center overflow-x-auto">
              <button
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === "publicProfile"
                    ? "border-b-2 border-orange-500 text-base font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("publicProfile")}
              >
                Public Profile View
              </button>
              <button
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === "surveyResponses"
                    ? "border-b-2 border-orange-500 text-base font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("surveyResponses")}
              >
                Survey Responses
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="rounded-md pb-6">
            {/* Public Profile View Tab */}
            {activeTab === "publicProfile" && (
              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                {/* Personal Details Section */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPersonalDetailsOpen(!personalDetailsOpen)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-lg font-medium">Personal Details</h2>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${personalDetailsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {personalDetailsOpen && (
                    <div className="p-4 border-t border-gray-200 space-y-6">
                      {/* Profile Photo */}
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          {imagePreview || existingProfilePhoto ? (
                            <img
                              src={imagePreview || existingProfilePhoto || "/placeholder.svg"}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <label htmlFor="profile_photo" className="text-gray-600 flex items-center cursor-pointer">
                            Upload Photo
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </label>
                          <input
                            type="file"
                            id="profile_photo"
                            name="profile_photo"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            disabled={updating}
                          />
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            disabled={updating}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            disabled={updating}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                          disabled={updating}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                          disabled={updating}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Public Profile View Section */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPublicProfileOpen(!publicProfileOpen)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-lg font-medium">Public Profile Information</h2>
                    <ChevronDown className={`w-5 h-5 transition-transform ${publicProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {publicProfileOpen && (
                    <div className="p-4 border-t border-gray-200 space-y-6">
                      <div>
                        <label htmlFor="birth_month" className="block text-sm font-medium text-gray-700 mb-1">
                          Birth Month
                        </label>
                        <div className="relative">
                          <select
                            id="birth_month"
                            name="birth_month"
                            value={formData.birth_month}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select month</option>
                            {birthMonths.map((month) => (
                              <option key={month} value={month}>
                                {month.charAt(0).toUpperCase() + month.slice(1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700 mb-1">
                          Marital Status
                        </label>
                        <div className="relative">
                          <select
                            id="marital_status"
                            name="marital_status"
                            value={formData.marital_status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select status</option>
                            {maritalStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                          placeholder="e.g. Lagos, Nigeria"
                          disabled={updating}
                        />
                      </div>

                      {/* Academic Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700 mb-1">
                            Year of Graduation
                          </label>
                          <div className="relative">
                            <select
                              id="graduation_year"
                              name="graduation_year"
                              value={formData.graduation_year}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                              disabled={updating}
                            >
                              <option value="">Select year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="course_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Course of Study
                          </label>
                          <div className="relative">
                            <select
                              id="course_id"
                              name="course_id"
                              value={formData.course_id}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                              disabled={updating}
                            >
                              <option value="">Select course</option>
                              {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="programme_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Programme
                          </label>
                          <div className="relative">
                            <select
                              id="programme_id"
                              name="programme_id"
                              value={formData.programme_id}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                              disabled={updating}
                            >
                              <option value="">Select programme</option>
                              {programmes.map((programme) => (
                                <option key={programme.id} value={programme.id}>
                                  {programme.name} ({programme.level})
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                      </div>

                      {/* Professional Details */}
                      <div>
                        <label htmlFor="employment_status" className="block text-sm font-medium text-gray-700 mb-1">
                          Employment Status
                        </label>
                        <div className="relative">
                          <select
                            id="employment_status"
                            name="employment_status"
                            value={formData.employment_status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select option</option>
                            {employmentStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      {(formData.employment_status === "employed" ||
                        formData.employment_status === "self-employed") && (
                        <div>
                          <label htmlFor="place_of_work" className="block text-sm font-medium text-gray-700 mb-1">
                            Place of Work
                          </label>
                          <input
                            type="text"
                            id="place_of_work"
                            name="place_of_work"
                            value={formData.place_of_work}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            placeholder="Enter workplace"
                            disabled={updating}
                            required={formData.employment_status === "employed"}
                          />
                        </div>
                      )}

                      {/* Bio */}
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          BIO
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Enter bio..."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                          disabled={updating}
                        ></textarea>
                      </div>

                      {/* Socials */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Social Media</h3>

                        {formData.socials.map((social, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-md"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                              <div className="relative">
                                <select
                                  value={social.platform}
                                  onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                                  disabled={updating}
                                >
                                  <option value="">Select platform</option>
                                  <option value="Instagram">Instagram</option>
                                  <option value="Facebook">Facebook</option>
                                  <option value="X">X</option>
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="TikTok">TikTok</option>
                                  <option value="Github">Github</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={social.url}
                                  onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                                  placeholder="https://..."
                                  disabled={updating}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSocial(index)}
                                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  disabled={updating}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addNewSocial}
                          className="flex items-center text-orange-500 mt-2 hover:text-orange-600 transition-colors"
                          disabled={updating}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Add Social Media
                        </button>
                      </div>

                      {/* Social Media Links Display */}
                      {/* {formData.socials.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Social Media Links</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.socials.map((social, index) => {
                              if (!social.platform || !social.url) return null

                              const getSocialIcon = (platform) => {
                                switch (platform.toLowerCase()) {
                                  case "facebook":
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                      </svg>
                                    )
                                  case "twitter":
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                      </svg>
                                    )
                                  case "instagram":
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
                                      </svg>
                                    )
                                  case "linkedin":
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                      </svg>
                                    )
                                  case "tiktok":
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                      </svg>
                                    )
                                  case "github":
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                      </svg>
                                    )
                                  default:
                                    return (
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.391-2.108 4.603-1.212 1.212-2.745 1.939-4.603 2.108-.772.07-1.537.07-2.309 0-1.858-.169-3.391-.896-4.603-2.108C2.733 11.551 2.006 10.018 1.837 8.16c-.07-.772-.07-1.537 0-2.309.169-1.858.896-3.391 2.108-4.603C5.157 0.036 6.69-.691 8.548-.86c.772-.07 1.537-.07 2.309 0 1.858.169 3.391.896 4.603 2.108 1.212 1.212 1.939 2.745 2.108 4.603.07.772.07 1.537 0 2.309z" />
                                      </svg>
                                    )
                                }
                              }

                              const getSocialColor = (platform) => {
                                switch (platform.toLowerCase()) {
                                  case "facebook":
                                    return "bg-blue-600 hover:bg-blue-700"
                                  case "twitter":
                                    return "bg-blue-400 hover:bg-blue-500"
                                  case "instagram":
                                    return "bg-pink-600 hover:bg-pink-700"
                                  case "linkedin":
                                    return "bg-blue-700 hover:bg-blue-800"
                                  case "tiktok":
                                    return "bg-black hover:bg-gray-800"
                                  case "github":
                                    return "bg-gray-800 hover:bg-gray-900"
                                  default:
                                    return "bg-gray-600 hover:bg-gray-700"
                                }
                              }

                              return (
                                <a
                                  key={index}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`${getSocialColor(social.platform)} text-white p-2 rounded-md transition-colors duration-200 flex items-center justify-center`}
                                  title={`${social.platform} - ${social.url}`}
                                >
                                  {getSocialIcon(social.platform)}
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      )} */}

                      <div>
                        <label htmlFor="chapter_of_interest" className="block text-sm font-medium text-gray-700 mb-1">
                          Chapter
                        </label>
                        <div className="relative">
                          <select
                            id="chapter_of_interest"
                            name="chapter_of_interest"
                            value={formData.chapter_of_interest}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select chapter</option>
                            {chapters.map((chapter) => (
                              <option key={chapter.id} value={chapter.id}>
                                {chapter.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Update Member"}
                  </button>
                </div>
              </form>
            )}

            {/* Survey Responses Tab */}
            {activeTab === "surveyResponses" && (
              <div className="py-4">
                {/* <div className="flex justify-between items-center pt-2 mb-6">
                  <h2 className="text-lg font-medium">Survey Responses</h2>
                  <button className="flex items-center gap-1 text-gray-600 text-sm px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div> */}
                {/* <hr className="mb-6" /> */}
                <div className="space-y-6">
                  {member.survey_responses && member.survey_responses.length > 0 ? (
                    member.survey_responses.map((response, index) => (
                      <div key={response.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-gray-900">{`Survey Response ${index + 1}`}</h3>
                          <span className="text-sm text-gray-500">{formatDate(response.created_at)}</span>
                        </div>
                        <div className="border-l-4 border-orange-200 pl-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Response:</p>
                          <p className="text-gray-600">{response.response_data}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">No survey responses available for this member.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MemberProfile
