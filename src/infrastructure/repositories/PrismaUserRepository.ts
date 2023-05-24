import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/models/User';
import { Role } from '../../domain/models/Role';

const prisma = new PrismaClient();

export class PrismaUserRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserId(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
        deleted: false
      }
    });
  }

  async getUserBySurname(surname: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        surname: surname,
        deleted: false
      }
    });
  }

  async updateUser(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        surname: user.surname
      }
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        deleted: true
      }
    });
  }

  async getAllUsers(): Promise<Array<User> | null> {
    return await this.prisma.user.findMany({
      where: { deleted: false },
      select: {
        id: true,
        name: true,
        surname: true,
        passport: true,
        avatar_url: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            name: true
          },
        },
      }
    });
  }

  async createUser(userInput: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: userInput.name,
        surname: userInput.surname,
        passport: userInput.passport!,
        role_id: userInput.role_id
      }
    });
  }

  async findByRoleName(name: string): Promise<Role | null> {
    return await this.prisma.roles.findFirst({
      where: {
        name: name,
        deleted: false
      }
    });
  }

  async findByPassport(passport: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        passport: passport
      }
    });
  }
}
