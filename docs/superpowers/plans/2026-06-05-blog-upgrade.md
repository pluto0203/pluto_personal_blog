# Blog Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp Pluto AI blog theo 3 phase — Refined Dark UI/UX, Features (ToC active, Related Posts scoring, Pagefind search), và SEO (JSON-LD + OG images).

**Architecture:** Static Next.js 15 export. Không có server — mọi thứ chạy tại build time hoặc client-side. OG images pre-generated bằng Satori script. Pagefind index được tạo sau `next build` và serve cùng với static files.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, MDX, Satori (devDep), @resvg/resvg-js (devDep), Pagefind (devDep)

**Đã có sẵn (không cần build lại):** Copy button trong CodeBlock, Reading progress bar, ToC HTML (cần thêm active state), Related posts HTML (cần thêm scoring), Basic client-side search trong BlogExplorer.

**Không có test framework** — dùng `npm run typecheck` + `npm run lint` + visual check qua dev server thay cho unit tests.

---

## Task 1: Homepage — giảm hero noise, xoá Trending Topics & Featured Papers

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Giảm opacity SVG grid trong hero**

Trong `src/app/page.tsx` dòng 22, đổi `opacity-[0.035]` thành `opacity-[0.015]`:

```tsx
// Before
<svg className="h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">

// After
<svg className="h-full w-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
```

- [ ] **Step 2: Xoá section "Trending This Week" và "Featured Papers" khỏi aside**

Xoá toàn bộ hai block sau trong `src/app/page.tsx` (dòng 131-145 và 170-186):

```tsx
// XOÁ block Trending This Week:
<div>
  <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">
    <span className="h-2 w-2 shrink-0 bg-[#c026d3]" />
    Trending This Week
  </h3>
  <ul className="space-y-4">
    {TRENDING_TOPICS.map((title, index) => (
      <li key={title} className="group flex cursor-pointer gap-4">
        <span className="mt-[-2px] shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-base font-bold text-[#00f5ff]">
          0{index + 1}
        </span>
        <span className="text-sm leading-snug text-[#a0a0a0] transition-colors group-hover:text-white">{title}</span>
      </li>
    ))}
  </ul>
</div>

// XOÁ block Featured Papers:
<div>
  <h3 className="mb-4 border-b border-[#222222] pb-2 text-xs font-bold uppercase tracking-widest text-[#f0f0f0]">Featured Papers</h3>
  <div className="space-y-5">
    {FEATURED_PAPERS.map((paper) => (
      <div key={paper.title} className="group">
        <h4 className="mb-1 text-sm font-medium leading-snug text-[#f0f0f0] transition-colors group-hover:text-[#00f5ff]">{paper.title}</h4>
        <div className="flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#606060]">
          <a href={`https://arxiv.org/abs/${paper.arxiv}`} target="_blank" rel="noreferrer" className="text-[#39ff14] hover:underline">
            arXiv:{paper.arxiv}
          </a>
          <span>·</span>
          <span>{paper.date}</span>
        </div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Xoá unused imports sau khi xoá các sections**

Trong `src/app/page.tsx`, xoá `TRENDING_TOPICS` và `FEATURED_PAPERS` khỏi import:

```tsx
// Before
import { CATEGORY_GUIDE, FEATURED_PAPERS, HERO_PILLS, PROJECT_SHOWCASE, TRENDING_TOPICS } from "@/lib/site-content";

// After
import { CATEGORY_GUIDE, HERO_PILLS, PROJECT_SHOWCASE } from "@/lib/site-content";
```

- [ ] **Step 4: Verify TypeScript và lint**

```bash
cd /home/anlnm/duynvt/pluto_personal_blog
npm run typecheck && npm run lint
```

Expected: no errors.

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Mở http://localhost:3001, kiểm tra:
- Hero background grid mờ hơn trước
- Sidebar bên phải phần "Bài mới & đáng đọc" chỉ còn "Tìm bài nhanh hơn" và "Explore Topics"
- Không còn "Trending This Week" và "Featured Papers"

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: clean up homepage hero noise and remove placeholder sidebar sections"
```

---

## Task 2: PostCard — đổi hover animation từ scale sang translateY

**Files:**
- Modify: `src/components/post-card.tsx`

- [ ] **Step 1: Đổi hover animation**

Trong `src/components/post-card.tsx` dòng 8, đổi `hover:scale-[1.02]` thành `hover:-translate-y-1`:

```tsx
// Before
<article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:scale-[1.02] hover:border-[#00f5ff]/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.12)]">

// After
<article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#00f5ff]/25 hover:shadow-[0_8px_24px_rgba(0,245,255,0.08)]">
```

- [ ] **Step 2: Verify và commit**

```bash
npm run typecheck && npm run lint
```

```bash
git add src/components/post-card.tsx
git commit -m "feat: replace scale hover with translateY lift on post cards"
```

---

## Task 3: Related Posts — thêm scoring algorithm

**Files:**
- Modify: `src/lib/content.ts`
- Modify: `src/lib/blog-data.ts`
- Modify: `src/app/posts/[slug]/page.tsx`

- [ ] **Step 1: Thêm `getRelatedPosts` vào `src/lib/content.ts`**

Thêm function sau vào cuối file `src/lib/content.ts`:

```ts
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const candidates = getAllPosts().filter((p) => p.slug !== post.slug);

  const scored = candidates.map((p) => {
    let score = 0;
    if (post.seriesSlug && p.seriesSlug === post.seriesSlug) score += 3;
    if (p.category === post.category) score += 2;
    score += p.tags.filter((t) => post.tags.includes(t)).length;
    return { post: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ post: p }) => p);
}
```

- [ ] **Step 2: Re-export từ `src/lib/blog-data.ts`**

Thêm `getRelatedPosts` vào import/export trong `src/lib/blog-data.ts`. Đầu file đã có `export type { Post } from "@/lib/blog-shared"` nên `Post` đã available.

Thêm vào import từ `@/lib/content`:
```ts
import {
  getAllCategories as getContentCategories,
  getAllPosts as getContentPosts,
  getAllTags as getContentTags,
  getFeaturedPosts as getContentFeaturedPosts,
  getLatestPosts as getContentLatestPosts,
  getPostBySlug as getContentPostBySlug,
  getPostsByCategorySlug as getContentPostsByCategorySlug,
  getPostsBySeries as getContentPostsBySeries,
  getRelatedPosts as getContentRelatedPosts,
} from "@/lib/content";
```

Thêm import type và function export ở cuối `src/lib/blog-data.ts`:

```ts
import type { Post } from "@/lib/blog-shared";

export function getRelatedPosts(post: Post, limit = 3) {
  return getContentRelatedPosts(post, limit);
}
```

- [ ] **Step 3: Dùng `getRelatedPosts` trong post page**

Trong `src/app/posts/[slug]/page.tsx` dòng 11, thêm import:

```ts
import { author, getAllPosts, getPostBySlug, getRelatedPosts, siteConfig } from "@/lib/blog-data";
```

Thay dòng 73:

```ts
// Before
const relatedPosts = getAllPosts().filter((item) => item.slug !== post.slug).slice(0, 3);

// After
const relatedPosts = getRelatedPosts(post, 3);
```

- [ ] **Step 4: Verify và commit**

```bash
npm run typecheck && npm run lint
```

Expected: no errors.

```bash
git add src/lib/content.ts src/lib/blog-data.ts src/app/posts/[slug]/page.tsx
git commit -m "feat: add relevance scoring for related posts (series > category > shared tags)"
```

---

## Task 4: ToC — active heading highlight khi scroll

**Files:**
- Create: `src/components/table-of-contents.tsx`
- Modify: `src/app/posts/[slug]/page.tsx`

- [ ] **Step 1: Tạo `src/components/table-of-contents.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/content";

export function TableOfContents({ items }: { items: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block rounded-r-sm border-l-2 px-3 py-1 text-[13px] leading-5 transition-all ${
              item.level === 3 ? "ml-3" : ""
            } ${
              activeId === item.id
                ? "border-[#00f5ff] bg-white/[0.04] text-[#eefaff]"
                : "border-transparent text-[#9098a6] hover:border-[#00f5ff]/40 hover:bg-white/[0.03] hover:text-[#eefaff]"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Thay ToC tĩnh trong post page bằng component mới**

Trong `src/app/posts/[slug]/page.tsx`, thêm import:

```ts
import { TableOfContents } from "@/components/table-of-contents";
```

Thay desktop ToC (dòng 146-166):

```tsx
// Before — desktop ToC
{showToc ? (
  <aside className="hidden w-56 shrink-0 lg:block">
    <div className="sticky top-24 rounded-xl border border-white/[0.06] bg-[#0d1522]/80 p-4 backdrop-blur">
      <h4 className="mb-4 border-b border-[#222222] pb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest text-[#00f5ff]">
        Mục lục
      </h4>
      <ul className="space-y-2.5 text-sm">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-r-sm border-l-2 border-transparent px-3 py-1 text-[13px] leading-5 text-[#9098a6] transition-all hover:border-[#00f5ff]/40 hover:bg-white/[0.03] hover:text-[#eefaff] ${
                item.level === 3 ? "ml-3" : ""
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </aside>
) : null}

// After — dùng TableOfContents client component
{showToc ? (
  <aside className="hidden w-56 shrink-0 lg:block">
    <div className="sticky top-24 rounded-xl border border-white/[0.06] bg-[#0d1522]/80 p-4 backdrop-blur">
      <h4 className="mb-4 border-b border-[#222222] pb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest text-[#00f5ff]">
        Mục lục
      </h4>
      <TableOfContents items={tocItems} />
    </div>
  </aside>
) : null}
```

Mobile ToC giữ nguyên static (không cần IntersectionObserver trên mobile).

- [ ] **Step 3: Verify và commit**

```bash
npm run typecheck && npm run lint
```

```bash
git add src/components/table-of-contents.tsx src/app/posts/[slug]/page.tsx
git commit -m "feat: add active heading highlight to table of contents"
```

---

## Task 5: JSON-LD structured data cho post pages

**Files:**
- Modify: `src/app/posts/[slug]/page.tsx`

- [ ] **Step 1: Thêm JSON-LD script vào post page**

Trong `src/app/posts/[slug]/page.tsx`, trong `PostDetailPage` function, thêm jsonLd object và script tag. Thêm ngay sau khai báo `showToc` và `relatedPosts`:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  author: { "@type": "Person", name: author.name, url: siteConfig.github },
  datePublished: post.date,
  image: `${siteConfig.url}/og/${post.slug}.png`,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};
```

Thêm `<script>` tag là phần tử đầu tiên trong return JSX (trước `<ReadingProgress />`):

```tsx
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <ReadingProgress />
    {/* ... rest unchanged ... */}
  </>
);
```

- [ ] **Step 2: Verify và commit**

```bash
npm run typecheck && npm run lint
```

```bash
git add src/app/posts/[slug]/page.tsx
git commit -m "feat: add Article JSON-LD structured data to post pages"
```

---

## Task 6: OG image generation với Satori

**Files:**
- Create: `scripts/generate-og.mjs`
- Modify: `package.json`
- Modify: `src/app/posts/[slug]/page.tsx`

- [ ] **Step 1: Cài Satori và resvg**

```bash
npm install --save-dev satori @resvg/resvg-js
```

Expected: packages added to devDependencies.

- [ ] **Step 2: Tạo `scripts/generate-og.mjs`**

```js
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT_DIR = path.join(process.cwd(), "public", "og");

async function loadFont() {
  // Inter Bold từ Google Fonts CDN — chạy lúc build time, network OK
  const res = await fetch(
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhjA.woff",
  );
  return res.arrayBuffer();
}

function getPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), "utf8"));
      return {
        slug: f.replace(/\.mdx?$/, ""),
        title: data.title ?? "Untitled",
        category: data.category ?? "General",
      };
    });
}

async function generateOgImage(slug, title, category, fontData) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0d1522 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #00f5ff, #c026d3)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00f5ff",
                marginBottom: "20px",
                padding: "6px 14px",
                border: "1px solid rgba(0,245,255,0.3)",
                borderRadius: "999px",
                width: "fit-content",
              },
              children: category,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: title.length > 60 ? "40px" : "52px",
                fontWeight: "900",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "40px",
                maxWidth: "900px",
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "2px solid rgba(0,245,255,0.4)",
                      background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(192,38,211,0.2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00f5ff",
                      fontSize: "14px",
                      fontWeight: "900",
                    },
                    children: "DV",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { color: "#a0a0a0", fontSize: "16px" },
                    children: "Pluto AI",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log("Loading font...");
  const fontData = await loadFont();

  const posts = getPosts();
  console.log(`Generating OG images for ${posts.length} posts...`);

  for (const { slug, title, category } of posts) {
    const outPath = path.join(OUT_DIR, `${slug}.png`);
    const png = await generateOgImage(slug, title, category, fontData);
    fs.writeFileSync(outPath, png);
    console.log(`  ✓ ${slug}.png`);
  }

  console.log("Done.");
}

main().catch(console.error);
```

- [ ] **Step 3: Cập nhật `package.json` build script**

```json
"scripts": {
  "dev": "next dev -p 3001",
  "rss": "node scripts/generate-rss.mjs",
  "og": "node scripts/generate-og.mjs",
  "build": "node scripts/generate-rss.mjs && node scripts/generate-og.mjs && next build",
  "start": "npx serve@latest out",
  "preview": "npx serve@latest out",
  "lint": "eslint . --max-warnings=0 --ignore-pattern .next --ignore-pattern out",
  "typecheck": "tsc --noEmit",
  "check": "npm run lint && npm run typecheck && npm run build",
  "clean": "node -e \"const fs=require('fs'); ['.next','out'].forEach((p)=>fs.rmSync(p,{recursive:true,force:true}))\""
}
```

- [ ] **Step 4: Cập nhật OG image URL trong post page metadata**

Trong `src/app/posts/[slug]/page.tsx`, trong `generateMetadata`, thay OG image URL:

```tsx
// Before
images: [
  {
    url: "/PlutoAI.jpg",
    width: 1200,
    height: 630,
    alt: `Preview image for ${post.title}`,
  },
],
// ...
twitter: {
  card: "summary_large_image",
  title: post.title,
  description: post.description,
  images: ["/PlutoAI.jpg"],
},

// After
images: [
  {
    url: `${siteConfig.url}/og/${post.slug}.png`,
    width: 1200,
    height: 630,
    alt: `Preview image for ${post.title}`,
  },
],
// ...
twitter: {
  card: "summary_large_image",
  title: post.title,
  description: post.description,
  images: [`${siteConfig.url}/og/${post.slug}.png`],
},
```

- [ ] **Step 5: Thêm `public/og/` vào `.gitignore` (optional — OG files có thể commit hoặc generate lúc CI)**

Không cần thêm vào gitignore — nên commit OG images vào repo để deploy GitHub Pages không cần build step đặc biệt. Bỏ qua step này.

- [ ] **Step 6: Test generate OG images**

```bash
node scripts/generate-og.mjs
```

Expected output:
```
Generating OG images for 7 posts...
  ✓ ai-engineer-roadmap-2026.png
  ✓ attention-mechanisms-transformers.png
  ✓ evaluate-llm-apps.png
  ✓ from-chatbot-to-digital-worker.png
  ✓ from-rag-note-to-mini-demo.png
  ✓ prompt-engineering-production.png
  ✓ ship-blog-with-github-actions.png
Done.
```

Kiểm tra file tồn tại: `ls public/og/`

- [ ] **Step 7: Verify và commit**

```bash
npm run typecheck && npm run lint
```

```bash
git add scripts/generate-og.mjs package.json public/og/ src/app/posts/[slug]/page.tsx
git commit -m "feat: add Satori OG image generation script, update post page OG metadata"
```

---

## Task 7: Pagefind full-text search

**Files:**
- Modify: `package.json`
- Create: `src/components/search-dialog.tsx`
- Modify: `src/components/site-header.tsx`

- [ ] **Step 1: Cài Pagefind**

```bash
npm install --save-dev pagefind
```

- [ ] **Step 2: Cập nhật build script để chạy Pagefind sau `next build`**

Trong `package.json`, cập nhật build script (basePath cần được pass vào pagefind):

```json
"build": "node scripts/generate-rss.mjs && node scripts/generate-og.mjs && next build && npx pagefind --site out"
```

Note: Nếu deploy với basePath (e.g. `/pluto_personal_blog`), thêm `--root-selector '[data-pagefind-body]'` nếu cần. Mặc định pagefind index toàn bộ HTML trong `out/`.

- [ ] **Step 3: Thêm `data-pagefind-body` attribute vào article content**

Trong `src/app/posts/[slug]/page.tsx`, thêm `data-pagefind-body` vào `<article>` element (dòng 169):

```tsx
// Before
<article className="min-w-0 max-w-[760px] flex-1">

// After
<article className="min-w-0 max-w-[760px] flex-1" data-pagefind-body>
```

- [ ] **Step 4: Tạo `src/components/search-dialog.tsx`**

```tsx
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
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-white/[0.1] bg-[#0d1117] shadow-2xl">
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
                        className="text-xs leading-5 text-[#8a8a8a] [&_mark]:bg-transparent [&_mark]:text-[#00f5ff] [&_mark]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <p className="px-4 py-6 text-center text-sm text-[#606060]">Không tìm thấy kết quả cho "{query}"</p>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-[#606060]">Gõ để tìm trong toàn bộ nội dung blog...</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Cập nhật `src/components/site-header.tsx` để trigger search dialog**

Thêm state và import vào `site-header.tsx`. Do header là `"use client"`, ta có thể manage search state trực tiếp ở đây.

Thêm import:
```tsx
import { SearchDialog } from "@/components/search-dialog";
```

Thêm state vào `SiteHeader` component:
```tsx
const [searchOpen, setSearchOpen] = useState(false);
```

Thêm keyboard shortcut handler trong useEffect:
```tsx
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  };
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);
```

Đổi Search button trong header (dòng 90-97) từ Link thành button:
```tsx
// Before
<Link
  href="/blog#search"
  className="hidden items-center gap-2 rounded-full border border-[#222222] bg-[#111111]/90 px-3 py-1.5 text-xs font-medium transition-colors hover:border-[#00f5ff]/40 hover:text-[#00f5ff] sm:flex"
  aria-label="Search articles"
>
  <Search className="h-4 w-4" />
  <span className="hidden lg:inline">Search</span>
</Link>

// After
<button
  type="button"
  onClick={() => setSearchOpen(true)}
  className="hidden items-center gap-2 rounded-full border border-[#222222] bg-[#111111]/90 px-3 py-1.5 text-xs font-medium transition-colors hover:border-[#00f5ff]/40 hover:text-[#00f5ff] sm:flex"
  aria-label="Search articles (⌘K)"
>
  <Search className="h-4 w-4" />
  <span className="hidden lg:inline">⌘K</span>
</button>
```

Thêm `<SearchDialog>` vào return JSX, ngay trước đóng `</header>`:
```tsx
<SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
```

- [ ] **Step 6: Verify TypeScript**

```bash
npm run typecheck && npm run lint
```

Expected: no errors.

- [ ] **Step 7: Test build đầy đủ**

```bash
npm run build
```

Expected: build thành công, thư mục `out/pagefind/` được tạo sau khi next build chạy xong.

Nếu pagefind báo lỗi basePath, thêm flag:
```bash
npx pagefind --site out --root-selector 'article'
```

- [ ] **Step 8: Commit**

```bash
git add package.json src/components/search-dialog.tsx src/components/site-header.tsx src/app/posts/[slug]/page.tsx
git commit -m "feat: add Pagefind full-text search with Cmd+K modal"
```

---

## Thứ tự thực thi khuyến nghị

1. Task 1 (Homepage cleanup) — quick win, visual impact ngay
2. Task 2 (PostCard hover) — 5 phút
3. Task 3 (Related Posts scoring) — logic đơn giản
4. Task 4 (ToC active) — cần client component mới
5. Task 5 (JSON-LD) — một đoạn code nhỏ
6. Task 6 (OG Images) — cần install deps + script mới
7. Task 7 (Pagefind) — cần full build để test

---

## Notes về deploy

- Tất cả thay đổi tương thích với `output: "export"` + GitHub Pages
- OG images được commit vào `public/og/` — không cần build step riêng trên CI
- Pagefind index (`out/pagefind/`) được generate trong CI build pipeline — không cần commit
- Custom domain sau này: thêm file `public/CNAME` với nội dung là domain, config GitHub repo Settings → Pages → Custom domain
