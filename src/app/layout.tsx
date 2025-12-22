import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Portfolio Website',
  description: 'Stock Analysis, Entrepreneurship, Sports Medicine, and Tech Consulting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

