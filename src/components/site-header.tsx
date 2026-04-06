import Link from "next/link";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/posts", label: "Bài viết" },
  { href: "/series", label: "Series" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-violet-500 text-sm font-semibold text-slate-950">
            PN
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">Pluto Notes</span>
            <span className="block text-xs text-slate-400">tech / ai / build in public</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
