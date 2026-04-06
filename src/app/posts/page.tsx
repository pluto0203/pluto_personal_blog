import type { Metadata } from "next";
import { PostsExplorer } from "@/components/posts-explorer";
import { getAllPosts, getAllTags } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Tổng hợp các bài viết về AI, engineering workflow và CI/CD trên Pluto Notes.",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">Posts</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Những ghi chú về AI, software và cách ship sản phẩm gọn gàng.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Đây là nơi mình lưu lại các bài viết liên quan đến IT nói chung và AI nói riêng, ưu tiên nội dung thực chiến,
          dễ áp dụng và có ví dụ cụ thể.
        </p>
      </section>

      <PostsExplorer posts={posts} tags={tags} />
    </div>
  );
}
