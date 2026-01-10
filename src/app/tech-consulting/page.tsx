import BuildRequestForm from './components/BuildRequestForm';
import Gallery from './components/Gallery';
import { BuildGalleryItem } from '@/lib/types';
import fs from 'fs';
import path from 'path';

function getGalleryItems(): BuildGalleryItem[] {
  const galleryPath = path.join(process.cwd(), 'content', 'tech-consulting', 'gallery.json');

  if (!fs.existsSync(galleryPath)) {
    return [];
  }

  try {
    const fileContents = fs.readFileSync(galleryPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export default function TechConsultingPage() {
  const galleryItems = getGalleryItems();

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-darkest mb-4">
            Tech Consulting
          </h1>
          <p className="text-lg text-primary-darkest">
            Get personalized PC build recommendations and electronics advice. Request a custom build or browse previous recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <BuildRequestForm />
          </div>
          <div className="rounded-lg shadow-md p-8 bg-white">
            <h2 className="text-2xl font-bold text-primary-darkest mb-4">
              What I Offer
            </h2>
            <ul className="space-y-3 text-primary-darkest">
              <li className="flex items-start">
                <span className="mr-2 text-primary-dark">✓</span>
                <span>Custom PC build recommendations tailored to your budget and needs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-dark">✓</span>
                <span>Electronics selection guidance (monitors, peripherals, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-dark">✓</span>
                <span>Performance optimization advice</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-dark">✓</span>
                <span>Compatibility checking and troubleshooting</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-primary-darkest mb-6">
            Previous Builds & Recommendations
          </h2>
          <Gallery items={galleryItems} />
        </div>
      </div>
    </div>
  );
}

