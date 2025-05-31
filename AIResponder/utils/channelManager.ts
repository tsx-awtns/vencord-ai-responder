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

import { showToast, Toasts } from "@webpack/common"
import { settings } from "../settings"
import { debugLog, getUserDisplayName } from "./helpers"
import { stopTypingAnimation } from "./typingService"
import { enabledChannels, processingChannels, greetedChannels, conversationHistory, awayReasons } from "./state"

export function toggleChannelAI(channelId: string, reason?: string): boolean {
  try {
    const wasActive = enabledChannels.has(channelId)
    const userName = getUserDisplayName()

    if (wasActive) {
      enabledChannels.delete(channelId)
      processingChannels.delete(channelId)
      greetedChannels.delete(channelId)
      conversationHistory.delete(channelId)
      awayReasons.delete(channelId) 
      stopTypingAnimation(channelId)

      if (settings.store.showNotifications) {
        showToast("AI Responder Disabled", Toasts.Type.SUCCESS)
      }

      debugLog(`Disabled for ${userName} in channel ${channelId}`)
      return false
    } else {
      enabledChannels.add(channelId)
      greetedChannels.delete(channelId)
      conversationHistory.delete(channelId)

      if (reason && reason.trim()) {
        awayReasons.set(channelId, reason.trim())
        debugLog(`Away reason set for ${userName}: ${reason.trim()}`)
      } else {
        awayReasons.delete(channelId)
      }

      if (settings.store.showNotifications) {
        const reasonText = reason && reason.trim() ? ` (${reason.trim()})` : ""
        showToast(`AI Responder Enabled for ${userName}${reasonText}`, Toasts.Type.SUCCESS)
      }

      debugLog(`Enabled for ${userName} in channel ${channelId}`, { reason: reason || "none" })
      return true
    }
  } catch (error) {
    console.error("AIResponder v2.7: Toggle error:", error)
    return false
  }
}
