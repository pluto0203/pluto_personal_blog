import { siteConfig } from "@/lib/blog-data";

type NewsletterCardProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  placeholder?: string;
  subscribeUrl?: string;
};

export function NewsletterCard({
  title = "Join the Neural Network",
  description = "Deep research, delivered bi-weekly. No spam.",
  buttonLabel = "Subscribe",
  placeholder = "hello@world.com",
  subscribeUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL,
}: NewsletterCardProps) {
  const rssHref = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/rss.xml`;

  return (
    <div className="relative overflow-hidden rounded-sm border border-[#222222] bg-[#111111] p-5">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#00f5ff] to-[#c026d3]" />
      <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
      <p className="mb-4 text-xs text-[#a0a0a0]">{description}</p>

      {subscribeUrl ? (
        <form action={subscribeUrl} method="post" target="_blank" className="space-y-2">
          <input
            type="email"
            name="email"
            placeholder={placeholder}
            className="w-full rounded-sm border border-[#222222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#444] transition-colors focus:border-[#00f5ff] focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-sm bg-[#1a1a1a] py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#0a0a0a]"
          >
            {buttonLabel}
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <a
            href={`mailto:${siteConfig.email}?subject=Subscribe%20to%20Pluto%20AI`}
            className="flex w-full items-center justify-center rounded-sm bg-[#1a1a1a] py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#0a0a0a]"
          >
            {buttonLabel}
          </a>
          <p className="text-[11px] leading-5 text-[#606060]">Bạn có thể nối Buttondown/Mailchimp sau bằng `NEXT_PUBLIC_NEWSLETTER_URL`.</p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-[11px] text-[#606060]">
        <a href={rssHref} className="text-[#00f5ff] transition-colors hover:text-white">
          RSS feed
        </a>
        <span>•</span>
        <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-[#00f5ff]">
          Email trực tiếp
        </a>
      </div>
    </div>
  );
}
