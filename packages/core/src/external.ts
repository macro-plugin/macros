import { GlobalMacroPlugin, MacroPlugin } from "./types"

import { createMacro } from "./api"

// handle external macro plugins
export default createMacro({
  enter (ast) {
    if (ast.type === "ImportDeclaration" && !ast.typeOnly && !ast.asserts) {
      if (typeof this.config.externals === "object") {
        const macroDict = (this.config.externals as Record<string, Record<string, MacroPlugin>>)[ast.source.value]
        let plugin: MacroPlugin
        if (macroDict) {
          for (const specifier of ast.specifiers) {
            if (specifier.type === "ImportSpecifier") {
              plugin = macroDict[specifier.local.value]
              if (plugin) this.addPlugin(plugin)
            } else if (specifier.type === "ImportDefaultSpecifier") {
              // TODO: this may have problem when changing import name
              plugin = macroDict.default
              if (plugin) this.addPlugin(plugin)
            } else if (specifier.type === "ImportNamespaceSpecifier") {
              const keys = Object.keys(macroDict)
              this.addPlugin(Object.values(macroDict))
              this.addPlugin({
                MemberExpression (ast) {
                  if (ast.object.type === "Identifier" && ast.object.value === specifier.local.value && ast.property.type === "Identifier" && keys.includes(ast.property.value)) {
                    return ast.property
                  }
                }
              })
            }
          }
        }
      }
    }
  }
}) as Required<GlobalMacroPlugin>
