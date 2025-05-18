// src/menu/menu.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { MenuItem } from '../types/menu';
import { TRPCError } from '@trpc/server';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // 获取菜单树
  async getMenuTree() {
    const items = await this.prisma.menuItem.findMany({
      orderBy: { order: 'asc' },
      // where: { visible: true },
    });
    return this.buildMenuTree(items);
  }

  // 创建菜单项
  async createMenuItem(data: Omit<MenuItem, 'id'>) {
    return this.prisma.menuItem.create({
      data: {
        name: data?.name,
        label: data.label,
        path: data.path,
        icon: data.icon,
        parentId: data.parentId || null,
        order: data.order,
        visible: data.visible,
      },
    });
  }

  // 更新菜单项
  async updateMenuItem(id: string, data: Partial<MenuItem>) {
    try {
      return await this.prisma.menuItem.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Menu item not found',
      });
    }
  }

  // 删除菜单项
  async deleteMenuItem(id: string) {
    try {
      await this.prisma.menuItem.delete({
        where: { id },
      });
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Menu item not found',
      });
    }
  }

  // 构建菜单树
  private buildMenuTree(items: any[], parentId: string | null = null): any[] {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        id: item.id,
        parentId: item.parentId,
        data: {
          id: item.id,
          label: item.label,
          icon: item.icon,
          title: item.name,
          value: item.path,
        },
        children: this.buildMenuTree(items, item.id),
      }));
  }
}
