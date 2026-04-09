import type { MetadataRoute } from "next";
import { getAllCategories, getAllPosts, series, siteConfig, slugifyTaxonomy } from "@/lib/blog-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/blog", "/series"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/post/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: post.featured ? 0.85 : 0.72,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/category/${slugifyTaxonomy(category)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const seriesRoutes: MetadataRoute.Sitemap = series.map((item) => ({
    url: `${siteConfig.url}/series/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...seriesRoutes];
}
