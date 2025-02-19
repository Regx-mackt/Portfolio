"use client"

import {
  LayoutListIcon as LayoutPlaneLine,
  Wrench,
  Users,
  Palette,
  ClipboardList,
  Search,
  Bot,
  Sparkles,
  Activity,
  Stethoscope,
  SlidersHorizontal,
  FileSpreadsheet,
  Figma,
  Grid2X2,
  Globe,
  Brain,
} from "lucide-react"
import { Window } from "./window"

interface SkillsWindowProps {
  onClose: () => void
  onMaximize: (isMaximized: boolean) => void
  isMaximized: boolean
  totalWindows: number
}

export function SkillsWindow({ onClose, onMaximize, isMaximized, totalWindows }: SkillsWindowProps) {
  return (
    <Window
      id="skills"
      title="Skills & Expertise"
      icon={<Wrench size={16} className="text-foreground" />}
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      totalWindows={totalWindows}
    >
      <div className="p-4 sm:p-6">
        <div className="grid gap-2 sm:gap-3 max-w-2xl mx-auto selectable">
          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <h3 className="font-medium mb-4 text-sm sm:text-base text-foreground">Skills & Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <LayoutPlaneLine className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Product Strategy & Roadmap</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">AI & Digital Innovation</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Team Leadership</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">UI/UX Design</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Project Management</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Market Research</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Conversational AI</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Generative AI</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Healthcare AI</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">UX Optimization</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                  <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Agile/Scrum</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <h3 className="font-medium mb-4 text-sm sm:text-base text-foreground">Tools & Software</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                <span className="text-xs sm:text-sm text-foreground">Jira</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                <Figma className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                <span className="text-xs sm:text-sm text-foreground">Figma</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                <Grid2X2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                <span className="text-xs sm:text-sm text-foreground">Miro</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 dark:hover:bg-white/10 transition-colors">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-foreground" />
                <span className="text-xs sm:text-sm text-foreground">Webflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

