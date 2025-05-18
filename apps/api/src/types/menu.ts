// src/types/menu.ts
import { z } from 'zod';

// 菜单项验证模式
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  path: z.string(),
  icon: z.string().optional(),
  parentId: z.string().nullable(),
  order: z.number(),
  visible: z.boolean(),
});

// 创建菜单的输入验证
export const createMenuItemSchema = menuItemSchema.omit({ id: true });

// 更新菜单的输入验证
export const updateMenuItemSchema = menuItemSchema.partial();

export type MenuItem = z.infer<typeof menuItemSchema>;
