import { Config } from '@macro-plugin/core';
import { Transformer } from '@jest/transform';

declare function createTransformer(inputOptions: Config & {
    experimental?: {
        customCoverageInstrumentation?: {
            enabled: boolean;
            coverageVariable?: string;
            compact?: boolean;
            reportLogic?: boolean;
            ignoreClassMethods?: Array<string>;
            instrumentLog?: {
                level: string;
                enableTrace: boolean;
            };
        };
    };
}): Promise<Transformer>;
declare const _default: {
    createTransformer: typeof createTransformer;
};

export { _default as default };
