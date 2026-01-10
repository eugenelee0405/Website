import Link from 'next/link';
import { getStockPosts } from '@/lib/posts';
import RatingBadge from '@/components/RatingBadge';
import { format } from 'date-fns';

export default function StockAnalysisPage() {
  const posts = getStockPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFE3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-darkest mb-4">
            Stock Analysis Reports
          </h1>
          <p className="text-lg text-primary-darkest">
            In-depth analysis and research on companies with clear Buy, Sell, or Hold ratings.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg shadow p-8 text-center" style={{ backgroundColor: '#FFFFE3' }}>
            <p className="text-primary-darkest">
              No reports available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/stock-analysis/${post.slug}`}
                className="block rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow bg-custom-cream"
                style={{ backgroundColor: '#FFFFE3' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <RatingBadge rating={post.rating} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-darkest mb-2">
                      {post.title}
                    </h2>
                  </div>
                  <div className="text-sm text-primary-darkest md:ml-4">
                    {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
                  </div>
                </div>

                {post.excerpt && (
                  <p className="text-primary-darkest">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
