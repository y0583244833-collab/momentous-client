import { createContext,useState ,useEffect} from "react";
import type { ReactNode } from "react";
import type { UserProfile, LoginResponse, AuthContextType } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(() => {
        const savedUser = sessionStorage.getItem("user");
        if (!savedUser) return null;
        try {
            return JSON.parse(savedUser) as UserProfile;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("token"));
    const login = (response: LoginResponse): void => {
        setUser(response.user);
        setToken(response.token);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user", JSON.stringify(response.user));
     
    };
    const updateUser = (updatedUser: UserProfile): void => {
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
};
    const logout = (): void => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }
    useEffect(()=>{
        const handleUnauthorized=()=>{
            logout();
        }
        window.addEventListener("auth:unauthorized",handleUnauthorized);
        return ()=>{
            window.removeEventListener("auth:unauthorized",handleUnauthorized);
        };
    },[])
    const isAuthenticated = user !== null&&token!==null;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, token ,updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};