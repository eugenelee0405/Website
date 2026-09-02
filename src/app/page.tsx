import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getStockPosts, getResearchArticles } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import RatingBadge from '@/components/RatingBadge';

export const metadata = {
  title: 'Eugene Lee | Portfolio',
  description:
    'The working notebook of Eugene Lee: equity research, ventures, sports-medicine writing, and software built from scratch.',
};

export default function Home() {
  const stockPosts = getStockPosts();
  const researchArticles = getResearchArticles();
  const latestStock = stockPosts[0];
  const latestResearch = researchArticles[0];

  const index = [
    {
      n: '01',
      href: '/stock-analysis',
      title: 'Stock Analysis',
      blurb: 'Company deep-dives that end in a clear Buy, Sell, or Hold.',
      meta: `${stockPosts.length} report${stockPosts.length === 1 ? '' : 's'}`,
    },
    {
      n: '02',
      href: '/entrepreneurship',
      title: 'Entrepreneurship',
      blurb: 'Building a venture in the open with the Business Model Canvas.',
      meta: 'Live canvas',
    },
    {
      n: '03',
      href: '/sports-medicine',
      title: 'Sports Medicine',
      blurb: 'Evidence-based notes on injury, recovery, and performance.',
      meta: `${researchArticles.length} article${researchArticles.length === 1 ? '' : 's'}`,
    },
    {
      n: '04',
      href: '/app-development',
      title: 'App Development',
      blurb: 'Software I design and ship, from first sketch to deploy.',
      meta: '2 projects',
    },
    {
      n: '05',
      href: '/tech-consulting',
      title: 'Tech Consulting',
      blurb: 'An AI wizard that specs the right device for a budget.',
      meta: 'Try it',
    },
  ];

  return (
    <div>
      {/* ---------- Masthead ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-12 md:pb-20 md:pt-20 lg:px-8">
          <div>
            <p className="eyebrow flex items-center gap-3">
              Eugene Lee
              <span className="h-px w-8 bg-line-strong" />
              Portfolio 2026
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
              The working notebook of a fifteen-year-old generalist.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
              Equity research, early ventures, sports-medicine writing, and software
              built from scratch. Everything here stays a work in progress.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#index"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent active:translate-y-px"
              >
                Explore the work
                <ArrowRight size={16} strokeWidth={1.75} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
              >
                About Eugene
              </a>
            </div>
          </div>

          <Reveal delay={120} className="md:pb-1">
            <div className="relative">
              <img
                src="/images/portrait.svg"
                alt="Eugene Lee"
                className="aspect-[4/5] w-full border border-line object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Index of disciplines ---------- */}
      <section id="index" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Five things I&apos;m working on</h2>
            <p className="eyebrow hidden sm:block">Index</p>
          </div>

          <ul className="mt-10 border-t border-line">
            {index.map((item, i) => (
              <Reveal as="li" key={item.href} delay={i * 60}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-7 sm:gap-8 sm:py-9"
                >
                  <span className="font-sans text-xs font-semibold tabular-nums text-muted">
                    {item.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent-ink sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 truncate text-sm text-muted sm:text-base">{item.blurb}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="hidden text-xs font-medium uppercase tracking-wide text-muted sm:inline">
                      {item.meta}
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      className="text-line-strong transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Latest from the notebook ---------- */}
      {(latestStock || latestResearch) && (
        <section className="border-b border-line bg-paper-dim">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Latest from the notebook</h2>
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {latestStock && (
                <Reveal className="bg-surface">
                  <Link
                    href={`/stock-analysis/${latestStock.slug}`}
                    className="group flex h-full flex-col p-7 sm:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">Stock Analysis</span>
                      <RatingBadge rating={latestStock.rating} />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent-ink">
                      {latestStock.title}
                    </h3>
                    {latestStock.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                        {latestStock.excerpt}
                      </p>
                    )}
                    <div className="mt-auto pt-6 text-xs text-muted">
                      {latestStock.date ? format(new Date(latestStock.date), 'MMMM d, yyyy') : ''}
                    </div>
                  </Link>
                </Reveal>
              )}

              {latestResearch && (
                <Reveal delay={80} className="bg-surface">
                  <Link
                    href={`/sports-medicine/${latestResearch.slug}`}
                    className="group flex h-full flex-col p-7 sm:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">Sports Medicine</span>
                      {latestResearch.category && (
                        <span className="text-xs font-medium text-muted">{latestResearch.category}</span>
                      )}
                    </div>
                    <h3 className="mt-5 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent-ink">
                      {latestResearch.title}
                    </h3>
                    {latestResearch.abstract && (
                      <p className="mt-3 line-clamp-3 text-sm italic leading-relaxed text-muted">
                        {latestResearch.abstract}
                      </p>
                    )}
                    <div className="mt-auto pt-6 text-xs text-muted">
                      {latestResearch.date ? format(new Date(latestResearch.date), 'MMMM d, yyyy') : ''}
                    </div>
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- About ---------- */}
      <section id="about" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:gap-16">
            <p className="eyebrow md:pt-2">About</p>
            <div className="max-w-2xl">
              <p className="font-serif text-2xl leading-relaxed text-ink text-pretty sm:text-3xl sm:leading-relaxed">
                I&apos;m a ninth-grader in Busan who got curious about too many things
                at once, so I started writing them down. This site collects the
                markets I study, the ventures I&apos;m testing, the medicine I read,
                and the software I build.
              </p>

              <dl className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                {[
                  { k: 'Based in', v: 'Busan, South Korea' },
                  { k: 'Currently', v: 'Grade 9, International School of Busan' },
                  { k: 'Writing on', v: 'Markets, medicine, ventures, code' },
                  { k: 'Reach me', v: 'eugenelee0405@gmail.com', href: 'mailto:eugenelee0405@gmail.com' },
                ].map((row) => (
                  <div key={row.k} className="bg-paper p-5">
                    <dt className="eyebrow">{row.k}</dt>
                    <dd className="mt-1.5 text-sm text-ink">
                      {row.href ? (
                        <a href={row.href} className="text-accent-ink hover:text-ink">
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
