// "use client"

// import { useState, useEffect } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { useAuth } from "../../Context/AuthContext" // Corrected import path based on previous interaction

// // Icons
// const HomeIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//     />
//   </svg>
// )

// const DonationIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// )

// const MemberIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//     />
//   </svg>
// )

// const AccountIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//     />
//   </svg>
// )

// const SuggestionBoxIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//     </svg>
// );

// const GalleryIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
// );

// const EventsIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
// );

// const PaymentsIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//     </svg>
// );

// const ApplicationsIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//     </svg>
// );

// const ManageUsersIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
// );

// const SurveyResponsesIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M16 16h.01" />
//     </svg>
// );

// const SupportIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
//     </svg>
// );

// const SearchIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
// );

// const NotificationIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.670 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//     </svg>
// );

// const MenuIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
// );

// const CloseIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//     </svg>
// );

// const DashboardLayout = ({ children }) => {
//     // We can now get user info from context if it's stored there
//     const { logout, user } = useAuth(); // Get logout function and user object from AuthContext
//     const userName = user ? user.name : 'Guest'; // Use user.name from context, fallback to 'Guest'
//     const userEmail = user ? user.email : 'guest@example.com'; // Use user.email from context
//     const userInitial = user && user.name ? user.name.charAt(0).toUpperCase() : 'G'; // User initial for avatar


//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [pageTitle, setPageTitle] = useState('Home');
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Update page title based on current route
//     useEffect(() => {
//         const path = location.pathname;
//         if (path === '/') setPageTitle('Home');
//         else if (path.includes('/donations')) setPageTitle('Donations');
//         else if (path.includes('/my-donations')) setPageTitle('My Donations');
//         else if (path.includes('/all-donations')) setPageTitle('All Donations');
//         else if (path.includes('/donation-details')) setPageTitle('Donation Details');
//         else if (path.includes('/create-donation')) setPageTitle('Create New Donation');
//         else if (path.includes('/members')) setPageTitle('Members');
//         else if (path.includes('/alumni-members')) setPageTitle('Alumni Members');
//         else if (path.includes('/alumni-profile-details')) setPageTitle('Alumni Profile');
//         else if (path.includes('/add-member')) setPageTitle('Add New Member');
//         else if (path.includes('/suggestions')) setPageTitle('Suggestion Box');
//         else if (path.includes('/gallery')) setPageTitle('Gallery');
//         else if (path.includes('/add-gallery')) setPageTitle('Add New Gallery');
//         else if (path.includes('/view-gallery')) setPageTitle('View Gallery');
//         else if (path.includes('/news-and-events')) setPageTitle('Events & News');
//         else if (path.includes('/event-details')) setPageTitle('Event Details');
//         else if (path.includes('/news-details')) setPageTitle('News Details');
//         else if (path.includes('/add-event')) setPageTitle('Create New Event');
//         else if (path.includes('/add-news')) setPageTitle('Create New News');
//         else if (path.includes('/alumni-events')) setPageTitle('Alumni Events');
//         else if (path.includes('/alumni-news')) setPageTitle('Alumni News');
//         else if (path.includes('/alumni-event-details')) setPageTitle('Alumni Event Details');
//         else if (path.includes('/alumni-news-details')) setPageTitle('Alumni News Details');
//         else if (path.includes('/payments')) setPageTitle('Payments');
//         else if (path.includes('/applications')) setPageTitle('Applications');
//         else if (path.includes('/users')) setPageTitle('Manage Users');
//         else if (path.includes('/admin-survey-page')) setPageTitle('Manage Surveys');
//         else if (path.includes('/member-chamber')) setPageTitle('Member Chamber');
//         else if (path.includes('/support')) setPageTitle('Support');
//         else setPageTitle('Home');
//     }, [location]);

//     const handleLogoutClick = async () => {
//         const success = await logout(); // Call the logout function from AuthContext
//         if (success) {
//             navigate("/login"); // Redirect only if logout process (including API call) indicates success
//         }
//     };

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMobileMenuOpen(false);
//     }, [location]);

//     // Close mobile menu when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 isMobileMenuOpen &&
//                 !event.target.closest(".mobile-sidebar") &&
//                 !event.target.closest(".mobile-menu-button")
//             ) {
//                 setIsMobileMenuOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isMobileMenuOpen]);

//     return (
//         <div className="flex h-screen overflow-hidden">
//             {/* Mobile Menu Overlay */}
//             {isMobileMenuOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                 />
//             )}

//             {/* Mobile Menu Button - Only visible on small screens */}
//             <div className="lg:hidden fixed top-4 left-4 z-40">
//                 <button
//                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                     className="mobile-menu-button p-2 rounded-md bg-[#066AAB] text-white shadow-lg hover:bg-[#055a96] transition-colors"
//                     aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//                 >
//                     {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
//                 </button>
//             </div>

//             {/* Sidebar */}
//             <div
//                 className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 w-64 bg-[#066AAB] text-white flex flex-col h-full transition-transform duration-300 ease-in-out shadow-xl`}
//             >
//                 {/* Logo */}
//                 <div className="p-4 border-b border-blue-700 flex items-center justify-center">
//                     <img
//                         src="https://github.com/tfnsolutionshq/Unizik-Alumni-Assets/blob/main/unizik-logo%201.png?raw=true"
//                         alt="Nnamdi Azikiwe University"
//                         className="h-12 md:h-14 w-auto"
//                     />
//                 </div>

//                 {/* Navigation */}
//                 <nav className="flex-1 overflow-y-auto py-4">
//                     <ul className="space-y-1">
//                         <li>
//                             <Link
//                                 to="/"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname === '/' ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <HomeIcon />
//                                 <span className="ml-3">Home</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/donations"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/donations') || location.pathname.includes('/my-donations') || location.pathname.includes('/all-donations') || location.pathname.includes('/donation-details') || location.pathname.includes('/create-donation')
//                                         ? 'bg-white text-[#066AAB] shadow-sm'
//                                         : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <DonationIcon />
//                                 <span className="ml-3">Donations</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/members"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/members') || location.pathname.includes('/alumni-members') || location.pathname.includes('/alumni-profile-details') || location.pathname.includes('/add-member')
//                                         ? 'bg-white text-[#066AAB] shadow-sm'
//                                         : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <MemberIcon />
//                                 <span className="ml-3">Members</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/suggestions"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/suggestions') ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <SuggestionBoxIcon />
//                                 <span className="ml-3">Suggestion Box</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/gallery"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/gallery') || location.pathname.includes('/add-gallery') || location.pathname.includes('/view-gallery')
//                                         ? 'bg-white text-[#066AAB] shadow-sm'
//                                         : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <GalleryIcon />
//                                 <span className="ml-3">Gallery</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/news-and-events"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/events') || location.pathname.includes('/news') || location.pathname.includes('/news-and-events') || location.pathname.includes('/event-details') || location.pathname.includes('/news-details') || location.pathname.includes('/add-event') || location.pathname.includes('/add-news') || location.pathname.includes('/alumni-events') || location.pathname.includes('/alumni-news') || location.pathname.includes('/alumni-event-details') || location.pathname.includes('/alumni-news-details')
//                                         ? 'bg-white text-[#066AAB] shadow-sm'
//                                         : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <EventsIcon />
//                                 <span className="ml-3">Events & News</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/payments"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/payments') ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <PaymentsIcon />
//                                 <span className="ml-3">Payments</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/applications"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/applications') ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <ApplicationsIcon />
//                                 <span className="ml-3">Applications</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/users"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/users') ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <ManageUsersIcon />
//                                 <span className="ml-3">Manage Users</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/survey-responses"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/survey-responses') ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <SurveyResponsesIcon />
//                                 <span className="ml-3">Surveys</span>
//                             </Link>
//                         </li>
//                         {/* <li>
//                             <Link
//                                 to="/member-chamber"
//                                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                                     location.pathname.includes('/member-chamber') ? 'bg-white text-[#066AAB] shadow-sm' : 'hover:bg-gray-400 hover:bg-opacity-50'
//                                 }`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 <AccountIcon /> 
//                                 <span className="ml-3">Member Chamber</span>
//                             </Link>
//                         </li> */}
//                         <li>
//                             <a
//                                 href="whatsapp://send?phone=2348063961963&text=Hello, I need support with the Alumni Association Portal."
//                                 rel="noopener noreferrer" target="_blank"
//                                 className="flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-400 hover:bg-opacity-50"
//                                 onClick={() => {
//                                     setIsMobileMenuOpen(false); // Close menu on click
//                                 }}
//                             >
//                                 <SupportIcon />
//                                 <span className="ml-3">Support</span>
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* User Info */}
//                 <div className="p-4 border-t border-white">
//                     <div className="flex items-center border-t border-blue-700">
//                         <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
//                             {userInitial}
//                         </div>
//                         <div className="ml-3 flex-1 min-w-0">
//                             <div className="text-sm font-medium truncate">{userName}</div>
//                             <div className="text-xs text-blue-200 truncate">{userEmail}</div>
//                         </div>
//                         {/* Logout Icon */}
//                         <button
//                             onClick={handleLogoutClick}
//                             className="ml-2 p-2 text-blue-200 hover:text-white hover:bg-gray-400 hover:bg-opacity-50 rounded-full transition-colors duration-200 flex-shrink-0"
//                             title="Logout"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 {/* Header */}
//                 <header className="bg-white border-b border-gray-200 z-30 shadow-sm">
//                     <div className="flex items-center justify-between py-3 px-4 lg:px-6">
//                         {/* Page Title - Adjusted for mobile menu button */}
//                         <div className="flex items-center">
//                             {/* This div acts as a spacer on mobile to prevent title from being under menu button */}
//                             <div className="lg:hidden w-12"></div>
//                             <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{pageTitle}</h1>
//                         </div>

//                         <div className="flex items-center space-x-2 lg:space-x-4">
//                             {/* Search - Hidden on small screens */}
//                             <div className="relative hidden md:block">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                                     <SearchIcon />
//                                 </span>
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                 />
//                             </div>

//                             {/* Notifications */}
//                             <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
//                                 <NotificationIcon />
//                                 {/* Notification badge */}
//                                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                             </button>

//                             {/* User Avatar - Mobile (hidden on large screens) */}
//                             <div className="lg:hidden flex items-center">
//                                 <div className="w-8 h-8 rounded-full bg-[#066AAB] flex items-center justify-center text-white font-bold text-sm">
//                                     {userInitial}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Main Content Area */}
//                 <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;









"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import { LogOut, Bell } from "lucide-react"
import axios from "axios"

// Icons (keep your existing icons)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const DonationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const MemberIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const AccountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const SuggestionBoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  </svg>
)

const GalleryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const EventsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const PaymentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const ApplicationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const ManageUsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

const SurveyResponses = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
    />
  </svg>
)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const DashboardLayout = ({ children }) => {
  // We can now get user info from context if it's stored there
  const { logout, user, token, isAuthenticated } = useAuth() // Get logout function, user object, and token from AuthContext
  const userName = user ? user.name : "Guest" // Use user.name from context, fallback to 'Guest'
  const userEmail = user ? user.email : "guest@example.com" // Use user.email from context

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [pageTitle, setPageTitle] = useState("Home")
  const location = useLocation()
  const navigate = useNavigate()
  const [showOverlay, setShowOverlay] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  // Refs for click outside detection
  const notificationRef = useRef(null)
  const sidebarRef = useRef(null)

  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname
    if (path === "/") setPageTitle("Home")
    else if (path.includes("/donations")) setPageTitle("Donations")
    else if (path.includes("/members")) setPageTitle("Members")
    else if (path.includes("/suggestions")) setPageTitle("Suggestion Box")
    else if (path.includes("/gallery")) setPageTitle("Gallery")
    else if (path.includes("/events") || path.includes("/news")) setPageTitle("Events & News")
    else if (path.includes("/payments")) setPageTitle("Payments")
    else if (path.includes("/applications")) setPageTitle("Applications")
    else if (path.includes("/users")) setPageTitle("Manage Users")
    else if (path.includes("/chambers")) setPageTitle("Member Chamber")
    else setPageTitle("Home")
  }, [location])

  // Fetch notifications on component mount and periodically
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchNotifications()
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, token])

  const handleLogoutClick = async () => {
    const success = await logout() // Call the logout function from AuthContext
    if (success) {
      navigate("/login") // Redirect only if logout process (including API call) indicates success
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setShowOverlay(!showOverlay)
  }

  // Add this useEffect to handle body scroll lock when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setShowOverlay(false)
  }, [location])

  // Close notifications and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }

      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false)
        setShowOverlay(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications, isMobileMenuOpen])

  const fetchNotifications = async () => {
    if (!isAuthenticated || !token) return

    try {
      setLoadingNotifications(true)
      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/user/notifications",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      console.log("Notifications response:", response.data) // Debug log
      const notificationsData = response.data || []
      setNotifications(notificationsData)

      // Count unread notifications
      const unread = notificationsData.filter((notification) => !notification.read_at).length
      setUnreadCount(unread)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoadingNotifications(false)
    }
  }

  const markAsRead = async (notificationId) => {
    if (!isAuthenticated || !token) return

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/notification/mark-read",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          notification_id: notificationId,
        }),
      }

      await axios.request(config)

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, read_at: new Date().toISOString() } : notification,
        ),
      )

      // Update unread count
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    if (!isAuthenticated || !token) return

    // Mark each unread notification as read
    const unreadNotifications = notifications.filter((notification) => !notification.read_at)

    for (const notification of unreadNotifications) {
      await markAsRead(notification.id)
    }
  }

  const formatNotificationType = (type) => {
    if (!type) return "Notification"
    if (type.includes("Suggestion")) return "Suggestion"
    if (type.includes("Member")) return "Member"
    if (type.includes("Event")) return "Event"
    if (type.includes("Donation")) return "Donation"
    return "Notification"
  }

  const formatTimeAgo = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={toggleMobileMenu}
          className="mobile-menu-button p-2 rounded-md bg-[#066AAB] text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => {
            setIsMobileMenuOpen(false)
            setShowOverlay(false)
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`mobile-sidebar ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative z-30 w-64 bg-[#066AAB] text-white flex flex-col h-full transition-transform duration-300 ease-in-out shadow-xl`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-700">
          <img
            src="https://github.com/tfnsolutionshq/Unizik-Alumni-Assets/blob/main/unizik-logo%201.png?raw=true"
            alt="Nnamdi Azikiwe University"
            className="h-14 mx-auto lg:mx-0"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname === "/"
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <HomeIcon />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/donations"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/donations")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <DonationIcon />
                <span className="ml-3">Donations</span>
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/members")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <MemberIcon />
                <span className="ml-3">Members</span>
              </Link>
            </li>
            <li>
              <Link
                to="/suggestions"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/suggestions")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <SuggestionBoxIcon />
                <span className="ml-3">Suggestion Box</span>
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/gallery")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <GalleryIcon />
                <span className="ml-3">Gallery</span>
              </Link>
            </li>
            <li>
              <Link
                to="/news-and-events"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/events") || location.pathname.includes("/news")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <EventsIcon />
                <span className="ml-3">Events & News</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payments"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/payments")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <PaymentsIcon />
                <span className="ml-3">Payments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/applications"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/applications")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <ApplicationsIcon />
                <span className="ml-3">Applications</span>
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/users")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <ManageUsersIcon />
                <span className="ml-3">Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/survey-responses"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/survey-responses")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <SurveyResponses />
                <span className="ml-3">Surveys</span>
              </Link>
            </li>
            <li>
              <Link
                to="/chambers"
                className={`flex items-center mx-3 rounded-md px-4 py-3 ${
                  location.pathname.includes("/chambers")
                    ? "bg-white text-[#066AAB]"
                    : "hover:bg-blue-700 transition-colors duration-200"
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowOverlay(false)
                }}
              >
                <AccountIcon />
                <span className="ml-3">Member Chamber</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Support & User Info */}
        <div className="px-4 py-2 border-t border-blue-700">
          <a
            href="https://wa.me/1234567890" // Replace with your actual WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm w-full hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
          >
            <SupportIcon />
            <span className="ml-3">Support</span>
          </a>

          {/* User Info and Logout Button */}
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-blue-700">
            <div className="flex items-center overflow-hidden">
              <div className="min-w-[2rem] h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {userName ? userName.charAt(0).toUpperCase() : "G"}
              </div>
              <div className="ml-3 overflow-hidden">
                <div className="text-sm font-medium truncate">{userName}</div>
                <div className="text-xs text-blue-200 truncate">{userEmail}</div>
              </div>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="p-2 rounded-full text-white hover:bg-blue-700 transition-colors duration-200 flex-shrink-0"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow-sm z-20">
          <div className="flex items-center justify-between py-3 px-4 lg:px-6">
            {/* Page Title - Adjusted for mobile menu button */}
            <div className="flex items-center">
              {/* This div acts as a spacer on mobile to prevent title from being under menu button */}
              <div className="lg:hidden w-8"></div>
              <h1 className="text-lg font-medium text-gray-900">{pageTitle}</h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Hidden on small screens */}
              <div className="relative hidden md:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:w-auto pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Close notifications"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[calc(80vh-120px)] overflow-y-auto">
                      {loadingNotifications ? (
                        <div className="p-8 text-center text-gray-500">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                          <p className="mt-4">Loading notifications...</p>
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="h-12 w-12 mx-auto text-gray-300" />
                          <p className="mt-4 font-medium">No notifications yet</p>
                          <p className="text-sm mt-2">You'll see new notifications here</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                              !notification.read_at ? "bg-blue-50" : ""
                            }`}
                            onClick={() => {
                              if (!notification.read_at) {
                                markAsRead(notification.id)
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                  !notification.read_at ? "bg-blue-500" : "bg-gray-300"
                                }`}
                              ></div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                                    {notification.data?.type || formatNotificationType(notification.type)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatTimeAgo(notification.created_at)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-900 mt-1 line-clamp-3">
                                  {notification.data?.message || "New notification"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 bg-gray-50">
                        <button
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
