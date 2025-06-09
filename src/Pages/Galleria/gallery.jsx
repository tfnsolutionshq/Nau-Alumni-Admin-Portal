"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, X, Loader2, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"
// Removed useAuth as per instruction that endpoint does not need authentication
// import { useAuth } from "../../Context/AuthContext"

const GalleryListPage = () => {
  // Removed useAuth hook as authentication is not needed for this endpoint
  // const { token, isAuthenticated, loading: authLoading } = useAuth();

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [selectedGalleryTitle, setSelectedGalleryTitle] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For the modal image carousel

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);

    // Removed authentication checks as per instruction that endpoint does not need authentication
    // if (authLoading) return;
    // if (!isAuthenticated || !token) {
    //   setError("Please log in to view the gallery.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://unizikalumni-api.tfnsolutions.us/api/gallery',
        headers: {
          'Accept': 'application/json',
          // Removed Authorization header as endpoint does not need authentication
          // 'Authorization': `Bearer ${token}`
        },
      };
      const response = await axios.request(config);

      // IMPORTANT FIX CONFIRMATION:
      // The API response structure: { "message": "...", "data": { "data": [...] } }
      // The actual gallery items are nested under response.data.data
      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
        setGalleryItems(response.data.data.data); // Accessing the nested 'data' array
      } else {
        setGalleryItems([]);
        setError("Invalid gallery data format from API. Expected data.data array.");
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
      // Removed specific 401 error handling as authentication is not needed
      // if (err.response?.status === 401) {
      //   setError("Authentication failed. Please log in again.");
      // } else
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load gallery. Please try again.");
      }
      setGalleryItems([]); // Ensure state is empty on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch gallery items directly on component mount, as no auth is needed
    fetchGallery();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleGalleryClick = (gallery) => {
    setSelectedGalleryImages(gallery.image_url || []); // Use image_url array for popup
    setSelectedGalleryTitle(gallery.title || "Gallery");
    setCurrentImageIndex(0); // Start with the first image in the modal
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGalleryImages([]); // Clear images when modal closes
    setCurrentImageIndex(0); // Reset image index
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedGalleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedGalleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Removed authentication loading and not authenticated render blocks
  // as per instruction that endpoint does not need authentication.

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto px-6 py-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
            <Link to="/add-gallery">
              <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
                Add New Gallery
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin mr-2" size={24} /> Loading gallery...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8 text-red-500">
              {error}
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="flex justify-center items-center py-8 text-gray-500">
              No gallery items found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleGalleryClick(item)} // Handle click to open modal
                >
                  <div className="h-48 overflow-hidden">
                    {/* Display the first image from image_url array */}
                    <img
                      src={item.image_url?.[0] || "https://placehold.co/400x300/cccccc/ffffff?text=No+Image"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x300/cccccc/ffffff?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{item.title || "Untitled Gallery"}</h3>
                    <p className="text-sm text-gray-500">{item.date_of_event || "No Date"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={closeModal} // Close modal when clicking outside content
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-auto overflow-hidden relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">{selectedGalleryTitle}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body - Image Carousel */}
            <div className="relative p-4 flex items-center justify-center min-h-[300px] max-h-[calc(100vh-200px)]">
              {selectedGalleryImages.length > 0 ? (
                <>
                  <img
                    src={selectedGalleryImages[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1} of ${selectedGalleryTitle}`}
                    className="max-w-full max-h-full object-contain rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Load+Error";
                    }}
                  />
                  {/* Navigation Arrows */}
                  {selectedGalleryImages.length > 1 && (
                    <>
                      <button
                        onClick={goToPreviousImage}
                        className="absolute left-2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all focus:outline-none"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={goToNextImage}
                        className="absolute right-2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all focus:outline-none"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  {/* Image counter */}
                  {selectedGalleryImages.length > 0 && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-75 text-white text-xs px-3 py-1 rounded-full">
                          {currentImageIndex + 1} / {selectedGalleryImages.length}
                      </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500">No images available for this gallery.</div>
              )}
            </div>
            {/* Modal Footer (optional, could add description here) */}
            {/* <div className="p-4 border-t">
              <p className="text-sm text-gray-600">Additional details about the image.</p>
            </div> */}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default GalleryListPage
