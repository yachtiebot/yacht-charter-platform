'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';

// Flower products from scraped data
const flowerProducts = [
  {
    id: 'rose-pave',
    name: 'Rose Pavé',
    description: 'Luxurious roses artfully arranged in an elegant vase, adding timeless beauty to your onboard experience.',
    image: '/images/products/flowers/rose-pave.png',
    prices: { small: 89, medium: 129, large: 189 }
  },
  {
    id: 'blooming-orchid',
    name: 'Blooming Orchid',
    description: 'Stunning display of fresh exotic orchids meticulously arranged, perfectly curated for luxury yacht settings.',
    image: '/images/products/flowers/blooming-orchid.png',
    prices: { small: 95, medium: 135, large: 195 }
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    description: 'Vibrant tropical arrangement bringing the essence of Miami\'s natural splendor aboard your yacht.',
    image: '/images/products/flowers/tropical+paradise.png',
    prices: { small: 89, medium: 129, large: 189 }
  },
  {
    id: 'dancing-roses',
    name: 'Dancing Roses',
    description: 'Elegant arrangement of roses that brings movement and grace to your yacht\'s interior.',
    image: '/images/products/flowers/dancingroses.png',
    prices: { small: 99, medium: 139, large: 199 }
  },
  {
    id: 'tropical-rose',
    name: 'Tropical Rose',
    description: 'Sophisticated fusion of tropical blooms and classic roses for a distinctive aesthetic.',
    image: '/images/products/flowers/rose+pave.png',
    prices: { small: 89, medium: 129, large: 189 }
  },
  {
    id: 'tropical-orchid',
    name: 'Tropical Orchid',
    description: 'Exotic orchids paired with tropical accents for a refined, contemporary look.',
    image: '/images/products/flowers/tropical+Orchid.png',
    prices: { small: 95, medium: 135, large: 195 }
  },
  {
    id: 'floating-orchid',
    name: 'Floating Orchid',
    description: 'Delicate orchids in a unique floating arrangement, perfect for modern yacht interiors.',
    image: '/images/products/flowers/floatingorchid.png',
    prices: { small: 95, medium: 135, large: 195 }
  },
  {
    id: 'blooming-garden',
    name: 'Blooming Garden',
    description: 'Mixed seasonal blooms creating a lush garden atmosphere aboard your vessel.',
    image: '/images/products/flowers/rose-pave.png',
    prices: { small: 89, medium: 129, large: 189 }
  },
  {
    id: 'modern-simplicity',
    name: 'Modern Simplicity',
    description: 'Clean, contemporary arrangement emphasizing form and elegant restraint.',
    image: '/images/products/flowers/rose-pave.png',
    prices: { small: 89, medium: 129, large: 189 }
  },
  {
    id: 'pretty-in-white',
    name: 'Pretty in White',
    description: 'Pristine white blooms creating a serene, sophisticated atmosphere.',
    image: '/images/products/flowers/rose-pave.png',
    prices: { small: 99, medium: 139, large: 199 }
  },
  {
    id: 'victoria-london',
    name: 'Victoria & London',
    description: 'Classic English garden-inspired arrangement with timeless appeal.',
    image: '/images/products/flowers/rose-pave.png',
    prices: { small: 99, medium: 139, large: 199 }
  }
];

export default function FlowersPage() {
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: 'small' | 'medium' | 'large'}>({});

  const handleSizeSelect = (productId: string, size: 'small' | 'medium' | 'large') => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">
        {/* Breadcrumb */}
        <div className="py-6 text-sm text-[#6b6b6b]">
          <Link href="/Miami-Yacht-Charter-Add-Ons" className="hover:text-[#c4a265]">Add-Ons</Link>
          <span className="mx-2">/</span>
          <span>Flowers</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div className="rule-gold w-16" />
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
              Botanical Elegance
            </span>
          </div>
          
          <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Floral <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Arrangements</span>
          </h1>
          
          <p className="text-[#6b6b6b] text-lg md:text-xl max-w-3xl mb-8" style={{ fontWeight: 300, lineHeight: 1.6 }}>
            Bespoke floral designs that transform your yacht into a floating garden. 
            Each arrangement hand-selected for beauty, fragrance, and lasting elegance.
          </p>

          {/* Size Guide */}
          <div className="inline-flex items-center gap-8 bg-white border border-[#c4a265]/20 px-8 py-4">
            <div className="text-center">
              <div className="text-sm text-[#6b6b6b] mb-1">Small</div>
              <div className="text-xs text-[#6b6b6b]/60">5" Round</div>
            </div>
            <div className="w-px h-8 bg-[#c4a265]/20" />
            <div className="text-center">
              <div className="text-sm text-[#6b6b6b] mb-1">Medium</div>
              <div className="text-xs text-[#6b6b6b]/60">8" Round</div>
            </div>
            <div className="w-px h-8 bg-[#c4a265]/20" />
            <div className="text-center">
              <div className="text-sm text-[#6b6b6b] mb-1">Large</div>
              <div className="text-xs text-[#6b6b6b]/60">10" Round</div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {flowerProducts.map((product) => {
            const selectedSize = selectedSizes[product.id] || 'medium';
            const price = product.prices[selectedSize];

            return (
              <div 
                key={product.id} 
                className="bg-white group hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-square bg-[#f0ece6] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23f0ece6" width="400" height="400"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                    {product.name}
                  </h3>
                  
                  <p className="text-[#6b6b6b] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wider text-[#6b6b6b]">Select Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['small', 'medium', 'large'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`py-2 text-xs uppercase tracking-wider border transition-all ${
                            selectedSize === size
                              ? 'bg-[#c4a265] text-white border-[#c4a265]'
                              : 'bg-white text-[#6b6b6b] border-[#6b6b6b]/20 hover:border-[#c4a265]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                        ${price}
                      </span>
                      <span className="text-sm text-[#6b6b6b] capitalize">{selectedSize}</span>
                    </div>
                    
                    <button
                      onClick={() => addItem({
                        id: `${product.id}-${selectedSize}`,
                        name: `${product.name} (${selectedSize})`,
                        price: price,
                        category: 'flowers',
                        image: product.image
                      })}
                      className="w-full bg-[#0f0f0f] text-white py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="border-t border-[#c4a265]/20 pt-16 pb-32">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-[#6b6b6b] text-sm" style={{ fontWeight: 300 }}>
              All arrangements are created fresh to order using premium blooms. 
              Delivery to your yacht is included with every order.
            </p>
            <p className="text-xs text-[#6b6b6b]/80">
              A valid yacht charter reservation is required. 48-hour advance notice requested for optimal selection.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
