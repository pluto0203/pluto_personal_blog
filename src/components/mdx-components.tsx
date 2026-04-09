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
      <h2 id={id} className="mb-6 mt-14 scroll-mt-24 border-l-4 border-[#00f5ff] pl-4 text-2xl font-black leading-tight text-white sm:text-3xl">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: ReactNode }) => {
    const id = slugifyTaxonomy(extractText(children));
    return (
      <h3 id={id} className="mb-4 mt-10 scroll-mt-24 text-xl font-black leading-snug text-white sm:text-[1.65rem]">
        {children}
      </h3>
    );
  },
  p: ({ children }: { children: ReactNode }) => <p className="mb-6 text-[1.05rem] leading-8 text-[#d8dee9] sm:text-[1.1rem]">{children}</p>,
  ul: ({ children }: { children: ReactNode }) => <ul className="mb-6 list-disc space-y-3 pl-6 text-[1.03rem] leading-8 text-[#d8dee9] sm:text-[1.08rem]">{children}</ul>,
  ol: ({ children }: { children: ReactNode }) => <ol className="mb-6 list-decimal space-y-3 pl-6 text-[1.03rem] leading-8 text-[#d8dee9] sm:text-[1.08rem]">{children}</ol>,
  li: ({ children }: { children: ReactNode }) => <li className="pl-1 leading-8">{children}</li>,
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-10 rounded-r-lg border-l-4 border-[#c026d3] bg-[#111111] px-5 py-4 text-[1.02rem] leading-8 text-[#c6ced8] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      {children}
    </blockquote>
  ),
  a: ({ href = "", children }: { href?: string; children: ReactNode }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="text-[#00f5ff] underline-offset-4 transition-colors hover:text-white hover:underline">
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-[#00f5ff] underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        {children}
      </a>
    );
  },
  strong: ({ children }: { children: ReactNode }) => <strong className="font-semibold text-white">{children}</strong>,
  code: ({ children }: { children: ReactNode }) => (
    <code className="rounded-md bg-[#111111] px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[0.95em] text-[#39ff14]">
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

    return <pre className="mb-8 overflow-x-auto">{children}</pre>;
  },
};
