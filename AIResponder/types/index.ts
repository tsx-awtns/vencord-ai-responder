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

export interface IconProps {
  isActive: boolean
  isProcessing: boolean
  isGlobalMode?: boolean
  size?: number
}

export interface APIResponse {
  success: boolean
  response?: string
  error?: string
  message?: string
  modelUsed?: string
  keyUsed?: string
  version?: string
}

export interface ConversationMessage {
  role: string
  content: string
}
