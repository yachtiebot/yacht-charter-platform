'use client';

import { useCart } from '@/lib/store/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import InfoIcon from './InfoIcon';

export default function CateringCartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  // Calculate total platter count across all items
  const cateringItems = items.filter(item => item.category === 'catering');
  const hasCateringItems = cateringItems.length > 0;
  const totalPlatters = cateringItems.reduce((sum, item) => sum + item.quantity, 0);
  const needsMorePlatters = hasCateringItems && totalPlatters < 2;
  
  // Always use main checkout - it handles all categories intelligently
  const checkoutUrl = '/checkout';

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
          <h2 className="text-2xl font-light tracking-wide">Your Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-[#c4a265] hover:underline"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="border-b border-[#e5e5e5] pb-6">
                  <div className="flex gap-4">
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
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm font-medium text-[#c4a265] mb-3">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Customization Details */}
                      {item.customization && (
                        <div className="text-xs text-gray-600 mb-3 space-y-1">
                          {item.customization.meat1 && (
                            <p>Meats: {item.customization.meat1}, {item.customization.meat2}</p>
                          )}
                          {item.customization.cheese1 && (
                            <p>Cheeses: {item.customization.cheese1}, {item.customization.cheese2}</p>
                          )}
                          {item.customization.meats && (
                            <p>Meats: {item.customization.meats.join(', ')}</p>
                          )}
                          {item.customization.wrapStyles && (
                            <p>Wraps: {item.customization.wrapStyles.join(', ')}</p>
                          )}
                          {item.customization.cheeses && (
                            <p>Cheeses: {item.customization.cheeses.join(', ')}</p>
                          )}
                          {item.customization.spiralType && (
                            <p>Style: {item.customization.spiralType}</p>
                          )}
                          {item.customization.sauce && (
                            <p>Sauce: {item.customization.sauce}</p>
                          )}
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e5e5e5] p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Total</span>
              <span className="font-medium text-[#c4a265]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            {/* Minimum order warning */}
            {needsMorePlatters && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 text-center flex items-center justify-center gap-2">
                <InfoIcon className="w-4 h-4 flex-shrink-0" />
                <span>Minimum 2 platters required for checkout</span>
              </div>
            )}
            
            <a
              href={checkoutUrl}
              className={`block w-full text-white py-4 text-sm uppercase tracking-wider transition-all duration-300 text-center ${
                needsMorePlatters 
                  ? 'bg-gray-400 cursor-not-allowed pointer-events-none' 
                  : 'bg-[#0f0f0f] hover:bg-[#c4a265]'
              }`}
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
