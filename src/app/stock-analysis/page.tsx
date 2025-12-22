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
            Stock Analysis
          </h1>
          <p className="text-lg text-primary-darkest">
            In-depth analysis and reports on stocks with Buy, Sell, or Hold ratings.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg shadow p-8 text-center" style={{ backgroundColor: '#FFFFE3' }}>
            <p className="text-primary-darkest">
              No posts yet. Check back soon for stock analysis reports!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/stock-analysis/${post.slug}`}
                className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                style={{ backgroundColor: '#FFFFE3' }}
              >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <RatingBadge rating={post.rating} />
                  <span className="text-sm text-primary-darkest">
                    {post.date ? format(new Date(post.date), 'MMM d, yyyy') : ''}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-primary-darkest mb-2">
                  {post.title}
                </h2>
                <p className="text-primary-darkest line-clamp-3">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

