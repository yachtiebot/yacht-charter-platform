'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import FleetFilters from '@/components/FleetFilters';

// Yacht data
const yachtData = [
  {
    id: 'pershing-70',
    name: '70ft Pershing',
    category: 'super yacht',
    guests: 12,
    price: 320000,
    size: '60-80 ft',
    location: 'Miami Beach',
    toys: ['jacuzzi', 'jet-ski'],
    instant_booking: false,
    description: 'High-performance luxury yacht with sleek Italian design. Features spacious deck areas, premium amenities, and thrilling speed capabilities.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=90'
  },
  {
    id: 'sunseeker-68',
    name: '68ft Sunseeker',
    category: 'luxury yacht',
    guests: 12,
    price: 280000,
    size: '60-80 ft',
    location: 'Miami Beach',
    toys: ['jacuzzi', 'seabob'],
    instant_booking: false,
    description: 'Elegant 68-foot Sunseeker featuring a spacious flybridge, luxurious accommodations, and premium water toys.',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=90'
  },
  {
    id: 'azimut-55',
    name: '55ft Azimut',
    category: 'luxury yacht',
    guests: 13,
    price: 125000,
    size: '40-60 ft',
    location: 'Key Biscayne',
    toys: ['jet-ski'],
    instant_booking: true,
    description: 'Refined Italian craftsmanship with generous entertaining space. Ideal for sunset cruises and celebrations.',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=90'
  },
  {
    id: 'searay-40',
    name: '40ft Sea Ray',
    category: 'day boat',
    guests: 10,
    price: 90000,
    size: '40-60 ft',
    location: 'Coconut Grove',
    toys: [],
    instant_booking: true,
    description: 'Versatile day boat perfect for sandbar hopping, sunset cruises, and casual gatherings.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90'
  },
  {
    id: 'azimut-66',
    name: '66ft Azimut',
    category: 'luxury yacht',
    guests: 13,
    price: 180000,
    size: '60-80 ft',
    location: 'Fort Lauderdale',
    toys: ['jacuzzi', 'jet-ski', 'seabob'],
    instant_booking: false,
    description: 'Spacious luxury yacht with elegant interiors, expansive flybridge, and premium sound system.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90'
  },
];

function FleetContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedToys, setSelectedToys] = useState<string[]>([]);

  const handleToyToggle = (toy: string) => {
    setSelectedToys(prev => 
      prev.includes(toy) 
        ? prev.filter(t => t !== toy)
        : [...prev, toy]
    );
  };

  // Filter yachts
  const filteredYachts = yachtData.filter(yacht => {
    // Category filter
    if (selectedCategory !== 'all' && yacht.category !== selectedCategory) return false;
    
    // Size filter
    if (selectedSize && yacht.size !== selectedSize) return false;
    
    // Location filter
    if (selectedLocation && yacht.location !== selectedLocation) return false;
    
    // Water toys filter - yacht must have ALL selected toys
    if (selectedToys.length > 0 && !selectedToys.every(toy => yacht.toys.includes(toy))) return false;
    
    return true;
  });

  return (
    <div className="bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="h-screen min-h-[700px] relative flex items-end pt-24">
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/d/14h_cYc3LmM7w4E2j7i8JVZ-dA32UPzUe"
            alt="The Fleet"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <div className="max-w-3xl">
            <div className="rule-gold" />
            <h1 className="editorial-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 font-extralight">
              The <span className="text-[#c4a265]">Fleet</span>
            </h1>
            <p className="text-white/70 text-lg">
              Miami Yachting Company specializes in curated yacht rentals and luxury charters. Every vessel is privately owned, hand-picked for quality, and backed by outstanding guest reviews.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <div className="editorial-label text-white/50 text-[10px]">Scroll</div>
          <div className="w-[1px] h-8 bg-white/30" />
        </div>
      </section>

      {/* Filters & Fleet */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Filters */}
          <FleetFilters
            selectedCategory={selectedCategory}
            selectedSize={selectedSize}
            selectedLocation={selectedLocation}
            selectedToys={selectedToys}
            onCategoryChange={setSelectedCategory}
            onSizeChange={setSelectedSize}
            onLocationChange={setSelectedLocation}
            onToyToggle={handleToyToggle}
          />

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-black/10 my-8" />

          {/* Result Count */}
          <p className="text-[#6b6b6b] mb-12">
            {filteredYachts.length} yacht{filteredYachts.length !== 1 ? 's' : ''} available
          </p>

          {/* Yacht Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredYachts.map((yacht) => (
              <Link
                key={yacht.id}
                href="/contact"
                className="group relative aspect-[4/3] overflow-hidden transition-opacity duration-300"
              >
                {/* Photo Background */}
                <img
                  src={yacht.image}
                  alt={yacht.name}
                  className="img-zoom w-full h-full object-cover absolute inset-0"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
                
                {/* Price Badge - Top Right */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2">
                  <div className="editorial-label text-[#0f0f0f]">
                    From {formatCurrency(yacht.price)}
                  </div>
                </div>
                
                {/* Content - Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Gold Category Label */}
                  <div className="editorial-label text-[#c4a265] mb-3">
                    {yacht.category} · Up to {yacht.guests} Guests
                  </div>
                  
                  {/* Yacht Name */}
                  <h3 className="editorial-display text-3xl md:text-4xl text-white mb-3">
                    {yacht.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {yacht.description}
                  </p>
                  
                  {/* Book Now / Inquire Now Link */}
                  <div className="flex items-center gap-2 editorial-label text-white/70 group-hover:text-white transition-colors">
                    <span>{yacht.instant_booking ? 'Book Now' : 'Inquire Now'}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 md:py-36">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=2400&q=90"
            alt="Get on the water"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0f0f0f]/75" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <div className="rule-gold mx-auto" />
          <h2 className="editorial-display text-4xl md:text-6xl text-white mb-6 max-w-3xl mx-auto">
            Can't Find What You're <span className="text-[#c4a265]">Looking For?</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto">
            Our team can help match you with the perfect vessel for your occasion.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:18007479585"
              className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500"
            >
              Call 1 800 747 9585
            </a>
            <Link
              href="/contact"
              className="editorial-label border border-white/30 text-white px-8 py-4 hover:bg-white/10 transition-all duration-500"
            >
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FleetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="text-[#6b6b6b]">Loading...</div>
      </div>
    }>
      <FleetContent />
    </Suspense>
  );
}
