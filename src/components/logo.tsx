export function Logo() {
  return (
    <div className="group cursor-pointer">
      <svg
        viewBox="0 0 220 170"
        role="img"
        aria-label="Pluto AI logo"
        className="h-12 w-[132px] overflow-visible transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(0,245,255,0.35)]"
      >
        <defs>
          <linearGradient id="pluto-logo-gradient" x1="32" y1="22" x2="160" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22e7ff" />
            <stop offset="55%" stopColor="#37cfff" />
            <stop offset="100%" stopColor="#6fa4ff" />
          </linearGradient>
          <linearGradient id="pluto-word-gradient" x1="46" y1="118" x2="176" y2="156" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22e7ff" />
            <stop offset="100%" stopColor="#6fa4ff" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#pluto-logo-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M84 28C64 30 48 44 42 62c-3 10-2 21 3 30 2 4 6 7 11 8-4 4-6 9-6 14 0 6 5 11 12 11h26c13 0 24-5 32-14 7-8 11-18 11-29 0-30-21-56-47-54Z" />
          <path d="M70 44c-8 6-13 15-13 25 3 3 7 5 11 7-5 3-9 8-9 13 0 6 5 10 12 10h18" opacity="0.9" />
          <path d="M89 49v41" opacity="0.8" />
          <path d="M108 40v52" />
          <path d="M124 49h20c8 0 14 6 14 13 0 8-6 14-14 14h-7" opacity="0.82" />
          <path d="M136 77v22" opacity="0.82" />
        </g>

        <g stroke="url(#pluto-logo-gradient)" strokeWidth="3" strokeLinecap="round">
          <path d="M49 57 38 76" />
          <path d="M88 24 86 40" />
          <path d="M109 25 123 39" />
          <path d="M146 49 160 49" />
          <path d="M135 99 146 112" />
          <path d="M122 64 145 64" />
        </g>

        <g fill="#081a39" stroke="url(#pluto-logo-gradient)" strokeWidth="3">
          <circle cx="36" cy="79" r="5.5" />
          <circle cx="86" cy="22" r="5.5" />
          <circle cx="126" cy="41" r="5.5" />
          <circle cx="164" cy="49" r="5.5" />
          <circle cx="147" cy="64" r="5" />
          <circle cx="149" cy="116" r="5" />
        </g>

        <text
          x="106"
          y="73"
          textAnchor="middle"
          fill="url(#pluto-logo-gradient)"
          fontFamily="var(--font-oxanium), Oxanium, sans-serif"
          fontSize="24"
          fontWeight="700"
          letterSpacing="2"
        >
          AI
        </text>

        <text
          x="110"
          y="151"
          textAnchor="middle"
          fill="url(#pluto-word-gradient)"
          fontFamily="var(--font-oxanium), Oxanium, sans-serif"
          fontSize="34"
          fontWeight="800"
          letterSpacing="8"
        >
          PLUTO
        </text>
      </svg>
    </div>
  );
}
