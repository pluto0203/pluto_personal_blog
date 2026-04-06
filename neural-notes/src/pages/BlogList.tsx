import { Link, useParams } from "wouter";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { AbstractImage } from "@/components/shared/AbstractImage";

const posts = [
  { slug: "attention-mechanisms-transformers", title: "Understanding Attention Mechanisms in Transformers", tags: ["LLMs", "Research"], time: "12 min read", seed: 0, date: "Mar 28, 2026" },
  { slug: "prompt-engineering-production", title: "Prompt Engineering Patterns for Production Systems", tags: ["Prompting", "Tools"], time: "8 min read", seed: 1, date: "Mar 15, 2026" },
  { slug: "gpt4o-vs-claude-benchmark", title: "GPT-4o vs Claude 3.5: A Technical Benchmark Analysis", tags: ["AI", "Benchmarks"], time: "15 min read", seed: 2, date: "Mar 4, 2026" },
  { slug: "chain-of-thought-reasoning", title: "Chain-of-Thought Reasoning: Why It Works and When It Fails", tags: ["Research", "LLMs"], time: "10 min read", seed: 3, date: "Feb 20, 2026" },
  { slug: "rag-systems-production", title: "Building RAG Systems That Actually Work in Production", tags: ["Tools", "ML"], time: "11 min read", seed: 4, date: "Feb 8, 2026" },
  { slug: "alignment-problem", title: "The Alignment Problem: Current Approaches and Open Challenges", tags: ["AI", "Research"], time: "18 min read", seed: 5, date: "Jan 25, 2026" },
  { slug: "vector-embeddings-math", title: "The Mathematics of Vector Embeddings Explained", tags: ["Research", "ML"], time: "9 min read", seed: 0, date: "Jan 14, 2026" },
  { slug: "rlhf-new-finetuning", title: "Why RLHF is the New Fine-Tuning", tags: ["Research", "AI"], time: "7 min read", seed: 1, date: "Jan 3, 2026" },
];

export default function BlogList() {
  const params = useParams<{ cat?: string }>();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#00f5ff]" />
            <h1 className="text-3xl font-black tracking-tight">
              {params.cat
                ? params.cat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
                : "All Posts"
              }
            </h1>
          </div>
          <p className="text-[#606060] font-['JetBrains_Mono'] text-sm">
            {posts.length} articles · sorted by date
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", "AI", "LLMs", "Research", "Tools", "ML", "Prompting"].map(tag => (
            <Link key={tag} href={tag === "All" ? "/blog" : `/category/${tag.toLowerCase()}`}>
              <span className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                (!params.cat && tag === "All") || params.cat === tag.toLowerCase()
                  ? "bg-[#00f5ff] text-[#0a0a0a]"
                  : "bg-[#111111] border border-[#222222] text-[#a0a0a0] hover:text-[#00f5ff] hover:border-[#00f5ff]/50"
              }`}>
                {tag}
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/post/${post.slug}`}>
              <article className="group bg-[#111111] border border-white/[0.08] rounded-sm overflow-hidden hover:border-[#00f5ff]/30 hover:shadow-[0_0_24px_rgba(0,245,255,0.12)] hover:scale-[1.02] transition-all duration-300 flex flex-col cursor-pointer h-full">
                <AbstractImage seed={post.seed} />
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#606060]">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00f5ff] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-[#1a1a1a] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider text-[#39ff14] border border-[#39ff14]/30 rounded-full bg-[#39ff14]/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#00f5ff] shrink-0">{post.time}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
