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
import { awayReasons } from "./state"

const UserStore = findByPropsLazy("getCurrentUser")

export function getUserDisplayName(): string {
  try {
    const currentUser = UserStore.getCurrentUser()
    if (!currentUser) return "User"
    return currentUser.globalName || currentUser.username || "User"
  } catch (error) {
    console.error("AIResponder v2.7: Error getting user name:", error)
    return "User"
  }
}

export function debugLog(message: string, data?: any): void {
  if (settings.store.debugMode) {
    console.log(`AIResponder v2.7 [DEBUG]: ${message}`, data || "")
  }
}

// Update the generateGreetingMessage function to use English
export function generateGreetingMessage(userName: string, channelId?: string): string {
  const awayReason = channelId ? awayReasons.get(channelId) : null
  const reasonText = awayReason ? ` (${awayReason})` : ""

  const greetings = [
    `Hey! 👋 I'm ${userName}'s AI assistant. ${userName} is currently away${reasonText}, but feel free to chat with me until they return! I can help with questions, have conversations, or just chat about anything you'd like. What's on your mind?`,
    `Hi there! 🤖 This is ${userName}'s AI assistant speaking. ${userName} isn't available right now${reasonText}, but I'm here to chat! I can discuss topics, answer questions, or just have a friendly conversation until ${userName} gets back. How can I help you today?`,
    `Hello! ✨ I'm an AI assistant responding for ${userName} who is currently away${reasonText}. But don't worry - I'm here to chat and help with whatever you need! Feel free to ask me anything or just have a conversation until ${userName} returns. What would you like to talk about?`,
    `Hey! 🌟 ${userName}'s AI assistant here! ${userName} is away at the moment${reasonText}, but I'm happy to chat with you in the meantime. I can help with questions, discuss topics, or just have a friendly conversation. What brings you here today?`,
    `Hi! 👨‍💻 I'm ${userName}'s AI companion. ${userName} is currently unavailable${reasonText}, but I'm here to keep you company! I can chat about anything, help with questions, or just have a nice conversation until they're back. What's up?`,
  ]

  return greetings[Math.floor(Math.random() * greetings.length)]
}
