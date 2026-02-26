'use client';

import { useState } from 'react';
import CharcuterieCustomizationModal, { CharcuterieCustomization } from '@/components/modals/CharcuterieCustomizationModal';
import { useCart } from '@/lib/store/CartContext';

export default function TestCustomizationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleCustomizationSubmit = (customization: CharcuterieCustomization) => {
    // Add to cart with customization data
    addItem({
      id: 'large-charcuterie',
      name: 'Large Charcuterie Platter',
      price: 135,
      category: 'catering',
      customization: customization,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-8">
      <div className="text-center max-w-xl">
        <p className="editorial-label text-[#c4a265] mb-3">CUSTOMIZATION TEST</p>
        <h1 className="font-serif text-5xl font-light italic text-[#0f0f0f] mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Build Your Charcuterie
        </h1>
        <ul className="flex items-center justify-center gap-8 mb-10">
          <li className="flex items-start gap-2 text-sm text-[#6b6b6b]">
            <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span style={{ fontWeight: 300 }}>2 meats</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#6b6b6b]">
            <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span style={{ fontWeight: 300 }}>2 cheeses</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#6b6b6b]">
            <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span style={{ fontWeight: 300 }}>2 fruits</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#6b6b6b]">
            <svg className="w-4 h-4 text-[#c4a265] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span style={{ fontWeight: 300 }}>2 accompaniments</span>
          </li>
        </ul>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500 inline-block border border-[#e5e5e5]"
        >
          Build Your Box
        </button>

        <p className="editorial-small text-[#9ca3af] mt-6">
          This is a real product from the catering menu
        </p>
      </div>

      <CharcuterieCustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCustomizationSubmit}
        productName="Large Charcuterie Platter"
        productPrice={135}
      />
    </div>
  );
}
