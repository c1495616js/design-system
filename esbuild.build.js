const esbuild = require('esbuild');
const sharedConfig = require('./esbuild.common');
const { globPlugin } = require('esbuild-plugin-glob');

const buildConfig = {
  ...sharedConfig,
  minify: true,
};

esbuild
  .build({
    ...buildConfig,
    entryPoints: ['src/index.ts'],
    outdir: 'dist/cjs',
    format: 'cjs',
    banner: {
      js: "const { createElement, Fragment } = require('react');\n",
    },
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...buildConfig,
    entryPoints: [
      'src/index.ts',
      'src/components/**/index.tsx',
      'src/lib/stitches.config.ts',
      'src/lib/globalStyles.ts',
    ],
    outdir: 'dist/esm',
    splitting: true,
    format: 'esm',
    banner: {
      js: "import { createElement, Fragment } from 'react';\n",
    },
    plugins: [globPlugin()],
  })
  .catch(() => process.exit(1));
