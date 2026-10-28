
import api from "./api";

import type {
    Memory,
    LikeSummary ,
    CreateMemoryRequest,
    UpdateMemoryRequest,
    MemoriesResponse
} from "../types/memory.types";

export const createMemory = async (boardId: string,data: CreateMemoryRequest): Promise<Memory> => {
    const response = await api.post<Memory>(`/api/boards/${boardId}/memories`,data );
    return response.data;
};

export const getMemories = async (boardId: string, page: number = 1): Promise<MemoriesResponse> => {
    const response = await api.get<MemoriesResponse>(`/api/boards/${boardId}/memories`,{ params: { page } } );

    return response.data;
};

export const updateMemory = async (memoryId: string,data: UpdateMemoryRequest): Promise<Memory> => {
    const response = await api.patch<Memory>(`/api/memories/${memoryId}`, data);
    return response.data;
};
export const deleteMemory = async (memoryId: string): Promise<void> => {
    await api.delete(`/api/memories/${memoryId}`);
};

export const likeMemory = async (memoryId: string): Promise<LikeSummary> => {
    const response = await api.post<LikeSummary>(`/api/memories/${memoryId}/like`);
    return response.data;
};

export const unlikeMemory = async (memoryId: string): Promise<LikeSummary> => {
    const response = await api.delete<LikeSummary>(`/api/memories/${memoryId}/like`);
    return response.data;
};
