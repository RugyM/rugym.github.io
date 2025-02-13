import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import QuizDetail from "./QuizDetail";
import QuizPagination from "../Quizzes/QuizPagination";
import DeleteModal from "../../Components/DeleteModal";
const QuizTable = ({ quizzes, onEditQuiz, onDeleteQuiz, toggleModal, currentPage, quizzesPerPage, onPageChange, onBulkDeleteQuizzes, }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [quizToDelete, setQuizToDelete] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState("");
    const quizzesArray = Array.isArray(quizzes) ? quizzes : [];
    const filteredQuizzes = quizzesArray.filter((quiz) => {
        const searchTerm = searchQuery.toLowerCase();
        return (quiz.title.toLowerCase().includes(searchTerm) ||
            quiz.description.toLowerCase().includes(searchTerm) ||
            quiz.studentName.toLowerCase().includes(searchTerm));
    });
    // Pagination logic: slice the filtered quizzes based on the current page
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz);
    };
    const handleBackClick = () => {
        setSelectedQuiz(null);
    };
    const confirmSingleDelete = (quiz) => {
        setQuizToDelete(quiz);
        setDeleteMessage(`Are you sure you want to delete the assessment "${quiz.title}"?`);
        setIsModalVisible(true);
    };
    const confirmBulkDelete = () => {
        if (selectedQuizzes.length > 0) {
            setQuizToDelete(null);
            setDeleteMessage("Are you sure you want to delete the selected assessments?");
            setIsModalVisible(true);
        }
    };
    const cancelDelete = () => {
        setQuizToDelete(null);
        setIsModalVisible(false);
    };
    const handleDelete = () => {
        if (quizToDelete) {
            // Single delete
            onDeleteQuiz(quizToDelete._id);
        }
        else {
            // Bulk delete
            onBulkDeleteQuizzes(selectedQuizzes);
            setSelectedQuizzes([]);
        }
        setIsModalVisible(false);
    };
    return (_jsx(_Fragment, { children: _jsx("section", { className: "bg-gray-50 antialiased dark:bg-gray-900", children: _jsx("div", { className: "", children: _jsxs("div", { className: "relative border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg", children: [isModalVisible && (_jsx(DeleteModal, { isOpen: isModalVisible, onConfirm: handleDelete, onCancel: cancelDelete, message: deleteMessage })), !selectedQuiz && (_jsxs("div", { className: "mx-4 flex flex-col items-stretch justify-between space-y-3 py-4 dark:border-gray-700 md:flex-row md:items-center md:space-x-3 md:space-y-0", children: [_jsx("div", { className: "w-full md:w-1/2", children: _jsxs("form", { className: "flex items-center", children: [_jsx("label", { htmlFor: "simple-search", className: "sr-only", children: "Search" }), _jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: _jsx("svg", { "aria-hidden": "true", className: "h-5 w-5 text-gray-500 dark:text-gray-400", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" }) }) }), _jsx("input", { type: "text", id: "simple-search", value: searchQuery, onChange: handleSearchChange, placeholder: "Search for quizzes", required: true, className: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" })] })] }) }), _jsxs("div", { className: "flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0", children: [_jsxs("button", { type: "button", id: "createQuizButton", onClick: toggleModal, className: "flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800", children: [_jsx("svg", { className: "-ml-1 mr-1.5 h-3.5 w-3.5", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 20 20", children: _jsx("path", { clipRule: "evenodd", fillRule: "evenodd", d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" }) }), "Add Assessment"] }), _jsx("button", { onClick: confirmBulkDelete, className: `inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white ${selectedQuizzes.length > 0
                                                ? "bg-red-700 hover:bg-red-800"
                                                : "cursor-not-allowed bg-gray-400"}`, disabled: selectedQuizzes.length === 0, children: "Delete Selected" })] })] })), !selectedQuiz ? (_jsxs("div", { className: "overflow-auto", children: [currentQuizzes.length === 0 ? (_jsx("div", { className: "my-6 py-6 text-center text-2xl text-white", children: "No quizzes created yet. Create one!" })) : currentQuizzes.length === 0 && searchQuery.trim() ? (_jsx("div", { className: "my-6 py-6 text-center text-2xl text-white", children: "No search results found. Try a different query." })) : (_jsxs("table", { className: "w-full text-left text-sm text-gray-500 dark:text-gray-400", children: [_jsx("thead", { className: "bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "p-4", children: _jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-600", onChange: (e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedQuizzes(quizzes.map((q) => q._id));
                                                                }
                                                                else {
                                                                    setSelectedQuizzes([]);
                                                                }
                                                            }, checked: selectedQuizzes.length === quizzes.length }) }), _jsx("th", { scope: "col", className: "p-4", children: "ID" }), _jsx("th", { scope: "col", className: "p-4", children: "Title" }), _jsx("th", { scope: "col", className: "p-4", children: "Description" }), _jsx("th", { scope: "col", className: "p-4", children: "Candidates" }), _jsx("th", { scope: "col", className: "p-4", children: "Actions" })] }) }), _jsx("tbody", { children: currentQuizzes.map((quiz, index) => {
                                                const serialNumber = (currentPage - 1) * quizzesPerPage + (index + 1);
                                                return (_jsxs("tr", { className: "border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-600", checked: selectedQuizzes.includes(quiz._id), onChange: () => {
                                                                    if (selectedQuizzes.includes(quiz._id)) {
                                                                        setSelectedQuizzes((prev) => prev.filter((q) => q !== quiz._id));
                                                                    }
                                                                    else {
                                                                        setSelectedQuizzes((prev) => [
                                                                            ...prev,
                                                                            quiz._id,
                                                                        ]);
                                                                    }
                                                                } }) }), _jsx("td", { className: "whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white", children: serialNumber }), _jsx("td", { children: _jsx("button", { className: "px-4 py-3 font-bold text-sky-500", onClick: () => handleQuizClick(quiz), children: quiz.title }) }), _jsx("td", { className: "px-4 py-3", children: quiz.description }), _jsx("td", { className: "px-4 py-3", children: quiz.studentNames
                                                                .map((student) => student.name)
                                                                .join(", ") }), _jsxs("td", { className: "relative flex gap-3 px-4 py-3", children: [_jsx("button", { className: "flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800", onClick: () => onEditQuiz(quiz._id), children: "Edit" }), _jsx("button", { type: "button", className: "inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800", onClick: () => confirmSingleDelete(quiz), children: "Delete" })] })] }, quiz._id));
                                            }) })] })), _jsx(QuizPagination, { currentPage: currentPage, totalQuizzes: filteredQuizzes.length, quizzesPerPage: quizzesPerPage, onPageChange: onPageChange })] })) : (_jsx(QuizDetail, { selectedQuiz: selectedQuiz, handleBackClick: handleBackClick }))] }) }) }) }));
};
export default QuizTable;
