import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Giới thiệu nhanh về Pluto Notes và định hướng nội dung của blog.",
};

const principles = [
  "Viết ngắn gọn nhưng có chiều sâu và ví dụ thực tế.",
  "Ưu tiên các bài có thể build, đo và deploy được.",
  "Tập trung vào AI, developer experience và side project engineering.",
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">About</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Một góc nhỏ để lưu lại note về tech và AI.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Pluto Notes được dựng như một digital garden tối giản: nơi lưu các bài viết về AI, engineering workflow,
          CI/CD và những gì học được khi build side project thực tế.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
            {item}
          </div>
        ))}
      </section>
    </div>
  );
}
