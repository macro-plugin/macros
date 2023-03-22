import { ExportNamespaceSpecifier, ExportSpecifier, Identifier, ImportDefaultSpecifier, ImportSpecifier, TsKeywordTypeKind, TsType, TsTypeReference, VariableDeclaration } from "@swc/core"

import { defaultGlobalExpr } from "./defaults"

export function hash (str: string): string {
  str = str.replace(/\r/g, "")
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return (hash >>> 0).toString(36)
}

export function hashMap (map: object): string {
  return hash(JSON.stringify(map))
}

export function isRegExp<T extends object> (input: T): boolean {
  return Object.prototype.toString.call(input) === "[object RegExp]"
}

export const span = {
  start: 0,
  end: 0,
  ctxt: 0,
}

export function markedNode<T extends object> (marker: string, node: T): T {
  // @ts-ignore
  node.marker = marker
  return node
}

export function unMarkNode<T extends object> (node: T): T {
  // @ts-ignore
  delete node.marker
  return node
}

export function genConstType (name: string, typeAnnotation: TsType) {
  return {
    type: "VariableDeclaration",
    span: {
      start: 163,
      end: 242,
      ctxt: 0
    },
    kind: "const",
    declare: false,
    declarations: [
      {
        type: "VariableDeclarator",
        span: {
          start: 169,
          end: 242,
          ctxt: 0
        },
        id: {
          type: "Identifier",
          span: {
            start: 169,
            end: 172,
            ctxt: 3
          },
          value: name,
          optional: false,
          typeAnnotation: {
            type: "TsTypeAnnotation",
            span: {
              start: 172,
              end: 242,
              ctxt: 0
            },
            typeAnnotation
          }
        },
        definite: false
      }
    ]
  } as VariableDeclaration
}

export function genTsRef (name: string): TsTypeReference {
  return {
    type: "TsTypeReference",
    span: {
      start: 199,
      end: 205,
      ctxt: 0
    },
    typeName: {
      type: "Identifier",
      span: {
        start: 199,
        end: 205,
        ctxt: 2
      },
      value: name,
      optional: false
    }
  }
}

export function guessType (value: unknown): TsType {
  let t: typeof value = typeof value
  if (t === "function") return defaultGlobalExpr
  if (t === "symbol") return genTsRef("Symbol")
  if (t === "object" && isRegExp(value as object)) return genTsRef("RegExp")
  if (value === null) t = "null"

  return {
    type: "TsKeywordType",
    span: {
      start: 199,
      end: 205,
      ctxt: 0
    },
    kind: t as TsKeywordTypeKind
  }
}

export function genImportSpecifier (name: string, isDefault = false): ImportSpecifier | ImportDefaultSpecifier {
  const local = {
    type: "Identifier",
    value: name,
    span: {
      start: 0,
      end: 0,
      ctxt: 1
    },
    optional: false
  } as Identifier

  if (isDefault) {
    return {
      type: "ImportDefaultSpecifier",
      local,
      span: {
        start: 0,
        end: 0,
        ctxt: 0,
      }
    }
  }
  return {
    type: "ImportSpecifier",
    local,
    span: {
      start: 0,
      end: 0,
      ctxt: 0,
    },
    isTypeOnly: false
  }
}

export function genExportSpecifier (name: string, isNamespace = false): ExportSpecifier | ExportNamespaceSpecifier {
  const orig = {
    type: "Identifier",
    value: name,
    span: {
      start: 0,
      end: 0,
      ctxt: 1
    },
    optional: false
  } as Identifier

  if (isNamespace) {
    return {
      type: "ExportNamespaceSpecifier",
      name: orig,
      span: {
        start: 0,
        end: 0,
        ctxt: 0,
      }
    }
  }
  return {
    type: "ExportSpecifier",
    orig,
    span: {
      start: 0,
      end: 0,
      ctxt: 0,
    },
    isTypeOnly: false
  }
}
