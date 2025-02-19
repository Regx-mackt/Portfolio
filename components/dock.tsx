"use client"

import type { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DockItem {
  id: string
  icon: ReactNode
  label: string
  description: string
}

interface DockProps {
  items: DockItem[]
  activeWindows: string[]
  onItemClick: (id: string) => void
  isMobile?: boolean
}

export function Dock({ items, activeWindows, onItemClick, isMobile }: DockProps) {
  // Don't render dock on mobile when terminal is open
  if (isMobile && activeWindows.includes("terminal")) {
    return null
  }

  return (
    <TooltipProvider delayDuration={100}>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-[#00000014] dark:border-white/10">
          <div className="flex items-center gap-1 sm:gap-2">
            {items.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onItemClick(item.id)}
                    className={`
                      relative p-1.5 sm:p-2 rounded-xl transition-all duration-200
                      hover:bg-white/50 dark:hover:bg-white/10
                      ${activeWindows.includes(item.id) ? "bg-white/30 dark:bg-white/20" : ""}
                    `}
                  >
                    <div className="text-[#000000] dark:text-[#FFFFFF]">{item.icon}</div>
                    <span className="sr-only">{item.label}</span>
                    {activeWindows.includes(item.id) && (
                      <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[#000000] dark:bg-[#FFFFFF] rounded-full -translate-x-1/2" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="font-medium">
                  <p>{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

