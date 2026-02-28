'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';
import ProductImageGallery from '@/components/ProductImageGallery';
import DarkFooter from '@/components/DarkFooter';

export default function WaterToysPage() {
  const [waterToysProducts, setWaterToysProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch products from Airtable via API
  useEffect(() => {
    fetch('/api/water-toys')
      .then(res => res.json())
      .then(data => {
        setWaterToysProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load water toys:', err);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#0f0f0f]">Loading water toys...</p>
      </div>
    );
  }

// Main component rendering - using data from Airtable
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">
        {/* Breadcrumb */}
        <div className="py-6 text-sm text-[#6b6b6b]">
          <Link href="/miami-yacht-charter-add-ons" className="hover:text-[#c4a265]">Add Ons</Link>
          <span className="mx-2">/</span>
          <span>Water Toys</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div className="rule-gold w-16" />
            <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
              Aquatic Adventures
            </span>
          </div>
          
          <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Water <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Toys</span>
          </h1>
          
          <p className="text-[#6b6b6b] text-lg md:text-xl max-w-3xl" style={{ fontWeight: 300, lineHeight: 1.6 }}>
            Premium water sports equipment and floating luxury for the ultimate ocean experience. 
            From thrilling jet skis to serene floating lounges.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border border-[#0f0f0f]/10 p-6 mb-16">
          <p className="text-[#6b6b6b] text-sm" style={{ fontWeight: 300 }}>
            <strong className="text-[#0f0f0f] font-medium">Note:</strong> Some water toys may require 48 hours advance notice. 
            Items provided by independent vendors and subject to availability.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {waterToysProducts.map((product) => {
            // Handle products with size selectors
            if (product.sizes) {
              const availableSizes = Object.keys(product.sizes);
              const defaultSize = availableSizes[0];
              const selectedSize = selectedSizes[product.id] || defaultSize;
              const sizeInfo = product.sizes[selectedSize as keyof typeof product.sizes];
              
              if (!sizeInfo) return null;

              return (
                <div 
                  key={product.id} 
                  className="bg-white group hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image Gallery */}
                  <ProductImageGallery 
                    images={product.images} 
                    productName={product.name}
                    aspectRatio="wide"
                  />
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                      {product.name}
                    </h3>
                    
                    <p className="text-[#6b6b6b] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                      {product.description}
                    </p>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature: string, idx: number) => (
                          <span key={idx} className="text-xs text-[#6b6b6b] border border-[#6b6b6b]/20 px-3 py-1">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Size Selector */}
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-wider text-[#6b6b6b]">Select Duration</label>
                      <div className={`grid gap-2 ${availableSizes.length === 3 ? 'grid-cols-3' : availableSizes.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {availableSizes.map((size) => {
                          const info = (product.sizes as any)[size];
                          return (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`py-3 px-2 text-xs border transition-all ${
                                selectedSize === size
                                  ? 'bg-[#c4a265] text-white border-[#c4a265]'
                                  : 'bg-white text-[#6b6b6b] border-[#6b6b6b]/20 hover:border-[#c4a265]'
                              }`}
                            >
                              <div className="font-medium mb-1">{info.duration || info.option}</div>
                              <div className="text-[10px] opacity-80">${info.price}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Details */}
                    <p className="text-xs text-[#6b6b6b]/80" style={{ fontWeight: 300 }}>
                      {product.details}
                    </p>

                    {/* Price & CTA */}
                    <div className="pt-4 space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                          ${sizeInfo.price}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => addItem({
                          id: `${product.id}-${selectedSize}`,
                          name: `${product.name} (${(sizeInfo as any).duration || (sizeInfo as any).option})`,
                          price: sizeInfo.price,
                          category: product.id === 'jet-ski' ? 'jet-ski' : 'water-toys',
                          image: product.images[0]
                        })}
                        className="w-full bg-white border border-[#0f0f0f]/20 text-[#0f0f0f] py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Handle regular products without size selectors
            return (
              <div 
                key={product.id} 
                className="bg-white group hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Gallery with Badge */}
                <div className="relative">
                  <ProductImageGallery 
                    images={product.images} 
                    productName={product.name}
                    aspectRatio="wide"
                  />
                  
                  {/* Badges */}
                  {product.depositPrice && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#c4a265] text-white px-3 py-1 text-xs uppercase tracking-wider">
                        ${product.depositPrice} Down
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                    {product.name}
                  </h3>
                  
                  <p className="text-[#6b6b6b] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature: string, idx: number) => (
                        <span key={idx} className="text-xs text-[#6b6b6b] border border-[#6b6b6b]/20 px-3 py-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Details */}
                  <p className="text-xs text-[#6b6b6b]/80" style={{ fontWeight: 300 }}>
                    {product.details}
                  </p>

                  {/* License Link for Jet Ski */}
                  {(product as any).licenseLink && (
                    <a 
                      href={(product as any).licenseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-[#c4a265] hover:text-[#0f0f0f] underline transition-colors"
                    >
                      Get your license to drive here →
                    </a>
                  )}

                  {/* Price & CTA */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                        ${product.depositPrice || product.price}
                      </span>
                    </div>
                    {product.depositPrice && (
                      <p className="text-xs text-[#6b6b6b]">+${product.price - product.depositPrice} due to vendor</p>
                    )}
                    
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.depositPrice || product.price,
                        category: product.id === 'jet-ski' ? 'jet-ski' : 'water-toys',
                        maxQuantity: product.maxQuantity,
                        minQuantity: product.minQuantity,
                        image: product.images[0]
                      })}
                      className="w-full bg-white border border-[#0f0f0f]/20 text-[#0f0f0f] py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300"
                    >
                      {product.depositPrice ? 'Reserve Now' : 'Add to Cart'}
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
              All water toys are provided by licensed, insured third-party vendors. 
              A valid yacht charter reservation is required for all bookings.
            </p>
            
            <p className="text-[#6b6b6b]/60 text-xs leading-relaxed" style={{ fontWeight: 300 }}>
              Yacht charter add-ons in Miami provide additional options for guests seeking water-based activities during their time on board. 
              Available add-ons may include inflatable water toys, floating platforms, or other recreational equipment depending on the vessel and location. 
              Listings shown on this page represent optional features offered by independent third-party providers or made available in connection with specific vessels. 
              Availability is subject to vessel compatibility, operating conditions, and charter duration. 
              Add-ons are selected and arranged separately and may vary by provider. 
              This page presents add-on options associated with yacht rentals operating throughout Miami and Miami Beach. 
              Specific details should be reviewed on each vessel listing to understand what may be available for a given charter.
            </p>
          </div>
        </div>
      </div>

      <DarkFooter />
    </main>
  );
}
