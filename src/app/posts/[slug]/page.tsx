import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { PostCard } from "@/components/post-card";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareActions } from "@/components/share-actions";
import { author, getAllPosts, getPostBySlug } from "@/lib/blog-data";
import { getPostHeadings } from "@/lib/content";

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
    return { title: "Not found" };
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

  const tocItems = getPostHeadings(post.content);
  const relatedPosts = getAllPosts().filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <header className="mx-auto max-w-4xl px-0 pb-10 pt-6 sm:px-0">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#606060]" aria-label="Breadcrumb">
          <Link href="/">
            <span className="cursor-pointer transition-colors hover:text-[#00f5ff]">Home</span>
          </Link>
          <span>/</span>
          <Link href="/blog">
            <span className="cursor-pointer transition-colors hover:text-[#00f5ff]">Blog</span>
          </Link>
          <span>/</span>
          <span className="text-[#a0a0a0]">{post.category}</span>
        </nav>

        <span className="mb-6 inline-block rounded-sm border border-[#c026d3]/30 bg-[#c026d3]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#c026d3]">
          {post.category}
        </span>

        <h1 className="animate-fade-in-up mb-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#a0a0a0]">{post.description}</p>

        <div className="flex flex-col justify-between gap-4 border-b border-t border-[#222222] py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#1a1a1a] text-xs font-bold text-[#00f5ff]">
              {author.initials}
            </div>
            <div>
              <div className="text-sm font-bold">{author.name}</div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#a0a0a0]">{post.dateLabel}</span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#00f5ff]">{post.readTime}</span>
              </div>
            </div>
          </div>

          <ShareActions />
        </div>
      </header>

      <div className="mx-auto mb-14 max-w-5xl">
        <div
          className="relative h-48 w-full overflow-hidden rounded-sm border border-white/[0.05] bg-[#111111] sm:h-72 md:h-80"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,245,255,0.08) 0%, transparent 70%)" }}
        >
          <svg className="absolute inset-0 h-full w-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="large-grid-post" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#large-grid-post)" />
            <path d="M 80 200 C 280 60, 480 340, 760 160" fill="none" stroke="#c026d3" strokeWidth="2" opacity="0.5" />
            <path d="M 120 240 C 360 100, 560 300, 880 120" fill="none" stroke="#39ff14" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
            <circle cx="50%" cy="50%" r="90" fill="none" stroke="#00f5ff" strokeWidth="1" opacity="0.2" />
            <circle cx="50%" cy="50%" r="45" fill="none" stroke="#00f5ff" strokeWidth="1.5" opacity="0.4" />
            <circle cx="50%" cy="50%" r="15" fill="rgba(0,245,255,0.2)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 pb-24 lg:flex-row">
        <aside className="hidden w-48 shrink-0 lg:block">
          <div className="sticky top-24">
            <h4 className="mb-4 border-b border-[#222222] pb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest text-[#00f5ff]">
              Contents
            </h4>
            <ul className="space-y-3 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block border-l-2 border-transparent py-0.5 text-[13px] text-[#606060] transition-all hover:border-[#333] hover:text-[#a0a0a0] ${
                      item.level === 3 ? "pl-6" : "pl-3"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="max-w-[720px] min-w-0 flex-1">
          <p className="mb-8 text-lg leading-relaxed text-[#b0b0b0]">{post.excerpt}</p>

          <div className="min-w-0">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </article>

        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="mb-5 border-b border-[#222222] pb-2 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">Related</h4>
              <div className="space-y-5">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/post/${related.slug}`}>
                    <div className="group cursor-pointer">
                      <h5 className="mb-1.5 line-clamp-2 text-xs font-bold leading-snug text-[#d0d0d0] transition-colors group-hover:text-[#00f5ff]">
                        {related.title}
                      </h5>
                      <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px]">
                        <span className="text-[#39ff14]">{related.category}</span>
                        <span className="text-[#606060]">{related.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#222222] pt-5">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#606060]">Share</h4>
              <ShareActions compact />
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-[#222222] bg-[#0a0a0a] py-14">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 text-center text-2xl font-bold tracking-tight">You May Also Like</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {relatedPosts.map((related) => (
              <PostCard key={related.slug} post={related} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
