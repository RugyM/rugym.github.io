import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useAuth } from "../../Providers/AuthContext";
const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string().required("Password is required!"),
});
const LoginForm = () => {
    const auth = useAuth();
    return (_jsxs(Card, { className: "w-full border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800", children: [_jsx("h3", { className: "mb-4 text-xl font-medium text-gray-900 dark:text-white", children: "Login" }), _jsx(Formik, { initialValues: { email: "", password: "" }, validationSchema: validationSchemaLogin, onSubmit: async (values, { setErrors }) => {
                    await auth.login({ email: values.email, password: values.password }, setErrors);
                }, children: ({ isSubmitting }) => (_jsxs(Form, { children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", value: "Email", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "email", name: "email", id: "email", className: "mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white sm:text-sm" }), _jsx(ErrorMessage, { name: "email", component: "div", className: "mb-2 text-sm text-red-500" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", value: "Password", className: "text-gray-900 dark:text-gray-300" }), _jsx(Field, { as: TextInput, type: "password", name: "password", id: "password", className: "mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white sm:text-sm" }), _jsx(ErrorMessage, { name: "password", component: "div", className: "mb-2 text-sm text-red-500" })] }), _jsx(Button, { type: "submit", isProcessing: isSubmitting, className: "mt-6 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600", children: "Login" })] })) })] }));
};
export default LoginForm;
