import { Outlet, useNavigate } from "react-router";
import Header from "../../Components/ui/Header";
import { useAuth } from "../../Providers/AuthContext";
import { useEffect } from "react";
import Aside from "../../Components/ui/Aside";
import Footer from "../../Components/ui/Footer";
import { profile } from "console";

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
      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const sidebarItems = [
  {
    label: "Assessments",
    icon: QuizIcon,
    items: [
      { label: "Create", link: "/recruiter/quizzes/create" },
      { label: "Show All", link: "/recruiter/quizzes" },
    ],
  },
  {
    label: "Profile",
    icon: ProfileIcon,
    items: [{ label: "My Profile", link: "/recruiter/profile" }],
  },
];

const RecruiterLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "Recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

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

export default RecruiterLayout;
