---
title: Options
description: The single parameter of esbuild-plugin-time, the output format and the known limitations.
order: 30
slug: options
section: Reference
---

`time()` takes an optional name and returns an esbuild plugin named `Log`.

```js
time('App')
```

## Parameter

| Name   | Type     | Default | Description                                          |
|--------|----------|---------|------------------------------------------------------|
| `name` | `string` | empty   | Name of the build in the output. Left out if empty   |

## Output

| When      | With name                    | Without name          |
|-----------|------------------------------|-----------------------|
| `onStart` | `Build started for <name>`   | `Build started`       |
| `onEnd`   | `Build ended <name>: <ms>ms` | `Build ended: <ms>ms` |

Output goes through `console.log`. The name is coloured green, the duration yellow.

## Limitations

- **No distinction on errors.** If a build fails, the plugin still reports "Build ended" with a duration.
- **Fixed output.** Text, colours and target (`console.log`) cannot be changed, e.g. for your own logging.
- **The measurement depends on the position in `plugins`**, see [Usage](usage.md#position-in-plugins).
