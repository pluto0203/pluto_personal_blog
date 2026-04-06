import type { Metadata } from "next";
import { NewsletterCard } from "@/components/newsletter-card";
import { SocialLinks } from "@/components/social-links";
import { author } from "@/lib/blog-data";
import { ABOUT_STATS, ABOUT_TOPICS, NEWSLETTER_COPY } from "@/lib/site-content";

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
          <SocialLinks variant="pill" />
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
              {ABOUT_TOPICS.map((item) => (
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
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#a0a0a0]">{stat.label}</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[#00f5ff]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <NewsletterCard
            title={NEWSLETTER_COPY.title}
            description="New posts every two weeks. No spam."
            buttonLabel={NEWSLETTER_COPY.buttonLabel}
            placeholder={NEWSLETTER_COPY.placeholder}
          />
        </div>
      </div>
    </div>
  );
}
