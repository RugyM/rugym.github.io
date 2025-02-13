import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import QuizCreateForm from "../../../Components/Quizzes/QuizCreateForm";
import QuizTable from "../../../Components/Quizzes/QuizTable";
import { useAuth } from "../../../Providers/AuthContext";
const QuizzesIndex = () => {
    const { token, user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [editingQuiz, setEditingQuiz] = useState(null);
    const [showQuizTable, setShowQuizTable] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recruiterId = user ? user._id : null;
    const quizzesPerPage = 10;
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    // Fetch quizzes on initial load or token change
    useEffect(() => {
        const fetchQuizzes = async (page = 1) => {
            try {
                const response = await axios.get(`/api/quizzes?page=${page}&limit=${quizzesPerPage}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setQuizzes(response.data.quizzes);
                setTotalQuizzes(response.data.quizzes.length);
            }
            catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes(currentPage);
    }, [token, currentPage]);
    const toggleModal = () => setIsModalOpen((prev) => !prev);
    const addQuiz = async (newQuiz, { resetForm }) => {
        if (isSubmitting)
            return; // Prevent duplicate submissions
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/quizzes/create", newQuiz, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuizzes((prevQuizzes) => [...prevQuizzes, response.data.quiz]);
            setTotalQuizzes((prevTotal) => prevTotal + 1);
            resetForm();
            closeForm();
            setToastMessage("Assessment created successfully.");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
        catch (error) {
            console.error("Error adding quiz:", error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const editQuiz = (quizId) => {
        const quizToEdit = quizzes.find((quiz) => quiz._id === quizId);
        if (quizToEdit) {
            setEditingQuiz(quizToEdit);
            setShowQuizTable(false);
        }
    };
    const handleSaveQuiz = async (updatedQuiz) => {
        if (isSubmitting)
            return;
        setIsSubmitting(true);
        try {
            const { recruiterId, ...quizData } = updatedQuiz;
            const quizId = updatedQuiz._id || updatedQuiz.id;
            const response = await axios.put(`/api/quizzes/${quizId}`, quizData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuizzes((prev) => prev.map((quiz) => (quiz._id === quizId ? response.data.quiz : quiz)));
            setEditingQuiz(null);
            setShowQuizTable(true);
            setToastMessage("Quiz updated successfully.");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
        catch (error) {
            console.error("Error saving quiz:", error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const deleteQuiz = async (id) => {
        if (isSubmitting)
            return;
        setIsSubmitting(true);
        try {
            const response = await axios.delete(`/api/admin/quizzes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Update the local state to reflect the deletion
            setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== id));
            setTotalQuizzes((prevTotal) => prevTotal - 1);
            setToastMessage(response.data.message || "Assessment deleted successfully.");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
        catch (error) {
            console.error("Error deleting quiz:", error);
            alert("Failed to delete quiz. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const closeForm = () => {
        setIsModalOpen(false);
        setShowQuizTable(true);
    };
    const resetForm = () => {
        setEditingQuiz(null);
        setShowQuizTable(true);
    };
    const bulkDeleteQuizzes = async (quizIds) => {
        try {
            await axios.post("/api/admin/quizzes/bulk-delete", { quizIds }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuizzes((prev) => prev.filter((q) => !quizIds.includes(q._id)));
            setToastMessage("Selected Quizzes Deleted Successfully.");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
        catch (error) {
            console.error("Error bulk deleting quizzes:", error);
        }
    };
    return (_jsxs("div", { children: [showToast && (_jsxs("div", { id: "toast-success", className: "absolute right-3 top-16 z-50 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800", role: "alert", children: [_jsxs("div", { className: "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: [_jsx("svg", { className: "h-5 w-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" }) }), _jsx("span", { className: "sr-only", children: "Check icon" })] }), _jsx("div", { className: "ms-3 text-sm font-normal", children: toastMessage })] })), showQuizTable ? (_jsx(_Fragment, { children: _jsx(QuizTable, { quizzes: quizzes, onEditQuiz: editQuiz, onDeleteQuiz: deleteQuiz, toggleModal: toggleModal, totalQuizzes: totalQuizzes, currentPage: currentPage, quizzesPerPage: quizzesPerPage, onPageChange: setCurrentPage, onBulkDeleteQuizzes: bulkDeleteQuizzes }) })) : editingQuiz ? (_jsx("div", { id: "editTableMain", children: _jsx(QuizCreateForm, { recruiterId: recruiterId, quiz: editingQuiz, closeForm: closeForm, resetForm: resetForm, onSubmit: (updatedQuiz) => handleSaveQuiz(updatedQuiz), setShowQuizTable: setShowQuizTable }) })) : (_jsxs("div", { id: "createTableMain", children: [_jsx("h2", { className: "py-6 text-center text-3xl font-semibold capitalize text-white", children: "Creating a New Quiz" }), _jsx(QuizCreateForm, { recruiterId: recruiterId, onSubmit: addQuiz, closeForm: closeForm, resetForm: resetForm })] })), isModalOpen && (_jsx("div", { className: "fixed left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:inset-0 md:h-full", children: _jsx("div", { className: "relative w-full max-w-3xl p-4 md:h-auto", children: _jsxs("div", { className: "relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Create Quiz" }), _jsxs("button", { type: "button", onClick: closeForm, className: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white", children: [_jsx("svg", { "aria-hidden": "true", className: "h-5 w-5", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }), _jsx("span", { className: "sr-only", children: "Close modal" })] })] }), _jsx("div", { className: "max-h-[80vh] overflow-auto", children: _jsx(QuizCreateForm, { recruiterId: recruiterId, onSubmit: addQuiz, closeForm: closeForm, resetForm: resetForm }) })] }) }) }))] }));
};
export default QuizzesIndex;
