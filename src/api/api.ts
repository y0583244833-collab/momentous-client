import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const errorCode = error.response?.data?.error?.code;
        const url = error.config?.url ?? "";

        const isAuthRequest = url.includes("/api/auth/login") || url.includes("/api/auth/register");
        if (!isAuthRequest &&(status === 401 ||(status === 403 && errorCode === "USER_BLOCKED"))) {
            window.dispatchEvent(new Event("auth:unauthorized"));
        }

        return Promise.reject(error);
    }
);


export default api;