import type { UserProfile } from "./auth.types";
import type { Group } from "./group.types";
export interface AdminUser extends UserProfile {
    boardsCreated: number;
    boardsJoined: number;
    memoriesCount: number;
}
export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export type AdminUsersResponse = PaginatedResponse<AdminUser>;
export type AdminGroupsResponse = PaginatedResponse<Group>;

export interface AdminUsersFilters {
    q?: string;
    blocked?: "true" | "false";
    page?: number;
    limit?: number;
}
export interface AdminGroupsFilters {
    q?: string;
    eventType?: Group["eventType"];
    page?: number;
    limit?: number;
}
export interface AdminStatsResponse {
    usersCount: number;
    groupsCount: number;
    memoriesCount: number;
}
