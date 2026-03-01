'use client';

import { useState } from 'react';

export interface FloatingEquipmentWaiverData {
  // Acknowledgments
  cancellationPolicy: boolean;
  damageDeposit: boolean;
  properUse: boolean;
  liabilityAcknowledgement: boolean;
  cardAuthorization: boolean;
  rentalPrice: boolean;
  
  // Timestamp
  acceptedAt: string;
}

interface FloatingEquipmentWaiverModalProps {
  isOpen: boolean;
  productName: string;
  productPrice: number;
  onClose: () => void;
  onAccept: (waiverData: FloatingEquipmentWaiverData) => void;
}

export default function FloatingEquipmentWaiverModal({
  isOpen,
  productName,
  productPrice,
  onClose,
  onAccept,
}: FloatingEquipmentWaiverModalProps) {
  const [formData, setFormData] = useState({
    cancellationPolicy: false,
    damageDeposit: false,
    properUse: false,
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
    
    const waiverData: FloatingEquipmentWaiverData = {
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
              Floating Equipment Acknowledgements
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
          {/* Intro Text */}
          <div>
            <p className="text-sm text-[#6b6b6b]" style={{ fontWeight: 300 }}>
              Please certify the following statement <span className="italic">(required)</span>
            </p>
          </div>

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

          {/* 3. Proper Use and Safety */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Proper Use and Safety <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.properUse}
                onChange={() => handleCheckbox('properUse')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that floating equipment must be properly secured and supervised at all times. I acknowledge that this equipment is designed for calm water use only and must be retrieved or secured in the event of changing weather conditions. I am responsible for the safety of all persons using this equipment and agree to follow all manufacturer guidelines and vendor instructions.
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
              Rental Terms <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rentalPrice}
                onChange={() => handleCheckbox('rentalPrice')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand and acknowledge the rental price and terms for this item. I agree to return the equipment in the same condition as received, normal wear and tear excepted. Any loss or damage beyond normal use will be charged to the card on file.
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
