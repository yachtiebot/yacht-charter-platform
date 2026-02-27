'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneOptIn: false,
    preferredDate: '',
    departureTime: '',
    charterLength: '',
    guests: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission to support@miamiyachting.com
    // For now, just simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          phoneOptIn: false,
          preferredDate: '',
          departureTime: '',
          charterLength: '',
          guests: '',
          budget: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Hero Section */}
      <section className="h-screen min-h-[700px] relative flex items-end pt-24">
        <div className="absolute inset-0">
          <img
            src="https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/banners/Miami_Yachting_Company_contact_hero.webp"
            alt="Miami Yachting Company contact - luxury yacht charter"
            className="w-full h-full object-cover"
            width="2400"
            height="1600"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-32">
          <div className="rule-gold mb-6" />
          <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl mb-6" style={{ fontWeight: 300 }}>
            <div className="text-white" style={{ fontStyle: 'italic' }}>
              Get in
            </div>
            <div className="text-[#c4a265]">
              Touch
            </div>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl" style={{ fontWeight: 300 }}>
            Tell us about your ideal day on the water. We'll help make it happen.
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</div>
          <div className="w-[1px] h-6 bg-white/30" />
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN - Form */}
          <div>
            <div className="rule-gold mb-6" />
            <h1 className="text-3xl text-[#0f0f0f] mb-12" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Request a Quote
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="editorial-label text-[#6b6b6b] mb-2 block">PHONE (OPTIONAL)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                  style={{ fontWeight: 300 }}
                />
                {/* SMS Opt-in Disclaimer */}
                <div className="mt-3 flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="phoneOptIn"
                    id="phoneOptIn"
                    checked={formData.phoneOptIn}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265]"
                  />
                  <label htmlFor="phoneOptIn" className="text-[10px] text-[#6b6b6b] leading-tight" style={{ fontWeight: 300 }}>
                    Do you agree to opt-in to receive text messages? We only use your number to relay to you charter specific information about your booking. You may opt-out at anytime by replying "Stop".
                  </label>
                </div>
              </div>

              {/* Preferred Date, Departure Time, Charter Length */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">PREFERRED DATE *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">DEPARTURE TIME *</label>
                  <input
                    type="text"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 10:00 AM"
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">CHARTER LENGTH *</label>
                  <input
                    type="text"
                    name="charterLength"
                    value={formData.charterLength}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 4 hours"
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Guests and Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">GUESTS *</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Number of guests"
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="editorial-label text-[#6b6b6b] mb-2 block">BUDGET (OPTIONAL)</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="$2,000"
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors"
                    style={{ fontWeight: 300 }}
                  />
                  <p className="text-xs text-[#6b6b6b] mt-1" style={{ fontWeight: 300 }}>
                    To better provide you with the most suited yacht options.
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="editorial-label text-[#6b6b6b] mb-2 block">TELL US MORE *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Preferred departure location, occasion, special requests..."
                  className="w-full border border-[#e5e5e5] px-4 py-3 text-[#0f0f0f] focus:border-[#c4a265] focus:outline-none transition-colors resize-none"
                  style={{ fontWeight: 300 }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="editorial-label bg-white text-[#0f0f0f] border border-[#0f0f0f] px-12 py-4 hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] transition-all duration-500 disabled:bg-[#6b6b6b] disabled:border-[#6b6b6b]"
              >
                {isSubmitting ? 'SENDING...' : 'SUBMIT INQUIRY'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-[#c4a265] text-sm" style={{fontWeight: 400}}>
                  ✓ Thank you! We'll respond within 24 hours.
                </p>
              )}

              {/* Form Disclaimer */}
              <div className="mt-6 p-3 bg-[#f5f5f5]">
                <p className="text-[10px] text-[#6b6b6b] leading-tight" style={{ fontWeight: 300 }}>
                  Submitting a request does not guarantee availability, modify or confirm a reservation. Charter details including vessel selection, date, duration, pricing and onboard features vary and are subject to confirmation. This page is intended for initial inquiries related to yacht charters and boat rentals. Additional details may be required to finalize a reservation.
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN - Contact Info */}
          <div>
            <div className="rule-gold mb-6" />
            <h2 className="text-3xl text-[#0f0f0f] mb-12" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Other Ways to Reach Us
            </h2>

            <div className="space-y-10">
              {/* Phone */}
              <div>
                <div className="editorial-label text-[#c4a265] mb-3">PHONE</div>
                <a 
                  href="tel:18007479585"
                  className="text-base text-[#0f0f0f] hover:text-[#c4a265] transition-colors"
                  style={{fontWeight: 300}}
                >
                  1-800-747-9585
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="editorial-label text-[#c4a265] mb-3">WHATSAPP</div>
                <a 
                  href="https://wa.me/18007479585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#0f0f0f] hover:text-[#25D366] transition-colors group"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-base" style={{fontWeight: 300}}>Message Us</span>
                </a>
              </div>

              {/* Email */}
              <div className="pb-8 border-b border-[#e5e5e5]">
                <div className="editorial-label text-[#c4a265] mb-3">EMAIL</div>
                <a 
                  href="mailto:support@miamiyachting.com"
                  className="text-base text-[#0f0f0f] hover:text-[#c4a265] transition-colors break-all"
                  style={{fontWeight: 300}}
                >
                  support@miamiyachting.com
                </a>
              </div>

              {/* Departure Locations */}
              <div className="pb-8 border-b border-[#e5e5e5]">
                <div className="editorial-label text-[#c4a265] mb-3">DEPARTURE LOCATIONS</div>
                <div className="space-y-2 text-[#6b6b6b]" style={{fontWeight: 300}}>
                  <div>Miami</div>
                  <div>Miami Beach</div>
                  <div>Key Biscayne</div>
                  <div>Coconut Grove</div>
                  <div>Fort Lauderdale</div>
                  <div>Hollywood</div>
                </div>
              </div>

              {/* Hours */}
              <div className="pb-8 border-b border-[#e5e5e5]">
                <div className="editorial-label text-[#c4a265] mb-3">HOURS</div>
                <div className="text-[#6b6b6b] space-y-1" style={{fontWeight: 300}}>
                  <div>Monday – Sunday, 9am – 7pm EST</div>
                  <div className="text-[#0f0f0f] pb-4 border-b border-[#e5e5e5]" style={{fontWeight: 400}}>Charters available 7 days a week</div>
                </div>
                {/* Navigation Links */}
                <div className="flex items-center gap-4 mt-4">
                  <Link
                    href="/yacht-rental-miami"
                    className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] transition-colors flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>BACK TO FLEET</span>
                  </Link>
                  <span className="text-[#e5e5e5]">|</span>
                  <Link
                    href="/faq"
                    className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] transition-colors flex items-center"
                  >
                    <span>VIEW FAQ</span>
                  </Link>
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <div className="editorial-label text-[#c4a265] mb-3">FIND US</div>
                {/* Rating Badge Above Map */}
                <div className="bg-white border border-[#e5e5e5] p-3 mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#0f0f0f] mb-1" style={{fontWeight: 400}}>
                        Miami Yachting Company
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-[#FBBC04] text-sm">
                          ★★★★★
                        </div>
                        <span className="text-xs text-[#6b6b6b]" style={{fontWeight: 300}}>
                          4.9 (1,400+ reviews)
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Miami+Yachting+Company/@25.7694168,-80.1409721,17z/data=!3m1!4b1!4m6!3m5!1s0x88d9b4f6b15de215:0xe01e112dc4b2d5e3!8m2!3d25.7694168!4d-80.1383972!16s%2Fg%2F11vw4p0s8r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#4285F4] hover:underline"
                      style={{fontWeight: 300}}
                    >
                      Reviews →
                    </a>
                  </div>
                </div>
                {/* Google Maps Embed */}
                <div className="relative overflow-hidden border border-[#e5e5e5] bg-white" style={{ height: '250px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.03471722736!2d-80.1409721239681!3d25.76941680828519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b4f6b15de215%3A0xe01e112dc4b2d5e3!2sMiami%20Yachting%20Company!5e0!3m2!1sen!2sch!4v1692792737797!5m2!1sen!2sch"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
