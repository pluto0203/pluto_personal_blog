import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SpaceBackground } from "@/components/space-background";
import { author, siteConfig } from "@/lib/blog-data";
import { getAllCategories } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["AI blog", "LLMs", "Prompt Engineering", "RAG", "AI tools", "Machine Learning", "GitHub Pages"],
  authors: [{ name: author.name, url: siteConfig.github }],
  creator: author.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/PlutoAI.jpg",
        width: 1200,
        height: 630,
        alt: "Pluto AI blog preview cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/PlutoAI.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllCategories();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key='pluto-theme';var stored=localStorage.getItem(key);document.documentElement.dataset.theme=stored==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300">
        <Analytics />
        <SpaceBackground />
        <div className="relative z-10 min-h-screen text-[var(--foreground)]">
          <SiteHeader categories={categories} />
          <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
