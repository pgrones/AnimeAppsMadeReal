import { defineConfig } from 'vite';

export default {
  buildOptions: {
    site: 'https://www.aniapps.dev',
    sitemap: true,
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  renderers: [
    "@astrojs/renderer-react"
  ],
  vite: defineConfig({
    ssr: {
      external: ['firebase/app', 'firebase/database', 'firebase/auth']
    }
  })
};
