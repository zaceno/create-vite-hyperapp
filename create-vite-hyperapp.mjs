#!/usr/bin/env node
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { confirm, input, select } from "@inquirer/prompts"
import { bold, cyan, isColorSupported, red, white, yellow } from "colorette"

const templates = join(dirname(fileURLToPath(import.meta.url)), "templates")
const usage = `Usage: npm create vite-hyperapp -- [name] [options]

Create a Vite + Hyperapp project in an empty directory.
Run without arguments to choose options interactively.

Arguments:
  name                            Project name and directory (default: hyperapp-app)
                                  Use . or ./ for the current empty directory.

Options:
  --types=none|jsdoc|typescript   Type checking (default: typescript)
  --views=plain|html|jsx          View style (default: jsx)
  --ssr=no|yes                    Server-side rendering (default: no)
  -h, --help                      Show this message and exit

Examples:
  npm create vite-hyperapp -- my-app --types=jsdoc --views=html --ssr=yes
  npm create vite-hyperapp -- .
`

function parseOptions(args) {
  const options = { name: "hyperapp-app", types: "typescript", views: "jsx", ssr: "no" }
  const choices = {
    types: ["none", "jsdoc", "typescript"],
    views: ["plain", "html", "jsx"],
    ssr: ["no", "yes"],
  }
  const seen = new Set()
  let hasName = false

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg.startsWith("-")) {
      if (hasName) throw new Error("Provide only one project name. See --help.")
      options.name = arg
      hasName = true
      continue
    }
    if (!arg.startsWith("--")) throw new Error(`Unknown argument: ${arg}. See --help.`)
    const equal = arg.indexOf("=")
    const key = arg.slice(2, equal === -1 ? undefined : equal)
    if (!(key in choices)) throw new Error(`Unknown option: --${key}. See --help.`)
    if (seen.has(key)) throw new Error(`--${key} was provided more than once.`)
    seen.add(key)

    const value = equal === -1 ? args[++i] : arg.slice(equal + 1)
    if (!value || value.startsWith("--")) throw new Error(`--${key} requires a value. See --help.`)
    if (!choices[key].includes(value)) {
      throw new Error(`Invalid --${key} value: ${value}. Choose ${choices[key].join(", ")}.`)
    }
    options[key] = value
  }
  return options
}

function getTarget(options) {
  const here = options.name === "." || options.name === "./"
  const name = here ? basename(process.cwd()) : options.name
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    throw new Error(`Invalid project name: ${name}. Use lowercase letters, digits, dots, hyphens, or underscores (starting with a letter or digit).`)
  }

  const destination = here ? process.cwd() : resolve(process.cwd(), name)
  if (existsSync(destination)) {
    if (!lstatSync(destination).isDirectory()) throw new Error(`Target is not a directory: ${destination}`)
    if (readdirSync(destination).length) throw new Error(`Target directory is not empty: ${destination}`)
  }
  return { here, name, destination }
}

function createProject(options) {
  const { here, name, destination } = getTarget(options)
  const variant = `${{ none: "js", jsdoc: "tj", typescript: "ts" }[options.types]}-${options.views}-${options.ssr === "yes" ? "ssr" : "cli"}`

  if (!existsSync(destination)) {
    try {
      mkdirSync(destination)
    } catch (error) {
      throw new Error(`Could not create target directory ${destination}: ${error.message}`)
    }
  }

  cpSync(join(templates, "common"), destination, { recursive: true, force: false, errorOnExist: true })
  cpSync(join(templates, variant), destination, { recursive: true, force: false, errorOnExist: true })
  renameSync(join(destination, "_gitignore"), join(destination, ".gitignore"))

  for (const filename of ["package.json", "index.html"]) {
    const path = join(destination, filename)
    writeFileSync(path, readFileSync(path, "utf8").replaceAll("__PROJECTNAME__", name))
  }

  console.log(`Created ${name} in ${destination}.\n\nNext steps:`)
  if (!here) console.log(`  cd ${name}`)
  console.log("  npm install\n  npm run dev")
}

async function wizard() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("The wizard needs an interactive terminal. Pass a name or options to run without it.")
  }

  // Colorette handles bold and white; truecolor supplies the requested RGB accent.
  const logo = isColorSupported
    ? `\x1b[48;2;107;154;238m ${bold(white("+\\"))} \x1b[49m`
    : "+\\"
  const heading = isColorSupported
    ? `\x1b[38;2;107;154;238m${bold("Create a project with Vite & Hyperapp")}\x1b[39m`
    : "Create a project with Vite & Hyperapp"
  console.log(`\n${heading} ${logo}\n`)

  try {
    const name = (await input({
      message: "Project name (. or ./ for current directory)",
      default: "hyperapp-app",
      validate(value) {
        try {
          getTarget({ name: value.trim() || "hyperapp-app" })
          return true
        } catch (error) {
          return error.message
        }
      },
    })).trim() || "hyperapp-app"

    const views = await select({
      message: "Views",
      choices: [
        { name: "Plain Hyperapp (h/text)", value: "plain" },
        { name: "@hyperapp/html", value: "html" },
        { name: "JSX", value: "jsx" },
      ],
      default: "jsx",
    })
    const types = await select({
      message: "Types",
      choices: [
        { name: "JavaScript (no type-checking)", value: "none" },
        { name: "JavaScript with JSDoc type-checking", value: "jsdoc" },
        { name: "TypeScript", value: "typescript" },
      ],
      default: "typescript",
    })
    const ssr = await select({
      message: "Server-side rendering",
      choices: [
        { name: "No (client-only)", value: "no" },
        { name: "Yes (SSR)", value: "yes" },
      ],
      default: "no",
    })

    console.log(`\n${bold("Your project")}`)
    console.log(`  Name:  ${cyan(name)}`)
    console.log(`  Views: ${cyan(views)}`)
    console.log(`  Types: ${cyan(types)}`)
    console.log(`  SSR:   ${cyan(ssr)}`)

    if (!await confirm({ message: "Create this project?", default: false })) {
      console.log(yellow("Cancelled. No project was created."))
      return
    }
    createProject({ name, views, types, ssr })
  } catch (error) {
    if (error.name !== "ExitPromptError") throw error
    console.log(yellow("\nCancelled. No project was created."))
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.some(arg => arg === "--help" || arg === "-h")) {
    console.log(usage)
  } else if (args.length === 0) {
    await wizard()
  } else {
    createProject(parseOptions(args))
  }
}

try {
  await main()
} catch (error) {
  console.error(red(`Error: ${error.message}`))
  process.exitCode = 1
}
