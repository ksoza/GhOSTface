// lib/agents/tools/code-analysis.ts
// Tool: Analyze code snippets and suggest improvements

export interface CodeAnalysis {
  language: string;
  lines: number;
  complexity: string;
  issues: string[];
  suggestions: string[];
}

export function analyzeCode(code: string, language?: string): CodeAnalysis {
  const lines = code.split('\n').length;
  const lang = language || detectLanguage(code);
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Security checks
  if (code.includes('eval(')) issues.push('🔴 SECURITY: eval() detected — potential code injection');
  if (code.includes('innerHTML')) issues.push('🟠 SECURITY: innerHTML usage — XSS risk');
  if (/password|secret|api.?key/i.test(code) && !/process\.env|import\.meta\.env/.test(code)) {
    issues.push('🔴 SECURITY: Possible hardcoded credential');
  }

  // Quality checks
  if ((code.match(/console\.(log|debug|info)/g)?.length || 0) > 5) {
    issues.push('🟡 QUALITY: Excessive console.log statements');
  }
  if (lines > 100 && !code.includes('//') && !code.includes('/*')) {
    issues.push('🟡 QUALITY: No comments in large code block');
  }
  if (/any(?!\w)/g.test(code) && (lang === 'typescript' || lang === 'ts')) {
    issues.push('🟡 TYPE SAFETY: TypeScript `any` type usage');
  }

  // Suggestions
  if (lines > 200) suggestions.push('Consider splitting into smaller modules');
  if (!code.includes('try') && !code.includes('catch')) suggestions.push('Add error handling');
  if (!code.includes('test') && !code.includes('spec') && !code.includes('describe')) {
    suggestions.push('Consider adding unit tests');
  }

  if (!issues.length) issues.push('✅ No major issues detected');

  const complexity = lines > 200 ? 'high' : lines > 50 ? 'medium' : 'low';

  return { language: lang, lines, complexity, issues, suggestions };
}

function detectLanguage(code: string): string {
  if (code.includes('import React') || code.includes('jsx')) return 'tsx';
  if (code.includes(': string') || code.includes(': number') || code.includes('interface ')) return 'typescript';
  if (code.includes('const ') || code.includes('async ') || code.includes('=>')) return 'javascript';
  if (code.includes('def ') || code.includes('import ') && code.includes(':')) return 'python';
  if (code.includes('fn ') || code.includes('let mut')) return 'rust';
  if (code.includes('func ') || code.includes('package main')) return 'go';
  return 'unknown';
}
