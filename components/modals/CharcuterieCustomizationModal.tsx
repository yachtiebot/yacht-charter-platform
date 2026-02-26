'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface CharcuterieCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customization: CharcuterieCustomization) => void;
  productName: string;
  productPrice: number;
}

export interface CharcuterieCustomization {
  meat1: string;
  meat2: string;
  cheese1: string;
  cheese2: string;
  fruit1: string;
  fruit2: string;
  accompaniment1: string;
  accompaniment2: string;
}

const MEATS = [
  'Prosciutto',
  'Genoa',
  'Peppered Salami',
  'Chorizo',
  'Italian Dry Sausage',
  'Pepperoni',
  'Mortadella with Pistachios',
  'All Natural Salame',
  "Bianco D' Oro"
];

const CHEESES = [
  'Mozzarella',
  'Smoked Gouda',
  'Black Wax Cheddar',
  'Manchego',
  'Onion Jack Cheese',
  'Blueberry Goat Cheese',
  'Irish Cheddar',
  'Blue Cheese Wedge',
  'Brie Wedge',
  'Asiago'
];

const FRUITS = [
  'Green Grapes',
  'Red Grapes',
  'Strawberries',
  'Blueberries',
  'Dried Apricots'
];

const ACCOMPANIMENTS = [
  'Chocolate Espresso Beans',
  'Dark Chocolate Almonds',
  'Olive Jubilee',
  'Roasted Salted Almonds',
  'Horseradish Pickles'
];

export default function CharcuterieCustomizationModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  productPrice,
}: CharcuterieCustomizationModalProps) {
  const [meat1, setMeat1] = useState('');
  const [meat2, setMeat2] = useState('');
  const [cheese1, setCheese1] = useState('');
  const [cheese2, setCheese2] = useState('');
  const [fruit1, setFruit1] = useState('');
  const [fruit2, setFruit2] = useState('');
  const [accompaniment1, setAccompaniment1] = useState('');
  const [accompaniment2, setAccompaniment2] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!meat1) newErrors.meat1 = 'Required';
    if (!meat2) newErrors.meat2 = 'Required';
    if (!cheese1) newErrors.cheese1 = 'Required';
    if (!cheese2) newErrors.cheese2 = 'Required';
    if (!fruit1) newErrors.fruit1 = 'Required';
    if (!fruit2) newErrors.fruit2 = 'Required';
    if (!accompaniment1) newErrors.accompaniment1 = 'Required';
    if (!accompaniment2) newErrors.accompaniment2 = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      meat1,
      meat2,
      cheese1,
      cheese2,
      fruit1,
      fruit2,
      accompaniment1,
      accompaniment2,
    });

    // Reset form
    setMeat1('');
    setMeat2('');
    setCheese1('');
    setCheese2('');
    setFruit1('');
    setFruit2('');
    setAccompaniment1('');
    setAccompaniment2('');
    setErrors({});
  };

  const handleClose = () => {
    setMeat1('');
    setMeat2('');
    setCheese1('');
    setCheese2('');
    setFruit1('');
    setFruit2('');
    setAccompaniment1('');
    setAccompaniment2('');
    setErrors({});
    onClose();
  };

  const isComplete = meat1 && meat2 && cheese1 && cheese2 && fruit1 && fruit2 && accompaniment1 && accompaniment2;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity touch-none"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 touch-none overflow-hidden">
        <div className="bg-[#faf9f7] w-full max-w-3xl shadow-2xl h-[90vh] flex flex-col relative touch-auto">
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
              <p className="editorial-label text-[#c4a265] mb-2">BUILD YOUR BOX</p>
              <h2 className="editorial-heading text-[#0f0f0f] mb-3">Custom Charcuterie</h2>
              <div className="flex items-center justify-between mb-2">
                <p className="editorial-small text-[#6b6b6b]">{productName}</p>
                <p className="editorial-label text-[#0f0f0f]">${productPrice.toFixed(2)}</p>
              </div>
              <p className="editorial-small text-[#9ca3af]">Select 2 from each category • Scroll for all options</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
            {/* Charcuterie Meats */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Charcuterie Meat #1 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={meat1}
                onChange={(e) => setMeat1(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {MEATS.map((meat) => (
                  <option key={meat} value={meat}>{meat}</option>
                ))}
              </select>
              {errors.meat1 && <p className="editorial-small text-[#c4a265] mt-2">{errors.meat1}</p>}
            </div>

            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Charcuterie Meat #2 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={meat2}
                onChange={(e) => setMeat2(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {MEATS.map((meat) => (
                  <option key={meat} value={meat}>{meat}</option>
                ))}
              </select>
              {errors.meat2 && <p className="editorial-small text-[#c4a265] mt-2">{errors.meat2}</p>}
            </div>

            {/* Artisan Cheeses */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Artisan Cheese #1 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={cheese1}
                onChange={(e) => setCheese1(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {CHEESES.map((cheese) => (
                  <option key={cheese} value={cheese}>{cheese}</option>
                ))}
              </select>
              {errors.cheese1 && <p className="editorial-small text-[#c4a265] mt-2">{errors.cheese1}</p>}
            </div>

            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Artisan Cheese #2 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={cheese2}
                onChange={(e) => setCheese2(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {CHEESES.map((cheese) => (
                  <option key={cheese} value={cheese}>{cheese}</option>
                ))}
              </select>
              {errors.cheese2 && <p className="editorial-small text-[#c4a265] mt-2">{errors.cheese2}</p>}
            </div>

            {/* Fruits */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Fruit #1 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={fruit1}
                onChange={(e) => setFruit1(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {FRUITS.map((fruit) => (
                  <option key={fruit} value={fruit}>{fruit}</option>
                ))}
              </select>
              {errors.fruit1 && <p className="editorial-small text-[#c4a265] mt-2">{errors.fruit1}</p>}
            </div>

            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Fruit #2 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={fruit2}
                onChange={(e) => setFruit2(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {FRUITS.map((fruit) => (
                  <option key={fruit} value={fruit}>{fruit}</option>
                ))}
              </select>
              {errors.fruit2 && <p className="editorial-small text-[#c4a265] mt-2">{errors.fruit2}</p>}
            </div>

            {/* Extras */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Extra #1 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={accompaniment1}
                onChange={(e) => setAccompaniment1(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {ACCOMPANIMENTS.map((acc) => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
              </select>
              {errors.accompaniment1 && <p className="editorial-small text-[#c4a265] mt-2">{errors.accompaniment1}</p>}
            </div>

            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Extra #2 <span className="text-[#c4a265]">*</span>
              </label>
              <select
                value={accompaniment2}
                onChange={(e) => setAccompaniment2(e.target.value)}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
              >
                <option value="">Select an option</option>
                {ACCOMPANIMENTS.map((acc) => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
              </select>
              {errors.accompaniment2 && <p className="editorial-small text-[#c4a265] mt-2">{errors.accompaniment2}</p>}
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
