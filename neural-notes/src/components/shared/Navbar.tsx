import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Github, Twitter, SunMoon, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
];

const CATEGORIES = ["AI", "LLMs", "Machine Learning", "Research", "Tools"];

export function Navbar() {
  const [location] = useLocation();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/80 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 font-['Inter'] text-sm font-medium">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}>
              <span className={`transition-all pb-1 cursor-pointer ${
                location === link.href
                  ? "text-[#00f5ff] border-b border-[#00f5ff]"
                  : "text-[#a0a0a0] hover:text-[#00f5ff]"
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setCategoriesOpen(v => !v)}
              className="flex items-center gap-1 text-[#a0a0a0] hover:text-[#00f5ff] transition-colors"
            >
              Categories <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>
            {categoriesOpen && (
              <div
                className="absolute top-8 left-0 bg-[#111111] border border-[#222222] rounded-sm py-2 w-48 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                {CATEGORIES.map(cat => (
                  <Link key={cat} href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}>
                    <span
                      className="block px-4 py-2 text-sm text-[#a0a0a0] hover:text-[#00f5ff] hover:bg-white/[0.03] transition-colors cursor-pointer"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      {cat}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4 text-[#a0a0a0]">
          <button className="hover:text-[#00f5ff] transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#00f5ff] transition-colors hidden sm:block" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#00f5ff] transition-colors hidden sm:block" aria-label="Twitter / X">
            <Twitter className="w-5 h-5" />
          </a>
          <button className="hover:text-[#00f5ff] transition-colors" aria-label="Toggle theme">
            <SunMoon className="w-5 h-5" />
          </button>
          <button
            className="md:hidden hover:text-[#00f5ff] transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/[0.08] py-4 px-6 space-y-4">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block text-sm font-medium transition-colors cursor-pointer ${
                  location === link.href ? "text-[#00f5ff]" : "text-[#a0a0a0]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="border-t border-[#222222] pt-4">
            <p className="text-xs text-[#606060] font-['JetBrains_Mono'] mb-3 uppercase tracking-wider">Categories</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <Link key={cat} href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span
                    className="px-3 py-1 bg-[#111111] border border-[#222222] rounded-sm text-xs text-[#a0a0a0] hover:text-[#00f5ff] transition-colors cursor-pointer"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
