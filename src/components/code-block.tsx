"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, language = "text" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative my-8 overflow-hidden rounded-sm border border-[#222222] bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[#222222] bg-[#161b22] px-4 py-2">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-[#a0a0a0]">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#a0a0a0] transition-colors hover:text-[#00f5ff]"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#39ff14]" />
              <span className="text-[#39ff14]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-[#e0e0e0]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
