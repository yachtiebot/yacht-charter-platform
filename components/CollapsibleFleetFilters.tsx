'use client';

import { useState, useMemo } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface CollapsibleFleetFiltersProps {
  selectedCategory: string;
  selectedSize: string;
  selectedLocation: string;
  selectedToys: string[];
  selectedAmenities: string[];
  selectedYachtType: string;
  selectedPriceRange: [number, number];
  instantBookableOnly: boolean;
  weekdayDiscountOnly: boolean;
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onToyToggle: (value: string) => void;
  onAmenityToggle: (value: string) => void;
  onYachtTypeChange: (value: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onInstantBookableToggle: () => void;
  onWeekdayDiscountToggle: () => void;
  onClearAll: () => void;
}

export default function CollapsibleFleetFilters({
  selectedCategory,
  selectedSize,
  selectedLocation,
  selectedToys,
  selectedAmenities,
  selectedYachtType,
  selectedPriceRange,
  instantBookableOnly,
  weekdayDiscountOnly,
  minPrice,
  maxPrice,
  onCategoryChange,
  onSizeChange,
  onLocationChange,
  onToyToggle,
  onAmenityToggle,
  onYachtTypeChange,
  onPriceRangeChange,
  onInstantBookableToggle,
  onWeekdayDiscountToggle,
  onClearAll,
}: CollapsibleFleetFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const categories: FilterOption[] = [
    { value: 'all', label: 'ALL' },
    { value: 'day boat', label: 'DAY BOATS' },
    { value: 'luxury yacht', label: 'LUXURY YACHTS' },
    { value: 'super yacht', label: 'SUPERYACHTS' },
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
    { value: 'Miami', label: 'MIAMI' },
  ];

  const yachtTypes: FilterOption[] = [
    { value: '', label: 'ALL TYPES' },
    { value: 'flybridge', label: 'FLYBRIDGE' },
    { value: 'cruiser', label: 'CRUISER' },
    { value: 'catamaran', label: 'CATAMARAN' },
  ];

  // Water Toys (from toys: field in Airtable)
  const toys: FilterOption[] = [
    { value: 'Inflatables', label: 'INFLATABLES' },
    { value: 'Floating Island', label: 'FLOATING ISLAND' },
    { value: 'Waterslide', label: 'WATERSLIDE' },
    { value: 'Jet Ski', label: 'JET SKI' },
    { value: 'SeaBob', label: 'SEABOB' },
  ];

  // Onboard Amenities (from amenities: field in Airtable)
  const amenities: FilterOption[] = [
    { value: 'Tender', label: 'TENDER' },
    { value: 'Air-conditioning', label: 'AIR-CONDITIONING' },
    { value: 'Jacuzzi', label: 'JACUZZI' },
    { value: 'Barbecue Grill', label: 'BARBECUE GRILL' },
    { value: 'Wet Bar', label: 'WET BAR' },
    { value: 'Kitchen', label: 'KITCHEN' },
  ];

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      selectedCategory !== 'all' ||
      selectedSize !== '' ||
      selectedLocation !== '' ||
      selectedToys.length > 0 ||
      selectedAmenities.length > 0 ||
      selectedYachtType !== '' ||
      selectedPriceRange[0] !== minPrice ||
      selectedPriceRange[1] !== maxPrice ||
      instantBookableOnly ||
      weekdayDiscountOnly
    );
  }, [selectedCategory, selectedSize, selectedLocation, selectedToys, selectedAmenities, selectedYachtType, selectedPriceRange, instantBookableOnly, weekdayDiscountOnly, minPrice, maxPrice]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedSize !== '') count++;
    if (selectedLocation !== '') count++;
    if (selectedToys.length > 0) count += selectedToys.length;
    if (selectedAmenities.length > 0) count += selectedAmenities.length;
    if (selectedYachtType !== '') count++;
    if (selectedPriceRange[0] !== minPrice || selectedPriceRange[1] !== maxPrice) count++;
    if (instantBookableOnly) count++;
    if (weekdayDiscountOnly) count++;
    return count;
  }, [selectedCategory, selectedSize, selectedLocation, selectedToys, selectedAmenities, selectedYachtType, selectedPriceRange, instantBookableOnly, weekdayDiscountOnly, minPrice, maxPrice]);

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="border-b border-[#e5e5e5]">
      {/* Master Filters Toggle with Active Indicator and Clear All */}
      <div className="flex items-center justify-between py-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-3 editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
        >
          <span>FILTERS</span>
          <span className="text-lg">{filtersOpen ? '−' : '+'}</span>
          {hasActiveFilters && (
            <span className="bg-[#c4a265] text-white text-[10px] px-2 py-0.5 font-medium">
              {activeFilterCount} ACTIVE
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="editorial-label text-xs text-[#6b6b6b] hover:text-[#c4a265] transition-colors uppercase"
          >
            CLEAR ALL FILTERS
          </button>
        )}
      </div>

      {/* Filter Sections (inside master toggle) */}
      {filtersOpen && (
        <div className="space-y-4 pb-4">
          {/* PRIORITY FILTERS (Top 3) */}
          
          {/* 1. SIZE (Most Important) */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('size')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>SIZE {selectedSize && <span className="text-[#c4a265] ml-2">✓</span>}</span>
              <span className="text-lg">{expandedSection === 'size' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'size' && (
              <div className="flex flex-wrap gap-2 mt-4">
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
            )}
          </div>

          {/* 2. LOCATION (Second Priority) */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>DEPARTURE LOCATION {selectedLocation && <span className="text-[#c4a265] ml-2">✓</span>}</span>
              <span className="text-lg">{expandedSection === 'location' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'location' && (
              <div className="flex flex-wrap gap-2 mt-4">
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
            )}
          </div>

          {/* 3. PRICE (Third Priority) */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>PRICE RANGE {(selectedPriceRange[0] !== minPrice || selectedPriceRange[1] !== maxPrice) && <span className="text-[#c4a265] ml-2">✓</span>}</span>
              <span className="text-lg">{expandedSection === 'price' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'price' && (
              <div className="mt-4 px-2">
                <div className="flex justify-between text-sm text-[#6b6b6b] mb-3">
                  <span>${selectedPriceRange[0]}</span>
                  <span>${selectedPriceRange[1]}</span>
                </div>
                <div className="relative">
                  {/* Dual Range Slider */}
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={selectedPriceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin <= selectedPriceRange[1]) {
                        onPriceRangeChange([newMin, selectedPriceRange[1]]);
                      }
                    }}
                    className="w-full h-2 bg-[#e5e5e5] rounded-lg appearance-none cursor-pointer accent-[#0f0f0f]"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={selectedPriceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax >= selectedPriceRange[0]) {
                        onPriceRangeChange([selectedPriceRange[0], newMax]);
                      }
                    }}
                    className="w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-[#0f0f0f] -mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECONDARY FILTERS */}

          {/* Category */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>CATEGORY {selectedCategory !== 'all' && <span className="text-[#c4a265] ml-2">✓</span>}</span>
              <span className="text-lg">{expandedSection === 'category' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'category' && (
              <div className="flex flex-wrap gap-2 mt-4">
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
            )}
          </div>

          {/* Yacht Type (NEW) */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('yachtType')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>YACHT TYPE {selectedYachtType && <span className="text-[#c4a265] ml-2">✓</span>}</span>
              <span className="text-lg">{expandedSection === 'yachtType' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'yachtType' && (
              <div className="flex flex-wrap gap-2 mt-4">
                {yachtTypes.map((type) => (
                  <FilterButton
                    key={type.value}
                    isActive={selectedYachtType === type.value}
                    onClick={() => onYachtTypeChange(type.value)}
                  >
                    {type.label}
                  </FilterButton>
                ))}
              </div>
            )}
          </div>

          {/* Water Toys */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('toys')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>WATER TOYS {selectedToys.length > 0 && <span className="text-[#c4a265] ml-2">({selectedToys.length})</span>}</span>
              <span className="text-lg">{expandedSection === 'toys' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'toys' && (
              <div className="flex flex-wrap gap-2 mt-4">
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
            )}
          </div>

          {/* Onboard Amenities */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={() => toggleSection('amenities')}
              className="w-full flex justify-between items-center editorial-label text-[#6b6b6b] hover:text-[#0f0f0f] transition-colors"
            >
              <span>ONBOARD AMENITIES {selectedAmenities.length > 0 && <span className="text-[#c4a265] ml-2">({selectedAmenities.length})</span>}</span>
              <span className="text-lg">{expandedSection === 'amenities' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'amenities' && (
              <div className="flex flex-wrap gap-2 mt-4">
                {amenities.map((amenity) => (
                  <FilterButton
                    key={amenity.value}
                    isActive={selectedAmenities.includes(amenity.value)}
                    onClick={() => onAmenityToggle(amenity.value)}
                  >
                    {amenity.label}
                  </FilterButton>
                ))}
              </div>
            )}
          </div>

          {/* Instant Booking Toggle (at bottom) */}
          <div className="border-b border-[#e5e5e5] pb-4">
            <button
              onClick={onInstantBookableToggle}
              className="w-full flex justify-between items-center group"
            >
              <span className="editorial-label text-[#6b6b6b] group-hover:text-[#0f0f0f] transition-colors">
                INSTANT BOOKING {instantBookableOnly && <span className="text-[#c4a265] ml-2">✓</span>}
              </span>
              <div className={`w-12 h-6 rounded-full transition-all duration-300 ${instantBookableOnly ? 'bg-[#0f0f0f]' : 'bg-[#d0d0d0]'}`}>
                <div className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-all duration-300 ${instantBookableOnly ? 'ml-6' : 'ml-0.5'}`} />
              </div>
            </button>
          </div>

          {/* Weekday Discount Toggle (at bottom) */}
          <div className="pb-4">
            <button
              onClick={onWeekdayDiscountToggle}
              className="w-full flex justify-between items-center group"
            >
              <span className="editorial-label text-[#6b6b6b] group-hover:text-[#0f0f0f] transition-colors">
                WEEKDAY DISCOUNT {weekdayDiscountOnly && <span className="text-[#c4a265] ml-2">✓</span>}
              </span>
              <div className={`w-12 h-6 rounded-full transition-all duration-300 ${weekdayDiscountOnly ? 'bg-[#0f0f0f]' : 'bg-[#d0d0d0]'}`}>
                <div className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-all duration-300 ${weekdayDiscountOnly ? 'ml-6' : 'ml-0.5'}`} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
