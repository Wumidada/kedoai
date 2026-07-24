import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { resolve } from "path";
import viteCompression from 'vite-plugin-compression';
import { splitVendorChunkPlugin } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCommonjs(),
    splitVendorChunkPlugin(),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 10240,
      deleteOriginFile: false,
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/theme.scss" as *;`,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('ant-design-vue')) {
              return 'antd';
            } else if (id.includes('vue') || id.includes('vue-router')) {
              return 'vendor';
            } else if (id.includes('vue-i18n')) {
              return 'i18n';
            } else if (id.includes('axios') || id.includes('crypto-js') || id.includes('lodash-es') || id.includes('mitt') || id.includes('qrcode')) {
              return 'utils';
            } else if (id.includes('pinia')) {
              return 'store';
            } else if (id.includes('three')) {
              return 'three';
            }
          }
        },
      }
    },
    cacheDir: 'node_modules/.vite',
    // 启用持久化缓存
    persistentCache: true,
    // 确保所有图片资源都能被正确处理
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
    // 修复路径处理问题
    publicDir: 'public',
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vue-i18n', 'ant-design-vue'],
    exclude: ['node_modules'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VITE_APP_BASE_URL || 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
