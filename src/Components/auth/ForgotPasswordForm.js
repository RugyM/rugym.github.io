import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Label, TextInput, Button, } from 'flowbite-react';
const validationSchemaForgotPassword = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required!'),
});
const ForgotPasswordForm = () => {
    return (_jsxs(Card, { className: "p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "mb-4 text-xl font-medium text-gray-900 dark:text-white", children: "Forgot Password" }), _jsx(Formik, { initialValues: { email: '' }, validationSchema: validationSchemaForgotPassword, onSubmit: (values) => {
                    console.log("Forgot Password Values:", values);
                    alert(`A password reset link has been sent to ${values.email}`);
                }, children: ({ isSubmitting }) => (_jsxs(Form, { children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", value: "Email", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "email", name: "email", id: "email", className: "mb-4 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" }), _jsx(ErrorMessage, { name: "email", component: "div", className: "text-red-500 text-sm mb-2" })] }), _jsx(Button, { type: "submit", isProcessing: isSubmitting, className: "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800", children: "Send Reset Link" })] })) })] }));
};
export default ForgotPasswordForm;
