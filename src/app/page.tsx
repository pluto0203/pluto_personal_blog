import Link from "next/link";
import HeroFeaturedPanel from "@/components/hero-featured-panel";
import { PostCard } from "@/components/post-card";
import { getAllCategories, getAllPosts, getFeaturedPosts, siteConfig, slugifyTaxonomy } from "@/lib/blog-data";
import { CATEGORY_GUIDE, FEATURED_PAPERS, HERO_PILLS, PROJECT_SHOWCASE, TRENDING_TOPICS } from "@/lib/site-content";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const latestPosts = allPosts.slice(0, 6);
  const newestPost = latestPosts[0];
  const categories = getAllCategories();

  const articleCountByCategory = Object.fromEntries(
    categories.map((category) => [slugifyTaxonomy(category), allPosts.filter((post) => post.category === category).length]),
  );

  return (
    <div className="text-[#f0f0f0]">
      <section className="relative overflow-hidden border-b border-[#222222] pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <svg className="h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
            <circle cx="256" cy="180" r="4" fill="#00f5ff" style={{ animation: "pulse-node 4s ease-in-out infinite" }} />
            <circle cx="1024" cy="280" r="4" fill="#39ff14" style={{ animation: "pulse-node 5s ease-in-out infinite 1s" }} />
            <circle cx="768" cy="112" r="4" fill="#c026d3" style={{ animation: "pulse-node 3s ease-in-out infinite 2s" }} />
            <circle cx="448" cy="368" r="3" fill="#00f5ff" style={{ animation: "pulse-node 6s ease-in-out infinite 0.5s" }} />
            <path d="M 256 180 L 768 112" stroke="#00f5ff" strokeWidth="1" strokeDasharray="5 5" opacity="0.6" style={{ animation: "flow-line 18s linear infinite" }} />
            <path d="M 1024 280 L 768 112" stroke="#c026d3" strokeWidth="1" strokeDasharray="5 5" opacity="0.6" style={{ animation: "flow-line 14s linear infinite reverse" }} />
            <path d="M 448 368 L 1024 280" stroke="#39ff14" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" style={{ animation: "flow-line 22s linear infinite 3s" }} />
          </svg>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(0,245,255,0.04) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00f5ff]/25 bg-[#00f5ff]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00f5ff]">
              Pluto AI • dev log for builders
            </span>
            <h1 className="animate-fade-in-up mb-5 text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.02] tracking-tight text-white">
                 AI Tập Sự
              <span className="bg-gradient-to-r from-white via-[#e8e8e8] to-[#00f5ff] bg-clip-text text-transparent">  Zero to Hero</span>
            </h1>
            <p className="animate-fade-in-up-delay-1 mb-4 max-w-3xl text-lg leading-8 text-[#b7c2ce] sm:text-[1.18rem]">
              {siteConfig.headline}
            </p>
            <p className="animate-fade-in-up-delay-1 mb-8 max-w-2xl text-base leading-7 text-[#a0a0a0] sm:text-lg">{siteConfig.description}</p>

            <div className="animate-fade-in-up-delay-2 mb-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href={newestPost ? `/post/${newestPost.slug}` : "/blog"}
                className="w-full rounded-sm bg-[#00f5ff] px-7 py-3.5 text-center font-bold text-[#0a0a0a] transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(0,245,255,0.45)] sm:w-auto"
              >
                Xem bài mới nhất
              </Link>
              <Link
                href="/about"
                className="w-full rounded-sm border border-[#00f5ff]/50 bg-transparent px-7 py-3.5 text-center font-bold text-[#00f5ff] transition-all duration-300 hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 sm:w-auto"
              >
                About me
              </Link>
            </div>

            <div className="animate-fade-in-up-delay-3 flex flex-wrap gap-2">
              {HERO_PILLS.map((pill) => (
                <span key={pill} className="rounded-full border border-[#222222] bg-[#111111] px-3 py-1 text-xs text-[#a0a0a0]">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <HeroFeaturedPanel />
        </div>
      </section>

      <section className="mx-auto max-w-7xl py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.24em] text-[#00f5ff]">Content map</p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Explore by category</h2>
          </div>
          <Link href="/blog#search" className="text-sm font-medium text-[#00f5ff] underline-offset-4 hover:underline">
            Mở search & filters
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORY_GUIDE.map((item) => (
            <Link key={item.slug} href={`/category/${item.slug}`}>
              <article className="h-full rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00f5ff]/30 hover:shadow-[0_0_24px_rgba(0,245,255,0.12)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className="rounded-full border border-[#222222] px-2.5 py-1 text-[11px] text-[#00f5ff]">
                    {articleCountByCategory[item.slug] ?? 0} bài
                  </span>
                </div>
                <p className="text-sm leading-6 text-[#a0a0a0]">{item.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-12 py-8 lg:flex-row">
        <div className="lg:w-3/4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-white">Bài mới & đáng đọc</h2>
              <div className="h-[2px] w-16 bg-[#00f5ff]" />
            </div>
            <Link href="/blog">
              <span className="cursor-pointer text-sm font-medium text-[#00f5ff] underline-offset-4 decoration-[#00f5ff]/50 hover:underline">
                Xem tất cả
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="space-y-10 lg:w-1/4">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">
              <span className="h-2 w-2 shrink-0 bg-[#c026d3]" />
              Trending This Week
            </h3>
            <ul className="space-y-4">
              {TRENDING_TOPICS.map((title, index) => (
                <li key={title} className="group flex cursor-pointer gap-4">
                  <span className="mt-[-2px] shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-base font-bold text-[#00f5ff]">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-snug text-[#a0a0a0] transition-colors group-hover:text-white">{title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-[#222222] bg-[#111111] p-5">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#00f5ff] to-[#c026d3]" />
            <h3 className="mb-1 text-sm font-bold text-white">Tìm bài nhanh hơn</h3>
            <p className="mb-4 text-sm leading-6 text-[#a0a0a0]">Search bar + tag cloud đã có trong trang blog để bạn lọc đúng chủ đề mình đang học.</p>
            <Link href="/blog#search" className="inline-flex rounded-sm bg-[#1a1a1a] px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#0a0a0a]">
              Mở bộ lọc
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">Explore Topics</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((tag) => (
                <Link key={tag} href={`/category/${slugifyTaxonomy(tag)}`}>
                  <span className="cursor-pointer rounded-sm border border-[#222222] bg-[#111111] px-3 py-1 text-xs text-[#a0a0a0] transition-colors hover:border-[#00f5ff]/50 hover:text-[#00f5ff]">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 border-b border-[#222222] pb-2 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">Featured Papers</h3>
            <div className="space-y-5">
              {FEATURED_PAPERS.map((paper) => (
                <div key={paper.title} className="group">
                  <h4 className="mb-1 text-sm font-medium leading-snug text-[#f0f0f0] transition-colors group-hover:text-[#00f5ff]">{paper.title}</h4>
                  <div className="flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#606060]">
                    <a href={`https://arxiv.org/abs/${paper.arxiv}`} target="_blank" rel="noreferrer" className="text-[#39ff14] hover:underline">
                      arXiv:{paper.arxiv}
                    </a>
                    <span>·</span>
                    <span>{paper.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="projects" className="border-t border-[#222222] py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.24em] text-[#39ff14]">Projects / Demos</p>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Mini-projects đang được build song song với blog</h2>
            </div>
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#00f5ff] underline-offset-4 hover:underline">
              Xem GitHub profile
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {PROJECT_SHOWCASE.map((project) => (
              <article key={project.title} className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <span className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/8 px-2.5 py-1 text-[11px] text-[#39ff14]">{project.status}</span>
                </div>
                <p className="mb-4 text-sm leading-6 text-[#a0a0a0]">{project.description}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-[#222222] bg-[#0a0a0a] px-2.5 py-1 text-[11px] text-[#a0a0a0]">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-3">
                  <a href={project.sourceHref} target="_blank" rel="noreferrer" className="rounded-sm bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#00f5ff] hover:text-[#0a0a0a]">
                    {project.sourceLabel}
                  </a>
                  {project.demoHref ? (
                    <a href={project.demoHref} target="_blank" rel="noreferrer" className="rounded-sm border border-[#00f5ff]/40 px-4 py-2 text-sm font-semibold text-[#00f5ff] transition-colors hover:bg-[#00f5ff]/10">
                      {project.demoLabel ?? "Live demo"}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
