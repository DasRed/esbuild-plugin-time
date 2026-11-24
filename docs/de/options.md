---
title: Optionen
description: Die Optionen von esbuild-plugin-time: name, logger und colors, wie die Zeitausgabe mit und ohne Namen und bei Fehlern aussieht und welche Grenzen es gibt.
order: 30
slug: optionen
section: Referenz
---

`time()` nimmt einen Namen oder ein Objekt mit Optionen und gibt ein esbuild-Plugin mit dem Namen `time` zurück.

```js
time()
time('App')
time({name: 'App', colors: false, logger: console.info})
```

Ein String ist die Kurzform für `{name: '…'}`.

## Optionen

| Name     | Typ                          | Standard      | Beschreibung                                               |
|----------|------------------------------|---------------|------------------------------------------------------------|
| `name`   | `string`                     | leer          | Name des Builds in der Ausgabe. Ohne Namen entfällt er     |
| `logger` | `(message: string) => void`  | `console.log` | Bekommt jede Zeile der Ausgabe                             |
| `colors` | `boolean`                    | `true`        | Färbt Name, Dauer und Fehler ein                           |

Auch mit `colors: true` lässt das Plugin die Farben weg, wenn das Terminal keine kann oder `NO_COLOR` gesetzt ist.
`FORCE_COLOR` schaltet sie in jedem Fall ein.

## Ausgabe

| Zeitpunkt          | Mit Namen                     | Ohne Namen             |
|--------------------|-------------------------------|------------------------|
| `onStart`          | `Build started for <name>`    | `Build started`        |
| `onEnd`, Erfolg    | `Build ended <name>: <ms>ms`  | `Build ended: <ms>ms`  |
| `onEnd`, mit Fehlern | `Build failed <name>: <ms>ms` | `Build failed: <ms>ms` |

Die Dauer ist auf ganze Millisekunden gerundet. Mit Farben ist der Name grün, die Dauer gelb und `Build failed` rot.

## Einschränkungen

- **Fester Text.** Den Wortlaut der Zeilen kannst du nicht ändern, nur wohin sie gehen.
- **Die Messung hängt von der Position in `plugins` ab**, siehe [Verwendung](usage.md#position-in-plugins).
