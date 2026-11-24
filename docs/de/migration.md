---
title: Migration
description: Was sich bei esbuild-plugin-time von Version 1 auf 2 geändert hat: fehlgeschlagene Builds, eigener Logger, Farben ohne chalk, Name, CommonJS, Typen und Node.js.
order: 40
slug: migration
section: Referenz
---

## Von 1 auf 2

Version 2 ist in TypeScript neu geschrieben. `time()` und `time('App')` funktionieren weiter und geben bei erfolgreichen
Builds dieselben Zeilen aus.

| Thema               | Version 1                          | Version 2                                                     |
|---------------------|------------------------------------|---------------------------------------------------------------|
| Fehlgeschlagener Build | `Build ended` mit Dauer         | `Build failed` in Rot mit Dauer                               |
| Ziel der Ausgabe    | immer `console.log`                | `console.log` oder dein eigener `logger`                      |
| Farben              | über chalk 4                       | über `styleText` von Node.js, beachtet `NO_COLOR`, Option `colors` |
| Abhängigkeiten      | chalk                              | keine                                                         |
| Name des Plugins    | `Log`                              | `time`                                                        |
| Modulformate        | nur ESM                            | ESM und CommonJS, mit Typdefinitionen                         |
| Node.js             | jede Version mit ESM               | ab 22.13                                                      |

## Was du prüfen solltest

- Wertest du die Ausgabe aus, endet ein fehlgeschlagener Build jetzt mit `Build failed` statt `Build ended`.
- Prüft dein eigenes Tooling Plugin-Namen, heißt das Plugin jetzt `time`.
