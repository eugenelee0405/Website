'use client';

import { useState } from 'react';
import { BuildGalleryItem } from '@/lib/types';
import { format } from 'date-fns';

interface GalleryProps {
  items: BuildGalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<BuildGalleryItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-lg shadow-md p-8 text-center" style={{ backgroundColor: '#FFFFE3' }}>
        <p className="text-primary-darkest">
          No builds to display yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#FFFFE3' }}
          >
            <div className="aspect-video bg-primary-medium flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary-darkest">No Image</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-primary-darkest mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-primary-darkest mb-3">
                {item.date ? format(new Date(item.date), 'MMMM yyyy') : ''}
              </p>
              {item.specs && item.specs.length > 0 && (
                <ul className="text-sm text-primary-darkest space-y-1">
                  {item.specs.slice(0, 3).map((spec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                  {item.specs.length > 3 && (
                    <li className="text-primary-dark font-medium">+{item.specs.length - 3} more</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-primary-darkest bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#FFFFE3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-primary-darkest">
                  {selectedItem.title}
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-primary-darkest hover:text-primary-dark"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedItem.date && (
                <p className="text-sm text-primary-darkest mb-4">
                  {format(new Date(selectedItem.date), 'MMMM d, yyyy')}
                </p>
              )}

              {selectedItem.image && (
                <div className="mb-6">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {selectedItem.description && (
                <p className="text-primary-darkest mb-6">
                  {selectedItem.description}
                </p>
              )}

              {selectedItem.specs && selectedItem.specs.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-primary-darkest mb-3">
                    Specifications
                  </h3>
                  <ul className="space-y-2">
                    {selectedItem.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start text-primary-darkest">
                        <span className="mr-2">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

