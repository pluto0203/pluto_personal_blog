import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { slugifyTaxonomy } from "@/lib/blog-shared";

function extractText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }

  if (isValidElement(children)) {
    return extractText((children.props as { children?: ReactNode }).children);
  }

  return "";
}

export const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => {
    const id = slugifyTaxonomy(extractText(children));
    return (
      <h2 id={id} className="mb-5 mt-12 scroll-mt-24 border-l-4 border-[#00f5ff] pl-4 text-2xl font-black text-white">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: ReactNode }) => {
    const id = slugifyTaxonomy(extractText(children));
    return (
      <h3 id={id} className="mb-4 mt-10 scroll-mt-24 text-xl font-black text-white">
        {children}
      </h3>
    );
  },
  p: ({ children }: { children: ReactNode }) => <p className="mb-5 leading-relaxed text-[#d0d0d0]">{children}</p>,
  ul: ({ children }: { children: ReactNode }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-[#d0d0d0]">{children}</ul>,
  ol: ({ children }: { children: ReactNode }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-[#d0d0d0]">{children}</ol>,
  li: ({ children }: { children: ReactNode }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-8 rounded-r-sm border-l-4 border-[#c026d3] bg-[#111111] p-5 italic text-[#a0a0a0]">
      {children}
    </blockquote>
  ),
  a: ({ href = "", children }: { href?: string; children: ReactNode }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="text-[#00f5ff] underline-offset-4 hover:underline">
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-[#00f5ff] underline-offset-4 hover:underline">
        {children}
      </a>
    );
  },
  code: ({ children }: { children: ReactNode }) => (
    <code className="rounded bg-[#111111] px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#39ff14]">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => {
    if (isValidElement(children)) {
      const childProps = children.props as { className?: string; children?: ReactNode };
      const language = childProps.className?.replace("language-", "") ?? "text";
      const code = extractText(childProps.children).replace(/\n$/, "");
      return <CodeBlock code={code} language={language} />;
    }

    return <pre className="mb-5 overflow-x-auto">{children}</pre>;
  },
};
