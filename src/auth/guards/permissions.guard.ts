import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AppAbility,
  CaslAbilityFactory,
} from '../casl-ability.factory/casl-ability.factory';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from '../decorators/permissions.decorator';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const ability = await this.abilityFactory.createForUser(user);
    return requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission),
    );
  }
  private isAllowed(
    ability: AppAbility,
    permission: RequiredPermission,
  ): boolean {
    return ability.can(...permission);
  }
}
