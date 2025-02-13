import { Link, useLocation } from "react-router";


interface SidebarItem {
    label: string;
    link?: string;
    icon?: React.ReactNode;
    items?: SidebarItem[];
}
interface AsideProps {
    sidebarItems: SidebarItem[]
}

const Aside = ({ sidebarItems }: AsideProps) => {
    const location = useLocation();
    const isActive = (path: string | undefined) => location.pathname === path;

    return (
        <aside
            className="hidden md:block sticky pt-16 top-0 h-screen w-64 bg-gray-100 z-30 dark:bg-gray-800"
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                <ul className="space-y-2">
                    {sidebarItems.map((item, index) => (
                        <li key={index}>
                            {item.items ? (
                                <>
                                    <button
                                        type="button"
                                        className={`flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive(item.link)
                                            ? 'bg-cyan-800 text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                        aria-controls={`dropdown-${index}`}
                                        data-collapse-toggle={`dropdown-${index}`}
                                    >
                                        {item.icon}
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">{item.label}</span>
                                        <svg
                                            aria-hidden="true"
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                    <ul id={`dropdown-${index}`} className="hidden py-2 space-y-2">
                                        {item.items?.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link to={`${subItem.link}`}
                                                    className={`flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group dark:text-white ${isActive(subItem.link)
                                                        ? 'bg-cyan-800 text-white'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <Link
                                    to={`${item.link}`}
                                    className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white ${isActive(item.link)
                                        ? 'bg-cyan-800 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
