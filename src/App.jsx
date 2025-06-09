import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute'; 
import Home from "./Pages/home";
import Login from "./Pages/login";
import Donations from "./Pages/Donations/donation-list";
import CreateDonation from "./Pages/Donations/create-donation";
import Donators from "./Pages/Donations/donators";
import Suggestion from "./Pages/suggestions";
import Applications from "./Pages/Payments/payments";
import ApplicationDetails from "./Pages/Payments/payment-history";
import Members from "./Pages/Members/members";
import AddMember from "./Pages/Members/add-member";
import MemberProfile from './Pages/Members/member-profile'
import Users from './Pages/UserManagement/users'
import UserProfile from './Pages/UserManagement/user-profile'
import UserLogs from './Pages/UserManagement/user-logs'
import AddUser from './Pages/UserManagement/add-new-user'
import NewsDetailsPage from "./Pages/NewsAndEvents/news-details";
import EventDetailsPage from "./Pages/NewsAndEvents/event-details";
import NewNewsPage from "./Pages/NewsAndEvents/add-news";
import NewEvents from "./Pages/NewsAndEvents/add-event";
import NewsAndEvents from "./Pages/NewsAndEvents/news-and-events";
import ApplicantListPage from "./Pages/Applications/applications";
import ApplicantDetailsPage from "./Pages/Applications/application-details";
import Galleria from "./Pages/Galleria/gallery";
import AddGallery from "./Pages/Galleria/add-gallery";
import Chambers from "./Pages/chambers";
import SurveyResponses from './Pages/survey-responses';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/create-donation" element={<CreateDonation />} />
        <Route path="/donators/:id" element={<Donators />} />
        <Route path="/suggestions" element={<Suggestion />} />
        <Route path="/payments" element={<Applications />} />
        <Route path="/payment-history" element={<ApplicationDetails />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/member-profile/:id" element={<MemberProfile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-logs" element={<UserLogs />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/add-new-user" element={<AddUser />} />
        <Route path="/news-details/:id" element={<NewsDetailsPage />} />
        <Route path="/event-details/:id" element={<EventDetailsPage />} />
        <Route path="/add-news" element={<NewNewsPage />} />
        <Route path="/add-event" element={<NewEvents />} />
        <Route path="/news-and-events" element={<NewsAndEvents />} />
        <Route path="/applications" element={<ApplicantListPage />} />
        <Route path="/application-details/:id" element={<ApplicantDetailsPage />} />
        <Route path="/gallery" element={<Galleria />} />
        <Route path="/add-gallery" element={<AddGallery />} />
        <Route path="/chambers" element={<Chambers />} />
        <Route path="/survey-responses" element={<SurveyResponses />} />
      </Route>
    </Routes>
  )
}

export default App
