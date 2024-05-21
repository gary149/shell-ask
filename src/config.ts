import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const configDirPath = path.join(os.homedir(), ".config", "shell-ask")
export const configFilePath = path.join(configDirPath, "config.json")

export type AICommandVariable =
  // A shell command to run, the output will be used as the variable value
  | string
  // Get text input from the user
  | { type: "input"; message: string }
  // Get a choice from the user
  | {
      type: "select"
      message: string
      choices: { value: string; title: string }[]
    }

export type AICommand = {
  /** the cli command */
  command: string
  /** description to show in cli help */
  description?: string
  variables?: Record<string, AICommandVariable>
  prompt: string
  /** Require piping output from another program to Shell Ask */
  require_stdin?: boolean
}

// no addtional property allowed
export type Config = {
  default_model?: string
  openai_api_key?: string
  openai_api_url?: string
  gemini_api_key?: string
  anthropic_api_key?: string
  commands?: AICommand[]
}

export function loadConfig(): Config {
  try {
    return JSON.parse(fs.readFileSync(configFilePath, "utf-8"))
  } catch {
    return {}
  }
}

export function saveConfig(config: Config) {
  fs.mkdirSync(configDirPath, { recursive: true })
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))
}
