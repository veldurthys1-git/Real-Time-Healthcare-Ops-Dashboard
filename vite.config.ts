import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Real-Time-Healthcare-Ops-Dashboard/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
