"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";

type ShareActionsProps = {
  compact?: boolean;
};

export function ShareActions({ compact = false }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const buttonClass = compact
    ? "flex h-8 w-8 items-center justify-center rounded-full border border-[#222222] bg-[#111111] text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
    : "flex h-8 w-8 items-center justify-center rounded-full border border-[#222222] bg-[#111111] text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff]";

  return (
    <div className="flex items-center gap-2">
      <a href="https://twitter.com" target="_blank" rel="noreferrer" className={buttonClass} aria-label="Share on X">
        <XIcon className="h-4 w-4" />
      </a>
      <a href="https://github.com" target="_blank" rel="noreferrer" className={buttonClass} aria-label="GitHub profile">
        <GitHubIcon className="h-4 w-4" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={buttonClass} aria-label="Share on LinkedIn">
        <LinkedInIcon className="h-4 w-4" />
      </a>
      <button onClick={handleCopyLink} className={buttonClass} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-[#39ff14]" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
