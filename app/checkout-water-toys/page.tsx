'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WaterToysCheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    charterDate: '',
    bookingNumber: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.charterDate.trim()) newErrors.charterDate = 'Required';
    if (!formData.bookingNumber.trim()) newErrors.bookingNumber = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerInfo: formData,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf9f7] pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-light italic mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Your cart is empty
          </h1>
          <p className="text-[#666] mb-8">Add some items before checking out</p>
          <Link href="/" className="inline-block bg-[#0f0f0f] text-white px-8 py-3 hover:bg-[#c4a265] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-20 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <div className="mb-8">
              <Link 
                href="/miami-yacht-charter-water-toys"
                className="text-[#c4a265] hover:text-[#0f0f0f] transition-colors"
                aria-label="Add more items"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            </div>

            <h2 className="font-serif text-3xl font-light italic mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                  Yacht Charter Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="charterDate"
                  placeholder="MM/DD/YYYY"
                  value={formData.charterDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                />
                {errors.charterDate && <p className="text-red-500 text-sm mt-1">{errors.charterDate}</p>}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                  Booking Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bookingNumber"
                  value={formData.bookingNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                />
                {errors.bookingNumber && <p className="text-red-500 text-sm mt-1">{errors.bookingNumber}</p>}
                <p className="text-sm text-[#666] mt-1">
                  Orders require 36 hours advance notice and must be linked to a valid yacht charter.
                </p>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#0f0f0f] mb-2">
                  Special Requests
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors resize-none"
                  placeholder="Delivery notes, special instructions, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#0f0f0f] text-white py-4 editorial-label hover:bg-[#c4a265] transition-all duration-300 disabled:bg-[#e5e5e5] disabled:text-[#9ca3af] disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white border border-[#e5e5e5] p-8 sticky top-24">
              <h2 className="font-serif text-3xl font-light italic mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Order Summary
              </h2>

              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#0f0f0f] uppercase text-sm tracking-wider">
                        {item.name}
                      </h3>
                      {item.selectedSize && (
                        <p className="text-sm text-[#666] mt-1">{item.selectedSize}</p>
                      )}
                      <p className="text-sm text-[#666] mt-1">Qty: {item.quantity}</p>
                      <p className="text-[#c4a265] font-medium mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e5e5e5] pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="editorial-label text-[#0f0f0f]">Total ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                  <span className="text-2xl font-light text-[#0f0f0f]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#666]">Delivery to yacht included</p>
                <p className="text-xs text-[#666]">36 hour advance notice required</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
