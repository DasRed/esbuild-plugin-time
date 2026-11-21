---
title: Installation
description: esbuild-plugin-time per npm installieren, Voraussetzungen und Abhängigkeiten.
order: 10
slug: installation
section: Einstieg
---

Das Plugin brauchst du nur beim Bauen, also als Dev-Abhängigkeit.

## Paket installieren

```bash
npm i -D esbuild-plugin-time
```

esbuild bringt das Plugin nicht mit. Falls es noch fehlt:

```bash
npm i -D esbuild
```

## Voraussetzungen

| Was     | Version        | Warum                                             |
|---------|----------------|---------------------------------------------------|
| Node.js | mit ESM        | Das Paket ist reines ESM                          |
| esbuild | mit Plugin-API | Getestet mit 0.28; gebraucht werden `onStart` und `onEnd` |

Als einzige Abhängigkeit kommt [chalk](https://github.com/chalk/chalk) 4 für die Farben mit.

> [!NOTE]
> Das Paket hat nur einen Default-Export. Schreib dein Build-Skript als `.mjs` oder setz `"type": "module"` in deiner
> `package.json`.
