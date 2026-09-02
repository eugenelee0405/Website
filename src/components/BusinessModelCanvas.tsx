import { BusinessModelCanvas as BusinessModelCanvasType } from '@/lib/types';

interface BusinessModelCanvasProps {
  data: BusinessModelCanvasType;
}

type Block = {
  n: string;
  title: string;
  content: string[];
  place: string;
  emphasis?: boolean;
};

export default function BusinessModelCanvas({ data }: BusinessModelCanvasProps) {
  const blocks: Block[] = [
    { n: '01', title: 'Key Partners', content: data.keyPartners, place: 'md:col-start-1 md:row-start-1 md:row-span-2' },
    { n: '02', title: 'Key Activities', content: data.keyActivities, place: 'md:col-start-2 md:row-start-1' },
    { n: '03', title: 'Key Resources', content: data.keyResources, place: 'md:col-start-2 md:row-start-2' },
    { n: '04', title: 'Value Propositions', content: data.valuePropositions, place: 'md:col-start-3 md:row-start-1 md:row-span-2', emphasis: true },
    { n: '05', title: 'Customer Relationships', content: data.customerRelationships, place: 'md:col-start-4 md:row-start-1' },
    { n: '06', title: 'Channels', content: data.channels, place: 'md:col-start-4 md:row-start-2' },
    { n: '07', title: 'Customer Segments', content: data.customerSegments, place: 'md:col-start-5 md:row-start-1 md:row-span-2' },
    { n: '08', title: 'Cost Structure', content: data.costStructure, place: 'md:col-start-1 md:col-span-2 md:row-start-3' },
    { n: '09', title: 'Revenue Streams', content: data.revenueStreams, place: 'md:col-start-3 md:col-span-3 md:row-start-3' },
  ];

  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-5 md:grid-rows-3">
      {blocks.map((block) => (
        <div
          key={block.title}
          className={`flex flex-col p-5 ${block.emphasis ? 'bg-accent-wash' : 'bg-paper'} ${block.place}`}
        >
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-[10px] font-semibold tabular-nums text-muted">{block.n}</span>
            <h3
              className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                block.emphasis ? 'text-accent-ink' : 'text-ink-soft'
              }`}
            >
              {block.title}
            </h3>
          </div>
          <ul className="space-y-2">
            {block.content.length > 0 ? (
              block.content.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-sm leading-snug text-ink">
                  <span
                    className={`mt-2 h-px w-2.5 shrink-0 ${block.emphasis ? 'bg-accent' : 'bg-line-strong'}`}
                  />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm italic text-muted">To be defined</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
