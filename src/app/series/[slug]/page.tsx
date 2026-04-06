import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getPostsBySeries, getSeriesBySlug, series } from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return series.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);

  if (!item) {
    return { title: "Series not found" };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);

  if (!item) {
    notFound();
  }

  const posts = getPostsBySeries(item.slug);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-violet-200">{item.level}</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-300">{item.cadence}</span>
        </div>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{item.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{item.description}</p>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Posts in this series</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Lộ trình đọc</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
