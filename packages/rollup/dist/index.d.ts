import { Config } from '@macro-plugin/core';
import { Plugin } from 'rollup';

declare function rollupMacroPlugin(config?: Config): Promise<Plugin>;

export { rollupMacroPlugin as default };
