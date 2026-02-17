import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900/60 z-10" />
        
        {/* Placeholder for hero image - using gradient for now */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900">
          {/* TODO: Replace with actual hero yacht image */}
        </div>

        <div className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-tight leading-tight">
            Private Yacht<br />Charters in Miami
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 opacity-95 max-w-3xl mx-auto">
            A curated fleet of privately owned vessels, hand selected for comfort, style, and exceptional guest experiences.
          </p>
          <Link
            href="/fleet"
            className="inline-block px-10 py-4 bg-white text-slate-900 hover:bg-slate-100 transition-all text-base font-light tracking-wide"
          >
            EXPLORE FLEET
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-light mb-3 text-slate-900">4.9</div>
              <div className="text-sm text-slate-600 font-light">Google Stars</div>
            </div>
            <div>
              <div className="text-5xl font-light mb-3 text-slate-900">1,400+</div>
              <div className="text-sm text-slate-600 font-light">Verified Reviews</div>
            </div>
            <div>
              <div className="text-5xl font-light mb-3 text-slate-900">30+</div>
              <div className="text-sm text-slate-600 font-light">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-light mb-3 text-slate-900">2012</div>
              <div className="text-sm text-slate-600 font-light">Established</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-widest text-slate-500 mb-4">OUR PHILOSOPHY</p>
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-slate-900 leading-tight">
              Not a Crowded Marketplace.<br />A Curated Collection.
            </h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              We don't list every boat in Miami. We hand select each vessel based on condition, 
              presentation, guest feedback, and operational reliability. With 30+ years of collective 
              South Florida yachting experience, we know which yachts deliver and which don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-light mb-3 text-slate-900">Every yacht personally vetted</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Hand selected for quality and guest satisfaction
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-light mb-3 text-slate-900">Transparent pricing</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                No hidden fees, clear communication
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-light mb-3 text-slate-900">Booking support</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Charter coordination from start to finish
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-widest text-slate-500 mb-4">DEPARTURE LOCATIONS</p>
            <h2 className="text-5xl font-light mb-6 text-slate-900">
              Five Locations Across<br />South Florida
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              Each offers unique access to Miami's most iconic waterways and destinations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'Miami Beach', desc: 'Iconic skyline views' },
              { name: 'Key Biscayne', desc: 'Pristine island escape' },
              { name: 'Fort Lauderdale', desc: 'Venice of America' },
              { name: 'Coconut Grove', desc: 'Historic waterfront' },
              { name: 'Hollywood', desc: 'Coastal paradise' },
              { name: 'Miami', desc: 'Downtown departure' },
            ].map((location) => (
              <Link
                key={location.name}
                href={`/fleet?location=${encodeURIComponent(location.name)}`}
                className="group relative"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  {/* TODO: Add location images */}
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/50 transition-all flex flex-col items-center justify-center text-white p-6">
                    <span className="text-2xl font-light mb-2">{location.name}</span>
                    <span className="text-sm opacity-90 font-light">{location.desc}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Award Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-block px-6 py-2 border border-slate-300 mb-6">
              <span className="text-sm tracking-widest text-slate-600">MIAMI NEW TIMES</span>
            </div>
            <h2 className="text-5xl font-light mb-6 text-slate-900 leading-tight">
              Best Boat Charter<br />
              <span className="text-3xl text-slate-600">Readers' Choice Award</span>
            </h2>
            <div className="flex justify-center gap-12 mb-8">
              <div>
                <div className="text-4xl font-light text-slate-900 mb-2">2024</div>
                <div className="text-sm text-slate-600">Winner</div>
              </div>
              <div>
                <div className="text-4xl font-light text-slate-900 mb-2">2025</div>
                <div className="text-sm text-slate-600">Winner</div>
              </div>
            </div>
          </div>
          <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            Voted Best Boat Charter in Miami two years running by the readers of Miami New Times. 
            This recognition reflects our commitment to curating exceptional yacht experiences.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-8 text-white leading-tight">
            Ready to Get<br />on the Water?
          </h2>
          <p className="text-xl text-white/80 font-light mb-12 leading-relaxed">
            Tell us about your ideal day and we'll match you with the perfect yacht. 
            No obligation, no hidden fees. Just honest recommendations.
          </p>
          <Link
            href="/fleet"
            className="inline-block px-10 py-4 bg-white text-slate-900 hover:bg-slate-100 transition-all text-base font-light tracking-wide"
          >
            EXPLORE FLEET
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950 text-center">
        <p className="text-slate-400 text-sm font-light">
          © 2012–2026 Miami Yachting Company®
        </p>
        <p className="text-slate-500 text-xs mt-2 font-light">
          Best of Miami 2024 & 2025 · 4.9★ Google
        </p>
      </footer>
    </div>
  );
}
