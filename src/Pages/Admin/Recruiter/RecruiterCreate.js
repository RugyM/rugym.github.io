import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecruiterCreateForm from "../../../Components/Recruiters/RecruiterCreateForm";
import { useAuth } from "../../../Providers/AuthContext";
import axios from "axios";
const RecruiterCreate = ({ recruiter }) => {
    const { token, user } = useAuth();
    const [isSubmitShaking, setIsSubmitShaking] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const handleShowList = () => {
        navigate(`${location.pathname.replace("/create", "")}`);
    };
    const handleRecruiterSubmit = async (values, { resetForm }) => {
        setIsSubmitShaking(true);
        setTimeout(() => setIsSubmitShaking(false), 500);
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        try {
            if (recruiter) {
                const existingRecruiter = await axios.get(`/api/admin/recruiter?email=${values.email}`, { headers });
                if (existingRecruiter.data.success &&
                    existingRecruiter.data.recruiter) {
                    alert("A recruiter with this email already exists.");
                    return;
                }
            }
            else {
                const recruiterData = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    companyName: values.companyName,
                    jobTitle: values.jobTitle,
                    industrySpecialization: values.industrySpecialization,
                };
                // Create new recruiter
                await axios.post("/api/admin/recruiter", recruiterData, {
                    headers,
                });
            }
            // Reset the form values
            resetForm();
            // Show success toast
            setToastMessage("Recruiter Created Successfully.");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
        catch (error) {
            console.error("Error saving recruiter:", error.response?.data || error);
        }
    };
    return (_jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800", children: [_jsx("button", { className: "mb-5 rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600", onClick: handleShowList, children: "Go to Recruiters List" }), showToast && (_jsxs("div", { id: "toast-success", className: "absolute right-3 top-16 z-50 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800", role: "alert", children: [_jsxs("div", { className: "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: [_jsx("svg", { className: "h-5 w-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" }) }), _jsx("span", { className: "sr-only", children: "Check icon" })] }), _jsx("div", { className: "ms-3 text-sm font-normal", children: toastMessage })] })), _jsx(RecruiterCreateForm, { onSubmit: handleRecruiterSubmit })] }));
};
export default RecruiterCreate;
