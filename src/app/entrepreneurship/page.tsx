import BusinessModelCanvas from '@/components/BusinessModelCanvas';
import { BusinessModelCanvas as BusinessModelCanvasType } from '@/lib/types';

// This data can be moved to a JSON file or CMS later
const canvasData: BusinessModelCanvasType = {
  keyPartners: [
    'Strategic suppliers',
    'Technology partners',
    'Distribution networks',
  ],
  keyActivities: [
    'Product development',
    'Marketing and sales',
    'Customer support',
  ],
  keyResources: [
    'Team expertise',
    'Technology infrastructure',
    'Brand reputation',
  ],
  valuePropositions: [
    'Unique solution to customer problem',
    'Superior quality and service',
    'Competitive pricing',
  ],
  customerRelationships: [
    'Personal assistance',
    'Self-service platform',
    'Community building',
  ],
  channels: [
    'Online platform',
    'Direct sales',
    'Partner channels',
  ],
  customerSegments: [
    'Target market segment 1',
    'Target market segment 2',
  ],
  costStructure: [
    'Development costs',
    'Marketing expenses',
    'Operational overhead',
  ],
  revenueStreams: [
    'Product sales',
    'Subscription fees',
    'Service revenue',
  ],
};

export default function EntrepreneurshipPage() {
  return (
    <div className="min-h-screen bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-darkest mb-4">
            Entrepreneurship Journey
          </h1>
          <p className="text-lg text-primary-darkest">
            Documenting the process of building a business using the Business Model Canvas framework.
          </p>
        </div>

        <div className="rounded-lg p-6 mb-8 bg-white">
          <BusinessModelCanvas data={canvasData} />
        </div>

        <div className="rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-2xl font-bold text-primary-darkest mb-4">
            About This Canvas
          </h2>
          <p className="text-primary-darkest">
            This Business Model Canvas visualizes the key components of the business model,
            including value propositions, customer segments, revenue streams, and more.
            The canvas is a living document that evolves as the business grows and learns.
          </p>
        </div>
      </div>
    </div>
  );
}

