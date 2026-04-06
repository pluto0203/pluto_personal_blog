import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SeriesCard } from "@/components/series-card";
import { getAllTags, getFeaturedPosts, getLatestPosts, series, siteConfig } from "@/lib/blog-data";

const stats = [
  { label: "Featured posts", value: "03" },
  { label: "Series đang viết", value: "02" },
  { label: "Chủ đề", value: String(getAllTags().length).padStart(2, "0") },
];

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts(3);

  return (
    <div className="space-y-10">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">Modern tech / AI blog</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {siteConfig.name}: nơi lưu lại những ghi chú về engineering, AI và cách ship sản phẩm gọn gàng.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Đọc bài mới nhất
            </Link>
            <Link
              href="/series"
              className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
            >
              Xem các series
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/8 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Focus</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Viết ngắn gọn, thực chiến và dễ áp dụng.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Blog này ưu tiên các bài về AI workflow, CI/CD, side project engineering và những insight có thể chuyển thành demo nhanh.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Topics</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {getAllTags().map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Featured</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Bài nổi bật</h2>
          </div>
          <Link href="/posts" className="text-sm text-cyan-200 hover:text-cyan-100">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Series</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Đọc theo lộ trình</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {series.map((item) => (
            <SeriesCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Latest notes</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Mới cập nhật</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
