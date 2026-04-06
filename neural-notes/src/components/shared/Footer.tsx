import { Link } from "wouter";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-[#0a0a0a] pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
        <div>
          <Link href="/"><Logo /></Link>
          <p className="mt-4 text-[#a0a0a0] font-['Inter'] text-sm leading-relaxed max-w-xs">
            Exploring AI systems, large language models, and the architecture of machine cognition. Research-grade depth, practitioner-grade clarity.
          </p>
        </div>
        <div>
          <h4 className="font-['Inter'] font-bold text-[#f0f0f0] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-[#a0a0a0] font-['Inter'] text-sm">
            {[
              { label: "About the Author", href: "/about" },
              { label: "Research Archive", href: "/archive" },
              { label: "Speaking & Workshops", href: "/about" },
              { label: "RSS Feed", href: "#" },
            ].map(link => (
              <li key={link.label}>
                <Link href={link.href}>
                  <span className="hover:text-[#00f5ff] transition-colors cursor-pointer">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-['Inter'] font-bold text-[#f0f0f0] mb-4">Connect</h4>
          <div className="flex gap-3 mb-4">
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
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#a0a0a0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-[#606060] font-['JetBrains_Mono']">
            Weekly posts on AI research
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-[#222222] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#606060] font-['Inter']">
        <p>&copy; 2026 Pluto AI. All rights reserved.</p>
        <p>Built with React + Tailwind</p>
      </div>
    </footer>
  );
}
