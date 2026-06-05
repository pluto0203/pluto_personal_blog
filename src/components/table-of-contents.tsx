"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/content";

export function TableOfContents({ items }: { items: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block rounded-r-sm border-l-2 px-3 py-1 text-[13px] leading-5 transition-all ${
              item.level === 3 ? "ml-3" : ""
            } ${
              activeId === item.id
                ? "border-[#00f5ff] bg-white/[0.04] text-[#eefaff]"
                : "border-transparent text-[#9098a6] hover:border-[#00f5ff]/40 hover:bg-white/[0.03] hover:text-[#eefaff]"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
