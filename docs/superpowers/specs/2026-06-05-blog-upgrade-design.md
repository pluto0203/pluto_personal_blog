# Pluto AI Blog — Upgrade Design Spec

**Date:** 2026-06-05
**Status:** Approved

---

## Overview

Nâng cấp blog cá nhân Pluto AI theo 3 phase độc lập, không thay đổi infrastructure deploy (vẫn static export → GitHub Pages). Custom domain sau này chỉ cần thêm `CNAME` file vào `public/` và config GitHub repo settings.

---

## Phase 2 — Refined Dark UI/UX

### Homepage

**Hero section:**
- Giảm opacity SVG grid background (hiện tại 0.035 → 0.02)
- Tăng whitespace: padding top/bottom lớn hơn
- Headline to và rõ hơn, bỏ text thừa cạnh tranh sự chú ý
- Xoá bỏ "Trending Topics" và "Featured Papers" sections (ít giá trị, gây rối)

**Post cards:**
- Border subtle hơn (giảm opacity border)
- Hover: lift nhẹ (`translateY(-2px)`) + border color glow thay vì solid color change
- Font size hierarchy rõ hơn: title to hơn, description nhỏ hơn và muted hơn
- Consistent spacing giữa các card

**Section spacing:**
- Tăng `gap` và `padding` giữa các section trên homepage
- Cảm giác "thở" hơn, không bị nhồi nhét

### Blog Listing Page (`/blog`)

- Post grid 2 cột trên desktop (≥ 1024px), 1 cột trên mobile
- Filter category: pill buttons đơn giản, không cồng kềnh
- Post cards đồng bộ style với homepage

### Reading Experience (làm sau homepage)

- MDX typography: `line-height: 1.8`, `font-size: 1.1rem`, max-width 68ch cho body text
- Code blocks: thêm line numbers, copy-to-clipboard button
- Sticky Table of Contents ở sidebar phải trên desktop (≥ 1280px)
- Reading progress bar (đã có `reading-progress.tsx`, cần review vị trí/style)

---

## Phase 3 — Features

### Search (Pagefind)

**Thư viện:** [Pagefind](https://pagefind.app/) — static search, chạy sau `next build`, tự index HTML output.

**Cách tích hợp:**
1. Thêm `pagefind` vào `devDependencies`
2. Cập nhật `package.json` scripts: `"build": "... && npx pagefind --site out"`
3. Thêm search UI component (`src/components/search-modal.tsx`) — modal trigger từ header icon
4. Load Pagefind JS/CSS từ `/pagefind/pagefind.js` (được generate lúc build)

**UX:** Icon search trong header → mở modal overlay → instant results khi gõ → click vào kết quả navigate tới bài.

### Table of Contents

**Cách hoạt động:**
- Trong `src/app/posts/[slug]/page.tsx`, parse MDX content để extract headings (h2, h3) cùng với `id`
- Render `<TableOfContents>` component sticky ở sidebar phải (`position: sticky; top: 6rem`)
- Dùng `IntersectionObserver` để highlight heading đang active khi scroll
- Chỉ hiện trên desktop (≥ 1280px), ẩn trên mobile

**Component:** `src/components/table-of-contents.tsx`

### Related Posts

**Logic tính điểm (tại build time trong `src/lib/content.ts`):**
- Cùng `seriesSlug`: 3 điểm
- Cùng `category`: 2 điểm
- Mỗi tag chung: 1 điểm

Lấy top 3 bài có điểm cao nhất (loại bài hiện tại). Hiển thị ở cuối post, trước comments section.

**Component:** `src/components/related-posts.tsx`

---

## Phase 4 — SEO

### JSON-LD Structured Data

Thêm `Article` schema vào mỗi post page (`src/app/posts/[slug]/page.tsx`):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{post.title}}",
  "description": "{{post.description}}",
  "author": { "@type": "Person", "name": "Duy" },
  "datePublished": "{{post.date}}",
  "image": "{{siteUrl}}/og/{{post.slug}}.png",
  "publisher": { "@type": "Organization", "name": "Pluto AI" }
}
```

Không cần thư viện, inject trực tiếp qua `<script type="application/ld+json">` trong page metadata.

### OG Image Auto-Generation

**Thư viện:** [Satori](https://github.com/vercel/satori) — chạy trong Node.js, convert JSX → SVG → PNG.

**Cách tích hợp:**
1. Thêm `satori` + `@resvg/resvg-js` vào `devDependencies` (chỉ dùng lúc build)
2. Tạo `scripts/generate-og.mjs` — đọc toàn bộ posts, generate PNG cho từng bài, output ra `public/og/{slug}.png`
3. Cập nhật `package.json` build script: chạy `generate-og` trước `next build`
4. Cập nhật `<meta og:image>` trong post page metadata trỏ tới `/og/{slug}.png`

**Design OG image:** Dark background (`#0a0a0a`), title text trắng, category pill màu cyan, site name "Pluto AI" ở góc, kích thước 1200×630px.

---

## Thứ tự implement

1. **Phase 2a:** Homepage polish (hero, post cards, spacing)
2. **Phase 2b:** Blog listing page
3. **Phase 2c:** Reading experience (typography, code blocks)
4. **Phase 3a:** Pagefind search
5. **Phase 3b:** Table of Contents
6. **Phase 3c:** Related Posts
7. **Phase 4a:** JSON-LD structured data
8. **Phase 4b:** OG image generation script

---

## Constraints

- Static export (`output: 'export'` trong `next.config.ts`) — không dùng được API routes, ISR, hay `@vercel/og` server-side
- Deploy GitHub Pages — không thay đổi
- Không thêm runtime dependencies không cần thiết (Satori và Pagefind chỉ là devDependencies / build-time tools)
