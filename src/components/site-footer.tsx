import Link from "next/link";
import { Logo } from "@/components/logo";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[#222222] bg-[#0a0a0a] pb-8 pt-16">
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#a0a0a0]">
            Exploring AI systems, large language models, and software engineering with research-grade depth and practitioner-grade clarity.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-[#f0f0f0]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#a0a0a0]">
            {[
              { label: "About the Author", href: "/about" },
              { label: "Research Archive", href: "/archive" },
              { label: "Latest Blog Posts", href: "/blog" },
              { label: "GitHub Repository", href: "https://github.com/pluto0203/pluto_personal_blog" },
            ].map((link) => (
              <li key={link.label}>
                {link.href.startsWith("http") ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#00f5ff]">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href}>
                    <span className="cursor-pointer transition-colors hover:text-[#00f5ff]">{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-[#f0f0f0]">Connect</h4>
          <div className="mb-4 flex gap-3">
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
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#111111] text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#606060]">Weekly posts on AI research and engineering</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-[#222222] px-4 pt-8 text-xs text-[#606060] sm:flex-row sm:px-6">
        <p>© 2026 Neural Notes. All rights reserved.</p>
        <p>Built with Next.js + Tailwind + GitHub Actions</p>
      </div>
    </footer>
  );
}
