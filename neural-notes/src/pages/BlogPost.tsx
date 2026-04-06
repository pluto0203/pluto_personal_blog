import { useState } from "react";
import { Link, useParams } from "wouter";
import { Copy, Check, Twitter, Github, Link as LinkIcon, Linkedin } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const relatedPosts = [
  { slug: "chain-of-thought-reasoning", title: "Chain-of-Thought Reasoning: Why It Works and When It Fails", tag: "LLMs", time: "10 min read" },
  { slug: "prompt-engineering-production", title: "Prompt Engineering Patterns for Production Systems", tag: "Prompting", time: "8 min read" },
  { slug: "rag-systems-production", title: "Building RAG Systems That Actually Work in Production", tag: "Tools", time: "11 min read" },
];

const youMayAlsoLike = [
  { slug: "rag-systems-production", title: "Building RAG Systems That Actually Work", tag: "Tools", seed: 4 },
  { slug: "alignment-problem", title: "The Alignment Problem: Current Approaches", tag: "Research", seed: 5 },
  { slug: "gpt4o-vs-claude-benchmark", title: "GPT-4o vs Claude 3.5: Benchmark Analysis", tag: "AI", seed: 2 },
];

const gradients = [
  "radial-gradient(circle at 20% 30%, rgba(0,245,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192,38,211,0.1) 0%, transparent 50%)",
  "linear-gradient(45deg, rgba(0,245,255,0.05) 0%, rgba(57,255,20,0.05) 100%)",
  "radial-gradient(circle at 50% 50%, rgba(57,255,20,0.1) 0%, transparent 60%)",
];

function CodeBlock({ code, language = "python" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-sm overflow-hidden border border-[#222222] bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#222222]">
        <span className="font-['JetBrains_Mono'] text-xs text-[#a0a0a0] uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[#a0a0a0] hover:text-[#00f5ff] transition-colors font-['JetBrains_Mono']"
          aria-label="Copy code"
        >
          {copied
            ? <><Check className="w-3.5 h-3.5 text-[#39ff14]" /><span className="text-[#39ff14]">Copied!</span></>
            : <><Copy className="w-3.5 h-3.5" />Copy</>
          }
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm font-['JetBrains_Mono'] text-[#e0e0e0] leading-relaxed">
        <code>
          {code.split("\n").map((line, i) => (
            <div key={i} className="table-row">
              <span className="table-cell text-right pr-5 select-none text-[#3a3a4a] w-8">{i + 1}</span>
              <span className="table-cell whitespace-pre">
                {line
                  .replace(/\b(def|class|return|import|from|if|else|for|while|None|True|False|self)\b/g, (m) => `\x00keyword\x00${m}\x00end\x00`)
                  .split("\x00")
                  .map((part, pi) => {
                    if (pi > 0 && part === "end") return null;
                    const prev = line.split("\x00")[pi - 1];
                    if (prev === "keyword") return <span key={pi} className="text-[#00f5ff]">{part}</span>;
                    if (part === "keyword") return null;
                    return <span key={pi} className="text-[#39ff14]/90">{part}</span>;
                  })
                }
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

const tocItems = [
  "Introduction",
  "The Attention Formula",
  "Multi-Head Attention",
  "Scaled Dot-Product",
  "Position Encoding",
  "Practical Implications",
];

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [activeToc, setActiveToc] = useState("Introduction");
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      <Navbar />

      {/* Post Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <nav className="flex items-center gap-2 text-sm text-[#606060] mb-8" aria-label="Breadcrumb">
          <Link href="/"><span className="hover:text-[#00f5ff] transition-colors cursor-pointer">Home</span></Link>
          <span>/</span>
          <Link href="/blog"><span className="hover:text-[#00f5ff] transition-colors cursor-pointer">Blog</span></Link>
          <span>/</span>
          <span className="text-[#a0a0a0]">LLMs</span>
        </nav>

        <span className="inline-block px-3 py-1 bg-[#c026d3]/10 border border-[#c026d3]/30 text-[#c026d3] text-xs font-bold uppercase tracking-widest rounded-sm mb-6">
          LLMs
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-5 animate-fade-in-up">
          Understanding Attention Mechanisms in Transformers
        </h1>

        <p className="text-lg text-[#a0a0a0] mb-8 leading-relaxed max-w-3xl">
          A deep dive into the underlying architecture and the mathematical foundations that make self-attention work so well in modern language systems.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-b border-[#222222] py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-xs font-bold text-[#00f5ff] shrink-0">
              AC
            </div>
            <div>
              <div className="font-bold text-sm">Alex Chen</div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#a0a0a0]">March 28, 2026</span>
                <span className="font-['JetBrains_Mono'] text-[#00f5ff]">12 min read</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#a0a0a0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff] transition-all" aria-label="Share on X">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#a0a0a0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff] transition-all" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={handleCopyLink}
              className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#a0a0a0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff] transition-all"
              aria-label="Copy link"
            >
              {linkCopied ? <Check className="w-4 h-4 text-[#39ff14]" /> : <LinkIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Visual */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
        <div
          className="w-full h-48 sm:h-72 md:h-80 rounded-sm bg-[#111111] border border-white/[0.05] relative overflow-hidden"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,245,255,0.08) 0%, transparent 70%)" }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="large-grid-post" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#large-grid-post)" />
            <path d="M 80 200 C 280 60, 480 340, 760 160" fill="none" stroke="#c026d3" strokeWidth="2" opacity="0.5" />
            <path d="M 120 240 C 360 100, 560 300, 880 120" fill="none" stroke="#39ff14" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
            <circle cx="50%" cy="50%" r="90" fill="none" stroke="#00f5ff" strokeWidth="1" opacity="0.2" />
            <circle cx="50%" cy="50%" r="45" fill="none" stroke="#00f5ff" strokeWidth="1.5" opacity="0.4" />
            <circle cx="50%" cy="50%" r="15" fill="rgba(0,245,255,0.2)" />
          </svg>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10 pb-24">

        {/* TOC Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24">
            <h4 className="font-['JetBrains_Mono'] text-xs text-[#00f5ff] uppercase tracking-widest mb-4 border-b border-[#222222] pb-2">
              Contents
            </h4>
            <ul className="space-y-3 text-sm">
              {tocItems.map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={e => { e.preventDefault(); setActiveToc(item); }}
                    className={`block pl-3 border-l-2 py-0.5 transition-all text-[13px] ${
                      activeToc === item
                        ? "border-[#00f5ff] text-white font-medium"
                        : "border-transparent text-[#606060] hover:text-[#a0a0a0] hover:border-[#333]"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Article Content */}
        <article className="flex-1 min-w-0 max-w-[720px]">

          <p className="text-lg text-[#b0b0b0] font-light leading-relaxed mb-8">
            Before transformers, sequence-to-sequence tasks relied heavily on recurrent neural networks (RNNs) and LSTMs. While powerful, they had a fundamental flaw: they processed data sequentially, meaning long-range dependencies were hard to capture and training couldn't be easily parallelized.
          </p>

          <h2 id="the-attention-formula" className="text-2xl font-black mt-12 mb-5 border-l-4 border-[#00f5ff] pl-4 text-white">
            The Intuition Behind Attention
          </h2>

          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            Imagine reading a sentence. When you encounter the word "bank", its meaning depends entirely on the surrounding context. Is it a financial institution or the side of a river? Your brain automatically assigns different weights — or <strong className="text-white">attention</strong> — to other words in the sentence to resolve this ambiguity.
          </p>
          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            The transformer architecture mathematically formalizes this intuition using a mechanism called <em>Self-Attention</em>. Instead of processing words step-by-step, self-attention allows the model to look at the entire sequence simultaneously and compute a weighted representation for each word based on all other words.
          </p>

          <blockquote className="my-8 pl-6 border-l-4 border-[#c026d3] italic text-[#a0a0a0] bg-[#111111] p-5 rounded-r-sm">
            "The attention mechanism allows the network to dynamically focus on different parts of the input sequence, regardless of their distance."
          </blockquote>

          <h2 id="multi-head-attention" className="text-2xl font-black mt-12 mb-5 border-l-4 border-[#00f5ff] pl-4 text-white">
            The Attention Formula
          </h2>

          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            To understand how this works under the hood, we need to look at the core mathematical operation: Scaled Dot-Product Attention. The input consists of queries and keys of dimension{" "}
            <code className="font-['JetBrains_Mono'] text-sm text-[#c026d3] bg-[#c026d3]/10 px-1.5 py-0.5 rounded">d_k</code>
            , and values of dimension{" "}
            <code className="font-['JetBrains_Mono'] text-sm text-[#c026d3] bg-[#c026d3]/10 px-1.5 py-0.5 rounded">d_v</code>.
          </p>

          {/* Formula block */}
          <div className="my-8 p-5 bg-[#0a0a0a] border border-[#222222] rounded-sm text-center overflow-x-auto">
            <span className="font-['JetBrains_Mono'] text-base sm:text-lg tracking-wider text-white">
              Attention(Q, K, V) = softmax(&nbsp;
              <span className="text-[#00f5ff]">QK<sup>T</sup></span>
              &nbsp;/&nbsp;
              <span className="text-[#39ff14]">√d_k</span>
              &nbsp;)V
            </span>
          </div>

          <CodeBlock
            language="python"
            code={`import torch
import torch.nn as nn
import math

def scaled_dot_product_attention(q, k, v, mask=None):
    d_k = q.size()[-1]
    scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)

    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)

    attention_weights = nn.functional.softmax(scores, dim=-1)
    output = torch.matmul(attention_weights, v)

    return output, attention_weights`}
          />

          {/* Info callout */}
          <div className="my-8 p-5 bg-[#00f5ff]/[0.04] border border-[#00f5ff]/20 rounded-sm flex gap-4 items-start">
            <div className="mt-0.5 text-[#00f5ff] shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-[#00f5ff] text-sm mb-1">Why divide by √d_k?</h4>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                For large values of <code className="font-['JetBrains_Mono']">d_k</code>, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradients). Scaling by the square root of the dimension counteracts this effect.
              </p>
            </div>
          </div>

          <h3 id="scaled-dot-product" className="text-xl font-black mt-10 mb-4 text-white">
            Multi-Head Attention
          </h3>

          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            Instead of performing a single attention function, it is beneficial to linearly project the queries, keys and values{" "}
            <code className="font-['JetBrains_Mono'] text-sm text-[#39ff14]">h</code>{" "}
            times with different, learned linear projections. This allows the model to jointly attend to information from different representation subspaces at different positions.
          </p>

          <CodeBlock
            language="python"
            code={`class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.w_q = nn.Linear(d_model, d_model)
        self.w_k = nn.Linear(d_model, d_model)
        self.w_v = nn.Linear(d_model, d_model)
        self.w_o = nn.Linear(d_model, d_model)

    def split_heads(self, x, batch_size):
        x = x.view(batch_size, -1, self.num_heads, self.d_k)
        return x.transpose(1, 2)`}
          />

          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            The concatenated outputs from all heads are then projected once more through a final linear layer. This seemingly simple mechanism forms the backbone of every major LLM today — from GPT-4 to Claude to Llama — and its computational efficiency on modern GPU hardware is one of the key reasons transformers became the dominant architecture.
          </p>

          <h2 id="position-encoding" className="text-2xl font-black mt-12 mb-5 border-l-4 border-[#00f5ff] pl-4 text-white">
            Position Encoding
          </h2>

          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            Since the attention mechanism is permutation-invariant (it doesn't inherently know which token comes first), transformers need a way to inject positional information. The original paper used fixed sinusoidal position encodings, while modern architectures often use learned embeddings or relative position schemes like RoPE (Rotary Position Embedding).
          </p>

          <CodeBlock
            language="python"
            code={`import torch
import math

def positional_encoding(seq_len, d_model):
    pe = torch.zeros(seq_len, d_model)
    position = torch.arange(0, seq_len).unsqueeze(1).float()
    div_term = torch.exp(
        torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
    )
    pe[:, 0::2] = torch.sin(position * div_term)
    pe[:, 1::2] = torch.cos(position * div_term)
    return pe.unsqueeze(0)`}
          />

          <h2 id="practical-implications" className="text-2xl font-black mt-12 mb-5 border-l-4 border-[#00f5ff] pl-4 text-white">
            Practical Implications
          </h2>

          <p className="text-[#d0d0d0] leading-relaxed mb-5">
            Understanding attention is not just an academic exercise. When you're building RAG systems, fine-tuning models, or writing prompts, you're directly influencing how attention scores distribute across your input. Long contexts dilute attention across more tokens; structured prompts help concentrate it on the right parts. This is why prompt engineering works — you're essentially shaping the attention landscape.
          </p>

          <p className="text-[#d0d0d0] leading-relaxed">
            The field continues to evolve rapidly. Flash Attention, sparse attention, and linear attention variants all aim to reduce the O(n²) complexity of the vanilla mechanism while preserving its expressive power. Understanding the foundations covered here gives you the conceptual grounding to evaluate these developments critically rather than treating them as black boxes.
          </p>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-48 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="text-xs font-bold text-[#f0f0f0] uppercase tracking-widest mb-5 border-b border-[#222222] pb-2">Related</h4>
              <div className="space-y-5">
                {relatedPosts.map(post => (
                  <Link key={post.slug} href={`/post/${post.slug}`}>
                    <div className="group cursor-pointer">
                      <h5 className="text-xs font-bold text-[#d0d0d0] mb-1.5 group-hover:text-[#00f5ff] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h5>
                      <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[10px]">
                        <span className="text-[#39ff14]">{post.tag}</span>
                        <span className="text-[#606060]">{post.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-[#222222]">
              <h4 className="text-xs font-bold text-[#606060] uppercase tracking-widest mb-4">Share</h4>
              <div className="flex gap-2">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#a0a0a0] hover:border-[#00f5ff] hover:text-[#00f5ff] transition-colors" aria-label="Share on X">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#a0a0a0] hover:border-[#00f5ff] hover:text-[#00f5ff] transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* You May Also Like */}
      <section className="border-t border-[#222222] bg-[#0a0a0a] py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {youMayAlsoLike.map((post, i) => (
              <Link key={post.slug} href={`/post/${post.slug}`}>
                <div className="group bg-[#111111] border border-white/[0.08] rounded-sm overflow-hidden hover:border-[#00f5ff]/30 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all cursor-pointer">
                  <div
                    className="h-24 bg-[#0a0a0a] relative overflow-hidden"
                    style={{ backgroundImage: gradients[i % gradients.length] }}
                  >
                    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`sm-grid-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00f5ff" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#sm-grid-${i})`} />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-white mb-3 line-clamp-2 group-hover:text-[#00f5ff] transition-colors">{post.title}</h4>
                    <span className="text-[10px] font-bold tracking-wider text-[#39ff14] border border-[#39ff14]/30 rounded-full px-2 py-0.5 bg-[#39ff14]/5 uppercase">
                      {post.tag}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
