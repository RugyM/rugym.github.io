import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import RecruiterDetail from "./RecruiterDetail";
import RecruiterPagination from "./RecruiterPagination";
import DeleteModal from "../../Components/DeleteModal";
// import axios from "axios";
const RecruiterTable = ({ recruiters, onEditRecruiter, onDeleteRecruiter, toggleModal, totalRecruiters, currentPage, recruitersPerPage, onPageChange, onBulkDeleteRecruiters, }) => {
    // const [recruiters, setRecruiters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);
    const [recruiterToDelete, setRecruiterToDelete] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecruiters, setSelectedRecruiters] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState("");
    const filteredRecruiters = recruiters.filter((recruiter) => recruiter.username.toLowerCase().includes(searchTerm.toLowerCase()));
    // Pagination logic: slice the filtered recruiters based on the current page
    const indexOfLastRecruiter = currentPage * recruitersPerPage;
    const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
    const currentRecruiters = filteredRecruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleRecruiterClick = (recruiter) => {
        setSelectedRecruiter(recruiter);
    };
    const handleBackClick = () => {
        setSelectedRecruiter(null);
    };
    const confirmSingleDelete = (recruiter) => {
        setRecruiterToDelete(recruiter);
        setDeleteMessage(`Are you sure you want to delete the assessment "${recruiter.username}"?`);
        setIsModalVisible(true);
    };
    const confirmBulkDelete = () => {
        if (selectedRecruiters.length > 0) {
            setRecruiterToDelete(null);
            setDeleteMessage("Are you sure you want to delete the selected recruiters?");
            setIsModalVisible(true);
        }
    };
    const cancelDelete = () => {
        setRecruiterToDelete(null);
        setIsModalVisible(false);
    };
    const handleDelete = () => {
        if (recruiterToDelete) {
            // Single delete
            onDeleteRecruiter(recruiterToDelete._id);
        }
        else {
            // Bulk delete
            onBulkDeleteRecruiters(selectedRecruiters);
            setSelectedRecruiters([]);
        }
        setIsModalVisible(false);
    };
    return (_jsx("section", { className: "bg-gray-50 antialiased dark:bg-gray-900", children: _jsx("div", { className: "", children: _jsxs("div", { className: "relative border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg", children: [isModalVisible && (_jsx(DeleteModal, { isOpen: isModalVisible, onConfirm: handleDelete, onCancel: cancelDelete, message: deleteMessage })), !selectedRecruiter && (_jsxs("div", { className: "mx-4 flex flex-col items-stretch justify-between space-y-3 py-4 dark:border-gray-700 md:flex-row md:items-center md:space-x-3 md:space-y-0", children: [_jsx("div", { className: "w-full md:w-1/2", children: _jsxs("form", { className: "flex items-center", children: [_jsx("label", { htmlFor: "simple-search", className: "sr-only", children: "Search" }), _jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: _jsx("svg", { "aria-hidden": "true", className: "h-5 w-5 text-gray-500 dark:text-gray-400", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" }) }) }), _jsx("input", { type: "text", id: "simple-search", placeholder: "Search for recruiters", value: searchTerm, onChange: handleSearchChange, className: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" })] })] }) }), _jsxs("div", { className: "flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0", children: [_jsxs("button", { type: "button", id: "createRecruiterButton", onClick: toggleModal, className: "flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800", children: [_jsx("svg", { className: "-ml-1 mr-1.5 h-3.5 w-3.5", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 20 20", children: _jsx("path", { clipRule: "evenodd", fillRule: "evenodd", d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" }) }), "Add Recruiter"] }), _jsx("button", { onClick: confirmBulkDelete, className: `inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white ${selectedRecruiters.length > 0
                                            ? "bg-red-700 hover:bg-red-800"
                                            : "cursor-not-allowed bg-gray-400"}`, disabled: selectedRecruiters.length === 0, children: "Delete Selected" })] })] })), !selectedRecruiter ? (_jsxs("div", { className: "overflow-x-auto", children: [currentRecruiters.length === 0 ? (_jsx("div", { className: "my-6 py-6 text-center text-2xl text-white", children: "No recruiters found." })) : (_jsxs("table", { className: "w-full text-left text-sm text-gray-500 dark:text-gray-400", children: [_jsx("thead", { className: "bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-4 py-3", children: _jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-600", onChange: (e) => {
                                                            if (e.target.checked) {
                                                                setSelectedRecruiters(recruiters.map((q) => q._id));
                                                            }
                                                            else {
                                                                setSelectedRecruiters([]);
                                                            }
                                                        }, checked: selectedRecruiters.length === recruiters.length }) }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "ID" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Username" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Email" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Number" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Company Name" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Job Title" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Industry Specialization" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "Actions" })] }) }), _jsx("tbody", { children: currentRecruiters.map((recruiter, index) => {
                                            const serialNumber = (currentPage - 1) * recruitersPerPage + (index + 1);
                                            return (_jsxs("tr", { className: "border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700", children: [_jsx("td", { className: "whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white", children: _jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-600", checked: selectedRecruiters.includes(recruiter._id), onChange: () => {
                                                                if (selectedRecruiters.includes(recruiter._id)) {
                                                                    setSelectedRecruiters((prev) => prev.filter((q) => q !== recruiter._id));
                                                                }
                                                                else {
                                                                    setSelectedRecruiters((prev) => [
                                                                        ...prev,
                                                                        recruiter._id,
                                                                    ]);
                                                                }
                                                            } }) }), _jsx("td", { className: "whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white", children: serialNumber }), _jsx("td", { className: "whitespace-nowrap font-medium text-gray-900 dark:text-white", children: _jsx("button", { className: "px-4 py-3 font-bold text-sky-500", onClick: () => handleRecruiterClick(recruiter), children: recruiter.username }) }), _jsx("td", { className: "px-4 py-3", children: recruiter.email }), _jsx("td", { className: "px-4 py-3", children: recruiter.phone }), _jsx("td", { className: "px-4 py-3", children: recruiter.companyName }), _jsx("td", { className: "px-4 py-3", children: recruiter.jobTitle }), _jsx("td", { className: "px-4 py-3", children: recruiter.industrySpecialization }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { className: "flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800", onClick: () => onEditRecruiter(recruiter._id), children: "Edit" }), _jsx("button", { type: "button", className: "inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800", onClick: () => confirmSingleDelete(recruiter), children: "Delete" })] }) })] }, recruiter._id));
                                        }) })] })), _jsx(RecruiterPagination, { currentPage: currentPage, totalRecruiters: filteredRecruiters.length, recruitersPerPage: recruitersPerPage, 
                                // onPageChange={(page) => setCurrentPage(page)}
                                onPageChange: onPageChange })] })) : (_jsx(RecruiterDetail, { selectedRecruiter: selectedRecruiter, handleBackClick: handleBackClick }))] }) }) }));
};
export default RecruiterTable;
