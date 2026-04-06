import Link from "next/link";
import { NewsletterCard } from "@/components/newsletter-card";
import { PostCard } from "@/components/post-card";
import { getAllCategories, getFeaturedPosts, getLatestPosts, siteConfig, slugifyTaxonomy } from "@/lib/blog-data";
import { FEATURED_PAPERS, NEWSLETTER_COPY, TRENDING_TOPICS } from "@/lib/site-content";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts();
  const categories = getAllCategories();

  return (
    <div className="text-[#f0f0f0]">
      <section className="relative overflow-hidden border-b border-[#222222] pb-24 pt-20">
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

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in-up mb-6 text-[clamp(3rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight">
            Decoding <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-white via-[#e8e8e8] to-[#00f5ff] bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>
          <p className="animate-fade-in-up-delay-1 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#a0a0a0] sm:text-xl">
            {siteConfig.headline}
          </p>
          <div className="animate-fade-in-up-delay-2 mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="w-full rounded-sm bg-[#00f5ff] px-8 py-4 text-center font-bold text-[#0a0a0a] transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(0,245,255,0.45)] sm:w-auto"
            >
              Read Latest
            </Link>
            <Link
              href="/archive"
              className="w-full rounded-sm border border-[#00f5ff]/50 bg-transparent px-8 py-4 text-center font-bold text-[#00f5ff] transition-all duration-300 hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 sm:w-auto"
            >
              Explore Topics
            </Link>
          </div>
          <div className="animate-fade-in-up-delay-3 flex items-center justify-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#606060]">
            <span className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            {latestPosts.length} articles · {categories.length} categories · practical notes updated weekly
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-12 py-16 lg:flex-row">
        <div className="lg:w-3/4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
              <div className="h-[2px] w-16 bg-[#00f5ff]" />
            </div>
            <Link href="/blog">
              <span className="cursor-pointer text-sm font-medium text-[#00f5ff] underline-offset-4 decoration-[#00f5ff]/50 hover:underline">
                View All
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

          <NewsletterCard
            title={NEWSLETTER_COPY.title}
            description={NEWSLETTER_COPY.description}
            buttonLabel={NEWSLETTER_COPY.buttonLabel}
            placeholder={NEWSLETTER_COPY.placeholder}
          />

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
            <h3 className="mb-4 border-b border-[#222222] pb-2 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">
              Featured Papers
            </h3>
            <div className="space-y-5">
              {FEATURED_PAPERS.map((paper) => (
                <div key={paper.title} className="group">
                  <h4 className="mb-1 text-sm font-medium leading-snug text-[#f0f0f0] transition-colors group-hover:text-[#00f5ff]">
                    {paper.title}
                  </h4>
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
    </div>
  );
}
