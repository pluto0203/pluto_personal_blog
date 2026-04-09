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
export { author, slugifyTaxonomy } from "@/lib/blog-shared";

export type Series = {
  slug: string;
  title: string;
  description: string;
  cadence: string;
  level: string;
  postSlugs: string[];
};

export const siteConfig = {
  name: "Pluto AI",
  headline: "Mình là Duy — ghi lại hành trình học AI, build RAG demo và ship LLM side project theo cách thực tế nhất có thể.",
  description:
    "Một dev blog cá nhân về LLMs, prompt engineering, RAG, tooling và những mini-project biến ghi chú kỹ thuật thành demo có thể chạy được.",
  email: "duynvt.work@gmail.com",
  github: "https://github.com/pluto0203",
  url: "https://pluto0203.github.io/pluto_personal_blog",
};

export const series: Series[] = [
  {
    slug: "ai-building-blocks",
    title: "Toán học cho AI",
    description: "Chuỗi bài đi từ intuition đến công thức, giúp việc học attention, embeddings và đánh giá model trở nên bớt mơ hồ hơn.",
    cadence: "Bi-weekly",
    level: "Beginner → Intermediate",
    postSlugs: ["attention-mechanisms-transformers", "from-rag-note-to-mini-demo", "evaluate-llm-apps"],
  },
  {
    slug: "engineering-playbook",
    title: "Tôi đã thử và thất bại",
    description: "Một series thực tế về những lần build side project AI chưa trơn tru, các sai lầm gặp phải và điều rút ra sau mỗi lần thử.",
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
