import { useState, useEffect } from "react";
import { useAuth } from "../../Providers/AuthContext";
import axios from "axios";

const Overview = () => {
  const { token, user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalRecruiters: 0,
    totalQuizzes: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-72">
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <svg
              aria-hidden="true"
              className="mb-3 size-9 w-full text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h5 className="mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
              Total Number of Recruiters
            </h5>
            <div className="flex justify-center">
              <div className="aspect-square min-w-[50px] content-center rounded-full bg-gray-300 p-2 text-2xl font-semibold text-gray-900 ring-2 ring-gray-300 dark:ring-gray-500">
                {dashboardData.totalRecruiters}
              </div>
            </div>
            <a
              href="/admin/recruiter"
              className="mt-auto inline-flex items-center font-medium text-blue-600 hover:underline"
            >
              Go to Recruiters List
              <svg
                className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-72">
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <svg
              aria-hidden="true"
              className="mb-3 size-9 w-full text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h5 className="mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
              Total Number of Quizzes
            </h5>
            <div className="flex justify-center">
              <div className="aspect-square min-w-[50px] content-center rounded-full bg-gray-300 p-2 text-2xl font-semibold text-gray-900 ring-2 ring-gray-300 dark:ring-gray-500">
                {dashboardData.totalQuizzes}
              </div>
            </div>
            <a
              href="/admin/quizzes"
              className="mt-auto inline-flex items-center font-medium text-blue-600 hover:underline"
            >
              Go to Quizzes List
              <svg
                className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-72">
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <svg
              aria-hidden="true"
              className="mb-3 size-9 w-full text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.052 1.25H11.948C11.0495 1.24997 10.3003 1.24995 9.70552 1.32991C9.07773 1.41432 8.51093 1.59999 8.05546 2.05546C7.59999 2.51093 7.41432 3.07773 7.32991 3.70552C7.27259 4.13189 7.25637 5.15147 7.25179 6.02566C5.22954 6.09171 4.01536 6.32778 3.17157 7.17157C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34314 22 6.22876 22 9.99998 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14C22 10.2288 22 8.34315 20.8284 7.17157C19.9846 6.32778 18.7705 6.09171 16.7482 6.02566C16.7436 5.15147 16.7274 4.13189 16.6701 3.70552C16.5857 3.07773 16.4 2.51093 15.9445 2.05546C15.4891 1.59999 14.9223 1.41432 14.2945 1.32991C13.6997 1.24995 12.9505 1.24997 12.052 1.25ZM15.2479 6.00188C15.2434 5.15523 15.229 4.24407 15.1835 3.9054C15.1214 3.44393 15.0142 3.24644 14.8839 3.11612C14.7536 2.9858 14.5561 2.87858 14.0946 2.81654C13.6116 2.7516 12.964 2.75 12 2.75C11.036 2.75 10.3884 2.7516 9.90539 2.81654C9.44393 2.87858 9.24644 2.9858 9.11612 3.11612C8.9858 3.24644 8.87858 3.44393 8.81654 3.9054C8.771 4.24407 8.75661 5.15523 8.75208 6.00188C9.1435 6 9.55885 6 10 6H14C14.4412 6 14.8565 6 15.2479 6.00188ZM12 9.25C12.4142 9.25 12.75 9.58579 12.75 10V10.0102C13.8388 10.2845 14.75 11.143 14.75 12.3333C14.75 12.7475 14.4142 13.0833 14 13.0833C13.5858 13.0833 13.25 12.7475 13.25 12.3333C13.25 11.9493 12.8242 11.4167 12 11.4167C11.1758 11.4167 10.75 11.9493 10.75 12.3333C10.75 12.7174 11.1758 13.25 12 13.25C13.3849 13.25 14.75 14.2098 14.75 15.6667C14.75 16.857 13.8388 17.7155 12.75 17.9898V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.9898C10.1612 17.7155 9.25 16.857 9.25 15.6667C9.25 15.2525 9.58579 14.9167 10 14.9167C10.4142 14.9167 10.75 15.2525 10.75 15.6667C10.75 16.0507 11.1758 16.5833 12 16.5833C12.8242 16.5833 13.25 16.0507 13.25 15.6667C13.25 15.2826 12.8242 14.75 12 14.75C10.6151 14.75 9.25 13.7903 9.25 12.3333C9.25 11.143 10.1612 10.2845 11.25 10.0102V10C11.25 9.58579 11.5858 9.25 12 9.25Z"
              />
            </svg>
            <h5 className="mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
              Total Payments
            </h5>
            <div className="flex justify-center">
              <div className="aspect-square min-w-[50px] content-center rounded-full bg-gray-300 p-2 text-2xl font-semibold text-gray-900 ring-2 ring-gray-300 dark:ring-gray-500">
                ${dashboardData.totalPayments}
              </div>
            </div>
            <a
              href="/admin/quizzes/create"
              className="mt-auto inline-flex items-center font-medium text-blue-600 hover:underline"
            >
              Create more Quizzes
              <svg
                className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-72">
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <svg
              className="mb-3 size-9 w-full text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <h5 className="mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
              {user?.username}
            </h5>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.email}
            </h5>
            <a
              href="/admin/profile"
              className="mt-auto inline-flex items-center font-medium text-blue-600 hover:underline"
            >
              Visit Your Profile
              <svg
                className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
