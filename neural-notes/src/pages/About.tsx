import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start gap-8 mb-16 pb-16 border-b border-[#222222]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#c026d3]/20 border border-[#00f5ff]/30 flex items-center justify-center text-2xl font-black text-[#00f5ff] font-['Oxanium'] shrink-0">
            AC
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Alex Chen</h1>
            <p className="text-[#00f5ff] font-['JetBrains_Mono'] text-sm mb-4">AI Researcher · Engineer · Writer</p>
            <p className="text-[#a0a0a0] leading-relaxed max-w-2xl mb-6">
              ML engineer and researcher with 8 years of experience building production AI systems. Previously at DeepMind and Anthropic. Writing about the intersection of research and engineering — with a focus on making complex ideas accessible without dumbing them down.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Twitter, label: "X / Twitter", href: "https://twitter.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-[#222222] rounded-sm text-sm text-[#a0a0a0] hover:text-[#00f5ff] hover:border-[#00f5ff]/50 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8 text-[#d0d0d0] leading-relaxed">
            <section>
              <h2 className="text-xl font-black text-white mb-4 border-l-4 border-[#00f5ff] pl-4">About This Blog</h2>
              <p className="mb-4">
                Neural Notes is where I write about AI and machine learning with the depth I wish existed when I was learning these topics. Most blog posts either oversimplify to the point of uselessness or are so dense with notation that they're inaccessible to practitioners.
              </p>
              <p>
                My goal is to find the middle ground: rigorous enough to be useful to someone building real systems, but clear enough that you don't need a PhD to follow along. I cover transformer architecture, large language model internals, prompt engineering at scale, and emerging research that I think is underrated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white mb-4 border-l-4 border-[#00f5ff] pl-4">What I Write About</h2>
              <ul className="space-y-2">
                {[
                  "LLM architecture and training dynamics",
                  "Prompt engineering for production systems",
                  "RAG, embeddings, and semantic search",
                  "Model evaluation and benchmarking",
                  "AI alignment and safety research",
                  "Practical ML infrastructure and tooling",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#39ff14] font-['JetBrains_Mono'] text-sm mt-0.5 shrink-0">→</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            {/* Stats */}
            <div className="p-5 bg-[#111111] border border-[#222222] rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#606060] mb-4 font-['JetBrains_Mono']">Stats</h3>
              <div className="space-y-3">
                {[
                  { label: "Articles", value: "42" },
                  { label: "Words Written", value: "1.2M" },
                  { label: "Years Active", value: "3" },
                  { label: "Categories", value: "6" },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-[#a0a0a0]">{stat.label}</span>
                    <span className="font-['JetBrains_Mono'] text-[#00f5ff] font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-5 bg-[#111111] border border-[#222222] rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f5ff] to-[#c026d3]" />
              <h3 className="font-bold text-white mb-1 text-sm">Join the Neural Network</h3>
              <p className="text-xs text-[#a0a0a0] mb-4">New posts every two weeks. No spam.</p>
              <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="hello@world.com"
                  className="w-full bg-[#0a0a0a] border border-[#222222] rounded-sm px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00f5ff] transition-colors"
                />
                <button className="w-full bg-[#1a1a1a] hover:bg-[#00f5ff] hover:text-[#0a0a0a] text-white font-bold text-sm py-2 rounded-sm transition-all duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
