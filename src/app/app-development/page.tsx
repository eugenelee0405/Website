import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'App Development | Eugene Lee',
  description: 'Software Eugene Lee designs and ships, from first sketch to deploy.',
};

type Project = {
  n: string;
  title: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  status: string;
  href?: string;
  cta?: string;
};

const projects: Project[] = [
  {
    n: '01',
    title: 'Tech Spec Wizard',
    year: '2025',
    role: 'Design & build',
    stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'OpenAI'],
    description:
      'A three-step tool that turns a category, a budget, and a few priorities into three tailored product recommendations, then lets you refine them in plain language. The model streams structured JSON that the interface renders as comparison cards.',
    status: 'Live',
    href: '/tech-consulting',
    cta: 'Launch the wizard',
  },
  {
    n: '02',
    title: 'This Portfolio',
    year: '2026',
    role: 'Design & build',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Markdown'],
    description:
      'The site you are reading. An editorial, content-driven portfolio with self-hosted type, a Markdown pipeline for reports and articles, and a design system built from a single accent and a lot of whitespace. Static where it can be, dynamic where it needs to be.',
    status: 'Live',
  },
];

const toolkit = [
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Vercel AI SDK',
  'OpenAI',
  'Git',
];

export default function AppDevelopmentPage() {
  return (
    <div>
      <PageHeader
        index="04"
        eyebrow="App Development"
        title="Software I design and ship from scratch."
        lead="Small, useful products built end to end: the idea, the interface, the code, and the deploy. Here is what I have shipped and what I am building with."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="space-y-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <article className="grid grid-cols-1 gap-6 border border-line bg-surface p-6 sm:p-9 md:grid-cols-[0.8fr_2fr] md:gap-12">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-semibold tabular-nums text-muted">
                      {project.n}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-line px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-soft">
                      {project.status}
                    </span>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="eyebrow">Year</dt>
                      <dd className="mt-0.5 text-ink">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Role</dt>
                      <dd className="mt-0.5 text-ink">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Built with</dt>
                      <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-ink-soft">
                        {project.stack.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="md:border-l md:border-line md:pl-12">
                  <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {project.href && project.cta && (
                    <Link
                      href={project.href}
                      className="mt-6 inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:text-accent-ink"
                    >
                      {project.cta}
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Toolkit */}
        <Reveal className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-12 md:grid-cols-[auto_1fr] md:gap-16">
          <p className="eyebrow md:pt-1">Toolkit</p>
          <div>
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-ink-soft text-pretty sm:text-2xl sm:leading-relaxed">
              I build on the modern web stack, learning a bit more of it with every
              project.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {toolkit.map((t) => (
                <li
                  key={t}
                  className="rounded-[2px] border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
