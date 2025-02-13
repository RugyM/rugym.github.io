import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import RichTextEditor from "../ui/RichTextEditor";
// Validation schema updated to reflect the new structure.
const validationSchema = Yup.object({
    title: Yup.string().required("Quiz title is required"),
    description: Yup.string().required("Description is required"),
    // studentName: Yup.string().required("Student name is required"),
    studentNames: Yup.array()
        .of(Yup.object({
        name: Yup.string().required("Student name is required"),
    }))
        .min(1, "At least one student is required"),
    questions: Yup.array()
        .of(Yup.object({
        title: Yup.string().required("Question title is required"),
        scenario: Yup.string().required("Scenario is required"),
    }))
        .required("At least one question is required"),
});
const QuizCreateForm = ({ quiz, recruiterId, onSubmit, closeForm, resetForm, setShowQuizTable, }) => {
    const [openQuestions, setOpenQuestions] = useState([]);
    const [shakeIndex, setShakeIndex] = useState(null);
    const [isSubmitShaking, setIsSubmitShaking] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    useEffect(() => {
        if (quiz) {
            setOpenQuestions([]);
        }
    }, [quiz]);
    const handleBackToQuizTable = () => {
        setShowQuizTable(true);
    };
    const toggleQuestion = (index) => {
        if (openQuestions.includes(index)) {
            setOpenQuestions(openQuestions.filter((i) => i !== index));
        }
        else {
            setOpenQuestions([index]);
        }
    };
    const handleAddQuestion = (arrayHelpers, values) => {
        const lastQuestion = values.questions[values.questions.length - 1];
        if (lastQuestion && (!lastQuestion.title || !lastQuestion.scenario)) {
            setShakeIndex(values.questions.length - 1);
            setTimeout(() => setShakeIndex(null), 500);
        }
        else {
            setOpenQuestions([]);
            arrayHelpers.push({ title: "", scenario: "" });
        }
    };
    const handleDeleteQuestion = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };
    const confirmDeleteQuestion = (arrayHelpers) => {
        if (deleteIndex !== null) {
            if (arrayHelpers.form.values.questions.length === 1) {
                // If it's the only question, clear the values
                arrayHelpers.replace(deleteIndex, { title: "", scenario: "" });
            }
            else {
                // Remove the question if there are multiple questions
                arrayHelpers.remove(deleteIndex);
            }
            setDeleteIndex(null);
            setShowDeleteModal(false);
        }
    };
    const [shakeStudentIndex, setShakeStudentIndex] = useState(null);
    const handleAddStudent = (arrayHelpers, values) => {
        const lastStudentIndex = values.studentNames.length - 1;
        if (values.studentNames[lastStudentIndex]?.name?.trim()) {
            arrayHelpers.push({ name: "" });
        }
        else {
            setShakeStudentIndex(lastStudentIndex);
            setTimeout(() => setShakeStudentIndex(null), 500);
        }
    };
    return (_jsxs("div", { className: `rounded-lg bg-white ${quiz ? "p-6" : "py-4"} transition-all dark:bg-gray-800`, children: [quiz && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleBackToQuizTable, className: "rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600", children: "Back to Quiz List" }), _jsxs("h2", { className: "py-6 text-center text-3xl font-semibold capitalize text-white", children: ["Editing Quiz: ", _jsx("span", { className: "text-4xl", children: quiz?.title })] })] })), _jsx(Formik, { initialValues: {
                    id: quiz?._id || "",
                    title: quiz?.title || "",
                    description: quiz?.description || "",
                    // studentName: quiz?.studentName || "",
                    studentNames: quiz?.studentNames && quiz.studentNames.length > 0
                        ? quiz.studentNames.map((student) => ({ name: student.name }))
                        : [{ name: "" }],
                    recruiterId: recruiterId,
                    questions: quiz?.questions || [
                        {
                            title: "",
                            scenario: "",
                        },
                    ],
                }, validationSchema: validationSchema, onSubmit: (values, formikHelpers) => {
                    onSubmit(values, formikHelpers);
                }, children: ({ values, setFieldValue, errors }) => (_jsxs(Form, { children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 dark:text-white", children: "Assessment Information" }), _jsxs("div", { className: "mt-4 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 dark:text-gray-200", children: "Assessment Title" }), _jsx(Field, { type: "text", name: "title", className: "mt-2 w-full rounded-lg border p-3", placeholder: "Enter assessment title" }), _jsx(ErrorMessage, { name: "title", component: "div", className: "mt-1 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 dark:text-gray-200", children: "Description" }), _jsx(Field, { as: "textarea", name: "description", className: "mt-2 w-full rounded-lg border p-3", placeholder: "Enter description" }), _jsx(ErrorMessage, { name: "description", component: "div", className: "mt-1 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 dark:text-gray-200", children: "Candidate Name" }), _jsx(FieldArray, { name: "studentNames", render: (arrayHelpers) => (_jsxs("div", { children: [values.studentNames.map((student, index) => (_jsxs("div", { className: `mt-2 flex items-center space-x-4 ${shakeStudentIndex === index ? "animate-shake" : ""}`, children: [_jsx(Field, { type: "text", name: `studentNames[${index}].name`, value: student.name || "", className: `w-full rounded-lg border p-3 ${errors.studentNames?.[index]?.name
                                                                            ? "border-red-500"
                                                                            : ""}`, placeholder: "Enter candidate name" }), values.studentNames.length > 1 && (_jsx("button", { type: "button", onClick: () => arrayHelpers.remove(index), className: "ml-auto size-7 rounded-full bg-red-300 p-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-red-500 dark:hover:text-white", children: _jsx("svg", { "aria-hidden": "true", className: "size-5", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { clipRule: "evenodd", fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" }) }) }))] }, index))), errors.studentNames && (_jsx("div", { className: "mt-1 text-sm text-red-500", children: errors.studentNames.map((error, index) => (_jsx("div", { children: error.name }, index))) })), _jsx("button", { type: "button", onClick: () => handleAddStudent(arrayHelpers, values), className: "mt-4 inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-white", children: "Add Candidate" })] })) })] })] })] }), _jsx(FieldArray, { name: "questions", render: (arrayHelpers) => (_jsxs("div", { className: "space-y-4", children: [values.questions.map((question, index) => (_jsxs("div", { className: `border-b pb-4 ${shakeIndex === index ? "animate-shake" : ""} ${errors.questions?.[index]?.title ||
                                            errors.questions?.[index]?.scenario
                                            ? "border-red-500"
                                            : ""}`, children: [_jsxs("div", { className: "flex cursor-pointer items-center justify-between text-xl font-semibold text-gray-800 transition-all hover:text-blue-600 dark:text-white", onClick: () => toggleQuestion(index), children: [_jsx("div", { children: question.title || `Question ${index + 1}` }), _jsx("svg", { className: `h-5 w-5 transform transition-all ${openQuestions.includes(index) ? "rotate-180" : ""}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })] }), openQuestions.includes(index) && (_jsxs("div", { className: "mt-4 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 dark:text-gray-200", children: "Question Title" }), _jsx(Field, { type: "text", name: `questions[${index}].title`, className: `mt-2 w-full rounded-lg border p-3 ${errors.questions?.[index]?.title
                                                                    ? "border-red-500"
                                                                    : ""}`, placeholder: "Enter question title" }), _jsx(ErrorMessage, { name: `questions[${index}].title`, component: "div", className: "mt-1 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 dark:text-gray-200", children: "Scenario" }), _jsx(RichTextEditor, { value: values.questions[index].scenario, setValue: (value) => setFieldValue(`questions[${index}].scenario`, value) }), _jsx(ErrorMessage, { name: `questions[${index}].scenario`, component: "div", className: "mt-1 text-sm text-red-500" })] }), _jsx("button", { type: "button", onClick: () => handleDeleteQuestion(index), className: "mt-4 inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-white", children: "Remove Question" })] }))] }, index))), _jsx("button", { type: "button", onClick: () => handleAddQuestion(arrayHelpers, values), className: "mt-6 inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-white", children: "Add Question" }), showDeleteModal && (_jsx("div", { children: _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", "aria-hidden": "true", children: _jsxs("div", { className: "relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800", children: [_jsx("button", { type: "button", onClick: () => setShowDeleteModal(false), className: "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white", children: _jsx("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20", children: _jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 6l8 8M6 14l8-8" }) }) }), _jsxs("div", { className: "p-4 text-center", children: [_jsx("svg", { className: "mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20", children: _jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }), _jsx("h3", { className: "mb-5 text-lg font-normal text-gray-500 dark:text-gray-400", children: "Are you sure you want to delete this question?" }), _jsx("button", { onClick: () => confirmDeleteQuestion(arrayHelpers), className: "mr-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800", children: "Delete" }), _jsx("button", { onClick: () => setShowDeleteModal(false), className: "rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700", children: "Cancel" })] })] }) }) }))] })) }), _jsx("div", { className: "mt-6", children: _jsx("button", { type: "submit", className: `w-full rounded-lg bg-blue-500 py-3 text-white ${isSubmitShaking ? "animate-shake" : ""}`, children: quiz ? "Save Changes" : "Create Assessment" }) })] })) })] }));
};
export default QuizCreateForm;
