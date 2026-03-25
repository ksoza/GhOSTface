// lib/agents/tools/huggingface-browse.ts
// Tool: Browse HuggingFace models and spaces

export interface HFModel {
  id: string;
  task: string;
  downloads: number;
  likes: number;
  tags: string[];
}

export async function searchHuggingFaceModels(
  query: string,
  options: { task?: string; limit?: number } = {},
): Promise<HFModel[]> {
  const params = new URLSearchParams({
    search: query,
    limit: String(options.limit || 10),
    sort: 'downloads',
    direction: '-1',
  });
  if (options.task) params.set('pipeline_tag', options.task);

  const res = await fetch(`https://huggingface.co/api/models?${params}`);
  if (!res.ok) throw new Error(`HuggingFace API error: ${res.status}`);
  const models = await res.json();

  return (models || []).slice(0, options.limit || 10).map((m: any) => ({
    id: m.modelId || m.id,
    task: m.pipeline_tag || 'unknown',
    downloads: m.downloads || 0,
    likes: m.likes || 0,
    tags: (m.tags || []).slice(0, 5),
  }));
}

export async function getHuggingFaceModelCard(modelId: string): Promise<string> {
  const res = await fetch(`https://huggingface.co/${modelId}/resolve/main/README.md`);
  if (!res.ok) return `Model card not available for ${modelId}`;
  const text = await res.text();
  return text.slice(0, 3000);
}
