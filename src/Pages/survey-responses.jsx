"use client"

import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ChevronLeft, Plus, Eye } from "lucide-react" // Added Trash2 for future delete functionality
import axios from "axios"
import { useAuth } from "../Context/AuthContext"

const AdminSurveyPage = () => {
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const [newQuestion, setNewQuestion] = useState("")
  const [surveys, setSurveys] = useState([])
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [errorCreate, setErrorCreate] = useState(null)
  const [successCreate, setSuccessCreate] = useState(false)
  const [loadingSurveys, setLoadingSurveys] = useState(true)
  const [errorSurveys, setErrorSurveys] = useState(null)
  const [showResponsesModal, setShowResponsesModal] = useState(false)
  const [selectedSurveyResponses, setSelectedSurveyResponses] = useState({ question: "", responses: [] })

  // Function to fetch all surveys
  const fetchSurveys = async () => {
    setLoadingSurveys(true)
    setErrorSurveys(null)
    if (!isAuthenticated || !token) {
      setErrorSurveys("Authentication required to view surveys.")
      setLoadingSurveys(false)
      return
    }
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://unizikalumni-api.tfnsolutions.us/api/surveys',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.request(config);
      if (response.data && Array.isArray(response.data.data)) {
        setSurveys(response.data.data);
      } else {
        setSurveys([]);
        setErrorSurveys("Invalid surveys data format.");
      }
    } catch (err) {
      console.error("Error fetching surveys:", err);
      if (err.response?.status === 401) {
        setErrorSurveys("Authentication failed. Please log in again.");
      } else {
        setErrorSurveys("Failed to load surveys. Please try again.");
      }
    } finally {
      setLoadingSurveys(false);
    }
  };

  useEffect(() => {
    if (!authLoading) { // Only fetch when authentication status is determined
      fetchSurveys();
    }
  }, [authLoading, isAuthenticated, token]); // Re-fetch when auth state changes

  // Function to create a new survey question
  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    setErrorCreate(null);
    setSuccessCreate(false);

    if (!newQuestion.trim()) {
      setErrorCreate("Question cannot be empty.");
      return;
    }
    if (!isAuthenticated || !token) {
      setErrorCreate("Authentication required to create a survey.");
      return;
    }

    setLoadingCreate(true);
    try {
      const data = JSON.stringify({
        "question": newQuestion
      });
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://unizikalumni-api.tfnsolutions.us/api/survey/create',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: data
      };
      const response = await axios.request(config);
      if (response.data && response.data.data) {
        setSuccessCreate(true);
        setNewQuestion(""); // Clear input
        fetchSurveys(); // Refresh the list of surveys
      } else {
        setErrorCreate("Failed to create survey: Invalid response.");
      }
    } catch (err) {
      console.error("Error creating survey:", err);
      if (err.response?.status === 401) {
        setErrorCreate("Authentication failed. Please log in again.");
      } else if (err.response?.data?.message) {
        setErrorCreate(err.response.data.message);
      } else {
        setErrorCreate("Failed to create survey. Please try again.");
      }
    } finally {
      setLoadingCreate(false);
    }
  };

  const openResponsesModal = (survey) => {
    setSelectedSurveyResponses({
      question: survey.question,
      responses: survey.responses || []
    });
    setShowResponsesModal(true);
  };

  const closeResponsesModal = () => {
    setShowResponsesModal(false);
    setSelectedSurveyResponses({ question: "", responses: [] });
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
          You must be logged in as an administrator to access this page.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-4 md:p-6">
        

        {/* Create New Survey Section */}
        <div className=" p-4 border rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Survey Question</h2>
          <form onSubmit={handleCreateQuestion}>
            <div className="mb-4">
              <label htmlFor="newQuestion" className="block text-sm font-medium text-gray-700 mb-1">
                Survey Question
              </label>
              <textarea
                id="newQuestion"
                name="newQuestion"
                rows="3"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Enter your survey question here..."
              ></textarea>
            </div>
            {errorCreate && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm" role="alert">
                {errorCreate}
              </div>
            )}
            {successCreate && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4 text-sm" role="alert">
                Survey created successfully!
              </div>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={loadingCreate}
            >
              {loadingCreate ? "Creating..." : "Create Survey"}
              <Plus className="w-4 h-4 ml-2" />
            </button>
          </form>
        </div>

        {/* All Surveys and Responses Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">All Surveys and Responses</h2>
          {loadingSurveys ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading surveys...</div>
            </div>
          ) : errorSurveys ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">{errorSurveys}</div>
            </div>
          ) : surveys.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">No surveys created yet.</div>
            </div>
          ) : (
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responses Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {surveys.map((survey) => (
                    <tr key={survey.id}>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        {survey.question}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {survey.responses ? survey.responses.length : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openResponsesModal(survey)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center justify-end"
                        >
                          <Eye className="w-4 h-4 mr-1" /> View Responses
                        </button>
                        {/* Optional: Add a delete button for future implementation */}
                        {/* <button
                          onClick={() => handleDeleteSurvey(survey.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Survey Responses Modal */}
      {showResponsesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Responses for: "{selectedSurveyResponses.question}"</h3>
              <button onClick={closeResponsesModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {selectedSurveyResponses.responses.length === 0 ? (
                <p className="text-gray-600">No responses yet for this question.</p>
              ) : (
                <ul className="space-y-3">
                  {selectedSurveyResponses.responses.map((responseItem, index) => (
                    <li key={responseItem.id || index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="font-medium text-gray-800">{responseItem.response}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        - {responseItem.full_name && responseItem.full_name.trim() !== "" ? responseItem.full_name : "Anonymous"}
                        {responseItem.created_at && ` on ${new Date(responseItem.created_at).toLocaleDateString()}`}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button onClick={closeResponsesModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminSurveyPage
