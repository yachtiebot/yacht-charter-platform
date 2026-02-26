'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface SpiralCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customization: SpiralCustomization) => void;
  productName: string;
  productPrice: number;
}

export interface SpiralCustomization {
  spiralType: string;
}

const SPIRAL_TYPES = [
  {
    value: 'roast-beef',
    name: 'Roast Beef',
    description: 'Top round Roast Beef, Swiss Cheese, garlic and herb spread, spinach, tomatoes, dill pickles, black olives, marinated artichokes and green pepper rolled in lavish bread.'
  },
  {
    value: 'italian',
    name: 'Italian',
    description: 'Tavern Ham, capocollo, Genoa salami, provolone cheese, garlic and herb spread, spinach, tomatoes, marinated artichokes, and green peppers rolled in lavash bread.'
  },
  {
    value: 'turkey-bacon-avocado',
    name: 'Turkey Breast with Bacon and Avocado',
    description: 'Oven roasted turkey breast, bacon, garlic and herb spread, guacamole and spinach rolled in lavash bread.'
  },
  {
    value: 'ham-cheese',
    name: 'Ham and Cheese',
    description: 'Tavern Ham, yellow American cheese, garlic and herb spread, shredded lettuce and pickles rolled in lavash bread.'
  },
  {
    value: 'vegetarian',
    name: 'Vegetarian',
    description: 'Garlic and herb spread, spinach, tomatoes, matchstick carrots, mushrooms, black olives, marinated artichokes, sunflower seeds and guacamole rolled in lavash bread.'
  }
];

export default function SpiralCustomizationModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  productPrice,
}: SpiralCustomizationModalProps) {
  const [spiralType, setSpiralType] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!spiralType) {
      setError('Please select a spiral type');
      return;
    }

    onSubmit({ spiralType });
    setSpiralType('');
    setError('');
  };

  const handleClose = () => {
    setSpiralType('');
    setError('');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 touch-none" onClick={handleClose} />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 touch-none overflow-hidden">
        <div className="bg-[#faf9f7] w-full max-w-2xl shadow-2xl h-[90vh] flex flex-col relative touch-auto">
          {/* Scroll Indicator - visible on scrollable content */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4a265] opacity-60 pointer-events-none z-30">
            <div className="text-[11px] uppercase tracking-[0.3em] font-light" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              SCROLL
            </div>
          </div>
          <div className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e5e5]/30 px-10 py-8 z-10">
            <button onClick={handleClose} className="absolute top-6 right-6 p-2 text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="pr-12">
              <p className="editorial-label text-[#c4a265] mb-2">SELECT YOUR STYLE</p>
              <h2 className="editorial-heading text-[#0f0f0f] mb-3">Gourmet Spirals</h2>
              <p className="editorial-small text-[#6b6b6b]">{productName} • ${productPrice.toFixed(2)}</p>
              <p className="editorial-small text-[#9ca3af] mt-2">Choose one combination • Scroll for all options</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-10 py-8 space-y-4">
            {SPIRAL_TYPES.map((type) => (
              <label
                key={type.value}
                className={`flex items-start cursor-pointer group p-6 border transition-all duration-300 ${
                  spiralType === type.value
                    ? 'border-[#c4a265] bg-[#c4a265]/5'
                    : 'border-[#e5e5e5] hover:border-[#c4a265]'
                }`}
              >
                <input
                  type="radio"
                  name="spiral"
                  value={type.value}
                  checked={spiralType === type.value}
                  onChange={(e) => setSpiralType(e.target.value)}
                  className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 mt-1"
                />
                <div className="ml-4 flex-1">
                  <div className="editorial-label text-[#0f0f0f] mb-2">{type.name}</div>
                  <p className="editorial-small text-[#6b6b6b] leading-relaxed">{type.description}</p>
                </div>
              </label>
            ))}
            {error && <p className="editorial-small text-[#c4a265] mt-3">{error}</p>}
          </div>

          <div className="flex-shrink-0 bg-[#faf9f7] border-t border-[#e5e5e5]/30 px-10 py-8">
            <button
              onClick={handleSubmit}
              disabled={!spiralType}
              className="w-full editorial-label bg-[#0f0f0f] text-white py-5 hover:bg-[#c4a265] transition-all duration-500 disabled:bg-[#e5e5e5] disabled:text-[#9ca3af] disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
