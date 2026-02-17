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
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm tracking-widest text-slate-500 mb-4">CURATED COLLECTION</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-slate-900">
            Our Fleet
          </h1>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Hand selected vessels, privately owned, backed by outstanding guest reviews
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filters */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Location Filter */}
          <div>
            <label className="block text-xs tracking-wider text-slate-500 mb-2 uppercase">
              Location
            </label>
            <select
              value={filters.location_tag}
              onChange={(e) => setFilters({ ...filters, location_tag: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 font-light focus:outline-none focus:border-slate-900 transition-colors"
            >
              <option value="">All Locations</option>
              <option value="Miami">Miami</option>
              <option value="Miami Beach">Miami Beach</option>
              <option value="Key Biscayne">Key Biscayne</option>
              <option value="Coconut Grove">Coconut Grove</option>
              <option value="Hollywood">Hollywood</option>
              <option value="Fort Lauderdale">Fort Lauderdale</option>
            </select>
          </div>

          {/* Length Filter */}
          <div>
            <label className="block text-xs tracking-wider text-slate-500 mb-2 uppercase">
              Length
            </label>
            <select
              value={filters.length_bucket}
              onChange={(e) => setFilters({ ...filters, length_bucket: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 font-light focus:outline-none focus:border-slate-900 transition-colors"
            >
              <option value="">All Sizes</option>
              <option value="20-40 ft">20-40 ft</option>
              <option value="40-60 ft">40-60 ft</option>
              <option value="60-80 ft">60-80 ft</option>
              <option value="80-100 ft">80-100 ft</option>
              <option value="100+ ft">100+ ft</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs tracking-wider text-slate-500 mb-2 uppercase">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 font-light focus:outline-none focus:border-slate-900 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="day boat">Day Boat</option>
              <option value="luxury yacht">Luxury Yacht</option>
              <option value="super yacht">Super Yacht</option>
              <option value="event vessels">Event Vessels</option>
            </select>
          </div>
        </div>

        {/* Vessels Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-light">Loading vessels...</div>
        ) : vessels.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 font-light text-lg mb-4">
              No vessels found matching your criteria.
            </p>
            <button
              onClick={() => setFilters({ location_tag: '', length_bucket: '', category: '' })}
              className="text-slate-900 underline font-light"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12 text-slate-600 font-light">
              {vessels.length} vessel{vessels.length !== 1 ? 's' : ''} available
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vessels.map((vessel) => (
                <Link
                  key={vessel.id}
                  href={`/fleet/${vessel.public_code}`}
                  className="group"
                >
                  <div className="bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                      {vessel.hero_image_url ? (
                        <img
                          src={vessel.hero_image_url}
                          alt={`${vessel.length_ft}ft ${vessel.make}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-light">
                          Image coming soon
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-white">
                      <h3 className="text-2xl font-light mb-3 text-slate-900 group-hover:text-slate-700 transition-colors">
                        {vessel.length_ft}ft {vessel.make}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 font-light uppercase tracking-wide">
                        {vessel.category} • {vessel.location_tag}
                      </p>

                      {/* Toys/Features */}
                      {vessel.toys.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {vessel.toys.slice(0, 3).map((toy) => (
                            <span
                              key={toy}
                              className="text-xs px-3 py-1 border border-slate-200 text-slate-600 font-light"
                            >
                              {toy}
                            </span>
                          ))}
                          {vessel.toys.length > 3 && (
                            <span className="text-xs px-3 py-1 border border-slate-200 text-slate-600 font-light">
                              +{vessel.toys.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {vessel.capacity_guests && (
                        <div className="text-sm text-slate-600 font-light">
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
    <Suspense fallback={<div className="min-h-screen bg-white pt-16 flex items-center justify-center"><div className="text-slate-400 font-light">Loading...</div></div>}>
      <FleetContent />
    </Suspense>
  );
}
