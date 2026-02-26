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
      <div className="text-center">
        <h1 className="text-4xl font-light mb-8">Test Cake Customization</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0f0f0f] text-white px-8 py-4 uppercase tracking-wider text-sm hover:bg-[#c4a265] transition-colors"
        >
          Customize Cake
        </button>

        <p className="mt-8 text-gray-600">
          Click the button to open the cake customization modal
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
