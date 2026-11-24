---
title: Overview
description: esbuild-plugin-time logs the start and end of every esbuild build to the console and measures its duration in milliseconds. Quick example, behaviour and status.
order: 0
section: Getting started
---

esbuild is fast, but with several bundles or in watch mode you still want to see when a build runs and how long it
takes. `esbuild-plugin-time` prints two lines to the console for every build.

## Quick example

```js
import esbuild from 'esbuild';
import time from 'esbuild-plugin-time';

await esbuild.build({
    entryPoints: ['./src/index.js'],
    bundle:      true,
    outfile:     './dist/index.js',
    plugins:     [
        time('App'),
    ],
});
```

Output:

```text
Build started for App
Build ended App: 42ms
```

The name is shown in green, the duration in yellow. A failed build ends with a red `Build failed`.

## What the plugin does

- In `onStart` it remembers the start time, in `onEnd` it prints the elapsed time.
- In watch mode it measures every rebuild.
- A name lets you tell several bundles apart in the output.
- The output goes to `console.log` or to your own logger, with or without colors.

## Status

Version 2, rewritten in TypeScript in 2026. Ships as ESM and CommonJS with type definitions and has no runtime
dependencies anymore. Tested with esbuild 0.28 and Node.js 22 and 26. Coming from version 1? See [Migration](migration.md).

## Related packages

The three esbuild plugins are meant as a set:

- [esbuild-plugin-clear](https://www.marco-starker.de/en/projects/esbuild-plugin-clear): empties the output directory
  before the build.
- [esbuild-plugin-copy](https://www.marco-starker.de/en/projects/esbuild-plugin-copy): copies files into the output
  directory after the build.
