import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: true,
  minify: true,
  splitting: false,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'css'
    };
  },
  loader: {
    '.css': 'css'
  }
}); 