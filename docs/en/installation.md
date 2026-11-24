---
title: Installation
description: Install esbuild-plugin-time via npm as a dev dependency, which versions of Node.js and esbuild you need and how to import it as ESM, CommonJS or TypeScript.
order: 10
slug: installation
section: Getting started
---

You only need the plugin at build time, so add it as a dev dependency.

## Install the package

```bash
npm i -D esbuild-plugin-time
```

esbuild is a peer dependency. If it is missing:

```bash
npm i -D esbuild
```

## Requirements

| What    | Version         | Why                                                       |
|---------|-----------------|-----------------------------------------------------------|
| Node.js | 22.13 or later  | Minimum in `engines`, the oldest supported LTS line       |
| esbuild | 0.19 or later   | Peer dependency, tested with 0.28; uses `onStart` and `onEnd` |

The package has no runtime dependencies.

## Import

The package ships as ES module and as CommonJS, each with its own type definitions.

```js
import time from 'esbuild-plugin-time';
```

```js
const time = require('esbuild-plugin-time').default;
```

In CommonJS the default export sits in `.default`, next to the type exports. TypeScript and bundlers handle
`import … from` for you.

In TypeScript the options type is available as a named type export:

```ts
import time, {type TimePluginOptionInterface} from 'esbuild-plugin-time';

const options: TimePluginOptionInterface = {name: 'App'};
```
