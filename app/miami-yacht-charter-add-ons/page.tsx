'use client';

import { useState } from 'react';
import Link from 'next/link';
import DarkFooter from '@/components/DarkFooter';
import ScrollIndicator from '@/components/ScrollIndicator';
import InquiryModal from '@/components/InquiryModal';

export default function AddOnsPage() {
  const [inquiryModal, setInquiryModal] = useState<{ isOpen: boolean; serviceName: string }>({
    isOpen: false,
    serviceName: ''
  });

  const openInquiry = (serviceName: string) => {
    setInquiryModal({ isOpen: true, serviceName });
  };

  const closeInquiry = () => {
    setInquiryModal({ isOpen: false, serviceName: '' });
  };
  const categories = [
    {
      id: 'catering',
      title: 'Catering',
      subtitle: 'Culinary Excellence',
      description: 'Artisanal platters and gourmet cuisine, curated for discerning palates',
      href: '/miami-yacht-charter-catering',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_addons_catering_thumb.webp',
      accent: 'Savor',
      number: '01'
    },
    {
      id: 'water-toys',
      title: 'Water Toys',
      subtitle: 'Aquatic Adventures',
      description: 'Premium water sports equipment and floating luxury for the ultimate ocean experience',
      href: '/miami-yacht-charter-water-toys',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_addons_water_toys_thumb.webp',
      accent: 'Explore',
      number: '02'
    },
    {
      id: 'flowers',
      title: 'Flowers',
      subtitle: 'Botanical Elegance',
      description: 'Bespoke floral arrangements that transform your yacht into a floating garden',
      href: '/miami-yacht-charter-flowers',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_addons_flowers_thumb.webp',
      accent: 'Adorn',
      number: '03'
    },
    {
      id: 'bachelorette',
      title: 'Bachelorette',
      subtitle: 'Celebration Suites',
      description: 'Curated packages for unforgettable moments before the veil',
      href: '/miami-yacht-charter-bachelorette-packages',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_addons_bachelorette_thumb.webp',
      accent: 'Celebrate',
      number: '04'
    }
  ];

  const premiumAddOns = [
    {
      id: 'alcohol-delivery',
      title: 'Rare Vintage & Premium Alcohol',
      subtitle: 'Spirits & Engraving',
      description: 'Exclusive premium alcohol delivery with custom bottle engraving. Savor the finest spirits, each bottle personalized with your message.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_premium_alcohol.webp',
      accent: 'Inquire',
      number: '05'
    },
    {
      id: 'luxury-transportation',
      title: 'Luxury Transportation',
      subtitle: 'Arrive in Style',
      description: 'Premium vehicles including luxury sedans and limo buses. Every detail arranged for a seamless, stress free travel experience.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_premium_transport.webp',
      accent: 'Inquire',
      number: '06'
    },
    {
      id: 'chef-services',
      title: 'Private Chef Services',
      subtitle: 'Culinary Artistry',
      description: 'Elite chefs crafting custom menus tailored to your preferences. From multicourse dinners to delightful brunches aboard your yacht.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_premium_hero.webp',
      accent: 'Inquire',
      number: '07'
    },
    {
      id: 'bespoke-catering',
      title: 'Bespoke Catering Delivery',
      subtitle: 'Restaurant Quality',
      description: 'Gourmet dishes from Miami\'s top restaurants, delivered fresh to your yacht. Culinary excellence without an onboard chef.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_addons_catering_thumb.webp',
      accent: 'Inquire',
      number: '08'
    },
    {
      id: 'sushi-delivery',
      title: 'Premium Sushi Delivery',
      subtitle: 'Japanese Excellence',
      description: 'Meticulously crafted rolls and sashimi from the freshest ingredients. The art of Japanese cuisine delivered to open seas.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_premium_hero.webp',
      accent: 'Inquire',
      number: '09'
    },
    {
      id: 'onboard-masseuse',
      title: 'Onboard Masseuse',
      subtitle: 'Floating Spa',
      description: 'Professional massage treatments tailored to your needs. Melt away stress while drifting across Miami\'s tropical waters.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_premium_hero.webp',
      accent: 'Inquire',
      number: '10'
    },
    {
      id: 'drone-pilot',
      title: 'Drone Video Services',
      subtitle: 'Aerial Cinematography',
      description: 'Professional drone pilots creating cinematic masterpieces. Stunning aerial footage of your yacht surrounded by Miami\'s iconic skyline.',
      image: 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/Miami_Yachting_Company_premium_watersports.webp',
      accent: 'Inquire',
      number: '11'
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section - Editorial Style */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f7] via-transparent to-[#faf9f7]" />
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-20 py-32 w-full">
          <div className="max-w-4xl">
            {/* Overline */}
            <div className="flex items-center gap-6 mb-8">
              <div className="rule-gold w-16" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
                The Art of Options
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="editorial-display text-[#0f0f0f] mb-8" style={{ 
              fontSize: 'clamp(3rem, 8vw, 7rem)', 
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              Yacht Charter
              <br />
              <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Add Ons</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-[#6b6b6b] text-xl md:text-2xl max-w-2xl mb-12" style={{ 
              fontWeight: 300,
              lineHeight: 1.6,
              letterSpacing: '0.01em'
            }}>
              Exceptional additions for those seeking to upgrade their yacht charter experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-xl">
              <div>
                <div className="text-3xl md:text-4xl font-light text-[#c4a265] mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>90+</div>
                <div className="text-xs uppercase tracking-wider text-[#6b6b6b]">Curated Selections</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light text-[#c4a265] mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>Made</div>
                <div className="text-xs uppercase tracking-wider text-[#6b6b6b]">For Miami</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light text-[#c4a265] mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>100%</div>
                <div className="text-xs uppercase tracking-wider text-[#6b6b6b]">Vibe Amplified</div>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollIndicator dark />
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

      {/* Premium Add Ons - Inquiry Only */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-20 pb-32">
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <div className="rule-gold w-16" />
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
              Bespoke Services
            </span>
          </div>
          
          <h2 className="editorial-display text-4xl md:text-5xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Premium <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Experiences</span>
          </h2>
          
          <p className="text-[#6b6b6b] text-lg max-w-2xl" style={{ fontWeight: 300, lineHeight: 1.6 }}>
            Exclusive offerings available upon request. Each service is individually quoted based on your specific requirements and preferences.
          </p>
        </div>

        <div className="space-y-32">
          {premiumAddOns.map((addon, index) => (
            <div key={addon.id}>
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
                        {addon.number}
                      </span>
                    </div>
                    
                    {/* Image */}
                    <img
                      src={addon.image}
                      alt={addon.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23f0ece6" width="800" height="600"/%3E%3C/svg%3E';
                      }}
                    />
                    
                    {/* Accent Label */}
                    <div className="absolute bottom-8 right-8">
                      <span className="bg-[#c4a265] text-white px-6 py-3 text-xs uppercase tracking-[0.3em] font-medium">
                        {addon.accent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-5 space-y-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-6">
                    {/* Subtitle */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-[#c4a265]" />
                      <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em]">{addon.subtitle}</span>
                    </div>

                    {/* Title */}
                    <h3 className="editorial-display text-4xl md:text-5xl text-[#0f0f0f]" style={{ 
                      fontWeight: 300,
                      lineHeight: 1.1 
                    }}>
                      {addon.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
                      {addon.description}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={() => openInquiry(addon.title)}
                        className="inline-flex items-center justify-center gap-3 bg-white border border-[#0f0f0f]/20 text-[#0f0f0f] px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email Inquiry</span>
                      </button>
                      <a 
                        href="https://wa.me/message/T7LESNSS34RWJ1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-white border border-[#0f0f0f]/20 text-[#0f0f0f] px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {index < premiumAddOns.length - 1 && (
                <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-[#c4a265]/20 to-transparent" />
              )}
            </div>
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
            
            <p className="text-[#6b6b6b] text-xs leading-relaxed" style={{ fontWeight: 300 }}>
              Each addition is thoughtfully curated and provided by select partners who share our commitment to excellence. 
              Advance reservations ensure every detail is perfected for your experience.
            </p>
            
            <p className="text-[#6b6b6b]/60 text-xs" style={{ fontWeight: 300 }}>
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
                className="flex items-center gap-2 text-[#c4a265] hover:text-[#0f0f0f] transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="tracking-wider">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <DarkFooter />

      {/* Inquiry Modal */}
      <InquiryModal 
        isOpen={inquiryModal.isOpen}
        onClose={closeInquiry}
        serviceName={inquiryModal.serviceName}
      />
    </main>
  );
}
