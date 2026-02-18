import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen min-h-[700px] relative flex flex-col">
        {/* Background Yacht Photo */}
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/d/1YM9nHM8WZ-w9GVag2N4Ryu96tncJjXUA"
            alt="60ft Azimut Bravo"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent" />
        
        {/* Content - Anchored to Bottom */}
        <div className="relative z-10 flex-1 flex flex-col justify-end">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              {/* Left Column - 60% */}
              <div className="lg:col-span-7">
                <div className="rule-gold" />
                <h1 className="editorial-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 font-extralight">
                  Private Yacht<br />
                  Charters in<br />
                  <span className="text-[#c4a265]">Miami</span>
                </h1>
                <p className="text-white/70 text-base md:text-lg max-w-lg">
                  A curated fleet of privately owned vessels, hand selected for comfort, style, and exceptional guest experiences.
                </p>
              </div>
              
              {/* Right Column - 40% */}
              <div className="lg:col-span-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="editorial-display text-[3rem] text-white mb-2">4.9</div>
                    <div className="editorial-label text-white/50" style={{ fontSize: '12px', fontWeight: 500 }}>Google Stars</div>
                  </div>
                  <div>
                    <div className="editorial-display text-[3rem] text-white mb-2">1,400+</div>
                    <div className="editorial-label text-white/50" style={{ fontSize: '12px', fontWeight: 500 }}>Reviews</div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/yacht-rental-miami"
                    className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  >
                    View Fleet
                  </Link>
                  <Link
                    href="/contact"
                    className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Editorial Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-wrap justify-between items-center gap-4">
            <div className="editorial-label text-white/40 flex flex-wrap gap-2 items-center">
              <span>Miami</span>
              <span>·</span>
              <span>Miami Beach</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Key Biscayne</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Coconut Grove</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Fort Lauderdale</span>
            </div>
            <div className="editorial-label text-[#c4a265]">
              Best Boat Charter · Readers' Choice Award
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Fleet Overview */}
      <section className="bg-[#faf9f7] py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-20">
            <div className="lg:max-w-md">
              <div className="rule-gold" />
              <h2 className="editorial-display text-4xl md:text-5xl text-[#0f0f0f]">
                The Fleet
              </h2>
            </div>
            <p className="text-[#6b6b6b] lg:max-w-lg">
              Every vessel is privately owned, hand-picked for quality, and backed by outstanding guest reviews.
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Day Boats */}
            <Link href="/yacht-rental-miami" className="group relative aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=90"
                alt="Day Boats"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-3">20–40 FT</div>
                <h3 className="editorial-display text-3xl md:text-4xl text-white mb-3">Day Boats</h3>
                <p className="text-white/60 text-sm mb-3">Casual elegance for sandbar days and sunset cruises.</p>
                <div className="editorial-label text-white/50">From $700</div>
              </div>
            </Link>

            {/* Luxury Yachts */}
            <Link href="/yacht-rental-miami" className="group relative aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=90"
                alt="Luxury Yachts"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-3">40–80 FT</div>
                <h3 className="editorial-display text-3xl md:text-4xl text-white mb-3">Luxury Yachts</h3>
                <p className="text-white/60 text-sm mb-3">Premium amenities for celebrations and corporate occasions.</p>
                <div className="editorial-label text-white/50">From $1,250</div>
              </div>
            </Link>

            {/* Superyachts */}
            <Link href="/yacht-rental-miami" className="group relative aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=90"
                alt="Superyachts"
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="editorial-label text-[#c4a265] mb-3">80 FT+</div>
                <h3 className="editorial-display text-3xl md:text-4xl text-white mb-3">Superyachts</h3>
                <p className="text-white/60 text-sm mb-3">The pinnacle of yachting. Unmatched space and premium amenities.</p>
                <div className="editorial-label text-white/50">From $3,200</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Our Philosophy */}
      <section className="bg-[#0d0d0d] py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Photo */}
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=90"
                alt="Our Philosophy"
                className="img-zoom w-full h-full object-cover"
              />
            </div>

            {/* Right: Text */}
            <div>
              <div className="rule-gold" />
              <div className="editorial-label text-[#c4a265] mb-6">Our Philosophy</div>
              <h2 className="editorial-display text-4xl md:text-5xl text-white mb-4">
                Not a Crowded Marketplace.
              </h2>
              <h2 className="editorial-display text-4xl md:text-5xl text-white mb-8 italic">
                A Curated Collection.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                We don't list every boat in Miami. We hand select each vessel based on condition, presentation, guest feedback, and operational reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Award Section */}
      <section className="bg-[#0d0d0d] py-28 md:py-36 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Award Box */}
            <div className="border border-white/10 p-12 flex flex-col items-center text-center">
              <div className="rule-gold mx-auto" />
              <div className="editorial-label text-[#c4a265] mb-6">Miami New Times</div>
              <h3 className="editorial-display text-4xl md:text-5xl text-white mb-4">
                Best Boat Charter
              </h3>
              <div className="editorial-label text-white/40 mb-12">Readers' Choice Award</div>
              
              <div className="flex items-center gap-8">
                <div>
                  <div className="editorial-display text-[3rem] text-[#c4a265] mb-2">2024</div>
                  <div className="editorial-label text-white/50">Winner</div>
                </div>
                <div className="w-[1px] h-16 bg-white/10" />
                <div>
                  <div className="editorial-display text-[3rem] text-[#c4a265] mb-2">2025</div>
                  <div className="editorial-label text-white/50">Winner</div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex flex-col justify-center">
              <div className="rule-gold" />
              <h3 className="editorial-display text-4xl md:text-5xl text-white mb-4">
                Recognized by Miami's<br />
                <span className="italic">Most Trusted Voice</span>
              </h3>
              <p className="text-white/60 mb-8 text-lg leading-relaxed">
                Back-to-back wins from Miami New Times readers — the city's most discerning voices on where to eat, drink, and play.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="editorial-display text-[3rem] text-white mb-2">4.9</div>
                  <div className="editorial-label text-white/50" style={{ fontSize: '12px', fontWeight: 500 }}>Google Stars</div>
                </div>
                <div>
                  <div className="editorial-display text-[3rem] text-white mb-2">1,400+</div>
                  <div className="editorial-label text-white/50" style={{ fontSize: '12px', fontWeight: 500 }}>Verified Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
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
            Ready to Get on the Water?
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

      {/* Footer */}
      <footer className="bg-[#0f0f0f] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="text-white mb-4">Miami Yachting Company</div>
              <p className="text-white/40 text-sm mb-6">
                A curated fleet of privately owned vessels for Miami yacht charters.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Instagram</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Facebook</a>
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
              © 2025 Miami Yachting Company. All rights reserved.
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
