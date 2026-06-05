"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

type PagefindResult = {
  url: string;
  meta: { title: string };
  excerpt: string;
};

type Pagefind = {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: Array<{ data: () => Promise<PagefindResult> }> }>;
};

declare global {
  interface Window {
    __pagefind?: Pagefind;
  }
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const pagefindRef = useRef<Pagefind | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    if (pagefindRef.current || window.__pagefind) {
      pagefindRef.current = window.__pagefind ?? pagefindRef.current;
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      try {
        const pf = await import("/pagefind/pagefind.js");
        await pf.init();
        window.__pagefind = pf;
        window.dispatchEvent(new Event("pagefind-ready"));
      } catch {
        window.dispatchEvent(new Event("pagefind-unavailable"));
      }
    `;
    document.head.appendChild(script);

    const onReady = () => {
      pagefindRef.current = window.__pagefind ?? null;
    };
    const onUnavailable = () => setUnavailable(true);

    window.addEventListener("pagefind-ready", onReady, { once: true });
    window.addEventListener("pagefind-unavailable", onUnavailable, { once: true });

    return () => {
      window.removeEventListener("pagefind-ready", onReady);
      window.removeEventListener("pagefind-unavailable", onUnavailable);
    };
  }, [open]);

  useEffect(() => {
    if (!query.trim() || !pagefindRef.current) {
      setResults([]);
      return;
    }

    let cancelled = false;
    pagefindRef.current.search(query).then(async (res) => {
      if (cancelled) return;
      const data = await Promise.all(res.results.slice(0, 6).map((r) => r.data()));
      if (!cancelled) setResults(data);
    });

    return () => {
      cancelled = true;
    };
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-white/[0.1] bg-[#0d1117] shadow-2xl mx-4">
        <div className="flex items-center gap-3 border-b border-[#222222] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[#606060]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm trong toàn bộ bài viết..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#606060]"
          />
          <button onClick={onClose} className="text-[#606060] transition-colors hover:text-white" type="button">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {unavailable ? (
            <p className="px-4 py-6 text-center text-sm text-[#606060]">
              Full-text search chỉ khả dụng sau khi build production.
            </p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => {
                const url = result.url.replace(basePath, "") || "/";
                return (
                  <li key={result.url}>
                    <a
                      href={url}
                      onClick={onClose}
                      className="block border-b border-[#1a1a1a] px-4 py-3 transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="mb-1 text-sm font-semibold text-white">{result.meta.title}</div>
                      <div
                        className="text-xs leading-5 text-[#8a8a8a] [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-[#00f5ff]"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <p className="px-4 py-6 text-center text-sm text-[#606060]">Không tìm thấy kết quả cho &ldquo;{query}&rdquo;</p>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-[#606060]">Gõ để tìm trong toàn bộ nội dung blog...</p>
          )}
        </div>
      </div>
    </div>
  );
}
