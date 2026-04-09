import { BlogExplorer } from "@/components/blog-explorer";
import { getAllCategories, getAllPosts, getAllTags, slugifyTaxonomy } from "@/lib/blog-data";

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

export function BlogListPage({ category, heading, eyebrow = "Blog" }: BlogListPageProps) {
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const selectedCategory = category?.toLowerCase();

  const matchedCategoryLabel = categories.find((item) => slugifyTaxonomy(item) === selectedCategory);
  const title = heading ?? (selectedCategory ? matchedCategoryLabel ?? formatCategoryLabel(selectedCategory) : "All Posts");

  return <BlogExplorer posts={allPosts} categories={categories} tags={tags} selectedCategory={selectedCategory} heading={title} eyebrow={eyebrow} />;
}
