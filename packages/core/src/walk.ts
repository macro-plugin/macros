import { BaseNode, Node, ScopeVar, WalkContext, WalkFunc, WalkPlugin } from "./types"
import { ExportNamedDeclaration, ImportDeclaration, ImportDefaultSpecifier, ImportSpecifier, ModuleItem, ParseOptions, Program, TsModuleDeclaration } from "@swc/core"
import { genExportSpecifier, genImportSpecifier, hashMap } from "./utils"
import { parse, parseExpr } from "./parse"
import { print, printExpr } from "./print"

import trackPlugin from "./track"

export class Walker {
  data: Record<string, unknown> = {}
  imports: ImportDeclaration[] = []
  exports: ExportNamedDeclaration[] = []
  prepends: ModuleItem[] = []
  appends: ModuleItem[] = []
  globalDts: ModuleItem[] = []
  moduleDts: TsModuleDeclaration[] = []
  references: { types?: string, path?: string }[] = []
  prependDts: ModuleItem[] = []
  appendDts: ModuleItem[] = []
  importHashes: Record<string, true> = {}
  exportHashes: Record<string, true> = {}
  enter?: WalkFunc
  leave?: WalkFunc
  set = <T>(key: string, value: T) => { this.data[key] = value }
  get = <T>(key: string, defaultValue?: T) => {
    if (!(key in this.data)) this.data[key] = defaultValue
    return this.data[key] as T || defaultValue as T
  }

  import = (pkg: string | string[], source?: string, isDefault = false) => {
    let h: string

    const pushImport = (specifiers: (ImportSpecifier | ImportDefaultSpecifier)[], source?: string) => {
      this.imports.push({
        type: "ImportDeclaration",
        specifiers,
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
      } as ImportDeclaration)

      this.importHashes[h] = true
    }

    if (source == null && typeof pkg === "string") {
      h = hashMap({ pkg })
      if (!(h in this.importHashes)) pushImport([], pkg)
      return
    }

    for (const s of (typeof pkg === "string" ? [pkg] : pkg)) {
      h = hashMap({ s, source, isDefault })
      if (!(h in this.importHashes)) pushImport([genImportSpecifier(s, isDefault)], source)
    }
  }

  export = (pkg: string | string[], source?: string | null, isNamespace = false) => {
    let h
    for (const s of (typeof pkg === "string" ? [pkg] : pkg)) {
      h = hashMap({ s, source, isNamespace })
      if (!(h in this.exportHashes)) {
        this.exports.push({
          type: "ExportNamedDeclaration",
          specifiers: [
            genExportSpecifier(s, isNamespace)
          ],
          source: source == null
            ? undefined
            : {
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
        } as ExportNamedDeclaration)

        this.exportHashes[h] = true
      }
    }
  }

  prepend = (stmts: ModuleItem[]) => this.prepends.push(...stmts)
  append = (stmts: ModuleItem[]) => this.appends.push(...stmts)

  declareModule = (id: string, body: ModuleItem | ModuleItem[]) => this.moduleDts.push({
    type: "TsModuleDeclaration",
    span: {
      start: 312,
      end: 341,
      ctxt: 0
    },
    declare: true,
    global: false,
    id: {
      type: "StringLiteral",
      span: {
        start: 327,
        end: 334,
        ctxt: 0
      },
      value: id,
    },
    body: {
      type: "TsModuleBlock",
      span: {
        start: 335,
        end: 341,
        ctxt: 0
      },
      body: Array.isArray(body) ? body : [body]
    }
  })

  declareGlobal = (body: ModuleItem | ModuleItem[]) => Array.isArray(body) ? this.globalDts.push(...body) : this.globalDts.push(body)
  declareReference = ({ types, path }: { types?: string, path?: string }) => this.references.push({ types, path })
  declarePrepend = (stmts: ModuleItem[]) => this.prependDts.push(...stmts)
  declareAppend = (stmts: ModuleItem[]) => this.appendDts.push(...stmts)

  defaultContext = {
    set: this.set,
    get: this.get,
    track: this.track,
    import: this.import,
    export: this.export,
    prepend: this.prepend,
    append: this.append,
    parseExpr,
    parse: (src: string, options: ParseOptions) => parse(src, options).body,
    printExpr: (expr: Node) => printExpr(expr as BaseNode).code,
    declareAppend: this.declareAppend,
    declareGlobal: this.declareGlobal,
    declareModule: this.declareModule,
    declarePrepend: this.declarePrepend,
    declareReference: this.declareReference,
  }

  constructor ({ enter, leave }: WalkPlugin) {
    this.enter = enter
    this.leave = leave
  }

  walkSingle (n: Node, parent?: Node, prop?: string, index?: number) {
    let _replaced; let _skipped; let _removed; let _skipCount = 0

    const ctx: WalkContext = {
      ...this.defaultContext,
      skip: () => {
        _skipped = true
      },
      print: (ast) => print((ast || n) as BaseNode).code,
      remove: () => {
        if (parent && prop) {
          if (index != null) {
            (parent[prop as keyof Node] as unknown as Node[]).splice(index, 1)
          } else {
            // @ts-ignore
            delete parent[prop]
          }
        }
        _removed = true
      },
      replace: (newNode: Node | Node[]) => {
        if (parent && prop) {
          if (index != null) {
            if (Array.isArray(newNode)) {
              (parent[prop as keyof Node] as unknown as Node[]).splice(index, 1, ...newNode)
              _skipCount = newNode.length - 1
            } else {
              (parent[prop as keyof Node] as unknown as Node[])[index] = newNode
            }
          } else {
            // @ts-ignore
            parent[prop] = newNode
          }
          _replaced = newNode
        }
      },
    }

    trackPlugin.enter.apply(ctx, [n as BaseNode, parent as BaseNode, prop, index])
    if (this.enter) this.enter.apply(ctx, [n, parent, prop, index])

    if (Array.isArray(_replaced)) {
      this.walkMany(_replaced, parent)
    } else if (!_skipped && !_removed) {
      for (const [k, v] of Object.entries(_replaced || n)) {
        if (!v) continue
        if (Array.isArray(v)) {
          this.walkMany(v, n, k)
        } else if (v.type) {
          this.walkSingle(v, n, k)
        }
      }
    }

    if (this.leave) this.leave.apply(ctx, [n, parent, prop, index])
    trackPlugin.leave.apply(ctx, [n as BaseNode, parent as BaseNode, prop, index])

    return _skipCount
  }

  walkMany (nodes: Node[], parent?: Node, prop?: string) {
    let skipCount = 0
    for (let i = 0; i < nodes.length; i++) {
      if (skipCount > 0) {
        skipCount -= 1
        continue
      }
      skipCount = this.walkSingle(nodes[i], parent, prop, i)
    }
  }

  walk (n: Node | Node[]) {
    if (Array.isArray(n)) {
      this.walkMany(n)
    } else if (n.type) {
      this.walkSingle(n)
    }
    if (!Array.isArray(n) && (n.type === "Module" || n.type === "Script")) {
      const _imports = []
      const _exports = []
      const _stmts = []
      for (const i of (n as Program).body) {
        if (["ImportDeclaration"].includes(i.type)) {
          _imports.push(i)
        } else if (["ExportDeclaration", "ExportNamedDeclaration", "ExportDefaultDeclaration", "ExportAllDeclaration"].includes(i.type)) {
          _exports.push(i)
        } else {
          _stmts.push(i)
        }
      }
      (n as Program).body = [..._imports, ...this.imports, ...this.prepends, ..._stmts, ...this.appends, ..._exports, ...this.exports]
    }
    return n
  }

  emit () {
    const refs: string[] = []
    let o: string
    for (const r of this.references) {
      o = "/// <reference "
      if (r.types) o += `types="${r.types}"`
      if (r.path) o += `path="${r.path}"`
      o += " />\n"
      refs.push(o)
    }

    const globalDts = this.globalDts.length > 0
      ? {
        type: "TsModuleDeclaration",
        span: {
          start: 144,
          end: 164,
          ctxt: 0
        },
        declare: true,
        global: true,
        id: {
          type: "Identifier",
          span: {
            start: 152,
            end: 158,
            ctxt: 1
          },
          value: "global",
          optional: false
        },
        body: {
          type: "TsModuleBlock",
          span: {
            start: 159,
            end: 164,
            ctxt: 0
          },
          body: this.globalDts
        }
      } as TsModuleDeclaration
      : undefined

    return (refs.length > 0 ? refs.join("") : "") + print([
      ...this.prependDts,
      ...(globalDts ? [globalDts] : []),
      ...this.moduleDts,
      ...this.appendDts
    ]).code
  }

  track (name: string) {
    let v
    const scopeVars = this.get("scopeVars", [[]]) as ScopeVar[][]
    for (let y = scopeVars.length - 1; y >= 0; y--) {
      v = scopeVars[y]
      for (let x = v.length - 1; x >= 0; x--) {
        if (v[x].name === name) return v[x]
      }
    }
    return undefined
  }
}

export function walk (n: Node | Node[], plugin: WalkPlugin) {
  const base = new Walker(plugin)
  return base.walk(n)
}
