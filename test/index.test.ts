import time from '@/time';
import index from '@/index';
import {expect, it} from 'vitest';

it('exports the plugin as default', () => {
    expect(index).toBe(time);
});
