import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

type Props = {
    allowedRole?: "USER" | "ADMIN";
};

const ProtectedRout = ({ allowedRole }: Props) => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("AuthProvider is missing");
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRole && auth.user?.role !== allowedRole) {
        const correctPath = auth.user?.role === "ADMIN" ? "/admin" : "/groups";

        return <Navigate to={correctPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRout;