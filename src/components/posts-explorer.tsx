"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/blog-data";
import { PostCard } from "@/components/post-card";

type PostsExplorerProps = {
  posts: Post[];
  tags: string[];
};

export function PostsExplorer({ posts, tags }: PostsExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      const haystack = [post.title, post.description, post.excerpt, ...post.tags]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, posts, query]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="search-posts">
          Tìm theo tiêu đề, chủ đề hoặc từ khoá
        </label>
        <input
          id="search-posts"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ví dụ: RAG, CI/CD, AI Engineer..."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400/50"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...tags].map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                isActive
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:text-white"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/60 p-8 text-center text-sm text-slate-400">
          Chưa có bài phù hợp với từ khoá này.
        </div>
      )}
    </div>
  );
}
