"use client"

import { User } from "lucide-react"
import { Window } from "./window"

interface AboutWindowProps {
  onClose: () => void
  onMaximize: (isMaximized: boolean) => void
  isMaximized: boolean
  totalWindows: number
}

export function AboutWindow({ onClose, onMaximize, isMaximized, totalWindows }: AboutWindowProps) {
  return (
    <Window
      id="about"
      title="About Me"
      icon={<User size={16} className="text-foreground" />}
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      totalWindows={totalWindows}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-2xl mx-auto selectable">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1665646377767-4HxCOwBvoKij7KU6CCvw5OjqnnyfV1.jpeg"
            alt="Thomas Noulelis"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-white/10 shadow-lg object-cover shrink-0"
          />
          <div className="flex-1 min-w-0 text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">Thomas Noulelis</h1>
            <h2 className="text-base sm:text-lg text-muted-foreground mb-4">
              AI & Digital Transformation Product Manager
            </h2>
            <div className="space-y-4 max-w-xl mx-auto xl:mx-0">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                I'm a Product Manager with 7+ years of experience bridging AI and business strategy to create
                meaningful, data-driven products. I enjoy guiding cross-functional teams to solve complex problems, from
                healthcare innovations to cutting-edge AI in music.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                My approach is rooted in thorough research, user-centric design, and clear communication—always aiming
                to deliver value that resonates with both end users and stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

