/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ui',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  build: {
    outDir: '../../dist/libs/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: [
        'src/atoms/index.ts',
        'src/molecules/index.ts',
        'src/organisms/index.ts',
      ],
      name: 'ui',
      fileName: 'index',
      formats: ['es' as const],
    },
    rollupOptions: {
      external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            'react-router-dom',
            '@ant-design/icons',
            '@imphnen-frontend-service/service',
            '@imphnen-frontend-service/utils',
          ],
    },
  },
  test: {
    watch: false,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globalsSetup: './vitest.setup.ts',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/ui',
      provider: 'v8' as const,
    },
  },
}));
