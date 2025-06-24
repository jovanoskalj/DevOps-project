import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    define: {
      'process.env': {
        VITE_API_BASE_URL: env.VITE_API_BASE_URL || 'http://localhost:8080/api',
      },
    },
  };
});
