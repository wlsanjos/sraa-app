import { Login } from '../models/Login';
import { Role } from '../models/Role';
import { User } from '../models/User';

export interface LoginRepository {
  findByRoleName(name: string): Promise<Role | null>;

  createAccount(login: Login): Promise<void>;
  findByUsername(username: string): Promise<Login | null>;

  findByUserPassport(passport: string): Promise<User | null>;

  findByLoginAndUser(username: string, is_active?: boolean): Promise<Login | null>;
}