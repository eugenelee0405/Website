import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, Download } from 'lucide-react';
import { getStockPostWithHtml, getStockPosts } from '@/lib/posts';
import RatingBadge from '@/components/RatingBadge';

export async function generateStaticParams() {
  const posts = getStockPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function StockPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getStockPostWithHtml(params.slug);
  if (!post) notFound();

  const pdfPath = post.pdfPath;
  const isPdfPost = Boolean(pdfPath);

  return (
    <article>
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-12 sm:px-6 md:pt-16 lg:px-8">
          <Link
            href="/stock-analysis"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            Stock Analysis
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <RatingBadge rating={post.rating} />
            <span className="text-sm text-muted">
              {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl">
            {post.title}
          </h1>

          {isPdfPost && (
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Download size={16} strokeWidth={1.75} />
              Open full PDF report
            </a>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {isPdfPost ? (
          <div className="h-[85vh] w-full border border-line bg-surface">
            <object data={pdfPath} type="application/pdf" className="h-full w-full">
              <p className="p-6 text-muted">
                Your browser can&apos;t display the embedded PDF.{' '}
                <a
                  href={pdfPath}
                  className="text-accent-ink underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download the report instead.
                </a>
              </p>
            </object>
          </div>
        ) : (
          <div
            className="prose-editorial"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        )}
      </div>
    </article>
  );
}
