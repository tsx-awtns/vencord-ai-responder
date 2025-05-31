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

import definePlugin from "@utils/types"
import { findByPropsLazy } from "@webpack"
import { FluxDispatcher, React } from "@webpack/common"
import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons"

import { settings } from "./settings"
import { getUserDisplayName } from "./utils/helpers"
import { handleMessage } from "./utils/messageHandler"
import { toggleChannelAI } from "./utils/channelManager"
import { clearAllState, typingIntervals } from "./utils/state"
import { AIResponderButton } from "./components/AIResponderButton"

const SelectedChannelStore = findByPropsLazy("getChannelId")
const TypingStore = findByPropsLazy("startTyping", "stopTyping")

export default definePlugin({
  name: "AIResponder",
  description:
    "🤖 Intelligent AI auto-responder using OpenRouter.ai with multiple fallback keys and models. Free accounts have ~1,000 requests/day limit. Created by mays_024 - Visit: www.syva.uk",
  authors: [
    {
      name: "mays_024",
      id: 1210310965162414134n,
      website: "https://www.syva.uk/syva-dev/",
      github: "https://github.com/tsx-awtns/vencord-ai-responder",
    },
  ],

  settings,

  start() {
    try {
      console.log("AIResponder v2.7: Starting plugin...")

      FluxDispatcher.subscribe("MESSAGE_CREATE", handleMessage)

      addChatBarButton("airesponder", (props) => {
        try {
          if (props.channel.guild_id) return null
          return <AIResponderButton channel={props.channel} />
        } catch (error) {
          console.error("AIResponder v2.7: Button render error:", error)
          return null
        }
      })

      const userName = getUserDisplayName()
      console.log(`AIResponder v2.7: Started successfully for ${userName}`)
    } catch (error) {
      console.error("AIResponder v2.7: Start error:", error)
    }
  },

  stop() {
    try {
      FluxDispatcher.unsubscribe("MESSAGE_CREATE", handleMessage)
      removeChatBarButton("airesponder")

      typingIntervals.forEach((interval, channelId) => {
        clearInterval(interval)
        TypingStore.stopTyping(channelId)
      })

      clearAllState()

      console.log("AIResponder v2.7: Stopped successfully")
    } catch (error) {
      console.error("AIResponder v2.7: Stop error:", error)
    }
  },

  commands: [
    {
      name: "airesponder",
      description: "Toggle AI auto-responder for current channel or globally",
      execute: () => {
        const currentChannelId = SelectedChannelStore.getChannelId()
        if (!currentChannelId) {
          return { content: "❌ No channel selected" }
        }

        const useCustomKey = Boolean(settings.store.useCustomApiKey && settings.store.customApiKey)
        const keyInfo = useCustomKey ? "(Custom API Key)" : "(Multiple Fallback Keys)"
        const userName = getUserDisplayName()
        const isGlobalMode = settings.store.autoRespondAllDMs

        const newState = toggleChannelAI(currentChannelId)

        return {
          content: isGlobalMode
            ? `✨ **Global AI active** for ${userName}! ${keyInfo}`
            : newState
              ? `✅ **AI active** for ${userName}! ${keyInfo}`
              : `❌ **AI disabled** for ${userName}! ${keyInfo}`,
        }
      },
    },
    {
      name: "airesponder-global",
      description: "Toggle global AI auto-responder for ALL DMs",
      execute: () => {
        const userName = getUserDisplayName()
        const useCustomKey = Boolean(settings.store.useCustomApiKey && settings.store.customApiKey)
        const keyInfo = useCustomKey ? "(Custom API Key)" : "(Multiple Fallback Keys)"

        settings.store.autoRespondAllDMs = !settings.store.autoRespondAllDMs

        return {
          content: settings.store.autoRespondAllDMs
            ? `✨ **Global AI enabled** for ${userName}! ${keyInfo}`
            : `✨ **Global AI disabled** for ${userName}! ${keyInfo}`,
        }
      },
    },
  ],
})
