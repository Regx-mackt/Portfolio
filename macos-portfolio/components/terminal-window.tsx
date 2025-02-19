"use client"

import type React from "react"
import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react"
import { Bot, Loader2 } from "lucide-react"
import { Window } from "./window"
import { useChat } from "ai/react"
import type { Message } from "ai"

interface TerminalWindowProps {
  onClose: () => void
  onMaximize: (isMaximized: boolean) => void
  isMaximized: boolean
  totalWindows: number
  isPersistent?: boolean
  isMobile?: boolean
  title?: string
}

const TerminalWindow = forwardRef(
  ({ onClose, onMaximize, isMaximized, totalWindows, isPersistent, isMobile, title }: TerminalWindowProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [shouldFocus, setShouldFocus] = useState(true)
    const [keyboardOpen, setKeyboardOpen] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        const scrollContainer = scrollContainerRef.current
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }

    // Handle keyboard visibility
    useEffect(() => {
      if (!isMobile) return

      const handleViewportChange = () => {
        if (window.visualViewport) {
          const heightDiff = window.innerHeight - window.visualViewport.height
          setKeyboardHeight(heightDiff)
          setKeyboardOpen(heightDiff > 100) // Threshold to determine if keyboard is open
        }
      }

      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", handleViewportChange)
        window.visualViewport.addEventListener("scroll", handleViewportChange)

        return () => {
          window.visualViewport.removeEventListener("resize", handleViewportChange)
          window.visualViewport.removeEventListener("scroll", handleViewportChange)
        }
      }
    }, [isMobile])

    // Handle input focus/blur
    useEffect(() => {
      if (!isMobile || !inputRef.current) return

      const handleFocus = () => {
        document.body.classList.add("keyboard-open")
        setTimeout(scrollToBottom, 100)
      }

      const handleBlur = () => {
        document.body.classList.remove("keyboard-open")
      }

      inputRef.current.addEventListener("focus", handleFocus)
      inputRef.current.addEventListener("blur", handleBlur)

      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener("focus", handleFocus)
          inputRef.current.removeEventListener("blur", handleBlur)
        }
      }
    }, [isMobile]) // Removed inputRef from dependencies

    const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, setMessages } = useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "👋 Hello! I'm an AI assistant. I can help you learn more about Thomas's background, experience, skills and projects. What would you like to know?",
        } as Message,
      ],
      onFinish: () => {
        setShouldFocus(true)
        setTimeout(scrollToBottom, 100)
      },
      onResponse: () => {
        scrollToBottom()
      },
      onError: (error) => {
        console.error("Chat error occurred:", error)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ])
        setShouldFocus(true)
      },
    })

    // Prevent background scroll on mobile
    useEffect(() => {
      if (isMobile) {
        document.body.style.overflow = "hidden"
        return () => {
          document.body.style.overflow = ""
        }
      }
    }, [isMobile])

    // Focus management
    useEffect(() => {
      if (shouldFocus && inputRef.current) {
        const focusInput = () => {
          inputRef.current?.focus()
          setShouldFocus(false)
        }

        focusInput()
        setTimeout(focusInput, 0)
        setTimeout(focusInput, 100)
      }
    }, [shouldFocus]) // Removed inputRef from dependencies

    // Auto-scroll on new messages
    useEffect(() => {
      scrollToBottom()
    }, [messages]) // Removed scrollToBottom from dependencies

    // Expose handleCommand to parent
    useImperativeHandle(ref, () => ({
      handleCommand: (command: string) => {
        if (inputRef.current) {
          inputRef.current.value = command
          handleSubmit({ preventDefault: () => {} } as any)
        }
      },
    }))

    const handleSubmitWithFocus = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await handleSubmit(e)
      setShouldFocus(true)
      scrollToBottom()
      setTimeout(scrollToBottom, 100)
    }

    const messageContent = (
      <>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${message.role === "user" ? "text-blue-400 dark:text-blue-300" : "text-foreground"}`}
            style={{ userSelect: "text", WebkitUserSelect: "text" }}
          >
            {message.role === "user" ? "$ " : "> "}
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="flex flex-col gap-2 text-red-500">
            <p>Error: {error.message || "Failed to communicate with the AI"}</p>
            <button onClick={() => reload()} className="text-blue-500 hover:underline text-left">
              Click to retry
            </button>
          </div>
        )}
      </>
    )

    const inputForm = (
      <form
        onSubmit={handleSubmitWithFocus}
        className="flex items-center p-2 sm:p-4 border-t border-border bg-background"
      >
        <span className="mr-2 text-foreground">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
          placeholder="Type a message..."
          disabled={isLoading}
          autoFocus
          onBlur={(e) => {
            if (isLoading && !e.relatedTarget?.matches("input, button, a")) {
              inputRef.current?.focus()
            }
          }}
          onClick={(e) => {
            e.currentTarget.focus()
          }}
        />
      </form>
    )

    if (isMobile) {
      return (
        <div
          ref={containerRef}
          className={`fixed inset-0 z-50 flex flex-col bg-background transition-all duration-200 ${
            keyboardOpen ? "keyboard-open" : ""
          }`}
          style={{
            height: keyboardOpen ? `${window.innerHeight - keyboardHeight}px` : "100%",
          }}
        >
          {/* Fixed Header - Changed to fixed positioning */}
          <div className="w-full fixed top-0 left-0 right-0 z-10 bg-background">
            <Window
              id="terminal"
              title={title || "Ask my Agent"}
              icon={<Bot size={16} className="text-foreground" />}
              onClose={onClose}
              totalWindows={totalWindows}
              className="rounded-none border-x-0 border-t-0"
              isMobile={true}
            >
              <></>
            </Window>
          </div>

          {/* Scrollable Content - Added padding top to account for fixed header */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pt-10"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            <div className="p-2 sm:p-4 font-mono text-xs sm:text-sm space-y-4">{messageContent}</div>
          </div>

          {/* Fixed Input */}
          <div className="w-full bg-background">
            {inputForm}
            {/* Bottom Space for Home Indicator */}
            <div className={`${keyboardOpen ? "h-0" : "h-5"} transition-all duration-200`} />
          </div>
        </div>
      )
    }

    return (
      <Window
        id="terminal"
        title={title || "Ask my Agent"}
        icon={<Bot size={16} className="text-foreground" />}
        onClose={onClose}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
        totalWindows={totalWindows}
        autoFocus
        className="h-full w-full"
        isPersistent={isPersistent}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-2 sm:p-4 font-mono text-xs sm:text-sm space-y-4"
          >
            {messageContent}
          </div>
          {inputForm}
        </div>
      </Window>
    )
  },
)

TerminalWindow.displayName = "TerminalWindow"

export default TerminalWindow

