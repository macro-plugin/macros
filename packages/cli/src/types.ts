export type BaseOptions = { minify?: boolean };

export interface ShellOptions extends BaseOptions {
  ast?: boolean;
  swc?: boolean;
  transform?: boolean;
}

export interface MainOptions extends BaseOptions {
  eval?: string;
  run?: boolean;
  interactive?: boolean;
  output?: string;
  print?: boolean;
}
