/**
 * AIResponder v2.1.0 - Intelligent AI Auto-Responder for Vencord
 *
 * @author mays_024
 * @id 1210310965162414134
 * @website https://www.syva.uk/syva-dev/
 * @repository https://github.com/tsx-awtns/vencord-ai-responder
 * @version 2.1.0
 * @license MIT
 *
 * Features:
 * - Enhanced rate limit detection and user notifications
 * - Daily limit handling with account creation guidance
 * - Initial greeting message explaining user is away
 * - Enhanced enable/disable functionality with visual feedback
 * - Professional icon design with smooth animations
 * - Normal AI conversation capabilities
 * - Working typing animations
 * - Custom/Default API key support
 * - DM-only operation for safety
 */

"use client"

import definePlugin, { OptionType } from "@utils/types"
import { definePluginSettings } from "@api/Settings"
import { findByPropsLazy } from "@webpack"
import { FluxDispatcher } from "@webpack/common"
import { addChatBarButton, removeChatBarButton, ChatBarButton } from "@api/ChatButtons"
import { showToast, Toasts } from "@webpack/common"

const MessageActions = findByPropsLazy("sendMessage")
const UserStore = findByPropsLazy("getCurrentUser")
const SelectedChannelStore = findByPropsLazy("getChannelId")
const TypingStore = findByPropsLazy("startTyping", "stopTyping")

const enabledChannels = new Set<string>()
const processingChannels = new Set<string>()
const typingIntervals = new Map<string, NodeJS.Timeout>()
const greetedChannels = new Set<string>()

const DEFAULT_API_KEY = "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"

const settings = definePluginSettings({
  useCustomApiKey: {
    type: OptionType.BOOLEAN,
    description: "Use your own OpenRouter.ai API key (otherwise the default key will be used)",
    default: false,
  },
  customApiKey: {
    type: OptionType.STRING,
    description: "Your own OpenRouter.ai API key (optional - only if the above option is enabled)",
    placeholder: "sk-or-v1-...",
    default: "",
  },
  phpApiUrl: {
    type: OptionType.STRING,
    description: "URL of the PHP API for OpenRouter (default should work)",
    placeholder: "https://www.syva.uk/syva-bot/api/openrouter.php",
    default: "https://www.syva.uk/syva-bot/api/openrouter.php",
  },
  showNotifications: {
    type: OptionType.BOOLEAN,
    description: "Show toast notifications when enabling/disabling AI responder",
    default: true,
  },
  sendGreeting: {
    type: OptionType.BOOLEAN,
    description: "Send initial greeting message explaining that the user is away",
    default: true,
  },
  showRateLimitHelp: {
    type: OptionType.BOOLEAN,
    description: "Show helpful notifications when daily limits are reached",
    default: true,
  },
})

interface IconProps {
  isActive: boolean
  isProcessing: boolean
  size?: number
}

function EnhancedAIIcon({ isActive, isProcessing, size = 24 }: IconProps) {
  const baseColor = isActive ? "#00ff88" : "#8b949e"
  const glowColor = isActive ? "#00ff88" : "transparent"
  const processingColor = "#ffd700"

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: isActive
          ? "linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,184,148,0.1) 100%)"
          : "transparent",
        border: isActive ? "1px solid rgba(0,255,136,0.3)" : "1px solid transparent",
        filter: isActive ? `drop-shadow(0 0 12px ${glowColor}40)` : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isProcessing ? "scale(1.05)" : "scale(1)",
      }}
    >
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transition: "all 0.3s ease",
        }}
      >
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isProcessing ? processingColor : baseColor} />
            <stop offset="100%" stopColor={isProcessing ? "#ffed4e" : isActive ? "#00b894" : "#6b7280"} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="url(#aiGradient)"
          strokeWidth="2"
          strokeDasharray={isProcessing ? "4 2" : "none"}
          filter={isActive ? "url(#glow)" : "none"}
        >
          {isProcessing && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12 12;360 12 12"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        <circle cx="12" cy="12" r="4" fill="url(#aiGradient)" opacity="0.8">
          {isProcessing && <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />}
        </circle>

        <circle cx="8" cy="8" r="1.5" fill="url(#aiGradient)">
          {isProcessing && (
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" begin="0s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="16" cy="8" r="1.5" fill="url(#aiGradient)">
          {isProcessing && (
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" begin="0.3s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="8" cy="16" r="1.5" fill="url(#aiGradient)">
          {isProcessing && (
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" begin="0.6s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="16" cy="16" r="1.5" fill="url(#aiGradient)">
          {isProcessing && (
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" begin="0.9s" repeatCount="indefinite" />
          )}
        </circle>

        <line x1="8" y1="8" x2="12" y2="12" stroke="url(#aiGradient)" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="8" x2="12" y2="12" stroke="url(#aiGradient)" strokeWidth="1" opacity="0.6" />
        <line x1="8" y1="16" x2="12" y2="12" stroke="url(#aiGradient)" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="16" x2="12" y2="12" stroke="url(#aiGradient)" strokeWidth="1" opacity="0.6" />

        {isActive && (
          <circle cx="18" cy="6" r="2" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {isProcessing && (
        <div
          style={{
            position: "absolute",
            top: "-2px",
            left: "-2px",
            right: "-2px",
            bottom: "-2px",
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTop: "2px solid #ffd700",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
    </div>
  )
}

function getUserDisplayName(): string {
  try {
    const currentUser = UserStore.getCurrentUser()
    if (!currentUser) return "User"
    return currentUser.globalName || currentUser.username || "User"
  } catch (error) {
    console.error("AIResponder v2.1.0: Error getting user name:", error)
    return "User"
  }
}

function generateGreetingMessage(userName: string): string {
  const greetings = [
    `Hey! 👋 I'm ${userName}'s AI assistant. ${userName} is currently away, but feel free to chat with me until they return! I can help with questions, have conversations, or just chat about anything you'd like. What's on your mind?`,

    `Hi there! 🤖 This is ${userName}'s AI assistant speaking. ${userName} isn't available right now, but I'm here to chat! I can discuss topics, answer questions, or just have a friendly conversation until ${userName} gets back. How can I help you today?`,

    `Hello! ✨ I'm an AI assistant responding for ${userName} who is currently away. But don't worry - I'm here to chat and help with whatever you need! Feel free to ask me anything or just have a conversation until ${userName} returns. What would you like to talk about?`,

    `Hey! 🌟 ${userName}'s AI assistant here! ${userName} is away at the moment, but I'm happy to chat with you in the meantime. I can help with questions, discuss topics, or just have a friendly conversation. What brings you here today?`,

    `Hi! 👨‍💻 I'm ${userName}'s AI companion. ${userName} is currently unavailable, but I'm here to keep you company! I can chat about anything, help with questions, or just have a nice conversation until they're back. What's up?`,
  ]

  return greetings[Math.floor(Math.random() * greetings.length)]
}

function handleRateLimitError(useCustomKey: boolean, userName: string): void {
  if (!settings.store.showRateLimitHelp) return

  const message = useCustomKey
    ? `⚠️ **API Limit Reached for ${userName}**\n\n` +
      `Your custom OpenRouter.ai API key has reached its daily limit (~1,000 requests).\n\n` +
      `**Solutions:**\n` +
      `• Wait 24 hours for limit reset\n` +
      `• Create a new OpenRouter.ai account with a new email\n` +
      `• Get a new API key from the new account\n` +
      `• Update your API key in plugin settings\n\n` +
      `**Quick Fix:** Visit [openrouter.ai](https://openrouter.ai) → Sign up with new email → Get new API key`
    : `⚠️ **Daily Limit Reached for ${userName}**\n\n` +
      `The default OpenRouter.ai API key has reached its daily limit (~1,000 requests).\n\n` +
      `**Solutions:**\n` +
      `• Create your own free OpenRouter.ai account\n` +
      `• Get your own API key (unlimited daily usage)\n` +
      `• Enable "Use your own API key" in plugin settings\n\n` +
      `**Quick Fix:** Visit [openrouter.ai](https://openrouter.ai) → Sign up → Get API key → Paste in settings`

  showToast(message, Toasts.Type.FAILURE, {
    duration: 10000,
  })

  console.warn(`AIResponder v2.1.0: Rate limit reached for ${userName} (Custom Key: ${useCustomKey})`)
}

async function generateAIResponse(
  message: string,
  apiKey: string,
  useCustomKey: boolean,
  userName: string,
): Promise<string> {
  try {
    const phpApiUrl = settings.store.phpApiUrl || "https://www.syva.uk/syva-bot/api/openrouter.php"

    const systemPrompt = `You are an AI assistant responding on behalf of ${userName}. You can have normal conversations, answer questions, help with tasks, and chat naturally. 

Key guidelines:
- Chat normally and be helpful like any AI assistant
- You can discuss any topic, answer questions, help with problems, etc.
- Be friendly, conversational, and engaging
- Don't mention that ${userName} is away unless directly asked
- Respond naturally to whatever the person is talking about
- Keep responses concise but helpful
- You've already introduced yourself as ${userName}'s AI assistant, so just chat normally now

You are essentially ${userName}'s AI companion that can hold normal conversations.`

    const response = await fetch(phpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "AIResponder/2.1.0",
      },
      body: JSON.stringify({
        apiKey,
        message,
        model: "meta-llama/llama-3.1-8b-instruct:free",
        systemPrompt,
        maxTokens: 300,
        temperature: 0.8,
        useCustomKey,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data?.success) {
      if (
        data?.error &&
        (data.error.includes("rate limit") ||
          data.error.includes("quota") ||
          data.error.includes("limit exceeded") ||
          data.error.includes("429") ||
          data.message?.includes("limit"))
      ) {
        handleRateLimitError(useCustomKey, userName)
        throw new Error("Rate limit exceeded")
      }
      throw new Error(data?.message || "API request failed")
    }

    if (!data?.response) {
      throw new Error("Invalid API response format")
    }

    return data.response
  } catch (error) {
    console.error("AIResponder v2.1.0: API Error:", error)

    if (error instanceof Error && (error.message.includes("rate limit") || error.message.includes("quota") || error.message.includes("429"))) {
      handleRateLimitError(useCustomKey, userName)

      const rateLimitResponses = [
        `Hey! I've reached my daily chat limit, but ${userName} will be back soon! 😅`,
        `Oops! Hit my daily limit. You can create a free OpenRouter.ai account for unlimited chats!`,
        `Daily limit reached! 📊 Tip: Get your own free API key at openrouter.ai for unlimited usage!`,
        `I'm at my daily limit, but ${userName} will respond personally when they return! 💬`,
      ]
      return rateLimitResponses[Math.floor(Math.random() * rateLimitResponses.length)]
    }

    const fallbackResponses = [
      "Hey! How can I help you today?",
      "Hi there! What's on your mind?",
      "Hello! I'm here to chat. What would you like to talk about?",
      "Hey! Feel free to ask me anything or just chat!",
      "Hi! I'm ready to help with whatever you need.",
    ]
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
}

function startTypingAnimation(channelId: string): NodeJS.Timeout | null {
  try {
    console.log(`AIResponder v2.1.0: Starting typing for channel ${channelId}`)

    const existingInterval = typingIntervals.get(channelId)
    if (existingInterval) {
      clearInterval(existingInterval)
    }

    TypingStore.startTyping(channelId)

    const interval = setInterval(() => {
      try {
        TypingStore.startTyping(channelId)
      } catch (error) {
        console.error("AIResponder v2.1.0: Typing interval error:", error)
      }
    }, 8000)

    typingIntervals.set(channelId, interval)
    return interval
  } catch (error) {
    console.error("AIResponder v2.1.0: Start typing error:", error)
    return null
  }
}

function stopTypingAnimation(channelId: string): void {
  try {
    console.log(`AIResponder v2.1.0: Stopping typing for channel ${channelId}`)

    const interval = typingIntervals.get(channelId)
    if (interval) {
      clearInterval(interval)
      typingIntervals.delete(channelId)
    }

    TypingStore.stopTyping(channelId)
  } catch (error) {
    console.error("AIResponder v2.1.0: Stop typing error:", error)
  }
}

async function sendGreetingIfNeeded(channelId: string): Promise<void> {
  try {
    if (!settings.store.sendGreeting) return
    if (greetedChannels.has(channelId)) return

    const userName = getUserDisplayName()
    const greetingMessage = generateGreetingMessage(userName)

    console.log(`AIResponder v2.1.0: Sending greeting for ${userName} in channel ${channelId}`)

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
    console.log(`AIResponder v2.1.0: Greeting sent for ${userName}`)
  } catch (error) {
    console.error("AIResponder v2.1.0: Greeting error:", error)
    stopTypingAnimation(channelId)
  }
}

async function sendAIResponse(channelId: string, originalMessage: string): Promise<void> {
  try {
    processingChannels.add(channelId)

    const useCustomKey = Boolean(
      settings.store.useCustomApiKey && settings.store.customApiKey && settings.store.customApiKey.trim(),
    )
    const apiKey = useCustomKey ? settings.store.customApiKey : DEFAULT_API_KEY
    const userName = getUserDisplayName()

    console.log(`AIResponder v2.1.0: Processing message for ${userName}`)

    startTypingAnimation(channelId)

    const aiResponse = await generateAIResponse(originalMessage, apiKey, useCustomKey, userName)

    stopTypingAnimation(channelId)

    await MessageActions.sendMessage(channelId, {
      content: aiResponse,
      tts: false,
      invalidEmojis: [],
      validNonShortcutEmojis: [],
    })

    console.log(`AIResponder v2.1.0: Response sent for ${userName}`)
  } catch (error) {
    console.error("AIResponder v2.1.0: Send error:", error)
    stopTypingAnimation(channelId)

    if (error instanceof Error && error.message.includes("Rate limit exceeded")) {
      return
    }
  } finally {
    processingChannels.delete(channelId)
  }
}

function handleMessage(event: any): void {
  try {
    const message = event.message
    if (!message) return

    if (!enabledChannels.has(message.channel_id)) return
    if (processingChannels.has(message.channel_id)) return

    const currentUser = UserStore.getCurrentUser()
    if (!currentUser) return
    if (message.author?.id === currentUser.id) return
    if (message.author?.bot) return
    if (message.guild_id) return

    console.log(`AIResponder v2.1.0: Message from ${message.author?.username || "unknown"}: "${message.content}"`)

    if (!greetedChannels.has(message.channel_id)) {
      setTimeout(
        async () => {
          await sendGreetingIfNeeded(message.channel_id)
          setTimeout(
            () => {
              sendAIResponse(message.channel_id, message.content)
            },
            1000 + Math.random() * 500,
          )
        },
        200 + Math.random() * 300,
      )
    } else {
      setTimeout(
        () => {
          sendAIResponse(message.channel_id, message.content)
        },
        200 + Math.random() * 300,
      )
    }
  } catch (error) {
    console.error("AIResponder v2.1.0: Message handler error:", error)
  }
}

function toggleChannelAI(channelId: string): boolean {
  try {
    const wasActive = enabledChannels.has(channelId)
    const userName = getUserDisplayName()

    if (wasActive) {
      enabledChannels.delete(channelId)
      processingChannels.delete(channelId)
      greetedChannels.delete(channelId)
      stopTypingAnimation(channelId)

      if (settings.store.showNotifications) {
        showToast("AI Responder Disabled", Toasts.Type.SUCCESS)
      }

      console.log(`AIResponder v2.1.0: Disabled for ${userName} in channel ${channelId}`)
      return false
    } else {
      enabledChannels.add(channelId)
      greetedChannels.delete(channelId)

      if (settings.store.showNotifications) {
        showToast(`AI Responder Enabled for ${userName}`, Toasts.Type.SUCCESS)
      }

      console.log(`AIResponder v2.1.0: Enabled for ${userName} in channel ${channelId}`)
      return true
    }
  } catch (error) {
    console.error("AIResponder v2.1.0: Toggle error:", error)
    return false
  }
}

export default definePlugin({
  name: "AIResponder",
  version: "2.1.0",
  tags: ["AI", "Auto-Responder", "OpenRouter", "syva.uk"],
  description:
    "🤖 Intelligent AI auto-responder using OpenRouter.ai with Llama models. Created by mays_024 - Visit: www.syva.uk",
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
      FluxDispatcher.subscribe("MESSAGE_CREATE", handleMessage)

      addChatBarButton("airesponder", (props) => {
        try {
          if (props.channel.guild_id) return null

          const isActive = enabledChannels.has(props.channel.id)
          const isProcessing = processingChannels.has(props.channel.id)
          const useCustomKey = Boolean(settings.store.useCustomApiKey && settings.store.customApiKey)
          const keyInfo = useCustomKey ? "Custom Key" : "Default Key (~1k daily limit)"
          const userName = getUserDisplayName()

          return (
            <ChatBarButton
              tooltip={
                isProcessing
                  ? `🤖 AI is responding for ${userName}...`
                  : isActive
                    ? `✅ AI Responder: ACTIVE for ${userName} (${keyInfo})\nClick to disable`
                    : `❌ AI Responder: INACTIVE for ${userName} (${keyInfo})\nClick to enable`
              }
              onClick={() => toggleChannelAI(props.channel.id)}
              buttonProps={{
                style: {
                  padding: "4px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                },
              }}
            >
              <EnhancedAIIcon isActive={isActive} isProcessing={isProcessing} />
            </ChatBarButton>
          )
        } catch (error) {
          console.error("AIResponder v2.1.0: Button render error:", error)
          return null
        }
      })

      const userName = getUserDisplayName()
      console.log(`AIResponder v2.1.0: Started successfully for ${userName}`)
    } catch (error) {
      console.error("AIResponder v2.1.0: Start error:", error)
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

      enabledChannels.clear()
      processingChannels.clear()
      typingIntervals.clear()
      greetedChannels.clear()

      console.log("AIResponder v2.1.0: Stopped successfully")
    } catch (error) {
      console.error("AIResponder v2.1.0: Stop error:", error)
    }
  },

  commands: [
    {
      name: "airesponder",
      description: "Toggle AI auto-responder for current channel",
      execute: () => {
        const currentChannelId = SelectedChannelStore.getChannelId()
        if (!currentChannelId) {
          return { content: "❌ No channel selected" }
        }

        const newState = toggleChannelAI(currentChannelId)
        const useCustomKey = Boolean(settings.store.useCustomApiKey && settings.store.customApiKey)
        const keyInfo = useCustomKey ? "(Custom API Key - Unlimited)" : "(Default API Key - ~1k daily limit)"
        const userName = getUserDisplayName()

        return {
          content: newState
            ? `🤖 **AI Responder v2.1.0 ACTIVATED** for **${userName}**! ${keyInfo}\n✅ AI will send a greeting message and then chat normally on behalf of ${userName}.\n\n💡 **Tip:** Create your own free OpenRouter.ai account for unlimited daily usage!`
            : `❌ **AI Responder DEACTIVATED** for **${userName}**.`,
        }
      },
    },
  ],
})
