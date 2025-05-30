/**
 * AIResponder v2.7 - Enhanced AI Auto-Responder for Vencord
 *
 * @author mays_024
 * @id 1210310965162414134
 * @website https://www.syva.uk/syva-dev/
 * @repository https://github.com/tsx-awtns/vencord-ai-responder
 * @version 2.7
 * @license MIT
 *
 * CHANGES v2.7:
 * - Updated to version 2.7 with synchronized client-server versioning
 * - Improved modular architecture with separated TypeScript files
 * - Enhanced error handling and connection stability
 * - Better conversation history management
 * - Optimized API request handling with proper headers
 * - Improved rate limiting and fallback mechanisms
 * - Enhanced debugging and logging capabilities
 * - Better state management across modules
 * - Improved UI responsiveness and user feedback
 * - Code cleanup and maintainability improvements
 */

import { showToast, Toasts } from "@webpack/common"
import { settings } from "../settings"
import { debugLog } from "./helpers"
import { conversationHistory } from "./state"
import type { ConversationMessage } from "../types"

export function handleRateLimitError(useCustomKey: boolean, userName: string): void {
  if (!settings.store.showRateLimitHelp) return

  const message = useCustomKey
    ? `⚠️ **API Limit Reached for ${userName}**\n\n` +
      `Your custom OpenRouter.ai API key has reached its daily limit (~1,000 requests/day for free accounts).\n\n` +
      `**Solutions:**\n` +
      `• Wait 24 hours for limit reset\n` +
      `• Create a new OpenRouter.ai account with a new email\n` +
      `• Get a new API key from the new account\n` +
      `• Update your API key in plugin settings\n` +
      `• Consider upgrading to a paid plan on OpenRouter.ai\n\n` +
      `**Quick Fix:** Visit [openrouter.ai](https://openrouter.ai) → Sign up with new email → Get new API key`
    : `⚠️ **All Fallback Keys Exhausted for ${userName}**\n\n` +
      `All available fallback API keys have reached their daily limits.\n\n` +
      `**Solutions:**\n` +
      `• Create your own free OpenRouter.ai account\n` +
      `• Get your own API key (limited to ~1,000 requests/day)\n` +
      `• Enable "Use your own API key" in plugin settings\n\n` +
      `**Quick Fix:** Visit [openrouter.ai](https://openrouter.ai) → Sign up → Get API key → Paste in settings`

  showToast(message, Toasts.Type.FAILURE, {
    duration: 10000,
  })

  console.warn(`AIResponder v2.7: Rate limit reached for ${userName} (Custom Key: ${useCustomKey})`)
}

export function getConversationHistory(channelId: string): Array<ConversationMessage> {
  return conversationHistory.get(channelId) || []
}

export function addToConversationHistory(channelId: string, role: string, content: string): void {
  const history = getConversationHistory(channelId)
  history.push({ role, content })

  if (history.length > 10) {
    history.splice(0, history.length - 10)
  }

  conversationHistory.set(channelId, history)
  debugLog(`Added to conversation history for ${channelId}:`, { role, content: content.substring(0, 100) + "..." })
}

export async function generateAIResponse(
  message: string,
  useCustomKey: boolean,
  userName: string,
  channelId: string,
): Promise<string> {
  try {
    const phpApiUrl = "https://www.syva.uk/syva-bot/api/openrouter.php"
    const history = getConversationHistory(channelId)

    const systemPrompt = `You are ${userName}'s AI assistant. ${userName} is currently away, so you're responding on their behalf. 

IMPORTANT INSTRUCTIONS:
- You are having a normal conversation with someone who messaged ${userName}
- Answer their questions directly and helpfully
- Be conversational, friendly, and engaging
- Don't keep saying generic greetings - actually respond to what they're asking
- If they ask a question, answer it properly
- If they want to chat, chat with them naturally
- You can discuss any topic, help with problems, answer questions, etc.
- Keep responses concise but helpful (1-3 sentences usually)
- Act like a knowledgeable AI assistant, not just a greeting bot
- VARY your responses - don't repeat the same phrases
- Be creative and natural in your responses

Remember: RESPOND TO THEIR ACTUAL MESSAGE, don't just give generic responses!`

    addToConversationHistory(channelId, "user", message)

    debugLog("Sending request to API v2.7", {
      apiUrl: phpApiUrl,
      messageLength: message.length,
      historyLength: history.length,
      useCustomKey,
      preferredModel: settings.store.preferredModel,
    })

    const requestBody = {
      message: message.trim(),
      conversationHistory: history,
      systemPrompt,
      maxTokens: 300,
      temperature: 0.9,
      useCustomKey,
      preferredModel: settings.store.preferredModel,
    }

    if (useCustomKey && settings.store.customApiKey) {
      Object.assign(requestBody, { customApiKey: settings.store.customApiKey })
    }

    debugLog("Request body v2.7:", requestBody)

    const response = await fetch(phpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "AIResponder/2.7",
        "X-Title": "Vencord AI Responder v2.7",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    debugLog("API v2.7 response received", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    })

    if (!response.ok) {
      const errorText = await response.text()
      debugLog("API v2.7 error response:", errorText)
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    debugLog("API v2.7 response data", data)

    if (data.version && data.version !== "2.7.0") {
      console.warn(`AIResponder: Version mismatch - Client: 2.7, Server: ${data.version}`)
    }

    if (!data?.success) {
      if (
        data?.error &&
        (String(data.error).includes("rate limit") ||
          String(data.error).includes("quota") ||
          String(data.error).includes("limit exceeded") ||
          String(data.error).includes("429") ||
          String(data.message || "").includes("limit") ||
          String(data.error).includes("all keys exhausted"))
      ) {
        handleRateLimitError(useCustomKey, userName)
        throw new Error("Rate limit exceeded")
      }
      throw new Error(data?.message || data?.error || "API request failed")
    }

    if (!data?.response) {
      throw new Error("Invalid API response format - no response field")
    }

    const aiResponse = data.response.trim()
    if (!aiResponse) {
      throw new Error("Empty response from API")
    }

    addToConversationHistory(channelId, "assistant", aiResponse)

    debugLog("AI v2.7 response generated successfully", {
      responseLength: aiResponse.length,
      response: aiResponse.substring(0, 100) + "...",
      modelUsed: data.modelUsed || "unknown",
      keyUsed: data.keyUsed || "unknown",
      serverVersion: data.version || "unknown",
    })

    return aiResponse
  } catch (error: any) {
    console.error("AIResponder v2.7: API Error:", error)
    debugLog("API v2.7 Error details", error)

    if (
      error.message &&
      (error.message.includes("rate limit") || error.message.includes("quota") || error.message.includes("429"))
    ) {
      handleRateLimitError(useCustomKey, userName)

      const rateLimitResponses = [
        `Hey! I've reached my daily chat limit (~1,000 requests/day), but ${userName} will be back soon! 😅`,
        `Oops! Hit my daily limit. Free OpenRouter.ai accounts have ~1,000 requests/day limit.`,
        `Daily limit reached! 📊 OpenRouter.ai free accounts have ~1,000 requests/day. ${userName} will respond when they return!`,
        `I'm at my daily limit, but ${userName} will respond personally when they return! 💬`,
      ]
      return rateLimitResponses[Math.floor(Math.random() * rateLimitResponses.length)]
    }

    if (
      error.message &&
      (error.message.includes("network") ||
        error.message.includes("fetch") ||
        error.message.includes("API error") ||
        error.message.includes("Failed to fetch"))
    ) {
      return "Sorry, I'm having connection issues right now. Can you try again in a moment?"
    }

    if (error.message && error.message.includes("timeout")) {
      return "That took too long to process. Could you rephrase your message?"
    }

    const fallbackResponses = [
      "I'm having some technical difficulties right now. What did you want to chat about?",
      "Sorry, I encountered an error. Could you tell me what you're looking for help with?",
      "I'm experiencing some issues, but I'm still here! What's on your mind?",
      "Technical hiccup on my end. What would you like to discuss?",
    ]
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
}
