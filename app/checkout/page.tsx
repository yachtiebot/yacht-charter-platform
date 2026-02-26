'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
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
    
    // Check 2 platter minimum
    const platterCount = items.reduce((sum, item) => sum + item.quantity, 0);
    if (platterCount < 2) {
      newErrors.cart = 'Minimum 2 platters required';
    }
    
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
    
    if (!validate()) return;
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    // TODO: Send to Stripe/payment processor
    // For now, just mock success
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1500);
  };

  // Check platter count
  const platterCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf9f7] pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-light italic mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Your cart is empty
          </h1>
          <Link href="/Miami-Yacht-Charter-Catering" className="text-[#c4a265] hover:underline text-sm uppercase tracking-wider">
            Browse Catering
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="editorial-label text-[#c4a265] mb-3">CHECKOUT</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light italic text-[#0f0f0f] mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Complete Your Order
          </h1>
          <p className="text-[#6b6b6b] font-light">Review your items and enter charter details</p>
          
          {/* 2 Platter Minimum Warning */}
          {platterCount < 2 && (
            <div className="mt-4 bg-[#c4a265]/10 border border-[#c4a265]/30 px-6 py-4">
              <p className="text-sm text-[#c4a265] font-medium">
                ⚠️ Minimum 2 platters required • You have {platterCount}
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div>
            <h2 className="font-serif text-3xl font-light italic mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Contact Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block editorial-label text-[#0f0f0f] mb-2">
                    First Name <span className="text-[#c4a265]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                  />
                  {errors.firstName && <p className="text-xs text-[#c4a265] mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block editorial-label text-[#0f0f0f] mb-2">
                    Last Name <span className="text-[#c4a265]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                  />
                  {errors.lastName && <p className="text-xs text-[#c4a265] mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block editorial-label text-[#0f0f0f] mb-2">
                  Email <span className="text-[#c4a265]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                />
                {errors.email && <p className="text-xs text-[#c4a265] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block editorial-label text-[#0f0f0f] mb-2">
                  Phone <span className="text-[#c4a265]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                />
                {errors.phone && <p className="text-xs text-[#c4a265] mt-1">{errors.phone}</p>}
              </div>

              <div className="pt-6 border-t border-[#e5e5e5]/50">
                <h3 className="editorial-label text-[#0f0f0f] mb-4">Charter Details</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block editorial-label text-[#0f0f0f] mb-2">
                      Charter Date <span className="text-[#c4a265]">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.charterDate}
                      onChange={(e) => setFormData({...formData, charterDate: e.target.value})}
                      min={new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                    />
                    {errors.charterDate && <p className="text-xs text-[#c4a265] mt-1">{errors.charterDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block editorial-label text-[#0f0f0f] mb-2">
                      Booking Number <span className="text-[#c4a265]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bookingNumber}
                      onChange={(e) => setFormData({...formData, bookingNumber: e.target.value})}
                      placeholder="e.g. MYC-12345"
                      className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors"
                    />
                    {errors.bookingNumber && <p className="text-xs text-[#c4a265] mt-1">{errors.bookingNumber}</p>}
                  </div>
                </div>
                
                <p className="text-xs text-[#6b6b6b] font-light">
                  Orders require 36 hours advance notice and must be linked to a valid yacht charter.
                </p>
              </div>

              <div>
                <label className="block editorial-label text-[#0f0f0f] mb-2">
                  Special Requests
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#e5e5e5] focus:border-[#c4a265] focus:ring-0 transition-colors resize-none"
                  placeholder="Dietary restrictions, delivery notes, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing || platterCount < 2}
                className="w-full bg-[#0f0f0f] text-white py-4 editorial-label hover:bg-[#c4a265] transition-all duration-300 disabled:bg-[#e5e5e5] disabled:text-[#9ca3af] disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : platterCount < 2 ? 'Minimum 2 Platters Required' : 'Proceed to Payment'}
              </button>
              {errors.cart && <p className="text-xs text-[#c4a265] mt-2 text-center">{errors.cart}</p>}
            </form>
          </div>

          {/* Right: Order Summary */}
          <div>
            <h2 className="font-serif text-3xl font-light italic mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Order Summary
            </h2>
            
            <div className="bg-white border border-[#e5e5e5] p-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#e5e5e5] last:border-0 last:pb-0">
                  {item.image && (
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="editorial-label text-[#0f0f0f] mb-1">{item.name}</h3>
                    <p className="text-xs text-[#6b6b6b] mb-2">Qty: {item.quantity}</p>
                    
                    {/* Customization */}
                    {item.customization && (
                      <div className="text-xs text-[#6b6b6b] space-y-0.5 mb-2">
                        {item.customization.meat1 && (
                          <>
                            <p>Meats: {item.customization.meat1}, {item.customization.meat2}</p>
                            <p>Cheeses: {item.customization.cheese1}, {item.customization.cheese2}</p>
                            <p>Fruits: {item.customization.fruit1}, {item.customization.fruit2}</p>
                            <p>Extras: {item.customization.accompaniment1}, {item.customization.accompaniment2}</p>
                          </>
                        )}
                        {item.customization.meats && (
                          <>
                            <p>Meats: {item.customization.meats.join(', ')}</p>
                            <p>Wraps: {item.customization.wrapStyles.join(', ')}</p>
                            <p>Cheeses: {item.customization.cheeses.join(', ')}</p>
                          </>
                        )}
                        {item.customization.spiralType && (
                          <p>Style: {item.customization.spiralType}</p>
                        )}
                        {item.customization.sauce && (
                          <p>Sauce: {item.customization.sauce}</p>
                        )}
                      </div>
                    )}
                    
                    <p className="text-sm font-medium text-[#c4a265]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="pt-4 border-t border-[#e5e5e5]">
                <div className="flex justify-between items-center mb-2">
                  <span className="editorial-label text-[#0f0f0f]">Total ({platterCount} platter{platterCount !== 1 ? 's' : ''})</span>
                  <span className="font-serif text-2xl font-light text-[#c4a265]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#6b6b6b] font-light leading-relaxed">
                  Delivery to yacht included • 36 hour advance notice required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
