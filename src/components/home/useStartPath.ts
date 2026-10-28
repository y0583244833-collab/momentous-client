import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const useStartPath = () => {
    const auth = useContext(AuthContext);
    if (!auth?.isAuthenticated) return { path: "/signup", isAuthenticated: false };
    return { path: auth.user?.role === "ADMIN" ? "/admin" : "/groups", isAuthenticated: true };
};
