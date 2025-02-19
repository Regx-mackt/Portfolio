"use client"

import type React from "react"

import { X, Minus, Maximize2 } from "lucide-react"
import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

interface WindowProps {
  id: string
  title: string
  icon?: ReactNode
  children: ReactNode
  onClose: () => void
  onMaximize?: (isMaximized: boolean) => void
  isMaximized?: boolean
  className?: string
  totalWindows: number
  isWelcome?: boolean
  autoFocus?: boolean
  isPersistent?: boolean
  headerOnly?: boolean
  style?: React.CSSProperties
  isMobile?: boolean
}

export function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMaximize,
  isMaximized,
  className = "",
  totalWindows,
  isWelcome = false,
  autoFocus = false,
  isPersistent = false,
  headerOnly = false,
  style,
  isMobile = false,
}: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    if (isPersistent && !isMobile) return
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  if (isMinimized) {
    return null
  }

  const header = (
    <div className="h-10 min-h-[40px] w-full bg-white/80 dark:bg-black/80 backdrop-blur-md flex items-center px-4 gap-2 sticky top-0 z-10 shrink-0 border-b border-[#00000014] dark:border-white/10">
      <div className="flex items-center gap-2">
        <button
          onClick={handleClose}
          className={`
            group relative flex items-center justify-center w-3 h-3 rounded-full 
            ${isPersistent && !isMobile ? "bg-[#FF5F57]/50 cursor-not-allowed" : "bg-[#FF5F57] hover:bg-[#FF5F57]/90"} 
            transition-colors
          `}
        >
          <X
            size={6}
            className="absolute opacity-0 group-hover:opacity-95 transition-opacity stroke-[3] text-black dark:text-white"
          />
        </button>
        {!isWelcome && (
          <>
            <button
              onClick={isMobile ? handleClose : () => !isPersistent && setIsMinimized(true)}
              className="group relative flex items-center justify-center w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/90 transition-colors"
            >
              <Minus
                size={6}
                className="absolute opacity-0 group-hover:opacity-95 transition-opacity stroke-[3] text-black dark:text-white"
              />
            </button>
            <button
              onClick={isMobile ? handleClose : () => onMaximize?.(!isMaximized)}
              className="group relative flex items-center justify-center w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/90 transition-colors"
            >
              <Maximize2
                size={6}
                className="absolute opacity-0 group-hover:opacity-95 transition-opacity stroke-[3] text-black dark:text-white"
              />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 ml-4">
        {icon}
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
    </div>
  )

  if (headerOnly) {
    return (
      <div
        className={cn(
          "bg-white/80 dark:bg-black/80 backdrop-blur-md border border-[#00000014] dark:border-white/10",
          className,
        )}
        style={style}
      >
        {header}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.12)] dark:shadow-[0_0_10px_rgba(255,255,255,0.12)] border border-[#00000014] dark:border-white/10",
        "overflow-hidden w-full h-full",
        isMaximized ? "fixed top-[52px] left-4 right-4 bottom-20 m-0 rounded-lg z-50" : "",
        "transition-opacity duration-200",
        isClosing ? "opacity-0" : "opacity-100",
        className,
      )}
      style={style}
    >
      {header}
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}

