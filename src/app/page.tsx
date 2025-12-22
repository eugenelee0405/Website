import Link from 'next/link';

const sections = [
  {
    title: 'Stock Analysis',
    description: 'In-depth analysis and reports on stocks with Buy, Sell, or Hold ratings.',
    href: '/stock-analysis',
    color: 'bg-primary-dark',
  },
  {
    title: 'Entrepreneurship',
    description: 'Documenting the journey of building a business with a Business Model Canvas.',
    href: '/entrepreneurship',
    color: 'bg-primary-dark',
  },
  {
    title: 'Sports Medicine',
    description: 'Research-focused articles and deep-dive analysis in sports medicine.',
    href: '/sports-medicine',
    color: 'bg-primary-dark',
  },
  {
    title: 'Tech Consulting',
    description: 'PC building guidance, electronics recommendations, and custom build requests.',
    href: '/tech-consulting',
    color: 'bg-primary-dark',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-darkest text-primary-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Exploring stocks, entrepreneurship, sports medicine research, and tech consulting.
          </p>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16" style={{ backgroundColor: '#FFFFE3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-darkest">
            Explore My Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="block rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <div className={`h-2 ${section.color}`}></div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFFFE3' }}>
                  <h3 className="text-2xl font-bold mb-3 text-primary-darkest">
                    {section.title}
                  </h3>
                  <p className="text-primary-darkest">
                    {section.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

