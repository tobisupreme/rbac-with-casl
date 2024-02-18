import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaClient, PrismaService],
  exports: [PrismaClient, PrismaService],
})
export class DatabaseModule {}
