'use client';

interface FilterOption {
  value: string;
  label: string;
}

interface FleetFiltersProps {
  selectedCategory: string;
  selectedSize: string;
  selectedLocation: string;
  selectedToys: string[];
  onCategoryChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onToyToggle: (value: string) => void;
}

export default function FleetFilters({
  selectedCategory,
  selectedSize,
  selectedLocation,
  selectedToys,
  onCategoryChange,
  onSizeChange,
  onLocationChange,
  onToyToggle,
}: FleetFiltersProps) {
  const categories: FilterOption[] = [
    { value: 'all', label: 'ALL' },
    { value: 'day boat', label: 'DAY BOATS' },
    { value: 'luxury yacht', label: 'LUXURY YACHTS' },
    { value: 'super yacht', label: 'SUPERYACHTS' },
    { value: 'event vessels', label: 'EVENT VESSELS' },
  ];

  const sizes: FilterOption[] = [
    { value: '', label: 'ALL SIZES' },
    { value: '20-40 ft', label: '20–40 FT' },
    { value: '40-60 ft', label: '40–60 FT' },
    { value: '60-80 ft', label: '60–80 FT' },
    { value: '80-100 ft', label: '80–100 FT' },
    { value: '100+ ft', label: '100 FT+' },
  ];

  const locations: FilterOption[] = [
    { value: '', label: 'ALL LOCATIONS' },
    { value: 'Miami Beach', label: 'MIAMI BEACH' },
    { value: 'Key Biscayne', label: 'KEY BISCAYNE' },
    { value: 'Coconut Grove', label: 'COCONUT GROVE' },
    { value: 'Fort Lauderdale', label: 'FORT LAUDERDALE' },
    { value: 'Hollywood', label: 'HOLLYWOOD' },
  ];

  const toys: FilterOption[] = [
    { value: 'jacuzzi', label: 'JACUZZI' },
    { value: 'jet-ski', label: 'JET SKI' },
    { value: 'seabob', label: 'SEABOB' },
  ];

  const FilterButton = ({ 
    isActive, 
    onClick, 
    children 
  }: { 
    isActive: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-3 py-2.5 border transition-all duration-300 font-medium text-xs tracking-wider uppercase
        ${isActive 
          ? 'bg-[#0f0f0f] border-[#0f0f0f] text-white' 
          : 'bg-transparent border-[#d0d0d0] text-[#0f0f0f] hover:bg-[#f0ece6]'
        }
      `}
      style={{ borderRadius: 0 }}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-8">
      {/* Row 1: CATEGORY */}
      <div>
        <div className="editorial-label text-[#6b6b6b] mb-3">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <FilterButton
              key={cat.value}
              isActive={selectedCategory === cat.value}
              onClick={() => onCategoryChange(cat.value)}
            >
              {cat.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Row 2: SIZE */}
      <div>
        <div className="editorial-label text-[#6b6b6b] mb-3">Size</div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <FilterButton
              key={size.value}
              isActive={selectedSize === size.value}
              onClick={() => onSizeChange(size.value)}
            >
              {size.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Row 3: DEPARTURE LOCATION */}
      <div>
        <div className="editorial-label text-[#6b6b6b] mb-3">Departure Location</div>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <FilterButton
              key={loc.value}
              isActive={selectedLocation === loc.value}
              onClick={() => onLocationChange(loc.value)}
            >
              {loc.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Row 4: WATER TOYS */}
      <div>
        <div className="editorial-label text-[#6b6b6b] mb-3">Water Toys</div>
        <div className="flex flex-wrap gap-2">
          {toys.map((toy) => (
            <FilterButton
              key={toy.value}
              isActive={selectedToys.includes(toy.value)}
              onClick={() => onToyToggle(toy.value)}
            >
              {toy.label}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );
}
