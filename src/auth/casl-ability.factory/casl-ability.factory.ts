import { Ability, createMongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ALL = 'manage',
}
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}

  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions = await this.authService.findAllUserPermissions(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map(
      (permission) => ({
        action: permission.action as PermissionAction,
        subject: permission.object.name,
      }),
    );

    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }

  async createAbilityForUser(user: User) {
    const dbPermissions = await this.authService.findAllUserPermissions(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map(
      (permission) => ({
        action: permission.action as PermissionAction,
        subject: permission.object.name,
      }),
    );

    return createMongoAbility(caslPermissions);
  }
}
