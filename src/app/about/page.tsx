import type { Metadata } from "next";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { author } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "About",
  description: "About the author and the editorial direction behind Neural Notes.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-16 flex flex-col items-start gap-8 border-b border-[#222222] pb-16 sm:flex-row">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#00f5ff]/30 bg-gradient-to-br from-[#00f5ff]/20 to-[#c026d3]/20 text-2xl font-black text-[#00f5ff] font-[family-name:var(--font-oxanium)]">
          {author.initials}
        </div>
        <div>
          <h1 className="mb-2 text-3xl font-black tracking-tight sm:text-4xl">{author.name}</h1>
          <p className="mb-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#00f5ff]">{author.role}</p>
          <p className="mb-6 max-w-2xl leading-relaxed text-[#a0a0a0]">
            Tôi viết về AI, LLM workflow, software engineering và cách biến side project thành thứ có thể demo, đo lường và deploy gọn gàng. Mục tiêu của blog này là làm cho các ý tưởng kỹ thuật trở nên rõ ràng nhưng vẫn đủ chiều sâu để hữu ích với người đang build thật.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: GitHubIcon, label: "GitHub", href: "https://github.com/pluto0203" },
              { icon: XIcon, label: "X / Twitter", href: "https://twitter.com" },
              { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-sm border border-[#222222] bg-[#111111] px-4 py-2 text-sm text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-8 text-[#d0d0d0] md:col-span-2">
          <section>
            <h2 className="mb-4 border-l-4 border-[#00f5ff] pl-4 text-xl font-black text-white">About This Blog</h2>
            <p className="mb-4 leading-relaxed">
              Neural Notes là nơi mình viết về AI và machine learning theo cách mình ước đã có khi mới học: không quá hàn lâm để khó tiếp cận, nhưng cũng không đơn giản hoá đến mức mất giá trị thực tế.
            </p>
            <p className="leading-relaxed">
              Nội dung thường xoay quanh transformer architecture, prompt engineering, evaluation, RAG, CI/CD cho side projects và những workflow giúp một ý tưởng nhỏ trở thành sản phẩm có thể dùng được.
            </p>
          </section>

          <section>
            <h2 className="mb-4 border-l-4 border-[#00f5ff] pl-4 text-xl font-black text-white">What I Write About</h2>
            <ul className="space-y-2">
              {[
                "LLM architecture and model behavior",
                "Prompt engineering for production systems",
                "RAG, embeddings, and semantic search",
                "Evaluation and benchmarking for LLM apps",
                "Practical ML tooling and CI/CD workflows",
                "Developer experience for solo builders",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#39ff14]">→</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          <div className="rounded-sm border border-[#222222] bg-[#111111] p-5">
            <h3 className="mb-4 font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-widest text-[#606060]">Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Articles", value: "6" },
                { label: "Words Written", value: "24k+" },
                { label: "Years Active", value: "1" },
                { label: "Categories", value: "6" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#a0a0a0]">{stat.label}</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[#00f5ff]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-[#222222] bg-[#111111] p-5">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#00f5ff] to-[#c026d3]" />
            <h3 className="mb-1 text-sm font-bold text-white">Join the Neural Network</h3>
            <p className="mb-4 text-xs text-[#a0a0a0]">New posts every two weeks. No spam.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="hello@world.com"
                className="w-full rounded-sm border border-[#222222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#444] transition-colors focus:border-[#00f5ff] focus:outline-none"
              />
              <button className="w-full rounded-sm bg-[#1a1a1a] py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#0a0a0a]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
