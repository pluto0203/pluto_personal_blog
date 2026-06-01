import Link from "next/link";
import { siteConfig } from "@/lib/blog-data";
import { PROJECT_SHOWCASE } from "@/lib/site-content";

const quickStartCommands = [
  "git clone https://github.com/pluto0203/pluto_personal_blog.git Pluto_Personal_Blog",
  "cd Pluto_Personal_Blog",
  "npm install",
  "npm run dev",
];

const releaseCommands = ["npm run lint", "npm run typecheck", "npm run build", "npm run preview"];

const quickStartSteps = [
  "Clone repo từ GitHub vào máy local.",
  "Cài dependencies bằng npm và chạy dev server ở cổng 3001.",
  "Mở browser tại http://localhost:3001 để xem giao diện thực tế.",
  "Trước khi publish, chạy build/check để đảm bảo static export hoạt động ổn định.",
];

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 text-[#f0f0f0]">
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#08101f]/80 p-6 shadow-[0_24px_60px_rgba(3,7,18,0.32)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,255,0.12),transparent_0,transparent_35%)]" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.24em] text-[#39ff14]">Demo hub</p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">GitHub projects + cách chạy thực tế</h1>
            <p className="mt-3 text-sm leading-7 text-[#b7c2ce] sm:text-base">
              Trang này gom những project đang build in public, link GitHub, và quick-start flow để có thể clone về chạy local nhanh.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl bg-[#00f5ff] px-4 py-2.5 text-sm font-semibold text-[#04111f] transition-colors hover:bg-white"
            >
              Open GitHub
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl border border-[#00f5ff]/35 px-4 py-2.5 text-sm font-semibold text-[#00f5ff] transition-colors hover:bg-[#00f5ff]/10"
            >
              Read build logs
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">Featured projects</h2>
          <div className="h-[2px] w-16 bg-[#00f5ff]" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PROJECT_SHOWCASE.map((project) => (
            <article key={project.title} className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <span className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/8 px-2.5 py-1 text-[11px] text-[#39ff14]">{project.status}</span>
              </div>

              <p className="mb-4 text-sm leading-6 text-[#a0a0a0]">{project.description}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-[#222222] bg-[#0a0a0a] px-2.5 py-1 text-[11px] text-[#a0a0a0]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mb-4 rounded-2xl border border-white/[0.06] bg-[#0a0f18] p-3">
                <p className="mb-1 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.24em] text-[#8b5cf6]">Run note</p>
                <p className="text-sm leading-6 text-[#c4ced8]">
                  {project.title === "Pluto Personal Blog"
                    ? "Có thể clone và chạy ngay bằng npm install + npm run dev trên port 3001."
                    : "Repo đang được build dần trên GitHub; setup note chi tiết sẽ được bổ sung khi demo public ổn định."}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={project.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#00f5ff] hover:text-[#0a0a0a]"
                >
                  {project.sourceLabel}
                </a>
                {project.demoHref ? (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-[#00f5ff]/40 px-4 py-2 text-sm font-semibold text-[#00f5ff] transition-colors hover:bg-[#00f5ff]/10"
                  >
                    {project.demoLabel ?? "Live demo"}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <article className="rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-5 sm:p-6">
          <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.24em] text-[#00f5ff]">How to run</p>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Pluto Personal Blog local quick start</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-[#c4ced8]">
            {quickStartSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[11px] font-bold text-[#00f5ff]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#1f2937] bg-[#050816] p-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#dbe7f3]">
            <pre>{quickStartCommands.join("\n")}</pre>
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-5 sm:p-6">
          <p className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.24em] text-[#39ff14]">Before publish</p>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Recommended verification flow</h2>
          <p className="mt-3 text-sm leading-6 text-[#a0a0a0]">
            Nếu muốn chạy gần với production hơn, dùng bộ lệnh bên dưới để lint, type-check, build static export rồi preview local.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#1f2937] bg-[#050816] p-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#dbe7f3]">
            <pre>{releaseCommands.join("\n")}</pre>
          </div>

          <div className="mt-5 rounded-2xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/8 p-4 text-sm leading-6 text-[#d8ccff]">
            Các demo khác hiện đang build in public. Khi repo tách riêng và ổn định hơn, phần README/run guide sẽ được cập nhật trực tiếp từ GitHub.
          </div>
        </article>
      </section>
    </div>
  );
}
