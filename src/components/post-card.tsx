import Link from "next/link";
import { AbstractImage } from "@/components/abstract-image";
import { author, type Post } from "@/lib/blog-data";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`}>
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:scale-[1.02] hover:border-[#00f5ff]/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.12)]">
        <AbstractImage seed={post.seed} />
        <div className="flex flex-grow flex-col p-6">
          <h3 className="mb-3 line-clamp-2 text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-[#00f5ff]">
            {post.title}
          </h3>
          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[#a0a0a0]">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#222222] pt-4">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#39ff14]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#00f5ff]">{post.readTime}</span>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#1a1a1a] text-[10px] font-bold text-[#00f5ff]">
                {author.initials}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
