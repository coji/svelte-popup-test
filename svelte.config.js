import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import("svelte").Config}  */
export default {
  preprocess: vitePreprocess(),
  compilerOptions: { css: 'injected' },
}
