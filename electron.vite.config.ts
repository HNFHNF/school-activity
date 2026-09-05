import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

const projectRoot = resolve(__dirname)

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: resolve(projectRoot, 'electron/main.ts'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: resolve(projectRoot, 'electron/preload.ts'),
        output: {
          format: 'cjs',
          entryFileNames: 'preload.cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
        },
      },
    },
  },
  renderer: {
    root: projectRoot,
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: resolve(projectRoot, 'index.html'),
      },
    },
  },
})
