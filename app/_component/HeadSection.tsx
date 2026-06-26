"use client";
import { useState, useEffect } from "react";
import { name } from "../data";

export default function HeadSection() {
  const fullName = name;
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = 300; 
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayedText(fullName.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullName.length) setDeleting(true);
      } else {
        setDisplayedText(fullName.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) setDeleting(false);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [index, deleting, fullName]);

  return (
    <>
      <style>{`
        @keyframes float3d {
          0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-12px) rotateX(4deg) rotateY(-4deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
        }

        .float-3d {
          animation: float3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>

      <div
        className="flex h-screen bg-cover bg-center bg-no-repeat justify-center items-center px-10 md:px-20"
        style={{ backgroundImage: "url('/evolution-threat-intelligence.jpg')" }}
        id="header"
      >
        <div className="flex w-full md:w-1/2 justify-end">
          <div className="w-full md:w-[80%]">
            <h1 className="text-[#26CCBB] font-extrabold text-2xl md:text-3xl">
              MERN Stack Developer
            </h1>

            <h1 className="text-5xl md:text-8xl font-extrabold leading-tight">
              {displayedText}
              <span className="border-r-2 border-black animate-pulse ml-1"></span>
            </h1>

            <p className="pt-4 max-w-[90%] text-lg">
              Crafting immersive and high-performance web applications with a futuristic touch. Let&apos;s build the future, one line of code at a time.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#projects"
                  className="px-8 py-4 bg-[#26CCBB] rounded-full font-semibold text-black hover:scale-105 transition-all hover:bg-[#14eed8] text-center"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-[#1C1C2D] rounded-full font-semibold text-white hover:scale-105 transition-all hover:bg-[#26263d] text-center"
                >
                  Get In Touch
                </a>
              </div>

          </div>
        </div>

        <div className="hidden md:flex w-1/2 justify-start">
          <img
            src="/right.png"
            alt="profile"
            className="size-96 rounded-xl object-cover float-3d"
          />
        </div>
      </div>
    </>
  );
}
