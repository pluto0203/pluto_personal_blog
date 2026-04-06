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
    <div className="space-y-8 py-4 sm:py-6">
      <section className="rounded-sm border border-[#222222] bg-[#111111] p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
          <span className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 px-2.5 py-1 font-bold text-[#39ff14]">{item.level}</span>
          <span className="rounded-full border border-[#222222] bg-[#0a0a0a] px-2.5 py-1 text-[#a0a0a0]">{item.cadence}</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{item.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-[#a0a0a0]">{item.description}</p>
      </section>

      <section className="space-y-4">
        <div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm uppercase tracking-[0.24em] text-[#606060]">
            Posts in this series
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Reading path</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
