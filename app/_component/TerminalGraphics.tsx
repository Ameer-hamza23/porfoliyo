"use client";
import React from "react";
import Terminal from "./TerminalView2";

export default function TerminalGraphics() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center p-4">
      {/* Terminal container with CRT effect + fade-in */}
      <div
        className="
          w-[850px] h-[520px] max-w-full max-h-full overflow-hidden 
          bg-gray-900 p-4 rounded-lg shadow-xl border border-green-500
          crt animate-terminalFade
        "
      >
        <Terminal />
      </div>
    </div>
  );
}
