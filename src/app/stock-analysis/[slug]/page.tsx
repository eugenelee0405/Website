import { notFound } from 'next/navigation';
import { getStockPostWithHtml, getStockPosts } from '@/lib/posts';
import RatingBadge from '@/components/RatingBadge';
import { format } from 'date-fns';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getStockPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function StockPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getStockPostWithHtml(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/stock-analysis"
        className="text-primary-dark hover:underline mb-6 inline-block"
      >
        ← Back to Stock Analysis
      </Link>

      <article className="bg-primary-light rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <RatingBadge rating={post.rating} />
          <span className="text-sm text-primary-darkest">
            {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-primary-darkest mb-6">
          {post.title}
        </h1>

        <div
          className="prose prose-lg dark:prose-invert max-w-none text-primary-darkest prose-headings:text-primary-darkest prose-p:text-primary-darkest prose-strong:text-primary-darkest prose-li:text-primary-darkest"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}

