import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation
import { useAuth } from "../../Providers/AuthContext";

interface HeaderProps {
  full?: boolean;
}

// Function to generate initials from username
const getInitials = (name: string): string => {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) return words[0][0].toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

// Function to generate dynamic background color
const generateBackgroundColor = (name: string): string => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#FF33A1",
    "#33A1FF",
    "#A1FF33",
  ];
  const charSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charSum % colors.length];
};

// Function to determine if the background color is light or dark
const isLightColor = (hex: string): boolean => {
  const rgb = parseInt(hex.substring(1), 16); // Convert hex to integer
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = rgb & 0xff; // Extract blue

  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 150; // If luminance is higher, it's a light color
};

const Header = ({ full = false }: HeaderProps) => {
  const auth = useAuth();
  const userRole = auth.user?.role;

  // Generate initials and background for the current user
  const userName = auth.user?.username || "Guest";
  const initials = getInitials(userName);
  const bgColor = generateBackgroundColor(userName);
  const textColor = isLightColor(bgColor) ? "text-black" : "text-white";

  return (
    <Navbar className="fixed top-0 z-30 w-full shadow-md" fluid={full}>
      <Link to="/" className="flex items-center">
        <img
          src="/TRANSPARENCY.png"
          className="mr-3 h-6 sm:h-9"
          alt={`${process.env.VITE_APP_NAME} Logo`}
        />
        <span className="-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {process.env.VITE_APP_NAME}
        </span>
      </Link>
      <div className="flex gap-5">
        {auth.check() ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${textColor}`}
                style={{ backgroundColor: bgColor }}
              >
                {initials}
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{auth.user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {auth.user?.email}
              </span>
            </Dropdown.Header>
            {userRole === "Admin" ? (
              <>
                <Link to="/admin">
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
                <Link to="/admin/recruiter">
                  <Dropdown.Item>Recruiters</Dropdown.Item>
                </Link>
                <Link to="/admin/quizzes">
                  <Dropdown.Item>Quizzes</Dropdown.Item>
                </Link>
                <Link to="/admin/profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
              </>
            ) : userRole === "Recruiter" ? (
              <>
                <Link to="/recruiter/quizzes">
                  <Dropdown.Item>Assessments</Dropdown.Item>
                </Link>
                <Link to="/recruiter/profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
              </>
            ) : null}
            <Dropdown.Divider />
            <Dropdown.Item onClick={auth.logout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex items-center lg:order-2">
            <Link
              to="/auth/login"
              className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
            >
              Log in
            </Link>
            <Link
              to="/auth/register"
              className="mr-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5"
            >
              Get started
            </Link>
          </div>
        )}
        {/* Always visible button that links to hiw.tsx */}
        <Link to="/hiw">
          <button className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5">
            How it Works
          </button>
        </Link>
        {/* Always visible button that links to pricing.tsx */}
        <Link to="/pricing">
          <button className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5">
            Pricing
          </button>
        </Link>
      </div>
    </Navbar>
  );
};

export default Header;

