---
title: Optionen
description: Der einzige Parameter von esbuild-plugin-time, das Ausgabeformat und die bekannten Grenzen.
order: 30
slug: optionen
section: Referenz
---

`time()` nimmt einen optionalen Namen und gibt ein esbuild-Plugin mit dem Namen `Log` zurück.

```js
time('App')
```

## Parameter

| Name   | Typ      | Standard | Beschreibung                                         |
|--------|----------|----------|------------------------------------------------------|
| `name` | `string` | leer     | Name des Builds in der Ausgabe. Ohne Namen entfällt er |

## Ausgabe

| Zeitpunkt   | Mit Namen                      | Ohne Namen              |
|-------------|--------------------------------|-------------------------|
| `onStart`   | `Build started for <name>`     | `Build started`         |
| `onEnd`     | `Build ended <name>: <ms>ms`   | `Build ended: <ms>ms`   |

Die Ausgabe läuft über `console.log`. Der Name ist grün, die Dauer gelb eingefärbt.

## Einschränkungen

- **Kein Unterschied bei Fehlern.** Schlägt ein Build fehl, meldet das Plugin trotzdem „Build ended“ mit Dauer.
- **Feste Ausgabe.** Text, Farben und Ziel (`console.log`) lassen sich nicht ändern, etwa für ein eigenes Logging.
- **Die Messung hängt von der Position in `plugins` ab**, siehe [Verwendung](usage.md#position-in-plugins).
