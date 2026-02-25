'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import CollapsibleFleetFilters from '@/components/CollapsibleFleetFilters';

interface YachtData {
  id: string;
  fields: {
    'Yacht ID': string;
    'Boat Name': string;
    'Boat Type': string;
    'Boat Style': string;
    'Length in Feet': number;
    'Maximum Passengers': number;
    'Main Departure Location': string;
    'Short Description': string;
    '2-Hour Price': number;
    '4-Hour Price': number;
    'toys'?: string[];  // New: Inflatables, Floating Island Mat, Waterslide, Jet Ski, SeaBob
    'amenities'?: string[];  // New: Tender, Air-conditioning, Jacuzzi, Wi-Fi, Barbecue Grill, Wet Bar, Kitchen
    'features'?: string[];  // New: To be populated
    'Toy Available On Request'?: string[];  // Legacy field
    'New To Fleet Badge'?: boolean;
    'Offers Weekday Discount'?: boolean;
    'Instant Booking Enabled'?: boolean;
    'Has Inflatable Toys'?: boolean;  // Legacy field
    'Photo Attachments'?: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
}

function FleetContent() {
  const [yachts, setYachts] = useState<YachtData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedToys, setSelectedToys] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedYachtType, setSelectedYachtType] = useState('');
  const [instantBookableOnly, setInstantBookableOnly] = useState(false);
  const [weekdayDiscountOnly, setWeekdayDiscountOnly] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 2000]);

  useEffect(() => {
    const fetchYachts = async () => {
      try {
        const response = await fetch('/api/yachts');
        const data = await response.json();
        const yachtData = data.yachts || [];
        setYachts(yachtData);
        
        // Calculate min/max prices from yacht data (using 2-Hour Price as starting price)
        if (yachtData.length > 0) {
          const prices = yachtData
            .map((y: YachtData) => y.fields['2-Hour Price'] || 0)
            .filter((p: number) => p > 0);
          if (prices.length > 0) {
            const min = Math.floor(Math.min(...prices) / 100) * 100;
            const max = Math.ceil(Math.max(...prices) / 100) * 100;
            setSelectedPriceRange([min, max]);
          }
        }
      } catch (error) {
        console.error('Error fetching yachts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYachts();
  }, []);

  const handleToyToggle = (toy: string) => {
    setSelectedToys(prev => 
      prev.includes(toy) 
        ? prev.filter(t => t !== toy)
        : [...prev, toy]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedSize('');
    setSelectedLocation('');
    setSelectedToys([]);
    setSelectedAmenities([]);
    setSelectedYachtType('');
    setInstantBookableOnly(false);
    setWeekdayDiscountOnly(false);
    // Reset price range to full range (using 2-Hour Price)
    if (yachts.length > 0) {
      const prices = yachts
        .map((y) => y.fields['2-Hour Price'] || 0)
        .filter((p) => p > 0);
      if (prices.length > 0) {
        const min = Math.floor(Math.min(...prices) / 100) * 100;
        const max = Math.ceil(Math.max(...prices) / 100) * 100;
        setSelectedPriceRange([min, max]);
      }
    }
  };

  // Calculate min/max prices from all yachts (using 2-Hour Price as starting price)
  const minPrice = yachts.length > 0 
    ? Math.floor(Math.min(...yachts.map(y => y.fields['2-Hour Price'] || 0).filter(p => p > 0)) / 100) * 100
    : 0;
  const maxPrice = yachts.length > 0
    ? Math.ceil(Math.max(...yachts.map(y => y.fields['2-Hour Price'] || 0).filter(p => p > 0)) / 100) * 100
    : 2000;

  // Filter yachts
  const filteredYachts = yachts.filter(yacht => {
    // Category filter
    if (selectedCategory !== 'all' && yacht.fields['Boat Type'].toLowerCase() !== selectedCategory) return false;
    
    // Size filter
    if (selectedSize) {
      const size = yacht.fields['Length in Feet'];
      if (selectedSize === '20-40 ft' && (size < 20 || size >= 40)) return false;
      if (selectedSize === '40-60 ft' && (size < 40 || size >= 60)) return false;
      if (selectedSize === '60-80 ft' && (size < 60 || size >= 80)) return false;
      if (selectedSize === '80-100 ft' && (size < 80 || size >= 100)) return false;
      if (selectedSize === '100+ ft' && size < 100) return false;
    }
    
    // Location filter
    if (selectedLocation && yacht.fields['Main Departure Location'] !== selectedLocation) return false;
    
    // Yacht type filter (NEW) - using Boat Style field
    if (selectedYachtType) {
      const boatStyle = yacht.fields['Boat Style']?.toLowerCase() || '';
      if (!boatStyle.includes(selectedYachtType.toLowerCase())) return false;
    }
    
    // Price filter (using 2-Hour Price as starting price)
    const price = yacht.fields['2-Hour Price'] || 0;
    if (price < selectedPriceRange[0] || price > selectedPriceRange[1]) return false;
    
    // Water Toys filter (uses toys: array field)
    if (selectedToys.length > 0) {
      const yachtToys = yacht.fields['toys'] || [];
      const hasAllToys = selectedToys.every(toy => yachtToys.includes(toy));
      if (!hasAllToys) return false;
    }

    // Onboard Amenities filter (uses amenities: array field)
    if (selectedAmenities.length > 0) {
      const yachtAmenities = yacht.fields['amenities'] || [];
      const hasAllAmenities = selectedAmenities.every(amenity => yachtAmenities.includes(amenity));
      if (!hasAllAmenities) return false;
    }
    
    // Instant bookable filter
    if (instantBookableOnly && !yacht.fields['Instant Booking Enabled']) return false;
    
    // Weekday discount filter (NEW)
    if (weekdayDiscountOnly && !yacht.fields['Offers Weekday Discount']) return false;
    
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center pt-24">
        <div className="text-[#6b6b6b]">Loading fleet...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="h-screen min-h-[700px] relative flex items-end pt-24">
        <div className="absolute inset-0">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/fleet/Miami_Yachting_Company_fleet_hero_luxury_superyacht-mobile.jpg"
            />
            <img
              src="/images/fleet/Miami_Yachting_Company_fleet_hero_luxury_superyacht.jpg"
              alt="Miami Yachting Company luxury superyacht fleet in Miami"
              className="w-full h-full object-cover"
              width="2000"
              height="1498"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-32">
          <div className="max-w-3xl">
            <div className="rule-gold" />
            <h1 className="editorial-display text-white mb-6" style={{ fontWeight: 300, fontSize: '45px' }}>
              The <span className="text-[#c4a265]" style={{textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)'}}>Fleet</span>
            </h1>
            <p className="text-white/70 text-lg" style={{ fontWeight: 300 }}>
              Miami Yachting Company specializes in curated yacht rentals and luxury charters. Every vessel is privately owned, hand-picked for quality, and backed by outstanding guest reviews.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</div>
          <div className="w-[1px] h-6 bg-white/30" />
        </div>
      </section>

      {/* Filters & Fleet */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Collapsible Fleet Filters */}
          <CollapsibleFleetFilters
            selectedCategory={selectedCategory}
            selectedSize={selectedSize}
            selectedLocation={selectedLocation}
            selectedToys={selectedToys}
            selectedAmenities={selectedAmenities}
            selectedYachtType={selectedYachtType}
            selectedPriceRange={selectedPriceRange}
            instantBookableOnly={instantBookableOnly}
            weekdayDiscountOnly={weekdayDiscountOnly}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={setSelectedCategory}
            onSizeChange={setSelectedSize}
            onLocationChange={setSelectedLocation}
            onToyToggle={handleToyToggle}
            onAmenityToggle={handleAmenityToggle}
            onYachtTypeChange={setSelectedYachtType}
            onPriceRangeChange={setSelectedPriceRange}
            onInstantBookableToggle={() => setInstantBookableOnly(!instantBookableOnly)}
            onWeekdayDiscountToggle={() => setWeekdayDiscountOnly(!weekdayDiscountOnly)}
            onClearAll={handleClearAll}
          />

          {/* Result Count */}
          <p className="text-[#6b6b6b] mt-8 mb-12">
            {filteredYachts.length} yacht{filteredYachts.length !== 1 ? 's' : ''} available
          </p>

          {/* Yacht Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredYachts.map((yacht) => {
              const yachtSlug = yacht.fields['Yacht ID'].toLowerCase();
              const heroImage = yacht.fields['Photo Attachments']?.[0]?.url || `https://yacht-charter-platform-mu.vercel.app/images/yachts/${yachtSlug}/photo-01.webp`;
              const lowestPrice = yacht.fields['2-Hour Price'];
              const isNew = yacht.fields['New To Fleet Badge'];
              const hasWeekdayDeal = yacht.fields['Offers Weekday Discount'];
              
              return (
                <Link
                  key={yacht.id}
                  href={`/yacht-rental-miami/${yachtSlug}`}
                  className="group relative aspect-[4/3] overflow-hidden transition-opacity duration-300"
                >
                  {/* Photo Background */}
                  <img
                    src={heroImage}
                    alt={yacht.fields['Boat Name']}
                    className="img-zoom w-full h-full object-cover absolute inset-0"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
                  
                  {/* Badges - Top Left */}
                  {(isNew || hasWeekdayDeal) && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {isNew && (
                        <div className="bg-[#c4a265]/50 backdrop-blur-sm px-2.5 py-1 md:px-4 md:py-2">
                          <div className="text-white text-[9px] md:text-[11px] uppercase tracking-wider font-medium">NEW TO FLEET</div>
                        </div>
                      )}
                      {hasWeekdayDeal && (
                        <div className="bg-[#c4a265]/50 backdrop-blur-sm px-2.5 py-1 md:px-4 md:py-2">
                          <div className="text-white text-[9px] md:text-[11px] uppercase tracking-wider font-medium">WEEKDAY DEAL</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Price Badge - Top Right */}
                  <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2">
                    <div className="text-[#0f0f0f] text-[10px] md:text-[12px] uppercase tracking-wider font-medium">
                      From ${lowestPrice}
                    </div>
                  </div>
                  
                  {/* Content - Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    {/* Gold Passenger Count Label - very tight spacing on mobile */}
                    <div className="text-[#c4a265] mb-1 uppercase text-xs tracking-wide md:tracking-wider font-medium">
                      Up to {yacht.fields['Maximum Passengers']} Guests
                    </div>
                    
                    {/* Yacht Name */}
                    <h3 className="editorial-card-name text-white mb-2">
                      {yacht.fields['Boat Name']}
                    </h3>
                    
                    {/* View Details / Book Instantly Link */}
                    {yacht.fields['Instant Booking Enabled'] ? (
                      <div className="inline-flex items-center gap-2 editorial-label bg-white/10 backdrop-blur-sm px-4 py-2 text-white group-hover:bg-white/20 transition-all duration-300">
                        <span>Book Instantly</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 editorial-label text-white/70 group-hover:text-white transition-colors">
                        <span>View Details</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=2400&q=90"
            alt="Get on the water"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center w-full">
          <div className="rule-gold mx-auto" />
          <h2 className="editorial-headline text-white mb-6 max-w-3xl mx-auto">
            Not Sure Which Yacht?
          </h2>
          <p className="editorial-body text-white/90 mb-10 max-w-2xl mx-auto" style={{fontWeight: 400}}>
            Let us help find you the perfect vessel.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-2xl mx-auto">
            <a
              href="tel:18007479585"
              className="editorial-label bg-white/25 backdrop-blur-lg text-white px-8 py-4 hover:bg-[#c4a265] transition-all duration-500 flex-1 text-center border border-white/30"
            >
              1 800 747 9585
            </a>
            <a
              href="https://wa.me/18007479585"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-label bg-white/25 backdrop-blur-lg text-white px-8 py-4 hover:bg-[#c4a265] transition-all duration-500 flex-1 text-center flex items-center justify-center gap-2 border border-white/30"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="editorial-label bg-white/25 backdrop-blur-lg text-white px-8 py-4 hover:bg-[#c4a265] transition-all duration-500 flex-1 text-center border border-white/30"
            >
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f]" style={{ paddingTop: '56px', paddingBottom: '32px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <img 
                src="/images/myc-logo.png" 
                alt="Miami Yachting Company"
                className="h-20 w-20 mb-4"
              />
              <p className="text-white/40 text-sm mb-6">
                A curated fleet of privately owned vessels for Miami yacht charters.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://wa.me/message/T7LESNSS34RWJ1" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Charter */}
            <div>
              <div className="editorial-label text-[#c4a265] mb-6">Charter</div>
              <div className="space-y-3">
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm">Day Boats</Link>
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm">Luxury Yachts</Link>
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm">Superyachts</Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="editorial-label text-[#c4a265] mb-6">Company</div>
              <div className="space-y-3">
                <Link href="/about" className="block text-white/40 hover:text-white transition-colors text-sm">About</Link>
                <Link href="/locations" className="block text-white/40 hover:text-white transition-colors text-sm">Locations</Link>
                <Link href="/contact" className="block text-white/40 hover:text-white transition-colors text-sm">Contact</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="editorial-label text-[#c4a265] mb-6">Contact</div>
              <div className="space-y-3">
                <a href="tel:18007479585" className="block text-white/40 hover:text-white transition-colors text-sm">1 800 747 9585</a>
                <a href="mailto:team@miamiyachting.com" className="block text-white/40 hover:text-white transition-colors text-sm">team@miamiyachting.com</a>
                <div className="text-white/40 text-sm">Miami, Florida</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-wrap justify-between items-center gap-4">
            <div className="text-white/40 text-sm">
              © 2026 Miami Yachting Company®. All rights reserved.
            </div>
            <div className="editorial-label text-[#c4a265] text-[10px]">
              Best Boat Charter · Readers' Choice Award
            </div>
          </div>
        </div>
      </footer>
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
