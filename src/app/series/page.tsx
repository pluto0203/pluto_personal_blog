import type { Metadata } from "next";
import { SeriesCard } from "@/components/series-card";
import { series } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Series",
  description: "Reading paths grouped by AI and engineering themes.",
};

export default function SeriesPage() {
  return (
    <div className="py-4 sm:py-6">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 bg-[#00f5ff]" />
          <h1 className="text-3xl font-black tracking-tight text-[#f0f0f0]">Series</h1>
        </div>
        <p className="max-w-3xl font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#606060]">
          Structured reading paths for AI, LLM workflows and practical engineering notes.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        {series.map((item) => (
          <SeriesCard key={item.slug} item={item} />
        ))}
      </section>
    </div>
  );
}
