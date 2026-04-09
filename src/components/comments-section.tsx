"use client";

import { MessageSquareText } from "lucide-react";
import { useEffect, useRef } from "react";

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General";
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
const fallbackDiscussionUrl = process.env.NEXT_PUBLIC_GITHUB_DISCUSSIONS_URL ?? "https://github.com/pluto0203/pluto_personal_blog/discussions";

function getGiscusTheme(theme: string | undefined) {
  return theme === "light" ? "light" : "dark_dimmed";
}

export function CommentsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isConfigured = Boolean(repo && repoId && category && categoryId);

  useEffect(() => {
    if (!isConfigured || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo ?? "");
    script.setAttribute("data-repo-id", repoId ?? "");
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId ?? "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-lang", "vi");
    script.setAttribute("data-theme", getGiscusTheme(document.documentElement.dataset.theme));

    container.appendChild(script);

    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null;
      iframe?.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: getGiscusTheme(document.documentElement.dataset.theme),
            },
          },
        },
        "https://giscus.app",
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, [isConfigured]);

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#0d1522]/80 p-5 sm:p-6" aria-labelledby="comments-heading">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquareText className="h-4 w-4 text-[#00f5ff]" />
        <h2 id="comments-heading" className="text-lg font-bold text-white">
          Thảo luận & bình luận
        </h2>
      </div>

      {isConfigured ? (
        <div ref={containerRef} />
      ) : (
        <div className="space-y-3 text-sm leading-6 text-[#a0a0a0]">
          <p>
            Phần bình luận đã được chuẩn bị sẵn cho <strong className="text-white">Giscus</strong> để hoạt động tốt với GitHub Pages.
          </p>
          <p>
            Chỉ cần thêm các biến `NEXT_PUBLIC_GISCUS_*` trong `.env.local`, hoặc tạm thời mở thảo luận qua GitHub Discussions.
          </p>
          <a
            href={fallbackDiscussionUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-sm border border-[#00f5ff]/40 px-4 py-2 font-semibold text-[#00f5ff] transition-colors hover:bg-[#00f5ff]/10"
          >
            Mở GitHub Discussions
          </a>
        </div>
      )}
    </section>
  );
}
