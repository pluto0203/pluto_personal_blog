import Link from "next/link";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { FOOTER_LINKS } from "@/lib/site-content";

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
          <p className="mt-3 text-xs text-[#606060]">RSS, newsletter và GitHub Discussions đều đã sẵn sàng.</p>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-[#f0f0f0]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#a0a0a0]">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
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
            <SocialLinks />
          </div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#606060]">Weekly posts on AI research and engineering</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-[#222222] px-4 pt-8 text-xs text-[#606060] sm:flex-row sm:px-6">
        <p>© 2026 Pluto AI. All rights reserved.</p>
        <p>Built with Next.js + Tailwind + GitHub Actions</p>
      </div>
    </footer>
  );
}
