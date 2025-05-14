import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrpcHandler } from './trpc';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TrpcModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, TrpcHandler],
})
export class AppModule {}
