import Image from "next/image";

export function Logo() {
  return (
    <div className="group cursor-pointer">
      <Image
        src="/PlutoAI.jpg"
        alt="Pluto AI logo"
        width={600}
        height={516}
        priority
        className="h-11 w-auto rounded-sm object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_18px_rgba(0,245,255,0.35)] sm:h-12"
      />
    </div>
  );
}
