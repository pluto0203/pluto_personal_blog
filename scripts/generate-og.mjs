import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT_DIR = path.join(process.cwd(), "public", "og");

async function loadFont() {
  const res = await fetch(
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhjA.woff",
  );
  return res.arrayBuffer();
}

function getPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), "utf8"));
      return {
        slug: f.replace(/\.mdx?$/, ""),
        title: data.title ?? "Untitled",
        category: data.category ?? "General",
      };
    });
}

async function generateOgImage(slug, title, category, fontData) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0d1522 100%)",
          fontFamily: "Inter",
          position: "relative",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #00f5ff, #c026d3)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00f5ff",
                marginBottom: "20px",
                padding: "6px 14px",
                border: "1px solid rgba(0,245,255,0.3)",
                borderRadius: "999px",
                width: "fit-content",
              },
              children: category,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: title.length > 60 ? "40px" : "52px",
                fontWeight: "700",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "40px",
                maxWidth: "900px",
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "2px solid rgba(0,245,255,0.4)",
                      background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(192,38,211,0.2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00f5ff",
                      fontSize: "14px",
                      fontWeight: "700",
                    },
                    children: "DV",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { color: "#a0a0a0", fontSize: "16px" },
                    children: "Pluto AI",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log("Loading font...");
  const fontData = await loadFont();

  const posts = getPosts();
  console.log(`Generating OG images for ${posts.length} posts...`);

  for (const { slug, title, category } of posts) {
    const outPath = path.join(OUT_DIR, `${slug}.png`);
    const png = await generateOgImage(slug, title, category, fontData);
    fs.writeFileSync(outPath, png);
    console.log(`  ✓ ${slug}.png`);
  }

  console.log("Done.");
}

main().catch(console.error);
