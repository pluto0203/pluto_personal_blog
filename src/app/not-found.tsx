import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Không tìm thấy nội dung bạn cần.</h1>
      <p className="mt-3 text-slate-300">Có thể đường dẫn chưa đúng hoặc bài viết chưa được xuất bản.</p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
