'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface CakeCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customization: CakeCustomization) => void;
  productName: string;
  productPrice: number;
}

export interface CakeCustomization {
  flavor: 'vanilla' | 'chocolate' | '';
  message: string;
  allergyNotes: string;
}

export default function CakeCustomizationModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  productPrice,
}: CakeCustomizationModalProps) {
  const [flavor, setFlavor] = useState<'vanilla' | 'chocolate' | ''>('');
  const [message, setMessage] = useState('');
  const [allergyNotes, setAllergyNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!flavor) {
      newErrors.flavor = 'Please select a cake flavor';
    }

    if (message.length > 50) {
      newErrors.message = 'Message must be 50 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      flavor,
      message: message.trim(),
      allergyNotes: allergyNotes.trim(),
    });

    // Reset form
    setFlavor('');
    setMessage('');
    setAllergyNotes('');
    setErrors({});
  };

  const handleClose = () => {
    setFlavor('');
    setMessage('');
    setAllergyNotes('');
    setErrors({});
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#faf9f7] w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e5e5]/30 px-10 py-8">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pr-12">
              <p className="editorial-label text-[#c4a265] mb-2">PERSONALIZE</p>
              <h2 className="editorial-heading text-[#0f0f0f] mb-3">Customize your cake</h2>
              <p className="editorial-small text-[#6b6b6b]">{productName} • ${productPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-10 py-8 space-y-10">
            {/* Cake Flavor */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Cake flavor <span className="text-[#c4a265]">*</span>
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">Select your cake batter</p>
              
              <div className="space-y-4">
                <label className="flex items-center cursor-pointer group py-4 px-6 border border-[#e5e5e5] hover:border-[#c4a265] transition-all duration-300">
                  <input
                    type="radio"
                    name="flavor"
                    value="vanilla"
                    checked={flavor === 'vanilla'}
                    onChange={(e) => setFlavor(e.target.value as 'vanilla')}
                    className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0"
                  />
                  <span className="ml-4 editorial-body text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                    Vanilla
                  </span>
                </label>

                <label className="flex items-center cursor-pointer group py-4 px-6 border border-[#e5e5e5] hover:border-[#c4a265] transition-all duration-300">
                  <input
                    type="radio"
                    name="flavor"
                    value="chocolate"
                    checked={flavor === 'chocolate'}
                    onChange={(e) => setFlavor(e.target.value as 'chocolate')}
                    className="w-4 h-4 text-[#c4a265] border-[#e5e5e5] focus:ring-[#c4a265] focus:ring-offset-0"
                  />
                  <span className="ml-4 editorial-body text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                    Chocolate
                  </span>
                </label>
              </div>

              {errors.flavor && (
                <p className="editorial-small text-[#c4a265] mt-3">{errors.flavor}</p>
              )}
            </div>

            {/* Custom Message */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Custom cake message
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">
                What do you want your cake to say?
              </p>
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. 'Happy Birthday!'"
                maxLength={50}
                rows={3}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 resize-none editorial-body text-[#0f0f0f] placeholder:text-[#9ca3af]"
              />
              
              <div className="flex justify-between items-center mt-3">
                <span className="editorial-small text-[#9ca3af]">
                  {message.length} / 50 characters
                </span>
                {errors.message && (
                  <p className="editorial-small text-[#c4a265]">{errors.message}</p>
                )}
              </div>
            </div>

            {/* Allergy Notes */}
            <div>
              <label className="block editorial-label text-[#0f0f0f] mb-2">
                Special allergy requests or omissions
              </label>
              <p className="editorial-small text-[#6b6b6b] mb-6">
                Input any allergy concerns for your order or items
              </p>
              
              <textarea
                value={allergyNotes}
                onChange={(e) => setAllergyNotes(e.target.value)}
                placeholder="Input request here"
                rows={4}
                className="w-full px-6 py-4 border border-[#e5e5e5] bg-white focus:border-[#c4a265] focus:ring-0 transition-colors duration-300 resize-none editorial-body text-[#0f0f0f] placeholder:text-[#9ca3af]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-[#faf9f7] border-t border-[#e5e5e5]/30 px-10 py-8">
            <button
              onClick={handleSubmit}
              disabled={!flavor}
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
