export default function YachtRentalMiami() {
  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <h1 className="text-5xl font-light mb-8 text-[#0f0f0f]">
          Rent a Yacht in Miami
        </h1>
        <p className="text-lg text-[#6b6b6b] mb-12 font-light">
          Explore our fleet of luxury yachts available for charter in Miami.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 37 Axopar */}
          <a href="/yacht-rental-miami/37-axopar" className="group">
            <div className="bg-white border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gray-200">
                <img 
                  src="/images/yachts/37-axopar/photo-01.webp" 
                  alt="37 ft Axopar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-[#0f0f0f] mb-2">37 ft Axopar</h3>
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Day Boat • 13 Guests</p>
              </div>
            </div>
          </a>

          {/* 27 Regal */}
          <a href="/yacht-rental-miami/27-regal" className="group">
            <div className="bg-white border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gray-200">
                <img 
                  src="/images/yachts/27-regal/photo-01.webp" 
                  alt="27 ft Regal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-[#0f0f0f] mb-2">27 ft Regal</h3>
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Bowrider • 10 Guests</p>
              </div>
            </div>
          </a>

          {/* 116 Pershing */}
          <a href="/yacht-rental-miami/116-pershing" className="group">
            <div className="bg-white border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gray-200">
                <img 
                  src="/images/yachts/116-pershing/photo-01.webp" 
                  alt="116 ft Pershing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-[#0f0f0f] mb-2">116 ft Pershing</h3>
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Superyacht • 12 Guests</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
