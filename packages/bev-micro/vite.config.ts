import { fileURLToPath, URL} from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import qiankun from 'vite-plugin-qiankun';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    qiankun('bevMicro', {
      useDevMode: true, // 在开发模式下使用
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '#': '/src/components',
      'element-plus': path.resolve(__dirname,'node_modules/element-plus'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
    modules: {
      localsConvention: 'camelCase', // CSS 类名转为驼峰
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 生成唯一类名
    }
  },
  server: {
    port: 5110,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
