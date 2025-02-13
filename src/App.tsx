import { Route, Routes } from "react-router";
import AuthLayout from "./Pages/Layouts/AuthLayout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Guest/Home";
import GuestLayout from "./Pages/Layouts/GuestLayout";
import AuthProvider from "./Providers/AuthContext";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminLayout from "./Pages/Layouts/AdminLayout";
import RecruiterLayout from "./Pages/Layouts/RecruiterLayout";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import Overview from "./Pages/Admin/Overview";
import RecruiterIndex from "./Pages/Admin/Recruiter/RecruiterIndex";
import RecruiterCreate from "./Pages/Admin/Recruiter/RecruiterCreate";
import QuizzesIndex from "./Pages/Admin/Quizzes/QuizzesIndex";
import QuizzesCreate from "./Pages/Admin/Quizzes/QuizzesCreate";
import RecruiterQuizzesIndex from "./Pages/Recruiter/Quizzes/QuizzesIndex";
import RecruiterQuizzesCreate from "./Pages/Recruiter/Quizzes/QuizzesCreate";
import RecruiterProfile from "./Pages/Recruiter/Profile/RecruiterProfile";
import AdminProfile from "./Pages/Admin/Profile/AdminProfile";
import AttemptQuiz from "./Pages/Guest/AttemptQuiz";
import Hiw from "./Pages/Guest/Hiw";  // Import the new page
import Pricing from "./Pages/Guest/Pricing";  // Import the new Pricing page

const App = () => {
  const location = useLocation();
  useEffect(() => {
    initFlowbite();
  }, [location]);

  return (
    <AuthProvider>
      <Routes>
        {/* Guest routes */}
        <Route element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="attempt-quiz/:id/:studentId" element={<AttemptQuiz />} />
          <Route path="hiw" element={<Hiw />} />  {/* Add the route for Hiw page */}
          <Route path="pricing" element={<Pricing />} />  {/* Add the route for Pricing page */}
        </Route>
        {/* Auth routes */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        {/* Admin routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="recruiter">
            <Route index element={<RecruiterIndex />} />
            <Route path="create" element={<RecruiterCreate />} />
          </Route>
          <Route path="quizzes">
            <Route index element={<QuizzesIndex />} />
            <Route path="create" element={<QuizzesCreate />} />
          </Route>
        </Route>
        {/* Recruiter routes */}
        <Route path="recruiter" element={<RecruiterLayout />}>
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="quizzes">
            <Route index element={<RecruiterQuizzesIndex />} />
            <Route path="create" element={<RecruiterQuizzesCreate />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
