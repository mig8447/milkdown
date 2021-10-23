/* Copyright 2021, Milkdown by Mirone. */
import { prosePluginFactory } from '@milkdown/core';
import type { Plugin } from '@milkdown/prose';

import { Factory, Origin, PluginWithMetadata, UnknownRecord } from '../types';
import { commonPlugin } from './common';

export const createProsePlugin = <Obj extends UnknownRecord = UnknownRecord>(
    factory: Factory<string, Obj, { plugin: Plugin | Plugin[]; id: string }>,
): Origin<string, Obj, Plugin> => {
    const origin: Origin<string, Obj, Plugin | Plugin[]> = (options) => {
        const plugin = prosePluginFactory((ctx) => {
            const output = commonPlugin(factory, ctx, options);
            plugin.id = output.id;
            return output.plugin;
        }) as PluginWithMetadata<string, Obj>;
        plugin.origin = origin;

        return plugin;
    };

    return origin;
};