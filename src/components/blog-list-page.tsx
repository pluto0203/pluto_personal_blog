import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getAllCategories, getAllPosts, getPostsByCategorySlug, slugifyTaxonomy } from "@/lib/blog-data";

type BlogListPageProps = {
  category?: string;
  heading?: string;
  eyebrow?: string;
};

function formatCategoryLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function BlogListPage({ category, heading, eyebrow = "Archive" }: BlogListPageProps) {
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const selectedCategory = category?.toLowerCase();

  const filteredPosts = selectedCategory ? getPostsByCategorySlug(selectedCategory) : allPosts;

  const matchedCategoryLabel = categories.find((item) => slugifyTaxonomy(item) === selectedCategory);
  const title = heading ?? (selectedCategory ? matchedCategoryLabel ?? formatCategoryLabel(selectedCategory) : "All Posts");

  return (
    <div className="py-4 sm:py-6">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-1 bg-[#00f5ff]" />
          <h1 className="text-3xl font-black tracking-tight text-[#f0f0f0]">{title}</h1>
        </div>
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#606060]">
          {filteredPosts.length} articles · sorted by date · {eyebrow}
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {["All", ...categories].map((item) => {
          const slug = slugifyTaxonomy(item);
          const isActive = (!selectedCategory && item === "All") || selectedCategory === slug;
          const href = item === "All" ? "/blog" : `/category/${slug}`;

          return (
            <Link key={item} href={href}>
              <span
                className={`cursor-pointer rounded-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#00f5ff] text-[#0a0a0a]"
                    : "border border-[#222222] bg-[#111111] text-[#a0a0a0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
                }`}
              >
                {item}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
