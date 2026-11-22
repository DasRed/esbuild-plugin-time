# esbuild-plugin-time

esbuild plugin that logs the start and end of every build to the console and measures its duration.

Documentation: https://www.marco-starker.de/en/projects/esbuild-plugin-time/docs
(Deutsch: https://www.marco-starker.de/de/projekte/esbuild-plugin-time/doku)

## Quick start

```bash
npm i -D esbuild-plugin-time
```

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

```text
Build started for App
Build ended App: 42ms
```

## License

[MIT](LICENSE)
