"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { FacebookIcon, GitHubIcon, XIcon, LinkedInIcon } from "@/components/social-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { slugifyTaxonomy } from "@/lib/blog-shared";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/site-content";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type SiteHeaderProps = {
  categories: string[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {
  const pathname = usePathname();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const githubLink = SOCIAL_LINKS.find((link) => link.platform === "github")?.href ?? "https://github.com";
  const facebookLink = SOCIAL_LINKS.find((link) => link.platform === "facebook")?.href ?? "https://facebook.com";
  const linkedInLink = SOCIAL_LINKS.find((link) => link.platform === "linkedin")?.href ?? "https://linkedin.com";
  const xLink = SOCIAL_LINKS.find((link) => link.platform === "x")?.href ?? "https://twitter.com";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`cursor-pointer border-b pb-1 transition-all ${
                  isActive(pathname, link.href)
                    ? "border-[#00f5ff] text-[#00f5ff]"
                    : "border-transparent text-[#a0a0a0] hover:text-[#00f5ff]"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setCategoriesOpen((value) => !value)}
              className="flex items-center gap-1 text-[#a0a0a0] transition-colors hover:text-[#00f5ff]"
              type="button"
            >
              Categories
              <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>

            {categoriesOpen ? (
              <div
                className="absolute left-0 top-8 w-48 rounded-sm border border-[#222222] bg-[#111111] py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                {categories.map((category) => {
                  const slug = slugifyTaxonomy(category);
                  return (
                    <Link key={category} href={`/category/${slug}`}>
                      <span
                        className="block cursor-pointer px-4 py-2 text-sm text-[#a0a0a0] transition-colors hover:bg-white/[0.03] hover:text-[#00f5ff]"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {category}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-3 text-[#a0a0a0]">
          <Link
            href="/blog#search"
            className="hidden items-center gap-2 rounded-full border border-[#222222] bg-[#111111]/90 px-3 py-1.5 text-xs font-medium transition-colors hover:border-[#00f5ff]/40 hover:text-[#00f5ff] sm:flex"
            aria-label="Search articles"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
          </Link>
          <a href={githubLink} target="_blank" rel="noreferrer" className="hidden transition-colors hover:text-[#00f5ff] sm:block" aria-label="GitHub">
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a href={facebookLink} target="_blank" rel="noreferrer" className="hidden transition-colors hover:text-[#00f5ff] sm:block" aria-label="Facebook">
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a href={xLink} target="_blank" rel="noreferrer" className="hidden transition-colors hover:text-[#00f5ff] sm:block" aria-label="Twitter">
            <XIcon className="h-5 w-5" />
          </a>
          <a href={linkedInLink} target="_blank" rel="noreferrer" className="hidden transition-colors hover:text-[#00f5ff] sm:block" aria-label="LinkedIn">
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <ThemeToggle />
          <button className="transition-colors hover:text-[#00f5ff] md:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu" type="button">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="space-y-4 border-b border-white/[0.08] bg-[#0a0a0a] px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block cursor-pointer text-sm font-medium transition-colors ${
                  isActive(pathname, link.href) ? "text-[#00f5ff]" : "text-[#a0a0a0]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}

          <div className="border-t border-[#222222] pt-4">
            <p className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-[#606060]">
              Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const slug = slugifyTaxonomy(category);
                return (
                  <Link key={category} href={`/category/${slug}`}>
                    <span
                      className="cursor-pointer rounded-sm border border-[#222222] bg-[#111111] px-3 py-1 text-xs text-[#a0a0a0] transition-colors hover:text-[#00f5ff]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {category}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
