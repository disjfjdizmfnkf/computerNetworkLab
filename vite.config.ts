import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    // 自动引入element库css样式的插件
    // createStyleImportPlugin({
    //   resolves:[
    //     AndDesignVueResolve(),
    //     VantResolve(),
    //     ElementPlusResolve(),
    //     NutuiResolve(),
    //     AntdResolve(),]
    // }),
  ],
  resolve: {
    alias: {
      // 打包时解析 @ 别名为 src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3001',
        ws: true,
      }
    }
  }
})
