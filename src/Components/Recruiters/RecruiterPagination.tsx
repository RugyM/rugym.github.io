import React from "react";

const RecruiterPagination = ({
  currentPage,
  totalRecruiters,
  recruitersPerPage,
  onPageChange,
}) => {
  const totalRecruitersSafe = totalRecruiters || 0;
  const totalPages = Math.max(
    1,
    Math.ceil(totalRecruitersSafe / recruitersPerPage),
  );

  // Calculate the visible pages range for pagination
  const visiblePages = [];
  let startPage = Math.max(1, currentPage - 5);
  let endPage = Math.min(totalPages, currentPage + 4);

  // If there are fewer than 10 pages, show all
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 5) {
      endPage = 10;
    } else if (currentPage + 4 > totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const startRecruiter = (currentPage - 1) * recruitersPerPage + 1;
  const endRecruiter = Math.min(
    currentPage * recruitersPerPage,
    totalRecruitersSafe,
  );

  return (
    <nav
      className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="mx-2 font-semibold text-gray-900 dark:text-white">
          {startRecruiter}-{endRecruiter}
        </span>
        of
        <span className="ms-2 font-semibold text-gray-900 dark:text-white">
          {totalRecruitersSafe}
        </span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            onClick={handlePrevious}
            className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageClick(page)}
              className={`
                flex items-center justify-center border px-3 py-2 text-sm leading-tight
                ${
                  currentPage === page
                    ? "z-10 border-primary-300 bg-primary-50 text-primary-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              `}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNext}
            className="ml-0 flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default RecruiterPagination;
