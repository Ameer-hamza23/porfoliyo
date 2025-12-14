"use client";
import Terminal from "../_component/TerminalView2";
import { useState, useEffect } from "react";

export default function TerminalPage() {
  const [columns, setColumns] = useState<Array<{id: number, x: number, speed: number, delay: number}>>([]);

  useEffect(() => {
    // Create columns of falling binary digits - more dense for professional look
    const createColumns = () => {
      const columnCount = Math.floor(window.innerWidth / 25); // More columns for denser effect
      const cols: Array<{id: number, x: number, speed: number, delay: number}> = [];
      
      for (let i = 0; i < columnCount; i++) {
        cols.push({
          id: i,
          x: (i / columnCount) * 100, // Percentage from left
          speed: 4 + Math.random() * 5, // Random speed between 4-9 seconds
          delay: Math.random() * 3, // Random start delay up to 3 seconds
        });
      }
      
      setColumns(cols);
    };
    
    createColumns();
    
    // Handle window resize
    const handleResize = () => {
      createColumns();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate binary column component
  const BinaryColumn = ({ x, speed, delay, id }: { x: number, speed: number, delay: number, id: number }) => {
    const [digits, setDigits] = useState<string[]>([]);
    
    useEffect(() => {
      // Generate initial column of digits - longer columns for better effect
      const columnLength = 40; // More digits per column
      const initialDigits: string[] = [];
      
      for (let i = 0; i < columnLength; i++) {
        initialDigits.push(Math.random() > 0.5 ? '1' : '0');
      }
      
      setDigits(initialDigits);
      
      // Continuously update digits to create realistic flickering effect
      const interval = setInterval(() => {
        setDigits(prev => prev.map((_, idx) => {
          // More frequent changes for trailing digits
          if (idx > 5 && Math.random() > 0.3) {
            return Math.random() > 0.5 ? '1' : '0';
          }
          return prev[idx];
        }));
      }, 80 + Math.random() * 150); // Faster update for more dynamic look
      
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
          <span
            key={`${id}-${idx}`}
            className="binary-digit-falling"
            style={{
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            {digit}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-2 md:p-4 py-4 md:py-8 overflow-hidden relative">
      {/* Professional Binary Background - Complete Developer Look */}
      <div className="binary-background fixed inset-0 w-full h-full">
        {/* Grid overlay for professional look */}
        <div className="binary-grid-overlay"></div>
        
        {/* Falling binary columns */}
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
      
      {/* Terminal Container with enhanced backdrop */}
      <div className="terminal-container-wrapper relative z-20">
      <div
        className="
          w-full md:w-[950px] lg:w-[1050px] h-auto min-h-[500px] md:min-h-[600px] max-w-full max-h-[95vh] overflow-hidden
            bg-gray-900/95 backdrop-blur-sm p-2 md:p-4 rounded-lg shadow-2xl border-2 border-green-500/80
            crt animate-terminalFade relative
        "
          style={{
            boxShadow: '0 0 30px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)',
          }}
      >
        <Terminal />
        </div>
      </div>
    </div>
  );
}

