import Link from 'next/link';
import { TrendingUp, Briefcase, Activity, Code, User, MapPin, School, ArrowRight } from 'lucide-react';

const sections = [
  {
    title: 'Stock Analysis',
    stat: 'Research',
    change: '+2 new',
    changeType: 'positive',
    href: '/stock-analysis',
    icon: TrendingUp,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Entrepreneurship',
    stat: 'Ventures',
    change: 'Active',
    changeType: 'neutral',
    href: '/entrepreneurship',
    icon: Briefcase,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Sports Medicine',
    stat: 'Articles',
    change: 'Published',
    changeType: 'positive',
    href: '/sports-medicine',
    icon: Activity,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Tech Consulting',
    stat: 'Solutions',
    change: 'Available',
    changeType: 'neutral',
    href: '/tech-consulting',
    icon: Code,
    color: 'bg-amber-50 text-amber-600',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-light/30 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-darkest tracking-tight">Dashboard</h1>
            <p className="text-primary-dark text-sm mt-1">Welcome back, exploring Eugene's Portfolio.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-primary-medium/30 text-sm text-primary-dark">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Online
            </div>
            <button className="p-2 rounded-full bg-white border border-primary-medium/30 text-primary-dark hover:bg-primary-light transition-colors">
              <User size={20} />
            </button>
          </div>
        </header>

        {/* Top Cards Grid (Navigation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white rounded-2xl p-6 border border-primary-light/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${section.color} bg-opacity-10`}>
                    <Icon size={24} className={section.color.replace('bg-', 'text-').replace('50', '600')} />
                  </div>
                  {/* Arrow icon that appears on hover */}
                  <div className="text-gray-300 group-hover:text-primary-dark transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{section.title}</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-primary-darkest">{section.stat}</span>
                  </div>
                  <div className="mt-2 text-xs font-medium px-2 py-1 rounded-full bg-gray-50 inline-block text-gray-600">
                    {section.change}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Split (Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Panel: Recent Activity / Bio */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-primary-light/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-darkest">About Me</h2>
              <button className="text-sm text-primary-dark font-medium hover:text-primary-darkest">View Full Bio</button>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="shrink-0 p-3 bg-primary-light/30 rounded-full text-primary-darkest">
                  <School size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Student & Researcher</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    Currently a Freshman at the <strong className="text-primary-darkest">International School of Busan</strong>.
                    Passionate about applying scientific principles to real-world problems.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="shrink-0 p-3 bg-primary-light/30 rounded-full text-primary-darkest">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Based in South Korea</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    Living and learning in Busan. Exploring the intersection of Eastern and Western business practices and medical research.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="shrink-0 p-3 bg-primary-light/30 rounded-full text-primary-darkest">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Active Interests</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    My portfolio covers a diverse range of topics from high-growth stock analysis to sports medicine research papers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel: Overview / Profile */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-6 sm:p-8 border border-primary-light/50 shadow-sm flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-primary-darkest w-full text-left mb-6">Profile</h2>

            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full p-1 border-2 border-dashed border-primary-medium">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                  <img
                    src="/images/me.jpg"
                    alt="Eugene Lee"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className="text-[10px] font-bold">EL</div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Eugene Lee</h3>
            <p className="text-gray-500 font-medium mb-6">Student & Developer</p>

            <div className="w-full grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Age</div>
                <div className="text-lg font-bold text-primary-darkest">15</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Grade</div>
                <div className="text-lg font-bold text-primary-darkest">9th</div>
              </div>
            </div>

            <div className="w-full mt-auto">
              <button className="w-full py-3 bg-primary-dark text-white rounded-xl font-semibold shadow-lg shadow-primary-dark/20 hover:bg-primary-darkest hover:shadow-xl transition-all active:scale-95">
                Contact Me
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
