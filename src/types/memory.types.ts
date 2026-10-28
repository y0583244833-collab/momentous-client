
export type MemoryType =
    | "PHOTO"
    | "PLACE"
    | "SUMMARY"
    | "JOKE"
    | "QUOTE";

export interface CreateMemoryRequest {
    title: string;
    content: string;
    type: MemoryType;
    imageId?: string | null;
    placeUrl?: string | null;
    happenedAt?: string | null;
}

export interface UpdateMemoryRequest {
    title?: string;
    content?: string;
    type?: MemoryType;
    imageId?: string | null;
    placeUrl?: string | null;
    happenedAt?: string | null;
}

export interface MemoryAuthor {
    id: string;
    fullName: string;
    avatarUrl: string | null;
}

export interface Memory {
    id: string;
    boardId: string;
    type: MemoryType;
    typeLabel: string;
    title: string;
    content: string;
    imageId: string | null;
    imageUrl: string | null;
    placeUrl: string | null;
    happenedAt: string | null;
    author: MemoryAuthor;
    isMine: boolean;
    likesCount: number;
    likedByMe: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface MemoriesResponse {
    items: Memory[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface LikeSummary {
    memoryId: string;
    likesCount: number;
    likedByMe: boolean;
}
