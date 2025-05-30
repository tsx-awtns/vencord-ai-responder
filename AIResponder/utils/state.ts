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

export const enabledChannels = new Set<string>()
export const processingChannels = new Set<string>()
export const typingIntervals = new Map<string, NodeJS.Timeout>()
export const greetedChannels = new Set<string>()
export const conversationHistory = new Map<string, Array<{ role: string; content: string }>>()

export function clearAllState(): void {
  enabledChannels.clear()
  processingChannels.clear()
  typingIntervals.clear()
  greetedChannels.clear()
  conversationHistory.clear()
}
