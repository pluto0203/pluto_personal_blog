import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Pluto Notes",
    template: "%s | Pluto Notes",
  },
  description:
    "Blog cá nhân về IT, AI, CI/CD và những ghi chú thực chiến khi build side project.",
  openGraph: {
    title: "Pluto Notes",
    description: "Modern tech/AI blog built with Next.js and deployed by GitHub Actions.",
    siteName: "Pluto Notes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_0,_transparent_45%),radial-gradient(circle_at_right,_rgba(168,85,247,0.12),_transparent_0,_transparent_35%),linear-gradient(180deg,_#020617_0%,_#020617_100%)] text-slate-100">
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
