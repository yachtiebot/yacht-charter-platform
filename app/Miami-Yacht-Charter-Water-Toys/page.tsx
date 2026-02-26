'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';

// Water toys products from scraped data
const waterToysProducts = [
  {
    id: 'seabob',
    name: 'Seabob',
    price: 499,
    depositPrice: 99,
    description: 'Ride on the surface or emerge under water with these luxury underwater jet skis. Easy to ride for young and old. Recommended age is 12+.',
    details: 'Comes fully charged, batteries last 1-2 hours. Charger included. 48 hours notice required. Vendor collects remaining $400 balance prior to rental date.',
    image: '/images/products/water-toys/seabob.jpg',
    maxQuantity: 2,
    requiresWaiver: true,
    features: ['Age 12+', 'Fully charged', '1-2 hour battery', 'Max 2 per charter']
  },
  {
    id: 'flitescooter',
    name: 'Flitescooter',
    price: 499,
    depositPrice: 99,
    description: 'Enhance your yacht charter experience with a Flitescooter board! Electric hydrofoil surfboard for an unforgettable water experience.',
    details: 'Instructor available upon request for additional charge. Comes fully charged, batteries last 1-2 hours. Max load 225lbs. 48 hours notice required.',
    image: '/images/products/water-toys/flitescooter.jpg',
    maxQuantity: 1,
    requiresWaiver: true,
    features: ['Max load 225lbs', 'Instructor available', '1-2 hour battery', 'Max 1 per charter']
  },
  {
    id: 'water-sports-boat',
    name: 'Water Sports Boat',
    price: 600,
    pricePerHour: 300,
    description: 'Dedicated watersports boat with wakeboarding, water skiing, and tubing. Accommodates up to six guests.',
    details: '$300 per hour with 2 hour minimum. Operated independently by professional vendor. Activities subject to provider requirements.',
    image: '/images/products/water-toys/watersports-boat.jpg',
    requiresWaiver: true,
    features: ['Up to 6 guests', 'Wakeboarding', 'Water skiing', 'Tubing', '2 hour minimum']
  },
  {
    id: 'floating-cabana',
    name: 'Floating Cabana',
    price: 349,
    description: 'Spacious floating oasis with plush seating and ample space for sunbathing, drinks, and dining.',
    details: 'Perfect for groups. Anchored behind your yacht. Stable and safe design. 48 hours notice required.',
    image: '/images/products/water-toys/floating-cabana.jpg',
    features: ['Plush seating', 'Sunbathing space', 'Stable design', 'Multiple available']
  },
  {
    id: 'floating-lounge-chair',
    name: 'Floating Lounge Chair',
    price: 198,
    pricePerChair: 99,
    description: 'Luxurious floating lounge chairs designed for ultimate relaxation on the water.',
    details: 'Each chair is $99. Two chair minimum for delivery and setup. 48 hours notice required.',
    image: '/images/products/water-toys/lounge-chair.jpg',
    minQuantity: 2,
    features: ['$99 per chair', '2 chair minimum', 'Premium comfort', 'Perfect for groups']
  },
  {
    id: 'jet-ski',
    name: 'Jet Ski Rental',
    price: 399,
    description: 'High-performance jet ski for thrilling water adventures.',
    details: 'Professional instruction available. Must be 18+ to operate. Valid ID required. 48 hours notice.',
    image: '/images/products/water-toys/jet-ski.jpg',
    maxQuantity: 2,
    requiresWaiver: true,
    features: ['Age 18+ to operate', 'Instruction available', 'High performance', 'Max 2 per charter']
  },
  {
    id: 'flyboard',
    name: 'Flyboard Experience',
    price: 499,
    description: 'Fly above the water with this incredible water-powered jetpack experience.',
    details: 'Includes instructor and all equipment. Session duration 30-45 minutes. Prior experience not required.',
    image: '/images/products/water-toys/flyboard.jpg',
    requiresWaiver: true,
    features: ['Instructor included', '30-45 min session', 'No experience needed', 'All equipment provided']
  }
];

export default function WaterToysPage() {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">
        {/* Breadcrumb */}
        <div className="py-6 text-sm text-[#6b6b6b]">
          <Link href="/Miami-Yacht-Charter-Add-Ons" className="hover:text-[#c4a265]">Add-Ons</Link>
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
            From high-performance jet skis to serene floating lounges.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border-l-2 border-[#c4a265] p-6 mb-16">
          <p className="text-[#6b6b6b] text-sm mb-3" style={{ fontWeight: 300 }}>
            <strong className="text-[#0f0f0f] font-medium">Liability waiver required:</strong> Water sports equipment (Seabob, Flitescooter, Jet Ski, Flyboard, Water Sports Boat) requires a signed waiver before checkout.
          </p>
          <p className="text-[#6b6b6b] text-sm" style={{ fontWeight: 300 }}>
            <strong className="text-[#0f0f0f] font-medium">Advance notice:</strong> All water toys require 48 hours advance reservation. 
            Items provided by independent vendors and subject to availability.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {waterToysProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white group hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-[#f0ece6] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0ece6" width="400" height="300"/%3E%3C/svg%3E';
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.requiresWaiver && (
                    <span className="bg-[#0f0f0f] text-white px-3 py-1 text-xs uppercase tracking-wider">
                      Waiver Required
                    </span>
                  )}
                  {product.depositPrice && (
                    <span className="bg-[#c4a265] text-white px-3 py-1 text-xs uppercase tracking-wider block">
                      ${product.depositPrice} Deposit
                    </span>
                  )}
                </div>
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
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <span key={idx} className="text-xs text-[#6b6b6b] border border-[#6b6b6b]/20 px-3 py-1">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <p className="text-xs text-[#6b6b6b]/80" style={{ fontWeight: 300 }}>
                  {product.details}
                </p>

                {/* Price & CTA */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                      ${product.price}
                    </span>
                    {product.pricePerHour && (
                      <span className="text-sm text-[#6b6b6b]">/ ${product.pricePerHour} per hour</span>
                    )}
                    {product.depositPrice && (
                      <span className="text-sm text-[#6b6b6b]">+ ${product.price - product.depositPrice} at pickup</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.depositPrice || product.price,
                      category: 'water-toys',
                      maxQuantity: product.maxQuantity,
                      minQuantity: product.minQuantity,
                      image: product.image
                    })}
                    className="w-full bg-[#0f0f0f] text-white py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] transition-all duration-300"
                  >
                    {product.depositPrice ? 'Reserve Now' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="border-t border-[#c4a265]/20 pt-16 pb-32 text-center">
          <p className="text-[#6b6b6b] text-sm max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            All water toys are provided by licensed, insured third-party vendors. 
            A valid yacht charter reservation is required for all bookings.
          </p>
        </div>
      </div>
    </main>
  );
}
