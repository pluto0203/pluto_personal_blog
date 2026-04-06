import { FacebookIcon, GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { SOCIAL_LINKS, type SocialLink, type SocialPlatform } from "@/lib/site-content";

type SocialLinksProps = {
  variant?: "icon" | "pill";
  links?: SocialLink[];
};

function getIcon(platform: SocialPlatform) {
  switch (platform) {
    case "github":
      return GitHubIcon;
    case "linkedin":
      return LinkedInIcon;
    case "facebook":
      return FacebookIcon;
    case "x":
    default:
      return XIcon;
  }
}

export function SocialLinks({ variant = "icon", links = SOCIAL_LINKS }: SocialLinksProps) {
  if (variant === "pill") {
    return (
      <div className="flex flex-wrap gap-3">
        {links.map((link) => {
          const Icon = getIcon(link.platform);
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-sm border border-[#222222] bg-[#111111] px-4 py-2 text-sm text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
              aria-label={link.ariaLabel}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
        const Icon = getIcon(link.platform);
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.ariaLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#222222] bg-[#111111] text-[#a0a0a0] transition-all hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
