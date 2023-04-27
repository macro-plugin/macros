/* eslint-disable no-console */
const path = require("path")
const { readdirSync, existsSync } = require("fs")
const { exec, getExecOutput } = require("@actions/exec")

const { version } = require("../packages/core/package.json")
const tag = `v${version}`
const releaseLine = `v${version.split(".")[0]}`

process.chdir(path.join(__dirname, ".."));

(async () => {
  const { exitCode, stderr } = await getExecOutput(
    "git",
    ["ls-remote", "--exit-code", "origin", "--tags", `refs/tags/${tag}`],
    {
      ignoreReturnCode: true,
    }
  )
  if (exitCode === 0) {
    console.log(
      `Action is not being published because version ${tag} is already published`
    )
    return
  }
  if (exitCode !== 2) {
    throw new Error(`git ls-remote exited with ${exitCode}:\n${stderr}`)
  }

  // publish to npm
  await exec("changeset", ["publish"])

  // push to github
  await exec("git", ["checkout", "--detach"])

  for (const pkg of readdirSync("packages")) {
    if (existsSync(path.resolve(`packages/${pkg}/dist`))) {
      await exec("git", ["add", "--force", `packages/${pkg}/dist`])
    }
  }

  await exec("git", ["commit", "-m", tag])

  await exec("changeset", ["tag"])

  await exec("git", [
    "push",
    "--force",
    "--follow-tags",
    "origin",
    `HEAD:refs/heads/${releaseLine}`,
  ])
})()
