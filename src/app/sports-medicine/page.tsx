import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { getResearchArticles } from '@/lib/posts';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Sports Medicine | Eugene Lee',
  description: 'Evidence-based writing on injury, recovery, and athletic performance.',
};

export default function SportsMedicinePage() {
  const articles = getResearchArticles();

  return (
    <div>
      <PageHeader
        index="03"
        eyebrow="Sports Medicine"
        title="Reading the science of the body under load."
        lead="Longer-form notes on injury prevention, recovery, and performance, pulled from current research and written to be understood."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {articles.length === 0 ? (
          <p className="max-w-md py-16 font-serif text-xl text-muted">
            No articles yet. Research in progress.
          </p>
        ) : (
          <ul className="border-t border-line">
            {articles.map((article, i) => (
              <Reveal as="li" key={article.slug} delay={i * 60}>
                <Link
                  href={`/sports-medicine/${article.slug}`}
                  className="group grid grid-cols-1 gap-4 border-b border-line py-8 md:grid-cols-[1fr_auto] md:gap-10 md:py-10"
                >
                  <div className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted">
                      {article.category && (
                        <span className="rounded-[2px] border border-line px-2.5 py-1 font-medium uppercase tracking-wide text-ink-soft">
                          {article.category}
                        </span>
                      )}
                      <span>{article.date ? format(new Date(article.date), 'MMMM d, yyyy') : ''}</span>
                      {article.readingTime && <span>{article.readingTime} min read</span>}
                    </div>
                    <h2 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent-ink sm:text-3xl">
                      {article.title}
                    </h2>
                    {article.abstract && (
                      <p className="mt-3 max-w-2xl text-[15px] italic leading-relaxed text-muted">
                        {article.abstract}
                      </p>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                        {article.tags.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-start md:pt-1">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-accent-ink">
                      Read article
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
