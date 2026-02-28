'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';
import DarkFooter from '@/components/DarkFooter';
import ScrollIndicator from '@/components/ScrollIndicator';

// Flower products from scraped data
const flowerProducts = [
  {
    id: 'rose-pave',
    name: 'Rose Pavé',
    description: 'Luxurious roses artfully arranged in an elegant vase, adding timeless beauty to your onboard experience.',
    image: '/images/products/flowers/rose-pave.png',
    sizes: { small: { size: '5" Round', price: 89 }, medium: { size: '8" Round', price: 129 }, large: { size: '10" Round', price: 189 } }
  },
  {
    id: 'blooming-orchid',
    name: 'Blooming Orchid',
    description: 'Stunning display of fresh exotic orchids meticulously arranged, perfectly curated for luxury yacht settings.',
    image: '/images/products/flowers/blooming-orchid.png',
    sizes: { small: { size: '5" Round', price: 95 }, medium: { size: '8" Round', price: 135 }, large: { size: '10" Round', price: 195 } }
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    description: 'Vibrant tropical arrangement bringing the essence of Miami\'s natural splendor aboard your yacht.',
    image: '/images/products/flowers/tropical+paradise.png',
    sizes: { small: { size: '8"', price: 89 }, medium: { size: '15"', price: 129 }, large: { size: '20"', price: 189 } }
  },
  {
    id: 'dancing-roses',
    name: 'Dancing Roses',
    description: 'Elegant arrangement of roses that brings movement and grace to your yacht\'s interior.',
    image: '/images/products/flowers/dancing-roses.png',
    sizes: { small: { size: '6"', price: 99 }, medium: { size: '8"', price: 139 }, large: { size: '10"', price: 199 } }
  },
  {
    id: 'tropical-rose',
    name: 'Tropical Rose',
    description: 'Sophisticated fusion of tropical blooms and classic roses for a distinctive aesthetic.',
    image: '/images/products/flowers/tropical+roses.png',
    sizes: { small: { size: '10"', price: 89 }, medium: { size: '15"', price: 129 }, large: { size: '20"', price: 189 } }
  },
  {
    id: 'tropical-orchid',
    name: 'Tropical Orchid',
    description: 'Exotic orchids paired with tropical accents for a refined, contemporary look.',
    image: '/images/products/flowers/tropical+Orchid.png',
    sizes: { small: { size: '10"', price: 95 }, medium: { size: '15"', price: 135 }, large: { size: '20"', price: 195 } }
  },
  {
    id: 'floating-orchid',
    name: 'Floating Orchid',
    description: 'Delicate orchids in a unique floating arrangement, perfect for modern yacht interiors.',
    image: '/images/products/flowers/floatingorchid.png',
    sizes: { medium: { size: '18" Rectangle', price: 135 }, large: { size: '25" Rectangle', price: 195 } }
  }
];

export default function FlowersPage() {
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Mobile hero wrapper for scroll indicator */}
      <div className="md:hidden relative h-screen min-h-[600px] flex items-start pt-24">
        <div className="max-w-[1600px] mx-auto px-6 w-full">
          {/* Breadcrumb */}
          <div className="py-6 text-sm text-[#6b6b6b]">
            <Link href="/miami-yacht-charter-add-ons" className="hover:text-[#c4a265]">Add Ons</Link>
            <span className="mx-2">/</span>
            <span>Flowers</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="rule-gold w-16" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
                Botanical Elegance
              </span>
            </div>
            
            <h1 className="editorial-display text-5xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
              Floral <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Arrangements</span>
            </h1>
            
            <p className="text-[#6b6b6b] text-lg max-w-3xl mb-8" style={{ fontWeight: 300, lineHeight: 1.6 }}>
              Bespoke floral designs that transform your yacht into a floating garden. 
              Each arrangement hand selected for beauty, fragrance, and lasting elegance.
            </p>

            {/* Info Note */}
            <div className="inline-flex items-center gap-3 bg-white border border-[#c4a265]/20 px-6 py-3">
              <svg className="w-5 h-5 text-[#c4a265]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-[#6b6b6b]">Each arrangement has unique sizing - sizes shown per arrangement below</span>
            </div>
          </div>
        </div>
        
        <ScrollIndicator dark />
      </div>

      {/* Desktop header (non-hero) */}
      <div className="hidden md:block pt-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-20">
          {/* Breadcrumb */}
          <div className="py-6 text-sm text-[#6b6b6b]">
            <Link href="/miami-yacht-charter-add-ons" className="hover:text-[#c4a265]">Add Ons</Link>
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
              Each arrangement hand selected for beauty, fragrance, and lasting elegance.
            </p>

            {/* Info Note */}
            <div className="inline-flex items-center gap-3 bg-white border border-[#c4a265]/20 px-6 py-3">
              <svg className="w-5 h-5 text-[#c4a265]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-[#6b6b6b]">Each arrangement has unique sizing - sizes shown per arrangement below</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {flowerProducts.map((product) => {
            const availableSizes = Object.keys(product.sizes);
            const defaultSize = availableSizes.includes('medium') ? 'medium' : availableSizes[0];
            const selectedSize = selectedSizes[product.id] || defaultSize;
            const sizeInfo = product.sizes[selectedSize as keyof typeof product.sizes];
            
            if (!sizeInfo) return null;

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
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
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
                    <div className={`grid gap-2 ${availableSizes.length === 3 ? 'grid-cols-3' : availableSizes.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`py-3 px-2 text-xs border transition-all ${
                            selectedSize === size
                              ? 'bg-[#c4a265] text-white border-[#c4a265]'
                              : 'bg-white text-[#6b6b6b] border-[#6b6b6b]/20 hover:border-[#c4a265]'
                          }`}
                        >
                          <div className="capitalize font-medium mb-1">{size}</div>
                          <div className="text-[10px] opacity-80">{(product.sizes as any)[size].size}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                        ${sizeInfo.price}
                      </span>
                      <span className="text-sm text-[#6b6b6b]">{sizeInfo.size}</span>
                    </div>
                    
                    <button
                      onClick={() => addItem({
                        id: `${product.id}-${selectedSize}`,
                        name: `${product.name} (${sizeInfo.size})`,
                        price: sizeInfo.price,
                        category: 'flowers',
                        image: product.image
                      })}
                      className="w-full bg-white border border-[#0f0f0f]/20 text-[#0f0f0f] py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300"
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
          <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-6">
            <p className="text-[#6b6b6b] text-xs leading-relaxed" style={{ fontWeight: 300 }}>
              All arrangements are created fresh to order using premium blooms. 
              Delivery to your yacht is included with every order.
            </p>
            <p className="text-[#6b6b6b]/60 text-xs leading-relaxed" style={{ fontWeight: 300 }}>
              A valid yacht charter reservation is required. 48-hour advance notice requested for optimal selection.
            </p>
          </div>
        </div>
      </div>

      <DarkFooter />
    </main>
  );
}
