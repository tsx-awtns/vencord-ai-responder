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
import { debugLog } from "./helpers"
import { sendGreetingIfNeeded, sendAIResponse } from "./messageService"
import { enabledChannels, processingChannels, greetedChannels } from "./state"

const UserStore = findByPropsLazy("getCurrentUser")

export function handleMessage(event: any): void {
  try {
    const message = event.message
    if (!message) return

    const currentUser = UserStore.getCurrentUser()
    if (!currentUser) return
    if (message.author?.id === currentUser.id) return
    if (message.author?.bot) return
    if (message.guild_id) return

    const blacklistedUsers = settings.store.blacklistedUsers
      ? settings.store.blacklistedUsers
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id)
      : []

    if (blacklistedUsers.includes(message.author?.id)) {
      debugLog(`Ignoring message from blacklisted user: ${message.author?.username}`)
      return
    }

    const isGlobalAutoRespond = settings.store.autoRespondAllDMs
    const isChannelEnabled = enabledChannels.has(message.channel_id)

    if (!isGlobalAutoRespond && !isChannelEnabled) return
    if (processingChannels.has(message.channel_id)) return

    debugLog(`Message received from ${message.author?.username || "unknown"}`, {
      content: message.content,
      channelId: message.channel_id,
      globalMode: isGlobalAutoRespond,
      channelMode: isChannelEnabled,
    })

    if (!message.content || message.content.trim() === "") {
      debugLog("Skipping empty message")
      return
    }

    if (!greetedChannels.has(message.channel_id)) {
      setTimeout(
        async () => {
          try {
            await sendGreetingIfNeeded(message.channel_id)
            setTimeout(
              () => {
                try {
                  sendAIResponse(message.channel_id, message.content)
                } catch (innerError) {
                  console.error("AIResponder v2.7: Error sending AI response:", innerError)
                }
              },
              1000 + Math.random() * 500,
            )
          } catch (error) {
            console.error("AIResponder v2.7: Error sending greeting:", error)
          }
        },
        200 + Math.random() * 300,
      )
    } else {
      setTimeout(
        () => {
          try {
            sendAIResponse(message.channel_id, message.content)
          } catch (error) {
            console.error("AIResponder v2.7: Error sending AI response:", error)
          }
        },
        200 + Math.random() * 300,
      )
    }
  } catch (error) {
    console.error("AIResponder v2.7: Message handler error:", error)
  }
}
