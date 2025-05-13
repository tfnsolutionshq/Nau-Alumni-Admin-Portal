import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import DeclineReasonModal from "../../Components/ApplicationDeclineModal"

const ApplicantDetailsPage = () => {
  const navigate = useNavigate()
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  // Sample applicant data - in a real app, you would fetch this based on applicantId
  const applicantData = {
    firstName: "Uche",
    lastName: "ThankGod",
    email: "tuche@gmail.com",
    phone: "07069790950",
    birthMonth: "10/09/2024",
    maritalStatus: "Single",
    courseOfStudy: "Electronics and Computer Engineering",
    programme: "Bachelor",
    graduationYear: "Electronics and Computer Engineering",
    location: "Bachelor",
    chapterOfInterest: "Electronics and Computer Engineering",
    employmentStatus: "Employed",
    placeOfWork: "TFN Solutions",
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleApprove = () => {
    // Handle approve logic
    console.log("Applicant approved")
    navigate("/applicants")
  }

  const handleDecline = () => {
    setShowDeclineModal(true)
  }

  const handleDeclineConfirm = (reason) => {
    // Handle decline logic with reason
    console.log("Applicant declined with reason:", reason)
    setShowDeclineModal(false)
    navigate("/applicants")
  }

  const handleDeclineCancel = () => {
    setShowDeclineModal(false)
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 py-4">
        {/* Header */}
        <div className="border-b pb-4">
          <button className="flex p-1 shadow rounded items-center text-gray-600" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Applicant Information */}
        <div className="p-4 border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Basic Information</h2>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={handleApprove}>
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDecline}>
                Decline
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">First Name</label>
              <p>{applicantData.firstName}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Last Name</label>
              <p>{applicantData.lastName}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Address</label>
              <p>{applicantData.email}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              <p>{applicantData.phone}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Birth Month</label>
              <p>{applicantData.birthMonth}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Marital Status</label>
              <p>{applicantData.maritalStatus}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Course of Study</label>
              <p>{applicantData.courseOfStudy}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Programme</label>
              <p>{applicantData.programme}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Graduation year</label>
              <p>{applicantData.graduationYear}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Location</label>
              <p>{applicantData.location}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Chapter of Interest</label>
              <p>{applicantData.chapterOfInterest}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Employment Status</label>
              <p>{applicantData.employmentStatus}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Place of Work</label>
              <p>{applicantData.placeOfWork}</p>
            </div>
          </div>
        </div>

        {/* Decline Modal */}
        {showDeclineModal && <DeclineReasonModal onConfirm={handleDeclineConfirm} onCancel={handleDeclineCancel} />}
      </div>
    </div>
  </DashboardLayout>
  )
}

export default ApplicantDetailsPage
