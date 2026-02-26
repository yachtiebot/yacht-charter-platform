'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';
import ProductImageGallery from '@/components/ProductImageGallery';
import DarkFooter from '@/components/DarkFooter';

// Bachelorette packages from scraped data
const packages = [
  {
    id: 'last-toast',
    name: 'Last Toast On The Coast',
    subtitle: 'The Vibe Package',
    price: 199.99,
    description: 'Designed for groups who want their celebration to feel festive and coordinated. From drinks onboard to water time photos, this package brings together essential touches that turn a yacht charter into a true celebration.',
    includes: [
      'Last Toast On The Coast banner',
      'Bride themed cups',
      'Bridal bow themed straws',
      'Bridal sash with crown and veil',
      'Engagement ring float',
      'Team bride bracelets'
    ],
    images: [
      '/images/products/bachelorette/lasttoastonthecoast.jpg',
      '/images/products/bachelorette/Last+toast+on+the+coast.jpeg',
      '/images/products/bachelorette/bride+cups.jpg',
      '/images/products/bachelorette/bride+straws.jpg',
      '/images/products/bachelorette/bride+crown+and+veil.jpg'
    ],
    featured: true
  },
  {
    id: 'last-sail',
    name: 'Last Sail Before The Veil',
    subtitle: 'The Fun Package',
    price: 249.99,
    description: 'A comprehensive celebration suite with everything needed for an unforgettable send-off. Includes premium decorations, coordinated accessories, and keepsake items.',
    includes: [
      'Last Sail Before The Veil banner',
      'Bride themed cups',
      'Bride veil',
      'Bride themed straws',
      'Bride tribe bracelets',
      'Bachelorette sailor hats',
      'Engagement ring float',
      'Bride captain hat'
    ],
    images: [
      '/images/products/bachelorette/last_sail_before_the_veil.jpeg',
      '/images/products/bachelorette/bride+captain+hat.jpg',
      '/images/products/bachelorette/bride+veil.jpg'
    ]
  },
  {
    id: 'something-blue',
    name: 'Something Blue Before I Do',
    subtitle: 'The Splurge Package',
    price: 299.99,
    description: 'The ultimate bachelorette experience. Curated for those seeking a truly exceptional celebration with elevated touches and memorable moments.',
    includes: [
      'Something Blue Before I Do banner',
      'Bride themed cups for onboard drinks',
      'Bride to be crown with sash and veil',
      'Engagement ring float for water photos',
      'Ribbon themed straws',
      'Bachelorette boat day accessories for entire group (travel case, sunglasses, scrunchie, keepsake bracelet, hair clip)'
    ],
    images: [
      '/images/products/bachelorette/bride+crown+and+veil.jpg',
      '/images/products/bachelorette/bachelorette+cupcakes.jpg',
      '/images/products/bachelorette/bride+cups.jpg'
    ],
    premium: true
  },
  {
    id: 'drone-video',
    name: 'Drone Keepsake Video',
    subtitle: 'Memory Enhancement',
    price: 399,
    description: 'Professional aerial videography capturing your celebration from breathtaking perspectives. The perfect addition to any package or standalone upgrade.',
    includes: [
      'Professional drone operator',
      '30-minute aerial filming',
      'Edited highlight reel (2-3 minutes)',
      '4K video quality',
      'Cinematic music soundtrack',
      'Digital download delivery'
    ],
    images: [
      '/images/Miami_Yachting_Company_yacht-rental-miami.jpg',
      '/images/Miami_Yachting_Company_philosophy-yacht.jpg'
    ],
    addon: true
  }
];

export default function BachelorettePackagesPage() {
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">
        {/* Breadcrumb */}
        <div className="py-6 text-sm text-[#6b6b6b]">
          <Link href="/Miami-Yacht-Charter-Add-Ons" className="hover:text-[#c4a265]">Add-Ons</Link>
          <span className="mx-2">/</span>
          <span>Bachelorette Packages</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div className="rule-gold w-16" />
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
              Celebration Suites
            </span>
          </div>
          
          <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Bachelorette <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Packages</span>
          </h1>
          
          <p className="text-[#6b6b6b] text-lg md:text-xl max-w-3xl" style={{ fontWeight: 300, lineHeight: 1.6 }}>
            Curated celebration packages for unforgettable moments before the veil. 
            No stress, no last-minute shopping—just pure celebration delivered to your yacht.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="space-y-16 pb-32">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={`bg-white group hover:shadow-2xl transition-all duration-500 ${
                pkg.premium ? 'border-2 border-[#c4a265]' : 'border border-[#0f0f0f]/5'
              }`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}>
                {/* Image Side */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative">
                    <div className="h-full">
                      <ProductImageGallery 
                        images={pkg.images} 
                        productName={pkg.name}
                        aspectRatio="wide"
                        objectFit="contain"
                      />
                    </div>
                    
                    {/* Badge */}
                    {pkg.featured && (
                      <div className="absolute top-6 left-6 z-10">
                        <span className="bg-[#c4a265] text-white px-4 py-2 text-xs uppercase tracking-[0.3em]">
                          Most Popular
                        </span>
                      </div>
                    )}
                    {pkg.premium && (
                      <div className="absolute top-6 left-6 z-10">
                        <span className="bg-[#0f0f0f] text-white px-4 py-2 text-xs uppercase tracking-[0.3em]">
                          Premium
                        </span>
                      </div>
                    )}
                    {pkg.addon && (
                      <div className="absolute top-6 left-6 z-10">
                        <span className="bg-[#6b6b6b] text-white px-4 py-2 text-xs uppercase tracking-[0.3em]">
                          Add-On
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-7 p-8 md:p-12 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}>
                  {/* Subtitle */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-[#c4a265]" />
                    <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em]">
                      {pkg.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl text-[#0f0f0f] mb-4" style={{ 
                    fontFamily: 'var(--font-cormorant)', 
                    fontWeight: 300,
                    lineHeight: 1.2,
                    textWrap: 'balance'
                  }}>
                    {pkg.name}
                  </h2>

                  {/* Description */}
                  <p className="text-[#6b6b6b] leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                    {pkg.description}
                  </p>

                  {/* Includes */}
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-wider text-[#0f0f0f] mb-3 font-medium">Package Includes:</h4>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#6b6b6b]">
                          <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span style={{ fontWeight: 300 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-6 border-t border-[#0f0f0f]/10 space-y-4">
                    <div>
                      <div className="text-4xl text-[#0f0f0f] mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                        ${pkg.price}
                      </div>
                      <div className="text-xs text-[#6b6b6b] uppercase tracking-wider">Complete Package</div>
                    </div>
                    <button
                      onClick={() => addItem({
                        id: pkg.id,
                        name: pkg.name,
                        price: pkg.price,
                        category: 'bachelorette',
                        image: pkg.images[0]
                      })}
                      className="w-full bg-white border border-[#0f0f0f]/20 text-[#0f0f0f] py-4 px-8 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="border-t border-[#c4a265]/20 pt-16 pb-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[#c4a265]" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em]">Celebration Details</span>
              <div className="w-16 h-px bg-[#c4a265]" />
            </div>
            
            <p className="text-[#6b6b6b] text-xs leading-relaxed" style={{ fontWeight: 300 }}>
              All packages are delivered directly to your yacht, ready to celebrate. 
              Items arrive carefully packaged and organized for easy setup.
            </p>
            
            <p className="text-[#6b6b6b]/60 text-xs leading-relaxed">
              A valid yacht charter reservation is required. 48-hour advance notice ensures availability. 
              Packages can be combined or customized—contact us for bespoke options.
            </p>
          </div>
        </div>
      </div>

      <DarkFooter />
    </main>
  );
}
