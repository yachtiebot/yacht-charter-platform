'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface WrapCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customization: WrapCustomization) => void;
  productName: string;
  productPrice: number;
}

export interface WrapCustomization {
  meats: string[];
  wrapStyles: string[];
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

const WRAP_STYLES = [
  'Spinach',
  'Tomato',
  'Wheat'
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

export default function WrapCustomizationModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  productPrice,
}: WrapCustomizationModalProps) {
  const [meats, setMeats] = useState<string[]>([]);
  const [wrapStyles, setWrapStyles] = useState<string[]>([]);
  const [cheeses, setCheeses] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const toggleMeat = (meat: string) => {
    if (meats.includes(meat)) {
      setMeats(meats.filter(m => m !== meat));
    } else if (meats.length < 3) {
      setMeats([...meats, meat]);
    }
  };

  const toggleWrapStyle = (style: string) => {
    if (wrapStyles.includes(style)) {
      setWrapStyles(wrapStyles.filter(s => s !== style));
    } else if (wrapStyles.length < 3) {
      setWrapStyles([...wrapStyles, style]);
    }
  };

  const toggleCheese = (cheese: string) => {
    if (cheeses.includes(cheese)) {
      setCheeses(cheeses.filter(c => c !== cheese));
    } else if (cheeses.length < 3) {
      setCheeses([...cheeses, cheese]);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (meats.length === 0) newErrors.meats = 'Select at least 1 meat';
    if (wrapStyles.length === 0) newErrors.wrapStyles = 'Select at least 1 wrap style';
    if (cheeses.length === 0) newErrors.cheeses = 'Select at least 1 cheese';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({ meats, wrapStyles, cheeses });

    // Reset
    setMeats([]);
    setWrapStyles([]);
    setCheeses([]);
    setErrors({});
  };

  const handleClose = () => {
    setMeats([]);
    setWrapStyles([]);
    setCheeses([]);
    setErrors({});
    onClose();
  };

  const isComplete = meats.length > 0 && wrapStyles.length > 0 && cheeses.length > 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#faf9f7] w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative">
          {/* Scroll Indicator */}
          <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 text-[#c4a265] opacity-40 pointer-events-none z-20">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <div className="text-[10px] uppercase tracking-[0.2em] font-light" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              SCROLL
            </div>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
              <h2 className="editorial-heading text-[#0f0f0f] mb-3">Customize Your Wraps</h2>
              <p className="editorial-small text-[#6b6b6b]">{productName} • ${productPrice.toFixed(2)}</p>
              <p className="editorial-small text-[#9ca3af] mt-2">Select up to 3 options in each category • Scroll for all</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-10 py-8 space-y-10">
            {/* Meats */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-4">
                Meat <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">Select up to 3</p>
              
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
                      disabled={!meats.includes(meat) && meats.length >= 3}
                      className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="ml-4 editorial-body text-[#0f0f0f]">{meat}</span>
                  </label>
                ))}
              </div>
              {errors.meats && <p className="editorial-small text-[#c4a265] mt-3">{errors.meats}</p>}
            </div>

            {/* Wrap Styles */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-4">
                Wrap Styles <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">Select up to 3</p>
              
              <div className="space-y-3">
                {WRAP_STYLES.map((style) => (
                  <label
                    key={style}
                    className={`flex items-center cursor-pointer group py-4 px-6 border transition-all duration-300 ${
                      wrapStyles.includes(style)
                        ? 'border-[#c4a265] bg-[#c4a265]/5'
                        : 'border-[#e5e5e5] hover:border-[#c4a265]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={wrapStyles.includes(style)}
                      onChange={() => toggleWrapStyle(style)}
                      disabled={!wrapStyles.includes(style) && wrapStyles.length >= 3}
                      className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="ml-4 editorial-body text-[#0f0f0f]">{style}</span>
                  </label>
                ))}
              </div>
              {errors.wrapStyles && <p className="editorial-small text-[#c4a265] mt-3">{errors.wrapStyles}</p>}
            </div>

            {/* Cheeses */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-4">
                Cheese <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">Select up to 3</p>
              
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
                      disabled={!cheeses.includes(cheese) && cheeses.length >= 3}
                      className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0 disabled:opacity-50"
                    />
                    <span className="ml-4 editorial-body text-[#0f0f0f]">{cheese}</span>
                  </label>
                ))}
              </div>
              {errors.cheeses && <p className="editorial-small text-[#c4a265] mt-3">{errors.cheeses}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-[#faf9f7] border-t border-[#e5e5e5]/30 px-10 py-8">
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
