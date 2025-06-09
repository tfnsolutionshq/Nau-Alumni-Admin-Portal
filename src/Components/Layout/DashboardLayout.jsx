import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Import useAuth hook
import { LogOut, PowerOffIcon } from 'lucide-react';

// Icons (keep your existing icons)
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const DonationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MemberIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const AccountIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const SuggestionBoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
);

const GalleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const EventsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const PaymentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const ApplicationsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ManageUsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SurveyResponses = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.670 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);


const DashboardLayout = ({ children }) => {
    // We can now get user info from context if it's stored there
    const { logout, user } = useAuth(); // Get logout function and user object from AuthContext
    const userName = user ? user.name : 'Guest'; // Use user.name from context, fallback to 'Guest'
    const userEmail = user ? user.email : 'guest@example.com'; // Use user.email from context

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const location = useLocation();
    const navigate = useNavigate();

    // Update page title based on current route
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setPageTitle('Home');
        else if (path.includes('/donations')) setPageTitle('Donations');
        else if (path.includes('/members')) setPageTitle('Members');
        else if (path.includes('/suggestions')) setPageTitle('Suggestion Box');
        else if (path.includes('/gallery')) setPageTitle('Gallery');
        else if (path.includes('/events') || path.includes('/news')) setPageTitle('Events & News');
        else if (path.includes('/payments')) setPageTitle('Payments');
        else if (path.includes('/applications')) setPageTitle('Applications');
        else if (path.includes('/users')) setPageTitle('Manage Users');
        else if (path.includes('/chambers')) setPageTitle('Member Chamber');
        else setPageTitle('Home');
    }, [location]);

    const handleLogoutClick = async () => {
        const success = await logout(); // Call the logout function from AuthContext
        if (success) {
            navigate("/login"); // Redirect only if logout process (including API call) indicates success
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-20">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-md bg-[#066AAB] text-white"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-10 w-64 bg-[#066AAB] text-white flex flex-col h-full transition-transform duration-300 ease-in-out`}>
                {/* Logo */}
                <div className="p-4 border-white">
                    <img
                        src="https://github.com/tfnsolutionshq/Unizik-Alumni-Assets/blob/main/unizik-logo%201.png?raw=true"
                        alt="Nnamdi Azikiwe University"
                        className="h-14"
                    />
                    <h1></h1>
                </div>
                <hr className='mx-3' />
                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-2">
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname === '/' ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <HomeIcon />
                                <span className="ml-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/donations"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/donations') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <DonationIcon />
                                <span className="ml-3">Donations</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/members"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/members') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <MemberIcon />
                                <span className="ml-3">Members</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/suggestions"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/suggestions') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <SuggestionBoxIcon />
                                <span className="ml-3">Suggestion Box</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/gallery"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/gallery') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <GalleryIcon />
                                <span className="ml-3">Gallery</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/news-and-events"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/events') || location.pathname.includes('/news') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <EventsIcon />
                                <span className="ml-3">Events & News</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/payments"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/payments') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <PaymentsIcon />
                                <span className="ml-3">Payments</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/applications"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/applications') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <ApplicationsIcon />
                                <span className="ml-3">Applications</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/users') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <ManageUsersIcon />
                                <span className="ml-3">Manage Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/survey-responses"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/users') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <SurveyResponses />
                                <span className="ml-3">Surveys</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/chambers"
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname.includes('/chambers') ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <AccountIcon />
                                <span className="ml-3">Member Chamber</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Support & User Info */}
                <div className="px-4 py-2 border-t border-blue-800">
                    <button
                        className="flex items-center text-sm w-full hover:bg-blue-800 rounded-md px-4 py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <SupportIcon />
                        <span className="ml-3">Support</span>
                    </button>

                    {/* User Info and Logout Button */}
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-blue-800">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                <PowerOffIcon size={20} />
                            </div>
                            <div className="ml-3">
                                <div className="text-sm font-medium">{userName}</div>
                                <div className="text-xs text-blue-200">{userEmail}</div> {/* Display user email from context */}
                            </div>
                        </div>
                        {/* Logout Button */}
                        <button
                            onClick={handleLogoutClick} // Use the new handler name
                            className="p-2 rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b z-10">
                    <div className="flex items-center justify-between py-4 px-6">
                        <h1 className="text-lg font-medium">{pageTitle}</h1>

                        <div className="flex items-center space-x-4">
                            {/* Search - Hidden on small screens */}
                            <div className="relative hidden md:block">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Notifications */}
                            <button className="p-1 rounded-full hover:bg-gray-100">
                                <NotificationIcon />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;