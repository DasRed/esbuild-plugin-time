---
title: Überblick
description: esbuild-plugin-time gibt Start und Ende jedes esbuild-Builds auf der Konsole aus und misst die Dauer in Millisekunden. Kurzbeispiel, Arbeitsweise und Status.
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

Der Name erscheint grün, die Dauer gelb. Ein fehlgeschlagener Build endet mit einem roten `Build failed`.

## Was das Plugin macht

- In `onStart` merkt es sich die Startzeit, in `onEnd` gibt es die vergangene Zeit aus.
- Im Watch-Modus misst es jeden Rebuild.
- Mit einem Namen kannst du mehrere Bundles in der Ausgabe auseinanderhalten.
- Die Ausgabe geht an `console.log` oder an deinen eigenen Logger, mit oder ohne Farben.

## Status

Version 2, 2026 in TypeScript neu geschrieben. Wird als ESM und CommonJS mit Typdefinitionen ausgeliefert und hat
keine Laufzeit-Abhängigkeiten mehr. Getestet mit esbuild 0.28 und Node.js 22 und 26. Du kommst von Version 1? Siehe
[Migration](migration.md).

## Verwandte Pakete

Die drei esbuild-Plugins sind als Satz gedacht:

- [esbuild-plugin-clear](https://www.marco-starker.de/de/projekte/esbuild-plugin-clear): leert das Ausgabeverzeichnis
  vor dem Build.
- [esbuild-plugin-copy](https://www.marco-starker.de/de/projekte/esbuild-plugin-copy): kopiert nach dem Build Dateien
  in das Ausgabeverzeichnis.
