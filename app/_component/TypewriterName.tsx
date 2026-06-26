"use client";
import { useState, useEffect } from "react";

interface TypewriterNameProps {
  text: string;
  active?: boolean;
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

export default function TypewriterName({
  text,
  active = true,
  className = "",
  typeSpeed = 120,
  deleteSpeed = 80,
  pauseMs = 1500,
}: TypewriterNameProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      setIndex(0);
      setDeleting(false);
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;

    if (!deleting && index === text.length) {
      const pause = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    const speed = deleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = index + 1;
        setDisplayedText(text.slice(0, next));
        setIndex(next);
      } else {
        const next = index - 1;
        setDisplayedText(text.slice(0, next));
        setIndex(next);
        if (next === 0) setDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, deleting, text, active, typeSpeed, deleteSpeed, pauseMs]);

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <span>{displayedText}</span>
      <span className="inline-block w-0.5 h-5 md:h-6 bg-cyan-400 ml-0.5 animate-pulse" />
    </span>
  );
}
