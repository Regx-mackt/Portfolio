"use client"

import { useState } from "react"
import { Window } from "./components/window"
import { Dock } from "./components/dock"
import { MenuBar } from "./components/menu-bar"
import { Folder, MessageSquare, Settings, User, Terminal, Command } from "lucide-react"
import { TerminalWindow } from "./components/terminal-window"
import { ContactWindow } from "./components/contact-window"
import { Toaster } from "./components/toaster"

interface WindowState {
  id: string
  isMaximized: boolean
}

export default function Page() {
  const [activeWindows, setActiveWindows] = useState<string[]>(["welcome"])
  const [windowStates, setWindowStates] = useState<WindowState[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Welcome to Portfolio OS v1.0.0",
    'Type "help" for available commands',
    "",
  ])
  const [isOpen, setIsOpen] = useState(false)

  const handleTerminalCommand = (command: string) => {
    const newLines = [...terminalLines]
    newLines.push(`$ ${command}`)

    switch (command.toLowerCase()) {
      case "help":
        newLines.push(
          "Available commands:",
          "  help     - Show this help message",
          "  clear    - Clear the terminal",
          "  about    - About Thomas",
          "  contact  - Contact information",
          "  skills   - Technical skills",
          "  projects - View projects",
          "  welcome  - Show welcome window",
          "",
        )
        break
      case "clear":
        return setTerminalLines(['Type "help" for available commands', ""])
      case "about":
        newLines.push(
          "Thomas Noulelis",
          "AI & Product Management Innovator | Data-Driven Leader",
          "M.S. in Digital Technology & Product Management from HETIC (Grande École Program)",
          "",
        )
        break
      case "contact":
        newLines.push(
          "Email: Thomas.Noulelis@gmail.com",
          "Phone: +33 6 18 48 51 68",
          "LinkedIn: /in/thomas-noulelis",
          "Location: Nice, France",
          "",
        )
        break
      case "skills":
        newLines.push(
          "Technical Skills:",
          "- Product Management & Roadmap",
          "- AI Innovation",
          "- Stakeholder Management",
          "- UX Design (Figma)",
          "- Data Analytics (Looker)",
          "- Agile/Scrum",
          "",
          "Languages:",
          "- French (Native)",
          "- English (Native)",
          "",
        )
        break
      case "projects":
        newLines.push("Opening projects window...", "")
        setActiveWindows((prev) => [...prev, "projects"])
        break
      case "welcome":
        newLines.push("Opening welcome window...", "")
        setTerminalLines(newLines)
        toggleWindow("welcome")
        return
      default:
        newLines.push(`Type "help" to see available commands`, "")
    }
    setTerminalLines(newLines)
  }

  const toggleWindow = (id: string) => {
    setActiveWindows((prev) => {
      if (id === "welcome") {
        if (prev.includes("welcome")) {
          return ["about"]
        }
        return ["welcome"]
      }

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

  return (
    <div className={`min-h-screen w-full overflow-hidden ${darkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 bg-[#E3E3E3] dark:bg-[#1E1E1E]">
        <div className="absolute inset-0 bg-grid-slate-200/30 dark:bg-grid-slate-700/20" />
      </div>

      <MenuBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div
        className={`relative w-full h-[calc(100vh-2.5rem)] pt-12 transform transition-all duration-700 ease-in-out`}
        style={{
          marginRight: isOpen ? "25%" : "0",
          width: isOpen ? "75%" : "100%",
        }}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 auto-rows-min ${
            activeWindows.length > 3 ? "grid-rows-2" : "grid-rows-1"
          }`}
        >
          {activeWindows.includes("welcome") && (
            <div className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-50">
              <Window
                id="welcome"
                title="Welcome to Thomas's Portfolio"
                icon={<Command size={16} />}
                onClose={() => toggleWindow("welcome")}
                totalWindows={activeWindows.length}
                isWelcome={true}
              >
                <div className="p-4 sm:p-8 max-w-lg">
                  <h1 className="text-xl sm:text-2xl font-bold mb-4">👋 Welcome to my Interactive Portfolio</h1>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      I'm Thomas, an AI & Product Management leader passionate about building impactful products. My
                      portfolio features an AI assistant to help you explore my experience in transforming businesses
                      through AI innovation.
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Available Sections:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>About - Learn about my background and expertise</li>
                        <li>Projects - View my key achievements and experiences</li>
                        <li>Skills - Explore my technical skills and languages</li>
                        <li>Contact - Get in touch with me</li>
                      </ul>
                    </div>
                    <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground">💡 Quick Start:</p>
                      <ul className="mt-2 space-y-1">
                        <li>
                          Click the <span className="font-medium text-foreground">Bot icon</span> to chat with my AI
                          assistant
                        </li>
                        <li>Try asking: "What was your role at TED AI?"</li>
                        <li>Or: "Tell me about your experience with AI products"</li>
                      </ul>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Click anywhere to dismiss this window and start exploring!
                    </p>
                  </div>
                </div>
              </Window>
            </div>
          )}

          {activeWindows.includes("about") && (
            <div className={`col-span-1 ${activeWindows.length > 3 ? "row-span-1" : "row-span-full"}`}>
              <Window
                id="about"
                title="About Me"
                icon={<User size={16} />}
                onClose={() => toggleWindow("about")}
                onMaximize={(isMaximized) => handleMaximize("about", isMaximized)}
                isMaximized={getWindowState("about")}
                totalWindows={activeWindows.length}
              >
                <div className="p-6 max-w-2xl">
                  <div className="flex items-start gap-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1665646377767-4HxCOwBvoKij7KU6CCvw5OjqnnyfV1.jpeg"
                      alt="Thomas Noulelis"
                      className="rounded-full w-24 h-24 border-4 border-white shadow-lg object-cover"
                    />
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Thomas Noulelis</h1>
                      <h2 className="text-lg text-muted-foreground mb-4">
                        AI & Digital Transformation PM | Technical Lead at TED AI
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        Driven and results-focused Product Manager with 7 years of experience in AI and digital
                        innovation. I excel at bringing cross-functional teams together—designers, engineers, and
                        marketers—to build products that not only achieve business growth but make a genuine impact.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Fuelled by clear goals, smart data insights, and a passion for collaboration, I'm always eager
                        to take on the next challenge, pushing boundaries while keeping things fun and rewarding.
                      </p>
                    </div>
                  </div>
                </div>
              </Window>
            </div>
          )}

          {activeWindows.includes("projects") && (
            <div className={`col-span-1 ${activeWindows.length > 3 ? "row-span-1" : "row-span-full"}`}>
              <Window
                id="projects"
                title="Projects & Experience"
                icon={<Folder size={16} />}
                onClose={() => toggleWindow("projects")}
                onMaximize={(isMaximized) => handleMaximize("projects", isMaximized)}
                isMaximized={getWindowState("projects")}
                totalWindows={activeWindows.length}
              >
                <div className="p-6 space-y-6 max-w-3xl">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Technical Lead at TED AI</h3>
                        <p className="text-sm text-muted-foreground">San Francisco Bay Area</p>
                      </div>
                      <span className="text-sm text-muted-foreground">05/2023 - Present</span>
                    </div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>
                        Team Coordination: Leading a team of 100+ volunteers for the world's first TED Conference
                        dedicated entirely to AI
                      </li>
                      <li>
                        Digital Experience: Designed and currently maintain the conference website to support seamless
                        collaboration and communication
                      </li>
                      <li>
                        Agile Practices: Participate in daily stand-ups and weekly demo days to synchronize efforts
                        across multiple teams
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Head of Product at Snowcrash</h3>
                        <p className="text-sm text-muted-foreground">Los Angeles, United States</p>
                      </div>
                      <span className="text-sm text-muted-foreground">05/2023 - 12/2023</span>
                    </div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>
                        Product Strategy: Led the development of innovative AI models to transform music production by
                        merging AI capabilities with traditional techniques
                      </li>
                      <li>
                        Market Research & Roadmap: Conducted extensive market research to identify opportunities and
                        validate the product roadmap, driving strategic pivots
                      </li>
                      <li>
                        Team Leadership: Lead cross-functional teams— engineering, design, and marketing—to deliver
                        high-impact features
                      </li>
                      <li>
                        Key Achievement: Pivoted company focus from NFTs to conversational and generative AI within
                        three months, establishing a new strategic direction
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Senior Product Manager at Sharecare</h3>
                        <p className="text-sm text-muted-foreground">San Francisco Bay Area</p>
                      </div>
                      <span className="text-sm text-muted-foreground">10/2019 - 04/2023</span>
                    </div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>
                        Spearheaded the development of Smart Omix—a comprehensive digital solution for healthcare
                        organizations that streamlines patient recruitment and clinical trial management through rapid,
                        scalable data collection
                      </li>
                      <li>
                        Developed and managed comprehensive product specifications, user stories, and backlogs for both
                        web and mobile app initiatives, ensuring the platform was built to meet strategic goals
                      </li>
                      <li>
                        Collaborated with a team of designers and engineering leads to translate the product vision into
                        a scalable solution
                      </li>
                      <li>
                        Utilized Jira for project management, Figma for design collaboration, and Metabase/Looker for
                        data analytics; employed Scrum methodologies to drive efficient product development cycles
                      </li>
                      <li>
                        Contributed to improving patient recruitment by 60%, reducing dropout rates by 20–30%, and
                        accelerating enrollment speeds by 30–40%, consistently achieving project milestones
                      </li>
                      <li>
                        Initiated exploratory work on leveraging large language models (LLMs) for drafting and editing
                        clinical protocols, laying the groundwork for future AI enhancements
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Head of Product at monmentor.fr</h3>
                        <p className="text-sm text-muted-foreground">Paris, France</p>
                      </div>
                      <span className="text-sm text-muted-foreground">06/2017 - 05/2019</span>
                    </div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>
                        Customer-Centric Strategy: Defined and analyzed customer needs to drive the development of a
                        leading mentoring platform for talents, managers, and executives
                      </li>
                      <li>Process Innovation: Served as the liaison between the CEO, technical teams, and clients</li>
                    </ul>
                  </div>

                  <div className="space-y-4 border-t pt-4 mt-8">
                    <h3 className="font-medium">Internships</h3>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Front-End Developer at ProdUP Consulting</h4>
                          <p className="text-sm text-muted-foreground">Paris, France</p>
                        </div>
                        <span className="text-sm text-muted-foreground">06/2016 - 08/2016</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Information System Intern at Invent Your Future Enterprises</h4>
                          <p className="text-sm text-muted-foreground">San Francisco Bay Area</p>
                        </div>
                        <span className="text-sm text-muted-foreground">09/2014 - 06/2015</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Sales Internship at OpenTrust</h4>
                          <p className="text-sm text-muted-foreground">Paris, France</p>
                        </div>
                        <span className="text-sm text-muted-foreground">06/2014 - 08/2014</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Sales Internship at Tata Consultancy Services</h4>
                          <p className="text-sm text-muted-foreground">Paris, France</p>
                        </div>
                        <span className="text-sm text-muted-foreground">06/2013 - 09/2013</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">Education</h3>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">HETIC</h4>
                          <p className="text-sm text-muted-foreground">
                            Web development, Web design, Project management, Product management
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">01/2015 - 01/2018</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">College of San Mateo</h4>
                          <p className="text-sm text-muted-foreground">Computer Science, Calculus and Accounting</p>
                        </div>
                        <span className="text-sm text-muted-foreground">01/2014 - 01/2015</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Paris School of Business</h4>
                          <p className="text-sm text-muted-foreground">Economy</p>
                        </div>
                        <span className="text-sm text-muted-foreground">01/2012 - 01/2014</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Window>
            </div>
          )}

          {activeWindows.includes("skills") && (
            <div className={`col-span-1 ${activeWindows.length > 3 ? "row-span-1" : "row-span-full"}`}>
              <Window
                id="skills"
                title="Skills & Expertise"
                icon={<Settings size={16} />}
                onClose={() => toggleWindow("skills")}
                onMaximize={(isMaximized) => handleMaximize("skills", isMaximized)}
                isMaximized={getWindowState("skills")}
                totalWindows={activeWindows.length}
              >
                <div className="p-6 max-w-2xl">
                  <div className="grid gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Technical Skills</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Product Management</span>
                              <span className="text-muted-foreground">95%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div className="h-2 w-[95%] bg-blue-500 rounded" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>AI & Digital Innovation</span>
                              <span className="text-muted-foreground">90%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div className="h-2 w-[90%] bg-blue-500 rounded" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>UX Design & Figma</span>
                              <span className="text-muted-foreground">85%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div className="h-2 w-[85%] bg-blue-500 rounded" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Data Analytics</span>
                              <span className="text-muted-foreground">88%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div className="h-2 w-[88%] bg-blue-500 rounded" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Team Leadership</span>
                              <span className="text-muted-foreground">92%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div className="h-2 w-[92%] bg-blue-500 rounded" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Project Management</span>
                              <span className="text-muted-foreground">90%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div className="h-2 w-[90%] bg-blue-500 rounded" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Tools & Software</h3>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="p-2 bg-muted/50 rounded">Figma</div>
                        <div className="p-2 bg-muted/50 rounded">Jira</div>
                        <div className="p-2 bg-muted/50 rounded">Metabase</div>
                        <div className="p-2 bg-muted/50 rounded">Looker</div>
                        <div className="p-2 bg-muted/50 rounded">AI/ML Tools</div>
                        <div className="p-2 bg-muted/50 rounded">LLMs</div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Languages</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span>French</span>
                          <span className="text-muted-foreground">(Native)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>English</span>
                          <span className="text-muted-foreground">(Native)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Window>
            </div>
          )}

          {activeWindows.includes("contact") && (
            <div className={`col-span-1 ${activeWindows.length > 3 ? "row-span-1" : "row-span-full"}`}>
              <ContactWindow
                onClose={() => toggleWindow("contact")}
                onMaximize={(isMaximized) => handleMaximize("contact", isMaximized)}
                isMaximized={getWindowState("contact")}
                totalWindows={activeWindows.length}
              />
            </div>
          )}

          {activeWindows.includes("terminal") && (
            <TerminalWindow
              key="terminal"
              onClose={() => toggleWindow("terminal")}
              onMaximize={(isMaximized) => handleMaximize("terminal", isMaximized)}
              isMaximized={getWindowState("terminal")}
              totalWindows={activeWindows.length}
              terminalLines={terminalLines}
              onCommand={handleTerminalCommand}
            />
          )}
        </div>
      </div>
      <Toaster />
      <Dock
        items={[
          {
            id: "about",
            icon: <User size={24} />,
            label: "About Me",
            description: "Learn about my background and expertise",
          },
          {
            id: "projects",
            icon: <Folder size={24} />,
            label: "Projects",
            description: "View my experience and achievements",
          },
          {
            id: "skills",
            icon: <Settings size={24} />,
            label: "Skills",
            description: "Explore my technical skills and languages",
          },
          {
            id: "contact",
            icon: <MessageSquare size={24} />,
            label: "Contact",
            description: "Get in touch with me",
          },
          {
            id: "terminal",
            icon: <Terminal size={24} />,
            label: "Terminal",
            description: "Try commands like 'help', 'about', 'skills'",
          },
        ]}
        activeWindows={activeWindows}
        onItemClick={toggleWindow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

