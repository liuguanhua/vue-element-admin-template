import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const { resolve } = path

// https://vitejs.dev/config/
export default defineConfig({
  //build部署后报错 https://blog.csdn.net/xingorg/article/details/120537203
  base: '/',
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue'`,
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/sass/common/variable";
          @import "./src/assets/styles/sass/common/mixin";
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://react-admin.lgh930.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ""),
      },
    },
  },
})
