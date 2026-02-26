'use client';

import { useState } from 'react';
import DippingSauceModal, { DippingSauceCustomization } from '@/components/modals/DippingSauceModal';
import { useCart } from '@/lib/store/CartContext';

export default function TestSaucePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleCustomizationSubmit = (customization: DippingSauceCustomization) => {
    addItem({
      id: 'dipping-sauce',
      name: 'Dipping Sauce',
      price: 2.99,
      category: 'catering',
      customization: customization,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-8">
      <div className="text-center max-w-xl">
        <p className="editorial-label text-[#c4a265] mb-3">CUSTOMIZATION TEST</p>
        <h1 className="font-serif text-3xl md:text-5xl font-light italic text-[#0f0f0f] mb-6 px-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Choose Your Sauce
        </h1>
        <p className="text-sm text-[#6b6b6b] mb-10 px-4" style={{ fontWeight: 300 }}>
          Six signature flavors
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="editorial-label bg-white text-[#0f0f0f] px-8 py-4 hover:bg-[#c4a265] hover:text-white transition-all duration-500 inline-block border border-[#e5e5e5]"
        >
          Select Sauce
        </button>

        <p className="editorial-small text-[#9ca3af] mt-6">
          Simple dropdown test
        </p>
      </div>

      <DippingSauceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCustomizationSubmit}
        productName="Dipping Sauce"
        productPrice={2.99}
      />
    </div>
  );
}
