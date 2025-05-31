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

import type { IconProps } from "../types"

export function EnhancedAIIcon({ isActive, isProcessing, isGlobalMode = false, size = 24 }: IconProps) {
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
