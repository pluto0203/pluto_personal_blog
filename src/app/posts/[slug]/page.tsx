import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { ReadingProgress } from "@/components/reading-progress";
import { getAllPosts, getPostBySlug, getPostsBySeries } from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (post.seriesSlug ? getPostsBySeries(post.seriesSlug) : getAllPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <ReadingProgress />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="space-y-8">
          <header className="rounded-[28px] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{post.description}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              {post.seriesSlug ? (
                <>
                  <span>•</span>
                  <Link href={`/series/${post.seriesSlug}`} className="text-cyan-200 hover:text-cyan-100">
                    Thuộc series
                  </Link>
                </>
              ) : null}
            </div>
          </header>

          <div className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
            {post.body.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`} className="space-y-3 scroll-mt-24">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-slate-300">
                    {paragraph}
                  </p>
                ))}
                {section.code ? (
                  <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-sm text-cyan-100">
                    <code>{section.code}</code>
                  </pre>
                ) : null}
                {section.note ? (
                  <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-violet-100">
                    {section.note}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <section className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Related</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Đọc tiếp</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedPosts.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        </article>

        <aside className="h-fit rounded-[24px] border border-white/10 bg-slate-950/70 p-4 lg:sticky lg:top-24">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">On this page</p>
          <nav className="mt-4 space-y-2 text-sm">
            {post.body.map((section, index) => (
              <a
                key={section.title}
                href={`#section-${index + 1}`}
                className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
