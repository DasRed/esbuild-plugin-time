---
title: Installation
description: Install esbuild-plugin-time via npm as a dev dependency. Which versions of Node.js and esbuild you need and why the package is published as pure ESM.
order: 10
slug: installation
section: Getting started
---

You only need the plugin at build time, so add it as a dev dependency.

## Install the package

```bash
npm i -D esbuild-plugin-time
```

The plugin does not ship esbuild. If it is missing:

```bash
npm i -D esbuild
```

## Requirements

| What    | Version         | Why                                                   |
|---------|-----------------|-------------------------------------------------------|
| Node.js | with ESM        | The package is pure ESM                               |
| esbuild | with plugin API | Tested with 0.28; uses `onStart` and `onEnd`          |

The only dependency is [chalk](https://github.com/chalk/chalk) 4 for the colours.

> [!NOTE]
> The package has a single default export. Write your build script as `.mjs` or set `"type": "module"` in your
> `package.json`.
