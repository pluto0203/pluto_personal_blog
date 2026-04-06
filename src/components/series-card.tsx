import Link from "next/link";
import type { Series } from "@/lib/blog-data";

export function SeriesCard({ item }: { item: Series }) {
  return (
    <article className="rounded-sm border border-white/[0.08] bg-[#111111] p-5 transition-all duration-300 hover:border-[#00f5ff]/30 hover:shadow-[0_0_24px_rgba(0,245,255,0.12)]">
      <div className="mb-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
        <span className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 px-2.5 py-1 font-bold text-[#39ff14]">
          {item.level}
        </span>
        <span className="rounded-full border border-[#222222] bg-[#0a0a0a] px-2.5 py-1 text-[#a0a0a0]">
          {item.cadence}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#a0a0a0]">{item.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-[#222222] pt-4 text-xs text-[#606060]">
        <span>{item.postSlugs.length} posts</span>
        <Link href={`/series/${item.slug}`} className="font-medium text-[#00f5ff] hover:text-white">
          View series →
        </Link>
      </div>
    </article>
  );
}
