"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextValue = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressRef.current.style.width = `${nextValue}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        ref={progressRef}
        className="h-full bg-linear-to-r from-cyan-400 via-sky-400 to-violet-500"
        style={{ width: "0%" }}
      />
    </div>
  );
}
