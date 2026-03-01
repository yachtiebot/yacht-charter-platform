'use client';

import { useState } from 'react';

export interface WaterSportsWaiverData {
  // Acknowledgments
  cancellationPolicy: boolean;
  damageDeposit: boolean;
  experienceAcknowledgement: boolean;
  liabilityAcknowledgement: boolean;
  cardAuthorization: boolean;
  rentalPrice: boolean;
  
  // Timestamp
  acceptedAt: string;
}

interface WaterSportsWaiverModalProps {
  isOpen: boolean;
  productName: string;
  productPrice: number;
  onClose: () => void;
  onAccept: (waiverData: WaterSportsWaiverData) => void;
}

export default function WaterSportsWaiverModal({
  isOpen,
  productName,
  productPrice,
  onClose,
  onAccept,
}: WaterSportsWaiverModalProps) {
  const [formData, setFormData] = useState({
    cancellationPolicy: false,
    damageDeposit: false,
    experienceAcknowledgement: false,
    liabilityAcknowledgement: false,
    cardAuthorization: false,
    rentalPrice: false,
  });

  if (!isOpen) return null;

  const allAcknowledged = Object.values(formData).every(val => val === true);

  const handleCheckbox = (field: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    if (!allAcknowledged) return;
    
    const waiverData: WaterSportsWaiverData = {
      ...formData,
      acceptedAt: new Date().toISOString(),
    };
    
    onAccept(waiverData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#faf9f7] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e5e5]/30 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              {productName} Acknowledgements
            </h2>
            <button
              onClick={onClose}
              className="text-[#6b6b6b] hover:text-[#0f0f0f] text-3xl leading-none font-light"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* 1. Cancellation Policy */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Cancellation Policy <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.cancellationPolicy}
                onChange={() => handleCheckbox('cancellationPolicy')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand this item is special ordered and delivered to my rental yacht, because of the custom nature of this delivery, 48 hours cancellation notice prior to my rental date is required for a refund. If I cancel less than 48 hours from my rental date, the rental vendor may charge a $100.00 cancellation fee per item.
              </p>
            </label>
          </div>

          {/* 2. Damage Deposit */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Damage Deposit <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.damageDeposit}
                onChange={() => handleCheckbox('damageDeposit')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand this rental item is provided by a 3rd party independent vendor who may charge a damage security deposit to rent this item. Damage security deposits are refunded at the end of the rental if myself or my guests do not damage the rental item. Normal wear and minor scratches do not constitute damage. Refusal to pay the vendor's required damage security deposit prior to usage may result in forfeiture of rental time and cancellation of the rental without refund.
              </p>
            </label>
          </div>

          {/* 3. Experience Acknowledgement */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Experience Acknowledgement <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.experienceAcknowledgement}
                onChange={() => handleCheckbox('experienceAcknowledgement')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that the usage of this item requires some limited knowledge. I understand there may be a level of physicality required on my part when using this rental item. Not being able to "stay on" the rental item does not constitute grounds for a refund.
              </p>
            </label>
          </div>

          {/* 4. Liability Acknowledgement */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Liability Acknowledgement <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.liabilityAcknowledgement}
                onChange={() => handleCheckbox('liabilityAcknowledgement')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that if myself or one of my guests cause damage to the charter vessel with the rental item, I will be charged for the repairs to the charter vessel. Furthermore, I understand that the yacht crew is not responsible for the safekeeping of this item or for the instructions on how to use the item. I am renting this item from a 3rd party vendor that is unrelated to my charter vessel or its crew.
              </p>
            </label>
          </div>

          {/* 5. Card and Charge Authorization */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Card and Charge Authorization <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.cardAuthorization}
                onChange={() => handleCheckbox('cardAuthorization')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I authorize Miami Yachting Group LLC to charge my credit/debit card in the amount shown for this booking. I will bring this card with me in person the day of my rental for verification as well as my matching ID. I understand that if I do not bring this card with me in person and my matching ID for verification purposes, my rental may be canceled by the vendor.
              </p>
            </label>
          </div>

          {/* 6. Rental Price */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Rental Price <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rentalPrice}
                onChange={() => handleCheckbox('rentalPrice')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand the price of the rental is $499.99 per item and that my initial payment of $99.00 per item will be deducted from my final balance, leaving me with a total due of $400.00 per item which is payable directly to the water toy vendor.
              </p>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#faf9f7] border-t border-[#e5e5e5]/30 p-6">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm uppercase tracking-wider text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
              style={{ fontWeight: 300 }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!allAcknowledged}
              className={`px-8 py-3 text-sm uppercase tracking-wider transition-all ${
                allAcknowledged
                  ? 'bg-[#0f0f0f] text-white hover:bg-[#c4a265]'
                  : 'bg-[#d0d0d0] text-[#6b6b6b] cursor-not-allowed'
              }`}
              style={{ fontWeight: 300 }}
            >
              {allAcknowledged ? 'Accept & Add to Cart' : `Check All Boxes (${Object.values(formData).filter(v => v).length}/6)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
