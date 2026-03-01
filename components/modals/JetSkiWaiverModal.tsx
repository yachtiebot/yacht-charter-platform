'use client';

import { useState } from 'react';

export interface JetSkiWaiverData {
  // Acknowledgments
  acknowledgeLiability: boolean;
  acknowledgeAge: boolean;
  acknowledgeInsurance: boolean;
  acknowledgeOperation: boolean;
  acknowledgeSafety: boolean;
  acknowledgeEquipment: boolean;
  acknowledgeWeather: boolean;
  acknowledgeCompliance: boolean;
  acknowledgeRelease: boolean;
  
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
    acknowledgeLiability: false,
    acknowledgeAge: false,
    acknowledgeInsurance: false,
    acknowledgeOperation: false,
    acknowledgeSafety: false,
    acknowledgeEquipment: false,
    acknowledgeWeather: false,
    acknowledgeCompliance: false,
    acknowledgeRelease: false,
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
            <div>
              <h2 className="text-2xl font-light text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Jet Ski Liability Waiver & Acknowledgment
              </h2>
              <p className="text-sm text-[#6b6b6b] mt-1">
                Please read carefully and acknowledge all terms before proceeding
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#6b6b6b] hover:text-[#0f0f0f] text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div className="bg-[#f0ece6] p-4 border-l-4 border-[#c4a265]">
            <p className="text-sm text-[#0f0f0f]">
              <strong>Product:</strong> {productName}
            </p>
            <p className="text-sm text-[#6b6b6b] mt-1">
              By accepting this waiver, you acknowledge the risks associated with jet ski operation and rental.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-900 font-medium">
              ⚠️ IMPORTANT: This is a legal document that affects your rights. Please read carefully.
            </p>
          </div>

          {/* Waiver Content */}
          <div className="space-y-4">
            {/* 1. Liability Acknowledgment */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeLiability}
                onChange={() => handleCheckbox('acknowledgeLiability')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>1. Assumption of Risk:</strong> I understand and acknowledge that operating a jet ski involves inherent risks, including but not limited to personal injury, property damage, and death. I voluntarily assume all risks associated with jet ski operation.
                </p>
              </div>
            </label>

            {/* 2. Age Requirement */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeAge}
                onChange={() => handleCheckbox('acknowledgeAge')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>2. Age & Licensing:</strong> I confirm that I am at least 18 years of age and possess a valid driver's license or boating license as required by local law. I understand that I may be required to present valid identification and licensing documentation.
                </p>
              </div>
            </label>

            {/* 3. Insurance */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeInsurance}
                onChange={() => handleCheckbox('acknowledgeInsurance')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>3. Insurance & Liability:</strong> I understand that I am responsible for any damage to the jet ski, injury to myself or others, and any property damage that may occur during the rental period. I acknowledge that my personal insurance may be primary in the event of an accident.
                </p>
              </div>
            </label>

            {/* 4. Safe Operation */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeOperation}
                onChange={() => handleCheckbox('acknowledgeOperation')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>4. Safe Operation:</strong> I agree to operate the jet ski in a safe and responsible manner, following all applicable laws, regulations, and instructions provided by Miami Yachting Company. I will not operate the jet ski while under the influence of alcohol or drugs.
                </p>
              </div>
            </label>

            {/* 5. Safety Equipment */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeSafety}
                onChange={() => handleCheckbox('acknowledgeSafety')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>5. Safety Equipment:</strong> I acknowledge that I have been provided with appropriate safety equipment, including a life jacket, and I agree to use this equipment at all times while operating the jet ski.
                </p>
              </div>
            </label>

            {/* 6. Equipment Condition */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeEquipment}
                onChange={() => handleCheckbox('acknowledgeEquipment')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>6. Equipment Condition:</strong> I acknowledge that I have inspected the jet ski and found it to be in good working condition. I agree to immediately report any mechanical issues or safety concerns to Miami Yachting Company.
                </p>
              </div>
            </label>

            {/* 7. Weather Conditions */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeWeather}
                onChange={() => handleCheckbox('acknowledgeWeather')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>7. Weather & Environmental Conditions:</strong> I understand that water conditions, weather, and visibility can change rapidly. I agree to exercise caution and return the jet ski immediately if conditions become unsafe.
                </p>
              </div>
            </label>

            {/* 8. Compliance */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeCompliance}
                onChange={() => handleCheckbox('acknowledgeCompliance')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>8. Legal Compliance:</strong> I agree to comply with all federal, state, and local laws and regulations governing jet ski operation, including speed limits, restricted areas, and right-of-way rules.
                </p>
              </div>
            </label>

            {/* 9. Release of Liability */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.acknowledgeRelease}
                onChange={() => handleCheckbox('acknowledgeRelease')}
                className="mt-1 w-5 h-5 border-2 border-[#d0d0d0] cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm text-[#0f0f0f] group-hover:text-[#c4a265] transition-colors">
                  <strong>9. Release of Liability:</strong> I hereby release, waive, and discharge Miami Yachting Company, its owners, employees, and agents from any and all liability, claims, demands, or causes of action arising from my use of the jet ski, including those based on negligence or breach of warranty.
                </p>
              </div>
            </label>
          </div>

          {/* Final Acknowledgment */}
          <div className="bg-[#f0ece6] p-4 border-l-4 border-[#c4a265]">
            <p className="text-sm text-[#0f0f0f]">
              By checking all boxes above and clicking "Accept & Add to Cart," I acknowledge that I have read, understood, and agree to be bound by all terms of this waiver. I understand that this agreement will be attached to my reservation and emailed to me for my records.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-black/10 p-6">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm uppercase tracking-wider text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!allAcknowledged}
              className={`px-8 py-3 text-sm uppercase tracking-wider transition-all ${
                allAcknowledged
                  ? 'bg-[#c4a265] text-white hover:bg-[#b39155]'
                  : 'bg-[#d0d0d0] text-[#6b6b6b] cursor-not-allowed'
              }`}
            >
              {allAcknowledged ? 'Accept & Add to Cart' : `Check All Boxes to Continue (${Object.values(formData).filter(v => v).length}/9)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
