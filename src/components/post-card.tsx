import Link from "next/link";
import type { Post } from "@/lib/blog-data";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/7">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-100"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-white transition group-hover:text-cyan-200">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{post.description}</p>
      <p className="mt-4 text-sm text-slate-400">{post.excerpt}</p>

      <div className="mt-5">
        <Link
          href={`/posts/${post.slug}`}
          className="text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}
