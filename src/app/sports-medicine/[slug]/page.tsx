import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { getResearchArticleWithHtml, getResearchArticles } from '@/lib/posts';

export async function generateStaticParams() {
  const articles = getResearchArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ResearchArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getResearchArticleWithHtml(params.slug);
  if (!article) notFound();

  return (
    <article>
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-12 sm:px-6 md:pt-16 lg:px-8">
          <Link
            href="/sports-medicine"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            Sports Medicine
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
            {article.category && (
              <span className="rounded-[2px] border border-line px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-ink-soft">
                {article.category}
              </span>
            )}
            <span>{article.date ? format(new Date(article.date), 'MMMM d, yyyy') : ''}</span>
            {article.readingTime && <span>{article.readingTime} min read</span>}
          </div>

          <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl">
            {article.title}
          </h1>

          {article.abstract && (
            <p className="mt-6 border-l-2 border-accent pl-5 font-serif text-xl italic leading-relaxed text-ink-soft">
              {article.abstract}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              {article.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </div>
    </article>
  );
}
