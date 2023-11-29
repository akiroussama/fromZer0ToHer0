import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const port = 3000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: '0.0.0.0',
      port,
    },
    watch: {
      usePolling: true,
    },
    host: true,
    port,
  },
});
