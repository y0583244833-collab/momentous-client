export interface LoginRequest{
    email:string,
    password:string,
  }
  // export interface User {
  //   id: string;
  //   fullName: string;
  //   email: string;
  //   role: "USER" | "ADMIN";
  //   avatarImageId: string | null;
  //   avatarUrl: string | null;
  //   isBlocked: boolean;
  //   createdAt: string;
  // }
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  avatarImageId: string | null;
  avatarUrl: string | null;
  isBlocked: boolean;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export interface AuthContextType{
    user:UserProfile|null,
    isAuthenticated:boolean,
    login:(Response:LoginResponse)=>void
    logout:()=>void
    token:string|null;
    updateUser: (user: UserProfile) => void;

}
export interface SignUpRequest{
  email:string,
  password:string,
}

export interface SignUpResponse{
    token: string;
  user: UserProfile;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
}




