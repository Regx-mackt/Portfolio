"use client"

import { Phone, Mail, MapPin, Linkedin } from "lucide-react"
import { Window } from "./window"

interface ContactWindowProps {
  onClose: () => void
  onMaximize: (isMaximized: boolean) => void
  isMaximized: boolean
  totalWindows: number
}

export function ContactWindow({ onClose, onMaximize, isMaximized, totalWindows }: ContactWindowProps) {
  return (
    <Window
      id="contact"
      title="Contact"
      icon={<Phone size={16} className="text-foreground" />}
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      totalWindows={totalWindows}
    >
      <div className="p-4 sm:p-6 dark:bg-white/5">
        <div className="max-w-md mx-auto space-y-4 selectable">
          <p className="text-xs sm:text-sm text-muted-foreground">
            I'm always open to discussing new opportunities and innovative projects. Feel free to reach out!
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
              <p className="text-xs sm:text-sm text-foreground">Thomas.Noulelis@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
              <p className="text-xs sm:text-sm text-foreground">+33 6 18 48 51 68</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
              <p className="text-xs sm:text-sm text-foreground">Nice, France</p>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
              <a
                href="https://www.linkedin.com/in/thomas-noulelis/"
                className="text-xs sm:text-sm text-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/thomas-noulelis
              </a>
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

