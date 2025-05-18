import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { MenuService } from '../../menu/menu.service';
import { createMenuItemSchema, updateMenuItemSchema } from '../../types/menu';
import { z } from 'zod';

@Injectable()
export class MenuRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly menuService: MenuService,
  ) {}
  router = this.trpcService.router({
    // 获取菜单树
    getMenuTree: this.trpcService.procedure.query(async () => {
      return this.menuService.getMenuTree();
    }),

    // 创建菜单项
    createMenuItem: this.trpcService.protectedProcedure
      .input(createMenuItemSchema)
      .mutation(async ({ input }) => {
        return this.menuService.createMenuItem(input);
      }),

    // 更新菜单项
    updateMenuItem: this.trpcService.protectedProcedure
      .input(
        z.object({
          id: z.string(),
          data: updateMenuItemSchema,
        }),
      )
      .mutation(async ({ input }) => {
        return this.menuService.updateMenuItem(input.id, input.data);
      }),

    // 删除菜单项
    deleteMenuItem: this.trpcService.protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await this.menuService.deleteMenuItem(input.id);
        return { success: true };
      }),
  });
}
