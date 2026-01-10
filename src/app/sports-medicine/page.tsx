import Link from 'next/link';
import { getResearchArticles } from '@/lib/posts';
import { format } from 'date-fns';

export default function SportsMedicinePage() {
  const articles = getResearchArticles();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDE8D0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-darkest mb-4">
            Sports Medicine Research
          </h1>
          <p className="text-lg text-primary-darkest">
            Deep-dive research articles and analysis in sports medicine.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-lg shadow p-8 text-center" style={{ backgroundColor: '#EDE8D0' }}>
            <p className="text-primary-darkest">
              No articles yet. Check back soon for research publications!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/sports-medicine/${article.slug}`}
                className="block rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
                style={{ backgroundColor: '#EDE8D0' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary-darkest mb-2">
                      {article.title}
                    </h2>
                    {article.category && (
                      <span className="inline-block px-3 py-1 bg-primary-medium text-primary-darkest rounded-full text-sm font-medium mb-2">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-primary-darkest md:ml-4">
                    <div>{article.date ? format(new Date(article.date), 'MMMM d, yyyy') : ''}</div>
                    {article.readingTime && (
                      <div>{article.readingTime} min read</div>
                    )}
                  </div>
                </div>

                {article.abstract && (
                  <p className="text-primary-darkest mb-3 italic">
                    {article.abstract}
                  </p>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-medium text-primary-darkest rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

