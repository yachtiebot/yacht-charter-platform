import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen min-h-[700px] relative flex flex-col">
        {/* Background Yacht Photo */}
        <div className="absolute inset-0">
          <img
            src="/images/Miami_Yachting_Company_header-yacht-image.jpg"
            alt="Miami Yachting Company luxury yacht charter in Miami"
            className="w-full h-full object-cover"
            width="2158"
            height="1440"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent" />
        
        {/* Content - Anchored to Bottom */}
        <div className="relative z-10 flex-1 flex flex-col justify-end">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
              {/* Left Column - 60% */}
              <div className="lg:col-span-7">
                <div className="rule-gold" />
                <h1 className="editorial-display text-white mb-6" style={{fontSize: '3.5rem'}}>
                  Private Yacht<br />
                  Charters in<br />
                  <span className="text-[#c4a265]" style={{textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)'}}>Miami</span>
                </h1>
                <p className="text-white/70 text-lg max-w-lg" style={{ fontWeight: 300 }}>
                  A curated fleet of privately owned vessels, hand selected for comfort, style, and exceptional guest experiences.
                </p>
              </div>
              
              {/* Right Column - 40% */}
              <div className="lg:col-span-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="editorial-stat text-[#c4a265] mb-2">4.9</div>
                    <div className="editorial-label text-white">Google Stars</div>
                  </div>
                  <div>
                    <div className="editorial-stat text-white mb-2">1,500+</div>
                    <div className="editorial-label text-white">Reviews</div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link
                    href="/yacht-rental-miami"
                    className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500"
                  >
                    View Fleet
                  </Link>
                  <Link
                    href="/contact"
                    className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
          <div className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</div>
          <div className="w-[1px] h-6 bg-white/30" />
        </div>

        {/* Bottom Editorial Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-2 md:py-3 flex justify-center md:justify-between items-center">
            <div className="hidden md:flex editorial-label text-white/40 flex-wrap gap-2 items-center text-[11px] leading-[1.6]">
              <span>Miami</span>
              <span>·</span>
              <span>Miami Beach</span>
              <span>·</span>
              <span>Key Biscayne</span>
              <span>·</span>
              <span>Coconut Grove</span>
              <span>·</span>
              <span>Hollywood</span>
              <span>·</span>
              <span>Fort Lauderdale</span>
            </div>
            <div className="editorial-label text-[#c4a265] text-[10px] md:text-[10px] leading-[1.6] whitespace-nowrap">
              Best Boat Charter · Readers' Choice Award
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Fleet Overview */}
      <section className="bg-[#faf9f7]" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8" style={{ marginBottom: '48px' }}>
            <div className="lg:max-w-md">
              <div className="rule-gold" />
              <h2 className="editorial-headline text-[#0f0f0f]">
                The Fleet
              </h2>
            </div>
            <p className="editorial-body text-[#6b6b6b] lg:max-w-lg">
              Every vessel is privately owned, hand-picked for quality, and backed by outstanding guest reviews.
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Day Boats */}
            <Link href="/yacht-rental-miami" className="group relative aspect-square overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_fleet-dayboats-vandutch40.jpg"
                alt="Day Boats"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-1.5 backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded inline-block" style={{textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)'}}>20–40 FT</div>
                <h3 className="editorial-card-name text-white mb-3">Day Boats</h3>
                <p className="editorial-small text-white/60 mb-3">Casual elegance for sandbar days and sunset cruises.</p>
                <div className="flex justify-between items-center">
                  <div className="editorial-label text-white/50">From $700</div>
                  <div className="editorial-label text-white flex items-center gap-2">
                    <span>View Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Luxury Yachts */}
            <Link href="/yacht-rental-miami" className="group relative aspect-square overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_fleet-luxury-azimut55.jpg"
                alt="Luxury Yachts"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-1.5 backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded inline-block" style={{textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)'}}>40–80 FT</div>
                <h3 className="editorial-card-name text-white mb-3">Luxury Yachts</h3>
                <p className="editorial-small text-white/60 mb-3">Premium amenities for celebrations and corporate occasions.</p>
                <div className="flex justify-between items-center">
                  <div className="editorial-label text-white/50">From $1,250</div>
                  <div className="editorial-label text-white flex items-center gap-2">
                    <span>View Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Superyachts */}
            <Link href="/yacht-rental-miami" className="group relative aspect-square overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_fleet-superyacht.jpg"
                alt="Superyachts"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-1.5 backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded inline-block" style={{textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)'}}>80 FT+</div>
                <h3 className="editorial-card-name text-white mb-3">Superyachts</h3>
                <p className="editorial-small text-white/60 mb-3">Expansive layouts with private staterooms and luxury features.</p>
                <div className="flex justify-between items-center">
                  <div className="editorial-label text-white/50">From $3,200</div>
                  <div className="editorial-label text-white flex items-center gap-2">
                    <span>View Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* View Complete Fleet */}
            <Link href="/yacht-rental-miami" className="group relative aspect-square overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_fleet-complete-fleet.jpg"
                alt="Complete Fleet"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-1.5 backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded inline-block" style={{textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)'}}>ALL SIZES</div>
                <h3 className="editorial-card-name text-white mb-3">View Full Fleet</h3>
                <p className="editorial-small text-white/60 mb-3">See all boats</p>
                <div className="flex justify-between items-center">
                  <div className="editorial-label text-white/50"></div>
                  <div className="editorial-label text-white flex items-center gap-2">
                    <span>View Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Reviews Section - Clean Logos Only */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-8">
              {/* Yelp Reviews */}
              <a 
                href="https://www.yelp.com/biz/miami-yachting-company-miami-beach" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity duration-300"
              >
                <img 
                  src="/images/Miami_Yachting_Company_reviews-yelp-5star.jpg" 
                  alt="Yelp Reviews" 
                  className="h-14 w-auto object-contain opacity-60"
                />
              </a>

              {/* TripAdvisor Reviews */}
              <a 
                href="https://www.tripadvisor.com/Attraction_Review-g34439-d6721470-Reviews-Miami_Yachting_Company-Miami_Beach_Florida.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity duration-300"
              >
                <img 
                  src="/images/Miami_Yachting_Company_reviews-tripadvisor-5.jpg" 
                  alt="TripAdvisor Reviews" 
                  className="h-14 w-auto object-contain opacity-60"
                />
              </a>

              {/* Google Reviews */}
              <a 
                href="https://maps.app.goo.gl/53k76h5DT28dVFUs9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity duration-300"
              >
                <img 
                  src="/images/Miami_Yachting_Company_reviews-google-reviews.jpg" 
                  alt="Google Reviews" 
                  className="h-14 w-auto object-contain opacity-60"
                />
              </a>

              {/* IYBA Member */}
              <div className="hover:opacity-100 transition-opacity duration-300">
                <img 
                  src="/images/Miami_Yachting_Company_reviews-iyba.jpg" 
                  alt="IYBA Member" 
                  className="h-14 w-auto object-contain opacity-60"
                />
              </div>

              {/* Best of Miami 2025 */}
              <div className="hover:opacity-100 transition-opacity duration-300">
                <img 
                  src="/images/Miami_Yachting_Company_reviews-best-of-miami-2025.jpg" 
                  alt="Best of Miami 2025 Winner" 
                  className="h-14 w-auto object-contain opacity-60"
                />
              </div>
            </div>

          {/* Testimonial Quote */}
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-[#d4d4d4] mb-6" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.6 }}>
              "From the moment we stepped on the boat our expectations were exceeded!!!"
            </p>
            <p className="text-base text-[#b8b8b8]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              — Nicole N. from TripAdvisor
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="https://www.tripadvisor.com/Attraction_Review-g34439-d6721470-Reviews-Miami_Yachting_Company-Miami_Beach_Florida.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#e5e5e5] text-[#9ca3af] px-8 py-3 hover:border-[#c4a265] hover:text-[#c4a265] transition-all duration-300"
              style={{ fontFamily: 'var(--font-roboto-mono), monospace', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              View Customer Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="bg-[#faf9f7]" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="mb-12">
            <div className="rule-gold" />
            <h2 className="editorial-headline text-[#0f0f0f] mb-4">
              Experiences
            </h2>
            <p className="editorial-body text-[#6b6b6b] max-w-2xl">
              Every charter is tailored to the occasion. Tell us what you're celebrating and we'll match you with the perfect vessel and itinerary.
            </p>
          </div>

          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sightseeing */}
            <Link href="/experiences/sightseeing" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_experiences-sightseeing.jpg"
                alt="Sightseeing"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Sightseeing</h3>
                <p className="editorial-small text-white/60 mb-2">Star Island, Venetian Islands, Miami River. The classic cruise past celebrity estates and iconic skyline views.</p>
                <div className="inline-block editorial-label text-white/70 text-[10px] border border-white/30 px-3 py-1">
                  4+ Hours
                </div>
              </div>
            </Link>

            {/* Celebrations */}
            <Link href="/experiences/celebrations" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_experiences-celebrations.jpg"
                alt="Celebrations"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Celebrations</h3>
                <p className="editorial-small text-white/60 mb-2">Birthday parties, engagements, anniversaries. Custom-tailored experiences for your most important moments.</p>
                <div className="inline-block editorial-label text-white/70 text-[10px] border border-white/30 px-3 py-1">
                  4 to 8 Hours
                </div>
              </div>
            </Link>

            {/* Corporate */}
            <Link href="/experiences/corporate" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_experiences-corporate.jpg"
                alt="Corporate"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Corporate</h3>
                <p className="editorial-small text-white/60 mb-2">Executive retreats, client entertainment, team building. Professional experiences that impress and inspire.</p>
                <div className="inline-block editorial-label text-white/70 text-[10px] border border-white/30 px-3 py-1">
                  4 to 8 Hours
                </div>
              </div>
            </Link>

            {/* Sandbars & Beyond */}
            <Link href="/experiences/sandbars" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_experiences-sandbars-beyond.jpg"
                alt="Sandbars & Beyond"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Sandbars & Beyond</h3>
                <p className="editorial-small text-white/60 mb-2">Anchor at Miami's most famous sandbars or explore farther in South Florida's warm tropical waters.</p>
                <div className="inline-block editorial-label text-white/70 text-[10px] border border-white/30 px-3 py-1">
                  6+ Hours
                </div>
              </div>
            </Link>

            {/* Bachelorette Party */}
            <Link href="/experiences/bachelorette" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_bachelorette.jpg"
                alt="Miami Yachting Company bachelorette party yacht charter in Miami"
                className="img-zoom w-full h-full object-cover"
                width="1200"
                height="900"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Bachelorette Party</h3>
                <p className="editorial-small text-white/60 mb-2">Celebrate your last sail before the veil. Unforgettable experiences on Miami's most beautiful waters.</p>
                <div className="inline-block editorial-label text-white/70 text-[10px] border border-white/30 px-3 py-1">
                  4 to 8 Hours
                </div>
              </div>
            </Link>

            {/* Large Group Charters */}
            <Link href="/experiences/large-groups" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_experiences-large-groups.jpg"
                alt="Large Group Charters"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Large Group Charters</h3>
                <p className="editorial-small text-white/60 mb-2">Impress clients and reward teams. Premium vessels with full charter and administrative support.</p>
                <div className="inline-block editorial-label text-white/70 text-[10px] border border-white/30 px-3 py-1">
                  Up to 140 Guests
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Departure Points Section */}
      <section id="departure-points" className="bg-[#0d0d0d]" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="mb-12">
            <div className="rule-gold" />
            <h2 className="editorial-headline text-white mb-4">
              Departure Points
            </h2>
            <p className="editorial-body text-white/60 max-w-2xl">
              Charter from six locations across South Florida. Each offers unique access to Miami's most iconic waterways and destinations.
            </p>
          </div>

          {/* Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Miami */}
            <Link href="/locations/miami" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_departures-miami.jpg"
                alt="Miami"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Miami</h3>
                <p className="editorial-small text-white/60">Depart from the heart of downtown Miami with skyline views from the start.</p>
              </div>
            </Link>

            {/* Miami Beach */}
            <Link href="/locations/miami-beach" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_departures-miami-beach.jpg"
                alt="Miami Beach"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Miami Beach</h3>
                <p className="editorial-small text-white/60">Step aboard in iconic Miami Beach. Art Deco luxury glamour. The gateway to warm waters and Miami's most celebrated departure point.</p>
              </div>
            </Link>

            {/* Key Biscayne */}
            <Link href="/locations/key-biscayne" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_departures-key-biscayne.jpg"
                alt="Key Biscayne"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Key Biscayne</h3>
                <p className="editorial-small text-white/60">Tropical warm waters, small islands and sandbars. Miami's best kept secrets.</p>
              </div>
            </Link>

            {/* Coconut Grove */}
            <Link href="/locations/coconut-grove" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_departures-coconut-grove.jpg"
                alt="Coconut Grove"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Coconut Grove</h3>
                <p className="editorial-small text-white/60">A relaxed tropical departure point with easy access to Biscayne Bay.</p>
              </div>
            </Link>

            {/* Hollywood */}
            <Link href="/locations/hollywood" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_departures-hollywood.jpg"
                alt="Hollywood"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Hollywood</h3>
                <p className="editorial-small text-white/60">A convenient South Florida departure between Miami and Fort Lauderdale.</p>
              </div>
            </Link>

            {/* Fort Lauderdale */}
            <Link href="/locations/fort-lauderdale" className="group relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/Miami_Yachting_Company_departures-fort-lauderdale.jpg"
                alt="Fort Lauderdale"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="editorial-card-name text-white mb-2">Fort Lauderdale</h3>
                <p className="editorial-small text-white/60">The yachting capital of the world. Access to Intracoastal waterways and open ocean.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Our Philosophy */}
      <section className="bg-[#0d0d0d]" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Photo */}
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src="/images/Miami_Yachting_Company_philosophy-yacht.jpg"
                alt="Our Philosophy"
                className="img-zoom w-full h-full object-cover"
              />
            </div>

            {/* Right: Text */}
            <div>
              <div className="rule-gold" />
              <div className="editorial-label text-[#c4a265] mb-6">Our Philosophy</div>
              <h2 className="editorial-subhead text-white mb-4">
                Not a Crowded Marketplace.
              </h2>
              <h2 className="editorial-subhead-italic text-white mb-8">
                A Curated Collection.
              </h2>
              <p className="editorial-body text-white/60 mb-6">
                We don't list every boat in Miami. We hand select each vessel based on condition, presentation, guest feedback, and operational reliability. With 30+ years of collective South Florida yachting experience, we know which yachts deliver and which don't.
              </p>
              
              <ul className="space-y-3">
                <li className="editorial-body text-white/60 flex items-center gap-3">
                  <span className="text-[#c4a265]">—</span>
                  <span>Every yacht personally vetted</span>
                </li>
                <li className="editorial-body text-white/60 flex items-center gap-3">
                  <span className="text-[#c4a265]">—</span>
                  <span>Transparent pricing, no hidden fees</span>
                </li>
                <li className="editorial-body text-white/60 flex items-center gap-3">
                  <span className="text-[#c4a265]">—</span>
                  <span>Booking support & charter coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Award Section */}
      <section className="bg-[#0d0d0d] border-t border-white/5" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Award Box */}
            <div className="border border-white/10 p-12 flex flex-col items-center text-center">
              <div className="rule-gold mx-auto" />
              <div className="editorial-label text-[#c4a265] mb-6">Miami New Times</div>
              <h3 className="editorial-subhead text-white mb-4">
                Best Boat Charter
              </h3>
              <div className="editorial-label text-white/40 mb-12">Readers' Choice Award</div>
              
              <div className="flex items-center gap-8">
                <div>
                  <div className="editorial-year text-[#c4a265] mb-2">2024</div>
                  <div className="editorial-label text-white/50">Winner</div>
                </div>
                <div className="w-[1px] h-16 bg-white/10" />
                <div>
                  <div className="editorial-year text-[#c4a265] mb-2">2025</div>
                  <div className="editorial-label text-white/50">Winner</div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex flex-col justify-center">
              <div className="rule-gold" />
              <h3 className="editorial-subhead text-white mb-4">
                Recognized by Miami's<br />
                <span className="editorial-subhead-italic">Most Trusted Voice</span>
              </h3>
              <p className="editorial-body text-white/60 mb-8">
                Back-to-back wins from Miami New Times readers — the city's most discerning voices on where to eat, drink, and play.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="editorial-year text-white mb-2">4.9</div>
                  <div className="editorial-label text-white">Google Stars</div>
                </div>
                <div>
                  <div className="editorial-year text-white mb-2">1,500+</div>
                  <div className="editorial-label text-white">Verified Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Sponsors Carousel */}
      <section className="bg-white overflow-x-hidden" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 text-center">
          <div className="rule-gold mx-auto" />
          <h2 className="text-[#0f0f0f] mb-4 text-[26px] md:text-[45px] font-normal" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Proud Service Providers To:
          </h2>
          <p className="editorial-body text-[#6b6b6b] max-w-2xl mx-auto">
            Trusted by industry leaders for exclusive events and corporate experiences.
          </p>
        </div>
        
        {/* Infinite Scroll Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 md:gap-16 animate-scroll whitespace-nowrap">
            {/* First set of logos */}
            <img src="/images/Miami_Yachting_Company_sponsors-adidas.jpg" alt="Adidas" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-chanel.jpg" alt="Chanel" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-amex.jpg" alt="American Express" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-nike.jpg" alt="Nike" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-cisco.jpg" alt="Cisco" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-redbull.jpg" alt="Red Bull" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-starbucks.jpg" alt="Starbucks" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-sony.jpg" alt="Sony" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-spotify.jpg" alt="Spotify" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-tiffany.jpg" alt="Tiffany & Co." className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            
            {/* Duplicate set for seamless loop */}
            <img src="/images/Miami_Yachting_Company_sponsors-adidas.jpg" alt="Adidas" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-chanel.jpg" alt="Chanel" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-amex.jpg" alt="American Express" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-nike.jpg" alt="Nike" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-cisco.jpg" alt="Cisco" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-redbull.jpg" alt="Red Bull" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-starbucks.jpg" alt="Starbucks" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-sony.jpg" alt="Sony" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-spotify.jpg" alt="Spotify" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src="/images/Miami_Yachting_Company_sponsors-tiffany.jpg" alt="Tiffany & Co." className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/Miami_Yachting_Company_cta-background.jpg"
            alt="Get on the water"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center w-full">
          <div className="rule-gold mx-auto" />
          <h2 className="editorial-headline text-white mb-6 max-w-3xl mx-auto">
            Ready to Get on the Water?
          </h2>
          <p className="editorial-body text-white/90 mb-10 max-w-2xl mx-auto" style={{fontWeight: 400}}>
            Our team can help match you with the perfect vessel for your occasion.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-2xl mx-auto">
            <a
              href="tel:18007479585"
              className="editorial-label bg-white/25 backdrop-blur-lg text-white px-8 py-4 hover:bg-[#c4a265] transition-all duration-500 flex-1 text-center border border-white/30"
            >
              1 800 747 9585
            </a>
            <a
              href="https://wa.me/message/T7LESNSS34RWJ1"
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
                src="/images/Miami_Yachting_Company_myc-logo.png" 
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
