import type { Metadata } from "next";
import { BlogListPage } from "@/components/blog-list-page";
import { getAllCategories, slugifyTaxonomy } from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ cat: string }>;
};

function toLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    cat: slugifyTaxonomy(category),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cat } = await params;
  return {
    title: toLabel(cat),
    description: `Các bài viết thuộc chủ đề ${toLabel(cat)}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { cat } = await params;
  return <BlogListPage category={cat} eyebrow="Category" />;
}
