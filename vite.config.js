import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        ArcoResolver()
      ]
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: "E:\\desktop\\14Finger-docker\\nginx\\html",
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true,  //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log'],
      },
      output: {
        // 去掉注释内容
        comments: true,

      },
    },
  },

});