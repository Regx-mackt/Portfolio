"use client"

import { useState, useEffect, useRef } from "react"
import { Window } from "./window"
import { Dock } from "./dock"
import { Folder, Phone, User, Bot, Command, Wrench } from "lucide-react"
import TerminalWindow from "./terminal-window"
import { AboutWindow } from "./about-window"
import { ProjectsWindow } from "./projects-window"
import { SkillsWindow } from "./skills-window"
import { ContactWindow } from "./contact-window"
import { MenuBar } from "./menu-bar"

interface WindowState {
  id: string
  isMaximized: boolean
}

export default function Page() {
  const [activeWindows, setActiveWindows] = useState<string[]>(["welcome", "about", "projects", "skills", "contact"])
  const [windowStates, setWindowStates] = useState<WindowState[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isXl, setIsXl] = useState(false)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<{ handleCommand: (command: string) => void }>()

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      if (!isMobileView) {
        setActiveWindows((prev) => (prev.includes("terminal") ? prev : [...prev, "terminal"]))
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const checkXl = () => {
      setIsXl(window.innerWidth >= 1280)
    }
    checkXl()
    window.addEventListener("resize", checkXl)
    return () => window.removeEventListener("resize", checkXl)
  }, [])

  // Handle click outside welcome window
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        activeWindows.includes("welcome") &&
        welcomeRef.current &&
        !welcomeRef.current.contains(event.target as Node)
      ) {
        toggleWindow("welcome")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeWindows])

  const toggleWindow = (id: string) => {
    setActiveWindows((prev) => {
      // If it's the terminal
      if (id === "terminal") {
        if (prev.includes(id)) {
          // Only allow closing on mobile devices
          if (isMobile) {
            return prev.filter((w) => w !== id)
          }
          // On desktop, keep it open
          return prev
        }
        return [...prev, id]
      }

      // For welcome window, just remove it
      if (id === "welcome") {
        return prev.filter((w) => w !== "welcome")
      }

      // Handle all other windows the same way on mobile and desktop
      let newWindows = prev.filter((w) => w !== "welcome")
      if (prev.includes(id)) {
        newWindows = newWindows.filter((w) => w !== id)
        // Reset window state when closing
        setWindowStates((prev) => prev.filter((state) => state.id !== id))
      } else {
        newWindows.push(id)
      }
      return newWindows
    })
  }

  const handleMaximize = (id: string, isMaximized: boolean) => {
    setWindowStates((prev) => {
      const existing = prev.find((state) => state.id === id)
      if (existing) {
        return prev.map((state) => (state.id === id ? { ...state, isMaximized } : state))
      }
      return [...prev, { id, isMaximized }]
    })
  }

  const getWindowState = (id: string) => {
    return windowStates.find((state) => state.id === id)?.isMaximized || false
  }

  useEffect(() => {
    if (isMobile && activeWindows.includes("terminal")) {
      // Try multiple scroll methods with a small delay
      setTimeout(() => {
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }, 10)
    }
  }, [activeWindows, isMobile])

  useEffect(() => {
    if (isMobile) {
      if (activeWindows.includes("terminal")) {
        document.body.classList.add("terminal-open")
      } else {
        document.body.classList.remove("terminal-open")
      }
    }
    return () => {
      document.body.classList.remove("terminal-open")
    }
  }, [activeWindows, isMobile])

  return (
    <div className={`h-screen w-screen overflow-hidden fixed inset-0 ${darkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 bg-[#E3E3E3] dark:bg-[#1E1E1E]">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25" />
      </div>

      <MenuBar darkMode={darkMode} setDarkMode={setDarkMode} />

      {activeWindows.includes("welcome") && (
        <>
          <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-50" />
          <div
            ref={welcomeRef}
            className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[60] w-[90vw] md:w-auto"
          >
            <Window
              id="welcome"
              title="Welcome to Thomas's Portfolio"
              icon={<Command size={16} className="text-foreground" />}
              onClose={() => toggleWindow("welcome")}
              totalWindows={activeWindows.length}
              isWelcome={true}
            >
              <div className="p-4 sm:p-8 max-w-lg">
                <h1 className="text-xl sm:text-2xl font-bold mb-4">👋 Welcome to my Portfolio</h1>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    This is an interactive portfolio designed to showcase my experience in AI and product management.
                    Here's how to navigate:
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Navigation:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Click the icons in the dock to explore different sections</li>
                      <li>Use the window controls to manage windows</li>
                      <li>Try the terminal for a command-line experience</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Available Sections:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>About - Learn about my background and expertise</li>
                      <li>Projects - View my key achievements and experiences</li>
                      <li>Skills - Explore my technical skills and languages</li>
                      <li>Contact - Get in touch with me</li>
                      <li>Terminal - Try commands like 'help', 'about', 'skills'</li>
                    </ul>
                  </div>
                  <p>Click any icon in the dock to begin exploring!</p>
                </div>
              </div>
            </Window>
          </div>
        </>
      )}

      <div className="absolute top-12 left-0 right-0 bottom-20 flex flex-col md:flex-row overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 pb-24 md:pb-4 overflow-y-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {activeWindows.includes("about") && (
              <div>
                <AboutWindow
                  onClose={() => toggleWindow("about")}
                  onMaximize={(isMaximized) => handleMaximize("about", isMaximized)}
                  isMaximized={getWindowState("about")}
                  totalWindows={activeWindows.length}
                />
              </div>
            )}

            {!isXl && activeWindows.includes("projects") && (
              <div>
                <ProjectsWindow
                  onClose={() => toggleWindow("projects")}
                  onMaximize={(isMaximized) => handleMaximize("projects", isMaximized)}
                  isMaximized={getWindowState("projects")}
                  totalWindows={activeWindows.length}
                />
              </div>
            )}

            {activeWindows.includes("skills") && (
              <div>
                <SkillsWindow
                  onClose={() => toggleWindow("skills")}
                  onMaximize={(isMaximized) => handleMaximize("skills", isMaximized)}
                  isMaximized={getWindowState("skills")}
                  totalWindows={activeWindows.length}
                />
              </div>
            )}

            {activeWindows.includes("contact") && (
              <div>
                <ContactWindow
                  onClose={() => toggleWindow("contact")}
                  onMaximize={(isMaximized) => handleMaximize("contact", isMaximized)}
                  isMaximized={getWindowState("contact")}
                  totalWindows={activeWindows.length}
                />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {isXl && activeWindows.includes("projects") && (
              <div>
                <ProjectsWindow
                  onClose={() => toggleWindow("projects")}
                  onMaximize={(isMaximized) => handleMaximize("projects", isMaximized)}
                  isMaximized={getWindowState("projects")}
                  totalWindows={activeWindows.length}
                />
              </div>
            )}
          </div>
        </div>

        {/* Terminal */}
        {!isMobile && activeWindows.includes("terminal") && (
          <div className="w-full md:w-[30%] h-[30vh] md:h-full p-4 border-t md:border-t-0 md:border-l border-[#00000014] dark:border-white/10">
            <TerminalWindow
              key="terminal"
              onClose={() => toggleWindow("terminal")}
              onMaximize={(isMaximized) => handleMaximize("terminal", isMaximized)}
              isMaximized={getWindowState("terminal")}
              totalWindows={activeWindows.length}
              isPersistent={true}
              isMobile={false}
              title="Ask my Agent"
            />
          </div>
        )}

        {/* Mobile Terminal */}
        {isMobile && activeWindows.includes("terminal") && (
          <TerminalWindow
            key="terminal"
            onClose={() => toggleWindow("terminal")}
            onMaximize={(isMaximized) => handleMaximize("terminal", isMaximized)}
            isMaximized={getWindowState("terminal")}
            totalWindows={activeWindows.length}
            isPersistent={false}
            isMobile={true}
            title="Ask my Agent"
          />
        )}
      </div>

      <Dock
        items={[
          {
            id: "about",
            icon: <User size={24} className="text-foreground" />,
            label: "About Me",
            description: "Learn about my background and expertise",
          },
          {
            id: "projects",
            icon: <Folder size={24} className="text-foreground" />,
            label: "Projects",
            description: "View my experience and achievements",
          },
          {
            id: "skills",
            icon: <Wrench size={24} className="text-foreground" />,
            label: "Skills",
            description: "Explore my technical skills and languages",
          },
          {
            id: "contact",
            icon: <Phone size={24} className="text-foreground" />,
            label: "Contact",
            description: "Get in touch with me",
          },
          {
            id: "terminal",
            icon: <Bot size={24} className="text-foreground" />,
            label: "Ask my Agent",
            description: "Try commands like 'help', 'about', 'skills'",
          },
        ]}
        activeWindows={activeWindows}
        onItemClick={toggleWindow}
        isMobile={isMobile}
      />
    </div>
  )
}

