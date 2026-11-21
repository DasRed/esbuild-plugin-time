---
title: Überblick
description: esbuild-Plugin, das Start und Ende jedes Builds auf der Konsole ausgibt und die Dauer in Millisekunden misst.
order: 0
section: Einstieg
---

esbuild ist schnell, aber bei mehreren Bundles oder im Watch-Modus willst du trotzdem sehen, wann ein Build läuft und
wie lange er braucht. `esbuild-plugin-time` gibt dafür zu jedem Build zwei Zeilen auf der Konsole aus.

## Kurzbeispiel

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

Ausgabe:

```text
Build started for App
Build ended App: 42ms
```

Der Name erscheint grün, die Dauer gelb.

## Was das Plugin macht

- In `onStart` merkt es sich die Startzeit, in `onEnd` gibt es die vergangene Zeit aus.
- Im Watch-Modus misst es jeden Rebuild.
- Mit einem Namen kannst du mehrere Bundles in der Ausgabe auseinanderhalten.

## Status

Version 1.0.0, geschrieben 2021. Getestet mit esbuild 0.28 und Node.js 22.

## Verwandte Pakete

Die drei esbuild-Plugins sind als Satz gedacht:

- [esbuild-plugin-clear](https://www.marco-starker.de/de/projekte/esbuild-plugin-clear): leert das Ausgabeverzeichnis
  vor dem Build.
- [esbuild-plugin-copy](https://www.marco-starker.de/de/projekte/esbuild-plugin-copy): kopiert nach dem Build Dateien
  in das Ausgabeverzeichnis.
