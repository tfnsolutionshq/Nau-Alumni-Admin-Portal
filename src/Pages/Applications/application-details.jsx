"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom" // Import useParams
import axios from "axios"
import { useAuth } from "../../Context/AuthContext" // Import useAuth
import ConfirmationModal from "../../Components/Applications/ApproveModal" // Ensure this path is correct
import DeclineReasonModal from "../../Components/Applications/DeclineModal" // Ensure this path is correct

const ApplicantDetailsPage = () => {
  const { id } = useParams() // Get applicant ID from URL
  const navigate = useNavigate()
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const [applicantData, setApplicantData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showApproveConfirmationModal, setShowApproveConfirmationModal] = useState(false)
  const [showDeclineReasonModal, setShowDeclineReasonModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false) // For approve/decline API calls

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      setLoading(true)
      setError(null)

      if (authLoading) return; // Wait until auth state is resolved
      if (!isAuthenticated || !token) {
        setError("Please log in to view applicant details.")
        setLoading(false)
        return
      }

      try {
        // Fetch all pending applications and find the matching one by ID
        // This is necessary because a direct /api/applications/{id} endpoint was not provided.
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://unizikalumni-api.tfnsolutions.us/api/applications/pending',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.request(config);

        // --- FIX: Now expecting a direct array response ---
        if (response.data && Array.isArray(response.data)) {
          const foundApplicant = response.data.find(app => app.id === id);
          if (foundApplicant) {
            setApplicantData(foundApplicant);
          } else {
            setError("Applicant not found or not in pending list.");
          }
        } else {
          setError("Invalid data format from API. Expected a direct array of applicants.");
        }
      } catch (err) {
        console.error("Error fetching applicant details:", err);
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to load applicant details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id && !authLoading) {
      fetchApplicantDetails();
    } else if (!id) {
        setLoading(false);
        setError("No applicant ID provided.");
    }
  }, [id, authLoading, isAuthenticated, token]); // Re-fetch when ID or auth state changes

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleApprove = () => {
    setShowApproveConfirmationModal(true)
  }

  const handleApproveConfirm = async () => {
    setShowApproveConfirmationModal(false)
    setActionLoading(true)
    setError(null) // Clear previous errors

    if (!applicantData || !applicantData.id) {
        setError("No applicant data available for approval.");
        setActionLoading(false);
        return;
    }
    if (!isAuthenticated || !token) {
        setError("Authentication required for approval.");
        setActionLoading(false);
        return;
    }

    try {
        const payload = JSON.stringify({
            "application_id": applicantData.id,
            "approved": true
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://unizikalumni-api.tfnsolutions.us/api/application/approve', // Unified endpoint
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: payload
        };
        const response = await axios.request(config);
        
        // Handle success response
        if (response.data && response.data.message) {
            alert('Application approved successfully!'); // Temporary alert
            navigate("/applicants"); // Navigate back to list
        } else {
            setError("Approval failed: Unexpected response from API.");
        }
    } catch (err) {
        console.error("Error approving application:", err);
        if (err.response?.status === 401) {
            setError("Authentication failed during approval. Please log in again.");
        } else if (err.response?.data?.message) {
            setError(err.response.data.message);
        } else {
            setError("Failed to approve application. Please try again.");
        }
    } finally {
        setActionLoading(false);
    }
  }

  const handleDecline = () => {
    setShowDeclineReasonModal(true)
  }

  const handleDeclineConfirm = async (reason) => {
    setShowDeclineReasonModal(false)
    setActionLoading(true)
    setError(null) // Clear previous errors

    if (!applicantData || !applicantData.id) {
        setError("No applicant data available for decline.");
        setActionLoading(false);
        return;
    }
    if (!isAuthenticated || !token) {
        setError("Authentication required for decline.");
        setActionLoading(false);
        return;
    }

    try {
        const payload = JSON.stringify({
            "application_id": applicantData.id,
            "approved": false,
            "reason_for_decline": reason
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://unizikalumni-api.tfnsolutions.us/api/application/approve', // Unified endpoint
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: payload
        };
        const response = await axios.request(config);

        // Handle success response
        if (response.data && response.data.message) {
            alert('Application declined successfully!'); // Temporary alert
            navigate("/applications"); // Navigate back to list
        } else {
            setError("Decline failed: Unexpected response from API.");
        }
    } catch (err) {
        console.error("Error declining application:", err);
        if (err.response?.status === 401) {
            setError("Authentication failed during decline. Please log in again.");
        } else if (err.response?.data?.message) {
            setError(err.response.data.message);
        } else {
            setError("Failed to decline application. Please try again.");
        }
    } finally {
        setActionLoading(false);
    }
  }

  const handleDeclineCancel = () => {
    setShowDeclineReasonModal(false)
  }

  // Helper to format date of birth
  const formatBirthMonth = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateString; // Return original if invalid
    }
  };

  // Helper to get image URL (consider profile_photo_url if available)
  const getProfileImageUrl = (applicant) => {
    if (applicant?.profile_photo_url) {
        return applicant.profile_photo_url;
    }
    // Fallback to a placeholder or default if no image is available
    return "https://placehold.co/100x100/cccccc/ffffff?text=Profile";
  };


  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading authentication...</div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
          You must be logged in to view applicant details.
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">
          <Loader2 className="animate-spin mr-2" size={24} /> Loading applicant details...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  if (!applicantData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-gray-500">
          Applicant details not found.
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 py-4">
        {/* Header */}
        <div className="border-b pb-4">
          <button className="flex p-1 shadow rounded items-center w-fit text-gray-600 hover:text-orange-500" onClick={handleGoBack} disabled={actionLoading}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Applicant Information */}
        <div className="p-4 border rounded-md shadow-sm mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-medium">Application Details for {applicantData.first_name} {applicantData.last_name}</h2>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onClick={handleApprove} disabled={actionLoading || applicantData.status === 'Approved' || applicantData.status === 'Declined'}>
                {actionLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onClick={handleDecline} disabled={actionLoading || applicantData.status === 'Approved' || applicantData.status === 'Declined'}>
                {actionLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Decline
              </button>
            </div>
          </div>
            {/* Display general error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Profile Photo */}
            <div className="md:col-span-2 flex justify-start mb-4">
                <img
                    src={getProfileImageUrl(applicantData)}
                    alt={`${applicantData.first_name} ${applicantData.last_name}`}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/100x100/cccccc/ffffff?text=Profile"; // Fallback image
                    }}
                />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">First Name</label>
              <p className="font-medium text-gray-900">{applicantData.first_name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Last Name</label>
              <p className="font-medium text-gray-900">{applicantData.last_name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Address</label>
              <p className="font-medium text-gray-900">{applicantData.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              <p className="font-medium text-gray-900">{applicantData.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Birth Month</label>
              <p className="font-medium text-gray-900">{formatBirthMonth(applicantData.birth_month)}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Marital Status</label>
              <p className="font-medium text-gray-900">{applicantData.marital_status || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Course of Study</label>
              <p className="font-medium text-gray-900">{applicantData.course?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Programme</label>
              <p className="font-medium text-gray-900">{applicantData.programme?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Graduation year</label>
              <p className="font-medium text-gray-900">{applicantData.graduation_year || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Location</label>
              <p className="font-medium text-gray-900">{applicantData.location || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Chapter of Interest</label>
              <p className="font-medium text-gray-900">{applicantData.chapter?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Employment Status</label>
              <p className="font-medium text-gray-900">{applicantData.employment_status || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Place of Work</label>
              <p className="font-medium text-gray-900">{applicantData.place_of_work || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Current Status</label>
              <p className={`font-semibold ${applicantData.status === 'Pending' ? 'text-blue-600' : applicantData.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                {applicantData.status || 'N/A'}
              </p>
            </div>
            {applicantData.rejection_reason && (
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">Rejection Reason</label>
                <p className="font-medium text-red-700 italic">{applicantData.rejection_reason}</p>
              </div>
            )}
          </div>
        </div>

        {/* Approve Confirmation Modal */}
        <ConfirmationModal
          isOpen={showApproveConfirmationModal}
          onClose={() => setShowApproveConfirmationModal(false)}
          onConfirm={handleApproveConfirm}
          message="Are you sure you want to approve this application?"
        />

        {/* Decline Reason Modal */}
        <DeclineReasonModal
          isOpen={showDeclineReasonModal}
          onClose={handleDeclineCancel}
          onConfirm={handleDeclineConfirm}
        />
      </div>
    </div>
  </DashboardLayout>
  )
}

export default ApplicantDetailsPage
