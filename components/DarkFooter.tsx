import Link from 'next/link';

export default function DarkFooter() {
  return (
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
              <a href="#" className="text-white/40 hover:text-[#FF5A5F] transition-colors" aria-label="Yelp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.111 18.226c-.141.969-2.119 3.483-3.029 3.847-.311.124-.611.094-.85-.09-.154-.12-.314-.365-2.447-3.827l-.633-1.032c-.244-.37-.199-.857.104-1.229.297-.362.78-.494 1.229-.322.931.353 3.379 1.288 3.816 1.753.419.447.51.97.81 1.9zm-3.39-9.456c-.462-.481-1.917-1.208-2.842-1.465-.449-.125-.912.037-1.183.415-.275.384-.284.84-.01 1.192l.814 1.095c1.121 1.532 1.419 1.827 1.773 2.147.258.234.644.268.965.069.716-.424 2.285-2.429 2.603-3.181.316-.759.177-1.253-.12-1.272zm-5.832-6.39c-.913.363-2.91 2.875-3.061 3.84-.056.358.017.668.238.892.167.167.444.28 3.049 1.632l.979.493c.428.194.894.11 1.229-.229.331-.33.42-.807.226-1.211-.397-.832-1.281-2.691-1.713-3.128-.422-.428-.901-.544-1.947-.289zm-8.586 8.148c-.102-.942.376-3.682.744-4.342.133-.238.357-.393.62-.446.293-.06.579.03 3.485 1.379l1.086.505c.391.181.553.65.366 1.053-.191.407-.628.607-1.041.48l-3.778-1.156c-.333-.102-.7.024-.85.316-.315.618-1.179 3.313-1.362 3.861-.193.578-.272.847-.27.35z"/>
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#34E0A1] transition-colors" aria-label="TripAdvisor">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 4.039-10.429L24 6.647h-4.361a13.086 13.086 0 0 0-7.633-2.352zm-6 3.517a5.984 5.984 0 0 0-3.677 7.563A5.988 5.988 0 0 0 6.006 19.2a5.985 5.985 0 0 0 3.678-7.564 5.987 5.987 0 0 0-3.678-3.824zm11.988 0a5.985 5.985 0 0 0-3.677 3.824 5.987 5.987 0 0 0 3.677 7.564 5.988 5.988 0 0 0 3.678-3.825 5.985 5.985 0 0 0-3.678-7.563zM6.003 10.285a3.3 3.3 0 1 1 0 6.602 3.3 3.3 0 0 1 0-6.602zm11.992 0a3.3 3.3 0 1 1 0 6.602 3.3 3.3 0 0 1 0-6.602zm-11.992 1.44a1.86 1.86 0 1 0 0 3.72 1.86 1.86 0 0 0 0-3.72zm11.992 0a1.86 1.86 0 1 0 0 3.72 1.86 1.86 0 0 0 0-3.72z"/>
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Google">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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
          <div className="editorial-label text-[#c4a265] text-[9px] sm:text-[10px] whitespace-nowrap">
            Best Boat Charter · Readers' Choice Award
          </div>
        </div>
      </div>
    </footer>
  );
}
