import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { ArrowLeft, Search, ChevronDown, ChevronRight, Filter } from "lucide-react"

const DonationList = () => {
    const { id } = useParams() // Get the donation ID from the URL
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [donors, setDonors] = useState([]) // State to hold fetched donors for the specific donation
    const [loading, setLoading] = useState(true) // Loading state
    const [error, setError] = useState(null) // Error state
    const [donationTitle, setDonationTitle] = useState("Selected Donation") // State to display the donation title

    // Fetch all donations and then find the specific one to extract its donators
    useEffect(() => {
        const fetchDonationDetailsAndDonors = async () => {
            setLoading(true)
            setError(null)
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://unizikalumni-api.tfnsolutions.us/api/donations', // Endpoint to get all donations
                    headers: {
                        'Accept': 'application/json',
                    },
                };
                const response = await axios.request(config);

                // Assuming donations data is in response.data.data
                const allDonations = (response.data && Array.isArray(response.data.data))
                                     ? response.data.data
                                     : [];

                // Find the specific donation by ID
                const specificDonation = allDonations.find(
                    (donation) => donation.id === id
                );

                if (specificDonation) {
                    setDonationTitle(specificDonation.title); // Set the donation title
                    if (specificDonation.donators && Array.isArray(specificDonation.donators)) {
                        setDonors(specificDonation.donators); // Set the donators array
                    } else {
                        setDonors([]); // No donators array or it's not an array
                        setError("No donators found for this donation or data format is invalid.");
                    }
                } else {
                    setError("Donation not found.");
                    setDonors([]);
                    setDonationTitle("Donation Not Found"); // Update title if donation not found
                }
            } catch (err) {
                console.error("Error fetching donation details or donors:", err);
                setError("Failed to load donation details or donors. Please try again later.");
                setDonors([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) { // Only fetch if ID is present
            fetchDonationDetailsAndDonors();
        } else {
            setLoading(false);
            setError("No donation ID provided in the URL.");
            setDonationTitle("No Donation Selected");
        }
    }, [id]); // Depend on 'id' to refetch when the ID changes

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    // Filter donors based on search query
    const filteredDonors = donors.filter((donor) =>
        donor.donor_name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Assuming 'donor_name' field
        donor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.amount?.toString().includes(searchQuery.toLowerCase()) // Allow searching by amount as well
    )

    // Helper for formatting date (assuming donation_date field exists for each donor)
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-white">
                <div className="w-full px-6 mx-auto">
                    {/* Header */}
                    <div className="py-4 border-b">
                        <Link to="/donation-management" className="flex items-center shadow p-1 rounded text-gray-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back to Donations
                        </Link>
                    </div>

                    {/* Donation Title Display */}
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-4 mb-6">
                    <span>{donationTitle}</span>
                    </h1>

                    {/* Search and Actions */}
                    <div className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search donors..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <Filter className="w-4 h-4" />
                                Sort By
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="bg-orange-500 text-white flex items-center gap-1 rounded-md px-3 py-2 text-sm">
                                Download List
                            </button>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Loading/Error/No Donors State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-500">Loading donors...</div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-red-500">{error}</div>
                        </div>
                    ) : filteredDonors.length === 0 ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-500">No donors found for this donation.</div>
                        </div>
                    ) : (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-left py-3 px-4 font-medium">DONOR NAME</th>
                                            <th className="text-left py-3 px-4 font-medium">EMAIL</th>
                                            <th className="text-left py-3 px-4 font-medium">PHONE</th>
                                            <th className="text-left py-3 px-4 font-medium">DONATION DATE</th>
                                            <th className="text-left py-3 px-4 font-medium">AMOUNT</th>
                                            <th className="text-right py-3 px-4 font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDonors.map((donor) => (
                                            <tr key={donor.id} className="border-b">
                                                {/* Assuming these fields exist in the donor object from API */}
                                                <td className="py-3 px-4">{donor.member.first_name + " " + donor.member.last_name || "N/A"}</td> {/* member_id used as a placeholder for donor name as per response, adjust if there's a proper 'name' field */}
                                                <td className="py-3 px-4">{donor.member.email || "N/A"}</td> {/* Assuming email field */}
                                                <td className="py-3 px-4">{donor.member.phone || "N/A"}</td> {/* Assuming phone field */}
                                                <td className="py-3 px-4">{formatDate(donor.donation_date)}</td>
                                                <td className="py-3 px-4 text-green-600">₦{parseFloat(donor.amount).toFixed(2)}</td> {/* Format amount */}
                                                <td className="py-3 px-4 text-right">
                                                    {donor.receipt_image_url && (
                                                        <a href={donor.receipt_image_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 flex items-center gap-1 ml-auto hover:underline">
                                                            View Receipt
                                                            <ChevronRight className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="p-4 flex flex-col md:flex-row justify-between items-center">
                                <div className="text-sm text-gray-600 mb-2 md:mb-0">Total: {filteredDonors.length}</div>
                                {/* Basic pagination UI - actual pagination logic would be more complex with API */}
                                <div className="flex items-center gap-1">
                                    <button className="w-8 h-8 flex items-center justify-center border rounded-md" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        className={`w-8 h-8 flex items-center justify-center border rounded-md ${currentPage === 1 ? "bg-gray-100" : ""}`}
                                        onClick={() => handlePageChange(1)}
                                    >
                                        1
                                    </button>
                                    {/* You would dynamically render more page buttons here */}
                                    <button className="w-8 h-8 flex items-center justify-center border rounded-md" onClick={() => handlePageChange(currentPage + 1)}>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-sm text-gray-600 mt-2 md:mt-0 flex items-center gap-1">
                                    {filteredDonors.length} / page
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

// ChevronLeft component definition (moved outside for clarity)
const ChevronLeft = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}

export default DonationList
