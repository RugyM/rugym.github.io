import { Outlet, useNavigate } from "react-router";
import Header from "../../Components/ui/Header";
import { useAuth } from "../../Providers/AuthContext";
import { useEffect } from "react";

const AuthLayout = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.check())
            navigate('/')
    }, []);

    return (
        <>
            <Header />
            <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
                <Outlet />
            </main>
        </>
    );
}


export default AuthLayout;
