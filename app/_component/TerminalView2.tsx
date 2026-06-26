"use client";
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useEffect,
  JSX,
} from "react";
import { about, email, github, linkedin, terminalName, routes, projects as globalProjects, skills as globalSkills, fullName, title, number, whatsapp } from "../data";
import { useRouter } from "next/navigation";
import TypewriterName from "./TypewriterName";

interface HistoryEntry {
  cmd: string;
  result: string | JSX.Element;
  timestamp?: string;
}

interface Project {
  name: string;
  id: string;
  desc: string;
  longDesc: string;
  tech: string[];
  img: string;
  features?: string[];
  github?: string;
  live?: string;
}

// Use global projects data from data.ts
// Map to match Project interface with img path
const projectsData: Project[] = globalProjects.map(project => ({
  name: project.name,
  id: project.id,
  desc: project.desc,
  longDesc: project.longDesc,
  tech: project.tech,
  img: `/${project.img}`, // Ensure image path is correct
  features: project.features,
  github: project.github,
  live: project.live,
}));

export default function Terminal() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [command, setCommand] = useState<string>("");
  const [showAboutView, setShowAboutView] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [hasFocus, setHasFocus] = useState(true); // Track if terminal input has focus
  const [inputKey, setInputKey] = useState(0); // Force re-render input for mobile
  const lastTypedRef = useRef<string>(""); // Track last typed value to detect swaps

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Get timestamp for commands
  const getTimestamp = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ---------------- CONTACT COMPONENT ---------------- //
  const Contact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="space-y-3 mt-2">
        <div className="flex items-center gap-3 group">
          <span className="text-cyan-400 text-lg">📧</span>
          <span className="text-gray-300">Email:</span>
          <button
            onClick={handleCopy}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium hover:underline"
          >
            {email}
          </button>
          {copied && (
            <span className="ml-2 text-emerald-400 font-semibold animate-pulse">
              ✓ Copied!
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 group">
          <span className="text-cyan-400 text-lg">📱</span>
          <span className="text-gray-300">WhatsApp:</span>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium hover:underline"
          >
            +{number}
          </a>
          <span className="text-gray-500 text-sm">(type &apos;c number&apos; to open chat)</span>
        </div>
        <div className="flex items-center gap-3 group">
          <span className="text-cyan-400 text-lg">🔗</span>
          <span className="text-gray-300">GitHub:</span>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium hover:underline"
          >
            {github.replace("https://", "").replace(/\/$/, "")}
          </a>
          <span className="text-gray-500 text-sm">(opens in new tab)</span>
        </div>
        <div className="flex items-center gap-3 group">
          <span className="text-cyan-400 text-lg">💼</span>
          <span className="text-gray-300">LinkedIn:</span>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium hover:underline"
          >
            {linkedin.replace("https://www.", "").replace(/\/$/, "")}
          </a>
          <span className="text-gray-500 text-sm">(opens in new tab)</span>
        </div>
      </div>
    );
  };

  // ---------------- SKILLS COMPONENT ---------------- //
  const Skills = () => {
    const skillCategories = [
      {
        title: "Frontend",
        skills: globalSkills.frontend,
        color: "text-blue-400",
      },
      {
        title: "Backend",
        skills: globalSkills.backend,
        color: "text-green-400",
      },
      {
        title: "Languages",
        skills: globalSkills.languages,
        color: "text-yellow-400",
      },
      {
        title: "Tools",
        skills: globalSkills.tools,
        color: "text-cyan-400",
      },
      {
        title: "Other",
        skills: globalSkills.other,
        color: "text-purple-400",
      },
    ];

    return (
      <div className="mt-2 space-y-4">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="border-l-2 border-cyan-500/30 pl-4 py-2">
            <h3 className={`${category.color} font-semibold mb-2 text-sm`}>
              {category.title}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-md text-gray-300 text-sm hover:border-cyan-500/50 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ---------------- PROJECTS LIST COMPONENT ---------------- //
  const Projects = () => {
    return (
      <div className="mt-2 space-y-4">
        <div className="text-gray-400 text-sm mb-3">
          Type <span className="text-cyan-400 font-mono">projects [project-name]</span> to see detailed information
        </div>
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            className="border-l-2 border-cyan-500/30 pl-4 py-2 hover:border-cyan-500/60 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-cyan-400 font-bold">{idx + 1}.</span>
              <h3 className="text-cyan-300 font-semibold">{project.name}</h3>
            </div>
            <p className="text-gray-300 text-sm ml-6 mb-2">{project.desc}</p>
            <div className="flex flex-wrap gap-2 ml-6">
              {project.tech.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="px-2 py-0.5 bg-gray-800/50 border border-gray-700 rounded text-amber-400 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="ml-6 mt-2 text-xs text-cyan-400/70">
              → Type: <span className="font-mono">projects {idx + 1}</span>, <span className="font-mono">projects {project.id}</span>, or <span className="font-mono">projects {project.name.toLowerCase()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ---------------- PROJECT DETAIL COMPONENT ---------------- //
  const ProjectDetail = ({ project }: { project: Project }) => {
    return (
      <div className="mt-2 space-y-4">
        <div className="border-b border-cyan-500/30 pb-3">
          <h2 className="text-cyan-300 text-2xl font-bold mb-2">{project.name}</h2>
          <p className="text-gray-300 leading-relaxed">{project.longDesc}</p>
        </div>
        
        <div>
          <h3 className="text-cyan-400 font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {project.features?.map((feature, idx) => (
              <li key={idx} className="ml-4">{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-cyan-400 font-semibold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIdx) => (
              <span
                key={techIdx}
                className="px-3 py-1 bg-gray-800/50 border border-cyan-500/30 rounded-md text-cyan-300 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.github || project.live) && (
          <div className="flex gap-4 pt-2 border-t border-gray-700/50">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium hover:underline"
              >
                🔗 View on GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium hover:underline"
              >
                🌐 Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  // ---------------- COMMANDS ---------------- //
  const commands: { [key: string]: string | JSX.Element } = {
    help: (
      <div className="mt-2 space-y-2">
        <div className="text-cyan-400 font-semibold mb-3">Available Commands:</div>
        <div className="space-y-1.5 text-gray-300">
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">about, a</span>
            <span>Display information about me</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">skills, s</span>
            <span>Show my technical skills</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">projects, p</span>
            <span>List all projects</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">projects [name|id|#]</span>
            <span>View detailed project information (use project number, name, or id)</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-28">contact, c</span>
            <span>Get my contact information</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-28">c number</span>
            <span>Open WhatsApp chat in a new browser tab</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">clear</span>
            <span>Clear terminal history</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">help</span>
            <span>Show this help message</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">graphical, g</span>
            <span>Navigate to graphical view</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-mono w-20">3d</span>
            <span>Navigate to 3D portfolio view</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-700 text-gray-500 text-sm">
          Tip: Use shorter aliases (a, s, p, c, g) for faster navigation. Use &apos;graphical&apos; or &apos;3d&apos; to switch views.
        </div>
      </div>
    ),
    about: (
      <div className="mt-2 space-y-3 text-gray-300 leading-relaxed">
        <p className="text-gray-200">{about}</p>
        <div className="pt-2 border-t border-gray-700/50">
          <p className="text-gray-400 text-sm italic">
            &quot;When I&apos;m not coding, I explore tech trends, contribute to open-source, or enjoy a good cup of coffee while planning my next project.&quot;
          </p>
        </div>
      </div>
    ),
    skills: <Skills />,
    projects: <Projects />,
    contact: <Contact />,
  };

  const aliases: { [key: string]: string } = {
    a: "about",
    s: "skills",
    p: "projects",
    c: "contact",
    h: "help",
    g: "graphical",
    three: "3d",
  };

  // ---------------- COMMAND HANDLER ---------------- //
  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission and browser autocomplete
      const cmd = command.trim().toLowerCase();
      
      if (!cmd) return;

      // Clear command immediately to prevent mobile input caching
      setCommand("");
      lastTypedRef.current = ""; // Clear tracking ref
      
      // Force input re-render for mobile browsers (most effective fix)
      setInputKey(prev => prev + 1);
      
      // Aggressively clear input field for mobile browsers
      if (inputRef.current) {
        const input = inputRef.current;
        // Force clear multiple ways to handle mobile browser caching
        input.value = "";
        input.setAttribute("value", "");
        input.blur();
      }

      setIsUserTyping(true);
      
      // After a short delay, refocus and ensure it's cleared
      setTimeout(() => {
        if (inputRef.current) {
          const input = inputRef.current;
          input.value = "";
          input.setAttribute("value", "");
          input.focus();
        }
      }, 1);
      
      // Navigation commands
      if (cmd === "graphical" || cmd === "g") {
        setTimeout(() => {
          router.push(routes.graphical);
        }, 300);
        return;
      }
      
      if (cmd === "3d" || cmd === "three" || cmd === "d3") {
        setTimeout(() => {
          router.push(routes.threeD);
        }, 300);
        return;
      }
      
      if (cmd === "home") {
        setTimeout(() => {
          router.push(routes.home);
        }, 300);
        return;
      }

      // Open WhatsApp: contact number / c number
      const whatsappMatch = cmd.match(/^(contact|c)\s+number$/);
      if (whatsappMatch) {
        window.open(whatsapp, "_blank", "noopener,noreferrer");
        const result = (
          <span className="text-emerald-400 flex items-center gap-2">
            <span>✓</span>
            <span>
              Opening WhatsApp chat with{" "}
              <span className="font-mono text-cyan-300">+{number}</span> in a new tab...
            </span>
          </span>
        );
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { cmd, result, timestamp: getTimestamp() },
          ]);
          setIsUserTyping(true);
          setShouldAutoScroll(true);
          if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
          }
        }, 100);
        return;
      }
      
      // Check for project detail command (projects [name|id|number])
      const projectMatch = cmd.match(/^(projects|p)\s+(.+)$/);
      if (projectMatch) {
        const projectId = projectMatch[2].trim();
        let project: Project | undefined;
        
        // First, check if it's a number (project index)
        const projectNumber = parseInt(projectId);
        if (!isNaN(projectNumber) && projectNumber > 0 && projectNumber <= projectsData.length) {
          // Use number as index (subtract 1 since list is 1-indexed)
          project = projectsData[projectNumber - 1];
        } else {
          // Search by id or name
          project = projectsData.find(p => 
            p.id.toLowerCase() === projectId.toLowerCase() || 
            p.name.toLowerCase() === projectId.toLowerCase()
          );
        }
        
        if (project) {
          setSelectedProject(project);
          setShowAboutView(true);
          const result = <ProjectDetail project={project} />;
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              { cmd, result, timestamp: getTimestamp() },
            ]);
            // Command already cleared above
            setIsUserTyping(true);
            setShouldAutoScroll(true);
            // Force input re-render for mobile
            setInputKey(prev => prev + 1);
            // Aggressively clear input for mobile browsers
            setTimeout(() => {
              if (inputRef.current) {
                const input = inputRef.current;
                input.value = "";
                input.setAttribute("value", "");
                input.focus();
              }
            }, 150);
          }, 100);
          return;
        } else {
          setTimeout(() => {
            const result = (
              <span className="text-red-400 flex items-center gap-2">
                <span>✗</span>
                <span>Project not found: <span className="font-mono">{projectId}</span></span>
                <span className="text-gray-500">(type &apos;projects&apos; to see available projects, or use project number, name, or id)</span>
              </span>
            );
            setHistory((prev) => [
              ...prev,
              { cmd, result, timestamp: getTimestamp() },
            ]);
            setCommand("");
          }, 100);
          return;
        }
      }
      
      // View mode switch
      if (cmd === "about" || cmd === "a") {
        setShowAboutView(true);
        setSelectedProject(null);
      } else if (cmd === "projects" || cmd === "p") {
        setShowAboutView(false);
        setSelectedProject(null);
      } else {
        setShowAboutView(false);
        setSelectedProject(null);
      }

      // Clear command
      if (cmd === "clear" || cmd == "cls") {
        setHistory([]);
        // Command already cleared above
        setShowAboutView(false);
        setSelectedProject(null);
        setIsUserTyping(true);
        setShouldAutoScroll(true);
        // Ensure input is cleared and focused
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
        return;
      }

      // Resolve command
      const realCmd = aliases[cmd] || cmd;
      const result =
        commands[realCmd] || (
          <span className="text-red-400 flex items-center gap-2">
            <span>✗</span>
            <span>Command not found: <span className="font-mono">{cmd}</span></span>
            <span className="text-gray-500">(type &apos;help&apos; for available commands)</span>
          </span>
        );

      // Add to history with timestamp
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { cmd, result, timestamp: getTimestamp() },
        ]);
        // Command already cleared above
        setIsUserTyping(true); // Enable auto-scroll when command is executed
        setShouldAutoScroll(true);
        // Ensure input is cleared and focused
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }, 100);
    } else if (e.key === "ArrowUp") {
      // History navigation (basic implementation)
      e.preventDefault();
      const lastCmd = history[history.length - 1]?.cmd;
      if (lastCmd) {
        setCommand(lastCmd);
      }
    }
  };

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));


  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const originalValue = value;

    await wait(1);
    
    if (value.length >= 2) {
      const lastTwo = value.slice(-2);
      const cursorPos = e.target.selectionStart ?? value.length;
      
      if (cursorPos >= value.length - 1) {
        // Pattern 1: Mobile swapped "3d" to "d3"
        if (lastTwo === 'd3' && lastTypedRef.current.endsWith('3')) {
          value = value.slice(0, -2) + '3d';
        }
        // Pattern 2: Entire value is "d3" when it should be "3d"
        else if (value === 'd3' && lastTypedRef.current === '3') {
          value = '3d';
        }
        // Pattern 3: Command had "3d" but input shows "d3"
        else if (command && command.endsWith('3d') && lastTwo === 'd3') {
          value = value.slice(0, -2) + '3d';
        }
        // Pattern 4: User typed "3" then "d", mobile swapped to "d3"
        else if (lastTypedRef.current.endsWith('3') && value.endsWith('d3')) {
          value = value.slice(0, -2) + '3d';
        }
      }
    }
    
    // Save current value for next comparison (use original if no correction)
    lastTypedRef.current = value !== originalValue ? value : originalValue;
    
    // Set command - React controlled input preserves cursor position naturally
    // For normal typing like "projects vibestudio", React handles everything
    setCommand(value);
    setIsUserTyping(true);
    setShouldAutoScroll(true);
  };

  // Detect manual scrolling - only disable auto-scroll if user scrolls up manually (not typing)
  useEffect(() => {
    const terminalBody = terminalBodyRef.current;
    if (!terminalBody) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      // Clear any pending scroll timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      const { scrollTop, scrollHeight, clientHeight } = terminalBody;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px threshold
      
      // Only disable auto-scroll if user manually scrolls up (not at bottom) and not currently typing
      if (!isAtBottom && !isUserTyping) {
        // Add a small delay to avoid disabling during automatic scrolling
        scrollTimeout = setTimeout(() => {
          setShouldAutoScroll(false);
        }, 150);
      } else if (isAtBottom) {
        // If user scrolls back to bottom, re-enable auto-scroll
        setShouldAutoScroll(true);
      }
    };

    terminalBody.addEventListener("scroll", handleScroll);
    return () => {
      terminalBody.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isUserTyping]);

  // Auto scroll when user is typing or when shouldAutoScroll is true
  // BUT only if the terminal has focus (user clicked inside, not outside)
  useEffect(() => {
    if (hasFocus && (shouldAutoScroll || isUserTyping)) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      
      // Reset isUserTyping after scrolling completes
      if (isUserTyping) {
        setTimeout(() => setIsUserTyping(false), 500);
      }
    }
  }, [history, shouldAutoScroll, isUserTyping, hasFocus]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Aggressively ensure input is cleared after command execution (fixes mobile input caching issue)
  useEffect(() => {
    if (command === "" && inputRef.current) {
      const input = inputRef.current;
      // Multiple clear attempts for mobile browsers
      input.value = "";
      input.setAttribute("value", "");
      
      // Force clear after a short delay for mobile
      setTimeout(() => {
        if (input) {
          input.value = "";
          input.setAttribute("value", "");
        }
      }, 100);
    }
  }, [command]);

  // Additional effect to handle mobile input state after history updates
  useEffect(() => {
    if (inputRef.current && command === "") {
      const input = inputRef.current;
      // Force clear when history updates and command is empty
      const clearTimer = setTimeout(() => {
        input.value = "";
        input.setAttribute("value", "");
      }, 150);
      
      return () => clearTimeout(clearTimer);
    }
  }, [history, command]);

  // Welcome message on mount
  useEffect(() => {
    const welcomeMessage: HistoryEntry = {
      cmd: "",
      result: (
        <div className="space-y-2 md:space-y-3 text-gray-300 py-2">
          <div className="text-cyan-400 font-bold text-lg md:text-xl mb-2 md:mb-3">
            Welcome to {terminalName}&apos;s Portfolio Terminal
          </div>
          <div className="text-gray-400 text-sm md:text-base leading-relaxed">
            Type <span className="text-cyan-400 font-mono font-semibold">help</span> to see available commands
          </div>
        </div>
      ),
    };
    setHistory([welcomeMessage]);
  }, []);

  return (
    <div
      className={`flex flex-col md:flex-row transition-all duration-700 min-h-[500px] w-full overflow-hidden ${
        (showAboutView || selectedProject) ? "gap-3 md:gap-6" : "justify-center"
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* LEFT PANEL - PROFILE OR PROJECT */}
      {(showAboutView || selectedProject) && (
        <div className="flex w-full md:w-[40%] h-full md:h-auto max-h-[50vh] md:max-h-none shrink-0 flex-col items-center justify-start md:justify-center opacity-0 animate-fadeSlideIn mb-4 md:mb-0 py-4 md:py-0 overflow-y-auto custom-scrollbar">
          {selectedProject ? (
            // PROJECT VIEW
            <>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <img
                  src={selectedProject.img}
                  alt={selectedProject.name}
                  className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl shadow-2xl border-2 border-cyan-400/50 object-cover group-hover:border-cyan-400 transition duration-300"
                />
              </div>
              <h2 className="mt-4 md:mt-6 text-cyan-300 text-xl md:text-2xl font-bold text-center px-2">
                {selectedProject.name}
              </h2>
              <div className="flex items-center gap-2 mt-2 md:mt-3 px-2">
                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-cyan-400 text-xs md:text-sm font-medium text-center">
                  {selectedProject.desc}
                </p>
              </div>
              <div className="mt-3 md:mt-4 flex flex-wrap gap-2 justify-center max-w-xs px-2">
                {selectedProject.tech.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-800/50 border border-cyan-500/30 rounded text-cyan-300 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          ) : (
            // PROFILE VIEW
            <>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <img
                  src="/IMG-20251023-WA0029.jpg"
                  alt="Profile"
                  className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl shadow-2xl border-2 border-cyan-400/50 object-cover group-hover:border-cyan-400 transition duration-300"
                />
              </div>

              <h2 className="mt-4 md:mt-6 text-cyan-300 text-xl md:text-2xl font-bold text-center px-2 min-h-[2rem] md:min-h-[2.5rem]">
                <TypewriterName text={fullName} active={showAboutView && !selectedProject} />
              </h2>
              <div className="flex items-center gap-2 mt-2 md:mt-3 px-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-cyan-400 text-xs md:text-sm font-medium text-center">
                  {title}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* TERMINAL */}
      <div
        className={`transition-all duration-700 w-full flex-1 min-w-0 ${
          (showAboutView || selectedProject) ? "md:w-[60%]" : "max-w-4xl"
        }`}
      >
        <div className="w-full h-full min-h-[400px] md:min-h-[550px] max-h-[600px] md:max-h-[650px] bg-[#0a0e1a] text-gray-200 font-mono rounded-xl shadow-2xl overflow-hidden border border-gray-800/50 flex flex-col">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 px-2 md:px-4 py-1.5 md:py-2 flex items-center gap-1.5 md:gap-2">
            <div className="flex gap-1 md:gap-1.5">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-[10px] md:text-xs text-gray-400 truncate">
              {terminalName}@portfolio:~$
            </div>
          </div>

          {/* Terminal Body */}
          <div ref={terminalBodyRef} className="flex-1 overflow-y-auto p-3 md:p-5 space-y-2 md:space-y-3 custom-scrollbar">
            {history.map((entry, i) => (
              <div key={i} className="animate-terminalFade">
                {entry.cmd && (
                  <div className="mb-1 text-xs md:text-sm break-words">
                    <span className="text-cyan-400 font-semibold">
                      {terminalName}@portfolio
                    </span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-gray-500">$</span>
                    <span className="text-gray-300 ml-1 md:ml-2 break-all">{entry.cmd}</span>
                    {entry.timestamp && (
                      <span className="text-gray-600 ml-1 md:ml-2 text-xs hidden md:inline">
                        [{entry.timestamp}]
                      </span>
                    )}
                  </div>
                )}
                {!entry.cmd && i === 0 && (
                  <div className="mb-2 md:mb-3 pb-2 md:b-3 border-b border-gray-700/30">
                    {typeof entry.result === "string" ? (
                      <pre className="whitespace-pre-wrap text-gray-300 font-mono text-xs md:text-sm break-words">
                        {entry.result}
                      </pre>
                    ) : (
                      <div className="text-xs md:text-sm">{entry.result}</div>
                    )}
                  </div>
                )}
                {entry.cmd && (
                  <div className="ml-2 md:ml-4 mt-1 text-xs md:text-sm">
                    {typeof entry.result === "string" ? (
                      <pre className="whitespace-pre-wrap text-gray-300 font-mono text-xs md:text-sm break-words">
                        {entry.result}
                      </pre>
                    ) : (
                      <div className="text-xs md:text-sm">{entry.result}</div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center pt-2 text-xs md:text-sm break-words" ref={bottomRef}>
              <span className="text-cyan-400 font-semibold whitespace-nowrap">
                {terminalName}@portfolio
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-500">$</span>
              <span className="text-gray-300 ml-1 md:ml-2 flex items-center flex-1 min-w-0">
                <span className="break-all">{command}</span>
                <span className="inline-block w-2 h-4 md:h-5 bg-cyan-400 ml-1 animate-pulse flex-shrink-0"></span>
              </span>
              <input
                key={`input-${inputKey}`}
                ref={inputRef}
                type="text"
                inputMode="text"
                className="absolute opacity-0 pointer-events-none w-0 h-0"
                value={command}
                onChange={handleChange}
                onKeyDown={handleCommand}
                onFocus={() => {
                  // Terminal gained focus - enable auto-scroll
                  setHasFocus(true);
                }}
                onBlur={() => {
                  // Terminal lost focus (user clicked outside) - disable auto-scroll
                  setHasFocus(false);
                }}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                autoSave="off"
                data-lpignore="true"
                data-form-type="other"
                data-1p-ignore="true"
                id={`terminal-input-${inputKey}`}
                onCompositionStart={(e) => {
                  // Prevent IME composition changes on mobile
                  e.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

