const STARS = [
  { left: "6%", top: "12%", size: 2, delay: "0s", duration: "3.6s" },
  { left: "14%", top: "28%", size: 3, delay: "0.8s", duration: "4.1s" },
  { left: "22%", top: "8%", size: 2, delay: "1.1s", duration: "5s" },
  { left: "30%", top: "22%", size: 2, delay: "0.5s", duration: "4.5s" },
  { left: "38%", top: "14%", size: 3, delay: "1.7s", duration: "3.9s" },
  { left: "45%", top: "32%", size: 2, delay: "0.2s", duration: "4.8s" },
  { left: "54%", top: "10%", size: 2, delay: "1.5s", duration: "4.2s" },
  { left: "61%", top: "26%", size: 3, delay: "0.4s", duration: "5.3s" },
  { left: "68%", top: "16%", size: 2, delay: "2s", duration: "4.1s" },
  { left: "76%", top: "30%", size: 2, delay: "0.9s", duration: "3.7s" },
  { left: "84%", top: "12%", size: 3, delay: "1.4s", duration: "4.9s" },
  { left: "90%", top: "24%", size: 2, delay: "0.6s", duration: "5.2s" },
  { left: "9%", top: "48%", size: 2, delay: "1.9s", duration: "4.6s" },
  { left: "18%", top: "62%", size: 3, delay: "0.3s", duration: "4.2s" },
  { left: "28%", top: "54%", size: 2, delay: "1.2s", duration: "4.8s" },
  { left: "36%", top: "70%", size: 2, delay: "0.7s", duration: "3.9s" },
  { left: "48%", top: "58%", size: 3, delay: "1.6s", duration: "5.1s" },
  { left: "57%", top: "74%", size: 2, delay: "0.5s", duration: "4.7s" },
  { left: "66%", top: "52%", size: 2, delay: "1.3s", duration: "3.8s" },
  { left: "74%", top: "68%", size: 3, delay: "0.1s", duration: "5s" },
  { left: "83%", top: "60%", size: 2, delay: "1.8s", duration: "4.4s" },
  { left: "92%", top: "78%", size: 2, delay: "0.9s", duration: "4.9s" },
];

const SHOOTING_STARS = [
  { left: "12%", top: "18%", delay: "0s", duration: "8s" },
  { left: "58%", top: "14%", delay: "2.5s", duration: "10s" },
  { left: "78%", top: "34%", delay: "5.2s", duration: "9s" },
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
            className="space-star"
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
