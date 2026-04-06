import {
  getAllCategories as getContentCategories,
  getAllPosts as getContentPosts,
  getAllTags as getContentTags,
  getFeaturedPosts as getContentFeaturedPosts,
  getLatestPosts as getContentLatestPosts,
  getPostBySlug as getContentPostBySlug,
  getPostsByCategorySlug as getContentPostsByCategorySlug,
  getPostsBySeries as getContentPostsBySeries,
} from "@/lib/content";

export type { Post } from "@/lib/blog-shared";
export { slugifyTaxonomy } from "@/lib/blog-shared";

export type Series = {
  slug: string;
  title: string;
  description: string;
  cadence: string;
  level: string;
  postSlugs: string[];
};

export const author = {
  name: "Duy Nguyen Vo Thanh",
  initials: "D",
  role: "AI Engineer · AI Agent",
};

export const siteConfig = {
  name: "Pluto AI",
  headline: "Exploring AI systems, software engineering, and the architecture of machine cognition.",
  description:
    "Research-grade depth, practitioner-grade clarity — một blog cá nhân về AI, LLMs, tooling và cách build side project chỉn chu.",
  email: "duynvt.work@gmail.com",
  github: "https://github.com/pluto0203",
};

export const series: Series[] = [
  {
    slug: "ai-building-blocks",
    title: "AI Building Blocks",
    description: "Những bài nền tảng để đi từ người học AI sang người có thể build demo và ship feature thực tế.",
    cadence: "Bi-weekly",
    level: "Beginner → Intermediate",
    postSlugs: ["attention-mechanisms-transformers", "from-rag-note-to-mini-demo", "evaluate-llm-apps"],
  },
  {
    slug: "engineering-playbook",
    title: "Engineering Playbook",
    description: "Workflow về CI/CD, deployment, DX và các thực hành giúp side project trở nên đáng tin cậy hơn.",
    cadence: "Weekly",
    level: "Practical",
    postSlugs: ["ship-blog-with-github-actions", "prompt-engineering-production"],
  },
];

export function getAllPosts() {
  return getContentPosts();
}

export function getFeaturedPosts() {
  return getContentFeaturedPosts();
}

export function getLatestPosts(limit = 6) {
  return getContentLatestPosts(limit);
}

export function getPostBySlug(slug: string) {
  return getContentPostBySlug(slug);
}

export function getSeriesBySlug(slug: string) {
  return series.find((item) => item.slug === slug);
}

export function getPostsBySeries(slug: string) {
  return getContentPostsBySeries(slug);
}

export function getPostsByCategorySlug(slug: string) {
  return getContentPostsByCategorySlug(slug);
}

export function getAllTags() {
  return getContentTags();
}

export function getAllCategories() {
  return getContentCategories();
}
