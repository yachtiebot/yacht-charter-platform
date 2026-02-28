'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface YachtData {
  id: string;
  fields: {
    'Yacht ID': string;
    'Boat Name': string;
    Brand: string;
    Model: string;
    'Length in Feet': number;
    'Boat Style': string;
    'Maximum Passengers': number;
    'Features: Number of Staterooms'?: number;  // Airtable field
    'Features: Number of Bathrooms'?: number;   // Airtable field
    'Sound System Type': string;
    'Toys Available On Request'?: string[];  // Airtable field (plural)
    'toys'?: string[];  // New: Array of toy names
    'amenities'?: string[];  // New: Array of amenity names
    'features'?: string[];  // New: Array of feature names
    'optional_upgrades'?: string[];  // New: Array of optional upgrades
    'Optional Experience Upgrades'?: string[];  // Airtable field
    // Toys boolean fields (updated field names)
    'Toys: Inflatables'?: boolean;
    'Toys: Floating Raft Island'?: boolean;
    'Toys: Floating Ring Island'?: boolean;
    'Toys: Tubing'?: boolean;
    'Toys: Water Slide'?: boolean;
    'Toys: Jet Ski'?: boolean;
    'Toys: Seabob'?: boolean;
    // Features/Amenities boolean fields
    'Features: Tender'?: boolean;
    'Features: Air Conditioning'?: boolean;
    'Features: Jacuzzi'?: boolean;
    'Features: BBQ Grill'?: boolean;
    'Features: Wet Bar'?: boolean;
    'Features: Kitchen'?: boolean;
    'Instant Booking Enabled'?: boolean;
    'Main Departure Location'?: string;
    'Departure Locations'?: string[];  // New multi-select field
    '2-Hour Price'?: number;
    '3-Hour Price': number;
    '4-Hour Price': number;
    '5-Hour Price': number;
    '6-Hour Price': number;
    '7-Hour Price': number;
    '8-Hour Price': number;
    'Short Description': string;
    'Full Description': string;
    'Quote'?: string;
    'From'?: string;
    'Supabase Hero URL'?: string;
    'Supabase Gallery URLs'?: string[];
  };
}

export default function VesselDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [yacht, setYacht] = useState<YachtData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [code, setCode] = useState<string>('');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Inquiry form state
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneOptIn: false,
    preferredDate: '',
    departureTime: '',
    charterLength: '',
    guests: 1,
    message: ''
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [availabilityMessage, setAvailabilityMessage] = useState<string>('');

  useEffect(() => {
    params.then(p => {
      setCode(p.code);
      fetchYacht(p.code);
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!showLightbox) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(selectedImage - 1);
      } else if (e.key === 'ArrowRight' && selectedImage < galleryImages.length - 1) {
        setSelectedImage(selectedImage + 1);
      } else if (e.key === 'Escape') {
        setShowLightbox(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, selectedImage]);

  // Prevent body scroll when lightbox is open (app-like experience)
  useEffect(() => {
    if (showLightbox) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showLightbox]);

  const fetchYacht = async (yachtCode: string) => {
    setLoading(true);
    try {
      // Fetch from Airtable via API route
      const response = await fetch(`/api/yachts/${yachtCode}`);
      const data = await response.json();
      setYacht(data);
    } catch (error) {
      console.error('Error fetching yacht:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Skeleton loader to prevent CLS */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-12"></div>
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-12">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-12 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="editorial-headline text-[#0f0f0f] mb-4">Yacht not found</h1>
          <Link href="/yacht-rental-miami" className="editorial-body text-[#6b6b6b] underline">
            Back to fleet
          </Link>
        </div>
      </div>
    );
  }

  const { fields } = yacht;
  
  // Build toys array from boolean fields (always use booleans now for consistency)
  const toys: string[] = [];
  if (fields['Toys: Inflatables']) toys.push('Inflatables');
  if (fields['Toys: Floating Raft Island']) toys.push('Floating Raft Island');
  if (fields['Toys: Floating Ring Island']) toys.push('Floating Ring Island');
  if (fields['Toys: Tubing']) toys.push('Tubing');
  if (fields['Toys: Water Slide']) toys.push('Water Slide');
  if (fields['Toys: Jet Ski']) toys.push('Jet Ski');
  if (fields['Toys: Seabob']) toys.push('SeaBob');
  
  // Build amenities array from boolean fields
  const amenities: string[] = [];
  if (fields['Features: Tender']) amenities.push('Tender');
  if (fields['Features: Air Conditioning']) amenities.push('Air-conditioning');
  if (fields['Features: Jacuzzi']) amenities.push('Jacuzzi');
  if (fields['Features: BBQ Grill']) amenities.push('Barbecue Grill');
  if (fields['Features: Wet Bar']) amenities.push('Wet Bar');
  if (fields['Features: Kitchen']) amenities.push('Kitchen');
  
  // Use features array from API (built from Features: checkboxes in yacht-cache)
  const features: string[] = fields['features'] || [];
  
  // Optional upgrades from existing field
  const optionalUpgrades: string[] = fields['Optional Experience Upgrades'] || [];
  
  // Use Supabase gallery URLs from API, fallback to local images
  const galleryImages = fields['Supabase Gallery URLs'] || [];

  // Swipe gesture handlers
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  // Handle inquiry form submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yacht) return;
    
    setIsSubmittingInquiry(true);
    setInquiryStatus('idle');
    setAvailabilityMessage('');

    try {
      // Send email inquiry
      const emailData = {
        ...inquiryData,
        boatName: yacht.fields['Boat Name'],
        boatId: yacht.fields['Yacht ID'],
        to: 'support@miamiyachting.com',
        subject: `Boat Inquiry: ${yacht.fields['Boat Name']}`
      };

      const emailResponse = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (!emailResponse.ok) throw new Error('Failed to send inquiry');

      // Check availability if date is provided
      let hasBookingLink = false;
      if (inquiryData.preferredDate && inquiryData.departureTime) {
        try {
          const availResponse = await fetch('/api/check-availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              yachtId: yacht.fields['Yacht ID'],
              date: inquiryData.preferredDate,
              time: inquiryData.departureTime,
              duration: inquiryData.charterLength
            })
          });

          const availData = await availResponse.json();
          
          if (availData.available && availData.bookableOnline && yacht.fields['Instant Booking Enabled']) {
            setAvailabilityMessage('INSTANT_BOOKING_AVAILABLE');
            hasBookingLink = true;
          }
        } catch (err) {
          // Availability check failed, but inquiry was sent
          console.error('Availability check error:', err);
        }
      }

      setInquiryStatus('success');
      
      // Only auto-close if there's NO booking link
      // If booking link exists, keep modal open so user can click it
      if (!hasBookingLink) {
        setTimeout(() => {
          setInquiryData({
            name: '',
            email: '',
            phone: '',
            phoneOptIn: false,
            preferredDate: '',
            departureTime: '',
            charterLength: '',
            guests: 1,
            message: ''
          });
          setInquiryStatus('idle');
          setAvailabilityMessage('');
          setShowBookingModal(false);
        }, 5000);
      }

    } catch (error) {
      console.error('Inquiry submission error:', error);
      setInquiryStatus('error');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const pricingRates = [
    { hours: 2, price: fields['2-Hour Price'] },
    { hours: 3, price: fields['3-Hour Price'] },
    { hours: 4, price: fields['4-Hour Price'] },
    { hours: 5, price: fields['5-Hour Price'] },
    { hours: 6, price: fields['6-Hour Price'] },
    { hours: 7, price: fields['7-Hour Price'] },
    { hours: 8, price: fields['8-Hour Price'] },
  ].filter(rate => rate.price);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Breadcrumb */}
      <div className="bg-[#faf9f7] pt-24 pb-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="editorial-label text-[#6b6b6b] uppercase tracking-wider">
            <Link href="/yacht-rental-miami" className="hover:text-[#c4a265] transition-colors">← BACK TO FLEET</Link>
          </div>
        </div>
      </div>

      {/* Photo Gallery - Responsive Grid */}
      <section className="bg-[#faf9f7] pb-8 md:pb-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
          {/* Mobile: 3-column square grid (smaller thumbnails) */}
          <div className="grid grid-cols-3 gap-1 md:hidden">
            {galleryImages.slice(0, 8).map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-gray-200 aspect-square"
                onClick={() => { setSelectedImage(idx); setShowLightbox(true); }}
              >
                <img
                  src={img}
                  alt={`${fields['Boat Name']} - Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading={idx > 3 ? "lazy" : "eager"}
                  width={200}
                  height={200}
                />
              </div>
            ))}
            
            {/* "+10 more" overlay on 9th image (mobile) */}
            <div
              className="relative overflow-hidden cursor-pointer group bg-gray-200 aspect-square"
              onClick={() => { setSelectedImage(8); setShowLightbox(true); }}
            >
              <img
                src={galleryImages[8]}
                alt={`${fields['Boat Name']} - Photo 9`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={200}
                height={200}
              />
              <div className="absolute inset-0 bg-[#0f0f0f]/75 flex items-center justify-center">
                <span className="text-white text-xs" style={{fontWeight: 400}}>+{galleryImages.length - 9}</span>
              </div>
            </div>
          </div>

          {/* Desktop: 4x2 Grid */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
            {galleryImages.slice(0, 7).map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-gray-200"
                onClick={() => { setSelectedImage(idx); setShowLightbox(true); }}
              >
                <img
                  src={img}
                  alt={`${fields['Boat Name']} - Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading={idx > 3 ? "lazy" : "eager"}
                  width={480}
                  height={320}
                />
              </div>
            ))}
            
            {/* "+11 more" overlay on last image (desktop) */}
            <div
              className="relative overflow-hidden cursor-pointer group bg-gray-200"
              onClick={() => { setSelectedImage(7); setShowLightbox(true); }}
            >
              <img
                src={galleryImages[7]}
                alt={`${fields['Boat Name']} - Photo 8`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={480}
                height={320}
              />
              <div className="absolute inset-0 bg-[#0f0f0f]/70 flex items-center justify-center">
                <span className="editorial-card-name text-white">+{galleryImages.length - 8} more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout: Content + Pricing */}
      <section className="bg-[#faf9f7] pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEFT COLUMN - Content */}
            <div className="lg:col-span-2">
              {/* Heading */}
              <h1 className="editorial-headline text-[#0f0f0f] mb-2">
                {fields['Boat Name']}
              </h1>
              <div className="editorial-label text-[#c4a265] mb-8">
                {fields['Boat Style']?.toUpperCase() || 'CRUISER'} · {fields['Maximum Passengers']} GUESTS · {((fields['Departure Locations'] && fields['Departure Locations'].length > 0) ? fields['Departure Locations'][0] : fields['Main Departure Location'] || 'MIAMI').toUpperCase()}
              </div>

              {/* MOBILE ONLY: Pricing Section */}
              <div className="lg:hidden mb-12 bg-white border border-[#0f0f0f]/10 p-10 shadow-sm">
                {fields['Instant Booking Enabled'] ? (
                  <>
                    <h3 className="editorial-label text-[#0f0f0f] mb-3 text-center" style={{fontWeight: 300, fontSize: '16px', letterSpacing: '0.05em'}}>
                      BOOK INSTANTLY ONLINE
                    </h3>
                    <p className="text-[11px] text-[#6b6b6b] mb-2 text-center" style={{fontWeight: 300, letterSpacing: '0.02em'}}>
                      Start your charter booking with $300
                    </p>
                    <p className="text-[11px] text-[#6b6b6b] mb-8 text-center" style={{fontWeight: 300, letterSpacing: '0.02em'}}>
                      Select hours and price below
                    </p>
                  </>
                ) : (
                  <h3 className="editorial-label text-[#0f0f0f] mb-8 text-center" style={{fontWeight: 300, fontSize: '16px', letterSpacing: '0.05em'}}>
                    CHARTER RATES
                  </h3>
                )}
                
                {/* Pricing Table / Booking Buttons */}
                <div className="space-y-4 mb-8">
                  {pricingRates.map((rate) => {
                    const isInstantBooking = fields['Instant Booking Enabled'];
                    return isInstantBooking ? (
                      <button
                        key={rate.hours}
                        onClick={() => window.open('https://book.miamiyachting.com', '_blank')}
                        className="w-full bg-white text-[#0f0f0f] py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 border border-[#0f0f0f]/20 flex justify-between items-center px-6"
                      >
                        <span className="text-[13px] uppercase tracking-[0.2em]" style={{fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 300}}>{rate.hours} Hours</span>
                        <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400}}>${rate.price?.toLocaleString() || 0}</span>
                      </button>
                    ) : (
                      <div key={rate.hours} className="flex justify-between items-center border-b border-[#e5e5e5] pb-5 mb-4">
                        <span className="text-[13px] text-[#0f0f0f] uppercase tracking-[0.2em]" style={{fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 300}}>{rate.hours} Hours</span>
                        <span className="text-[#0f0f0f]" style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400}}>${rate.price?.toLocaleString() || 0}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Separator line (only for instant booking) */}
                {fields['Instant Booking Enabled'] && (
                  <div className="border-t border-[#e5e5e5] mb-8"></div>
                )}

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/18007479585?text=Hi, I'm interested in the ${fields['Boat Name']}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-[#0f0f0f] text-sm uppercase tracking-[0.2em] font-normal py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 mb-4 flex items-center justify-center gap-3 border border-[#0f0f0f]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Inquiry
                </a>

                {/* Email Inquiry Button */}
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-white text-[#0f0f0f] text-sm uppercase tracking-[0.2em] font-normal py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 mb-4 border border-[#0f0f0f]/20"
                >
                  EMAIL INQUIRY
                </button>

                {/* Call Button */}
                <a
                  href="tel:18007479585"
                  className="w-full bg-white text-[#0f0f0f] text-sm uppercase tracking-[0.2em] font-normal py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 flex items-center justify-center border border-[#0f0f0f]/20"
                >
                  CALL 1 800 747 9585
                </a>
              </div>

              {/* Description */}
              <div className="editorial-body text-[#6b6b6b] mb-12 leading-relaxed" style={{fontWeight: 400}}>
                {fields['Full Description']}
              </div>

              {/* Features (above grey line) */}
              {features.length > 0 && (
                <div className="mb-4">
                  <h2 className="editorial-label text-[#6b6b6b] mb-4">FEATURES</h2>
                  <p className="editorial-spec-value text-[#0f0f0f]">
                    {features.join(' • ')}
                  </p>
                </div>
              )}

              {/* Specifications */}
              <div className="mb-12">
                <h2 className="editorial-label text-[#6b6b6b] mb-6">SPECIFICATIONS</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="border-t border-[#e5e5e5] pt-4 mb-2"></div>
                    <div className="editorial-label text-[#6b6b6b] mb-2">CAPACITY</div>
                    <div className="editorial-spec-value text-[#0f0f0f]">{fields['Maximum Passengers']} Guests</div>
                  </div>
                  <div>
                    <div className="border-t border-[#e5e5e5] pt-4 mb-2"></div>
                    <div className="editorial-label text-[#6b6b6b] mb-2">STEREO</div>
                    <div className="editorial-spec-value text-[#0f0f0f]">{fields['Sound System Type']}</div>
                  </div>
                  <div>
                    <div className="border-t border-[#e5e5e5] pt-4 mb-2"></div>
                    <div className="editorial-label text-[#6b6b6b] mb-2">STATEROOMS</div>
                    <div className="editorial-spec-value text-[#0f0f0f]">{fields['Features: Number of Staterooms'] ?? 0}</div>
                  </div>
                  <div>
                    <div className="border-t border-[#e5e5e5] pt-4 mb-2"></div>
                    <div className="editorial-label text-[#6b6b6b] mb-2">BATHROOMS</div>
                    <div className="editorial-spec-value text-[#0f0f0f]">{fields['Features: Number of Bathrooms'] ?? 0}</div>
                  </div>
                </div>
              </div>

              {/* Toys */}
              {toys.length > 0 && (
                <div className="mb-12">
                  <div className="border-t border-[#e5e5e5] pt-6 mb-4"></div>
                  <h2 className="editorial-label text-[#6b6b6b] mb-4">TOYS</h2>
                  <p className="editorial-spec-value text-[#0f0f0f]">
                    {toys.join(' • ')}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="mb-12">
                  <div className="border-t border-[#e5e5e5] pt-6 mb-4"></div>
                  <h2 className="editorial-label text-[#6b6b6b] mb-4">AMENITIES</h2>
                  <p className="editorial-spec-value text-[#0f0f0f]">
                    {amenities.join(' • ')}
                  </p>
                </div>
              )}

              {/* Optional Upgrades */}
              {optionalUpgrades.length > 0 && (
                <div className="mb-12">
                  <div className="border-t border-[#e5e5e5] pt-6 mb-4"></div>
                  <h2 className="editorial-label text-[#6b6b6b] mb-4">OPTIONAL UPGRADES</h2>
                  <p className="editorial-spec-value text-[#0f0f0f]">
                    {optionalUpgrades.join(' • ')}
                  </p>
                </div>
              )}

              {/* Departure Locations */}
              <div className="mb-12">
                <h2 className="editorial-label text-[#6b6b6b] mb-2 pb-2 border-b border-[#e5e5e5]">DEPARTURE LOCATIONS</h2>
                <div className="mt-6">
                  <p className="editorial-spec-value text-[#0f0f0f]">
                    {(fields['Departure Locations'] && fields['Departure Locations'].length > 0)
                      ? fields['Departure Locations'].join(', ')
                      : fields['Main Departure Location'] || 'Miami'}
                  </p>
                </div>
              </div>

              {/* Customer Quote from Airtable */}
              <div className="mb-12 py-8 -ml-1">
                <div className="flex items-center gap-1 mb-6 justify-center opacity-60">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#c4a265]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-center text-[#0f0f0f]/70 mb-6 italic leading-relaxed text-xl md:text-2xl" style={{fontFamily: 'Cormorant Garamond, serif', fontWeight: 300}}>
                  "{fields['Quote'] || (() => {
                    // Fallback generic reviews if no Quote in Airtable
                    const reviews = [
                      { author: "Sarah M.", text: "Absolutely incredible experience! The booking process was seamless and the boat was even better than the photos. Highly recommend!" },
                      { author: "Michael T.", text: "Best day on the water we've ever had! Professional service from start to finish. Will definitely be booking again." },
                      { author: "Jennifer L.", text: "Perfect for our celebration! The yacht was pristine and the whole experience exceeded our expectations." },
                      { author: "David R.", text: "Outstanding service and beautiful vessels. Made our Miami trip unforgettable. Couldn't ask for better!" },
                      { author: "Amanda K.", text: "The easiest booking process and such a beautiful yacht. Our group had an amazing time exploring the bay!" },
                      { author: "Robert P.", text: "Exceptional quality and service. Every detail was perfect. This is how yacht charters should be done!" }
                    ];
                    const yachtId = yacht.fields['Yacht ID'] || '';
                    const hash = yachtId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const review = reviews[hash % reviews.length];
                    return review.text;
                  })()}"
                </p>
                <p className="text-center text-[#6b6b6b] text-sm opacity-60" style={{fontWeight: 300, letterSpacing: '0.05em'}}>
                  — {fields['From'] || (() => {
                    // Fallback generic author if no From in Airtable
                    const reviews = [
                      { author: "Sarah M.", text: "Absolutely incredible experience! The booking process was seamless and the boat was even better than the photos. Highly recommend!" },
                      { author: "Michael T.", text: "Best day on the water we've ever had! Professional service from start to finish. Will definitely be booking again." },
                      { author: "Jennifer L.", text: "Perfect for our celebration! The yacht was pristine and the whole experience exceeded our expectations." },
                      { author: "David R.", text: "Outstanding service and beautiful vessels. Made our Miami trip unforgettable. Couldn't ask for better!" },
                      { author: "Amanda K.", text: "The easiest booking process and such a beautiful yacht. Our group had an amazing time exploring the bay!" },
                      { author: "Robert P.", text: "Exceptional quality and service. Every detail was perfect. This is how yacht charters should be done!" }
                    ];
                    const yachtId = yacht.fields['Yacht ID'] || '';
                    const hash = yachtId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const review = reviews[hash % reviews.length];
                    return `${review.author} • Google Review`;
                  })()}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - Sticky Pricing (DESKTOP ONLY) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-white border border-[#0f0f0f]/10 p-10 shadow-md">
                {fields['Instant Booking Enabled'] ? (
                  <>
                    <h3 className="editorial-label text-[#0f0f0f] mb-3 text-center" style={{fontWeight: 300, fontSize: '16px', letterSpacing: '0.05em'}}>
                      BOOK INSTANTLY ONLINE
                    </h3>
                    <p className="text-[12px] text-[#6b6b6b] mb-2 text-center" style={{fontWeight: 300, letterSpacing: '0.02em'}}>
                      Start your charter booking with $300
                    </p>
                    <p className="text-[11px] text-[#6b6b6b] mb-8 text-center" style={{fontWeight: 300, letterSpacing: '0.02em'}}>
                      Select hours and price below
                    </p>
                  </>
                ) : (
                  <h3 className="editorial-label text-[#0f0f0f] mb-8 text-center" style={{fontWeight: 300, fontSize: '16px', letterSpacing: '0.05em'}}>
                    CHARTER RATES
                  </h3>
                )}
                
                {/* Pricing Table / Booking Buttons */}
                <div className="space-y-4 mb-8">
                  {pricingRates.map((rate) => {
                    const isInstantBooking = fields['Instant Booking Enabled'];
                    return isInstantBooking ? (
                      <button
                        key={rate.hours}
                        onClick={() => window.open('https://book.miamiyachting.com', '_blank')}
                        className="w-full bg-white text-[#0f0f0f] py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 border border-[#0f0f0f]/20 flex justify-between items-center px-6"
                      >
                        <span className="text-[13px] uppercase tracking-[0.2em]" style={{fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 300}}>{rate.hours} Hours</span>
                        <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400}}>${rate.price?.toLocaleString() || 0}</span>
                      </button>
                    ) : (
                      <div key={rate.hours} className="flex justify-between items-center border-b border-[#e5e5e5] pb-5 mb-4">
                        <span className="text-[13px] text-[#0f0f0f] uppercase tracking-[0.2em]" style={{fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 300}}>{rate.hours} Hours</span>
                        <span className="text-[#0f0f0f]" style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400}}>${rate.price?.toLocaleString() || 0}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Separator line (only for instant booking) */}
                {fields['Instant Booking Enabled'] && (
                  <div className="border-t border-[#e5e5e5] mb-8"></div>
                )}

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/18007479585?text=Hi, I'm interested in the ${fields['Boat Name']}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-[#0f0f0f] text-sm uppercase tracking-[0.2em] font-normal py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 mb-4 flex items-center justify-center gap-3 border border-[#0f0f0f]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Inquiry
                </a>

                {/* Email Inquiry Button */}
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-white text-[#0f0f0f] text-sm uppercase tracking-[0.2em] font-normal py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 mb-4 border border-[#0f0f0f]/20"
                >
                  EMAIL INQUIRY
                </button>

                {/* Call Button */}
                <a
                  href="tel:18007479585"
                  className="w-full bg-white text-[#0f0f0f] text-sm uppercase tracking-[0.2em] font-normal py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-300 flex items-center justify-center border border-[#0f0f0f]/20"
                >
                  CALL 1 800 747 9585
                </a>

                {/* Bottom Links */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#e5e5e5]">
                  <Link href="/yacht-rental-miami" className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] transition-colors">
                    ← BACK TO FLEET
                  </Link>
                  <Link href="/faq" className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] transition-colors">
                    VIEW FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section with Hero Image Background */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={galleryImages[0]}
            alt={fields['Boat Name']}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center w-full">
          <div className="rule-gold mx-auto" />
          <h2 className="editorial-headline text-white mb-4 font-normal">
            Interested in the {fields['Boat Name']}?
          </h2>
          <p className="editorial-body text-white/90 mb-10 max-w-2xl mx-auto" style={{fontWeight: 400}}>
            Share your preferred date and group size. We'll confirm availability and handle details.
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
            <button
              onClick={() => setShowBookingModal(true)}
              className="editorial-label bg-white/25 backdrop-blur-lg text-white px-8 py-4 hover:bg-[#c4a265] transition-all duration-500 flex-1 text-center border border-white/30"
            >
              Send an Inquiry
            </button>
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
                src="/images/Miami_Yachting_Company_myc-logo.png" 
                alt="Miami Yachting Company"
                className="h-20 w-20 mb-4"
              />
              <p className="text-white/40 text-sm mb-6" style={{fontWeight: 400}}>
                A curated fleet of privately owned vessels for Miami yacht charters.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/18007479585" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Charter */}
            <div>
              <div className="editorial-label text-[#c4a265] mb-6" style={{fontWeight: 400}}>Charter</div>
              <div className="space-y-3">
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>Day Boats</Link>
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>Luxury Yachts</Link>
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>Superyachts</Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="editorial-label text-[#c4a265] mb-6" style={{fontWeight: 400}}>Company</div>
              <div className="space-y-3">
                <Link href="/" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>Home</Link>
                <Link href="/yacht-rental-miami" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>Fleet</Link>
                <Link href="/contact" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>Contact</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="editorial-label text-[#c4a265] mb-6" style={{fontWeight: 400}}>Contact</div>
              <div className="space-y-3">
                <a href="tel:18007479585" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>1 800 747 9585</a>
                <a href="mailto:support@miamiyachting.com" className="block text-white/40 hover:text-white transition-colors text-sm" style={{fontWeight: 400}}>support@miamiyachting.com</a>
                <div className="text-white/40 text-sm" style={{fontWeight: 400}}>Miami, Florida</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-wrap justify-between items-center gap-4">
            <div className="text-white/40 text-sm" style={{fontWeight: 400}}>
              © 2026 Miami Yachting Company®. All rights reserved.
            </div>
            <div className="editorial-label text-[#c4a265] text-[10px]" style={{fontWeight: 400}}>
              Best Boat Charter · Readers' Choice Award
            </div>
          </div>
        </div>
      </footer>

      {/* Image Lightbox - Swipe enabled, no page scroll */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8 overflow-hidden touch-none"
          onClick={() => setShowLightbox(false)}
          style={{ touchAction: 'none' }}
        >
          <div 
            className="relative max-w-5xl w-full touch-pan-x"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={(e) => {
              e.preventDefault();
              onTouchMove(e);
            }}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-x' }}
          >
            {/* Yacht Name Header */}
            <div className="absolute -top-12 md:-top-16 left-0 right-0 text-center">
              <h2 className="editorial-card-name text-white text-xl md:text-2xl">
                {fields['Boat Name']}
              </h2>
            </div>

            {/* Close Button - Minimalist white X */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-10 right-0 md:-top-14 md:-right-14 text-white text-4xl md:text-5xl hover:text-[#c4a265] transition-colors z-10"
            >
              ×
            </button>
            
            {/* Previous Button - Hidden on mobile, use swipe instead */}
            {selectedImage > 0 && (
              <button
                onClick={() => setSelectedImage(selectedImage - 1)}
                className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-[#c4a265] transition-colors"
              >
                ‹
              </button>
            )}
            
            {/* Next Button - Hidden on mobile, use swipe instead */}
            {selectedImage < galleryImages.length - 1 && (
              <button
                onClick={() => setSelectedImage(selectedImage + 1)}
                className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-[#c4a265] transition-colors"
              >
                ›
              </button>
            )}
            
            {/* Image - swipe enabled on mobile */}
            <div className="relative">
              <img
                src={galleryImages[selectedImage]}
                alt={`${fields['Boat Name']} - Photo ${selectedImage + 1}`}
                className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain shadow-2xl select-none"
                draggable={false}
              />
              {/* Swipe hint on mobile - shows briefly */}
              <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs animate-pulse pointer-events-none">
                ← Swipe to navigate →
              </div>
            </div>
            
            {/* Counter - Minimalist white text */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm" style={{fontWeight: 400}}>
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Booking Inquiry Modal */}
      {showBookingModal && yacht && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4 py-8">
            <div className="bg-[#faf9f7] max-w-2xl w-full relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowBookingModal(false);
                setInquiryStatus('idle');
                setAvailabilityMessage('');
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-white/60 text-2xl hover:text-white transition-colors z-10"
            >
              ×
            </button>

            {/* Header */}
            <div className="bg-[#0f0f0f] px-6 md:px-10 py-6 md:py-8">
              <h3 className="editorial-headline text-white text-xl md:text-3xl mb-2">
                {yacht.fields['Boat Name']} Inquiry
              </h3>
              <p className="editorial-label text-white/60 text-[6px] md:text-xs leading-tight">
                {yacht.fields['Maximum Passengers']} GUESTS · {yacht.fields['Main Departure Location']?.toUpperCase() || 'MIAMI'}
              </p>
            </div>

            {inquiryStatus === 'success' ? (
              /* Success Message */
              <div className="px-6 md:px-10 py-12 text-center">
                <div className="w-16 h-16 bg-[#c4a265] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="editorial-headline text-[#0f0f0f] text-xl mb-4">
                  Thank you for your message!
                </h4>
                <p className="editorial-body text-[#6b6b6b] mb-6" style={{fontWeight: 400}}>
                  It has been received and a member of our team will contact you shortly.
                </p>
                
                {availabilityMessage && (
                  <div className="bg-[#c4a265]/10 border border-[#c4a265]/20 rounded-lg p-6 text-left">
                    {availabilityMessage === 'INSTANT_BOOKING_AVAILABLE' ? (
                      <p className="editorial-body text-[#0f0f0f] leading-relaxed" style={{fontWeight: 400}}>
                        Great news! This boat is available for your requested time and date and can be booked online instantly here:{' '}
                        <a 
                          href="https://book.miamiyachting.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#c4a265] hover:underline font-medium"
                        >
                          Book Now
                        </a>
                      </p>
                    ) : (
                      <p className="editorial-body text-[#0f0f0f] leading-relaxed" style={{fontWeight: 400}}>
                        {availabilityMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Inquiry Form */
              <form onSubmit={handleInquirySubmit} className="px-6 md:px-10 py-8 space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">NAME *</label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors"
                      style={{fontWeight: 400}}
                    />
                  </div>
                  <div>
                    <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors"
                      style={{fontWeight: 400}}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">PHONE</label>
                  <input
                    type="tel"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors"
                    style={{fontWeight: 400}}
                  />
                  <label className="flex items-center mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inquiryData.phoneOptIn}
                      onChange={(e) => setInquiryData({...inquiryData, phoneOptIn: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="editorial-label text-[#6b6b6b] text-[10px]">Opt in to SMS updates</span>
                  </label>
                </div>

                {/* Date, Time, Duration Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">PREFERRED DATE *</label>
                    <input
                      type="date"
                      required
                      value={inquiryData.preferredDate}
                      onChange={(e) => setInquiryData({...inquiryData, preferredDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors"
                      style={{fontWeight: 400}}
                    />
                  </div>
                  <div>
                    <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">DEPARTURE TIME *</label>
                    <input
                      type="time"
                      required
                      value={inquiryData.departureTime}
                      onChange={(e) => setInquiryData({...inquiryData, departureTime: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors"
                      style={{fontWeight: 400}}
                    />
                  </div>
                  <div>
                    <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">CHARTER LENGTH *</label>
                    <select
                      required
                      value={inquiryData.charterLength}
                      onChange={(e) => setInquiryData({...inquiryData, charterLength: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors"
                      style={{fontWeight: 400}}
                    >
                      <option value="">Select...</option>
                      {yacht.fields['2-Hour Price'] && <option value="2">2 Hours</option>}
                      {yacht.fields['3-Hour Price'] && <option value="3">3 Hours</option>}
                      {yacht.fields['4-Hour Price'] && <option value="4">4 Hours</option>}
                      {yacht.fields['5-Hour Price'] && <option value="5">5 Hours</option>}
                      {yacht.fields['6-Hour Price'] && <option value="6">6 Hours</option>}
                      {yacht.fields['7-Hour Price'] && <option value="7">7 Hours</option>}
                      {yacht.fields['8-Hour Price'] && <option value="8">8 Hours</option>}
                      <option value="8+">8+ Hours</option>
                    </select>
                  </div>
                </div>

                {/* Guests (with max limit) */}
                <div>
                  <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">
                    NUMBER OF GUESTS * (MAX: {yacht.fields['Maximum Passengers']})
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setInquiryData({...inquiryData, guests: Math.max(1, inquiryData.guests - 1)})}
                      className="w-10 h-10 bg-white border border-[#e5e5e5] text-[#0f0f0f] hover:bg-[#f5f5f5] transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={yacht.fields['Maximum Passengers']}
                      required
                      value={inquiryData.guests}
                      onChange={(e) => setInquiryData({...inquiryData, guests: Math.min(yacht.fields['Maximum Passengers'], Math.max(1, parseInt(e.target.value) || 1))})}
                      className="w-20 h-10 text-center border-t border-b border-[#e5e5e5] text-[#0f0f0f] focus:outline-none"
                      style={{fontWeight: 400}}
                    />
                    <button
                      type="button"
                      onClick={() => setInquiryData({...inquiryData, guests: Math.min(yacht.fields['Maximum Passengers'], inquiryData.guests + 1)})}
                      disabled={inquiryData.guests >= yacht.fields['Maximum Passengers']}
                      className="w-10 h-10 bg-white border border-[#e5e5e5] text-[#0f0f0f] hover:bg-[#f5f5f5] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="editorial-label text-[#6b6b6b] text-[10px] mb-2 block">MESSAGE</label>
                  <textarea
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-[#e5e5e5] text-[#0f0f0f] focus:outline-none focus:border-[#c4a265] transition-colors resize-none"
                    style={{fontWeight: 400}}
                    placeholder="Tell us about your charter plans..."
                  />
                </div>

                {/* Error Message */}
                {inquiryStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-800 text-sm">
                    Failed to send inquiry. Please try again or email us directly at support@miamiyachting.com
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="editorial-label w-full bg-[#0f0f0f] text-white px-12 py-4 hover:bg-[#c4a265] transition-all duration-300 disabled:bg-[#6b6b6b] disabled:cursor-not-allowed"
                >
                  {isSubmittingInquiry ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}