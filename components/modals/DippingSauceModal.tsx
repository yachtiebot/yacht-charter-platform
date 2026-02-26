'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface DippingSauceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customization: DippingSauceCustomization) => void;
  productName: string;
  productPrice: number;
}

export interface DippingSauceCustomization {
  sauce: string;
}

const SAUCES = [
  'Ranch',
  'Honey Mustard',
  'Blue Cheese',
  'BBQ',
  'Buffalo',
  'Chipotle Mayo'
];

export default function DippingSauceModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  productPrice,
}: DippingSauceModalProps) {
  const [sauce, setSauce] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!sauce) {
      setError('Please select a dipping sauce');
      return;
    }

    onSubmit({ sauce });
    setSauce('');
    setError('');
  };

  const handleClose = () => {
    setSauce('');
    setError('');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={handleClose} />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#faf9f7] w-full max-w-md shadow-2xl">
          <div className="bg-[#faf9f7] border-b border-[#e5e5e5]/30 px-10 py-8">
            <button onClick={handleClose} className="absolute top-6 right-6 p-2 text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="pr-12">
              <p className="editorial-label text-[#c4a265] mb-2">CHOOSE YOUR FLAVOR</p>
              <h2 className="editorial-heading text-[#0f0f0f] mb-3">Dipping Sauce</h2>
              <p className="editorial-small text-[#6b6b6b]">{productName} • ${productPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="px-10 py-8">
            <label className="block editorial-label text-[#0f0f0f] mb-4">
              Select Sauce <span className="text-[#c4a265]">*</span>
            </label>
            
            <select
              value={sauce}
              onChange={(e) => setSauce(e.target.value)}
              className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 editorial-body text-[#0f0f0f]"
            >
              <option value="">Select an option</option>
              {SAUCES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            
            {error && <p className="editorial-small text-[#c4a265] mt-3">{error}</p>}
          </div>

          <div className="bg-[#faf9f7] border-t border-[#e5e5e5]/30 px-10 py-8">
            <button
              onClick={handleSubmit}
              disabled={!sauce}
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
