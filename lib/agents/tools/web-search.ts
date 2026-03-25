// lib/agents/tools/web-search.ts
// Tool: Web search for current information

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export async function webSearch(query: string): Promise<SearchResult[]> {
  // Try Tavily first
  const tavilyKey = process.env.TAVILY_API_KEY;
  if (tavilyKey) {
    try {
      const res = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: tavilyKey, query, max_results: 5 }),
      });
      const data = await res.json();
      return (data.results || []).map((r: any) => ({
        title: r.title,
        url: r.url,
        snippet: r.content?.slice(0, 200) || '',
      }));
    } catch { /* fallthrough */ }
  }

  // Fallback: DuckDuckGo instant answers
  const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`);
  const data = await res.json();

  const results: SearchResult[] = [];
  if (data.Abstract) {
    results.push({ title: data.Heading || query, url: data.AbstractURL || '', snippet: data.Abstract });
  }
  for (const topic of (data.RelatedTopics || []).slice(0, 5)) {
    if (topic.Text) {
      results.push({ title: topic.Text.slice(0, 60), url: topic.FirstURL || '', snippet: topic.Text });
    }
  }
  return results;
}
