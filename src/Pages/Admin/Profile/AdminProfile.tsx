import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, TextInput } from "flowbite-react";
import { useAuth } from "../../../Providers/AuthContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  companyName: Yup.string().max(
    100,
    "Company name should not exceed 100 characters",
  ),
  jobTitle: Yup.string().min(2, "Job title must be at least 2 characters"),
  industrySpecialization: Yup.string(),
});

const AdminProfile = () => {
  const { user, updateProfile } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Wait until user data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    companyName: user?.companyName || "",
    jobTitle: user?.jobTitle || "",
    industrySpecialization: user?.industrySpecialization || "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const updatedUser = { ...values };
    await updateProfile(updatedUser);
    setToastMessage("Profile Updated Successfully.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    navigate("/admin/profile");
  };

  return (
    <>
      {showToast && (
        <div
          id="toast-success"
          className="absolute right-3 top-16 z-50 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{toastMessage}</div>
        </div>
      )}
      {/* <div className="mx-auto max-w-screen-2xl sm:p-5 lg:px-12"> */}
      <div className="">
        <div className="">
          <div className="relative border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Personal Information Section */}
                  <h2 className="mb-4 border-b border-gray-200 pb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                  <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </Label>
                      <Field
                        as={TextInput}
                        name="username"
                        id="username"
                        required
                        className="block w-full rounded-lg text-sm"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email Address
                      </Label>
                      <Field
                        as={TextInput}
                        name="email"
                        id="email"
                        required
                        className="block w-full rounded-lg text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    {/* Password Section */}
                    <div className="mb-6">
                      <Label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password (Leave blank to keep current)
                      </Label>
                      <Field
                        as={TextInput}
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full rounded-lg text-sm"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </Label>
                      <Field
                        as={TextInput}
                        name="phone"
                        id="phone"
                        className="block w-full rounded-lg text-sm"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  {/* Professional Details Section */}
                  <h2 className="mb-4 border-y border-gray-200 py-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Professional Details
                  </h2>
                  <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="companyName"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company Name (if applicable)
                      </Label>
                      <Field
                        as={TextInput}
                        name="companyName"
                        id="companyName"
                        className="block w-full rounded-lg text-sm"
                      />
                      <ErrorMessage
                        name="companyName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="jobTitle"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Job Title
                      </Label>
                      <Field
                        as={TextInput}
                        name="jobTitle"
                        id="jobTitle"
                        className="block w-full rounded-lg text-sm"
                      />
                      <ErrorMessage
                        name="jobTitle"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="industrySpecialization"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Industry Specialization
                      </Label>
                      <Field
                        as="select"
                        name="industrySpecialization"
                        id="industrySpecialization"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select Industry</option>
                        <option value="IT">IT</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="industrySpecialization"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 inline-flex w-full justify-center rounded-lg bg-primary-700 px-4 py-1 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Update Profile
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
