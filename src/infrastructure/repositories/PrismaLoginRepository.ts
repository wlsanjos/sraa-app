import { PrismaClient } from '@prisma/client';
import { Login } from '../../domain/models/Login';
import { Role } from '../../domain/models/Role';
import { User } from '../../domain/models/User';

export class PrismaLoginRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAccount(loginInput: Login): Promise<void> {
    await this.prisma.login.create({
      data: {
        username: loginInput.username,
        password: loginInput.password,
        user: {
          create: {
            name: loginInput.user!.name,
            passport: loginInput.user!.passport,
            role_id: loginInput.user!.role_id
          }
        }
      },
    });
  }

  async findByLoginAndUser(username: string, is_active: boolean = true): Promise<Login | null> {
    return await this.prisma.login.findFirst({
      where: {
        username: username,
        is_active: is_active
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            passport: true,
            avatar_url: true,
            role: {
              select: {
                id: true,
                name: true,
                deleted: true
              }
            }
          }
        }
      }
    });
  }

  async findByUserPassport(passport: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { passport: passport } });
  }

  async findByRoleName(name: string): Promise<Role | null> {
    return await this.prisma.roles.findFirst({ where: { name: name } })
  }

  async findByUsername(username: string): Promise<Login | null> {
    return await this.prisma.login.findFirst({
      where: {
        username: username
      },
      include: { user: true }
    });
  }
}
