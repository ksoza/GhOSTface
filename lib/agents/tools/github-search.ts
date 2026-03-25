// lib/agents/tools/github-search.ts
// Tool: Search GitHub repositories and retrieve code intel

export interface GitHubSearchResult {
  full_name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  updated: string;
  topics: string[];
}

export async function searchGitHub(
  query: string,
  options: { sort?: string; per_page?: number } = {},
): Promise<GitHubSearchResult[]> {
  const { sort = 'stars', per_page = 10 } = options;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&per_page=${per_page}`;

  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GhOSTface-Agent',
    },
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();

  return (data.items || []).map((r: any) => ({
    full_name: r.full_name,
    description: r.description?.slice(0, 150) || '',
    stars: r.stargazers_count,
    language: r.language || 'unknown',
    url: r.html_url,
    updated: r.updated_at?.slice(0, 10),
    topics: r.topics?.slice(0, 5) || [],
  }));
}

export async function getRepoReadme(owner: string, repo: string): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'GhOSTface-Agent' },
  });
  if (!res.ok) return 'No README available';
  const data = await res.json();
  return Buffer.from(data.content || '', 'base64').toString();
}

export async function getRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
    headers: { 'User-Agent': 'GhOSTface-Agent' },
  });
  if (!res.ok) return {};
  return res.json();
}
