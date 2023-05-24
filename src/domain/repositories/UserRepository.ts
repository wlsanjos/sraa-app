import { Role } from '../models/Role';
import { User } from '../models/User';
export interface UserRepository {
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;

  findByPassport(passport: string): Promise<User | null>;
  findByRoleName(name: string): Promise<Role | null>;

  getUserId(id: string): Promise<User | null>;
  getUserBySurname(name: string): Promise<User | null>;
  getAllUsers(): Promise<Array<User> | null>;
}
