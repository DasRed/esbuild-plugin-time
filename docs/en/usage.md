---
title: Usage
description: Typical uses of esbuild-plugin-time: one bundle, several bundles, a custom logger, failed builds, watch mode and the right position in the plugins array.
order: 20
slug: usage
section: Getting started
---

## One bundle

Without a name the plugin only prints "Build started" and the duration:

```js
import esbuild from 'esbuild';
import time from 'esbuild-plugin-time';

await esbuild.build({
    entryPoints: ['./src/index.js'],
    bundle:      true,
    outfile:     './dist/index.js',
    plugins:     [
        time(),
    ],
});
```

```text
Build started
Build ended: 42ms
```

## Several bundles

If several builds run at the same time, give each a name:

```js
await Promise.all([
    esbuild.build({
        entryPoints: ['./src/index.js'],
        bundle:      true,
        outfile:     './dist/index.js',
        plugins:     [time('App')],
    }),
    esbuild.build({
        entryPoints: ['./src/worker.js'],
        bundle:      true,
        outfile:     './dist/worker.js',
        plugins:     [time('Worker')],
    }),
]);
```

The output then looks something like this:

```text
Build started for App
Build started for Worker
Build ended Worker: 12ms
Build ended App: 40ms
```

## Failed builds

If esbuild reports errors, the last line says so:

```text
Build started for App
Build failed App: 8ms
```

## Your own logger

Pass a function as `logger` to send the lines somewhere else, e.g. to your own logging. Turn colors off if the target
cannot show them:

```js
time({
    name:   'App',
    colors: false,
    logger: (message) => logger.info(message),
})
```

Colors are left out automatically if the terminal does not support them or `NO_COLOR` is set.

## Position in plugins

esbuild calls the plugins' `onEnd` callbacks one after another, in the order they appear in `plugins`. If `time()` comes
first, the measurement ends before the other plugins have finished their `onEnd`. To include, for example, the copying
done by [esbuild-plugin-copy](https://www.marco-starker.de/en/projects/esbuild-plugin-copy), put `time()` last:

```js
plugins: [
    clear(),
    copy({from: './public'}),
    time('App'),
],
```

## Watch mode

With `esbuild.context()` and `watch()` the two lines appear on every rebuild, so you see right away that a change has
arrived.

```js
const ctx = await esbuild.context({
    entryPoints: ['./src/index.js'],
    bundle:      true,
    outfile:     './dist/index.js',
    plugins:     [
        time('App'),
    ],
});

await ctx.watch();
```
