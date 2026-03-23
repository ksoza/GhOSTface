import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gh.O.K.U. — GitHub Omniscient Knowledge Utility',
  description: 'AI-powered code intelligence. Search repos, analyze code, chat with AI, run HuggingFace models, and more.',
  openGraph: {
    title: 'Gh.O.K.U.',
    description: 'AI-powered code intelligence with HuggingFace integration',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
