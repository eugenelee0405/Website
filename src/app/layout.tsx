import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Self-hosted (latin subset) so there's no runtime dependency on Google Fonts.
const serif = localFont({
  src: [
    { path: '../fonts/newsreader-variable.woff2', weight: '200 800', style: 'normal' },
    { path: '../fonts/newsreader-italic.woff2', weight: '200 800', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const sans = localFont({
  src: [{ path: '../fonts/librefranklin-variable.woff2', weight: '100 900', style: 'normal' }],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Eugene Lee | Portfolio',
  description:
    'The working notebook of Eugene Lee: equity research, ventures, sports-medicine writing, and software built from scratch.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
