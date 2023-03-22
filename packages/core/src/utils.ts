import { Identifier, ImportDefaultSpecifier, ImportSpecifier, Node } from "@swc/core"

import { PluginImportSpecifier } from "./types"

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

export function genSpecifier (specifier: PluginImportSpecifier): ImportSpecifier | ImportDefaultSpecifier {
  const local = {
    type: "Identifier",
    value: specifier.name,
    span: {
      start: 0,
      end: 0,
      ctxt: 1
    },
    optional: false
  } as Identifier

  if (specifier.kind == "default") {
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
