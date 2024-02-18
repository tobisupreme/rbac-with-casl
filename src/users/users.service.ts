import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaClient: PrismaClient) {}

  async create({ email, roleId }: CreateUserDto) {
    return await this.prismaClient.user.create({
      data: {
        email,
        role: { connect: { id: roleId } },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.user.findMany({
      select: { id: true, email: true, role: true },
    });
  }

  async findOne(id: number) {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { id },
      include: { role: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaClient.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async getProfile(sub: number) {
    return await this.findOne(sub);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
