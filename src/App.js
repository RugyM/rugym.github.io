import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import Hiw from "./Pages/Guest/Hiw"; // Import the new page
import Pricing from "./Pages/Guest/Pricing"; // Import the new Pricing page
const App = () => {
    const location = useLocation();
    useEffect(() => {
        initFlowbite();
    }, [location]);
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(GuestLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "attempt-quiz/:id/:studentId", element: _jsx(AttemptQuiz, {}) }), _jsx(Route, { path: "hiw", element: _jsx(Hiw, {}) }), "  ", _jsx(Route, { path: "pricing", element: _jsx(Pricing, {}) }), "  "] }), _jsxs(Route, { path: "auth", element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "register", element: _jsx(Register, {}) }), _jsx(Route, { path: "forgot-password", element: _jsx(ForgotPassword, {}) })] }), _jsxs(Route, { path: "admin", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Overview, {}) }), _jsx(Route, { path: "profile", element: _jsx(AdminProfile, {}) }), _jsxs(Route, { path: "recruiter", children: [_jsx(Route, { index: true, element: _jsx(RecruiterIndex, {}) }), _jsx(Route, { path: "create", element: _jsx(RecruiterCreate, {}) })] }), _jsxs(Route, { path: "quizzes", children: [_jsx(Route, { index: true, element: _jsx(QuizzesIndex, {}) }), _jsx(Route, { path: "create", element: _jsx(QuizzesCreate, {}) })] })] }), _jsxs(Route, { path: "recruiter", element: _jsx(RecruiterLayout, {}), children: [_jsx(Route, { path: "profile", element: _jsx(RecruiterProfile, {}) }), _jsxs(Route, { path: "quizzes", children: [_jsx(Route, { index: true, element: _jsx(RecruiterQuizzesIndex, {}) }), _jsx(Route, { path: "create", element: _jsx(RecruiterQuizzesCreate, {}) })] })] })] }) }));
};
export default App;
