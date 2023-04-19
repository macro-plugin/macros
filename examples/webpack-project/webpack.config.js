import { resolve } from "path"

/** @type { import("webpack").Configuration } */
export default {
  mode: "production",
  entry: resolve("./src/index.ts"),
  output: {
    path: resolve("./dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@macro-plugin/webpack",
            /** @type { import("@macro-plugin/core").Config } */
            options: {
              emitDts: true
            }
          }
        ]
      }
    ]
  }
}
