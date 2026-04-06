import type { Metadata } from "next";
import { BlogListPage } from "@/components/blog-list-page";

export const metadata: Metadata = {
  title: "Blog",
  description: "Danh sách toàn bộ bài viết trong Pluto AI.",
};

export default function BlogPage() {
  return <BlogListPage heading="All Posts" eyebrow="Blog" />;
}
