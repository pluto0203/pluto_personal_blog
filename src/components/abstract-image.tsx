interface AbstractImageProps {
  seed: number;
  className?: string;
  alt?: string;
}

const gradients = [
  "radial-gradient(circle at 20% 30%, rgba(0,245,255,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192,38,211,0.1) 0%, transparent 50%)",
  "linear-gradient(45deg, rgba(0,245,255,0.06) 0%, rgba(57,255,20,0.06) 100%), radial-gradient(circle at 70% 30%, rgba(0,245,255,0.08) 0%, transparent 50%)",
  "radial-gradient(circle at 50% 50%, rgba(57,255,20,0.1) 0%, transparent 60%), linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.04) 100%)",
  "linear-gradient(135deg, rgba(192,38,211,0.1) 0%, rgba(0,245,255,0.08) 100%)",
  "radial-gradient(ellipse at top right, rgba(0,245,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(57,255,20,0.05) 0%, transparent 50%)",
  "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(192,38,211,0.12) 100%), radial-gradient(circle at 30% 60%, rgba(0,245,255,0.05) 0%, transparent 50%)",
];

const strokeColors = ["#00f5ff", "#39ff14", "#c026d3", "#00f5ff", "#39ff14", "#c026d3"];

export function AbstractImage({ seed, className = "", alt }: AbstractImageProps) {
  const idx = seed % gradients.length;

  return (
    <div
      className={`relative h-48 w-full overflow-hidden border-b border-white/[0.05] bg-[#0a0a0a] ${className}`}
      style={{ backgroundImage: gradients[idx] }}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-abs-${seed}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={strokeColors[idx]} strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-abs-${seed})`} />
        {idx % 2 === 0 ? (
          <circle
            cx="50%"
            cy="50%"
            r="36"
            fill="none"
            stroke={strokeColors[(idx + 1) % strokeColors.length]}
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.35"
          />
        ) : null}
        {idx % 3 === 0 ? (
          <path
            d={`M0,${60 + seed * 5} Q${80 + seed * 10},${30 + seed * 3} ${160 + seed * 5},${70 + seed * 4} T320,${60 + seed * 3}`}
            fill="none"
            stroke={strokeColors[(idx + 2) % strokeColors.length]}
            strokeWidth="1"
            opacity="0.4"
          />
        ) : null}
        {idx % 2 === 1 ? (
          <>
            <circle cx={`${20 + seed * 7}%`} cy={`${40 + seed * 5}%`} r="3" fill={strokeColors[idx]} opacity="0.5" />
            <circle cx={`${60 + seed * 5}%`} cy={`${30 + seed * 7}%`} r="2" fill={strokeColors[(idx + 1) % 3]} opacity="0.4" />
            <line
              x1={`${20 + seed * 7}%`}
              y1={`${40 + seed * 5}%`}
              x2={`${60 + seed * 5}%`}
              y2={`${30 + seed * 7}%`}
              stroke={strokeColors[idx]}
              strokeWidth="0.8"
              opacity="0.25"
              strokeDasharray="3 5"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}
