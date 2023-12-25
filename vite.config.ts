import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteConfig from './svelte.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      ...svelteConfig,
      emitCss: false, // css を別ファイルに出力しない
    }),
  ],
  build: {
    lib: {
      entry: 'src/main.ts',
      fileName: 'techtalk-popup',
      formats: ['es'],
    },
  },
})
