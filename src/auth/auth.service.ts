import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaClient: PrismaClient,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async findAllUserPermissions(user: User) {
    return await this.prismaClient.permission.findMany({
      where: {
        role_permissions: { some: { roleId: user.roleId } },
      },
      include: { object: true },
    });
  }

  async signIn(id: number) {
    try {
      const user = await this.usersService.findOne(id);
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      console.log(
        '🚀 ~ file: auth.service.ts:26 ~ AuthService ~ signIn ~ e:',
        e,
      );
      throw new UnauthorizedException();
    }
  }
}
