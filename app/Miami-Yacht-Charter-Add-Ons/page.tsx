'use client';

import Link from 'next/link';

export default function AddOnsPage() {
  const categories = [
    {
      id: 'catering',
      title: 'Catering',
      subtitle: 'Culinary Excellence',
      description: 'Artisanal platters and gourmet cuisine, curated for discerning palates',
      href: '/Miami-Yacht-Charter-Catering',
      image: '/images/products/catering/hero.jpg',
      accent: 'Savor',
      number: '01'
    },
    {
      id: 'water-toys',
      title: 'Water Toys',
      subtitle: 'Aquatic Adventures',
      description: 'Premium water sports equipment and floating luxury for the ultimate ocean experience',
      href: '/Miami-Yacht-Charter-Water-Toys',
      image: '/images/products/water-toys/hero.jpg',
      accent: 'Explore',
      number: '02'
    },
    {
      id: 'flowers',
      title: 'Flowers',
      subtitle: 'Botanical Elegance',
      description: 'Bespoke floral arrangements that transform your yacht into a floating garden',
      href: '/Miami-Yacht-Charter-Flowers',
      image: '/images/products/flowers/rose-pave.png',
      accent: 'Adorn',
      number: '03'
    },
    {
      id: 'bachelorette',
      title: 'Bachelorette',
      subtitle: 'Celebration Suites',
      description: 'Curated packages for unforgettable moments before the veil',
      href: '/Miami-Yacht-Charter-Bachelorette-Packages',
      image: '/images/products/bachelorette/hero.jpg',
      accent: 'Celebrate',
      number: '04'
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f7] via-transparent to-[#faf9f7]" />
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-20 py-32 w-full">
          <div className="max-w-4xl">
            {/* Overline */}
            <div className="flex items-center gap-6 mb-8">
              <div className="rule-gold w-16" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
                Elevate Your Experience
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="editorial-display text-[#0f0f0f] mb-8" style={{ 
              fontSize: 'clamp(3rem, 8vw, 7rem)', 
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              The Art of
              <br />
              <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Refinement</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-[#6b6b6b] text-xl md:text-2xl max-w-2xl mb-12" style={{ 
              fontWeight: 300,
              lineHeight: 1.6,
              letterSpacing: '0.01em'
            }}>
              Exceptional additions for those who appreciate
              <br className="hidden md:block" />
              the finer details of luxury yachting.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-xl">
              <div>
                <div className="text-3xl md:text-4xl text-[#c4a265] mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>90+</div>
                <div className="text-xs uppercase tracking-wider text-[#6b6b6b]">Curated Items</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-[#c4a265] mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>48hr</div>
                <div className="text-xs uppercase tracking-wider text-[#6b6b6b]">Advance Notice</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-[#c4a265] mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>100%</div>
                <div className="text-xs uppercase tracking-wider text-[#6b6b6b]">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Magazine Layout */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-20 pb-32">
        <div className="space-y-32">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}>
                {/* Image Side */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {/* Number Overlay */}
                    <div className="absolute top-8 left-8 z-10">
                      <span className="text-white/90 text-6xl md:text-8xl" style={{ 
                        fontFamily: 'var(--font-cormorant)', 
                        fontWeight: 300,
                        textShadow: '0 2px 20px rgba(0,0,0,0.3)'
                      }}>
                        {category.number}
                      </span>
                    </div>
                    
                    {/* Image */}
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23f0ece6" width="800" height="600"/%3E%3C/svg%3E';
                      }}
                    />
                    
                    {/* Accent Label */}
                    <div className="absolute bottom-8 right-8">
                      <span className="bg-[#c4a265] text-white px-6 py-3 text-xs uppercase tracking-[0.3em] font-medium">
                        {category.accent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-6">
                    {/* Subtitle */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-[#c4a265]" />
                      <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
                        {category.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="editorial-display text-5xl md:text-6xl text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors duration-500" style={{ 
                      fontWeight: 300,
                      lineHeight: 1.1 
                    }}>
                      {category.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3 text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors duration-300 pt-4">
                      <span className="text-sm uppercase tracking-[0.2em] font-medium">Discover Collection</span>
                      <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {index < categories.length - 1 && (
                <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-[#c4a265]/20 to-transparent" />
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial Note Section */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-20 pb-32">
        <div className="bg-white border-t border-b border-[#c4a265]/20 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-[#c4a265]" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">A Note on Excellence</span>
              <div className="w-16 h-px bg-[#c4a265]" />
            </div>
            
            <p className="text-[#6b6b6b] text-lg leading-relaxed" style={{ fontWeight: 300 }}>
              Each addition is thoughtfully curated and provided by select partners who share our commitment to excellence. 
              Advance reservations ensure every detail is perfected for your experience.
            </p>
            
            <p className="text-[#0f0f0f] text-sm" style={{ fontWeight: 400 }}>
              A valid yacht charter reservation is required for all add-on services.
            </p>

            {/* Contact */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <a 
                href="tel:+18007479585" 
                className="text-[#c4a265] hover:text-[#0f0f0f] transition-colors duration-300 tracking-wider"
              >
                1-800-747-9585
              </a>
              <span className="hidden sm:inline text-[#c4a265]/40">|</span>
              <a 
                href="https://wa.me/message/T7LESNSS34RWJ1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#c4a265] hover:text-[#0f0f0f] transition-colors duration-300 tracking-wider"
              >
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
