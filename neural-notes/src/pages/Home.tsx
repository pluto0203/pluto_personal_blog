import { Link } from "wouter";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { AbstractImage } from "@/components/shared/AbstractImage";

const posts = [
  { slug: "attention-mechanisms-transformers", title: "Understanding Attention Mechanisms in Transformers", tags: ["LLMs", "Research"], time: "12 min read", seed: 0 },
  { slug: "prompt-engineering-production", title: "Prompt Engineering Patterns for Production Systems", tags: ["Prompting", "Tools"], time: "8 min read", seed: 1 },
  { slug: "gpt4o-vs-claude-benchmark", title: "GPT-4o vs Claude 3.5: A Technical Benchmark Analysis", tags: ["AI", "Benchmarks"], time: "15 min read", seed: 2 },
  { slug: "chain-of-thought-reasoning", title: "Chain-of-Thought Reasoning: Why It Works and When It Fails", tags: ["Research", "LLMs"], time: "10 min read", seed: 3 },
  { slug: "rag-systems-production", title: "Building RAG Systems That Actually Work in Production", tags: ["Tools", "ML"], time: "11 min read", seed: 4 },
  { slug: "alignment-problem", title: "The Alignment Problem: Current Approaches and Open Challenges", tags: ["AI", "Research"], time: "18 min read", seed: 5 },
];

function PostCard({ post }: { post: typeof posts[0] }) {
  return (
    <Link href={`/post/${post.slug}`}>
      <article className="group bg-[#111111] border border-white/[0.08] rounded-sm overflow-hidden hover:border-[#00f5ff]/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.12)] hover:scale-[1.02] transition-all duration-300 flex flex-col cursor-pointer h-full">
        <AbstractImage seed={post.seed} />
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-[15px] font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00f5ff] transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-[#a0a0a0] text-sm mb-6 line-clamp-2 leading-relaxed">
            A deep dive into the underlying architecture and the mathematical foundations that make this work incredibly well in modern systems.
          </p>
          <div className="mt-auto pt-4 border-t border-[#222222] flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider text-[#39ff14] border border-[#39ff14]/30 rounded-full bg-[#39ff14]/5">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-['JetBrains_Mono'] text-xs text-[#00f5ff]">{post.time}</span>
              <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[10px] font-bold text-[#00f5ff] shrink-0">
                AC
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 overflow-hidden border-b border-[#222222]">
        {/* Animated grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
            Decoding{" "}<br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8e8e8] to-[#00f5ff]">
              Intelligence
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
            Exploring AI systems, large language models, and the architecture of machine cognition. Research-grade depth, practitioner-grade clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up-delay-2">
            <Link href="/blog">
              <button className="px-8 py-4 bg-[#00f5ff] text-[#0a0a0a] font-bold rounded-sm hover:bg-white hover:shadow-[0_0_24px_rgba(0,245,255,0.45)] transition-all duration-300 w-full sm:w-auto cursor-pointer">
                Read Latest
              </button>
            </Link>
            <Link href="/blog">
              <button className="px-8 py-4 bg-transparent border border-[#00f5ff]/50 text-[#00f5ff] font-bold rounded-sm hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] transition-all duration-300 w-full sm:w-auto cursor-pointer">
                Explore Topics
              </button>
            </Link>
          </div>
          <div className="font-['JetBrains_Mono'] text-sm text-[#606060] flex items-center justify-center gap-2 animate-fade-in-up-delay-3">
            <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
            42 articles · 6 categories · 1.2M words processed
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Posts grid */}
        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
              <div className="h-[2px] w-16 bg-[#00f5ff]" />
            </div>
            <Link href="/blog">
              <span className="text-[#00f5ff] text-sm font-medium hover:underline decoration-[#00f5ff]/50 underline-offset-4 cursor-pointer">
                View All
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-10">
          {/* Trending */}
          <div>
            <h3 className="text-xs font-bold text-[#f0f0f0] uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c026d3] shrink-0" />
              Trending This Week
            </h3>
            <ul className="space-y-4">
              {[
                "Why RLHF is the new fine-tuning",
                "Deploying VLLMs on consumer hardware",
                "The mathematics of vector embeddings",
              ].map((title, i) => (
                <li key={i} className="flex gap-4 group cursor-pointer">
                  <span className="font-['JetBrains_Mono'] text-[#00f5ff] font-bold text-base mt-[-2px] shrink-0">0{i + 1}</span>
                  <span className="text-[#a0a0a0] text-sm group-hover:text-white transition-colors leading-snug">{title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="p-5 bg-[#111111] border border-[#222222] rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f5ff] to-[#c026d3]" />
            <h3 className="font-bold text-white mb-1 text-sm">Join the Neural Network</h3>
            <p className="text-xs text-[#a0a0a0] mb-4">Deep research, delivered bi-weekly. No spam.</p>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="hello@world.com"
                className="w-full bg-[#0a0a0a] border border-[#222222] rounded-sm px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00f5ff] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#1a1a1a] hover:bg-[#00f5ff] hover:text-[#0a0a0a] text-white font-bold text-sm py-2 rounded-sm transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-[#f0f0f0] uppercase tracking-widest mb-4">Explore Topics</h3>
            <div className="flex flex-wrap gap-2">
              {["AI", "LLMs", "Machine Learning", "Research", "Prompt Engineering", "Tools", "Neural Nets"].map(tag => (
                <Link key={tag} href={`/category/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="px-3 py-1 bg-[#111111] border border-[#222222] rounded-sm text-xs text-[#a0a0a0] hover:text-[#00f5ff] hover:border-[#00f5ff]/50 transition-colors cursor-pointer">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Papers */}
          <div>
            <h3 className="text-xs font-bold text-[#f0f0f0] uppercase tracking-widest mb-4 border-b border-[#222222] pb-2">Featured Papers</h3>
            <div className="space-y-5">
              {[
                { title: "Attention Is All You Need", arxiv: "1706.03762", date: "Jun 2017" },
                { title: "Language Models are Few-Shot Learners", arxiv: "2005.14165", date: "May 2020" },
              ].map((paper, i) => (
                <div key={i} className="group">
                  <h4 className="text-sm font-medium text-[#f0f0f0] group-hover:text-[#00f5ff] transition-colors mb-1 leading-snug">{paper.title}</h4>
                  <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-[10px] text-[#606060]">
                    <a
                      href={`https://arxiv.org/abs/${paper.arxiv}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#39ff14] hover:underline"
                    >
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

      <Footer />
    </div>
  );
}
