import Link from "next/link";
import type { Series } from "@/lib/blog-data";

export function SeriesCard({ item }: { item: Series }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-cyan-950/10">
      <div className="mb-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-violet-200">
          {item.level}
        </span>
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-300">
          {item.cadence}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
      <p className="mt-4 text-sm text-slate-400">{item.postSlugs.length} bài trong series này</p>

      <Link
        href={`/series/${item.slug}`}
        className="mt-5 inline-flex text-sm font-medium text-cyan-200 hover:text-cyan-100"
      >
        Xem series →
      </Link>
    </article>
  );
}
