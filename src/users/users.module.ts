import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../common/database/database.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UsersService],
})
export class UsersModule {}
