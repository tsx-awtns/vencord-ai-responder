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
import { debugLog } from "./helpers"
import { typingIntervals } from "./state"

const TypingStore = findByPropsLazy("startTyping", "stopTyping")

export function startTypingAnimation(channelId: string): NodeJS.Timeout | null {
  try {
    debugLog(`Starting typing animation for channel ${channelId}`)

    const existingInterval = typingIntervals.get(channelId)
    if (existingInterval) {
      clearInterval(existingInterval)
    }

    TypingStore.startTyping(channelId)

    const interval = setInterval(() => {
      try {
        TypingStore.startTyping(channelId)
      } catch (error) {
        console.error("AIResponder v2.7: Typing interval error:", error)
      }
    }, 8000)

    typingIntervals.set(channelId, interval)
    return interval
  } catch (error) {
    console.error("AIResponder v2.7: Start typing error:", error)
    return null
  }
}

export function stopTypingAnimation(channelId: string): void {
  try {
    debugLog(`Stopping typing animation for channel ${channelId}`)

    const interval = typingIntervals.get(channelId)
    if (interval) {
      clearInterval(interval)
      typingIntervals.delete(channelId)
    }

    TypingStore.stopTyping(channelId)
  } catch (error) {
    console.error("AIResponder v2.7: Stop typing error:", error)
  }
}
