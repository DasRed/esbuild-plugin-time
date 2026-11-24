---
title: Migration
description: What changed in esbuild-plugin-time from version 1 to 2: failed builds, custom logger, colors without chalk, plugin name, CommonJS, types and Node.js.
order: 40
slug: migration
section: Reference
---

## From 1 to 2

Version 2 is a rewrite in TypeScript. `time()` and `time('App')` keep working and print the same lines for successful
builds.

| Topic            | Version 1                         | Version 2                                              |
|------------------|-----------------------------------|--------------------------------------------------------|
| Failed build     | `Build ended` with duration       | `Build failed` in red with duration                    |
| Output target    | always `console.log`              | `console.log` or your own `logger`                     |
| Colors           | via chalk 4                       | via Node.js `styleText`, respects `NO_COLOR`, `colors` option |
| Dependencies     | chalk                             | none                                                   |
| Plugin name      | `Log`                             | `time`                                                 |
| Module formats   | ESM only                          | ESM and CommonJS, with type definitions                |
| Node.js          | any version with ESM              | 22.13 or later                                          |

## What to check

- If you parse the output, a failed build now ends with `Build failed` instead of `Build ended`.
- If you check plugin names in your own tooling, the name is now `time`.
