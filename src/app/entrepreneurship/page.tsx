import BusinessModelCanvas from '@/components/BusinessModelCanvas';
import { BusinessModelCanvas as BusinessModelCanvasType } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Entrepreneurship | Eugene Lee',
  description: 'Building a venture in the open with the Business Model Canvas.',
};

// This data can be moved to a JSON file or CMS later.
const canvasData: BusinessModelCanvasType = {
  keyPartners: ['Strategic suppliers', 'Technology partners', 'Distribution networks'],
  keyActivities: ['Product development', 'Marketing and sales', 'Customer support'],
  keyResources: ['Team expertise', 'Technology infrastructure', 'Brand reputation'],
  valuePropositions: ['A unique solution to a real problem', 'Superior quality and service', 'Competitive pricing'],
  customerRelationships: ['Personal assistance', 'Self-service platform', 'Community building'],
  channels: ['Online platform', 'Direct sales', 'Partner channels'],
  customerSegments: ['Target segment one', 'Target segment two'],
  costStructure: ['Development costs', 'Marketing expenses', 'Operational overhead'],
  revenueStreams: ['Product sales', 'Subscription fees', 'Service revenue'],
};

export default function EntrepreneurshipPage() {
  return (
    <div>
      <PageHeader
        index="02"
        eyebrow="Entrepreneurship"
        title="Building a venture, one block at a time."
        lead="A living Business Model Canvas that maps how the idea creates, delivers, and captures value. It changes as the venture learns."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <Reveal>
          <BusinessModelCanvas data={canvasData} />
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-12 md:grid-cols-[auto_1fr] md:gap-16">
          <p className="eyebrow md:pt-1">On the canvas</p>
          <div className="max-w-2xl">
            <p className="font-serif text-xl leading-relaxed text-ink-soft text-pretty sm:text-2xl sm:leading-relaxed">
              The Business Model Canvas is a one-page view of a whole company. It
              forces every assumption into the open: who it serves, what it
              promises, how the money moves. Treating it as a draft, not a
              monument, is the point.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
