import Image from "next/image";

export function Logo() {
  return (
    <div className="group cursor-pointer">
      <div className="h-11 w-11 overflow-hidden rounded-full border border-[#00f5ff]/35 bg-[#08111f] shadow-[0_0_18px_rgba(0,245,255,0.16)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-[#00f5ff]/60 group-hover:shadow-[0_0_24px_rgba(0,245,255,0.28)] sm:h-12 sm:w-12">
        <Image
          src="/PlutoAI.jpg"
          alt="Pluto AI logo"
          width={200}
          height={172}
          priority
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
