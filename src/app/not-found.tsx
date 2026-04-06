import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl py-20 text-center">
      <div className="rounded-sm border border-[#222222] bg-[#111111] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-[#00f5ff]">404</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">The page you requested was not found.</h1>
        <p className="mt-3 text-[#a0a0a0]">The route may be wrong, unpublished, or no longer available.</p>
        <Link href="/" className="mt-6 inline-flex rounded-sm bg-[#00f5ff] px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition hover:bg-white">
          Return Home
        </Link>
      </div>
    </div>
  );
}
