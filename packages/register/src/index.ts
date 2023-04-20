import { transformJS, transformTS } from "./transformer"

import { addHook } from "@macro-plugin/shared"

addHook(
  transformJS,
  { extensions: [".js"] }
)

addHook(
  transformTS,
  { extensions: [".jsx", ".tsx", ".ts"] }
)
