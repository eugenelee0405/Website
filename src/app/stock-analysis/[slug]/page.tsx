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

  // CHECK: Replace 'example-post' with the actual slug of your LLY report
  const isPdfPost = post.slug === 'example-post';

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/stock-analysis"
          className="text-primary-dark hover:underline mb-6 inline-block"
        >
          ← Back to Stock Analysis
        </Link>

        <article className="rounded-lg shadow-lg p-8 bg-white">
          <div className="flex items-center justify-between mb-6">
            <RatingBadge rating={post.rating} />
            <span className="text-sm text-primary-darkest">
              {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-primary-darkest mb-6">
            {post.title}
          </h1>

          {/* Conditional Rendering: PDF vs Standard HTML */}
          {isPdfPost ? (
            <div className="w-full h-[80vh]">
              <object
                data="/Stock_Analysis/LLY_Report_Eugene.pdf"
                type="application/pdf"
                className="w-full h-full rounded-md border border-gray-200"
              >
                <p className="text-primary-darkest">
                  Your browser doesn&apos;t support PDF embedding.{' '}
                  <a
                    href="/Stock_Analysis/LLY_Report_Eugene.pdf"
                    className="underline text-primary-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to download the report.
                  </a>
                </p>
              </object>
            </div>
          ) : (
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-primary-darkest prose-headings:text-primary-darkest prose-p:text-primary-darkest prose-strong:text-primary-darkest prose-li:text-primary-darkest"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          )}
        </article>
      </div>
    </div>
  );
}