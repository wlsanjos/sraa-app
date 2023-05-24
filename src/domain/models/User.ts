import { Role } from "./Role";
export interface User {
  id?: string;
  surname?: string | null;
  name: string;
  passport?: string | null;
  member_id?: string | null;
  avatar_url?: string | null;
  role?: Role | null;
  role_id?: string | null;
  deleted?: boolean | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}