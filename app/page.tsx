import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-[#faf9f7]">
      {/* Hero Section - Full Screen */}
      <section className="h-screen min-h-[700px] relative flex items-end">
        {/* Background Image - Dark moody yacht photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
          {/* TODO: Replace with actual dark yacht hero image */}
        </div>
        
        {/* Gradient Overlay - Dark at bottom, transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />
        
        {/* Content - Bottom Aligned */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-16">
            {/* Left Column - Headline */}
            <div className="lg:col-span-7">
              <div className="w-[60px] h-[1px] bg-[#c4a265] mb-6" />
              <h1 className="editorial-display text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-6">
                Private Yacht<br />
                Charters in<br />
                <span className="text-[#c4a265]">Miami</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mt-6">
                A curated fleet of privately owned vessels, hand selected for comfort, style, and exceptional guest experiences.
              </p>
            </div>
            
            {/* Right Column - Stats & Buttons */}
            <div className="lg:col-span-5">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="editorial-display text-4xl md:text-5xl text-white mb-2">4.9</div>
                  <div className="editorial-label text-white/50">Google Stars</div>
                </div>
                <div>
                  <div className="editorial-display text-4xl md:text-5xl text-white mb-2">1,400+</div>
                  <div className="editorial-label text-white/50">Reviews</div>
                </div>
              </div>
              
              {/* Both buttons solid white */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/fleet"
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
        
        {/* Bottom Editorial Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-wrap justify-between items-center gap-4">
            <div className="editorial-label text-white/40 flex flex-wrap gap-2 items-center">
              <span className="hidden md:inline">Miami</span>
              <span className="hidden md:inline">·</span>
              <span>Miami Beach</span>
              <span>·</span>
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

      {/* Fleet Overview Section */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5">
              <div className="rule-gold mb-6" />
              <h2 className="editorial-display text-4xl md:text-5xl">
                Every vessel is privately owned, hand-picked for quality.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 flex items-end">
              <p className="text-[#6b6b6b]">
                With 30+ years of collective South Florida yachting experience, we know which yachts deliver and which don't. Every charter is backed by outstanding guest reviews.
              </p>
            </div>
          </div>

          {/* Fleet Cards - Placeholder for when vessels exist */}
          <div className="text-center py-20">
            <p className="text-[#6b6b6b] mb-6">Fleet vessels will appear here once added to the database.</p>
            <Link href="/fleet" className="editorial-label text-[#c4a265] hover:text-[#4e7483] transition-colors">
              View All Vessels
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Dark */}
      <section className="bg-[#0d0d0d] py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Photo */}
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                {/* TODO: Replace with actual yacht photo */}
              </div>
            </div>
            
            {/* Text */}
            <div className="lg:col-span-4">
              <div className="rule-gold mb-6" />
              <div className="editorial-label text-[#c4a265] mb-6">Our Philosophy</div>
              <h2 className="editorial-display text-4xl md:text-5xl text-white mb-8">
                Not a Crowded <span className="italic">Marketplace</span>. A Curated Collection.
              </h2>
              <p className="text-white/60 mb-6">
                We don't list every boat in Miami. We hand select each vessel based on condition, presentation, guest feedback, and operational reliability.
              </p>
              <ul className="space-y-4 text-white/50 text-sm">
                <li>• Every yacht personally vetted</li>
                <li>• Transparent pricing, no hidden fees</li>
                <li>• Booking support & charter coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Award Section - Dark */}
      <section className="bg-[#0d0d0d] py-28 md:py-36 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Award Card */}
            <div className="lg:col-span-5">
              <div className="border border-white/10 p-12 md:p-16 text-center">
                <div className="rule-gold mx-auto mb-6" />
                <div className="editorial-label text-[#c4a265] mb-4">Miami New Times</div>
                <h3 className="editorial-display text-4xl text-white mb-2">Best Boat Charter</h3>
                <div className="editorial-label text-white/40 mb-8">Readers' Choice Award</div>
                
                <div className="flex justify-center items-center gap-8">
                  <div>
                    <div className="editorial-display text-5xl text-[#c4a265] mb-2">2024</div>
                    <div className="editorial-label text-white/30">Winner</div>
                  </div>
                  <div className="h-16 w-px bg-white/10" />
                  <div>
                    <div className="editorial-display text-5xl text-[#c4a265] mb-2">2025</div>
                    <div className="editorial-label text-white/30">Winner</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="rule-gold mb-6" />
              <h2 className="editorial-display text-4xl md:text-5xl text-white mb-8">
                Recognized by Miami's Most <em className="not-italic text-[#c4a265]">Trusted Voice</em>
              </h2>
              <p className="text-white/60 mb-12">
                Voted Best Boat Charter in Miami two years running by the readers of Miami New Times. This recognition reflects our commitment to curating exceptional yacht experiences: every vessel hand selected, every detail considered.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="editorial-display text-4xl text-white mb-2">4.9</div>
                  <div className="editorial-label text-white/40">Google Stars</div>
                </div>
                <div>
                  <div className="editorial-display text-4xl text-white mb-2">1,400+</div>
                  <div className="editorial-label text-white/40">Verified Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 md:py-36">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
          {/* TODO: Replace with actual yacht photo */}
        </div>
        <div className="absolute inset-0 bg-[#0f0f0f]/75" />
        
        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <div className="rule-gold mx-auto mb-6" />
          <h2 className="editorial-display text-4xl md:text-6xl text-white mb-6 max-w-3xl mx-auto">
            Ready to Get on the <em className="not-italic text-[#c4a265]">Water?</em>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto">
            Tell us about your ideal day and we'll match you with the perfect yacht. No obligation, no hidden fees. Just honest recommendations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fleet"
              className="editorial-label bg-white text-[#0f0f0f] px-10 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500"
            >
              View Fleet
            </Link>
            <Link
              href="/contact"
              className="editorial-label border border-white/30 text-white px-10 py-4 hover:bg-white/10 transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-4">
              <div className="text-white text-lg mb-4">Miami Yachting Company</div>
              <p className="text-white/40 text-sm mb-6">
                Curating exceptional yacht charter experiences across South Florida since 2012.
              </p>
            </div>
            
            {/* Charter Links */}
            <div className="md:col-span-2">
              <div className="editorial-label text-[#c4a265] mb-4">Charter</div>
              <ul className="space-y-3 text-sm">
                <li><Link href="/fleet" className="text-white/40 hover:text-white transition-colors">View Fleet</Link></li>
                <li><Link href="/locations" className="text-white/40 hover:text-white transition-colors">Locations</Link></li>
                <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors">Book Now</Link></li>
              </ul>
            </div>
            
            {/* Company Links */}
            <div className="md:col-span-2">
              <div className="editorial-label text-[#c4a265] mb-4">Company</div>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-white/40 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="md:col-span-3">
              <div className="editorial-label text-[#c4a265] mb-4">Contact</div>
              <div className="text-white/40 text-sm space-y-2">
                <div>1 800 747 9585</div>
                <div>info@miamiyachtingcompany.com</div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-wrap justify-between items-center gap-4">
            <div className="editorial-label text-white/30">
              © 2012–2026 Miami Yachting Company®
            </div>
            <div className="editorial-label text-white/30">
              Best of Miami 2024 & 2025 · 4.9★ Google
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
