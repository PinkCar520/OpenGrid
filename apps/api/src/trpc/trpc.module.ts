import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { AuthModule } from '../auth/auth.module';
import { MenuModule } from '../menu/menu.module';
import { MenuRouter } from './routers/menu.router';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, MenuModule, PrismaModule],
  providers: [TrpcService, TrpcRouter, MenuRouter],
  exports: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
