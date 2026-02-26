'use client';

import { useState, useEffect } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function InquiryModal({ isOpen, onClose, serviceName }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    charterDate: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual endpoint
    try {
      // TODO: Replace with actual form submission endpoint
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: serviceName,
          message: `Hi, I'm interested in a custom quote for ${serviceName}.`
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({ name: '', email: '', phone: '', charterDate: '', details: '' });
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-[#c4a265]/20 p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-px bg-[#c4a265]" />
                <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em]">Email Inquiry</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                Request a Quote
              </h2>
              <p className="text-[#6b6b6b] text-sm mt-2" style={{ fontWeight: 300 }}>
                for <span className="text-[#0f0f0f] font-medium">{serviceName}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors p-2"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Pre-filled Message */}
          <div className="bg-[#f0ece6] border border-[#c4a265]/20 p-6">
            <p className="text-sm text-[#6b6b6b]" style={{ fontWeight: 300 }}>
              Hi, I'm interested in a custom quote for <strong className="text-[#0f0f0f] font-medium">{serviceName}</strong>.
            </p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-2 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-[#0f0f0f]/20 focus:border-[#c4a265] focus:outline-none transition-colors text-[#0f0f0f]"
              placeholder="John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-2 font-medium">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-[#0f0f0f]/20 focus:border-[#c4a265] focus:outline-none transition-colors text-[#0f0f0f]"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-2 font-medium">
              Phone Number <span className="text-[#6b6b6b]/60">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-[#0f0f0f]/20 focus:border-[#c4a265] focus:outline-none transition-colors text-[#0f0f0f]"
              placeholder="+1 (305) 555-0123"
            />
          </div>

          {/* Charter Date */}
          <div>
            <label htmlFor="charterDate" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-2 font-medium">
              Charter Date *
            </label>
            <input
              type="date"
              id="charterDate"
              required
              value={formData.charterDate}
              onChange={(e) => setFormData({ ...formData, charterDate: e.target.value })}
              className="w-full px-4 py-3 border border-[#0f0f0f]/20 focus:border-[#c4a265] focus:outline-none transition-colors text-[#0f0f0f]"
            />
          </div>

          {/* Additional Details */}
          <div>
            <label htmlFor="details" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-2 font-medium">
              Additional Details *
            </label>
            <textarea
              id="details"
              required
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-4 py-3 border border-[#0f0f0f]/20 focus:border-[#c4a265] focus:outline-none transition-colors text-[#0f0f0f] resize-none"
              placeholder="Please provide any additional details about your charter, number of guests, special requests, etc."
            />
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
              ✓ Inquiry sent successfully! We'll be in touch soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
              ✗ Error sending inquiry. Please try again or contact us directly.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0f0f0f] text-white py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c4a265] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </button>

          <p className="text-xs text-[#6b6b6b]/60 text-center leading-relaxed" style={{ fontWeight: 300 }}>
            By submitting this form, you agree to be contacted regarding your inquiry. 
            We typically respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
