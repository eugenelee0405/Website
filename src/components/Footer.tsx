import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const sections = [
  { href: '/stock-analysis', label: 'Stock Analysis' },
  { href: '/entrepreneurship', label: 'Entrepreneurship' },
  { href: '/sports-medicine', label: 'Sports Medicine' },
  { href: '/app-development', label: 'App Development' },
  { href: '/tech-consulting', label: 'Tech Consulting' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-2xl leading-snug text-ink text-balance">
              A working notebook across markets, medicine, ventures, and software.
            </p>
            <a
              href="mailto:eugenelee0405@gmail.com"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:text-ink"
            >
              eugenelee0405@gmail.com
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </a>
          </div>

          <nav aria-label="Sections">
            <p className="eyebrow mb-4">Index</p>
            <ul className="space-y-2.5">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Eugene Lee. Busan, South Korea.</p>
          <p>Designed and built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
