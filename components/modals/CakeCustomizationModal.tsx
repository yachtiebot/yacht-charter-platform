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
        <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#e5e5e5] px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-1">Customize your cake</h2>
              <p className="text-sm text-gray-600">{productName} • ${productPrice}</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-6">
            {/* Cake Flavor */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-gray-900 mb-3">
                Cake flavor <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-4">Select your cake batter</p>
              
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="flavor"
                    value="vanilla"
                    checked={flavor === 'vanilla'}
                    onChange={(e) => setFlavor(e.target.value as 'vanilla')}
                    className="w-5 h-5 text-[#c4a265] border-gray-300 focus:ring-[#c4a265]"
                  />
                  <span className="ml-3 text-gray-900 group-hover:text-[#c4a265] transition-colors">
                    Vanilla
                  </span>
                </label>

                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="flavor"
                    value="chocolate"
                    checked={flavor === 'chocolate'}
                    onChange={(e) => setFlavor(e.target.value as 'chocolate')}
                    className="w-5 h-5 text-[#c4a265] border-gray-300 focus:ring-[#c4a265]"
                  />
                  <span className="ml-3 text-gray-900 group-hover:text-[#c4a265] transition-colors">
                    Chocolate
                  </span>
                </label>
              </div>

              {errors.flavor && (
                <p className="text-red-500 text-sm mt-2">{errors.flavor}</p>
              )}
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-gray-900 mb-3">
                Custom cake message
              </label>
              <p className="text-sm text-gray-600 mb-4">
                What do you want your cake to say? (Up to 50 characters)
              </p>
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. 'Happy Birthday!'"
                maxLength={50}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#c4a265] focus:border-transparent resize-none"
              />
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {message.length}/50 characters
                </span>
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
            </div>

            {/* Allergy Notes */}
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-gray-900 mb-3">
                Special allergy requests or omissions for your order
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Input any allergy concerns for your order or items
              </p>
              
              <textarea
                value={allergyNotes}
                onChange={(e) => setAllergyNotes(e.target.value)}
                placeholder="Input request here"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#c4a265] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-[#e5e5e5] px-8 py-6">
            <button
              onClick={handleSubmit}
              disabled={!flavor}
              className="w-full bg-[#0f0f0f] text-white py-4 uppercase tracking-wider text-sm font-medium hover:bg-[#c4a265] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
