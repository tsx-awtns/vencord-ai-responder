/**
 * AIResponder v2.7 - Enhanced AI Auto-Responder for Vencord
 *
 * @author mays_024
 * @id 1210310965162414134
 * @website https://www.syva.uk/syva-dev/
 * @repository https://github.com/tsx-awtns/vencord-ai-responder
 * @version 2.7
 * @license MIT
 */

import { definePluginSettings } from "@api/Settings"
import { OptionType } from "@utils/types"

export const settings = definePluginSettings({
  useCustomApiKey: {
    type: OptionType.BOOLEAN,
    description: "Use your own OpenRouter.ai API key (free accounts have ~1,000 requests/day limit)",
    default: false,
  },
  customApiKey: {
    type: OptionType.STRING,
    description: "Your own OpenRouter.ai API key (optional - only if the above option is enabled)",
    placeholder: "sk-or-v1-...",
    default: "",
  },
  showNotifications: {
    type: OptionType.BOOLEAN,
    description: "Show toast notifications when enabling/disabling AI responder",
    default: true,
  },
  sendGreeting: {
    type: OptionType.BOOLEAN,
    description: "Send initial greeting message explaining that the user is away",
    default: true,
  },
  showRateLimitHelp: {
    type: OptionType.BOOLEAN,
    description: "Show helpful notifications when daily limits are reached",
    default: true,
  },
  debugMode: {
    type: OptionType.BOOLEAN,
    description: "Enable debug logging for troubleshooting",
    default: false,
  },
  autoRespondAllDMs: {
    type: OptionType.BOOLEAN,
    description: "Automatically respond in ALL DMs (no need to enable per channel)",
    default: false,
  },
  blacklistedUsers: {
    type: OptionType.STRING,
    description: "User IDs to ignore (comma-separated, e.g: 123456789,987654321)",
    placeholder: "123456789,987654321",
    default: "",
  },
  preferredModel: {
    type: OptionType.SELECT,
    description: "Preferred AI model (server will try this first, then fallback to others)",
    options: [
      { label: "Llama 3.1 8B (Free)", value: "meta-llama/llama-3.1-8b-instruct:free", default: true },
      { label: "Llama 3.1 70B (Free)", value: "meta-llama/llama-3.1-70b-instruct:free" },
      { label: "Llama 3.2 3B (Free)", value: "meta-llama/llama-3.2-3b-instruct:free" },
      { label: "Qwen 2.5 7B (Free)", value: "qwen/qwen-2.5-7b-instruct:free" },
      { label: "Auto (Server decides)", value: "auto" },
    ],
    default: "meta-llama/llama-3.1-8b-instruct:free",
  },
})
