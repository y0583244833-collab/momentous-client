
export interface InviteMembersRequest {
    emails: string[];
}

export interface InvitationResult {
    email: string;
    result: string;
    invitationId: string | null;
}

export interface InviteMembersResponse {
    boardId: string;
    invitedCount: number;
    results: InvitationResult[];
}

export interface Invitation {
    id: string;
    status: "PENDING" | "ACCEPTED" | "DECLINED";
    createdAt: string;
    respondedAt: string | null;
    board: {
        id: string;
        name: string;
        eventType: string;
        eventTypeLabel: string;
        eventDate: string;
        coverImageUrl: string | null;
    };
    inviter: {
        id: string;
        fullName: string;
        avatarUrl: string | null;
    };
}

export interface InvitationsResponse {
    items: Invitation[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
