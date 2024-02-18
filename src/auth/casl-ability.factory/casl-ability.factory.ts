import { MongoAbility, createMongoAbility } from '@casl/ability';
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
export type AppAbility = MongoAbility;
interface RawRule {
  action: string | string[];
  subject: string | string[];
  /** an array of fields to which user has (or not) access */
  fields?: string[];
  /** an object of conditions which restricts the rule scope */
  conditions?: any;
  /** indicates whether rule allows or forbids something */
  inverted?: boolean;
  /** message which explains why rule is forbidden */
  reason?: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}

  async createForUser(user: User) {
    const dbPermissions = await this.authService.findAllUserPermissions(user);
    const caslPermissions: RawRule[] = dbPermissions.map((permission) => ({
      action: permission.action as PermissionAction,
      subject: permission.object.code,
    }));

    return createMongoAbility(caslPermissions);
  }
}
