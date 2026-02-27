'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface DeliSandwichCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customization: DeliSandwichCustomization) => void;
  productName: string;
  productPrice: number;
  servingSize: number;
}

export interface DeliSandwichCustomization {
  meats: string[];
  breads: string[];
  cheeses: string[];
}

const MEATS = [
  'Turkey',
  'Roast Beef',
  'Ham',
  'Ultimate (Ham, Turkey and Roast Beef)',
  'Italian',
  'Veggie Only'
];

const BREADS = [
  'White',
  '5 Grain Italian'
];

const CHEESES = [
  'American yellow',
  'American white',
  'Swiss',
  'Cheddar',
  'Provolone',
  'Muenster',
  'No cheese'
];

export default function DeliSandwichCustomizationModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  productPrice,
  servingSize,
}: DeliSandwichCustomizationModalProps) {
  const [meats, setMeats] = useState<string[]>([]);
  const [breads, setBreads] = useState<string[]>([]);
  const [cheeses, setCheeses] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic limits based on serving size
  const maxMeats = servingSize <= 10 ? 2 : 3;
  const maxBreads = 2;
  const maxCheeses = servingSize <= 10 ? 2 : 3;

  if (!isOpen) return null;

  const toggleMeat = (meat: string) => {
    if (meats.includes(meat)) {
      setMeats(meats.filter(m => m !== meat));
    } else if (meats.length < maxMeats) {
      setMeats([...meats, meat]);
    }
  };

  const toggleBread = (bread: string) => {
    if (breads.includes(bread)) {
      setBreads(breads.filter(b => b !== bread));
    } else if (breads.length < maxBreads) {
      setBreads([...breads, bread]);
    }
  };

  const toggleCheese = (cheese: string) => {
    if (cheeses.includes(cheese)) {
      setCheeses(cheeses.filter(c => c !== cheese));
    } else if (cheeses.length < maxCheeses) {
      setCheeses([...cheeses, cheese]);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (meats.length === 0) newErrors.meats = 'Select at least 1 meat';
    if (breads.length === 0) newErrors.breads = 'Select at least 1 bread';
    if (cheeses.length === 0) newErrors.cheeses = 'Select at least 1 cheese';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({ meats, breads, cheeses });

    // Reset
    setMeats([]);
    setBreads([]);
    setCheeses([]);
    setErrors({});
  };

  const handleClose = () => {
    setMeats([]);
    setBreads([]);
    setCheeses([]);
    setErrors({});
    onClose();
  };

  const isComplete = meats.length > 0 && breads.length > 0 && cheeses.length > 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity touch-none"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 touch-none overflow-hidden">
        <div className="bg-[#faf9f7] w-full max-w-2xl shadow-2xl h-[90vh] flex flex-col relative touch-auto">
          {/* Scroll Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-[#c4a265] opacity-70 pointer-events-none z-30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <div className="text-[12px] uppercase tracking-[0.3em] font-medium" style={{ writingMode: 'vertical-rl' }}>
              SCROLL
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Header */}
          <div className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e5e5]/30 px-10 py-8 z-10">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pr-12">
              <p className="editorial-label text-[#c4a265] mb-2">BUILD YOUR PLATTER</p>
              <h2 className="font-serif text-2xl font-light text-[#0f0f0f] mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Deli Sandwich Options
              </h2>
              <div className="flex items-center justify-between mb-2">
                <p className="editorial-small text-[#6b6b6b]">{productName}</p>
                <p className="editorial-label text-[#0f0f0f]">${productPrice.toFixed(2)}</p>
              </div>
              <p className="editorial-small text-[#6b6b6b] mb-1">
                Serving {servingSize} guests
              </p>
              <p className="editorial-small text-[#9ca3af]">Scroll for options</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
            {/* Meats */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-4">
                Meat <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">
                Select up to {maxMeats} {servingSize <= 10 ? 'meats for serving sizes up to 10' : 'meats for serving sizes over 10'}
              </p>
              
              <div className="space-y-3">
                {MEATS.map((meat) => (
                  <label
                    key={meat}
                    className={`flex items-center cursor-pointer group py-4 px-6 border transition-all duration-300 ${
                      meats.includes(meat)
                        ? 'border-[#c4a265] bg-[#c4a265]/5'
                        : 'border-[#e5e5e5] hover:border-[#c4a265]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={meats.includes(meat)}
                      onChange={() => toggleMeat(meat)}
                      disabled={!meats.includes(meat) && meats.length >= maxMeats}
                      className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="ml-4 editorial-label text-[#0f0f0f]">{meat}</span>
                  </label>
                ))}
              </div>
              {errors.meats && <p className="editorial-small text-[#c4a265] mt-3">{errors.meats}</p>}
            </div>

            {/* Breads */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-4">
                Bread <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">Select up to {maxBreads} breads</p>
              
              <div className="space-y-3">
                {BREADS.map((bread) => (
                  <label
                    key={bread}
                    className={`flex items-center cursor-pointer group py-4 px-6 border transition-all duration-300 ${
                      breads.includes(bread)
                        ? 'border-[#c4a265] bg-[#c4a265]/5'
                        : 'border-[#e5e5e5] hover:border-[#c4a265]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={breads.includes(bread)}
                      onChange={() => toggleBread(bread)}
                      disabled={!breads.includes(bread) && breads.length >= maxBreads}
                      className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="ml-4 editorial-label text-[#0f0f0f]">{bread}</span>
                  </label>
                ))}
              </div>
              {errors.breads && <p className="editorial-small text-[#c4a265] mt-3">{errors.breads}</p>}
            </div>

            {/* Cheeses */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-4">
                Cheese <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">
                Select up to {maxCheeses} {servingSize <= 10 ? 'cheeses for serving sizes up to 10' : 'cheeses for serving sizes over 10'}
              </p>
              
              <div className="space-y-3">
                {CHEESES.map((cheese) => (
                  <label
                    key={cheese}
                    className={`flex items-center cursor-pointer group py-4 px-6 border transition-all duration-300 ${
                      cheeses.includes(cheese)
                        ? 'border-[#c4a265] bg-[#c4a265]/5'
                        : 'border-[#e5e5e5] hover:border-[#c4a265]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={cheeses.includes(cheese)}
                      onChange={() => toggleCheese(cheese)}
                      disabled={!cheeses.includes(cheese) && cheeses.length >= maxCheeses}
                      className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="ml-4 editorial-label text-[#0f0f0f]">{cheese}</span>
                  </label>
                ))}
              </div>
              {errors.cheeses && <p className="editorial-small text-[#c4a265] mt-3">{errors.cheeses}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 bg-[#faf9f7] border-t border-[#e5e5e5]/30 px-10 py-8">
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
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
