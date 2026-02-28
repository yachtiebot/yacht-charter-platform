'use client';

import Link from 'next/link';
import DarkFooter from '@/components/DarkFooter';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center bg-[#0f0f0f]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="rule-gold mb-8 mx-auto" style={{ width: '120px' }} />
          <h1 className="editorial-display text-6xl md:text-7xl lg:text-8xl text-white mb-6" style={{ fontWeight: 300 }}>
            About <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Us</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.8 }}>
            A curated collection of privately owned vessels, hand selected for comfort, style, and exceptional guest experiences.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-6 py-24 md:py-32">
        
        {/* Opening Statement */}
        <div className="mb-20">
          <h2 className="editorial-display text-4xl md:text-5xl text-[#0f0f0f] mb-8" style={{ fontWeight: 300 }}>
            Miami's Premier <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Yachting Experience</span>
          </h2>
          <div className="space-y-6 text-[#6b6b6b] text-lg leading-relaxed" style={{ fontWeight: 300 }}>
            <p>
              Miami Yachting Company represents the intersection of luxury and authenticity in private yacht charters. 
              We specialize in connecting discerning guests with exceptional vessels and crafting bespoke maritime experiences 
              throughout Miami, Miami Beach, and Key Biscayne.
            </p>
            <p>
              Our approach is simple: quality over quantity. Each yacht in our collection is privately owned, 
              meticulously maintained, and selected for its ability to deliver unforgettable moments on the water.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="rule-gold w-24 mb-20" />

        {/* Our Philosophy */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">Philosophy</span>
            <div className="rule-gold flex-1" style={{ maxWidth: '120px' }} />
          </div>
          <h3 className="editorial-display text-3xl md:text-4xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Curated, Not Crowded
          </h3>
          <div className="space-y-6 text-[#6b6b6b] text-base leading-relaxed" style={{ fontWeight: 300 }}>
            <p>
              We believe the best yacht experiences come from careful curation, not endless options. 
              Every vessel in our fleet has been personally vetted, every captain professionally evaluated, 
              and every detail considered to ensure your time on the water exceeds expectations.
            </p>
            <p>
              From intimate day cruises to grand celebrations, we focus on what matters: exceptional vessels, 
              attentive service, and creating memories that last long after you return to shore.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">Services</span>
            <div className="rule-gold flex-1" style={{ maxWidth: '120px' }} />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Private Charters',
                description: 'Day boats to superyachts, each selected for comfort and style.'
              },
              {
                title: 'Bespoke Experiences',
                description: 'Tailored celebrations, corporate events, and intimate gatherings.'
              },
              {
                title: 'Premium Add-Ons',
                description: 'Gourmet catering, floral arrangements, water toys, and more.'
              },
              {
                title: 'Trusted Partnerships',
                description: 'Licensed captains, insured vendors, and transparent pricing.'
              }
            ].map((service, idx) => (
              <div key={idx} className="group">
                <h4 className="text-xl text-[#0f0f0f] mb-3 group-hover:text-[#c4a265] transition-colors" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
                  {service.title}
                </h4>
                <p className="text-[#6b6b6b] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="rule-gold w-24 mb-20" />

        {/* Our Difference */}
        <div className="mb-20">
          <h3 className="editorial-display text-3xl md:text-4xl text-[#0f0f0f] mb-8" style={{ fontWeight: 300 }}>
            The Miami Yachting <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Difference</span>
          </h3>
          <div className="space-y-6">
            {[
              {
                title: 'No Price Gouging Policy',
                description: 'Transparent pricing with no hidden fees or inflated costs.'
              },
              {
                title: 'Hand-Selected Fleet',
                description: 'Every yacht is personally inspected and approved for quality and safety.'
              },
              {
                title: 'Local Expertise',
                description: 'Miami-based team with deep knowledge of local waters and destinations.'
              },
              {
                title: 'Seamless Booking',
                description: 'Simple reservation process with instant booking available on select vessels.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border-b border-[#e5e5e5] pb-6 last:border-0">
                <h5 className="text-lg text-[#0f0f0f] mb-2" style={{ fontWeight: 400 }}>
                  {item.title}
                </h5>
                <p className="text-[#6b6b6b] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="rule-gold w-24 mb-20" />

        {/* Our Commitment */}
        <div className="mb-20 bg-white p-10 md:p-12 border border-[#0f0f0f]/10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">Commitment</span>
            <div className="rule-gold flex-1" style={{ maxWidth: '80px' }} />
          </div>
          <p className="text-[#6b6b6b] text-lg leading-relaxed mb-6" style={{ fontWeight: 300 }}>
            We are committed to providing safe, luxurious, and unforgettable experiences on the water. 
            Every charter is backed by proper licensing, comprehensive insurance, and a team dedicated 
            to ensuring your complete satisfaction.
          </p>
          <p className="text-[#6b6b6b] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
            All vessels are operated by licensed, professional captains. All water toys and add-ons are 
            provided by fully insured, third-party vendors. A valid yacht charter reservation is required 
            for all bookings.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8">
          <div className="rule-gold mb-8 mx-auto" style={{ width: '120px' }} />
          <h3 className="editorial-display text-3xl md:text-4xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Ready to Set <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Sail?</span>
          </h3>
          <p className="text-[#6b6b6b] text-base mb-8 max-w-xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.7 }}>
            Explore our curated fleet of luxury yachts and discover the perfect vessel for your Miami experience.
          </p>
          <Link 
            href="/yacht-rental-miami"
            className="inline-block editorial-label bg-[#0f0f0f] text-white px-12 py-4 hover:bg-[#c4a265] transition-all duration-500"
          >
            View Our Fleet
          </Link>
        </div>

      </div>

      <DarkFooter />
    </main>
  );
}
