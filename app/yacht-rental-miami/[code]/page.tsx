'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface VesselDetail {
  vessel: {
    id: string;
    public_code: string;
    make: string;
    model: string | null;
    length_ft: number;
    length_bucket: string;
    category: string;
    location_tag: string;
    capacity_guests: number | null;
    min_hours: number;
    max_hours: number;
    allowed_durations: number[];
    toys: string[];
    amenities: string[];
    hero_image_url: string | null;
    gallery_image_urls: string[];
    public_description: string | null;
  };
  pricing: {
    currency: string;
    base_rates: Record<string, number>;
    extra_hour_cents: number | null;
    deposit_policy: any;
  } | null;
  schedule: {
    timezone: string;
    earliest_departure: string;
    latest_return: string;
    slot_increment_minutes: number;
    fixed_start_times: string[] | null;
  } | null;
}

export default function VesselDetailPage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code;
  const [data, setData] = useState<VesselDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchVessel();
  }, [code]);

  const fetchVessel = async () => {
    setLoading(true);
    const response = await fetch(`/api/public/vessels/${code}`);
    const vesselData = await response.json();
    setData(vesselData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="text-slate-400 font-light">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-slate-900 mb-4">Vessel not found</h1>
          <Link href="/fleet" className="text-slate-600 underline font-light">
            Back to fleet
          </Link>
        </div>
      </div>
    );
  }

  const { vessel, pricing, schedule } = data;
  const allImages = vessel.hero_image_url
    ? [vessel.hero_image_url, ...vessel.gallery_image_urls]
    : vessel.gallery_image_urls;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Gallery */}
      <section className="relative">
        {allImages.length > 0 ? (
          <>
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-200 to-slate-300 relative">
              <img
                src={allImages[selectedImage]}
                alt={`${vessel.length_ft}ft ${vessel.make}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex gap-4 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 border-2 transition-all ${
                        selectedImage === idx ? 'border-slate-900' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-400 font-light">Images coming soon</span>
          </div>
        )}
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <p className="text-xs tracking-widest text-slate-500 mb-2 uppercase">
                {vessel.category} • {vessel.location_tag}
              </p>
              <h1 className="text-5xl font-light mb-4 text-slate-900">
                {vessel.length_ft}ft {vessel.make}
                {vessel.model && ` ${vessel.model}`}
              </h1>
              {vessel.capacity_guests && (
                <p className="text-lg text-slate-600 font-light">
                  Up to {vessel.capacity_guests} guests
                </p>
              )}
            </div>

            {vessel.public_description && (
              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-lg font-light leading-relaxed text-slate-600">
                  {vessel.public_description}
                </p>
              </div>
            )}

            {/* Features & Amenities */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {vessel.toys.length > 0 && (
                <div>
                  <h3 className="text-lg font-light mb-4 text-slate-900 uppercase tracking-wide">
                    Water Toys & Features
                  </h3>
                  <ul className="space-y-2">
                    {vessel.toys.map((toy) => (
                      <li key={toy} className="flex items-start gap-3 text-slate-600 font-light">
                        <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {toy}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {vessel.amenities.length > 0 && (
                <div>
                  <h3 className="text-lg font-light mb-4 text-slate-900 uppercase tracking-wide">
                    Amenities
                  </h3>
                  <ul className="space-y-2">
                    {vessel.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-start gap-3 text-slate-600 font-light">
                        <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Operating Hours */}
            {schedule && (
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-light mb-4 text-slate-900 uppercase tracking-wide">
                  Operating Hours
                </h3>
                <div className="text-slate-600 font-light space-y-2">
                  <p>Departure: {schedule.earliest_departure}</p>
                  <p>Return by: {schedule.latest_return}</p>
                  <p>Minimum charter: {vessel.min_hours} hours</p>
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-slate-50 p-8 border border-slate-200">
              <h2 className="text-2xl font-light mb-6 text-slate-900">Pricing</h2>
              
              {pricing && (
                <div className="space-y-4 mb-8">
                  {vessel.allowed_durations.map((duration) => {
                    const price = pricing.base_rates[duration.toString()];
                    return price ? (
                      <div key={duration} className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <span className="text-slate-700 font-light">{duration} hours</span>
                        <span className="text-lg font-light text-slate-900">
                          {formatCurrency(price, pricing.currency)}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <Link
                href={`/booking/${vessel.public_code}`}
                className="block w-full px-8 py-4 bg-slate-900 text-white text-center hover:bg-slate-800 transition-colors font-light tracking-wide"
              >
                CHECK AVAILABILITY
              </Link>

              <div className="mt-6 text-xs text-slate-500 font-light text-center">
                Transparent pricing, no hidden fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-4 text-slate-900">
            Questions About This Yacht?
          </h2>
          <p className="text-lg text-slate-600 font-light mb-8">
            Our team is here to help match you with the perfect charter experience.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-light tracking-wide"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  );
}
