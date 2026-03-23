import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#0a0a0f',
        bg2:     '#12121a',
        border:  'rgba(255,255,255,0.08)',
        muted:   'rgba(255,255,255,0.5)',
        muted2:  'rgba(255,255,255,0.25)',
        cyan:    '#00d4ff',
        lime:    '#a3ff12',
        gold:    '#ffd700',
        rip:     '#ff3366',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
