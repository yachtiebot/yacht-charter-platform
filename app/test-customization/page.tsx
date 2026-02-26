'use client';

import { useState } from 'react';
import CakeCustomizationModal, { CakeCustomization } from '@/components/modals/CakeCustomizationModal';
import { useCart } from '@/lib/store/CartContext';

export default function TestCustomizationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleCustomizationSubmit = (customization: CakeCustomization) => {
    // Add to cart with customization data
    addItem({
      id: 'celebration-cake',
      name: 'Celebration Cake',
      price: 45,
      category: 'catering',
      customization: customization,
    });

    setIsModalOpen(false);
    alert('Cake added to cart with customization!');
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <p className="editorial-label text-[#c4a265] mb-4">CUSTOMIZATION TEST</p>
        <h1 className="editorial-display text-[#0f0f0f] mb-6">Cake Personalization</h1>
        <p className="editorial-body text-[#6b6b6b] mb-12 max-w-md mx-auto">
          Experience our editorial luxury customization interface. 
          Designed for the discerning client.
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="editorial-label bg-[#0f0f0f] text-white px-12 py-5 hover:bg-[#c4a265] transition-all duration-500 inline-block"
        >
          Customize Your Cake
        </button>

        <p className="editorial-small text-[#9ca3af] mt-8">
          Click to open the customization modal
        </p>
      </div>

      <CakeCustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCustomizationSubmit}
        productName="Celebration Cake"
        productPrice={45}
      />
    </div>
  );
}
