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
  { label: "Series", href: "/series" },
  { label: "About", href: "/about" },
];

export const FOOTER_LINKS: SiteLink[] = [
  { label: "About the Author", href: "/about" },
  { label: "Series & Reading Paths", href: "/series" },
  { label: "Latest Blog Posts", href: "/blog" },
  { label: "RSS Feed", href: "/rss.xml", external: true },
  { label: "GitHub Discussions", href: "https://github.com/pluto0203/pluto_personal_blog/discussions", external: true },
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
  description: "Subscribe via email form or RSS để nhận bài mới. No spam.",
  buttonLabel: "Subscribe",
  placeholder: "hello@world.com",
};

export const HERO_PILLS = ["LLMs Research", "Prompt Engineering", "RAG mini demos", "Tools & Notes"];

export const CATEGORY_GUIDE = [
  {
    title: "LLMs Research",
    slug: "llms",
    description: "Attention, model behavior, evaluation notes và những concept lõi để hiểu LLM tốt hơn.",
  },
  {
    title: "Prompt Engineering",
    slug: "prompting",
    description: "Prompt patterns, guardrails và workflow để đưa prompt vào production một cách sạch sẽ.",
  },
  {
    title: "RAG & Tools",
    slug: "tools",
    description: "Mini-project, retrieval demo và các utility nhỏ giúp học nhanh bằng cách tự build.",
  },
  {
    title: "Research Notes",
    slug: "research",
    description: "Các bài so sánh, benchmark và ghi chú để đọc paper có hệ thống hơn.",
  },
  {
    title: "AI Notes",
    slug: "ai",
    description: "Roadmap, mental model và note dành cho người đang chuyển từ học sang làm thực tế.",
  },
  {
    title: "CI/CD for Builders",
    slug: "ci-cd",
    description: "Deploy, GitHub Actions và thói quen ship đều tay cho side project AI.",
  },
];

export type ProjectShowcase = {
  title: string;
  description: string;
  stack: string[];
  sourceHref: string;
  sourceLabel: string;
  demoHref?: string;
  demoLabel?: string;
  status: string;
};

export const PROJECT_SHOWCASE: ProjectShowcase[] = [
  {
    title: "Pluto Personal Blog",
    description: "Static blog về AI/LLMs với MDX, taxonomy routing, dark/light mode và workflow deploy lên GitHub Pages.",
    stack: ["Next.js", "MDX", "GitHub Actions"],
    sourceHref: "https://github.com/pluto0203/pluto_personal_blog",
    sourceLabel: "GitHub repo",
    demoHref: "https://pluto0203.github.io/pluto_personal_blog/",
    demoLabel: "Live site",
    status: "Live",
  },
  {
    title: "Weekend RAG Demo",
    description: "Prototype cuối tuần để thử retrieval pipeline, chunking và answer synthesis trên bộ note cá nhân.",
    stack: ["RAG", "Embeddings", "Python"],
    sourceHref: "https://github.com/pluto0203",
    sourceLabel: "Source code",
    status: "Prototype",
  },
  {
    title: "Prompt Engineering Toolkit",
    description: "Bộ playground nhỏ để test prompt variants, compare outputs và ghi lại prompt patterns dùng được thật.",
    stack: ["Prompting", "Evaluation", "UI"],
    sourceHref: "https://github.com/pluto0203",
    sourceLabel: "GitHub profile",
    status: "In progress",
  },
];
