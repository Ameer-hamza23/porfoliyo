"use client";
import { useState, useEffect } from "react";

export default function TerminalPortfolio() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const commands = {
    help: [
      "Available commands:",
      "  about      → About Me",
      "  skills     → My Technical Skills",
      "  projects   → List of Projects",
      "  contact    → Contact Information",
      "  clear      → Clear Terminal",
    ],

    about: [
      "Ameer Hamza — MERN Stack Developer",
      "Building modern, fast, and scalable full-stack applications.",
      "Passionate about UI/UX + system design.",
    ],

    skills: [
      "Core Technologies:",
      "  • HTML, CSS, JavaScript",
      "  • React, Next.js",
      "  • Node.js, Express.js",
      "  • MongoDB, SQL",
      "  • Docker, Redis",
    ],

    projects: [
      "Projects:",
      "  1. Portfolio Website — Next.js + Tailwind",
      "  2. MERN E-Commerce — Full auth + dashboard",
      "  3. Realtime Chat App — Socket.IO",
    ],

    contact: [
      "Contact:",
      "  Email: ameerhamza@gmail.com",
      "  Phone: +92 300 0000000",
      "  GitHub: github.com/ameer-dev",
    ],
  };

  const runCommand = (cmd: string): string[] => {
    if (cmd in commands) {
      return commands[cmd as keyof typeof commands];
    }

    return [`Unknown command: ${cmd}`, `Type 'help' to see available commands.`];
  };

  const handleEnter = () => {
    if (!input.trim()) return;

    let newHistory = [`ameer@portfolio:~$ ${input}`];

    if (input === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const result = runCommand(input.trim());
    setLines([...lines, ...newHistory, ...result]);

    setHistory([...history, input]);
    setInput("");
  };

  return (
    <div className="w-full h-screen bg-black text-green-400 font-mono p-4 overflow-hidden">
      {/* Terminal box */}
      <div className="border border-green-400 rounded-lg w-full h-full p-4 overflow-y-auto">

        {/* Lines Output */}
        <div>
          {lines.map((line, i) => (
            <p key={i} className="whitespace-pre">{line}</p>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-center mt-2">
          <span className="mr-2">ameer@portfolio:~$</span>
          <input
            className="bg-transparent outline-none text-green-400 flex-1"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnter()}
          />
        </div>

      </div>
    </div>
  );
}
2