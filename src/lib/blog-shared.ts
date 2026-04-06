export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  readTime: string;
  tags: string[];
  category: string;
  seed: number;
  featured?: boolean;
  seriesSlug?: string;
  draft?: boolean;
  content: string;
};

export function slugifyTaxonomy(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
