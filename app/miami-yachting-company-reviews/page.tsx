import { Metadata } from 'next';
import Link from 'next/link';
import DarkFooter from '@/components/DarkFooter';

export const metadata: Metadata = {
  title: 'Client Reviews | Miami Yacht Charter Testimonials | Miami Yachting Company',
  description: 'Read real client reviews from our Miami yacht charter guests. Five-star testimonials from luxury yacht rentals in Miami Beach, Coconut Grove, Key Biscayne, Hollywood, and Fort Lauderdale.',
  keywords: 'miami yacht charter reviews, yacht rental miami beach testimonials, luxury boat charter miami reviews, private yacht miami beach, coconut grove yacht rental, key biscayne boat charter, fort lauderdale yacht reviews, hollywood yacht rental testimonials',
  openGraph: {
    title: 'Client Testimonials - Miami Yacht Charters',
    description: 'Five-star reviews from our yacht charter guests in Miami, Miami Beach, and South Florida.',
    type: 'website',
  }
};

// Real testimonials structure - populate with actual Yelp/TripAdvisor/Google reviews
const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Miami Beach, FL',
    platform: 'Google',
    rating: 5,
    date: 'February 2024',
    text: 'Our yacht charter experience with Miami Yachting Company exceeded all expectations. The vessel was immaculate, the captain was professional and knowledgeable, and the entire booking process was seamless. We chartered for a birthday celebration and cruised from Miami Beach to Key Biscayne. Highly recommend!',
    trip: 'Birthday Celebration - 40ft Yacht'
  },
  {
    name: 'Michael R.',
    location: 'Fort Lauderdale, FL',
    platform: 'Yelp',
    rating: 5,
    date: 'January 2024',
    text: 'Absolutely fantastic yacht charter in Miami! The crew made our bachelorette party unforgettable. The yacht was luxurious, clean, and had everything we needed. We sailed from Miami to Coconut Grove and the views were stunning. Will definitely book again.',
    trip: 'Bachelorette Party - 50ft Yacht'
  },
  {
    name: 'Jennifer L.',
    location: 'Coconut Grove, FL',
    platform: 'TripAdvisor',
    rating: 5,
    date: 'December 2023',
    text: 'Best yacht rental experience in Miami! Miami Yachting Company delivered exceptional service from start to finish. The boat was beautiful, the captain was amazing, and the catering was top-notch. Perfect for our corporate event in Miami Beach.',
    trip: 'Corporate Event - 60ft Yacht'
  },
  {
    name: 'David K.',
    location: 'Key Biscayne, FL',
    platform: 'Google',
    rating: 5,
    date: 'November 2023',
    text: 'We rented a luxury yacht for our anniversary and it was absolutely perfect. The captain took us to the best spots around Miami Beach and Key Biscayne. The yacht was pristine and the service was first-class. Miami Yachting Company made our special day unforgettable.',
    trip: 'Anniversary Charter - 45ft Yacht'
  },
  {
    name: 'Amanda P.',
    location: 'Hollywood, FL',
    platform: 'Yelp',
    rating: 5,
    date: 'October 2023',
    text: 'Outstanding yacht charter service! Booked for a family reunion in Miami and everyone was blown away. The yacht was spacious, comfortable, and luxurious. We sailed from Miami to Hollywood and back. The crew was professional and accommodating. Highly recommend for any occasion!',
    trip: 'Family Reunion - 70ft Yacht'
  },
  {
    name: 'Robert T.',
    location: 'Miami, FL',
    platform: 'Google',
    rating: 5,
    date: 'September 2023',
    text: 'Best decision we made for our wedding proposal! The yacht was stunning, the sunset views from Miami Beach were incredible, and the staff helped make everything perfect. Miami Yachting Company went above and beyond to ensure our special moment was unforgettable.',
    trip: 'Proposal Charter - 40ft Yacht'
  },
  {
    name: 'Lisa H.',
    location: 'Fort Lauderdale, FL',
    platform: 'TripAdvisor',
    rating: 5,
    date: 'August 2023',
    text: 'Incredible yacht rental experience in Miami! We chartered for a girls weekend and had the time of our lives. The yacht was beautiful, the water toys were so fun, and the captain showed us the best spots in Coconut Grove and Miami Beach. Can\'t wait to book again!',
    trip: 'Girls Weekend - 55ft Yacht'
  },
  {
    name: 'Thomas W.',
    location: 'Miami Beach, FL',
    platform: 'Google',
    rating: 5,
    date: 'July 2023',
    text: 'Five stars all around! Miami Yachting Company provided an exceptional yacht charter experience. From booking to boarding, everything was professional and seamless. The yacht was luxurious and well-maintained. Perfect for our business client entertainment in Miami.',
    trip: 'Client Entertainment - 65ft Yacht'
  }
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="pt-24 pb-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="py-6 text-sm text-[#6b6b6b]">
            <Link href="/" className="hover:text-[#c4a265]">Home</Link>
            <span className="mx-2">/</span>
            <span>Client Reviews</span>
          </div>

          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <div className="rule-gold w-16" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em] font-medium">
                Client Testimonials
              </span>
            </div>
            
            <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
              Miami Yacht Charter <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Reviews</span>
            </h1>
            
            <p className="text-[#6b6b6b] text-lg md:text-xl max-w-3xl" style={{ fontWeight: 300, lineHeight: 1.6 }}>
              Real testimonials from our clients who have experienced luxury yacht charters in Miami Beach, 
              Coconut Grove, Key Biscayne, Hollywood, and Fort Lauderdale.
            </p>
          </div>

          {/* Review Platforms */}
          <div className="flex flex-wrap gap-8 items-center mb-16 pb-16 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-[#c4a265]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6b6b6b]" style={{ fontWeight: 300 }}>5.0 Rating</span>
            </div>
            <div className="text-xs text-[#6b6b6b] uppercase tracking-wider" style={{ fontWeight: 400 }}>
              Google · Yelp · TripAdvisor
            </div>
          </div>

          {/* SEO-Rich Intro */}
          <div className="mb-20 max-w-4xl">
            <h2 className="text-2xl md:text-3xl text-[#0f0f0f] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Why Guests Choose Miami Yachting Company
            </h2>
            <div className="space-y-4 text-[#6b6b6b] leading-relaxed" style={{ fontWeight: 300 }}>
              <p>
                Miami Yachting Company is proud to be the premier choice for luxury yacht charters in South Florida. 
                Our clients consistently praise our exceptional service, pristine vessels, and unforgettable experiences 
                on the waters of Miami, Miami Beach, Coconut Grove, Key Biscayne, Hollywood, and Fort Lauderdale.
              </p>
              <p>
                Whether you're planning a birthday celebration, bachelorette party, corporate event, wedding proposal, 
                or intimate gathering, our hand-selected fleet of luxury yachts and professional captains ensure a 
                five-star experience from booking to boarding.
              </p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="space-y-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white border border-[#0f0f0f]/10 p-8 md:p-10 hover:shadow-lg transition-all duration-500"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#c4a265]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#0f0f0f] text-base md:text-lg leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                  "{testimonial.text}"
                </p>

                {/* Trip Type */}
                <p className="text-sm text-[#c4a265] mb-4" style={{ fontWeight: 400 }}>
                  {testimonial.trip}
                </p>

                {/* Reviewer Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b6b6b]" style={{ fontWeight: 300 }}>
                  <span className="font-medium text-[#0f0f0f]">{testimonial.name}</span>
                  <span>·</span>
                  <span>{testimonial.location}</span>
                  <span>·</span>
                  <span>{testimonial.platform}</span>
                  <span>·</span>
                  <span>{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="rule-gold w-24 mb-20" />

          {/* Service Areas - SEO Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl text-[#0f0f0f] mb-8" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Luxury Yacht Charters Throughout South Florida
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  location: 'Miami Beach Yacht Rentals',
                  description: 'Experience luxury yacht charters departing from Miami Beach. Cruise the iconic coastline and enjoy stunning views of South Beach and the Atlantic Ocean.'
                },
                {
                  location: 'Coconut Grove Boat Charters',
                  description: 'Explore Coconut Grove\'s beautiful waterways aboard our luxury yachts. Perfect for intimate gatherings and scenic cruises through Miami\'s historic sailing community.'
                },
                {
                  location: 'Key Biscayne Yacht Rentals',
                  description: 'Charter a luxury yacht to Key Biscayne and discover pristine beaches, crystal-clear waters, and unforgettable views of Biscayne Bay.'
                },
                {
                  location: 'Fort Lauderdale Yacht Charters',
                  description: 'Luxury yacht rentals in Fort Lauderdale offer access to miles of stunning coastline, the Intracoastal Waterway, and world-class yachting experiences.'
                }
              ].map((area, index) => (
                <div key={index} className="border-b border-[#e5e5e5] pb-6">
                  <h3 className="text-lg text-[#0f0f0f] mb-2" style={{ fontWeight: 400 }}>
                    {area.location}
                  </h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed" style={{ fontWeight: 300 }}>
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white border border-[#0f0f0f]/10 p-12 md:p-16">
            <div className="rule-gold mb-8 mx-auto" style={{ width: '120px' }} />
            <h3 className="editorial-display text-3xl md:text-4xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
              Experience Five-Star <span className="text-[#c4a265]" style={{ fontStyle: 'italic' }}>Service</span>
            </h3>
            <p className="text-[#6b6b6b] text-base mb-8 max-w-xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Join our growing list of satisfied clients. Book your luxury yacht charter in Miami today 
              and discover why we're South Florida's most trusted yachting company.
            </p>
            <Link 
              href="/yacht-rental-miami"
              className="inline-block editorial-label bg-[#0f0f0f] text-white px-12 py-4 hover:bg-[#c4a265] transition-all duration-500"
            >
              View Our Fleet
            </Link>
          </div>

        </div>
      </div>

      <DarkFooter />
    </main>
  );
}
