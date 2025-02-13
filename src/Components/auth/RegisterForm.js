import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useAuth } from "../../Providers/AuthContext";
const validationSchemaRegister = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Password is required!"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirmation password is required!"),
});
const RegisterForm = () => {
    const auth = useAuth();
    return (_jsxs(Card, { className: "border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800", children: [_jsx("h3", { className: "mb-4 text-xl font-medium text-gray-900 dark:text-white", children: "Register" }), _jsx(Formik, { initialValues: {
                    username: "", // Ensure this is defined in the form as well
                    email: "",
                    password: "",
                    confirmPassword: "",
                }, validationSchema: validationSchemaRegister, onSubmit: (values) => {
                    auth.register({
                        username: values.username, // Pass the username correctly
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword,
                    });
                }, children: ({ isSubmitting }) => (_jsxs(Form, { children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "username", value: "Username", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "text", name: "username", id: "username", className: "mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" }), _jsx(ErrorMessage, { name: "username", component: "div", className: "mb-2 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", value: "Email", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "email", name: "email", id: "email", className: "mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" }), _jsx(ErrorMessage, { name: "email", component: "div", className: "mb-2 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", value: "Password", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "password", name: "password", id: "password", className: "mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" }), _jsx(ErrorMessage, { name: "password", component: "div", className: "mb-2 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", value: "Confirm Password", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "password", name: "confirmPassword", id: "confirmPassword", className: "mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" }), _jsx(ErrorMessage, { name: "confirmPassword", component: "div", className: "mb-2 text-sm text-red-500" })] }), _jsx(Button, { type: "submit", isProcessing: isSubmitting, className: "w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-primary-600 dark:hover:bg-blue-700", children: "Register" })] })) })] }));
};
export default RegisterForm;
