#!/usr/bin/env node
import minimist from "minimist"
import prompts from "prompts"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const args = minimist(process.argv.slice(2))

if (args["h"] || args["help"]) {
  process.stdout.write(`
Usage: npm create vite-hyperapp -- [TARGET_DIR] [OPTIONS]

Options:
    -t, --typescript      Use typescript
    -s, --ssr             Use server-side rendering
    -n, --no-prompt       Just do it, no questions asked
    -h, --help            Show this message 

If no target dir is specified, the project name will be used.
If --no-prompt option is used, project name will be target dir
Default project-name/target-dir is 'hyperapp-project'
    
`)
  process.exit(0)
}

async function collectOptions() {
  const flaggedTypescript = !!(args["t"] || args["typescript"])
  const flaggedSSR = !!(args["s"] || args["ssr"])
  const givenTargetDir = args._[0]
  const targetDirOrDefault = givenTargetDir || "hyperapp-project"
  if (args["n"] || args["no-prompt"]) {
    return {
      targetDir: targetDirOrDefault,
      projectName: targetDirOrDefault,
      useTypescript: flaggedTypescript,
      useSSR: flaggedSSR,
    }
  }
  const promptResponse = await prompts([
    {
      type: "text",
      name: "name",
      initial: targetDirOrDefault,
      message: "Name your project:",
    },
    !flaggedTypescript && {
      type: "confirm",
      name: "typescript",
      message: "Use Typescript?",
      initial: true,
    },
    !flaggedSSR && {
      type: "confirm",
      name: "ssr",
      message: "Use server-side rendering?",
      initial: false,
    },
  ])
  return {
    targetDir: givenTargetDir || promptResponse.name,
    projectName: promptResponse.name,
    useTypescript: promptResponse.typescript,
    useSSR: promptResponse.ssr,
  }
}

function copyDir(source, target) {
  if (fs.existsSync(target)) {
    process.stderr.write(`\n${target} already exists. Aborting!\n`)
    process.exit(1)
  }
  fs.mkdirSync(target, { recursive: true })

  const items = fs.readdirSync(source)
  items.forEach(item => {
    const sourceItem = path.join(source, item)
    const targetItem = path.join(target, item)
    const stats = fs.statSync(sourceItem)

    if (stats.isDirectory()) {
      copyDir(sourceItem, targetItem)
    } else {
      fs.copyFileSync(sourceItem, targetItem)
    }
  })
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  )
}

function setPackageName(projectDir, packageName) {
  const packageJsonPath = path.join(projectDir, "package.json")
  const info = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
  info.name = packageName
  fs.writeFileSync(packageJsonPath, JSON.stringify(info, null, 2))
}

function fixGitignoreFilename(projectDir) {
  const currentName = path.join(projectDir, "_gitignore")
  const renameTo = path.join(projectDir, ".gitignore")
  fs.renameSync(currentName, renameTo)
}

async function main() {
  const setup = await collectOptions()

  if (!isValidPackageName(setup.projectName)) {
    process.stderr.write(
      `\n${setup.projectName} is not a valid package.json name\n`,
    )
    process.exit(1)
  }

  if (!isValidPackageName(setup.targetDir)) {
    process.stderr.write(`\n${setup.targetDir} is not a valid folder name\n`)
    process.exit(1)
  }

  const template = setup.useTypescript
    ? setup.useSSR
      ? "template-ts-ssr"
      : "template-ts"
    : setup.useSSR
    ? "template-ssr"
    : "template"

  const sourceDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../templates/",
    template,
  )
  const targetDir = path.resolve(process.cwd(), "./" + setup.targetDir)

  process.stdout.write("Scaffolding project ...")
  copyDir(sourceDir, targetDir)
  setPackageName(targetDir, setup.projectName)
  fixGitignoreFilename(targetDir)
  process.stdout.write(`
...Done.

To get started:

> cd ${setup.targetDir}
> npm install
> npm run dev 
`)
}

main()
