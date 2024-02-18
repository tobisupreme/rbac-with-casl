import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule],
})
export class AppModule {}
