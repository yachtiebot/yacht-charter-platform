'use client';

import { useCartStore } from '@/lib/cart-store';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import InfoIcon from './InfoIcon';

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateAddOnQuantity,
    removeAddOn,
    getItemTotal,
    getCartTotal,
  } = useCartStore();

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
                  {/* Yacht Info */}
                  <div className="flex gap-4 mb-4">
                    {item.imageUrl && (
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.duration} hours • {item.guestCount} guests
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.date} at {item.time}
                      </p>
                      <p className="text-sm font-medium text-[#c4a265] mt-2">
                        ${(item.price * item.duration).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add-ons */}
                  {item.addOns.length > 0 && (
                    <div className="ml-0 space-y-2">
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                        Add-ons
                      </p>
                      {item.addOns.map((addOn) => (
                        <div
                          key={addOn.id}
                          className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                        >
                          <span className="flex-1">{addOn.name}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                addOn.quantity > 1
                                  ? updateAddOnQuantity(
                                      item.id,
                                      addOn.id,
                                      addOn.quantity - 1
                                    )
                                  : removeAddOn(item.id, addOn.id)
                              }
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center">
                              {addOn.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateAddOnQuantity(
                                  item.id,
                                  addOn.id,
                                  addOn.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="w-20 text-right font-medium">
                              ${(addOn.price * addOn.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeAddOn(item.id, addOn.id)}
                              className="text-gray-400 hover:text-red-500 ml-2"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Item Total */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium">Item Total:</span>
                    <span className="text-lg font-medium text-[#c4a265]">
                      ${getItemTotal(item).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e5e5e5] p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-2xl font-medium text-[#c4a265]">
                ${getCartTotal().toLocaleString()}
              </span>
            </div>
            
            {/* Minimum order warning */}
            {items.length === 1 && (
              <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 text-center flex items-center justify-center gap-2">
                <InfoIcon className="w-4 h-4 flex-shrink-0" />
                <span>Minimum 2 items required for checkout</span>
              </div>
            )}
            
            <Link
              href="/checkout"
              onClick={closeCart}
              className={`block w-full text-white text-center py-4 transition-colors duration-300 ${
                items.length < 2 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#0f0f0f] hover:bg-[#c4a265]'
              }`}
              {...(items.length < 2 && {
                onClick: (e) => {
                  e.preventDefault();
                }
              })}
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center py-3 text-sm text-gray-600 hover:text-[#0f0f0f] transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </>
  );
}
