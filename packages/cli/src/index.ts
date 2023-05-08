/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

import { MacroOptions, parse, transform } from "@macro-plugin/core"
import type { MainOptions, ShellOptions } from "./types"
import { buildTransformOptionsSync, extractFiles, extractInput, matchPattern, picomatch, writeDts } from "@macro-plugin/shared"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFile, writeFileSync } from "fs"
import path, { dirname, resolve } from "path"
import { stderr, stdin } from "process"
import { transformJS, transformTS } from "../../register/src/transformer"

import { Command } from "commander"
import { createInterface } from "readline"
import pkg from "../../core/package.json"
import { spawn } from "child_process"
import watch from "node-watch"

const CHAR_COUNT = {
  "[": 0,
  "]": 0,
  "(": 0,
  ")": 0,
  "{": 0,
  "}": 0,
}

let CURRENT_CONFIG: MacroOptions

const CACHE_FILE = path.join(process.cwd(), "<repl>.ts")

const program = new Command()

program
  .name("macros")
  .description("Macro Plugin Command Line Interface.")
  .version(pkg.version)
  .passThroughOptions()
  .argument("[files...]", "input (.js | .ts | .jsx | .tsx) files or glob patterns", [])
  .option("--init [template]", "initialize macros environment")
  .option("-c, --config <file>", "use specified config file")
  .option("-e, --eval <script>", "evaluate script")
  .option("-i, --interactive", "run an interactive Macros shell")
  .option("-m, --minify", "enable/disable minification")
  .option("-o, --output <path>", "output file name or directory")
  .option("-p, --print", "print generated code")
  .action(((files: string[], options: MainOptions & { init?: boolean | string }) => {
    if (options.init) return initialize(typeof options.init === "boolean" ? "js" : options.init)

    if (files.length > 0) return files.map(i => nodeval(i, options))

    if (options.eval) {
      try {
        print(evaluate(options.eval, options))
      } catch (e) {
        console.error(e)
      }
      return
    }

    shell(options)
  }) as () => void)

program
  .command("init")
  .description("Initialize Macros environment.")
  .option("-t, --template <template>", "initialize with template, the value could be (ts, js)", "js")
  .action((options: { template?: string }) => initialize(options.template ?? "js"))

program
  .command("emit")
  .description("Emit declaration file `macros.d.ts`.")
  .action(emitTypes)

program
  .command("dev")
  .description("Transforming codes in watch mode.")
  .argument("[files...]", "input (.js | .ts | .jsx | .tsx) files or glob patterns", [])
  .option("-r, --run", "use node run the files")
  .option("-m, --minify", "enable/disable minification")
  .option("-o, --output <path>", "output file name or directory")
  .action((files: string[], options: MainOptions) => watchFiles(files, options))

program
  .command("run")
  .description("Transform and run the entry files.")
  .argument("[files...]", "input (.js | .ts | .jsx | .tsx) files or glob patterns", [])
  .option("-m, --minify", "enable/disable minification")
  .action((files: string[], options: MainOptions) => buildFiles(files, { ...options, run: true }))

program
  .command("build")
  .description("Transforming codes in production mode.")
  .argument("[files...]", "input (.js | .ts | .jsx | .tsx) files or glob patterns", [])
  // .option("--sourcemap", "output source maps for build (default: false)")
  .option("-m, --minify", "enable/disable minification")
  .option("-r, --run", "use node run the files")
  .option("-o, --output <path>", "output file name or directory")
  .option("-w, --watch", "rebuilds when modules have changed on disk")
  .action((files: string[], options: MainOptions & { watch?: boolean }) => {
    if (options.watch) return watchFiles(files, options as MainOptions)

    buildFiles(files, options as MainOptions)
  })

program
  .command("shell")
  .description("Run an interactive Macros shell.")
  .option("-a, --ast", "interactive develop ast")
  .option("-t, --transform", "interactive show transformed code")
  .option("-m, --minify", "enable/disable minification")
  .option("-s, --swc", "enable swc(typescript|jsx) transform")
  .action(options => shell(options))

program.addHelpCommand("help [command]", "Display help for command.")

program.parse()

function isExprEnd (code: string) {
  for (let i = 0; i < code.length; i++) if (code[i] in CHAR_COUNT) CHAR_COUNT[code[i] as keyof typeof CHAR_COUNT]++

  return CHAR_COUNT["("] === CHAR_COUNT[")"] && CHAR_COUNT["["] === CHAR_COUNT["]"] && CHAR_COUNT["{"] === CHAR_COUNT["}"] && !/[.?:]\s*$/.test(code)
}

function getConfig () {
  if (!CURRENT_CONFIG) CURRENT_CONFIG = buildTransformOptionsSync({})[1]
  return CURRENT_CONFIG
}

function emitTypes () {
  const config = getConfig()
  transform("", {
    ...config,
    emitDts: true,
    onEmitDts (dts) {
      writeDts(path.resolve(config.dtsOutputPath || "./macros.d.ts"), dts)
    }
  })
}

function clearChars () {
  Object.keys(CHAR_COUNT).map(i => CHAR_COUNT[i as keyof typeof CHAR_COUNT] === 0)
}

function print (result: unknown) {
  if (result && typeof result === "object" && "type" in result) {
    console.log(JSON.stringify(result, undefined, 2))
  } else if (typeof result === "string") {
    if (result !== "") console.log(JSON.stringify(result))
  } else console.log(result)
}

/** generate macros.d.ts and create a config file if not exists */
function initialize (template: string) {
  emitTypes()

  if (matchPattern(["**/macros.config.{js,cjs,mjs,ts}"]).length === 0) { writeFileSync("./macros.config." + template, 'import { defineConfig } from "@macro-plugin/core";\n\nexport default defineConfig({\n\n})\n') }
}

function evaluate (code: string, options: ShellOptions = {}) {
  return eval(transform(code, { ...getConfig(), minify: options.minify }).code)
}

function buildFiles (input: string[], options: MainOptions) {
  extractFiles(input).map(f => nodeval(f, options))
}

function watchFiles (input: string[], options: MainOptions) {
  const { files, patts } = extractInput(input)

  const pms = patts.map(i => picomatch(i))

  console.log("Start watching...")

  watch(
    "./",
    {
      recursive: true,
      filter (f) {
        if (files.includes(resolve(f))) return true
        for (const match of pms) if (match(f)) return true
        return false
      },
    },
    (evt, name) => {
      if (evt === "update") nodeval(name, options)
    }
  )
}

function nodeval (file: string, options: MainOptions = {}) {
  const macrosOutputFile = options.output || file.replace(/\.\w+$/, ".output.js")

  if (!options.run) {
    const src = readFileSync(file).toString()

    const dir = dirname(macrosOutputFile)
    if (!existsSync(dir)) mkdirSync(dir)

    writeFile(macrosOutputFile, file.endsWith(".js") ? transformJS(src) : transformTS(src, file), (err) => {
      if (err !== null) {
        console.log(`${file} → ${macrosOutputFile}`)
      }
    })

    return
  }

  const node = spawn("node", ["-r", "@macro-plugin/core/register", file], {
    env: {
      ...process.env,
      // macrosOutputFile,
    },
  })

  node.stdout.on("data", data => {
    stdin.write(data)
  })

  node.stderr.on("data", data => {
    stderr.write(data)
  })

  // node.on("close", code => {
  // if (code === 0 && !options.print) console.log(`${file} → ${macrosOutputFile}`)
  // })
}

async function shell (options: ShellOptions, history: string[] = []) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: ">>> ",
    history,
  })

  const lines: string[] = []
  let nestedLines: string[] = []

  readline.prompt()

  readline.on("line", line => {
    if (isExprEnd(line)) {
      try {
        const current = [...nestedLines, line].join("\n")
        const code = [...lines, ...nestedLines, line].join("\n")
        if (options.ast) {
          print(parse(current, { syntax: "typescript", tsx: true }).body[0])
        } else if (options.transform) {
          console.log("`" + JSON.stringify(options.swc ? transformTS(current, "<repl>.tsx") : transformJS(current)).replace(/\\"/g, "\"").slice(1, -1) + "`")
        } else {
          const result = evaluate(code, options)
          if (!/\s*(let|const|var|function|async|class|import|export|enum|while|for|throw|interface|if|switch|private|try)\s+/.test(current)) { print(result) } // preventing the use of previous return value
        }
        lines.push(current)
      } catch (e) {
        console.error(e)
      }
      clearChars()
      nestedLines = []
      readline.setPrompt(">>> ")
    } else {
      readline.setPrompt("... ")
      nestedLines.push(line)
    }
    readline.prompt()
  })

  readline.on("close", () => {
    if (existsSync(CACHE_FILE)) rmSync(CACHE_FILE)
  })
}
