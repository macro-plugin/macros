import { BaseNode, Node, PluginImportSpecifier, ScopeVar, WalkFunc, WalkPlugin } from "./types";
import { ImportDeclaration, Program } from "@swc/core";
import { genSpecifier, hashMap, noop } from "./utils";
import { leave as popVars, enter as pushVars } from "./track";

class Walker {
  data: Record<string, unknown> = {};
  imports: ImportDeclaration[] = [];
  importHashes: Record<string, true> = {};
  enter?: WalkFunc;
  leave?: WalkFunc;
  skip: () => void = noop;
  remove: () => void = noop;
  track: ((name: string) => ScopeVar | undefined) = (name: string) => {
    let v;
    const scopeVars = this.get('scopeVars', [[]] as ScopeVar[][])!
    for (let y = scopeVars.length - 1; y >= 0; y--) {
      v = scopeVars[y];
      for (let x = v.length - 1; x >= 0; x--) {
        if (v[x].name == name) return v[x];
      }
    }
    return undefined;
  }
  replace: (newNode: Node | Node[]) => void = noop;
  set = <T>(key: string, value: T) => { this.data[key] = value; }
  get = <T>(key: string, defaultValue?: T) => {
    if (!(key in this.data)) this.data[key] = defaultValue;
    return this.data[key] as T || defaultValue;
  }
  import = (specifiers: PluginImportSpecifier[], source: string) => {
    let h;
    const sl = [];
    for (const s of specifiers) {
      h = hashMap({ s, source });
      if (!(h in this.importHashes)) {
        sl.push(genSpecifier(s))
        this.importHashes[h] = true;
      }
    }

    if (sl.length > 0) {
      this.imports.push({
        type: 'ImportDeclaration',
        specifiers: sl,
        source: {
          type: "StringLiteral",
          value: source,
          span: {
            start: 0,
            end: 0,
            ctxt: 0,
          }
        },
        typeOnly: false,
        span: {
          start: 0,
          end: 0,
          ctxt: 0,
        },
      } as ImportDeclaration);
    }
  }

  constructor({ enter, leave }: WalkPlugin) {
    this.enter = enter;
    this.leave = leave;
  }

  walkSingle(n: Node, parent?: Node, prop?: string, index?: number) {
    let _replaced, _skipped, _removed, _skipCount = 0

    this.replace = (newNode: Node | Node[]) => {
      if (parent && prop) {
        if (index != null) {
          if (Array.isArray(newNode)) {
            (parent[prop as keyof Node] as unknown as Node[]).splice(index, 1, ...newNode);
            _skipCount = newNode.length - 1;
          } else {
            (parent[prop as keyof Node] as unknown as Node[])[index] = newNode;
          }
        } else {
          // @ts-ignore
          parent[prop] = newNode;
        }
        _replaced = newNode;
      }
    }

    this.skip = () => {
      _skipped = true;
    }

    this.remove = () => {
      _removed = true;
    }

    pushVars(n as BaseNode, this, parent as BaseNode, prop, index)
    if (this.enter) this.enter(n, parent, prop, index);

    if (Array.isArray(_replaced)) {
      this.walkMany(_replaced, parent)
    } else if (!_skipped && !_removed) {
      for (const [k, v] of Object.entries(_replaced || n)) {
        if (!v) continue
        if (Array.isArray(v)) {
          this.walkMany(v, n, k);
        } else if (v.type) {
          this.walkSingle(v, n, k);
        }
      }
    }

    if (this.leave) this.leave(n, parent, prop, index);
    popVars(n as BaseNode, this, parent as BaseNode, prop, index)

    return _skipCount;
  }

  walkMany(nodes: Node[], parent?: Node, prop?: string) {
    let skipCount = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (skipCount > 0) {
        skipCount -= 1;
        continue;
      }
      skipCount = this.walkSingle(nodes[i], parent, prop, i);
    }
  }

  walk(n: Node | Node[]) {
    if (Array.isArray(n)) {
      this.walkMany(n);
    } else if (n.type) {
      this.walkSingle(n);
    }
    if (this.imports.length > 0 && !Array.isArray(n) && (n.type === 'Module' || n.type === 'Script')) {
      (n as Program).body = [...this.imports, ...(n as Program).body]
    }
    return n;
  }
}

export function walk(n: Node | Node[], plugin: WalkPlugin) {
  const base = new Walker(plugin);
  return base.walk(n);
}
