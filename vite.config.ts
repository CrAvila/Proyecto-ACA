import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  mode: 'production', // Add this line
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        // Ensure the .onnx files are copied to the output directory
        { src: '**/*.onnx', dest: 'dist' },
        // Copy the necessary ONNX Runtime Web assets
        { src: 'node_modules/onnxruntime-web/dist/*.wasm', dest: 'dist' },
      ]
    })
  ]
});
