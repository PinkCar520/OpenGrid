import { Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  appRouter = this.trpcService.router({
    hello: this.trpcService.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        return {
          greeting: `Hello ${input.name || 'World'}!`,
        };
      }),

    // Auth routes
    login: this.trpcService.procedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      )
      .mutation(async ({ input }) => {
        return this.authService.login(input.email, input.password);
      }),

    register: this.trpcService.procedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
          password: z.string().min(6),
        }),
      )
      .mutation(async ({ input }) => {
        return this.authService.register(
          input.email,
          input.password,
          input.name,
        );
      }),

    // User queries and mutations
    getUsers: this.trpcService.protectedProcedure.query(async () => {
      return this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    }),

    getUserById: this.trpcService.procedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const user = await this.prisma.user.findUnique({
          where: { id: input.id },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        return user;
      }),

    createUser: this.trpcService.procedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
          password: z.string().min(6),
          role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const hashedPassword = await this.authService.hashPassword(
          input.password,
        );
        
        const user = await this.prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
            password: hashedPassword,
            role: input.role || 'USER',
          },
        });

        return { id: user.id };
      }),
  });

  // Export type router type signature, not router itself
  type = this.appRouter;
} 