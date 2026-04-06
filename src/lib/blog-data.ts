export type PostSection = {
  title: string;
  paragraphs: string[];
  code?: string;
  language?: string;
  note?: string;
};

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

export const author = {
  name: "Pluto",
  initials: "PT",
  role: "AI Explorer · Engineer · Writer",
};

export const siteConfig = {
  name: "Neural Notes",
  headline: "Exploring AI systems, software engineering, and the architecture of machine cognition.",
  description:
    "Research-grade depth, practitioner-grade clarity — một blog cá nhân về AI, LLMs, tooling và cách build side project chỉn chu.",
  email: "hello@neural-notes.dev",
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

export const posts: Post[] = [
  {
    slug: "attention-mechanisms-transformers",
    title: "Understanding Attention Mechanisms in Transformers",
    description:
      "A deep dive into the intuition and the math that makes self-attention work so well in modern language models.",
    excerpt:
      "Từ intuition đến công thức scaled dot-product attention, bài này giúp bạn nối research concept với cách LLM thực sự xử lý ngữ cảnh.",
    date: "2026-04-05",
    dateLabel: "Apr 05, 2026",
    readTime: "12 min read",
    tags: ["LLMs", "Research"],
    category: "LLMs",
    seed: 0,
    featured: true,
    seriesSlug: "ai-building-blocks",
    body: [
      {
        title: "Introduction",
        paragraphs: [
          "Before transformers, sequence models relied on recurrent architectures that struggled with long-range dependencies and parallelization. Attention changed that trade-off completely.",
          "Khi bạn hiểu attention như một cơ chế phân bổ mức độ tập trung theo ngữ cảnh, các khái niệm như prompt engineering, RAG hay context window sẽ trở nên trực quan hơn rất nhiều.",
        ],
      },
      {
        title: "The Attention Formula",
        paragraphs: [
          "Ở lõi của transformer là scaled dot-product attention: một phép tính đơn giản nhưng cực kỳ mạnh, nơi mỗi token tính trọng số lên các token khác dựa trên query, key và value.",
          "Việc chia cho căn bậc hai của dimension giúp giữ cho softmax không bị đẩy vào vùng gradient quá nhỏ khi vector có độ lớn cao.",
        ],
        code: "import torch\nimport math\n\ndef scaled_dot_product_attention(q, k, v):\n    d_k = q.size(-1)\n    scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)\n    weights = torch.softmax(scores, dim=-1)\n    return torch.matmul(weights, v), weights",
        language: "python",
      },
      {
        title: "Multi-Head Attention",
        paragraphs: [
          "Thay vì một góc nhìn duy nhất, multi-head attention cho phép model học nhiều quan hệ khác nhau trong cùng một câu: cú pháp, ngữ nghĩa, thực thể hoặc dependencies xa nhau.",
          "Đây là lý do transformer vừa expressive vừa phù hợp với hạ tầng GPU hiện đại.",
        ],
      },
      {
        title: "Practical Implications",
        paragraphs: [
          "Hiểu attention không chỉ để đọc paper. Nó giúp bạn viết prompt tốt hơn, đánh giá context saturation và đưa ra quyết định thực tế khi xây hệ thống dựa trên LLM.",
          "Các kỹ thuật như Flash Attention hay sparse attention đều là nỗ lực tối ưu cùng một nguyên lý cốt lõi này.",
        ],
        note: "Prompt engineering hiệu quả thường là cách bạn sắp xếp lại attention landscape của model, chứ không chỉ là 'viết prompt hay'.",
      },
    ],
  },
  {
    slug: "prompt-engineering-production",
    title: "Prompt Engineering Patterns for Production Systems",
    description:
      "Các pattern prompt gọn, ổn định và dễ maintain khi bạn cần đưa LLM vào flow của sản phẩm thật.",
    excerpt:
      "Tập trung vào prompt templates, delimiters, structured output và cách giảm tính mong manh khi scale lên production.",
    date: "2026-04-02",
    dateLabel: "Apr 02, 2026",
    readTime: "8 min read",
    tags: ["Prompting", "Tools"],
    category: "Prompting",
    seed: 1,
    featured: true,
    seriesSlug: "engineering-playbook",
    body: [
      {
        title: "Set the contract first",
        paragraphs: [
          "Một prompt production-grade nên bắt đầu từ contract rõ ràng: input là gì, output format ra sao, tiêu chí fail là gì. Nếu contract mơ hồ thì kết quả cũng sẽ mơ hồ.",
          "Structured output, examples ngắn và delimiter nhất quán luôn có giá trị hơn prompt dài nhưng không có tổ chức.",
        ],
      },
      {
        title: "Use layered instructions",
        paragraphs: [
          "Chia prompt thành system intent, task instructions, context, constraints và output schema giúp bạn debug dễ hơn nhiều khi chất lượng bắt đầu lệch.",
          "Layering cũng giúp tái sử dụng tốt khi cùng một model phục vụ nhiều luồng tác vụ khác nhau.",
        ],
        code: "SYSTEM: You are a precise technical editor.\nTASK: Summarize the note in 3 bullets.\nCONSTRAINTS: Keep terminology accurate, no hype.\nOUTPUT: JSON with title, bullets, risk.",
        language: "prompt",
      },
      {
        title: "Evaluate before scaling",
        paragraphs: [
          "Đừng rollout chỉ vì vài ví dụ đầu trông đẹp. Hãy tạo tập test nhỏ với edge cases và đo consistency trước khi nghĩ đến việc thêm model hoặc tool phức tạp hơn.",
        ],
      },
    ],
  },
  {
    slug: "from-rag-note-to-mini-demo",
    title: "From a RAG note to a mini demo in one weekend",
    description:
      "Một cách tiếp cận gọn để biến ghi chú về RAG thành demo nhỏ nhưng trình bày được và học được nhiều thứ thật.",
    excerpt:
      "Scope nhỏ, evaluation thủ công, UX rõ ràng — đó là công thức tốt hơn hẳn việc lao vào một pipeline quá lớn ngay từ đầu.",
    date: "2026-03-28",
    dateLabel: "Mar 28, 2026",
    readTime: "10 min read",
    tags: ["Tools", "RAG"],
    category: "Tools",
    seed: 2,
    featured: true,
    seriesSlug: "ai-building-blocks",
    body: [
      {
        title: "Choose a tiny problem",
        paragraphs: [
          "Một demo RAG tốt không cần dữ liệu lớn. Chỉ cần một corpus nhỏ nhưng có cấu trúc và vài câu hỏi thực tế là đủ để bạn học được retrieval, chunking và evaluation.",
        ],
      },
      {
        title: "Measure manually first",
        paragraphs: [
          "Trước khi thêm reranker hay tối ưu prompt, hãy tự kiểm tra top-k results bằng tay. Đây là cách nhanh nhất để biết retrieval có đang thực sự trả đúng ngữ cảnh hay không.",
        ],
        code: "queries = ['What is RAG?', 'When do we need reranking?', 'How should chunk size be chosen?']\nfor query in queries:\n    print(retrieve(query))",
        language: "python",
      },
      {
        title: "Polish the first 30 seconds of UX",
        paragraphs: [
          "Nếu người khác có thể thử demo của bạn trong 30 giây đầu và hiểu ngay nó làm gì, project đó sẽ có giá trị hơn rất nhiều so với một pipeline phức tạp nhưng khó chạm vào.",
        ],
      },
    ],
  },
  {
    slug: "ai-engineer-roadmap-2026",
    title: "Roadmap AI Engineer 2026: what to learn to build real products",
    description:
      "Một roadmap súc tích cho người muốn đi từ học AI sang build được feature thật có thể demo và deploy.",
    excerpt:
      "Python, SQL, APIs, evaluation mindset và khả năng ship end-to-end là những mảnh ghép quan trọng hơn việc chạy theo framework mới nhất.",
    date: "2026-03-22",
    dateLabel: "Mar 22, 2026",
    readTime: "7 min read",
    tags: ["AI", "Career"],
    category: "AI",
    seed: 3,
    featured: false,
    seriesSlug: "ai-building-blocks",
    body: [
      {
        title: "Start from problem framing",
        paragraphs: [
          "Đừng bắt đầu bằng framework. Hãy bắt đầu bằng bài toán, loại dữ liệu, kỳ vọng đầu ra và cách đo chất lượng. Đây là phần quyết định liệu project AI của bạn có giá trị hay chỉ là demo đẹp mắt.",
        ],
      },
      {
        title: "Learn the core stack",
        paragraphs: [
          "Một stack gọn nhưng mạnh: Python, SQL, APIs, Git/GitHub, Docker cơ bản, rồi mới tới embeddings, RAG hay orchestration. Mục tiêu là hiểu end-to-end, không phải học mọi thứ.",
        ],
        code: "skills = ['python', 'sql', 'api integration', 'llm prompting', 'evaluation mindset']",
        language: "python",
      },
      {
        title: "Ship one complete project",
        paragraphs: [
          "Một project nhỏ nhưng hoàn chỉnh, có README, screenshots và CI/CD luôn thuyết phục hơn nhiều repo dở dang. Hãy tối ưu cho completion, không chỉ exploration.",
        ],
      },
    ],
  },
  {
    slug: "ship-blog-with-github-actions",
    title: "Ship a personal blog with GitHub Actions and no server",
    description:
      "Cách thiết lập pipeline build và deploy cho website cá nhân để mỗi lần push là site tự cập nhật.",
    excerpt:
      "Static export + GitHub Pages là một lựa chọn rất gọn, cực phù hợp cho personal blog thiên về nội dung và credibility online.",
    date: "2026-03-18",
    dateLabel: "Mar 18, 2026",
    readTime: "6 min read",
    tags: ["CI/CD", "GitHub"],
    category: "CI/CD",
    seed: 4,
    featured: false,
    seriesSlug: "engineering-playbook",
    body: [
      {
        title: "Keep the deployment path simple",
        paragraphs: [
          "Nếu site chưa cần backend, static export là lựa chọn hợp lý: nhanh, dễ cache, ít chi phí vận hành và cực kỳ hợp với GitHub Pages.",
        ],
      },
      {
        title: "Build a real quality gate",
        paragraphs: [
          "Workflow tối thiểu nên có checkout, setup node, install, lint, type-check, build và deploy. Làm đúng từ đầu giúp side project cá nhân trông chuyên nghiệp hơn rất nhiều.",
        ],
        code: "- run: npm ci\n- run: npm run lint\n- run: npm run typecheck\n- run: npm run build",
        language: "yaml",
      },
      {
        title: "Then focus on writing",
        paragraphs: [
          "Sau khi pipeline ổn định, phần quan trọng nhất là duy trì thói quen viết và biến blog thành nơi lưu lại những insight thật từ quá trình học và build.",
        ],
      },
    ],
  },
  {
    slug: "evaluate-llm-apps",
    title: "Evaluating LLM apps without fooling yourself",
    description:
      "Một checklist gọn để đánh giá ứng dụng LLM theo cách bớt cảm tính và hữu ích hơn cho quyết định sản phẩm.",
    excerpt:
      "Đừng chỉ nhìn demo đẹp. Hãy đo consistency, failure modes, cost, latency và khả năng giải thích kết quả khi có edge cases.",
    date: "2026-03-10",
    dateLabel: "Mar 10, 2026",
    readTime: "9 min read",
    tags: ["Research", "AI"],
    category: "Research",
    seed: 5,
    featured: false,
    seriesSlug: "ai-building-blocks",
    body: [
      {
        title: "Define success before testing",
        paragraphs: [
          "Nếu bạn không định nghĩa success criteria trước, bài đánh giá sẽ rất dễ bị dẫn dắt bởi demo đẹp hoặc vài output trông thuyết phục ban đầu.",
        ],
      },
      {
        title: "Test failure modes intentionally",
        paragraphs: [
          "Hãy cố tình đưa vào prompt mơ hồ, dữ liệu thiếu hoặc câu hỏi gây nhiễu. Những tình huống này mới cho thấy ứng dụng có thực sự robust hay chưa.",
        ],
      },
      {
        title: "Track cost and latency",
        paragraphs: [
          "Một system trả lời đúng nhưng quá chậm hoặc quá đắt vẫn là một system khó vận hành. Evaluation tốt luôn gắn với ràng buộc thực tế của sản phẩm.",
        ],
      },
    ],
  },
];

export function slugifyTaxonomy(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}

export function getLatestPosts(limit = 6) {
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

export function getPostsByCategorySlug(slug: string) {
  return getAllPosts().filter(
    (post) => slugifyTaxonomy(post.category) === slug || post.tags.some((tag) => slugifyTaxonomy(tag) === slug),
  );
}

export function getAllTags() {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

export function getAllCategories() {
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}
