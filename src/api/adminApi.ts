import api from "./api";
import type { UserProfile } from "../types/auth.types";
import type { AdminUsersResponse, AdminGroupsResponse, AdminUsersFilters, AdminGroupsFilters, AdminStatsResponse } from "../types/admin.types";
export const getAdminUsers = async (filters: AdminUsersFilters = {}): Promise<AdminUsersResponse> => {
    const response = await api.get<AdminUsersResponse>("/api/admin/users", { params: filters });
    return response.data;
};
export const setUserBlocked = async (userId: string, isBlocked: boolean): Promise<UserProfile> => {
    const response = await api.patch<UserProfile>(`/api/admin/users/${userId}/block`, { isBlocked }
    );
    return response.data;
};
export const deleteAdminUser = async (userId: string): Promise<void> => {
    await api.delete(`/api/admin/users/${userId}`);
};
export const getAdminGroups = async (filters: AdminGroupsFilters = {}): Promise<AdminGroupsResponse> => {
    const response = await api.get<AdminGroupsResponse>("/api/admin/boards", { params: filters });
    return response.data;
};
export const getAdminStats = async (): Promise<AdminStatsResponse> => {
    const response = await api.get<AdminStatsResponse>("/api/admin/stats");
    return response.data;
};