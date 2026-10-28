// export type Role = "USER" | "ADMIN";

// export type EventType = "TRIP" | "GRADUATION" | "CAMP" | "FAMILY" | "OTHER";

// export type MemoryType = "PHOTO" | "PLACE" | "SUMMARY" | "JOKE" | "QUOTE";

// export interface Page<T> {
//   items: T[];
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
// }

// export interface ApiErrorDetail {
//   location: string;
//   field: string;
//   message: string;
// }

// export interface ApiError {
//   error: {
//     code: string;
//     message: string;
//     details?: ApiErrorDetail[];
//   };
// }

// // האפשרויות לתפריטים, מ-GET /api/options
// export interface Option<T extends string> {
//   value: T;
//   label: string;
// }

// export interface OptionsResponse {
//   memoryTypes: Option<MemoryType>[];
//   eventTypes: Option<EventType>[];
// }
