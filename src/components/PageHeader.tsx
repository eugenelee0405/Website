import { type ReactNode } from 'react';

interface PageHeaderProps {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

export default function PageHeader({ index, eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 md:pb-16 md:pt-20 lg:px-8">
        <p className="eyebrow flex items-center gap-3">
          {index && (
            <>
              <span className="tabular-nums text-ink">{index}</span>
              <span className="h-px w-8 bg-line-strong" />
            </>
          )}
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.06] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{lead}</p>
        )}
        {children}
      </div>
    </header>
  );
}
