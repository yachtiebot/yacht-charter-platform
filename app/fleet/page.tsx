'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PublicVessel } from '@/lib/types';

function FleetContent() {
  const searchParams = useSearchParams();
  const [vessels, setVessels] = useState<PublicVessel[]>([]);
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
    setVessels(data.vessels || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] text-slate-400 mb-8 uppercase">Curated Collection</p>
          <h1 className="text-6xl md:text-7xl mb-8 text-slate-900">
            Our Fleet
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hand selected vessels, privately owned, backed by outstanding guest reviews
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Filters */}
        <div className="mb-20 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {/* Location Filter */}
          <select
            value={filters.location_tag}
            onChange={(e) => setFilters({ ...filters, location_tag: e.target.value })}
            className="px-6 py-3 border border-slate-200 bg-white text-slate-900 text-sm uppercase tracking-wider focus:outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            <option value="Miami">Miami</option>
            <option value="Miami Beach">Miami Beach</option>
            <option value="Key Biscayne">Key Biscayne</option>
            <option value="Coconut Grove">Coconut Grove</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Fort Lauderdale">Fort Lauderdale</option>
          </select>

          {/* Length Filter */}
          <select
            value={filters.length_bucket}
            onChange={(e) => setFilters({ ...filters, length_bucket: e.target.value })}
            className="px-6 py-3 border border-slate-200 bg-white text-slate-900 text-sm uppercase tracking-wider focus:outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Sizes</option>
            <option value="20-40 ft">20-40 ft</option>
            <option value="40-60 ft">40-60 ft</option>
            <option value="60-80 ft">60-80 ft</option>
            <option value="80-100 ft">80-100 ft</option>
            <option value="100+ ft">100+ ft</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-6 py-3 border border-slate-200 bg-white text-slate-900 text-sm uppercase tracking-wider focus:outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer"
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
          <div className="text-center py-32 text-slate-400">Loading...</div>
        ) : vessels.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-slate-600 text-lg mb-6">
              No vessels found matching your criteria.
            </p>
            <button
              onClick={() => setFilters({ location_tag: '', length_bucket: '', category: '' })}
              className="text-slate-900 underline text-sm uppercase tracking-wider"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-16 text-slate-500 text-sm uppercase tracking-wider">
              {vessels.length} vessel{vessels.length !== 1 ? 's' : ''} available
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {vessels.map((vessel) => (
                <Link
                  key={vessel.id}
                  href={`/fleet/${vessel.public_code}`}
                  className="group"
                >
                  <div className="bg-white overflow-hidden">
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden mb-6">
                      {vessel.hero_image_url ? (
                        <img
                          src={vessel.hero_image_url}
                          alt={`${vessel.length_ft}ft ${vessel.make}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
                          Image coming soon
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-3xl mb-3 text-slate-900 group-hover:text-slate-600 transition-colors">
                        {vessel.length_ft}ft {vessel.make}
                      </h3>
                      <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider">
                        {vessel.category} · {vessel.location_tag}
                      </p>

                      {vessel.capacity_guests && (
                        <div className="text-sm text-slate-600">
                          Up to {vessel.capacity_guests} guests
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function FleetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-16 flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <FleetContent />
    </Suspense>
  );
}
