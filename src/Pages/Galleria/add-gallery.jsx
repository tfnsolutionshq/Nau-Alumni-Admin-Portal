"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ArrowLeft, Plus, ChevronDown, X, Loader2 } from "lucide-react" // Added Loader2 for loading icon, X for remove image
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext" // Import useAuth

const AddNewGalleriaPage = () => {
  const navigate = useNavigate()
  const { token, isAuthenticated, loading: authLoading } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    dateOfEvent: "",
    chapterId: "", // Changed to chapterId to match API
    images: [], // Changed to 'images' array to store File objects
  })

  const [imagePreviews, setImagePreviews] = useState([]) // To store URLs for image previews
  const [loading, setLoading] = useState(false) // For form submission
  const [error, setError] = useState(null) // For form submission errors
  const [success, setSuccess] = useState(false) // For form submission success

  const [chaptersList, setChaptersList] = useState([]); // New state for fetched chapters
  const [loadingChapters, setLoadingChapters] = useState(true); // Loading state for chapters
  const [errorChapters, setErrorChapters] = useState(null); // Error state for chapters

  // Fetch chapters for the dropdown
  useEffect(() => {
    const fetchChapters = async () => {
      setLoadingChapters(true);
      setErrorChapters(null);
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://unizikalumni-api.tfnsolutions.us/api/chapters',
          headers: {
            'Accept': 'application/json'
          }
        };
        const response = await axios.request(config);
        if (response.data && Array.isArray(response.data.chapters.data)) {
          setChaptersList(response.data.chapters.data);
        } else {
          setChaptersList([]);
          setErrorChapters("Invalid chapters data format.");
        }
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setErrorChapters("Failed to load chapters. Please try again.");
      } finally {
        setLoadingChapters(false);
      }
    };

    fetchChapters();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null) // Clear error on input change
    setSuccess(false) // Clear success on input change
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setError(null); // Clear errors
    setSuccess(false);

    if (files.length === 0) return;

    const currentImages = formData.images;
    const newTotalImages = currentImages.length + files.length;

    // Check maximum limit
    if (newTotalImages > 11) {
      setError(`You can upload a maximum of 11 images. You are trying to upload ${newTotalImages} images.`);
      return;
    }

    // Filter out non-image files if needed (accept="image/*" helps but client-side check is good)
    const validFiles = files.filter(file => file.type.startsWith('image/'));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }))

    // Generate previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  }

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, index) => index !== indexToRemove);
      return { ...prev, images: updatedImages };
    });
    setImagePreviews((prev) => {
      const updatedPreviews = prev.filter((_, index) => index !== indexToRemove);
      // Revoke the object URL to free up memory
      URL.revokeObjectURL(prev[indexToRemove]);
      return updatedPreviews;
    });
    setError(null); // Clear error when images are removed
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Client-side validation for minimum images
    if (formData.images.length < 6) {
      setError("You must upload at least 6 images.");
      setLoading(false);
      return;
    }

    if (!formData.title.trim()) {
      setError("Title is required.");
      setLoading(false);
      return;
    }
    if (!formData.dateOfEvent.trim()) {
        setError("Date of Event is required.");
        setLoading(false);
        return;
    }
    if (!formData.chapterId) {
        setError("Chapter is required.");
        setLoading(false);
        return;
    }

    if (!isAuthenticated || !token) {
        setError("Authentication required to create a gallery.");
        setLoading(false);
        return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('date_of_event', formData.dateOfEvent); // Match API field name
      data.append('chapter_id', formData.chapterId); // Match API field name

      // IMPORTANT: Using 'image[]' as the field name as per your snippet
      formData.images.forEach((imageFile) => {
        data.append('image[]', imageFile); // Changed 'images[]' to 'image[]' to match snippet
      });

      // Directly use the provided axios configuration for the request,
      // adapting for browser environment and dynamic token
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://unizikalumni-api.tfnsolutions.us/api/gallery/create',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, // Use token from useAuth, NOT hardcoded value
          // 'Content-Type': 'multipart/form-data' is automatically set by axios for FormData in browsers
        },
        data: data
      };

      const response = await axios.request(config);

      if (response.data && response.data.message === "Gallery created successfully.") {
        setSuccess(true);
        // Clear form after successful submission
        setFormData({
          title: "",
          dateOfEvent: "",
          chapterId: "",
          images: [],
        });
        setImagePreviews([]); // Clear image previews
        setTimeout(() => {
          navigate("/gallery"); // Navigate back to gallery list after success
        }, 2000); // Wait 2 seconds before navigating
      } else {
        setError(response.data.message || "Failed to create gallery. Please try again.");
      }
    } catch (err) {
      console.error("Error creating gallery:", err);
      // More specific error handling for API response
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.response?.data?.errors) {
        // If there are specific validation errors from the backend
        const errors = Object.values(err.response.data.errors).flat().join(' ');
        setError(`Validation error: ${errors}`);
      }
      else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create gallery. Please check your inputs and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]); // Run cleanup when imagePreviews change or component unmounts

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
          You must be logged in to add new gallery.
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-6 pb-4">
        {/* Header */}
        <div className="flex justify-between items-center py-4 border-b">
          <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={handleSubmit}
            disabled={loading || formData.images.length < 6 || formData.images.length > 11}
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            {loading ? "Saving..." : "Save and Publish"}
          </button>
        </div>

        {/* Form Content */}
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-6">Add New Galleria</h1>

          <div className="grid border p-4 grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Annual Alumni Reunion"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Event</label>
                <input
                  type="date" // Changed to type="date"
                  name="dateOfEvent"
                  value={formData.dateOfEvent}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chapter</label>
                <div className="relative">
                  {loadingChapters ? (
                    <p className="text-gray-500">Loading chapters...</p>
                  ) : errorChapters ? (
                    <p className="text-red-500">{errorChapters}</p>
                  ) : (
                    <select
                      name="chapterId" // Changed name to chapterId
                      value={formData.chapterId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 pr-8 appearance-none"
                      required
                    >
                      <option value="">Select Chapter</option>
                      {chaptersList.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </option>
                      ))}
                    </select>
                  )}
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload and Previews */}
            <div>
              <p className="font-medium mb-2">Upload Images</p>
              <div
                className="border-2 bg-gray-50 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer hover:border-orange-500 transition-colors"
                onClick={() => document.getElementById("gallery-upload").click()}
              >
                <Plus className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Drag images here
                  <br />
                  or click to upload
                </p>
                <input
                  id="gallery-upload"
                  type="file"
                  accept="image/*"
                  multiple // Allow multiple file selection
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="mt-2 text-sm">
                <p>Minimum: 6 images, Maximum: 11 images</p>
                <p className="text-gray-500">File size (Not more than 10MB per image)</p>
                <p className="text-gray-500">Formats: JPG, PNG, GIF</p>
              </div>

              {/* Image Previews Section */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 border p-3 rounded-md bg-gray-50">
                  <h3 className="text-md font-medium mb-2">Selected Images ({imagePreviews.length})</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                    {imagePreviews.map((previewUrl, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                        <img
                          src={previewUrl}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                          aria-label="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submission Messages */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-4 text-sm" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mt-4 text-sm" role="alert">
                  Gallery created successfully! Redirecting...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default AddNewGalleriaPage
