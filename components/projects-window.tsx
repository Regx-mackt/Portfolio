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
                <p className="text-xs sm:text-sm text-muted-foreground">San Francisco, CA</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">May 2023 - Present</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Oversaw a team of 100+ volunteers to plan and execute the world's first AI-focused TED Conference,
                delivering a sold-out event.
              </li>
              <li>Unified outputs from multiple workstreams, managing logistics, design, and website development.</li>
              <li>Ensured leadership had timely, data-backed insights for swift decision-making.</li>
            </ul>
            <p className="text-xs sm:text-sm mt-2 text-foreground">
              Key Achievement: Drove the successful launch of a pioneering AI conference, showcasing expertise in both
              project management and technical direction.
            </p>
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
                Led the strategic pivot from NFTs to AI-driven music production, enabling artists to create immersive
                new sounds.
              </li>
              <li>
                Conducted comprehensive market research to identify opportunities for generative AI in music, shaping a
                product roadmap that aligned with industry trends.
              </li>
              <li>Coordinated cross-functional teams, ensuring on-time delivery of high-impact features.</li>
            </ul>
            <p className="text-xs sm:text-sm mt-2 text-foreground">
              Key Achievement: Repositioned the company direction within three months, laying the foundation for
              cutting-edge AI models that redefine the music industry.
            </p>
          </div>

          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm sm:text-base text-foreground">
                  Senior Product Manager at Sharecare
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Palo Alto, CA</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">Oct 2019 - Apr 2023</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Drove the creation of Smart Omix, a platform accelerating medical research with up to 60% improved
                patient recruitment and a 20–30% drop in participant dropout rates.
              </li>
              <li>
                Collaborated with engineering, design, and clinical experts to decentralize clinical trials, reducing
                enrollment time by 30–40%.
              </li>
              <li>
                Presented business cases for scalable product architecture in a rapidly growing market, valued at $4.26B
                in 2021 and projected to grow 14–15% annually through 2030.
              </li>
            </ul>
            <p className="text-xs sm:text-sm mt-2 text-foreground">
              Key Achievement: Successfully recruited hundreds of patients for the first clinical trials on schedule,
              showcasing the platform's effectiveness in real-world conditions.
            </p>
          </div>

          <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm sm:text-base text-foreground">Head of Product at Monmentor.fr</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Paris, France</p>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">Jun 2017 - May 2019</span>
            </div>
            <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4 text-muted-foreground">
              <li>
                Defined and analyzed user needs to guide product development for a mentoring platform aimed at talents,
                managers, and executives.
              </li>
              <li>
                Built customer support tools and processes, acting as the liaison between the CEO, technical teams, and
                end users.
              </li>
            </ul>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h3 className="font-medium text-sm sm:text-base text-foreground">Education</h3>
            <div className="space-y-2">
              <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">
                      Expert in Digital Transformation & Technology
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Hetic, Paris, France</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Master's-equivalent in Computer Science</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">
                      Computer Science, Economics & Calculus
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">College of San Mateo, California</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

