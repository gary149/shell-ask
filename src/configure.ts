import prompts from "prompts"
import { loadConfig, saveConfig } from "./config"

export async function configure() {
  const config = loadConfig()

  const result = await prompts([
    {
      type: "text",
      name: "default_model",
      message: "Default model (e.g. gpt-3.5-turbo)",
    },
    {
      type: "password",
      name: "openai_api_key",
      message: "OpenAI API Key",
    },
    {
      type: "text",
      name: "openai_api_url",
      message: "OpenAI API URL",
    },
    {
      type: "password",
      name: "anthropic_api_key",
      message: "Anthropic API Key",
    },
  ])

  const newConfig = { ...config }

  if (typeof result.default_model === "string" && result.default_model) {
    newConfig.default_model = result.default_model
  }

  if (typeof result.openai_api_key === "string" && result.openai_api_key) {
    newConfig.openai_api_key = result.openai_api_key
  }

  if (typeof result.openai_api_url === "string" && result.openai_api_url) {
    newConfig.openai_api_url = result.openai_api_url
  }

  if (
    typeof result.anthropic_api_key === "string" &&
    result.anthropic_api_key
  ) {
    newConfig.anthropic_api_key = result.anthropic_api_key
  }

  saveConfig(newConfig)
}
