'use client';

interface FilterToggleProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  label: string;
}

export default function FilterToggle({ options, selected, onChange, label }: FilterToggleProps) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-[#6b6b6b] mb-3 font-normal">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option === selected ? '' : option)}
            className={`px-4 py-2 text-[11px] uppercase tracking-[0.08em] transition-all duration-300 font-light ${
              option === selected
                ? 'bg-[#0f0f0f] text-white'
                : 'bg-white text-[#6b6b6b] hover:bg-[#f0ece6] border border-black/5'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
