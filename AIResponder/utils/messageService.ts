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

import { findByPropsLazy } from "@webpack"
import { settings } from "../settings"
import { debugLog, generateGreetingMessage, getUserDisplayName } from "./helpers"
import { generateAIResponse } from "./aiService"
import { startTypingAnimation, stopTypingAnimation } from "./typingService"
import { processingChannels, greetedChannels } from "./state"

const MessageActions = findByPropsLazy("sendMessage")

export async function sendGreetingIfNeeded(channelId: string): Promise<void> {
  try {
    if (!settings.store.sendGreeting) return
    if (greetedChannels.has(channelId)) return

    const userName = getUserDisplayName()
    const greetingMessage = generateGreetingMessage(userName, channelId)

    debugLog(`Sending greeting for ${userName} in channel ${channelId}`)

    startTypingAnimation(channelId)

    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    stopTypingAnimation(channelId)

    await MessageActions.sendMessage(channelId, {
      content: greetingMessage,
      tts: false,
      invalidEmojis: [],
      validNonShortcutEmojis: [],
    })

    greetedChannels.add(channelId)
    debugLog(`Greeting sent for ${userName}`)
  } catch (error) {
    console.error("AIResponder v2.7: Greeting error:", error)
    stopTypingAnimation(channelId)
  }
}

export async function sendAIResponse(channelId: string, originalMessage: string): Promise<void> {
  try {
    processingChannels.add(channelId)

    const useCustomKey = Boolean(
      settings.store.useCustomApiKey && settings.store.customApiKey && settings.store.customApiKey.trim(),
    )
    const userName = getUserDisplayName()

    debugLog(`Processing message for ${userName}`, {
      messageLength: originalMessage.length,
      useCustomKey,
      channelId,
    })

    startTypingAnimation(channelId)

    const message = originalMessage?.trim() || "Hello"

    try {
      const aiResponse = await generateAIResponse(message, useCustomKey, userName, channelId)

      stopTypingAnimation(channelId)

      await MessageActions.sendMessage(channelId, {
        content: aiResponse,
        tts: false,
        invalidEmojis: [],
        validNonShortcutEmojis: [],
      })

      debugLog(`Response sent for ${userName}`, {
        responseLength: aiResponse.length,
      })
    } catch (apiError) {
      console.error("AIResponder v2.7: API call error:", apiError)
      stopTypingAnimation(channelId)

      try {
        const fallbackResponse = "I'm experiencing some technical difficulties. I'll let the user know you messaged."
        await MessageActions.sendMessage(channelId, {
          content: fallbackResponse,
          tts: false,
          invalidEmojis: [],
          validNonShortcutEmojis: [],
        })
      } catch (sendError) {
        console.error("AIResponder v2.7: Failed to send fallback message:", sendError)
      }
    }
  } catch (error) {
    console.error("AIResponder v2.7: Send error:", error)
    stopTypingAnimation(channelId)

    if (error.message && error.message.includes("Rate limit exceeded")) {
      return
    }
  } finally {
    processingChannels.delete(channelId)
  }
}
