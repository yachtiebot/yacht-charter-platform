import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-[min(15vw,110px)] leading-[0.95] mb-8 text-slate-900">
            Private Yacht<br />Charters in<br />Miami
          </h1>
          <p className="text-[min(4vw,22px)] text-slate-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            A curated fleet of privately owned vessels, hand selected for comfort,<br className="hidden md:block" /> 
            style, and exceptional guest experiences.
          </p>
          <Link
            href="/fleet"
            className="inline-block px-12 py-4 bg-slate-900 text-white text-sm tracking-[0.1em] uppercase hover:bg-slate-800 transition-all"
          >
            Explore Fleet
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-6xl md:text-7xl mb-3 text-slate-900">4.9</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Google Stars</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl mb-3 text-slate-900">1,400+</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Verified Reviews</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl mb-3 text-slate-900">30+</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl mb-3 text-slate-900">2012</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Established</div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-xs tracking-[0.2em] text-slate-400 mb-8 uppercase">Our Philosophy</p>
            <h2 className="text-5xl md:text-7xl mb-12 text-slate-900 leading-tight">
              Not a Crowded<br />Marketplace.<br />A Curated Collection.
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We don't list every boat in Miami. We hand select each vessel based on condition, 
              presentation, guest feedback, and operational reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 mt-24">
            <div className="text-center space-y-4">
              <div className="text-slate-900 text-base">Every yacht personally vetted</div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Hand selected for quality and guest satisfaction
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-slate-900 text-base">Transparent pricing, no hidden fees</div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Clear communication from start to finish
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-slate-900 text-base">Booking support & charter coordination</div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Expert guidance every step of the way
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.2em] text-slate-400 mb-8 uppercase">Departure Locations</p>
            <h2 className="text-5xl md:text-6xl text-slate-900 mb-8">
              Five Locations Across<br />South Florida
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              'Miami Beach',
              'Key Biscayne',
              'Fort Lauderdale',
              'Coconut Grove',
              'Hollywood',
            ].map((location) => (
              <Link
                key={location}
                href={`/fleet?location=${encodeURIComponent(location)}`}
                className="group"
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                    <span className="text-white text-xl text-center px-4">{location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Award */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-8 py-3 border border-slate-300 mb-12">
            <span className="text-xs tracking-[0.2em] text-slate-600 uppercase">Miami New Times</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl mb-12 text-slate-900">
            Best Boat Charter<br />
            <span className="text-3xl text-slate-500">Readers' Choice Award</span>
          </h2>
          
          <div className="flex justify-center gap-16 mb-12">
            <div>
              <div className="text-5xl mb-3 text-slate-900">2024</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Winner</div>
            </div>
            <div>
              <div className="text-5xl mb-3 text-slate-900">2025</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Winner</div>
            </div>
          </div>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Voted Best Boat Charter in Miami two years running. This recognition reflects our 
            commitment to curating exceptional yacht experiences.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-6 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl mb-12 leading-tight">
            Ready to Get<br />on the Water?
          </h2>
          <p className="text-xl text-white/80 mb-16 leading-relaxed max-w-xl mx-auto">
            Tell us about your ideal day and we'll match you with the perfect yacht.
          </p>
          <Link
            href="/fleet"
            className="inline-block px-12 py-4 bg-white text-slate-900 text-sm tracking-[0.1em] uppercase hover:bg-slate-100 transition-all"
          >
            Explore Fleet
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-center">
        <p className="text-slate-400 text-sm">
          © 2012–2026 Miami Yachting Company®
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Best of Miami 2024 & 2025 · 4.9★ Google
        </p>
      </footer>
    </div>
  );
}
