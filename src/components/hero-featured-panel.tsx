const categories = [
  { name: "LLMs", count: 6, href: "/category/llms" },
  { name: "RAG Systems", count: 4, href: "/category/rag-systems" },
  { name: "Experiments", count: 8, href: "/category/experiments" },
  { name: "Mini Projects", count: 5, href: "/category/mini-projects" },
];

export default function HeroFeaturedPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f]/70 p-5 backdrop-blur-xl shadow-[0_24px_60px_rgba(15,23,42,0.28)] sm:p-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b5cf6]">Categories</p>
        <h2 className="text-2xl font-bold tracking-tight text-white">Categories</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#b7c2ce]">
          Explore what I’ve been building and researching
        </p>

        <div className="mt-5 space-y-2.5">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/10 hover:shadow-[0_0_22px_rgba(139,92,246,0.16)]"
            >
              <span className="text-sm font-medium text-[#e5ecf4] transition-colors duration-300 group-hover:text-white">{category.name}</span>
              <span className="rounded-full border border-[#60a5fa]/25 bg-[#60a5fa]/10 px-2.5 py-1 text-xs font-semibold text-[#93c5fd] transition-colors duration-300 group-hover:border-[#8b5cf6]/30 group-hover:bg-[#8b5cf6]/15 group-hover:text-[#ddd6fe]">
                {category.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="group relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050816] shadow-[0_24px_60px_rgba(3,7,18,0.45)]">
        <div className="absolute inset-0 bg-[url('/PlutoAI.jpg')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/70 to-[#030712]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.22),transparent_0,transparent_36%)]" />

        <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
          <span className="mb-3 inline-flex w-fit rounded-full border border-[#60a5fa]/30 bg-[#0f172a]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#93c5fd] backdrop-blur-sm">
            LATEST DROP
          </span>
          <h3 className="max-w-xs text-2xl font-black leading-tight text-white sm:text-[1.9rem]">
            Build things that actually run.
          </h3>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-[#a78bfa]/35 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(124,58,237,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#9f75ff] hover:to-[#8b5cf6] hover:shadow-[0_18px_40px_rgba(139,92,246,0.36)] sm:min-w-[140px] sm:flex-1"
            >
              <span className="whitespace-nowrap">View Projects</span>
            </a>
            <a
              href="/blog"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-[#08101f]/80 px-5 py-3 text-sm font-semibold text-[#e8eef7] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#60a5fa]/45 hover:bg-[#0f172a] hover:text-white sm:min-w-[140px] sm:flex-1"
            >
              <span className="whitespace-nowrap">Read Latest</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
