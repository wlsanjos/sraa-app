import { User } from "./User";
export interface Login {
  id?: string | null;
  username: string;
  password: string;
  confirmPassword?: string | null; 
  guild_id?: string | null;
  user_id?: string | null;
  user?: User | null;
  is_active?: boolean | null;
  deleted?: boolean | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
