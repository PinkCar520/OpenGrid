import { Injectable } from '@nestjs/common';
import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

// 创建上下文类型
export const createContext = async ({ req }: { req: Request }) => {
  let user = null;

  try {
    // 从请求头中获取JWT令牌
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key-here',
      );
      user = decoded;
    }
  } catch (_error) {
    // 令牌验证失败，用户未认证
  }

  return { user, req };
};

export type Context = inferAsyncReturnType<typeof createContext>;

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<Context>().create({
    transformer: superjson,
  });

  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;

  // Middleware to check if user is authenticated
  isAuthed = this.trpc.middleware(({ next, ctx }) => {
    // Add your authentication logic here
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      });
    }
    return next({
      ctx: {
        user: ctx.user,
        req: ctx.req,
      },
    });
  });

  protectedProcedure = this.procedure.use(this.isAuthed);
} 