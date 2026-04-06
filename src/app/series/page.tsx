import type { Metadata } from "next";
import { SeriesCard } from "@/components/series-card";
import { series } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Series",
  description: "Danh sách các series bài viết về AI và engineering trên Pluto Notes.",
};

export default function SeriesPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-200">Series</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Nhóm bài viết theo hành trình học và build.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Mỗi series tập trung vào một trục kỹ năng rõ ràng để bạn có thể đọc theo flow thay vì xem từng bài rời rạc.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {series.map((item) => (
          <SeriesCard key={item.slug} item={item} />
        ))}
      </section>
    </div>
  );
}
