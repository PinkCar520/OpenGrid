import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('hpvMicro', {
      useDevMode: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      extensions: ['vue', 'md'],
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
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    }
  },
  server: {
    cors: true,
    origin: 'http://localhost:5140',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
