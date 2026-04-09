import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const cwd = process.cwd();
const postsDirectory = path.join(cwd, "content", "posts");
const outputPath = path.join(cwd, "public", "rss.xml");

const repo = process.env.GITHUB_REPOSITORY ?? "pluto0203/pluto_personal_blog";
const [owner, repoName] = repo.split("/");
const isUserOrOrgPage = repoName?.endsWith(".github.io");
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (isUserOrOrgPage ? `https://${repoName}` : `https://${owner}.github.io/${repoName}`);

function escapeXml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const files = fs
  .readdirSync(postsDirectory)
  .filter((fileName) => /\.mdx?$/.test(fileName) && !fileName.startsWith("_"));

const items = files
  .map((fileName) => {
    const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
    const { data, content } = matter(source);

    if (data.draft) {
      return null;
    }

    const slug = fileName.replace(/\.mdx?$/, "");
    const title = data.title ?? slug;
    const description = data.description ?? data.excerpt ?? content.slice(0, 180);
    const date = data.date ? new Date(data.date) : new Date();

    return {
      slug,
      title,
      description,
      date,
      category: data.category ?? "AI",
      url: `${siteUrl}/post/${slug}/`,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.date.getTime() - a.date.getTime());

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Pluto AI</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Một dev blog cá nhân về LLMs, prompt engineering, RAG, tooling và mini-project AI.</description>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`,
      )
      .join("")}
  </channel>
</rss>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, rss, "utf8");
console.log(`Generated RSS feed at ${outputPath}`);
