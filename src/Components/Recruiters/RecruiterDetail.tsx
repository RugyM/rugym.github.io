import { useState } from "react";

const RecruiterDetail = ({ selectedRecruiter, handleBackClick }) => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setExpandedIdx(idx === expandedIdx ? null : idx);
  };

  return (
    <>
      <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div className="mb-4 flex items-baseline justify-between">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={handleBackClick}
          >
            Back to Recruiters List
          </button>
        </div>
        <h3 className="mb-4 mt-6 flex items-baseline gap-2 text-4xl font-semibold text-gray-900 dark:text-white">
          {selectedRecruiter.username}
        </h3>
        <p className="mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300">
          <strong className="w-64">Email:</strong>{" "}
          {selectedRecruiter.email
            ? selectedRecruiter.email
            : "No email provided"}
        </p>
        <p className="mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300">
          <strong className="w-64">Phone Number:</strong>{" "}
          {selectedRecruiter.phone
            ? selectedRecruiter.phone
            : "No phone number provided"}
        </p>
        <p className="mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300">
          <strong className="w-64">Company Name:</strong>{" "}
          {selectedRecruiter.companyName
            ? selectedRecruiter.companyName
            : "No company name provided"}
        </p>
        <p className="mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300">
          <strong className="w-64">Job Title:</strong>{" "}
          {selectedRecruiter.jobTitle
            ? selectedRecruiter.jobTitle
            : "No job title provided"}
        </p>
        <p className="mb-4 flex items-baseline gap-2 text-xl text-gray-700 dark:text-gray-300">
          <strong className="w-64">Industry Specialization:</strong>{" "}
          {selectedRecruiter.industrySpecialization
            ? selectedRecruiter.industrySpecialization
            : "No industry specialization provided"}
        </p>
      </div>
    </>
  );
};

export default RecruiterDetail;
