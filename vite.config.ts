import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import { gas } from 'vite-plugin-google-apps-script';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig({
  // Using "gas" plugin causes the build to be much slower and the app still runs fine without it, so I decide to remove it for now.
  // plugins: [react(), gas(), viteSingleFile()],
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'app-script',
    emptyOutDir: false,
  },
});
