/**
 * AIResponder v2.6 - Enhanced AI Auto-Responder for Vencord
 *
 * @author mays_024
 * @id 1210310965162414134
 * @website https://www.syva.uk/syva-dev/
 * @repository https://github.com/tsx-awtns/vencord-ai-responder
 * @version 2.6
 * @license MIT
 *
 * CHANGES v2.6:
 * - Removed phpApiUrl setting (API URL is now fixed)
 * - Translated all German text to English
 * - Cleaned up code comments for better maintainability
 * - Fixed API URL to always use API endpoint
 * - Removed DEFAULT_API_KEY from client (moved to server)
 * - Removed model selection from client (handled by server)
 * - Enhanced security by centralizing API management
 * - Server now handles automatic fallback between multiple API keys
 * - Improved error handling and logging
 * - Fixed Global Mode button
 * - Improved AI response generation logic
 */

"use client"

import definePlugin, { OptionType } from "@utils/types"
import { definePluginSettings } from "@api/Settings"
import { findByPropsLazy } from "@webpack"
import { FluxDispatcher, React } from "@webpack/common"
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
const conversationHistory = new Map<string, Array<{ role: string; content: string }>>()

const settings = definePluginSettings({
  useCustomApiKey: {
    type: OptionType.BOOLEAN,
    description: "Use your own OpenRouter.ai API key (otherwise multiple fallback keys will be used)",
    default: false,
  },
  customApiKey: {
    type: OptionType.STRING,
    description: "Your own OpenRouter.ai API key (optional - only if the above option is enabled)",
    placeholder: "sk-or-v1-...",
    default: "",
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
  debugMode: {
    type: OptionType.BOOLEAN,
    description: "Enable debug logging for troubleshooting",
    default: false,
  },
  autoRespondAllDMs: {
    type: OptionType.BOOLEAN,
    description: "Automatically respond in ALL DMs (no need to enable per channel)",
    default: false,
  },
  blacklistedUsers: {
    type: OptionType.STRING,
    description: "User IDs to ignore (comma-separated, e.g: 123456789,987654321)",
    placeholder: "123456789,987654321",
    default: "",
  },
  preferredModel: {
    type: OptionType.SELECT,
    description: "Preferred AI model (server will try this first, then fallback to others)",
    options: [
      { label: "Llama 3.1 8B (Free)", value: "meta-llama/llama-3.1-8b-instruct:free", default: true },
      { label: "Llama 3.1 70B (Free)", value: "meta-llama/llama-3.1-70b-instruct:free" },
      { label: "Llama 3.2 3B (Free)", value: "meta-llama/llama-3.2-3b-instruct:free" },
      { label: "Qwen 2.5 7B (Free)", value: "qwen/qwen-2.5-7b-instruct:free" },
      { label: "Auto (Server decides)", value: "auto" },
    ],
    default: "meta-llama/llama-3.1-8b-instruct:free",
  },
})

interface IconProps {
  isActive: boolean
  isProcessing: boolean
  isGlobalMode?: boolean
  size?: number
}

function EnhancedAIIcon({ isActive, isProcessing, isGlobalMode = false, size = 24 }: IconProps) {
  const baseColor = isGlobalMode ? "#00e8fc" : isActive ? "#00ff88" : "#8b949e"
  const glowColor = isGlobalMode ? "#00e8fc" : isActive ? "#00ff88" : "transparent"
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
        borderRadius: isGlobalMode ? "25%" : "50%",
        background: isGlobalMode
          ? "linear-gradient(135deg, rgba(0,232,252,0.15) 0%, rgba(0,186,203,0.15) 100%)"
          : isActive
            ? "linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,184,148,0.1) 100%)"
            : "transparent",
        border: isGlobalMode
          ? "1px solid rgba(0,232,252,0.5)"
          : isActive
            ? "1px solid rgba(0,255,136,0.3)"
            : "1px solid transparent",
        filter: isGlobalMode
          ? `drop-shadow(0 0 8px ${glowColor}80)`
          : isActive
            ? `drop-shadow(0 0 12px ${glowColor}40)`
            : "none",
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
            <stop
              offset="100%"
              stopColor={isProcessing ? "#ffed4e" : isGlobalMode ? "#00bac8" : isActive ? "#00b894" : "#6b7280"}
            />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {isGlobalMode ? (
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
            ry="4"
            fill="none"
            stroke="url(#aiGradient)"
            strokeWidth="2"
            filter="url(#glow)"
          />
        ) : (
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
        )}

        {isGlobalMode ? (
          <>
            <rect x="8" y="8" width="8" height="8" rx="2" ry="2" fill="url(#aiGradient)" opacity="0.8">
              {isProcessing && (
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
              )}
            </rect>
            <circle cx="10" cy="10" r="1" fill="#ffffff" opacity="0.9" />
            <circle cx="14" cy="14" r="1" fill="#ffffff" opacity="0.9" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="4" fill="url(#aiGradient)" opacity="0.8">
              {isProcessing && (
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
              )}
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
          </>
        )}

        {isActive && !isGlobalMode && (
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
            borderRadius: isGlobalMode ? "25%" : "50%",
            border: "2px solid transparent",
            borderTop: "2px solid #ffd700",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
    </div>
  )
}

const AIResponderButton = ({ channel }) => {
  const [isActive, setIsActive] = React.useState(enabledChannels.has(channel.id))
  const [isProcessing, setIsProcessing] = React.useState(processingChannels.has(channel.id))
  const [isGlobalMode, setIsGlobalMode] = React.useState(settings.store.autoRespondAllDMs)

  React.useEffect(() => {
    const updateState = () => {
      setIsActive(enabledChannels.has(channel.id))
      setIsProcessing(processingChannels.has(channel.id))
      setIsGlobalMode(settings.store.autoRespondAllDMs)
    }

    updateState()
    const interval = setInterval(updateState, 100)

    return () => clearInterval(interval)
  }, [channel.id])

  const useCustomKey = Boolean(settings.store.useCustomApiKey && settings.store.customApiKey)
  const keyInfo = useCustomKey ? "Custom Key" : "Multiple Fallback Keys"
  const userName = getUserDisplayName()

  const handleClick = () => {
    if (isGlobalMode) {
      settings.store.autoRespondAllDMs = !settings.store.autoRespondAllDMs
      setIsGlobalMode(settings.store.autoRespondAllDMs)

      if (settings.store.showNotifications) {
        showToast(
          settings.store.autoRespondAllDMs
            ? `🌍 Global AI Responder Enabled for ${userName}`
            : `🌍 Global AI Responder Disabled for ${userName}`,
          Toasts.Type.SUCCESS,
        )
      }
    } else {
      toggleChannelAI(channel.id)
      setTimeout(() => {
        setIsActive(enabledChannels.has(channel.id))
        setIsProcessing(processingChannels.has(channel.id))
      }, 10)
    }
  }

  const getTooltipText = () => {
    if (isProcessing) {
      return `🤖 AI is responding for ${userName}...`
    }

    if (isGlobalMode) {
      return `✨ AI Responder: Global AI active (${keyInfo})`
    }

    if (isActive) {
      return `✅ AI Responder: ACTIVE for ${userName} (${keyInfo})\nClick to disable for this channel`
    }

    return `❌ AI Responder: INACTIVE for ${userName} (${keyInfo})\nClick to enable for this channel`
  }

  const effectiveIsActive = isGlobalMode || isActive

  return (
    <ChatBarButton
      tooltip={getTooltipText()}
      onClick={handleClick}
      buttonProps={{
        style: {
          padding: "4px",
          borderRadius: "4px",
          transition: "all 0.2s ease",
          border: "none",
          backgroundColor: "transparent",
          position: "relative",
        },
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EnhancedAIIcon isActive={effectiveIsActive} isProcessing={isProcessing} isGlobalMode={isGlobalMode} />

        {isGlobalMode && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "25%",
              boxShadow: "0 0 10px 2px rgba(0, 232, 252, 0.5)",
              animation: "pulse 2s infinite",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
        )}

        <style jsx global>{`
          @keyframes pulse {
            0% {
              opacity: 0.3;
              box-shadow: 0 0 5px 2px rgba(0, 232, 252, 0.3);
            }
            50% {
              opacity: 0.6;
              box-shadow: 0 0 15px 4px rgba(0, 232, 252, 0.5);
            }
            100% {
              opacity: 0.3;
              box-shadow: 0 0 5px 2px rgba(0, 232, 252, 0.3);
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </ChatBarButton>
  )
}

function getUserDisplayName(): string {
  try {
    const currentUser = UserStore.getCurrentUser()
    if (!currentUser) return "User"
    return currentUser.globalName || currentUser.username || "User"
  } catch (error) {
    console.error("AIResponder v2.6: Error getting user name:", error)
    return "User"
  }
}

function debugLog(message: string, data?: any): void {
  if (settings.store.debugMode) {
    console.log(`AIResponder v2.6 [DEBUG]: ${message}`, data || "")
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
      `Your custom OpenRouter.ai API key has reached its daily limit.\n\n` +
      `**Solutions:**\n` +
      `• Wait 24 hours for limit reset\n` +
      `• Create a new OpenRouter.ai account with a new email\n` +
      `• Get a new API key from the new account\n` +
      `• Update your API key in plugin settings\n\n` +
      `**Quick Fix:** Visit [openrouter.ai](https://openrouter.ai) → Sign up with new email → Get new API key`
    : `⚠️ **All Fallback Keys Exhausted for ${userName}**\n\n` +
      `All available fallback API keys have reached their daily limits.\n\n` +
      `**Solutions:**\n` +
      `• Create your own free OpenRouter.ai account\n` +
      `• Get your own API key (unlimited daily usage)\n` +
      `• Enable "Use your own API key" in plugin settings\n\n` +
      `**Quick Fix:** Visit [openrouter.ai](https://openrouter.ai) → Sign up → Get API key → Paste in settings`

  showToast(message, Toasts.Type.FAILURE, {
    duration: 10000,
  })

  console.warn(`AIResponder v2.6: Rate limit reached for ${userName} (Custom Key: ${useCustomKey})`)
}

function getConversationHistory(channelId: string): Array<{ role: string; content: string }> {
  return conversationHistory.get(channelId) || []
}

function addToConversationHistory(channelId: string, role: string, content: string): void {
  const history = getConversationHistory(channelId)
  history.push({ role, content })

  if (history.length > 10) {
    history.splice(0, history.length - 10)
  }

  conversationHistory.set(channelId, history)
  debugLog(`Added to conversation history for ${channelId}:`, { role, content: content.substring(0, 100) + "..." })
}

async function generateAIResponse(
  message: string,
  useCustomKey: boolean,
  userName: string,
  channelId: string,
): Promise<string> {
  try {
    const phpApiUrl = "https://www.syva.uk/syva-bot/api/openrouter.php"

    const history = getConversationHistory(channelId)

    const systemPrompt = `You are ${userName}'s AI assistant. ${userName} is currently away, so you're responding on their behalf. 

IMPORTANT INSTRUCTIONS:
- You are having a normal conversation with someone who messaged ${userName}
- Answer their questions directly and helpfully
- Be conversational, friendly, and engaging
- Don't keep saying generic greetings - actually respond to what they're asking
- If they ask a question, answer it properly
- If they want to chat, chat with them naturally
- You can discuss any topic, help with problems, answer questions, etc.
- Keep responses concise but helpful (1-3 sentences usually)
- Act like a knowledgeable AI assistant, not just a greeting bot

Remember: RESPOND TO THEIR ACTUAL MESSAGE, don't just give generic responses!`

    addToConversationHistory(channelId, "user", message)

    debugLog("Sending request to API", {
      apiUrl: phpApiUrl,
      messageLength: message.length,
      historyLength: history.length,
      useCustomKey,
      preferredModel: settings.store.preferredModel,
    })

    const requestBody = {
      message,
      conversationHistory: history,
      systemPrompt,
      maxTokens: 300,
      temperature: 0.8,
      useCustomKey,
      preferredModel: settings.store.preferredModel,
    }

    if (useCustomKey && settings.store.customApiKey) {
      requestBody.customApiKey = settings.store.customApiKey
    }

    const response = await fetch(phpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "AIResponder/2.6",
      },
      body: JSON.stringify(requestBody),
    })

    debugLog("API response received", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    debugLog("API response data", data)

    if (!data?.success) {
      if (
        data?.error &&
        (data.error.includes("rate limit") ||
          data.error.includes("quota") ||
          data.error.includes("limit exceeded") ||
          data.error.includes("429") ||
          data.message?.includes("limit") ||
          data.error.includes("all keys exhausted"))
      ) {
        handleRateLimitError(useCustomKey, userName)
        throw new Error("Rate limit exceeded")
      }
      throw new Error(data?.message || "API request failed")
    }

    if (!data?.response) {
      throw new Error("Invalid API response format - no response field")
    }

    const aiResponse = data.response.trim()
    if (!aiResponse) {
      throw new Error("Empty response from API")
    }

    addToConversationHistory(channelId, "assistant", aiResponse)

    debugLog("AI response generated successfully", {
      responseLength: aiResponse.length,
      response: aiResponse.substring(0, 100) + "...",
      modelUsed: data.modelUsed || "unknown",
      keyUsed: data.keyUsed || "unknown",
    })

    return aiResponse
  } catch (error) {
    console.error("AIResponder v2.6: API Error:", error)
    debugLog("API Error details", error)

    if (error.message.includes("rate limit") || error.message.includes("quota") || error.message.includes("429")) {
      handleRateLimitError(useCustomKey, userName)

      const rateLimitResponses = [
        `Hey! I've reached my daily chat limit, but ${userName} will be back soon! 😅`,
        `Oops! Hit my daily limit. You can create a free OpenRouter.ai account for unlimited chats!`,
        `Daily limit reached! 📊 Tip: Get your own free API key at openrouter.ai for unlimited usage!`,
        `I'm at my daily limit, but ${userName} will respond personally when they return! 💬`,
      ]
      return rateLimitResponses[Math.floor(Math.random() * rateLimitResponses.length)]
    }

    if (error.message.includes("network") || error.message.includes("fetch")) {
      return "Sorry, I'm having connection issues right now. Can you try again in a moment?"
    }

    if (error.message.includes("timeout")) {
      return "That took too long to process. Could you rephrase your message?"
    }

    const fallbackResponses = [
      "I'm having some technical difficulties right now. What did you want to chat about?",
      "Sorry, I encountered an error. Could you tell me what you're looking for help with?",
      "I'm experiencing some issues, but I'm still here! What's on your mind?",
      "Technical hiccup on my end. What would you like to discuss?",
    ]
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
}

function startTypingAnimation(channelId: string): NodeJS.Timeout | null {
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
        console.error("AIResponder v2.6: Typing interval error:", error)
      }
    }, 8000)

    typingIntervals.set(channelId, interval)
    return interval
  } catch (error) {
    console.error("AIResponder v2.6: Start typing error:", error)
    return null
  }
}

function stopTypingAnimation(channelId: string): void {
  try {
    debugLog(`Stopping typing animation for channel ${channelId}`)

    const interval = typingIntervals.get(channelId)
    if (interval) {
      clearInterval(interval)
      typingIntervals.delete(channelId)
    }

    TypingStore.stopTyping(channelId)
  } catch (error) {
    console.error("AIResponder v2.6: Stop typing error:", error)
  }
}

async function sendGreetingIfNeeded(channelId: string): Promise<void> {
  try {
    if (!settings.store.sendGreeting) return
    if (greetedChannels.has(channelId)) return

    const userName = getUserDisplayName()
    const greetingMessage = generateGreetingMessage(userName)

    debugLog(`Sending greeting for ${userName} in channel ${channelId}`)

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
    debugLog(`Greeting sent for ${userName}`)
  } catch (error) {
    console.error("AIResponder v2.6: Greeting error:", error)
    stopTypingAnimation(channelId)
  }
}

async function sendAIResponse(channelId: string, originalMessage: string): Promise<void> {
  try {
    processingChannels.add(channelId)

    const useCustomKey = Boolean(
      settings.store.useCustomApiKey && settings.store.customApiKey && settings.store.customApiKey.trim(),
    )
    const userName = getUserDisplayName()

    debugLog(`Processing message for ${userName}`, {
      messageLength: originalMessage.length,
      useCustomKey,
      channelId,
    })

    startTypingAnimation(channelId)

    const aiResponse = await generateAIResponse(originalMessage, useCustomKey, userName, channelId)

    stopTypingAnimation(channelId)

    await MessageActions.sendMessage(channelId, {
      content: aiResponse,
      tts: false,
      invalidEmojis: [],
      validNonShortcutEmojis: [],
    })

    debugLog(`Response sent for ${userName}`, {
      responseLength: aiResponse.length,
    })
  } catch (error) {
    console.error("AIResponder v2.6: Send error:", error)
    stopTypingAnimation(channelId)

    if (error.message.includes("Rate limit exceeded")) {
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
    console.error("AIResponder v2.6: Message handler error:", error)
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
    console.error("AIResponder v2.6: Toggle error:", error)
    return false
  }
}

export default definePlugin({
  name: "AIResponder",
  description:
    "🤖 Intelligent AI auto-responder using OpenRouter.ai with multiple fallback keys and models. Enhanced security with server-side API management. Created by mays_024 - Visit: www.syva.uk",
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
          return <AIResponderButton channel={props.channel} />
        } catch (error) {
          console.error("AIResponder v2.6: Button render error:", error)
          return null
        }
      })

      const userName = getUserDisplayName()
      console.log(`AIResponder v2.6: Started successfully for ${userName}`)
    } catch (error) {
      console.error("AIResponder v2.6: Start error:", error)
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
      conversationHistory.clear()

      console.log("AIResponder v2.6: Stopped successfully")
    } catch (error) {
      console.error("AIResponder v2.6: Stop error:", error)
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
              : `❌ **AI disabled** for ${userName}`,
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
            : `✨ **Global AI disabled** for ${userName}`,
        }
      },
    },
  ],
})
