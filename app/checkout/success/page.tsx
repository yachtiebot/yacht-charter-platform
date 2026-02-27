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
        <div className="mb-8">
          <svg className="w-16 h-16 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Header */}
        <p className="editorial-label text-[#c4a265] mb-3">ORDER CONFIRMED</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light italic text-[#0f0f0f] mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Thank You for Your Order
        </h1>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <p className="text-sm font-light leading-relaxed text-[#6b6b6b]">
            Your catering order has been received and will be prepared fresh for your yacht charter.
          </p>
          <p className="text-sm font-light leading-relaxed text-[#6b6b6b]">
            A confirmation email has been sent to you with order details. 
            Our team will only reach out if there's an issue with your order. Otherwise, it will be on your yacht at the time of departure.
          </p>
          <p className="text-sm font-light leading-relaxed text-[#6b6b6b]">
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
              <span style={{ fontWeight: 300 }}>Our team will reach out only if there's an issue</span>
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
        <div className="space-y-6">
          <a
            href="/miami-yacht-charter-catering"
            className="inline-block editorial-label bg-white border border-[#e5e5e5] text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:border-[#c4a265] hover:text-white transition-all duration-300 relative z-50 pointer-events-auto cursor-pointer"
          >
            Browse More Catering
          </a>
          
          <div className="text-sm text-[#6b6b6b] font-light space-y-2">
            <p>Need help? Contact us:</p>
            <div className="flex items-center justify-center gap-2">
              <a href="tel:18007479585" className="text-[#c4a265] hover:underline">
                1-800-747-9585
              </a>
              <span>•</span>
              <a 
                href="https://wa.me/18007479585" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#c4a265] hover:underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
            <p>
              <a href="mailto:support@miamiyachtingcompany.com" className="text-[#c4a265] hover:underline">
                support@miamiyachtingcompany.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
