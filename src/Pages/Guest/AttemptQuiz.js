import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router";
import { executeCode } from "../../../server/utils/api";
import { CODE_SNIPPETS } from "../../../server/utils/constants";
import axios from "axios";
function AttemptQuiz() {
    const [started, setStarted] = useState(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(CODE_SNIPPETS[language]);
    const [output, setOutput] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { id, studentId } = useParams();
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`/api/users/guest/attempt-quiz/${id}/${studentId}`);
                setQuiz(response.data.quiz);
                setAnswers(new Array(response.data.quiz.questions.length).fill(""));
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching quiz data:", error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id, studentId]);
    const handleStartClick = () => setStarted(true);
    const handleNextClick = () => {
        setShowConfirmation(true);
    };
    const handleConfirmNext = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIdx] = {
            answer: code,
            language: language,
        };
        setAnswers(updatedAnswers); // Update the answers array
        setShowConfirmation(false);
        setOutput("");
        if (currentQuestionIdx < quiz.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
            setCode(updatedAnswers[currentQuestionIdx + 1]?.answer || "");
        }
    };
    const handleCancelNext = () => setShowConfirmation(false);
    const handleConfirmFinal = async () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIdx] = {
            answer: code,
            language: language,
        };
        setAnswers(updatedAnswers); // Update the answers array
        setShowFinalConfirmation(false);
        try {
            const response = await axios.post(`/api/users/guest/attempt-quiz/${id}/${studentId}/attempt`, {
                answers: updatedAnswers,
            });
            if (response.status === 200) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 5000);
                setQuizCompleted(true);
            }
        }
        catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };
    const handleCancelFinal = () => setShowFinalConfirmation(false);
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        setCode(CODE_SNIPPETS[newLanguage]);
    };
    const handleRunCode = async () => {
        if (!code.trim()) {
            setOutput("No code provided.");
            return;
        }
        try {
            const result = await executeCode(language, code);
            const outputData = result.run.output || result.run.stderr || "No output.";
            setOutput(outputData);
        }
        catch (error) {
            console.error("Execution Error:", error.message);
            setOutput(`Error: ${error.message}`);
        }
    };
    if (loading) {
        return _jsx("p", { children: "Loading quiz..." });
    }
    if (!quiz) {
        return _jsx("p", { children: "Quiz not found or unavailable." });
    }
    if (quiz.paymentRequired === "true") {
        return (_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "mb-3 text-4xl font-semibold text-gray-900 dark:text-white", children: "Payment Required!" }), _jsx("p", { className: "mb-3 text-lg text-gray-700 dark:text-gray-300", children: "Ask your recruiter to pay for quiz to continue on attempting your quiz!" })] }));
    }
    const handleNext = () => {
        if (currentQuestionIdx < quiz.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        }
    };
    const handlePrev = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
        }
    };
    const stripHTMLTags = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };
    const studentAttempt = quiz.studentAttempts.find((attempt) => attempt.studentId === studentId);
    const currentQuestion = quiz.questions[currentQuestionIdx];
    const answerData = studentAttempt?.answers[currentQuestionIdx];
    const feedbackAvailable = answerData?.feedback?.trim();
    const hasAnyFeedback = studentAttempt?.answers.some((answer) => answer?.feedback?.trim());
    if (quiz.studentNames.find((student) => student.id === studentId)
        .attemptLimit === 0) {
        return (_jsx(_Fragment, { children: !hasAnyFeedback ? (_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "mb-3 text-4xl font-semibold text-gray-900 dark:text-white", children: "Quiz Already Attempted!" }), _jsx("p", { className: "mb-3 text-lg text-gray-700 dark:text-gray-300", children: "You have already attempted your quiz. Wait for your feedback from the recruiter!" })] })) : (_jsxs("div", { className: "w-[90%] p-6", children: [_jsx("h2", { className: "mb-3 text-center text-4xl font-bold text-gray-900 dark:text-white", children: "Recruiters Feedback" }), _jsx("h2", { className: "mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white", children: quiz.title }), _jsx("p", { className: "mb-5 mt-0 text-center text-lg font-medium text-gray-700 dark:text-white", children: quiz.description }), _jsxs("p", { className: "mb-2 text-center text-xl font-bold text-gray-700 dark:text-white", children: ["Question ", currentQuestionIdx + 1, " of ", quiz.questions.length] }), _jsxs("div", { className: "mx-auto w-4/5", children: [_jsxs("div", { className: "block max-h-[350px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700", children: [_jsx("h3", { className: "mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white", children: currentQuestion.title }), _jsxs("p", { className: "mb-3 flex gap-2 text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "block min-w-[81px]", children: "Scenario:" }), " ", stripHTMLTags(currentQuestion.scenario)] }), _jsxs("p", { className: "mb-4 flex gap-2 text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "block min-w-[81px]", children: "Answer:" }), " ", answerData?.answer || "Awaiting answer"] }), answerData?.answer && (_jsxs("p", { className: "flex gap-2 text-gray-700 dark:text-gray-300", children: [_jsx("strong", { className: "block min-w-[81px]", children: "Feedback:" }), " ", feedbackAvailable ? (answerData.feedback) : (_jsx("span", { className: "text-red-500", children: "Ask your recruiter to provide feedback on this question." }))] }))] }), _jsxs("div", { className: "mt-3 flex justify-between", children: [_jsx("button", { onClick: handlePrev, disabled: currentQuestionIdx === 0, className: `rounded-md px-4 py-2 ${currentQuestionIdx === 0
                                            ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                            : "bg-blue-500 text-white hover:bg-blue-600"}`, children: "Previous" }), _jsx("button", { onClick: handleNext, disabled: currentQuestionIdx === quiz.questions.length - 1, className: `rounded-md px-4 py-2 ${currentQuestionIdx === quiz.questions.length - 1
                                            ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                            : "bg-blue-500 text-white hover:bg-blue-600"}`, children: "Next" })] })] })] })) }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mx-auto mt-10 h-full w-[90%] content-center rounded-lg bg-gray-50 p-3 dark:bg-gray-800", children: [showToast && (_jsxs("div", { id: "toast-success", className: "fixed right-10 top-24 z-10 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800", role: "alert", children: [_jsxs("div", { className: "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: [_jsx("svg", { className: "h-5 w-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" }) }), _jsx("span", { className: "sr-only", children: "Check icon" })] }), _jsx("div", { className: "ms-3 text-sm font-normal", children: "Quiz submitted successfully!" })] })), !quizCompleted ? (
                    // Only show quiz content if not completed
                    !started ? (_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "mb-3 text-4xl font-semibold text-gray-900 dark:text-white", children: quiz.title }), _jsx("p", { className: "mb-3 text-lg text-gray-700 dark:text-gray-300", children: quiz.description }), _jsx("button", { onClick: handleStartClick, className: "mt-5 rounded-md bg-blue-500 px-5 py-2 text-lg text-white hover:bg-blue-600", children: "Start Quiz" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-6 flex justify-center pb-5 pt-6 text-3xl dark:text-white", children: _jsxs("span", { children: ["Question ", currentQuestionIdx + 1, " of ", quiz.questions.length] }) }), _jsxs("div", { children: [_jsxs("h3", { className: "mb-3 text-2xl text-gray-700 dark:text-gray-300", children: [_jsx("span", { className: "pr-2 font-semibold text-gray-900 dark:text-white", children: "Question Title:" }), " ", quiz.questions[currentQuestionIdx].title] }), _jsxs("p", { className: "mb-3 text-xl text-gray-700 dark:text-gray-300", children: [_jsx("span", { className: "pr-2 text-2xl font-semibold text-gray-900 dark:text-white", children: "Question Scenario:" }), " ", _jsx("span", { children: stripHTMLTags(quiz.questions[currentQuestionIdx].scenario) })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "w-1/2 flex-1 rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-900", children: [_jsx("h4", { className: "text-base font-semibold text-gray-900 dark:text-white", children: "Language:" }), _jsx("div", { className: "mb-2 flex justify-between", children: _jsx("select", { className: "mt-2 rounded bg-gray-100 p-2 dark:bg-gray-800 dark:text-white", value: language, onChange: (e) => handleLanguageChange(e.target.value), children: Object.keys(CODE_SNIPPETS).map((lang) => (_jsx("option", { value: lang, children: lang.charAt(0).toUpperCase() + lang.slice(1) }, lang))) }) }), _jsx(MonacoEditor, { height: "350px", language: language, value: code, onChange: (newValue) => setCode(newValue || ""), theme: "vs-dark", options: {
                                                    scrollBeyondLastLine: false,
                                                    minimap: { enabled: false },
                                                    automaticLayout: true,
                                                } })] }), _jsxs("div", { className: "w-1/2 flex-1 rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-900", children: [_jsx("h4", { className: "text-base font-semibold text-gray-900 dark:text-white", children: "Output:" }), _jsx("button", { onClick: handleRunCode, className: "mt-2 w-full rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600", children: "Run Code" }), _jsx("div", { className: "mt-2 rounded-md border border-gray-300 bg-white p-2 dark:bg-gray-700 dark:text-white", style: { height: "350px", overflowY: "auto" }, children: _jsx("pre", { className: "text-sm text-gray-700 dark:text-white", children: output || 'Click "Run Code" to see the output here.' }) })] })] }), _jsxs("div", { className: "my-4 flex justify-between gap-3", children: [_jsx("span", {}), currentQuestionIdx < quiz.questions.length - 1 ? (_jsx("button", { onClick: handleNextClick, className: "rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600", children: "Save & Next" })) : (_jsx("button", { onClick: () => setShowFinalConfirmation(true), className: "mb-4 rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600", children: "Submit" }))] })] }))) : (
                    // Show completion message when quiz is done
                    _jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "mb-3 text-4xl font-semibold text-gray-900 dark:text-white", children: "Assessment Completed." }), _jsx("p", { className: "mb-3 text-lg text-gray-700 dark:text-gray-300", children: "You have successfully completed your assessment." })] }))] }), showConfirmation && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50", onClick: handleCancelNext, children: _jsxs("div", { className: "w-1/3 rounded-lg bg-white p-8 dark:bg-gray-800", onClick: (e) => e.stopPropagation(), children: [_jsx("h4", { className: "mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white", children: "Save and progress to the next question?" }), _jsxs("div", { className: "flex justify-center gap-3 pt-3", children: [_jsx("button", { onClick: handleCancelNext, className: "rounded-md bg-gray-500 px-6 py-2 text-white", children: "Cancel" }), _jsx("button", { onClick: handleConfirmNext, className: "rounded-md bg-blue-500 px-6 py-2 text-white", children: "Confirm" })] })] }) })), showFinalConfirmation && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50", onClick: handleCancelFinal, children: _jsxs("div", { className: "w-1/3 rounded-lg bg-white p-8 dark:bg-gray-800", onClick: (e) => e.stopPropagation(), children: [_jsx("h4", { className: "mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white", children: "Submit your answers and complete the assessment?" }), _jsxs("div", { className: "flex justify-center gap-3 pt-3", children: [_jsx("button", { onClick: handleCancelFinal, className: "rounded-md bg-gray-500 px-6 py-2 text-white", children: "Cancel" }), _jsx("button", { onClick: handleConfirmFinal, className: "rounded-md bg-blue-500 px-6 py-2 text-white", children: "Submit" })] })] }) }))] }));
}
export default AttemptQuiz;
