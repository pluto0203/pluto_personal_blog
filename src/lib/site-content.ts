export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialPlatform = "github" | "x" | "linkedin" | "facebook";

export type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
  ariaLabel: string;
};

export const NAV_LINKS: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
];

export const FOOTER_LINKS: SiteLink[] = [
  { label: "About the Author", href: "/about" },
  { label: "Research Archive", href: "/archive" },
  { label: "Latest Blog Posts", href: "/blog" },
  { label: "GitHub Repository", href: "https://github.com/pluto0203/pluto_personal_blog", external: true },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/pluto0203",
    platform: "github",
    ariaLabel: "GitHub",
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com",
    platform: "x",
    ariaLabel: "X / Twitter",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/duynvt2003",
    platform: "facebook",
    ariaLabel: "Facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/duynvt0203/",
    platform: "linkedin",
    ariaLabel: "LinkedIn",
  },
];

export const TRENDING_TOPICS = [
  "Why RLHF is the new fine-tuning",
  "Deploying VLLMs on consumer hardware",
  "The mathematics of vector embeddings",
];

export const FEATURED_PAPERS = [
  { title: "Attention Is All You Need", arxiv: "1706.03762", date: "Jun 2017" },
  { title: "Language Models are Few-Shot Learners", arxiv: "2005.14165", date: "May 2020" },
];

export const ABOUT_TOPICS = [
  "LLM architecture and model behavior",
  "Prompt engineering for production systems",
  "RAG, embeddings, and semantic search",
  "Evaluation and benchmarking for LLM apps",
  "Practical ML tooling and CI/CD workflows",
  "Developer experience for solo builders",
];

export const ABOUT_STATS = [
  { label: "Articles", value: "6" },
  { label: "Words Written", value: "24k+" },
  { label: "Years Active", value: "1" },
  { label: "Categories", value: "6" },
];

export const NEWSLETTER_COPY = {
  title: "Join the Neural Network",
  description: "Deep research, delivered bi-weekly. No spam.",
  buttonLabel: "Subscribe",
  placeholder: "hello@world.com",
};
