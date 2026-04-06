type NewsletterCardProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  placeholder?: string;
};

export function NewsletterCard({
  title = "Join the Neural Network",
  description = "Deep research, delivered bi-weekly. No spam.",
  buttonLabel = "Subscribe",
  placeholder = "hello@world.com",
}: NewsletterCardProps) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-[#222222] bg-[#111111] p-5">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#00f5ff] to-[#c026d3]" />
      <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
      <p className="mb-4 text-xs text-[#a0a0a0]">{description}</p>
      <form className="space-y-2">
        <input
          type="email"
          placeholder={placeholder}
          className="w-full rounded-sm border border-[#222222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#444] transition-colors focus:border-[#00f5ff] focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-sm bg-[#1a1a1a] py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#00f5ff] hover:text-[#0a0a0a]"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
