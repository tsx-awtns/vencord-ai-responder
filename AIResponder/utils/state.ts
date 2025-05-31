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

export const enabledChannels = new Set<string>()
export const processingChannels = new Set<string>()
export const typingIntervals = new Map<string, NodeJS.Timeout>()
export const greetedChannels = new Set<string>()
export const conversationHistory = new Map<string, Array<{ role: string; content: string }>>()
export const awayReasons = new Map<string, string>()

export function clearAllState(): void {
  enabledChannels.clear()
  processingChannels.clear()
  typingIntervals.clear()
  greetedChannels.clear()
  conversationHistory.clear()
  awayReasons.clear()
}
