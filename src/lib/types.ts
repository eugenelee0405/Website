export type Rating = 'Buy' | 'Sell' | 'Hold';

export interface StockPost {
  slug: string;
  title: string;
  date: string;
  rating: Rating;
  excerpt: string;
  content: string;
}

export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  abstract?: string;
  readingTime?: number;
  content: string;
}

export interface BuildGalleryItem {
  id: string;
  title: string;
  image: string;
  specs: string[];
  date: string;
  description?: string;
}

export interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

