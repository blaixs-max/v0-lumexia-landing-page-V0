"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GameModal({ isOpen, onClose }: GameModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      const requestFullscreen = async () => {
        try {
          const docEl = document.documentElement
          if (docEl.requestFullscreen) {
            await docEl.requestFullscreen()
          } else if ((docEl as any).webkitRequestFullscreen) {
            await (docEl as any).webkitRequestFullscreen()
          } else if ((docEl as any).msRequestFullscreen) {
            await (docEl as any).msRequestFullscreen()
          }
        } catch (error) {
          // Fullscreen request may fail if not triggered by user gesture
          console.log("Fullscreen request was denied or not supported")
        }
      }
      requestFullscreen()
    } else {
      // Exit fullscreen when modal closes
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white border border-gray-700 hover:border-[#FFD700] transition-all group"
        aria-label="Close Game"
      >
        <X className="w-6 h-6 group-hover:text-[#FFD700]" />
      </button>

      {/* Game Iframe */}
      <iframe
        ref={iframeRef}
        src="https://newracing.netlify.app"
        className="w-full h-full border-0"
        title="Lumexia Racing Game"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; ethereum; web3"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-top-navigation"
      />
    </div>
  )
}
