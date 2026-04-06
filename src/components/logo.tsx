export function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative h-6 w-6 shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full text-[#00f5ff] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
          <path d="M12 4 L12 8 M12 16 L12 20 M4 12 L8 12 M16 12 L20 12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <path
            d="M6.34 6.34 L8.46 8.46 M15.54 15.54 L17.66 17.66 M17.66 6.34 L15.54 8.46 M8.46 15.54 L6.34 17.66"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.3"
          />
        </svg>
      </div>
      <span className="font-[family-name:var(--font-oxanium)] text-xl font-bold leading-none tracking-wider text-[#f0f0f0] transition-colors duration-300 group-hover:text-[#00f5ff]">
        PLUTO AI
      </span>
    </div>
  );
}
