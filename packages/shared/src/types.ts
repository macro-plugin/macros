import { CompilerOptions } from "typescript"

export interface MatchOptions {
  cwd: string;
  ignore?: string[];
}

export type HasModuleSideEffects = (id: string, external: boolean) => boolean;

export type Filter = (id: string) => boolean

export interface TsLib {
  lib: string;
  virtual: string;
  source: string;
  version: string;
}

export interface FormattingHost {
  getCompilationSettings: () => CompilerOptions;
  getCurrentDirectory: () => string;
  getNewLine(): string;
  getCanonicalFileName: (fileName: string) => string;
}
