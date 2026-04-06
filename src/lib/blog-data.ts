export type PostSection = {
  title: string;
  paragraphs: string[];
  code?: string;
  note?: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  seriesSlug?: string;
  body: PostSection[];
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  cadence: string;
  level: string;
  postSlugs: string[];
};

export const siteConfig = {
  name: "Pluto Notes",
  headline: "Tech, AI và engineering notes được viết theo kiểu build in public.",
  description:
    "Một blog cá nhân về IT, AI và product engineering với phong cách tối giản, hiện đại và tập trung trải nghiệm đọc.",
  email: "hello@pluto-notes.dev",
  github: "https://github.com/your-handle",
};

export const series: Series[] = [
  {
    slug: "ai-building-blocks",
    title: "AI Building Blocks",
    description:
      "Series gom lại những kiến thức nền tảng để đi từ AI learner sang người có thể ship demo thực tế.",
    cadence: "1 bài / tuần",
    level: "Beginner → Intermediate",
    postSlugs: ["ai-engineer-roadmap-2026", "from-rag-note-to-mini-demo"],
  },
  {
    slug: "engineering-playbook",
    title: "Engineering Playbook",
    description:
      "Những ghi chú về workflow, CI/CD, DX và cách biến side project thành sản phẩm có thể vận hành gọn gàng.",
    cadence: "2 bài / tháng",
    level: "Practical",
    postSlugs: ["ship-blog-with-github-actions"],
  },
];

export const posts: Post[] = [
  {
    slug: "ai-engineer-roadmap-2026",
    title: "Roadmap AI Engineer 2026: học gì để build được sản phẩm?",
    description:
      "Một roadmap gọn để đi từ học lý thuyết sang build AI feature thật có thể demo và deploy.",
    excerpt:
      "Tập trung vào Python, data handling, LLM workflow, evaluation và tư duy ship nhanh những thứ nhỏ nhưng có giá trị.",
    date: "2026-04-01",
    readTime: "7 min read",
    tags: ["AI", "LLM", "Career"],
    featured: true,
    seriesSlug: "ai-building-blocks",
    body: [
      {
        title: "1. Đừng bắt đầu bằng framework",
        paragraphs: [
          "Nhiều người mới học AI thường nhảy thẳng vào framework hoặc tool rất nhanh, nhưng thứ cần trước tiên là tư duy problem framing: dữ liệu là gì, output mong muốn là gì, và cách đo chất lượng ra sao.",
          "Nếu bạn chưa trả lời được 3 câu hỏi này thì stack nào cũng chỉ là lớp trang trí bên ngoài.",
        ],
      },
      {
        title: "2. Core stack nên nắm",
        paragraphs: [
          "Một stack gọn nhưng đủ mạnh là: Python, pandas cơ bản, SQL, API, Docker căn bản, Git/GitHub, rồi mới đến embeddings, RAG và workflow orchestration.",
          "Mục tiêu không phải học hết, mà là đủ để build một demo nhỏ end-to-end và hiểu luồng dữ liệu di chuyển như thế nào.",
        ],
        code: "skills = [\n  'python',\n  'sql',\n  'api integration',\n  'llm prompting',\n  'evaluation mindset',\n]",
      },
      {
        title: "3. Nên ship gì đầu tiên?",
        paragraphs: [
          "Một semantic search mini, một chatbot hỏi đáp tài liệu nội bộ, hoặc một blog có AI note generator đều là những dự án đủ nhỏ để hoàn thành trong 1–2 tuần.",
          "Điểm quan trọng là phải có demo, có README, có ảnh chụp màn hình và có CI/CD để biến project thành thứ có thể chia sẻ công khai.",
        ],
        note: "Ship một thứ nhỏ nhưng hoàn chỉnh luôn tốt hơn 5 repo thử nghiệm dang dở.",
      },
    ],
  },
  {
    slug: "from-rag-note-to-mini-demo",
    title: "Từ note về RAG đến mini demo chạy được trong 1 cuối tuần",
    description:
      "Cách mình biến một loạt ghi chú rời rạc về retrieval augmented generation thành demo có thể dùng để học và trình bày.",
    excerpt:
      "Workflow ngắn: cắt scope, nạp dữ liệu nhỏ, đánh giá thủ công, rồi tối ưu UX trước khi nghĩ đến scale.",
    date: "2026-03-28",
    readTime: "6 min read",
    tags: ["AI", "RAG", "Project"],
    featured: true,
    seriesSlug: "ai-building-blocks",
    body: [
      {
        title: "1. Chọn bài toán thật nhỏ",
        paragraphs: [
          "Thay vì cố làm chatbot cho mọi thứ, hãy chọn một tập dữ liệu nhỏ và có cấu trúc rõ: ví dụ note học tập, docs sản phẩm hoặc bài blog cá nhân.",
          "Việc thu nhỏ scope sẽ giúp bạn nhìn thấy ngay chất lượng retrieval có thực sự ổn không.",
        ],
      },
      {
        title: "2. Đo bằng tay trước khi tối ưu",
        paragraphs: [
          "Trước khi bàn đến reranking hay fancy prompt, hãy tự viết 10 câu hỏi và kiểm tra xem top-k document trả về có hợp lý không.",
          "Evaluation thủ công ở giai đoạn đầu thường đem lại insight tốt hơn rất nhiều so với tối ưu mù quáng.",
        ],
        code: "queries = ['RAG là gì?', 'chunk size bao nhiêu hợp lý?', 'khi nào cần reranker?']\nfor q in queries:\n    print(retrieve(q))",
      },
      {
        title: "3. UX quyết định việc người khác có muốn dùng lại hay không",
        paragraphs: [
          "Một ô search gọn, trạng thái loading rõ ràng và vài câu hỏi mẫu thường có giá trị thực tế hơn một pipeline phức tạp nhưng khó tương tác.",
          "Nếu demo của bạn dễ thử trong 30 giây đầu tiên, nó sẽ dễ được nhớ tới hơn rất nhiều.",
        ],
      },
    ],
  },
  {
    slug: "ship-blog-with-github-actions",
    title: "Ship blog cá nhân bằng GitHub Actions mà không cần server riêng",
    description:
      "Thiết lập workflow build và deploy cho website cá nhân để mỗi lần push là site được cập nhật tự động.",
    excerpt:
      "Static export + GitHub Pages là lựa chọn gọn, rẻ và đủ mạnh để bắt đầu viết, chia sẻ và build credibility online.",
    date: "2026-03-20",
    readTime: "5 min read",
    tags: ["CI/CD", "Next.js", "GitHub"],
    featured: false,
    seriesSlug: "engineering-playbook",
    body: [
      {
        title: "1. Chọn hướng triển khai tối giản",
        paragraphs: [
          "Nếu blog của bạn chưa cần backend, static export là hướng đi rất hợp lý: nhanh, dễ cache, ít phát sinh chi phí và cực kỳ hợp với GitHub Pages.",
          "Phần quan trọng nhất là build phải deterministic và repo phải có workflow rõ ràng.",
        ],
      },
      {
        title: "2. Một workflow tốt nên làm gì?",
        paragraphs: [
          "Ít nhất workflow nên checkout code, setup Node, cài dependency, lint, type-check, build và cuối cùng deploy artifact lên Pages.",
          "Làm đủ các bước này từ đầu giúp dự án cá nhân trông chuyên nghiệp hơn hẳn.",
        ],
        code: "- run: npm ci\n- run: npm run lint\n- run: npm run typecheck\n- run: npm run build",
      },
      {
        title: "3. Viết đều quan trọng hơn tool hoàn hảo",
        paragraphs: [
          "Sau khi CI/CD ổn định, điều còn lại là thói quen viết bài đều và biến blog thành nơi lưu lại insight thật của bạn.",
          "Một blog sống động với các note thực chiến luôn có giá trị lâu dài hơn một landing page bóng bẩy nhưng trống nội dung.",
        ],
        note: "Tối ưu hệ thống một lần, rồi quay lại tập trung viết nội dung.",
      },
    ],
  },
];

export function getAllPosts() {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}

export function getLatestPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getSeriesBySlug(slug: string) {
  return series.find((item) => item.slug === slug);
}

export function getPostsBySeries(slug: string) {
  return getAllPosts().filter((post) => post.seriesSlug === slug);
}

export function getAllTags() {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}
