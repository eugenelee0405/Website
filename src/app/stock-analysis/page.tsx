import { notFound } from 'next/navigation';
import { getStockPostWithHtml, getStockPosts } from '@/lib/posts';
import RatingBadge from '@/components/RatingBadge';
import { format } from 'date-fns';
import Link from 'next/link';

// 1. This tells Next.js to build a page for every file found in your content folder
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

  // 2. CONFIGURATION: Check if this is the LLY report
  // This matches the filename "lly-report.md" you created in Step 1
  const isLlyReport = params.slug === 'lly-report';
  
  // This points to website/public/Stock_Analysis/LLY_Report_Eugene.pdf
  const pdfUrl = "/Stock_Analysis/LLY_Report_Eugene.pdf";

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFE3' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link
          href="/stock-analysis"
          className="text-primary-dark hover:underline mb-6 inline-block"
        >
          ← Back to Stock Analysis
        </Link>

        <article className="rounded-lg shadow-lg p-8" style={{ backgroundColor: '#FFFFE3' }}>
          {/* Header: Title and Rating */}
          <div className="flex items-center justify-between mb-6">
            <RatingBadge rating={post.rating} />
            <span className="text-sm text-primary-darkest">
              {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-primary-darkest mb-8">
            {post.title}
          </h1>

          {/* 3. LOGIC: If it's the LLY report, show PDF. Otherwise, show text. */}
          {isLlyReport ? (
            <div className="flex flex-col gap-4">
              
              {/* The Download Button */}
              <a 
                href={pdfUrl}
                download
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark hover:bg-primary-darkest w-fit"
              >
                Download PDF Report
              </a>

              {/* The PDF Viewer */}
              <div className="w-full h-[800px] border-2 border-primary-medium rounded-lg overflow-hidden mt-4">
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <p className="p-4 text-center">
                    Your browser does not support PDF embedding. 
                    <a href={pdfUrl} className="text-blue-600 underline ml-1">
                      Download the PDF here.
                    </a>
                  </p>
                </object>
              </div>

            </div>
          ) : (
            // Normal view for other blog posts
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-primary-darkest"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          )}
        </article>
      </div>
    </div>
  );
}
