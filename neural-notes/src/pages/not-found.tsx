import { Link } from "wouter";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-['JetBrains_Mono'] text-[#00f5ff] text-sm mb-4 tracking-widest uppercase">404 — Not Found</p>
        <h1 className="text-5xl sm:text-7xl font-black mb-6">Lost in Latent Space</h1>
        <p className="text-[#a0a0a0] text-lg max-w-md mb-10">
          This page doesn't exist — or it got hallucinated. Either way, let's navigate back to something real.
        </p>
        <Link href="/">
          <button className="px-8 py-4 bg-[#00f5ff] text-[#0a0a0a] font-bold rounded-sm hover:bg-white hover:shadow-[0_0_24px_rgba(0,245,255,0.4)] transition-all duration-300 cursor-pointer">
            Return Home
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
