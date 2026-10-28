import api from "./api";
import type { Group, GroupFilters, GroupsResponse, CreateGroupRequest,UpdateGroupRequest  } from "../types/group.types";

export type CreateGroupWithInvitesRequest = CreateGroupRequest & { emails: string[]; };


export const getGroups = async (filters: GroupFilters = {}): Promise<GroupsResponse> => {

  const response = await api.get<GroupsResponse>("/api/boards", { params: filters });

  return response.data;
};
export const createGroup = async (data: CreateGroupWithInvitesRequest): Promise<Group> => {

  const response = await api.post<Group>(
    "/api/boards",
    data
  );

  return response.data;
};

export const getGroupById= async (groupId:string): Promise<Group> => {

  const response = await api.get<Group>(`/api/boards/${groupId}`);

  return response.data;
};
export const updateGroup = async (groupId: string,data: UpdateGroupRequest): Promise<Group> => {
    const response = await api.patch<Group>(`/api/boards/${groupId}`, data
    );

    return response.data;
};
