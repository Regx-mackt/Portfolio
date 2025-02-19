"use client"

import {
  Coffee,
  Pizza,
  Gamepad2,
  Laptop2,
  Brain,
  Smile,
  Compass,
  Glasses,
  Maximize2,
  Minimize2,
  Layout,
  LifeBuoy,
  Lightbulb,
  HelpCircle,
  Laugh,
  Bug,
} from "lucide-react"

interface MenuContentProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  onMenuCommand?: (command: string) => void
  className?: string
}

export function MenuContent({ darkMode, setDarkMode, onMenuCommand, className = "" }: MenuContentProps) {
  const menuItems = [
    {
      title: "File",
      items: [
        {
          icon: <Coffee className="h-4 w-4 text-foreground" />,
          label: "New Coffee Break",
          command: "I need a coffee break! Where's the nearest coffee shop?",
        },
        {
          icon: <Pizza className="h-4 w-4 text-foreground" />,
          label: "Order Pizza",
          command: "How can I get pizza near me?",
        },
        {
          icon: <Gamepad2 className="h-4 w-4 text-foreground" />,
          label: "Quick Game Break",
          command: "I need a quick game break! Any recommendations?",
        },
      ],
    },
    {
      title: "Edit",
      items: [
        {
          icon: <Brain className="h-4 w-4 text-foreground" />,
          label: "Edit Brain Capacity",
          command: "How can I improve my brain capacity and focus?",
        },
        {
          icon: <Coffee className="h-4 w-4 text-foreground" />,
          label: "Increase Caffeine",
          command: "I need more caffeine! Best coffee options?",
        },
        {
          icon: <Smile className="h-4 w-4 text-foreground" />,
          label: "Add More Smiles",
          command: "Tell me something to make me smile!",
        },
      ],
    },
    {
      title: "View",
      items: [
        {
          icon: <Glasses className="h-4 w-4 text-foreground" />,
          label: "Toggle Smart Look",
          command: "How can I look smarter in meetings?",
        },
        {
          icon: <Laptop2 className="h-4 w-4 text-foreground" />,
          label: "Hide Distractions",
          command: "Tips for minimizing distractions while working?",
        },
        {
          icon: <Compass className="h-4 w-4 text-foreground" />,
          label: "Find My Motivation",
          command: "Help me find my motivation!",
        },
      ],
    },
    {
      title: "Window",
      items: [
        {
          icon: <Maximize2 className="h-4 w-4 text-foreground" />,
          label: "Maximize Productivity",
          command: "Tips for maximizing productivity?",
        },
        {
          icon: <Minimize2 className="h-4 w-4 text-foreground" />,
          label: "Minimize Stress",
          command: "How can I minimize stress at work?",
        },
        {
          icon: <Layout className="h-4 w-4 text-foreground" />,
          label: "Organize Chaos",
          command: "Help me organize my chaos!",
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          icon: <LifeBuoy className="h-4 w-4 text-foreground" />,
          label: "Send SOS",
          command: "HELP! I need assistance!",
        },
        {
          icon: <Lightbulb className="h-4 w-4 text-foreground" />,
          label: "Generate Ideas",
          command: "I need some creative ideas!",
        },
        {
          icon: <HelpCircle className="h-4 w-4 text-foreground" />,
          label: "Why am I here?",
          command: "What is the meaning of life?",
        },
        {
          icon: <Laugh className="h-4 w-4 text-foreground" />,
          label: "Tell me a joke",
          command: "Tell me a joke!",
        },
        {
          icon: <Bug className="h-4 w-4 text-foreground" />,
          label: "Report a bug in the matrix",
          command: "I found a glitch in the matrix!",
        },
      ],
    },
  ]

  return (
    <div className={`${className}`}>
      {menuItems.map((section) => (
        <div key={section.title} className="relative group">
          <button className="px-3 py-1 text-sm text-[#000000] dark:text-[#FFFFFF] hover:bg-[#00000014] dark:hover:bg-[#FFFFFF14] rounded-lg">
            {section.title}
          </button>
          <div className="invisible group-hover:visible absolute top-full left-0 mt-1 w-56 rounded-lg border bg-[#FFFFFF] dark:bg-black/90 shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            {section.items.map((item, index) => (
              <div key={item.label}>
                <button
                  onClick={() => onMenuCommand?.(item.command)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-[#00000014] dark:hover:bg-white/10 text-[#000000] dark:text-[#FFFFFF]"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
                {index < section.items.length - 1 && section.items.length > 1 && (
                  <div className="h-px mx-3 my-1 bg-[#00000014] dark:bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

