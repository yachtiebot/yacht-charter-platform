'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/store/CartContext';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on success
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Header */}
        <p className="editorial-label text-[#c4a265] mb-3">ORDER CONFIRMED</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light italic text-[#0f0f0f] mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Thank You for Your Order
        </h1>

        {/* Message */}
        <div className="space-y-4 text-[#6b6b6b] mb-12">
          <p className="text-lg">
            Your catering order has been received and will be prepared fresh for your yacht charter.
          </p>
          <p>
            A confirmation email has been sent to you with order details. 
            Our team will contact you within 24 hours to confirm delivery arrangements.
          </p>
          <p className="text-sm">
            All orders require a minimum of 36 hours advance notice and must be linked to a valid yacht charter reservation.
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-[#e5e5e5] p-8 mb-8 text-left">
          <h2 className="editorial-label text-[#0f0f0f] mb-4">WHAT'S NEXT?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-[#6b6b6b]">
              <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span style={{ fontWeight: 300 }}>Check your email for order confirmation</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#6b6b6b]">
              <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span style={{ fontWeight: 300 }}>Our team will contact you to confirm charter details</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#6b6b6b]">
              <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span style={{ fontWeight: 300 }}>Your order will be delivered to the yacht before departure</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            href="/Miami-Yacht-Charter-Catering"
            className="inline-block bg-white border border-[#0f0f0f] text-[#0f0f0f] px-8 py-4 text-sm uppercase tracking-wider hover:bg-[#c4a265] hover:border-[#c4a265] hover:text-white transition-all duration-300"
          >
            Browse More Catering
          </Link>
          <p className="text-sm text-[#6b6b6b]">
            Need help? Contact us at{' '}
            <a href="mailto:support@miamiyachtingcompany.com" className="text-[#c4a265] hover:underline">
              support@miamiyachtingcompany.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
