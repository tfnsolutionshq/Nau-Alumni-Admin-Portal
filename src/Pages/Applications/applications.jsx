"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react" // Removed useRef as infinite scroll is removed
import { Search, ChevronDown, ChevronRight, Loader2 } from "lucide-react" // Removed ChevronLeft
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext" // Import useAuth

const ApplicantListPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true) // Loading state for initial fetch
  const [error, setError] = useState(null)
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const fetchApplicants = async () => { // Removed page and append parameters
    setLoading(true)
    setError(null)

    if (authLoading) {
      setLoading(false);
      return;
    }
    if (!isAuthenticated || !token) {
      setError("Please log in to view pending applications.")
      setLoading(false)
      return
    }

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://unizikalumni-api.tfnsolutions.us/api/applications/pending`, // Removed ?page=${page}
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };
      const response = await axios.request(config);

      // --- FIX: Now expecting a direct array response ---
      if (response.data && Array.isArray(response.data)) {
        setApplicants(response.data); // Directly use response.data as the array
      } else {
        // Fallback for unexpected data format (e.g., empty object, or non-array)
        setApplicants([]);
        setError("Unexpected data format from API. Expected a direct array of applicants.");
      }
    } catch (err) {
      console.error("Error fetching applicants:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load applicants. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch applicants when component mounts or auth state changes
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
        fetchApplicants();
    }
  }, [authLoading, isAuthenticated, token]); // Dependencies for fetch

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Client-side filtering will occur automatically as `filteredApplicants` recomputes
    // If you need server-side search, API would need to support a search query parameter
  }

  // Filter applicants based on search query (client-side filter)
  const filteredApplicants = applicants.filter((applicant) =>
    `${applicant.first_name || ''} ${applicant.last_name || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.chapter_of_interest?.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming chapter_of_interest has a 'name'
  );

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
              Export
            </button>
          </div>
        </div>

        {/* Applicants Table */}
        {loading ? ( // Show loading spinner only for the initial fetch
          <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin mr-2" size={24} /> Loading applications...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8 text-red-500">
            {error}
          </div>
        ) : filteredApplicants.length === 0 ? ( // No applicants found after initial load
          <div className="flex justify-center items-center py-8 text-gray-500">
            No pending applications found.
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-md">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">APPLICANT</th>
                  <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">CHAPTER OF INTEREST</th>
                  <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">EMAIL ADDRESS</th>
                  <th className="text-left py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider">CONTACT NUMBER</th>
                  <th className="text-right py-3 px-4 font-medium text-xs text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          {applicant.first_name ? applicant.first_name.charAt(0) : 'U'}
                        </div>
                        {`${applicant.first_name || ''} ${applicant.last_name || ''}`.trim()}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{applicant.chapter?.name || 'N/A'}</td> {/* Assuming chapter_of_interest has a 'name' */}
                    <td className="py-3 px-4 text-sm text-gray-900">{applicant.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{applicant.phone}</td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/application-details/${applicant.id}`} className="text-gray-600 flex items-center gap-1 ml-auto justify-end hover:text-orange-500">
                        View Application
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Removed Pagination/Infinite Scroll UI */}
        {/*
        {loadingMore && (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="animate-spin mr-2" size={24} /> Loading more applications...
          </div>
        )}
        {currentPage < totalPages && !loading && !error && filteredApplicants.length > 0 && (
          <div ref={loadingRef} className="h-10 invisible"></div>
        )}
        {currentPage >= totalPages && !loading && !error && filteredApplicants.length > 0 && !loadingMore && (
            <div className="flex justify-center items-center py-4 text-gray-500">
                You've reached the end of the list.
            </div>
        )}
        */}
      </div>
    </div>
    </DashboardLayout>
  )
}

export default ApplicantListPage
