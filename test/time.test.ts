import time from '@/time';
import esbuild, {type BuildResult, type PluginBuild} from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, it, vi} from 'vitest';

interface FakeBuildInterface {
    end: (errors?: number) => void;
    start: () => void;
}

function setup(options?: Parameters<typeof time>[0]): FakeBuildInterface {
    let onEnd: ((result: BuildResult) => void) | undefined;
    let onStart: (() => void) | undefined;

    const build = {
        onEnd:   (callback: (result: BuildResult) => void): void => {
            onEnd = callback;
        },
        onStart: (callback: () => void): void => {
            onStart = callback;
        },
    } as unknown as PluginBuild;

    void time(options).setup(build);

    if (onEnd === undefined || onStart === undefined) {
        throw new Error('callbacks were not registered');
    }

    const end   = onEnd;
    const begin = onStart;

    return {
        end:   (errors = 0): void => end({errors: Array.from({length: errors}, () => ({text: 'error'})), warnings: []} as unknown as BuildResult),
        start: (): void => begin(),
    };
}

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
});

describe('time', () => {
    it('returns a plugin named time', () => {
        expect(time().name).toBe('time');
    });

    it('logs start and end without a name', () => {
        const logger = vi.fn();
        const build  = setup({colors: false, logger});

        build.start();
        build.end();

        expect(logger.mock.calls).toEqual([
            ['Build started'],
            [expect.stringMatching(/^Build ended: \d+ms$/)],
        ]);
    });

    it('logs start and end with a name given as string', () => {
        const log   = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        const build = setup('App');

        build.start();
        build.end();

        expect(log.mock.calls).toEqual([
            ['Build started for App'],
            [expect.stringMatching(/^Build ended App: \d+ms$/)],
        ]);
    });

    it('logs to console.log by default', () => {
        const log   = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        const build = setup();

        build.start();

        expect(log).toHaveBeenCalledWith('Build started');
    });

    it('treats an empty name like no name', () => {
        const logger = vi.fn();
        const build  = setup({colors: false, logger, name: ''});

        build.start();

        expect(logger).toHaveBeenCalledWith('Build started');
    });

    it('reports a failed build', () => {
        const logger = vi.fn();
        const build  = setup({colors: false, logger, name: 'App'});

        build.start();
        build.end(2);

        expect(logger).toHaveBeenLastCalledWith(expect.stringMatching(/^Build failed App: \d+ms$/));
    });

    it('reports a failed build without a name', () => {
        const logger = vi.fn();
        const build  = setup({colors: false, logger});

        build.start();
        build.end(1);

        expect(logger).toHaveBeenLastCalledWith(expect.stringMatching(/^Build failed: \d+ms$/));
    });

    it('measures the time between start and end', () => {
        const now    = vi.spyOn(performance, 'now');
        const logger = vi.fn();
        const build  = setup({colors: false, logger, name: 'App'});

        now.mockReturnValue(1000);
        build.start();
        now.mockReturnValue(1042.4);
        build.end();

        expect(logger).toHaveBeenLastCalledWith('Build ended App: 42ms');
    });

    it('measures every rebuild on its own', () => {
        const now    = vi.spyOn(performance, 'now');
        const logger = vi.fn();
        const build  = setup({colors: false, logger});

        now.mockReturnValue(0);
        build.start();
        now.mockReturnValue(100);
        build.end();
        now.mockReturnValue(500);
        build.start();
        now.mockReturnValue(507.6);
        build.end();

        expect(logger.mock.calls.map(([message]) => message)).toEqual(['Build started', 'Build ended: 100ms', 'Build started', 'Build ended: 8ms']);
    });

    it('colors name, duration and failure', () => {
        vi.stubEnv('FORCE_COLOR', '1');
        vi.stubEnv('NO_COLOR', undefined);
        const now    = vi.spyOn(performance, 'now');
        const logger = vi.fn();
        const build  = setup({logger, name: 'App'});

        now.mockReturnValue(0);
        build.start();
        now.mockReturnValue(5);
        build.end(1);

        expect(logger.mock.calls).toEqual([
            ['Build started for \u001b[32mApp\u001b[39m'],
            ['\u001b[31mBuild failed\u001b[39m \u001b[32mApp\u001b[39m: \u001b[33m5ms\u001b[39m'],
        ]);
    });

    it('leaves colors out with colors false', () => {
        vi.stubEnv('FORCE_COLOR', '1');
        const logger = vi.fn();
        const build  = setup({colors: false, logger, name: 'App'});

        build.start();

        expect(logger).toHaveBeenCalledWith('Build started for App');
    });
});

describe('time with esbuild', () => {
    it('logs a real build', async () => {
        const workingDir = fs.mkdtempSync(path.join(os.tmpdir(), 'esbuild-plugin-time-'));
        const logger     = vi.fn();

        try {
            fs.writeFileSync(path.join(workingDir, 'index.js'), 'export default 1;');

            await esbuild.build({
                absWorkingDir: workingDir,
                entryPoints:   ['./index.js'],
                logLevel:      'silent',
                outfile:       './dist/index.js',
                plugins:       [time({colors: false, logger, name: 'App'})],
            });
        }
        finally {
            fs.rmSync(workingDir, {force: true, recursive: true});
        }

        expect(logger.mock.calls).toEqual([
            ['Build started for App'],
            [expect.stringMatching(/^Build ended App: \d+ms$/)],
        ]);
    });

    it('logs a failed build', async () => {
        const workingDir = fs.mkdtempSync(path.join(os.tmpdir(), 'esbuild-plugin-time-'));
        const logger     = vi.fn();

        try {
            fs.writeFileSync(path.join(workingDir, 'index.js'), 'export default (;');

            await expect(esbuild.build({
                absWorkingDir: workingDir,
                entryPoints:   ['./index.js'],
                logLevel:      'silent',
                outfile:       './dist/index.js',
                plugins:       [time({colors: false, logger})],
            })).rejects.toThrow();
        }
        finally {
            fs.rmSync(workingDir, {force: true, recursive: true});
        }

        expect(logger).toHaveBeenLastCalledWith(expect.stringMatching(/^Build failed: \d+ms$/));
    });
});
