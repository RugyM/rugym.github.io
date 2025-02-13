import { Outlet, useNavigate } from "react-router";
import Header from "../../Components/ui/Header";
import { useAuth } from "../../Providers/AuthContext";
import { useEffect } from "react";
import Aside from "../../Components/ui/Aside";
import Footer from "../../Components/ui/Footer";

const DashboardIcon = (
  <svg
    aria-hidden="true"
    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 3a1 1 0 011 1v4a1 1 0 11-2 0V4a1 1 0 011-1zM3 10a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1zm10 1a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM7.05 7.05a1 1 0 011.414 0l2.828 2.828a1 1 0 11-1.414 1.414L7.05 8.464a1 1 0 010-1.414z"></path>
  </svg>
);
const RecruiterIcon = (
  <svg
    aria-hidden="true"
    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
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
);
const QuizIcon = (
  <svg
    aria-hidden="true"
    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
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
);
const ProfileIcon = (
  <svg
    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
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
);
const sidebarItems = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    link: "/admin",
  },
  {
    label: "Recruiters",
    icon: RecruiterIcon,
    items: [
      { label: "Create", link: "/admin/recruiter/create" },
      { label: "Show All", link: "/admin/recruiter" },
    ],
  },
  {
    label: "Quizzes",
    icon: QuizIcon,
    items: [
      { label: "Create", link: "/admin/quizzes/create" },
      { label: "Show All", link: "/admin/quizzes" },
    ],
  },
  {
    label: "Profile",
    icon: ProfileIcon,
    items: [{ label: "My Profile", link: "/admin/profile" }],
  },
];

const AdminLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user?.role !== "Admin") navigate("/");
  }, [auth.user]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 antialiased dark:bg-gray-900">
      <div className="flex flex-1 overflow-hidden">
        <Aside sidebarItems={sidebarItems} />
        <Header full />
        <main className="flex h-screen flex-1 flex-col justify-between overflow-y-auto pt-16">
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
