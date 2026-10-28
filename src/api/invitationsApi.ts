import api from "./api";
import type {
    InviteMembersRequest,
    InviteMembersResponse,
    Invitation,
    InvitationsResponse
} from "../types/invitation.types";
import type { Group } from "../types/group.types";

export const inviteMembers = async (groupId: string, data: InviteMembersRequest): Promise<InviteMembersResponse> => {
    const response = await api.post<InviteMembersResponse>(`/api/boards/${groupId}/invitations`, data);

    return response.data;
};

export const getMyInvitations = async ( page: number): Promise<InvitationsResponse> => {
    const response = await api.get<InvitationsResponse>("/api/invitations", { params: { status: "PENDING", page, limit: 20 } });
    return response.data;
};

export const acceptInvitation = async (id: string): Promise<Group> => {
    const response = await api.post<Group>(`/api/invitations/${id}/accept`);
    return response.data;
};

export const declineInvitation = async (id: string): Promise<Invitation> => {
    const response = await api.post<Invitation>(`/api/invitations/${id}/decline`);
    return response.data;
};
