import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pong', // Replace with your GitHub repo name
  resolve: {
    alias: {
      entities: path.resolve(__dirname, 'src/entities'),
      utils: path.resolve(__dirname, 'src/utils'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
});
