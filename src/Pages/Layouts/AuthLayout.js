import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useNavigate } from "react-router";
import Header from "../../Components/ui/Header";
import { useAuth } from "../../Providers/AuthContext";
import { useEffect } from "react";
const AuthLayout = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.check())
            navigate('/');
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: "flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800", children: _jsx(Outlet, {}) })] }));
};
export default AuthLayout;
