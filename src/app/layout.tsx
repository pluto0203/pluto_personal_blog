import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SpaceBackground } from "@/components/space-background";
import { getAllCategories } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pluto0203.github.io/pluto_personal_blog/"),
  title: {
    default: "Pluto AI",
    template: "%s | Pluto AI",
  },
  description: "A modern tech/AI blog covering LLMs, engineering workflows and practical research notes.",
  openGraph: {
    title: "Pluto AI",
    description: "Exploring AI systems, software engineering, and the architecture of machine cognition.",
    siteName: "Pluto AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllCategories();

  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-[#030712] text-[#f0f0f0] antialiased">
        <SpaceBackground />
        <div className="relative z-10 min-h-screen text-[#f0f0f0]">
          <SiteHeader categories={categories} />
          <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
