"use client";
import Terminal from "../_component/TerminalView2";
import { useState, useEffect, memo } from "react";

interface ColumnConfig {
  id: number;
  x: number;
  speed: number;
  delay: number;
}

const BinaryColumn = memo(function BinaryColumn({
  x,
  speed,
  delay,
  id,
}: {
  x: number;
  speed: number;
  delay: number;
  id: number;
}) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: 30 }, () => (Math.random() > 0.5 ? "1" : "0"))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDigits((prev) =>
        prev.map((digit, idx) =>
          idx > 5 && Math.random() > 0.5
            ? Math.random() > 0.5
              ? "1"
              : "0"
            : digit
        )
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="binary-column"
      style={{
        left: `${x}%`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {digits.map((digit, idx) => (
        <span key={`${id}-${idx}`} className="binary-digit-falling">
          {digit}
        </span>
      ))}
    </div>
  );
});

function createColumns(): ColumnConfig[] {
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const columnCount = Math.min(Math.floor(width / 35), 40);
  return Array.from({ length: columnCount }, (_, i) => ({
    id: i,
    x: (i / columnCount) * 100,
    speed: 4 + Math.random() * 5,
    delay: Math.random() * 3,
  }));
}

export default function TerminalPage() {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);

  useEffect(() => {
    const cols = createColumns();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only column layout
    setColumns(cols);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setColumns(createColumns()), 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-2 md:p-4 py-4 md:py-8 overflow-hidden relative">
      <div className="binary-background fixed inset-0 w-full h-full">
        <div className="binary-grid-overlay" />
        {columns.map((column) => (
          <BinaryColumn
            key={column.id}
            x={column.x}
            speed={column.speed}
            delay={column.delay}
            id={column.id}
          />
        ))}
      </div>

      <div className="terminal-container-wrapper relative z-20">
        <div
          className="
            w-full md:w-[950px] lg:w-[1050px] h-auto min-h-[500px] md:min-h-[600px] max-w-full max-h-[95vh] overflow-hidden
            bg-gray-900/95 backdrop-blur-sm p-2 md:p-4 rounded-lg shadow-2xl border-2 border-green-500/80
            crt animate-terminalFade relative
          "
          style={{
            boxShadow:
              "0 0 30px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)",
          }}
        >
          <Terminal />
        </div>
      </div>
    </div>
  );
}
