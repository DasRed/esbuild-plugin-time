# esbuild-plugin-time

esbuild plugin that logs the start and end of every build to the console and measures its duration. Ships as ESM and
CommonJS with TypeScript types, without runtime dependencies.

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

## Local development

```bash
npm ci
npm test
npm run build
```

The package itself runs on Node.js 22.13 or later. Building and testing need Node.js 22.18 or later.

## License

[MIT](LICENSE)
