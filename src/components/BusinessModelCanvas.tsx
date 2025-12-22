import { BusinessModelCanvas as BusinessModelCanvasType } from '@/lib/types';

interface BusinessModelCanvasProps {
  data: BusinessModelCanvasType;
}

export default function BusinessModelCanvas({ data }: BusinessModelCanvasProps) {
  const sections = [
    {
      title: 'Key Partners',
      content: data.keyPartners,
      className: 'col-span-1 row-span-1',
    },
    {
      title: 'Key Activities',
      content: data.keyActivities,
      className: 'col-span-1 row-span-1',
    },
    {
      title: 'Key Resources',
      content: data.keyResources,
      className: 'col-span-1 row-span-1',
    },
    {
      title: 'Value Propositions',
      content: data.valuePropositions,
      className: 'col-span-1 row-span-2',
    },
    {
      title: 'Customer Relationships',
      content: data.customerRelationships,
      className: 'col-span-1 row-span-1',
    },
    {
      title: 'Channels',
      content: data.channels,
      className: 'col-span-1 row-span-1',
    },
    {
      title: 'Customer Segments',
      content: data.customerSegments,
      className: 'col-span-1 row-span-1',
    },
    {
      title: 'Cost Structure',
      content: data.costStructure,
      className: 'col-span-2 row-span-1',
    },
    {
      title: 'Revenue Streams',
      content: data.revenueStreams,
      className: 'col-span-2 row-span-1',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-4 grid-rows-3 gap-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`bg-primary-light border-2 border-primary-medium rounded-lg p-4 shadow-sm ${section.className}`}
          >
            <h3 className="font-bold text-lg mb-2 text-primary-darkest">
              {section.title}
            </h3>
            <ul className="space-y-1 text-sm text-primary-darkest">
              {section.content.length > 0 ? (
                section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-primary-medium italic">No items yet</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

