"use client";

import Link from "next/link";
import { Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { type Post, slugifyTaxonomy } from "@/lib/blog-shared";

type BlogExplorerProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
  selectedCategory?: string;
  heading: string;
  eyebrow: string;
};

export function BlogExplorer({ posts, categories, tags, selectedCategory, heading, eyebrow }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const basePosts = useMemo(() => {
    if (!selectedCategory) {
      return posts;
    }

    return posts.filter((post) => slugifyTaxonomy(post.category) === selectedCategory);
  }, [posts, selectedCategory]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return basePosts.filter((post) => {
      const matchesSearch =
        !normalizedQuery ||
        [post.title, post.excerpt, post.category, post.tags.join(" ")].join(" ").toLowerCase().includes(normalizedQuery);

      const matchesTag = !activeTag || post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [activeTag, basePosts, searchQuery]);

  const categoryCounts = useMemo(
    () =>
      categories.map((category) => ({
        category,
        count: posts.filter((post) => post.category === category).length,
      })),
    [categories, posts],
  );

  const hasActiveFilters = Boolean(searchQuery.trim() || activeTag);

  return (
    <div className="py-4 sm:py-6" id="search">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-8 w-1 bg-[#00f5ff]" />
            <h1 className="text-3xl font-black tracking-tight text-[#f0f0f0]">{heading}</h1>
          </div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#606060]">
            {filteredPosts.length} bài phù hợp · {eyebrow}
          </p>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveTag("");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#222222] bg-[#111111] px-3 py-2 text-xs font-medium text-[#a0a0a0] transition-colors hover:border-[#00f5ff]/40 hover:text-[#00f5ff]"
          >
            <X className="h-3.5 w-3.5" />
            Reset filter
          </button>
        ) : null}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { label: "All", href: "/blog", active: !selectedCategory },
          ...categories.map((category) => {
            const slug = slugifyTaxonomy(category);
            return {
              label: category,
              href: `/category/${slug}`,
              active: selectedCategory === slug,
            };
          }),
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <span
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                item.active
                  ? "bg-[#00f5ff] text-[#0a0a0a]"
                  : "border border-[#222222] bg-[#111111] text-[#a0a0a0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div>
          <div className="mb-6 rounded-2xl border border-white/[0.06] bg-[#0d1522]/80 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#00f5ff]">
              <Search className="h-3.5 w-3.5" />
              Search articles
            </div>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <label className="flex items-center gap-3 rounded-xl border border-[#222222] bg-[#111111] px-3 py-2.5">
                <Search className="h-4 w-4 text-[#606060]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Tìm theo tiêu đề, tag, category..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#606060]"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 8).map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(isActive ? "" : tag)}
                      className={`rounded-full px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#39ff14] text-[#0a0a0a]"
                          : "border border-[#222222] bg-[#111111] text-[#a0a0a0] hover:border-[#39ff14]/40 hover:text-[#39ff14]"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredPosts.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#222222] bg-[#111111]/70 px-6 py-10 text-center">
              <p className="mb-2 text-lg font-semibold text-white">Chưa có bài khớp với bộ lọc</p>
              <p className="text-sm text-[#a0a0a0]">Hãy thử từ khóa khác hoặc bỏ chọn tag hiện tại.</p>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0d1522]/80 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f0f0f0]">
              <Sparkles className="h-3.5 w-3.5 text-[#00f5ff]" />
              Filter sidebar
            </h3>
            <div className="space-y-3">
              {categoryCounts.map((item) => {
                const slug = slugifyTaxonomy(item.category);
                const isActive = selectedCategory === slug;

                return (
                  <Link key={item.category} href={`/category/${slug}`}>
                    <div
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all ${
                        isActive
                          ? "border-[#00f5ff]/40 bg-[#00f5ff]/10 text-white"
                          : "border-[#222222] bg-[#111111] text-[#a0a0a0] hover:border-[#00f5ff]/30 hover:text-white"
                      }`}
                    >
                      <span>{item.category}</span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs">{item.count}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0d1522]/80 p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f0f0f0]">Tag cloud</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(isActive ? "" : tag)}
                    className={`rounded-full px-2.5 py-1 text-xs transition-all ${
                      isActive
                        ? "bg-[#39ff14] text-[#0a0a0a]"
                        : "border border-[#222222] bg-[#111111] text-[#a0a0a0] hover:border-[#39ff14]/40 hover:text-[#39ff14]"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
