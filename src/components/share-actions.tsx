"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { SocialLinks } from "@/components/social-links";

type ShareActionsProps = {
  compact?: boolean;
};

export function ShareActions({ compact = false }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const containerClass = compact ? "flex items-center gap-2" : "flex items-center gap-2";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const buttonClass = "flex h-8 w-8 items-center justify-center rounded-full border border-[#222222] bg-[#111111] text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff]";

  return (
    <div className={containerClass}>
      <SocialLinks />
      <button onClick={handleCopyLink} className={buttonClass} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-[#39ff14]" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
