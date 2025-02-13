import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useAuth } from "../../Providers/AuthContext";
import { Link } from "react-router-dom";

interface FormValuesLogin {
  email: string;
  password: string;
}

const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const LoginForm: React.FC = () => {
  const auth = useAuth();

  return (
    <Card className="w-full border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Login
      </h3>
      <Formik<FormValuesLogin>
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchemaLogin}
        onSubmit={async (values, { setErrors }) => {
          await auth.login({ email: values.email, password: values.password }, setErrors);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                value="Email"
                className="text-gray-900 dark:text-gray-300"
              />
              <Field
                as={TextInput}
                type="email"
                name="email"
                id="email"
                className="mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mb-2 text-sm text-red-500"
              />
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                value="Password"
                className="text-gray-900 dark:text-gray-300"
              />
              <Field
                as={TextInput}
                type="password"
                name="password"
                id="password"
                className="mb-4 block w-full rounded-lg border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="mb-2 text-sm text-red-500"
              />
            </div>

            {/* Remember Me + Forgot Password */}
            {/* <div className="mb-4 flex justify-between">
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="remember"
                  className="mr-2"
                />
                <Label
                  htmlFor="remember"
                  value="Remember me"
                  className="text-sm text-gray-900 dark:text-gray-300"
                />
              </div>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline dark:text-blue-500"
              >
                Forgot Password?
              </Link>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              isProcessing={isSubmitting}
              className="mt-6 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LoginForm;
