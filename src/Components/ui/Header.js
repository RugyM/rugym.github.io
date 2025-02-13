import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation
import { useAuth } from "../../Providers/AuthContext";
// Function to generate initials from username
const getInitials = (name) => {
    const words = name.split(" ").filter(Boolean);
    if (words.length === 1)
        return words[0][0].toUpperCase();
    return words
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
};
// Function to generate dynamic background color
const generateBackgroundColor = (name) => {
    const colors = [
        "#FF5733",
        "#33FF57",
        "#5733FF",
        "#FF33A1",
        "#33A1FF",
        "#A1FF33",
    ];
    const charSum = name
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
};
// Function to determine if the background color is light or dark
const isLightColor = (hex) => {
    const rgb = parseInt(hex.substring(1), 16); // Convert hex to integer
    const r = (rgb >> 16) & 0xff; // Extract red
    const g = (rgb >> 8) & 0xff; // Extract green
    const b = rgb & 0xff; // Extract blue
    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 150; // If luminance is higher, it's a light color
};
const Header = ({ full = false }) => {
    const auth = useAuth();
    const userRole = auth.user?.role;
    // Generate initials and background for the current user
    const userName = auth.user?.username || "Guest";
    const initials = getInitials(userName);
    const bgColor = generateBackgroundColor(userName);
    const textColor = isLightColor(bgColor) ? "text-black" : "text-white";
    return (_jsxs(Navbar, { className: "fixed top-0 z-30 w-full shadow-md", fluid: full, children: [_jsxs(Link, { to: "/", className: "flex items-center", children: [_jsx("img", { src: "/TRANSPARENCY.png", className: "mr-3 h-6 sm:h-9", alt: `${process.env.VITE_APP_NAME} Logo` }), _jsx("span", { className: "-center whitespace-nowrap text-xl font-semibold dark:text-white", children: process.env.VITE_APP_NAME })] }), _jsxs("div", { className: "flex gap-5", children: [auth.check() ? (_jsxs(Dropdown, { arrowIcon: false, inline: true, label: _jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full ${textColor}`, style: { backgroundColor: bgColor }, children: initials }), children: [_jsxs(Dropdown.Header, { children: [_jsx("span", { className: "block text-sm", children: auth.user?.name }), _jsx("span", { className: "block truncate text-sm font-medium", children: auth.user?.email })] }), userRole === "Admin" ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/admin", children: _jsx(Dropdown.Item, { children: "Dashboard" }) }), _jsx(Link, { to: "/admin/recruiter", children: _jsx(Dropdown.Item, { children: "Recruiters" }) }), _jsx(Link, { to: "/admin/quizzes", children: _jsx(Dropdown.Item, { children: "Quizzes" }) }), _jsx(Link, { to: "/admin/profile", children: _jsx(Dropdown.Item, { children: "Profile" }) })] })) : userRole === "Recruiter" ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/recruiter/quizzes", children: _jsx(Dropdown.Item, { children: "Assessments" }) }), _jsx(Link, { to: "/recruiter/profile", children: _jsx(Dropdown.Item, { children: "Profile" }) })] })) : null, _jsx(Dropdown.Divider, {}), _jsx(Dropdown.Item, { onClick: auth.logout, children: "Sign out" })] })) : (_jsxs("div", { className: "flex items-center lg:order-2", children: [_jsx(Link, { to: "/auth/login", className: "mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5", children: "Log in" }), _jsx(Link, { to: "/auth/register", className: "mr-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5", children: "Get started" })] })), _jsx(Link, { to: "/hiw", children: _jsx("button", { className: "mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5", children: "How it Works" }) }), _jsx(Link, { to: "/pricing", children: _jsx("button", { className: "mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5", children: "Pricing" }) })] })] }));
};
export default Header;
