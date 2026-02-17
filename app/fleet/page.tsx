'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PublicVessel } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

function FleetContent() {
  const searchParams = useSearchParams();
  const [vessels, setVessels] = useState<PublicVessel[]>([]);
  const [vesselPricing, setVesselPricing] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location_tag: searchParams.get('location') || '',
    length_bucket: searchParams.get('length_bucket') || '',
    category: searchParams.get('category') || '',
  });

  useEffect(() => {
    fetchVessels();
  }, [filters]);

  const fetchVessels = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.location_tag) params.append('location_tag', filters.location_tag);
    if (filters.length_bucket) params.append('length_bucket', filters.length_bucket);
    if (filters.category) params.append('category', filters.category);

    const response = await fetch(`/api/public/vessels?${params.toString()}`);
    const data = await response.json();
    const fetchedVessels = data.vessels || [];
    setVessels(fetchedVessels);
    
    // Fetch pricing for each vessel
    const pricingData: Record<string, any> = {};
    for (const vessel of fetchedVessels) {
      try {
        const res = await fetch(`/api/public/vessels/${vessel.public_code}`);
        const vesselData = await res.json();
        if (vesselData.pricing) {
          pricingData[vessel.id] = vesselData.pricing;
        }
      } catch (e) {
        // Skip if pricing fails
      }
    }
    setVesselPricing(pricingData);
    setLoading(false);
  };

  const getLowestPrice = (vesselId: string) => {
    const pricing = vesselPricing[vesselId];
    if (!pricing?.base_rates) return null;
    const prices = Object.values(pricing.base_rates) as number[];
    return Math.min(...prices);
  };

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Hero Section */}
      <section className="h-screen min-h-[700px] relative flex items-end pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <div className="max-w-3xl">
            <div className="w-[60px] h-[1px] bg-[#c4a265] mb-6" />
            <h1 className="editorial-display text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-6">
              Our <span className="text-[#c4a265]">Fleet</span>
            </h1>
            <p className="text-white/70 text-lg">
              Hand selected vessels, privately owned, backed by outstanding guest reviews. Each yacht personally vetted for quality and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Fleet */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Page Header */}
          <div className="mb-20">
            <div className="w-[60px] h-[1px] bg-[#c4a265] mb-6" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <h2 className="editorial-display text-4xl md:text-5xl text-[#0f0f0f]">
                The Fleet
              </h2>
              <p className="text-[#6b6b6b] max-w-2xl">
                {vessels.length > 0 && `${vessels.length} vessel${vessels.length !== 1 ? 's' : ''} available · `}
                Each privately owned, hand-picked for quality, and backed by outstanding guest reviews.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-16">
            <select
              value={filters.location_tag}
              onChange={(e) => setFilters({ ...filters, location_tag: e.target.value })}
              className="editorial-label px-6 py-3 border border-black/10 bg-white text-[#0f0f0f] focus:border-[#4e7483] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Locations</option>
              <option value="Miami">Miami</option>
              <option value="Miami Beach">Miami Beach</option>
              <option value="Key Biscayne">Key Biscayne</option>
              <option value="Coconut Grove">Coconut Grove</option>
              <option value="Hollywood">Hollywood</option>
              <option value="Fort Lauderdale">Fort Lauderdale</option>
            </select>

            <select
              value={filters.length_bucket}
              onChange={(e) => setFilters({ ...filters, length_bucket: e.target.value })}
              className="editorial-label px-6 py-3 border border-black/10 bg-white text-[#0f0f0f] focus:border-[#4e7483] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Sizes</option>
              <option value="20-40 ft">20-40 ft</option>
              <option value="40-60 ft">40-60 ft</option>
              <option value="60-80 ft">60-80 ft</option>
              <option value="80-100 ft">80-100 ft</option>
              <option value="100+ ft">100+ ft</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="editorial-label px-6 py-3 border border-black/10 bg-white text-[#0f0f0f] focus:border-[#4e7483] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="day boat">Day Boat</option>
              <option value="luxury yacht">Luxury Yacht</option>
              <option value="super yacht">Super Yacht</option>
              <option value="event vessels">Event Vessels</option>
            </select>
          </div>

          {/* Vessels Grid */}
          {loading ? (
            <div className="text-center py-32 text-[#6b6b6b]">Loading vessels...</div>
          ) : vessels.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-[60px] h-[1px] bg-[#c4a265] mx-auto mb-6" />
              <p className="editorial-display text-3xl text-[#0f0f0f] mb-6">
                No vessels found
              </p>
              <p className="text-[#6b6b6b] mb-8">
                Try adjusting your filters or browse all vessels.
              </p>
              <button
                onClick={() => setFilters({ location_tag: '', length_bucket: '', category: '' })}
                className="editorial-label text-[#c4a265] hover:text-[#4e7483] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vessels.map((vessel) => {
                const lowestPrice = getLowestPrice(vessel.id);
                
                return (
                  <Link
                    key={vessel.id}
                    href={`/fleet/${vessel.public_code}`}
                    className="group relative aspect-[4/3] overflow-hidden"
                  >
                    {/* Photo Background */}
                    {vessel.hero_image_url ? (
                      <img
                        src={vessel.hero_image_url}
                        alt={`${vessel.length_ft}ft ${vessel.make}`}
                        className="img-editorial w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 absolute inset-0" />
                    )}
                    
                    {/* Stronger Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
                    
                    {/* Price Badge - Top Right */}
                    {lowestPrice && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2">
                        <div className="editorial-label text-[#0f0f0f]">
                          From {formatCurrency(lowestPrice)}
                        </div>
                      </div>
                    )}
                    
                    {/* Content - Bottom Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      {/* Gold Category Label */}
                      <div className="editorial-label text-[#c4a265] mb-3">
                        {vessel.category} · Up to {vessel.capacity_guests || 0} Guests
                      </div>
                      
                      {/* Yacht Name - Large Serif */}
                      <h3 className="editorial-display text-3xl md:text-4xl text-white mb-3">
                        {vessel.length_ft}ft {vessel.make}
                      </h3>
                      
                      {/* Description - 2 line clamp */}
                      {vessel.public_description && (
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                          {vessel.public_description}
                        </p>
                      )}
                      
                      {/* Inquire Now Link */}
                      <div className="flex items-center gap-2 editorial-label text-white/70 group-hover:text-white transition-colors">
                        <span>Inquire Now</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
        <div className="absolute inset-0 bg-[#0f0f0f]/75" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <div className="w-[60px] h-[1px] bg-[#c4a265] mx-auto mb-6" />
          <h2 className="editorial-display text-4xl md:text-6xl text-white mb-6 max-w-3xl mx-auto">
            Can't Find What You're <span className="text-[#c4a265]">Looking For?</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto">
            Our team can help match you with the perfect vessel for your occasion.
          </p>
          <Link
            href="/contact"
            className="editorial-label bg-white text-[#0f0f0f] px-10 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500 inline-block"
          >
            Contact Us
          </Link>
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
