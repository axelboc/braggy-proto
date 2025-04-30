import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  server: { open: true },
  build: { sourcemap: true },
  plugins: [
    react(),
    legacy({
      targets: [
        '>1%',
        'Firefox 68',
        'Firefox ESR',
        'not ie 11',
        'not op_mini all',
        'not dead',
      ],
    }),
  ],
});
