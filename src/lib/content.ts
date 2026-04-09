import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Post, slugifyTaxonomy } from "@/lib/blog-shared";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

type RawPostFrontmatter = {
  title?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  category?: string;
  seed?: number;
  featured?: boolean;
  seriesSlug?: string;
  draft?: boolean;
};

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function formatDateLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const normalizedDate = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(normalizedDate);
}

function calculateReadingTime(content: string) {
  const words = content
    .replace(/[\n`*_>#-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} phút đọc`;
}

function getPostFiles() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs.readdirSync(POSTS_DIRECTORY).filter((fileName) => /\.mdx?$/.test(fileName));
}

function parsePostFile(fileName: string): Post {
  const filePath = path.join(POSTS_DIRECTORY, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as RawPostFrontmatter;

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(`Missing required frontmatter in ${fileName}`);
  }

  return {
    slug: fileName.replace(/\.mdx?$/, ""),
    title: frontmatter.title,
    description: frontmatter.description ?? frontmatter.excerpt ?? "",
    excerpt: frontmatter.excerpt ?? frontmatter.description ?? "",
    date: frontmatter.date,
    dateLabel: formatDateLabel(frontmatter.date),
    readTime: calculateReadingTime(content),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    category: frontmatter.category ?? "General",
    seed: Number(frontmatter.seed ?? 0),
    featured: Boolean(frontmatter.featured),
    seriesSlug: frontmatter.seriesSlug,
    draft: Boolean(frontmatter.draft),
    content: content.trim(),
  };
}

export function getAllPosts() {
  return getPostFiles()
    .map(parsePostFile)
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}

export function getLatestPosts(limit = 6) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsBySeries(slug: string) {
  return getAllPosts().filter((post) => post.seriesSlug === slug);
}

export function getPostsByCategorySlug(slug: string) {
  return getAllPosts().filter(
    (post) => slugifyTaxonomy(post.category) === slug || post.tags.some((tag) => slugifyTaxonomy(tag) === slug),
  );
}

export function getAllTags() {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}

export function getAllCategories() {
  return Array.from(new Set(getAllPosts().map((post) => post.category))).sort();
}

export function getPostHeadings(content: string): TocHeading[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "").trim();
      return {
        id: slugifyTaxonomy(text),
        text,
        level,
      };
    });
}
