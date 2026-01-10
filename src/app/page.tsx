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
      <section className="py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-primary-light">
        <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-12 text-center border border-primary-medium">
          {/* Name */}
          <h1 className="text-7xl md:text-8xl font-bold text-primary-darkest mb-6 tracking-tight">
            Eugene Lee
          </h1>

          {/* Headline */}
          <p className="text-xl md:text-2xl text-primary-dark font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Exploring stocks, entrepreneurship, sports medicine research, and tech consulting.
          </p>

          <div className="w-full h-px bg-primary-medium/30 mb-10"></div>

          {/* Bio & Profile */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-left">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary-dark shadow-lg bg-gray-200">
                <img
                  src="/images/me.jpg"
                  alt="Eugene Lee"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Text */}
            <div className="max-w-lg text-lg text-primary-darkest/90 space-y-4 leading-relaxed bg-primary-light/30 p-6 rounded-xl border border-primary-light">
              <p>
                Hello! I am a <strong className="text-primary-darkest">14-year-old</strong> student from <strong className="text-primary-darkest">South Korea</strong>.
              </p>
              <p>
                Currently, I am a Freshman at the <strong className="text-primary-darkest">International School of Busan</strong>.
              </p>
              <p>
                Welcome to my personal portfolio where I share my journey in finance, business, science, and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 bg-primary-light">
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
                <div className="p-6 rounded-lg bg-white">
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

