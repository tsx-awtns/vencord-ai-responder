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

"use client"

import { React, showToast, Toasts } from "@webpack/common"
import { ChatBarButton } from "@api/ChatButtons"
import { settings } from "../settings"
import { getUserDisplayName } from "../utils/helpers"
import { toggleChannelAI } from "../utils/channelManager"
import { enabledChannels, processingChannels } from "../utils/state"
import { EnhancedAIIcon } from "./EnhancedAIIcon"

export const AIResponderButton = ({ channel }) => {
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
      return `✨ Extra: Global AI active (${keyInfo})`
    }

    if (isActive) {
      return `✅ ACTIVE for ${userName} (${keyInfo})`
    }

    return `❌ INACTIVE for ${userName} (${keyInfo})`
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
