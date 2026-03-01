'use client';

import { useState, useMemo } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface CollapsibleCateringFiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onClearAll: () => void;
}

export default function CollapsibleCateringFilters({
  selectedCategory,
  onCategoryChange,
  onClearAll,
}: CollapsibleCateringFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const categories: FilterOption[] = [
    { value: 'all', label: 'ALL ITEMS' },
    { value: 'sandwiches', label: 'SANDWICHES & WRAPS' },
    { value: 'platters', label: 'PLATTERS' },
    { value: 'seafood', label: 'SEAFOOD' },
    { value: 'bowls', label: 'BOWLS & SALADS' },
    { value: 'vegetarian', label: 'VEGETARIAN' },
    { value: 'desserts', label: 'DESSERTS' },
  ];

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return selectedCategory !== 'all';
  }, [selectedCategory]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return selectedCategory !== 'all' ? 1 : 0;
  }, [selectedCategory]);

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
        <div className="pb-4">
          {/* CATEGORY FILTERS */}
          <div className="pb-4">
            <div className="w-full editorial-label text-[#6b6b6b] mb-4">
              <span>CATEGORY {selectedCategory !== 'all' && <span className="text-[#c4a265] ml-2">✓</span>}</span>
            </div>
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
        </div>
      )}
    </div>
  );
}
