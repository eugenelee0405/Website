import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-serif text-5xl leading-none tracking-tight text-ink sm:text-7xl">
        This page went off the record.
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        The link is broken or the page has moved. Everything worth reading is one
        step back.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent active:translate-y-px"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Back to the notebook
      </Link>
    </div>
  );
}
