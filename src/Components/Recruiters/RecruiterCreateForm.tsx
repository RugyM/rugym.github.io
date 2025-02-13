import { useFormik } from "formik";
import * as Yup from "yup";

const RecruiterCreateForm = ({
  recruiter,
  onSubmit,
  closeForm,
  resetForm,
  setShowRecruiterTable,
}: {
  onSubmit: (newRecruiter: any, { resetForm }: any) => void;
  closeForm: () => void;
  resetForm: () => void;
}) => {
  const isEditMode = Boolean(recruiter);
  const formik = useFormik({
    initialValues: {
      ...(isEditMode && { _id: recruiter?._id }),
      username: recruiter?.username || "",
      email: recruiter?.email || "",
      phone: recruiter?.phone || "",
      companyName: recruiter?.companyName || "",
      jobTitle: recruiter?.jobTitle || "",
      industrySpecialization: recruiter?.industrySpecialization || "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be 50 characters or less")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
      phone: Yup.string().matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
      companyName: Yup.string().max(100, "Must be 100 characters or less"),
      jobTitle: Yup.string().min(2, "Must be at least 2 characters"),
      industrySpecialization: Yup.string(),
      password: isEditMode
        ? Yup.string().min(8, "Must be at least 8 characters")
        : Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password is required"),
    }),
    onSubmit: onSubmit,
  });

  const handleBackToRecruiterTable = () => {
    setShowRecruiterTable(true);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Personal Information Section */}
      {recruiter && (
        <button
          onClick={handleBackToRecruiterTable}
          className="mb-5 rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Back to Recruiter List
        </button>
      )}
      <h2 className="mb-4 border-b border-gray-200 pb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Personal Information
      </h2>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...formik.getFieldProps("username")}
            className={`block w-full rounded-lg border p-2.5 text-sm ${
              formik.touched.username && formik.errors.username
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter Username"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            className={`block w-full rounded-lg border p-2.5 text-sm ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter email address"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {isEditMode ? "Password (Leave blank to keep current)" : "Password"}
          </label>
          <input
            type="password"
            id="password"
            {...formik.getFieldProps("password")}
            className={`block w-full rounded-lg border p-2.5 text-sm ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter a secure password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...formik.getFieldProps("phone")}
            className={`block w-full rounded-lg border p-2.5 text-sm ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter phone number"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>
      </div>

      {/* Professional Details Section */}
      <h2 className="mb-4 border-y border-gray-600 py-4 text-lg font-semibold text-gray-900 dark:text-white">
        Professional Details
      </h2>
      <div className="mb-6 grid gap-4 border-b border-gray-600 pb-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name (if applicable)
          </label>
          <input
            type="text"
            id="companyName"
            {...formik.getFieldProps("companyName")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label
            htmlFor="jobTitle"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            {...formik.getFieldProps("jobTitle")}
            className={`block w-full rounded-lg border p-2.5 text-sm ${
              formik.touched.jobTitle && formik.errors.jobTitle
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter job title"
          />
          {formik.touched.jobTitle && formik.errors.jobTitle && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.jobTitle}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="industrySpecialization"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Industry Specialization
          </label>
          <select
            id="industrySpecialization"
            {...formik.getFieldProps("industrySpecialization")}
            className={`block w-full rounded-lg border p-2.5 text-sm ${
              formik.touched.industrySpecialization &&
              formik.errors.industrySpecialization
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select industry</option>
            <option value="IT">IT</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.industrySpecialization &&
            formik.errors.industrySpecialization && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.industrySpecialization}
              </p>
            )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
        >
          {isEditMode ? "Update Recruiter" : "Create Recruiter"}
        </button>
      </div>
    </form>
  );
};

export default RecruiterCreateForm;
