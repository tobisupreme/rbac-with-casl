import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { DatabaseModule } from '../common/database/database.module';
import { PermissionsGuard } from './guards/permissions.guard';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  providers: [
    AuthService,
    CaslAbilityFactory,
    PermissionsGuard,
    UsersService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [AuthService, CaslAbilityFactory, PermissionsGuard],
  controllers: [AuthController],
})
export class AuthModule {}
