import api from "./api";
import type { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse, UserProfile } from "../types/auth.types";

export const registerUser = async (data: SignUpRequest) => {
    const response = await api.post<SignUpResponse>("/api/auth/register", data);
    return response.data;
};

export const uploadProfileImage = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<{ id: string; url: string }>(
        "/api/images",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const updateProfileImage = async (imageId: string, token: string) => {
    const response = await api.patch<UserProfile>(
        "/api/users/me",
        { avatarImageId: imageId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/auth/login", data);
    return response.data;
};