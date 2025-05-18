import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService, createContext } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type AppRouter = TrpcRouter['type'];
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable()
export class TrpcHandler {
  constructor(
    private readonly trpcRouter: TrpcRouter,
    private readonly trpcService: TrpcService,
  ) {}

  async applyMiddleware(app: INestApplication) {
    // 添加 tRPC 中间件
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.trpcRouter.appRouter,
        createContext,
      }),
    );
  }
}
