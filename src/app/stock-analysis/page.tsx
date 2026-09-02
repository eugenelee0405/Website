import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { getStockPosts } from '@/lib/posts';
import RatingBadge from '@/components/RatingBadge';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Stock Analysis | Eugene Lee',
  description: 'Equity research with a clear Buy, Sell, or Hold on each company.',
};

export default function StockAnalysisPage() {
  const posts = getStockPosts();

  return (
    <div>
      <PageHeader
        index="01"
        eyebrow="Stock Analysis"
        title="Equity research that ends in a decision."
        lead="Company deep-dives on fundamentals, catalysts, and valuation. Every report closes with a clear Buy, Sell, or Hold, and the reasoning behind it."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {posts.length === 0 ? (
          <p className="max-w-md py-16 font-serif text-xl text-muted">
            No reports published yet. The first one is being written.
          </p>
        ) : (
          <ul className="border-t border-line">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 60}>
                <Link
                  href={`/stock-analysis/${post.slug}`}
                  className="group grid grid-cols-1 gap-4 border-b border-line py-8 md:grid-cols-[1fr_auto] md:gap-10 md:py-10"
                >
                  <div className="min-w-0">
                    <div className="mb-4 flex items-center gap-3">
                      <RatingBadge rating={post.rating} />
                      <span className="text-xs text-muted">
                        {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent-ink sm:text-3xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-start md:pt-1">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-accent-ink">
                      Read report
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
