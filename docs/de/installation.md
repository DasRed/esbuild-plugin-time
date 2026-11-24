---
title: Installation
description: esbuild-plugin-time per npm installieren, welche Versionen von Node.js und esbuild du brauchst und wie du es als ESM, CommonJS oder in TypeScript lädst.
order: 10
slug: installation
section: Einstieg
---

Das Plugin brauchst du nur beim Bauen, also als Dev-Abhängigkeit.

## Paket installieren

```bash
npm i -D esbuild-plugin-time
```

esbuild ist eine Peer-Abhängigkeit. Falls es noch fehlt:

```bash
npm i -D esbuild
```

## Voraussetzungen

| Was     | Version     | Warum                                                          |
|---------|-------------|----------------------------------------------------------------|
| Node.js | ab 22.13    | Mindestversion in `engines`, älteste unterstützte LTS-Linie    |
| esbuild | ab 0.19     | Peer-Abhängigkeit, getestet mit 0.28; gebraucht werden `onStart` und `onEnd` |

Zur Laufzeit hat das Paket keine Abhängigkeiten.

## Import

Das Paket gibt es als ES-Modul und als CommonJS, jeweils mit eigenen Typdefinitionen.

```js
import time from 'esbuild-plugin-time';
```

```js
const time = require('esbuild-plugin-time').default;
```

In CommonJS liegt der Default-Export unter `.default`, neben den Typ-Exporten. TypeScript und Bundler erledigen
das bei `import … from` für dich.

In TypeScript bekommst du den Typ der Optionen als benannten Typ-Export:

```ts
import time, {type TimePluginOptionInterface} from 'esbuild-plugin-time';

const options: TimePluginOptionInterface = {name: 'App'};
```
