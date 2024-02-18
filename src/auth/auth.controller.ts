import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication and Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async signIn(@Body() { id }: Record<string, any>) {
    return this.authService.signIn(id);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('permissions')
  async getPermissions(@Request() req: any) {
    return this.authService.findAllUserPermissions(req.user);
  }
}
