---
title: Options
description: The options of esbuild-plugin-time: name, logger and colors, what the timing output looks like with and without a name, for failed builds and its limitations.
order: 30
slug: options
section: Reference
---

`time()` takes a name or an options object and returns an esbuild plugin named `time`.

```js
time()
time('App')
time({name: 'App', colors: false, logger: console.info})
```

A string is short for `{name: '…'}`.

## Options

| Name     | Type                         | Default       | Description                                                   |
|----------|------------------------------|---------------|---------------------------------------------------------------|
| `name`   | `string`                     | empty         | Name of the build in the output. Left out if empty            |
| `logger` | `(message: string) => void`  | `console.log` | Receives every line of output                                 |
| `colors` | `boolean`                    | `true`        | Colors name, duration and failure                             |

Even with `colors: true` the plugin leaves colors out if the terminal does not support them or `NO_COLOR` is set.
`FORCE_COLOR` turns them on regardless.

## Output

| When                 | With name                     | Without name           |
|----------------------|-------------------------------|------------------------|
| `onStart`            | `Build started for <name>`    | `Build started`        |
| `onEnd`, success     | `Build ended <name>: <ms>ms`  | `Build ended: <ms>ms`  |
| `onEnd`, with errors | `Build failed <name>: <ms>ms` | `Build failed: <ms>ms` |

The duration is rounded to whole milliseconds. With colors the name is green, the duration yellow and
`Build failed` red.

## Limitations

- **Fixed text.** The wording of the lines cannot be changed, only where they go.
- **The measurement depends on the position in `plugins`**, see [Usage](usage.md#position-in-plugins).
