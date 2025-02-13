import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router";
import Header from "../../Components/ui/Header";
import Footer from "../../Components/ui/Footer";
const GuestLayout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: "flex min-h-[95.7vh] w-full items-center justify-center gap-2 dark:bg-gray-800 xl:min-h-[93.7vh] 2xl:min-h-[95.7vh]", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
export default GuestLayout;
