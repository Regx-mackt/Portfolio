"use client"

import { Folder } from "lucide-react"
import { Window } from "./window"

interface ProjectsWindowProps {
  onClose: () => void
  onMaximize: (isMaximized: boolean) => void
  isMaximized: boolean
  totalWindows: number
}

export function ProjectsWindow({ onClose, onMaximize, isMaximized, totalWindows }: ProjectsWindowProps) {
  return (
    <Window
      id="projects"
      title="Projects & Experience"
      icon={<Folder size={16} className="text-foreground" />}
      onClose={onClose}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      totalWindows={totalWindows}
    >
      <div className="p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-3 max-w-3xl mx-auto selectable">
          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm sm:text-base text-foreground">Technical Lead at TED AI</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">San Francisco Bay Area</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">May 2023 - Present</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Lead 100+ volunteers to launch the world's first AI-focused TED Conference, building a website that
                streamlined collaboration for 50+ speakers and 1,000+ attendees.
              </li>
              <li>
                Drive agile workflows with daily stand-ups and weekly demos, keeping cross-functional teams aligned.
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm sm:text-base text-foreground">Head of Product at Snowcrash</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Los Angeles, CA</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">May 2023 - Dec 2023</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Pivoted company from NFTs to generative AI, launching AI music tools that redefined music production
                workflows.
              </li>
              <li>
                Built and led engineering, design, and marketing teams to ship high-impact features on tight timelines.
              </li>
              <li>Conducted market research to validate a new roadmap, securing buy-in from stakeholders.</li>
            </ul>
          </div>

          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm sm:text-base text-foreground">
                  Senior Product Manager at Sharecare
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">San Francisco Bay Area</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">Oct 2019 - Apr 2023</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Launched Smart Omix, a digital platform that cut patient recruitment time by 60%, reduced dropouts by
                20-30%, and sped enrollment by 30-40%.
              </li>
              <li>
                Defined product specs and led design/engineering teams using Jira, Figma, and Looker to deliver scalable
                web and mobile solutions.
              </li>
              <li>
                Explored large language models to streamline processes, setting the stage for AI-driven enhancements.
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm sm:text-base text-foreground">Head of Product at monmentor.fr</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Paris, France</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">Jun 2017 - May 2019</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Developed a mentoring platform for talents and executives, shaping strategy through deep customer
                insights.
              </li>
              <li>Bridged CEO, tech teams, and clients to align product vision with business goals.</li>
            </ul>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h3 className="font-medium text-sm sm:text-base text-foreground">Education</h3>
            <div className="space-y-2">
              <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">
                      M.S. in Digital Technology & Product Management
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">HETIC, Paris, France</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Grande École Program (France), Equivalent to U.S. Master's
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">2015 - 2018</span>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">Computer Science</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">College of San Mateo, California</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">2014 - 2015</span>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">Economics</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Paris School of Business, France</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">2012 - 2014</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

