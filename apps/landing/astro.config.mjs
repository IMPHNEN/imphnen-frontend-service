import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: ['..', '../..'],
      },
      proxy: {
        '/v1': {
          target: 'https://api.imphnen.dev',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
  output: 'static',
});
