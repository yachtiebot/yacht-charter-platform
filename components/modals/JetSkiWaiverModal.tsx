'use client';

import { useState } from 'react';

export interface JetSkiWaiverData {
  // Acknowledgments
  floridaLaws: boolean;
  damageDeposit: boolean;
  damageToVessel: boolean;
  maximumQuantity: boolean;
  appointments: boolean;
  creditCardID: boolean;
  thirdPartyVendor: boolean;
  
  // Timestamp
  acceptedAt: string;
}

interface JetSkiWaiverModalProps {
  isOpen: boolean;
  productName: string;
  productPrice: number;
  onClose: () => void;
  onAccept: (waiverData: JetSkiWaiverData) => void;
}

export default function JetSkiWaiverModal({
  isOpen,
  productName,
  productPrice,
  onClose,
  onAccept,
}: JetSkiWaiverModalProps) {
  const [formData, setFormData] = useState({
    floridaLaws: false,
    damageDeposit: false,
    damageToVessel: false,
    maximumQuantity: false,
    appointments: false,
    creditCardID: false,
    thirdPartyVendor: false,
  });

  if (!isOpen) return null;

  const allAcknowledged = Object.values(formData).every(val => val === true);

  const handleCheckbox = (field: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    if (!allAcknowledged) return;
    
    const waiverData: JetSkiWaiverData = {
      ...formData,
      acceptedAt: new Date().toISOString(),
    };
    
    onAccept(waiverData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Jet Ski Acknowledgements
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

          {/* 1. Florida Jet Ski Laws */}
          <div className="space-y-3">
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.floridaLaws}
                onChange={() => handleCheckbox('floridaLaws')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I confirm that I have reviewed Florida jet ski laws and minimum age requirements for operating a jet ski in Miami Dade County using the links provided. If I do not meet the requirements to operate without a boating license, I agree to complete the required course before my rental. I am responsible for ensuring that all members of my group who operate the jet skis meet these requirements. Miami Yachting Group LLC is not responsible for any lost rental time if these requirements are not satisfied.
              </p>
            </label>
          </div>

          {/* 2. Damage Security Deposit */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Damage security deposit <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.damageDeposit}
                onChange={() => handleCheckbox('damageDeposit')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that jet skis are provided by an independent third party vendor who requires a damage security deposit at the time of delivery. The jet ski vendor will refund the deposit at the end of the rental if no damage occurs. Failure or refusal to pay the vendor's required deposit, as determined by the jet ski vendor, may result in cancellation of jet ski usage and forfeiture of rental time without refund.
              </p>
            </label>
          </div>

          {/* 3. Damage to the Vessel */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Damage to the vessel by jet skis <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.damageToVessel}
                onChange={() => handleCheckbox('damageToVessel')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that I am responsible for any damage caused by myself or my guests to the charter vessel or any related equipment or accessories resulting from jet ski use, and I agree to cover the cost of repairs.
              </p>
            </label>
          </div>

          {/* 4. Maximum Quantity */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Maximum quantity of jet skis allowed <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.maximumQuantity}
                onChange={() => handleCheckbox('maximumQuantity')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that a maximum of two jet skis are permitted at any vessel at any time.
              </p>
            </label>
          </div>

          {/* 5. Jet Ski Appointments */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Jet ski appointments <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.appointments}
                onChange={() => handleCheckbox('appointments')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I understand that jet skis are scheduled through an independent third party vendor on an appointment only basis. If I or any member of my group arrives late to the charter vessel's scheduled departure time, jet ski usage time may be reduced or forfeited. Jet ski time cannot be rescheduled and any lost time due to late arrival will not be refunded.
              </p>
            </label>
          </div>

          {/* 6. Credit Card and ID */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Credit card and ID acknowledgement <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.creditCardID}
                onChange={() => handleCheckbox('creditCardID')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                I authorize Miami Yachting Group LLC to charge my credit or debit card for the amount shown for this booking. I understand that I must present this card in person on the day of the rental along with matching government issued identification for verification. Failure to present the required card and identification may result in cancellation of jet ski usage by the vendor without refund.
              </p>
            </label>
          </div>

          {/* 7. Third Party Vendor Disclosure */}
          <div className="space-y-2">
            <p className="text-sm text-[#0f0f0f]" style={{ fontWeight: 300 }}>
              Third Party Vendor Disclosure and Liability Acknowledgment <span className="italic text-[#6b6b6b]">(required)</span>
            </p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.thirdPartyVendor}
                onChange={() => handleCheckbox('thirdPartyVendor')}
                className="mt-0.5 w-5 h-5 border border-[#d0d0d0] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-[#0f0f0f] leading-relaxed" style={{ fontWeight: 300 }}>
                Jet skis are provided, operated, and supervised by an independent third party vendor, not by the yacht owner or the yacht charter brokerage. The jet ski rental is a separate service subject to the jet ski vendor's own rules, licenses, permits, and requirements. The yacht owner and charter brokerage do not operate, supervise, or control jet ski use. I acknowledge that jet ski activities involve inherent risks and I choose to use the jet ski vendor's services at my own discretion and responsibility. I agree to release and hold harmless the yacht owner, the yacht charter brokerage, and Miami Yachting Group LLC from any claims arising out of or related to jet ski use. By submitting this form and typing my name below, I agree that this acknowledgment is legally binding and constitutes my electronic signature.
              </p>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-black/10 p-6">
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
              {allAcknowledged ? 'Accept & Add to Cart' : `Check All Boxes (${Object.values(formData).filter(v => v).length}/7)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
