
export type EventType =
  | "TRIP"
  | "GRADUATION"
  | "CAMP"
  | "FAMILY"
  | "OTHER";

export interface PublicUser {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  eventType: EventType;
  eventTypeLabel: string;
  eventDate: string;
  coverImageId: string | null;
  coverImageUrl: string | null;
  creator: PublicUser;
  isCreator: boolean;
  joinCode: string | null;
  membersCount: number;
  memoriesCount: number;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupsResponse {
  items: Group[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
// export interface CreateGroupRequest {
//   name: string;
//   description?: string;
//   eventType: EventType;
//   eventDate: string;
//   coverImageId?: string;
// }
export interface CreateGroupRequest {
  name: string;
  description?: string;
  eventType: EventType;
  eventDate: string;
  coverImageId?: string;
  emails?: string[];
}
export interface GroupFilters {
  q?: string;
  eventType?: EventType;
  from?: string;
  to?: string;
  role?: "created" | "joined";
  sort?: "eventDate" | "name" | "lastActivity";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
export interface UpdateGroupRequest {
  name?: string;
  description?: string | null;
  eventType?: EventType;
  eventDate?: string;
  coverImageId?: string | null;
}