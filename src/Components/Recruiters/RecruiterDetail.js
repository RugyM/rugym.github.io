import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
const RecruiterDetail = ({ selectedRecruiter, handleBackClick }) => {
    const [expandedIdx, setExpandedIdx] = useState(null);
    const toggleAccordion = (idx) => {
        setExpandedIdx(idx === expandedIdx ? null : idx);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800", children: [_jsx("div", { className: "mb-4 flex items-baseline justify-between", children: _jsx("button", { className: "rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600", onClick: handleBackClick, children: "Back to Recruiters List" }) }), _jsx("h3", { className: "mb-4 mt-6 flex items-baseline gap-2 text-4xl font-semibold text-gray-900 dark:text-white", children: selectedRecruiter.username }), _jsxs("p", { className: "mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "w-64", children: "Email:" }), " ", selectedRecruiter.email
                            ? selectedRecruiter.email
                            : "No email provided"] }), _jsxs("p", { className: "mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "w-64", children: "Phone Number:" }), " ", selectedRecruiter.phone
                            ? selectedRecruiter.phone
                            : "No phone number provided"] }), _jsxs("p", { className: "mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "w-64", children: "Company Name:" }), " ", selectedRecruiter.companyName
                            ? selectedRecruiter.companyName
                            : "No company name provided"] }), _jsxs("p", { className: "mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "w-64", children: "Job Title:" }), " ", selectedRecruiter.jobTitle
                            ? selectedRecruiter.jobTitle
                            : "No job title provided"] }), _jsxs("p", { className: "mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "w-64", children: "Industry Specialization:" }), " ", selectedRecruiter.industrySpecialization
                            ? selectedRecruiter.industrySpecialization
                            : "No industry specialization provided"] })] }) }));
};
export default RecruiterDetail;
