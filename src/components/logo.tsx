import Image from "next/image";

export function Logo() {
  return (
    <div className="group cursor-pointer rounded-sm">
      <Image
        src="/PlutoAI.jpg"
        alt="Pluto AI logo"
        width={600}
        height={516}
        priority
        unoptimized
        className="h-12 w-auto object-contain mix-blend-screen brightness-110 contrast-125 saturate-110 transition-all duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_14px_rgba(0,245,255,0.35)] sm:h-13"
      />
    </div>
  );
}
