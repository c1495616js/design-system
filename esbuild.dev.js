const esbuild = require('esbuild');
const sharedConfig = require('esbuild.common');

esbuild
  .build({
    ...sharedConfig,
    entryPoints: ['src/index.tsx'],
    outDir: 'dist/esm',
    sourcemap: true,
    format: 'esm',
    watch: true,
    banner: {
      js: "import {createElement, Fragment} from 'react';\n",
    },
  })
  .catch(() => process.exit(1));
