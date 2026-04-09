import Link from "next/link";
import { AbstractImage } from "@/components/abstract-image";
import { author, type Post } from "@/lib/blog-shared";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`}>
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:scale-[1.02] hover:border-[#00f5ff]/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.12)]">
        <AbstractImage seed={post.seed} alt={`Illustration for ${post.title}`} />
        <div className="flex flex-grow flex-col p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-[11px]">
            <span className="text-[#8a8a8a]">{post.dateLabel}</span>
            <span className="text-[#4a4a4a]">•</span>
            <span className="text-[#00f5ff]">{post.readTime}</span>
          </div>

          <h3 className="mb-3 line-clamp-2 text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-[#00f5ff]">
            {post.title}
          </h3>
          <p className="mb-6 line-clamp-3 text-[15px] leading-7 text-[#aeb6c2]">{post.excerpt}</p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#222222] pt-4">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#39ff14]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#1a1a1a] text-[10px] font-bold text-[#00f5ff]">
              {author.initials}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
