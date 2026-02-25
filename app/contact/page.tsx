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
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/contact/Miami_Yachting_Company_contact_hero_yacht-mobile.jpg"
            />
            <img
              src="/images/contact/Miami_Yachting_Company_contact_hero_yacht.jpg"
              alt="Miami Yachting Company luxury yacht charter at Fowey Rocks Lighthouse"
              className="w-full h-full object-cover"
              width="2000"
              height="1342"
            />
          </picture>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-32">
          <div className="rule-gold mb-6" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
            <div className="text-white" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic' }}>
              Get in
            </div>
            <div className="text-[#c4a265]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
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
                  Submitting a request does not guarantee availability, modify or confirm a reservation. Charter details including vessel selection, date, duration, pricing and onboard features vary and are subject to confirmation.
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN - Contact Info */}
          <div>
            <div className="rule-gold mb-6" />
            <h2 className="text-3xl text-[#0f0f0f] mb-8" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Other Ways to Reach Us
            </h2>

            <div className="space-y-8">
              {/* Email */}
              <div>
                <h3 className="editorial-label text-[#6b6b6b] mb-2">EMAIL</h3>
                <a
                  href="mailto:support@miamiyachting.com"
                  className="text-[#0f0f0f] text-lg hover:text-[#c4a265] transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  support@miamiyachting.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <h3 className="editorial-label text-[#6b6b6b] mb-2">PHONE</h3>
                <a
                  href="tel:+13055555555"
                  className="text-[#0f0f0f] text-lg hover:text-[#c4a265] transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  +1 (305) 555-5555
                </a>
                <p className="text-sm text-[#6b6b6b] mt-1" style={{ fontWeight: 300 }}>
                  Available 7 days a week, 9 AM – 9 PM EST
                </p>
              </div>

              {/* WhatsApp */}
              <div>
                <h3 className="editorial-label text-[#6b6b6b] mb-2">WHATSAPP</h3>
                <a
                  href="https://wa.me/13055555555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0f0f0f] text-lg hover:text-[#c4a265] transition-colors inline-flex items-center gap-2"
                  style={{ fontWeight: 300 }}
                >
                  Chat with us on WhatsApp
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>

              {/* Office */}
              <div>
                <h3 className="editorial-label text-[#6b6b6b] mb-2">OFFICE</h3>
                <p className="text-[#0f0f0f] text-lg" style={{ fontWeight: 300 }}>
                  Miami Beach Marina<br />
                  300 Alton Road<br />
                  Miami Beach, FL 33139
                </p>
              </div>

              {/* Hours */}
              <div>
                <h3 className="editorial-label text-[#6b6b6b] mb-2">HOURS</h3>
                <p className="text-[#0f0f0f]" style={{ fontWeight: 300 }}>
                  Monday – Sunday<br />
                  9:00 AM – 9:00 PM EST
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="editorial-label text-[#6b6b6b] mb-4">FOLLOW US</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/miamiyachtingco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#e5e5e5] flex items-center justify-center hover:border-[#c4a265] hover:text-[#c4a265] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/miamiyachtingco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#e5e5e5] flex items-center justify-center hover:border-[#c4a265] hover:text-[#c4a265] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
