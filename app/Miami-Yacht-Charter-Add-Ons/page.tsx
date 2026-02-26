'use client';

import Link from 'next/link';

export default function AddOnsPage() {
  const categories = [
    {
      id: 'catering',
      title: 'Catering',
      description: 'Gourmet platters and fresh cuisine delivered to your yacht',
      href: '/Miami-Yacht-Charter-Catering',
      image: '/images/products/catering/hero.jpg',
      bgColor: 'from-amber-50 to-orange-50'
    },
    {
      id: 'water-toys',
      title: 'Water Toys',
      description: 'Seabobs, jet skis, floating lounges and water sports',
      href: '/Miami-Yacht-Charter-Water-Toys',
      image: '/images/products/water-toys/hero.jpg',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'flowers',
      title: 'Flowers',
      description: 'Elegant floral arrangements for your yacht',
      href: '/Miami-Yacht-Charter-Flowers',
      image: '/images/products/flowers/rose-pave.png',
      bgColor: 'from-pink-50 to-rose-50'
    },
    {
      id: 'bachelorette',
      title: 'Bachelorette Packages',
      description: 'Complete party packages for unforgettable celebrations',
      href: '/Miami-Yacht-Charter-Bachelorette-Packages',
      image: '/images/products/bachelorette/hero.jpg',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 via-[#0f0f0f]/40 to-[#faf9f7]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="rule-gold mx-auto mb-8" />
          <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ fontWeight: 300 }}>
            Yacht Charter <span className="text-[#c4a265]">Add-Ons</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Elevate your Miami yacht charter with premium catering, water sports, floral arrangements, and celebration packages
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden bg-white border border-black/5 hover:border-[#c4a265]/30 transition-all duration-500 hover:shadow-xl"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br ${category.bgColor}">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0ece6" width="400" height="300"/%3E%3C/svg%3E';
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-8 md:p-10">
                <h2 className="editorial-card-name text-[#0f0f0f] mb-3 group-hover:text-[#c4a265] transition-colors duration-300">
                  {category.title}
                </h2>
                <p className="text-[#6b6b6b] text-base mb-6" style={{ fontWeight: 300 }}>
                  {category.description}
                </p>
                <div className="flex items-center text-[#c4a265] text-sm uppercase tracking-wider font-medium">
                  <span>Explore Collection</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
        <div className="bg-white border border-black/5 p-10 md:p-12">
          <h3 className="editorial-card-name text-[#0f0f0f] mb-6">Ordering Information</h3>
          <div className="space-y-4 text-[#6b6b6b]" style={{ fontWeight: 300 }}>
            <p>
              All add-ons must be reserved in advance and are subject to availability. 
              Items are provided by independent third-party vendors and require advance notice.
            </p>
            <p>
              A valid yacht charter reservation is required to place add-on orders. 
              Your charter details will be requested at checkout to attach items to your reservation.
            </p>
            <p className="text-[#0f0f0f] font-medium">
              Questions? Contact us at{' '}
              <a href="tel:+18007479585" className="text-[#c4a265] hover:underline">
                1-800-747-9585
              </a>
              {' '}or{' '}
              <a href="https://wa.me/message/T7LESNSS34RWJ1" target="_blank" rel="noopener noreferrer" className="text-[#c4a265] hover:underline">
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
