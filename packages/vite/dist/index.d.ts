import { Config } from '@macro-plugin/core';
import { Plugin } from 'vite';

declare function viteMacroPlugin(config?: Config): Promise<Plugin>;

export { viteMacroPlugin as default };
