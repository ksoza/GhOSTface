// lib/agents/types.ts
// GhOSTface AGIagent Type System (standalone)

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
  name?: string;
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, any>;
  };
}

export interface AgentMemory {
  operator: string;
  stack: string[];
  frameworks: string[];
  apis: string[];
  projects: string[];
  notes: string[];
  recentRepos: string[];
  recentModels: string[];
  context: Record<string, string>;
  lastUpdated: string;
}

export interface AgentPlan {
  goal: string;
  steps: PlanStep[];
  status: 'planning' | 'executing' | 'complete' | 'failed';
}

export interface PlanStep {
  id: number;
  description: string;
  tools: string[];
  status: 'pending' | 'running' | 'done' | 'failed';
  result?: string;
}

export interface AgentRunResult {
  response: string;
  toolsUsed: string[];
  plan?: AgentPlan;
  memory?: Partial<AgentMemory>;
  messages: AgentMessage[];
  suggestedActions?: SuggestedAction[];
}

export interface SuggestedAction {
  label: string;
  description: string;
  prompt: string;
  icon: string;
}
