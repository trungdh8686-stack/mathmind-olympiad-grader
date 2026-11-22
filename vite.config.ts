import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on any host (Vercel, GitHub Pages, etc.)
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
