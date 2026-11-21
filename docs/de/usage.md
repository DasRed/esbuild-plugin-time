---
title: Verwendung
description: Typische Einsätze von esbuild-plugin-time – ein Bundle, mehrere Bundles, Watch-Modus und die richtige Position in plugins.
order: 20
slug: verwendung
section: Einstieg
---

## Ein Bundle

Ohne Namen gibt das Plugin nur „Build started“ und die Dauer aus:

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

## Mehrere Bundles

Laufen mehrere Builds gleichzeitig, gib jedem einen Namen:

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

Die Ausgabe sieht dann etwa so aus:

```text
Build started for App
Build started for Worker
Build ended Worker: 12ms
Build ended App: 40ms
```

## Position in plugins

esbuild ruft die `onEnd`-Callbacks der Plugins nacheinander in der Reihenfolge auf, in der sie in `plugins` stehen.
Steht `time()` vorne, endet die Messung, bevor die anderen Plugins ihr `onEnd` erledigt haben. Soll zum Beispiel das
Kopieren durch [esbuild-plugin-copy](https://www.marco-starker.de/de/projekte/esbuild-plugin-copy) mitgemessen
werden, setz `time()` ans Ende:

```js
plugins: [
    clear('./dist'),
    copy({from: './public', to: '.'}),
    time('App'),
],
```

## Watch-Modus

Mit `esbuild.context()` und `watch()` erscheinen die beiden Zeilen bei jedem Rebuild. So siehst du direkt, dass eine
Änderung angekommen ist.

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
