'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/stock-analysis', label: 'Stock Analysis', index: '01' },
  { href: '/entrepreneurship', label: 'Entrepreneurship', index: '02' },
  { href: '/sports-medicine', label: 'Sports Medicine', index: '03' },
  { href: '/app-development', label: 'App Development', index: '04' },
  { href: '/tech-consulting', label: 'Tech Consulting', index: '05' },
];

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the full-screen index is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            Eugene Lee
          </span>
          <span className="hidden font-sans text-[10px] font-semibold uppercase tracking-editorial text-muted sm:inline">
            Portfolio
          </span>
        </Link>

        {/* Desktop links on a single line */}
        <ul className="hidden items-center gap-x-6 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative py-1 text-[13px] font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="-mr-1 flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </nav>

      {/* Full-screen index (mobile / tablet) */}
      {open && (
        <div className="fixed left-0 right-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-paper lg:hidden">
          <ul className="mx-auto max-w-6xl divide-y divide-line px-4 sm:px-6">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="font-sans text-xs font-semibold tabular-nums text-muted">
                      {item.index}
                    </span>
                    <span
                      className={`font-serif text-2xl ${
                        active ? 'text-accent-ink' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
