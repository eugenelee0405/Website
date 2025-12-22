import { notFound } from 'next/navigation';
import { getResearchArticleWithHtml, getResearchArticles } from '@/lib/posts';
import { format } from 'date-fns';
import Link from 'next/link';

export async function generateStaticParams() {
  const articles = getResearchArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ResearchArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getResearchArticleWithHtml(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/sports-medicine"
        className="text-primary-dark hover:underline mb-6 inline-block"
      >
        ← Back to Sports Medicine
      </Link>

      <article className="bg-primary-light rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {article.category && (
              <span className="px-3 py-1 bg-primary-medium text-primary-darkest rounded-full text-sm font-medium">
                {article.category}
              </span>
            )}
            <span className="text-sm text-primary-darkest">
              {article.date ? format(new Date(article.date), 'MMMM d, yyyy') : ''}
            </span>
            {article.readingTime && (
              <span className="text-sm text-primary-darkest">
                {article.readingTime} min read
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-primary-darkest mb-4">
            {article.title}
          </h1>

          {article.abstract && (
            <div className="bg-primary-medium rounded-lg p-4 mb-6">
              <p className="text-lg italic text-primary-darkest">
                {article.abstract}
              </p>
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary-medium text-primary-darkest rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>
    </div>
  );
}

