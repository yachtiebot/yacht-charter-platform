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
      <div className="text-center max-w-2xl">
        <p className="editorial-label text-[#c4a265] mb-4">CUSTOMIZATION TEST</p>
        <h1 className="editorial-display text-[#0f0f0f] mb-6">Build Your Charcuterie</h1>
        <p className="editorial-body text-[#6b6b6b] mb-12 max-w-md mx-auto">
          Select 2 meats, 2 cheeses, 2 fruits, and 2 accompaniments.
          Curated for the sophisticated palate.
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="editorial-label bg-[#0f0f0f] text-white px-12 py-5 hover:bg-[#c4a265] transition-all duration-500 inline-block"
        >
          Build Your Box
        </button>

        <p className="editorial-small text-[#9ca3af] mt-8">
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
