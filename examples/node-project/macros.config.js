const { $Ast, $Eval, $Quote, createLitMacro, macro } = require("@macro-plugin/core")

/** @type { import("@macro-plugin/core").Config } */
module.exports = {
  macros: [
    macro,
    $Eval,
    $Ast,
    $Quote,
    createLitMacro({
      __DEV__: false
    })
  ],
  jsc: {
    parser: {
      syntax: "typescript"
    }
  }
}
