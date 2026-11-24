import type TimePluginOptionInterface from '@/TimePluginOptionInterface';
import type {BuildResult, Plugin, PluginBuild} from 'esbuild';
import {styleText} from 'node:util';

export default function time(options: TimePluginOptionInterface | string = {}): Plugin {
    const {colors = true, logger = console.log, name = ''} = typeof options === 'string' ? {name: options} : options;

    const style = (color: 'green' | 'red' | 'yellow', text: string): string => colors ? styleText(color, text) : text;

    return {
        name:  'time',
        setup: (build: PluginBuild): void => {
            let start = performance.now();

            build.onStart((): void => {
                start = performance.now();

                logger(name === '' ? 'Build started' : `Build started for ${style('green', name)}`);
            });

            build.onEnd((result: BuildResult): void => {
                const duration = style('yellow', `${Math.round(performance.now() - start)}ms`);
                const label    = result.errors.length > 0 ? style('red', 'Build failed') : 'Build ended';

                logger(name === '' ? `${label}: ${duration}` : `${label} ${style('green', name)}: ${duration}`);
            });
        },
    };
}
