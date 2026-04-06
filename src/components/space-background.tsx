const STARS = Array.from({ length: 54 }, (_, index) => ({
  left: `${4 + ((index * 17) % 92)}%`,
  top: `${6 + ((index * 23) % 82)}%`,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2.2 : 1.6,
  delay: `${(index % 12) * 0.28}s`,
  duration: `${3.1 + (index % 7) * 0.35}s`,
  sparkle: index % 4 === 0,
}));

const SHOOTING_STARS = [
  { left: "10%", top: "16%", delay: "0s", duration: "5.6s" },
  { left: "42%", top: "12%", delay: "1.8s", duration: "6.2s" },
  { left: "70%", top: "20%", delay: "3.2s", duration: "5.8s" },
  { left: "24%", top: "42%", delay: "4.4s", duration: "6.4s" },
  { left: "78%", top: "48%", delay: "2.6s", duration: "5.9s" },
];

export function SpaceBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.12),_transparent_0,_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(88,28,135,0.18),_transparent_0,_transparent_26%),linear-gradient(180deg,_#020817_0%,_#06101f_45%,_#030712_100%)]" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="absolute inset-0">
        {STARS.map((star, index) => (
          <span
            key={`${star.left}-${star.top}-${index}`}
            className={`space-star ${star.sparkle ? "space-star--sparkle" : ""}`}
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {SHOOTING_STARS.map((item, index) => (
          <span
            key={`${item.left}-${item.top}-${index}`}
            className="shooting-star"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
