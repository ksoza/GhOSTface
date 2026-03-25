# 🧠 Gh.O.K.U.

**GitHub Omniscient Knowledge Utility**

AI-powered code intelligence with HuggingFace integration, neural interface, and persistent memory.

## ✨ Features

| Tab | Description | Requires |
|-----|-------------|----------|
| 🔍 **Search** | GitHub repo search with real-time results | — |
| 📊 **Intel** | Deep repo analysis — languages, README, contributors | `ANTHROPIC_API_KEY` for auto-brief |
| 🧠 **Oracle** | AI-powered chat with Claude — repo-aware context | `ANTHROPIC_API_KEY` |
| ⚡ **Brain** | Universal Code Brain — describe what you want, get code | `ANTHROPIC_API_KEY` |
| 🤗 **Models** | Search, explore & run 500K+ HuggingFace models | `HUGGINGFACE_API_KEY` |
| 🧬 **Neural** | FinalSpark Neuroplatform bio-computing interface | — (simulation) |
| 💾 **Memory** | Persistent memory bank — operator context, tech stack | — |

## 🚀 Getting Started

```bash
git clone https://github.com/ksoza/ghostface.git
cd ghostface
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | For AI features | Powers Oracle chat, Brain code gen, Intel auto-brief |
| `HUGGINGFACE_API_KEY` | For Models tab | Search & run HuggingFace models with live inference |
| `GITHUB_TOKEN` | Optional | Increases GitHub API rate limit (60 → 5000 req/hr) |

## 🏗️ Stack

- **Next.js 14** — App Router + API Routes
- **TypeScript** — Full type safety
- **Tailwind CSS** — Dark-mode UI
- **Claude (Anthropic)** — AI chat & code generation
- **HuggingFace Inference** — 500K+ model access
- **GitHub REST API** — Repo search & analysis

## 🔗 Part of RemixIP

Gh.O.K.U. is the AI brain behind [RemixIP](https://rip-web.vercel.app) — reimagine your favorite shows and movies with AI.

## 📄 License

MIT
