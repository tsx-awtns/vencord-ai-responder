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

"use client"

import { React } from "@webpack/common"

interface AwayReasonModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  userName: string
}

export const AwayReasonModal = ({ isOpen, onClose, onConfirm, userName }: AwayReasonModalProps) => {
  const [reason, setReason] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setReason("")
      setIsSubmitting(false)
      document.body.style.overflow = "hidden"

      const style = document.createElement("style")
      style.id = "ai-responder-modal-overlay"
      style.textContent = `
        .ai-responder-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          backdrop-filter: blur(8px) !important;
          z-index: 2147483647 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .ai-responder-modal-content {
          position: relative !important;
          z-index: 2147483647 !important;
          background-color: var(--background-primary) !important;
          border-radius: 12px !important;
          padding: 24px !important;
          min-width: 400px !important;
          max-width: 500px !important;
          border: 1px solid var(--background-modifier-accent) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6) !important;
          animation: modalSlideIn 0.2s ease-out !important;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.body.style.overflow = ""
        const existingStyle = document.getElementById("ai-responder-modal-overlay")
        if (existingStyle) {
          existingStyle.remove()
        }
      }
    }
  }, [isOpen])

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await onConfirm(reason.trim())
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleConfirm()
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="ai-responder-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="ai-responder-modal-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00ff88, #00b894)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🤖
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                color: "var(--text-normal)",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              AI Responder for {userName}
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "14px",
              }}
            >
              Why are you away? (Optional)
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g. 'having dinner', 'in a meeting', 'sleeping'..."
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid var(--background-modifier-accent)",
              backgroundColor: "var(--input-background)",
              color: "var(--text-normal)",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--brand-experiment)"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--background-modifier-accent)"
            }}
            autoFocus
          />
        </div>

        <div
          style={{
            padding: "12px",
            backgroundColor: "var(--background-secondary)",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid var(--background-modifier-accent)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "var(--text-muted)",
              lineHeight: "1.4",
            }}
          >
            💡 <strong>Tip:</strong> If you provide a reason, the AI will mention it in its responses. Without a reason,
            it will simply say you're away.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "1px solid var(--background-modifier-accent)",
              backgroundColor: "var(--background-secondary)",
              color: "var(--text-normal)",
              fontSize: "14px",
              fontWeight: "500",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: isSubmitting ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "var(--background-modifier-hover)"
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--background-secondary)"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              background: "linear-gradient(135deg, #00ff88, #00b894)",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: isSubmitting ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = "translateY(-1px)"
                e.target.style.boxShadow = "0 4px 12px rgba(0, 255, 136, 0.3)"
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow = "none"
            }}
          >
            {isSubmitting ? (
              <>
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Activating...
              </>
            ) : (
              <>✅ Activate AI Responder</>
            )}
          </button>
        </div>

        <style jsx global>{`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
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
    </div>
  )
}
