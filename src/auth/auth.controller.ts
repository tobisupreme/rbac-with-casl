import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('Authentication and Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(@Body() { id }: Record<string, any>) {
    return this.authService.signIn(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
