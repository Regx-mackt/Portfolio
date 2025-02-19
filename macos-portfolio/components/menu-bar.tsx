"use client"

import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import { MenuContent } from "./menu-content"

interface MenuBarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  onMenuCommand?: (command: string) => void
  ensureTerminalOpen?: () => void
}

export function MenuBar({ darkMode, setDarkMode, onMenuCommand, ensureTerminalOpen }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleMenuCommand = (command: string) => {
    if (onMenuCommand) {
      ensureTerminalOpen?.()
      onMenuCommand(command)
    }
  }

  return (
    <div className="h-12 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-[#00000014] dark:border-white/10 fixed top-0 left-0 right-0 z-50 flex items-center px-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-[#000000] dark:text-[#FFFFFF]">Portfolio.app</span>
      </div>
      <nav className="hidden lg:block ml-6">
        <MenuContent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onMenuCommand={handleMenuCommand}
          className="flex items-center gap-2"
        />
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-[#00000014] dark:hover:bg-[#FFFFFF14] rounded-full"
        >
          {darkMode ? <Sun size={16} className="text-[#FFFFFF]" /> : <Moon size={16} className="text-[#000000]" />}
        </button>
        <div className="flex items-center gap-2 text-sm text-[#000000] dark:text-[#FFFFFF]">
          <span className="hidden md:inline">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="hidden md:inline">·</span>
          <span>
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

