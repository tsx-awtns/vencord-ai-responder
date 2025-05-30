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
import { debugLog, getUserDisplayName } from "./helpers"
import { stopTypingAnimation } from "./typingService"
import { enabledChannels, processingChannels, greetedChannels, conversationHistory } from "./state"

export function toggleChannelAI(channelId: string): boolean {
  try {
    const wasActive = enabledChannels.has(channelId)
    const userName = getUserDisplayName()

    if (wasActive) {
      enabledChannels.delete(channelId)
      processingChannels.delete(channelId)
      greetedChannels.delete(channelId)
      conversationHistory.delete(channelId)
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

      if (settings.store.showNotifications) {
        showToast(`AI Responder Enabled for ${userName}`, Toasts.Type.SUCCESS)
      }

      debugLog(`Enabled for ${userName} in channel ${channelId}`)
      return true
    }
  } catch (error) {
    console.error("AIResponder v2.7: Toggle error:", error)
    return false
  }
}
