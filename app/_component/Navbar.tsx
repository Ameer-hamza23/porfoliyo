"use client";
import { useState, useEffect } from "react";
import { FiTerminal } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1C1C2D]/80 backdrop-blur-md shadow-md"
          : "bg-[#1C1C2D]/50 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 text-white max-w-7xl mx-auto">
        <h1 className="font-bold text-lg tracking-wide">
          <a href="#header" className="hover:text-[#26CCBB] transition">Rao Ameer Hamza</a>
        </h1>

        <ul className="hidden md:flex gap-8 text-sm">
          <li><a href="#about" className="hover:text-[#26CCBB] transition">About</a></li>
          <li><a href="#technology" className="hover:text-[#26CCBB] transition">Skills</a></li>
          <li><a href="#projects" className="hover:text-[#26CCBB] transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-[#26CCBB] transition">Contact</a></li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/terminal")}
            className={`flex items-center gap-2 border px-3 py-2 rounded-md transition ${
              isActiveRoute("/terminal")
                ? "border-[#26CCBB] text-[#26CCBB] bg-[#26CCBB]/10"
                : "border-[#26CCBB]/50 text-[#26CCBB]/80 hover:bg-[#26CCBB]/10"
            }`}
          >
            <FiTerminal className="text-lg" />
            <span className="text-sm hidden sm:inline">Terminal</span>
          </button>
          {/* <button
            onClick={() => router.push("/graphical")}
            className={`px-3 py-2 border rounded-md transition ${
              isActiveRoute("/graphical")
                ? "border-blue-400 text-blue-300 bg-blue-400/10"
                : "border-blue-400/50 text-blue-300/80 hover:bg-blue-400/10"
            }`}
          >
            <span className="text-sm">🎨</span>
          </button> */}
          <button
            onClick={() => router.push("/3d")}
            className={`px-3 py-2 border rounded-md transition ${
              isActiveRoute("/3d")
                ? "border-purple-400 text-purple-300 bg-purple-400/10"
                : "border-purple-400/50 text-purple-300/80 hover:bg-purple-400/10"
            }`}
          >
            <span className="text-sm">✨</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
