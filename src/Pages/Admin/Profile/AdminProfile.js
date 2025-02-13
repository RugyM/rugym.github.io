import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, TextInput } from "flowbite-react";
import { useAuth } from "../../../Providers/AuthContext";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be 50 characters or less")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phone: Yup.string().matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    companyName: Yup.string().max(100, "Company name should not exceed 100 characters"),
    jobTitle: Yup.string().min(2, "Job title must be at least 2 characters"),
    industrySpecialization: Yup.string(),
});
const AdminProfile = () => {
    const { user, updateProfile } = useAuth();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();
    // Wait until user data is available
    if (!user) {
        return _jsx("div", { children: "Loading..." });
    }
    const initialValues = {
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        companyName: user?.companyName || "",
        jobTitle: user?.jobTitle || "",
        industrySpecialization: user?.industrySpecialization || "",
        password: "",
    };
    const handleSubmit = async (values) => {
        const updatedUser = { ...values };
        await updateProfile(updatedUser);
        setToastMessage("Profile Updated Successfully.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        navigate("/admin/profile");
    };
    return (_jsxs(_Fragment, { children: [showToast && (_jsxs("div", { id: "toast-success", className: "absolute right-3 top-16 z-50 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800", role: "alert", children: [_jsxs("div", { className: "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: [_jsx("svg", { className: "h-5 w-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" }) }), _jsx("span", { className: "sr-only", children: "Check icon" })] }), _jsx("div", { className: "ms-3 text-sm font-normal", children: toastMessage })] })), _jsx("div", { className: "", children: _jsx("div", { className: "", children: _jsx("div", { className: "relative border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg", children: _jsx(Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleSubmit, children: ({ isSubmitting }) => (_jsxs(Form, { children: [_jsx("h2", { className: "mb-4 border-b border-gray-200 pb-4 text-lg font-semibold text-gray-900 dark:text-white", children: "Personal Information" }), _jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "username", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Username" }), _jsx(Field, { as: TextInput, name: "username", id: "username", required: true, className: "block w-full rounded-lg text-sm" }), _jsx(ErrorMessage, { name: "username", component: "div", className: "text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Email Address" }), _jsx(Field, { as: TextInput, name: "email", id: "email", required: true, className: "block w-full rounded-lg text-sm" }), _jsx(ErrorMessage, { name: "email", component: "div", className: "text-red-500" })] }), _jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "password", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Password (Leave blank to keep current)" }), _jsx(Field, { as: TextInput, type: "password", name: "password", id: "password", className: "block w-full rounded-lg text-sm" }), _jsx(ErrorMessage, { name: "password", component: "div", className: "text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "phone", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Phone Number" }), _jsx(Field, { as: TextInput, name: "phone", id: "phone", className: "block w-full rounded-lg text-sm" }), _jsx(ErrorMessage, { name: "phone", component: "div", className: "text-red-500" })] })] }), _jsx("h2", { className: "mb-4 border-y border-gray-200 py-4 text-lg font-semibold text-gray-900 dark:text-white", children: "Professional Details" }), _jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "companyName", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Company Name (if applicable)" }), _jsx(Field, { as: TextInput, name: "companyName", id: "companyName", className: "block w-full rounded-lg text-sm" }), _jsx(ErrorMessage, { name: "companyName", component: "div", className: "text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "jobTitle", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Job Title" }), _jsx(Field, { as: TextInput, name: "jobTitle", id: "jobTitle", className: "block w-full rounded-lg text-sm" }), _jsx(ErrorMessage, { name: "jobTitle", component: "div", className: "text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "industrySpecialization", className: "mb-2 block text-sm font-medium text-gray-900 dark:text-white", children: "Industry Specialization" }), _jsxs(Field, { as: "select", name: "industrySpecialization", id: "industrySpecialization", className: "block w-full rounded-lg border-gray-300 bg-gray-50 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white", children: [_jsx("option", { value: "", children: "Select Industry" }), _jsx("option", { value: "IT", children: "IT" }), _jsx("option", { value: "Healthcare", children: "Healthcare" }), _jsx("option", { value: "Finance", children: "Finance" }), _jsx("option", { value: "Education", children: "Education" }), _jsx("option", { value: "Other", children: "Other" })] }), _jsx(ErrorMessage, { name: "industrySpecialization", component: "div", className: "text-red-500" })] })] }), _jsx(Button, { type: "submit", disabled: isSubmitting, className: "mt-4 inline-flex w-full justify-center rounded-lg bg-primary-700 px-4 py-1 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800", children: "Update Profile" })] })) }) }) }) })] }));
};
export default AdminProfile;
