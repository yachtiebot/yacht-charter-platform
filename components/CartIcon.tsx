'use client';

import { useCart } from '@/lib/store/CartContext';

export default function CartIcon() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-2 text-sm uppercase tracking-wider transition-colors duration-300 hover:text-[#c4a265]"
      aria-label="Shopping cart"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-2 text-[#c4a265] text-sm font-medium">
          {totalItems}
        </span>
      )}
      <span className="hidden lg:inline">Cart</span>
    </button>
  );
}
