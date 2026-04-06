import type { Metadata } from "next";
import { BlogListPage } from "@/components/blog-list-page";

export const metadata: Metadata = {
  title: "Archive",
  description: "Kho lưu trữ bài viết về AI, engineering và tooling.",
};

export default function ArchivePage() {
  return <BlogListPage heading="Research Archive" eyebrow="Archive" />;
}
