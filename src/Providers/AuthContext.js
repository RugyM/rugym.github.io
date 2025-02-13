import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const AuthContext = createContext({
    user: null,
    token: "",
    check: () => false,
    register: async () => { },
    login: async () => { },
    logout: () => { },
    updateProfile: async () => { },
});
const AuthProvider = ({ children }) => {
    const stored = localStorage.getItem("user");
    const storedData = stored ? JSON.parse(stored) : null;
    const [user, setUser] = useState(storedData?.user || null);
    const [token, setToken] = useState(storedData?.token || "");
    const navigate = useNavigate();
    const check = () => Boolean(user && token);
    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000;
        }
        catch (error) {
            console.error("Failed to decode token", error);
            return null;
        }
    };
    // Check token expiration
    useEffect(() => {
        if (token) {
            const expirationTime = decodeToken(token);
            if (expirationTime && Date.now() >= expirationTime) {
                logout();
            }
        }
    }, [token]);
    const login = async ({ email, password }, setErrors) => {
        try {
            const response = await axios.post("/api/users/login", {
                email,
                password,
            });
            const { token: receivedToken, user: receivedUser } = response.data;
            if (!receivedToken || !receivedUser) {
                throw new Error("Invalid login response from server");
            }
            setUser(receivedUser);
            setToken(receivedToken);
            localStorage.setItem("user", JSON.stringify({ user: receivedUser, token: receivedToken }));
            if (receivedUser.role === "Admin") {
                navigate("/admin");
            }
            else if (receivedUser.role === "Recruiter") {
                navigate("/recruiter/quizzes");
            }
            else {
                navigate("/");
            }
        }
        catch (error) {
            if (error.response?.status === 404) {
                setErrors({ email: "User not found. Please register first." });
            }
            else if (error.response?.status === 400) {
                setErrors({ password: "Invalid password. Please try again." });
            }
            else {
                console.error("Login error:", error);
                setErrors({ email: "Login failed. Please try again later." });
            }
        }
    };
    const register = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            await axios.post("/api/users/register", {
                username: data.username,
                email: data.email,
                password: data.password,
            });
            await login({ email: data.email, password: data.password });
        }
        catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    };
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("user");
        navigate("/");
    };
    const updateProfile = async (updatedData) => {
        try {
            const response = await axios.put(`/api/users/${user?._id}/profile`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUser = response.data;
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify({ user: updatedUser, token }));
        }
        catch (error) {
            console.error("Profile update error:", error);
            alert("Profile update failed. Please try again.");
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, register, login, check, logout, updateProfile }, children: children }));
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
