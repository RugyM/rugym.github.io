import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import QuizCreateForm from "../../../Components/Quizzes/QuizCreateForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Providers/AuthContext";
import axios from "axios";
const QuizzesCreate = ({ quiz }) => {
    const { token, user } = useAuth();
    const recruiterId = user ? user._id : null;
    const [isSubmitShaking, setIsSubmitShaking] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleQuizSubmit = async (values, { resetForm }) => {
        setIsSubmitShaking(true);
        setTimeout(() => setIsSubmitShaking(false), 500);
        // Combine the form values with the logged-in user's _id.
        const quizData = { ...values, recruiterId };
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        try {
            if (quiz) {
                // For editing, use quiz._id in the URL.
                await axios.put(`/api/quizzes/${quiz._id}`, quizData, { headers });
            }
            else {
                // Optionally check for duplicate quiz
                // const existingQuiz = await axios.get(
                //   `/api/quizzes?title=${values.title}&studentName=${values.studentName}`,
                //   { headers },
                // );
                // if (existingQuiz.data.success && existingQuiz.data.quiz) {
                //   alert("A quiz with this title for this student already exists.");
                //   return;
                // }
                // Create a new quiz
                await axios.post("/api/quizzes/create", quizData, {
                    headers,
                });
            }
            resetForm();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
        catch (error) {
            console.error("Error saving quiz:", error);
        }
    };
    const navigate = useNavigate();
    const handleBackToQuizTable = () => {
        navigate("/recruiter/quizzes");
    };
    return (_jsxs("div", { className: "h-full rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800", children: [showToast && (_jsxs("div", { id: "toast-success", className: "absolute right-3 top-16 z-50 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800", role: "alert", children: [_jsxs("div", { className: "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: [_jsx("svg", { className: "h-5 w-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" }) }), _jsx("span", { className: "sr-only", children: "Check icon" })] }), _jsx("div", { className: "ms-3 text-sm font-normal", children: "Assessment created successfully." })] })), _jsx("button", { onClick: handleBackToQuizTable, className: "mb-5 rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600", children: "Back to Assessments List" }), _jsx(QuizCreateForm, { recruiterId: recruiterId, onSubmit: handleQuizSubmit })] }));
};
export default QuizzesCreate;
