'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';
import DarkFooter from '@/components/DarkFooter';

// Import catering products from scraped data
const cateringProducts = [
  // SANDWICHES & WRAPS
  { id: 'gourmet-wraps', name: 'Gourmet Wraps Platter', category: 'sandwiches', price: 69.99, serves: [8, 10, 15, 20, 25], description: 'Made fresh to order, includes lettuce and tomato', image: '/images/products/catering/gourmet-wraps.jpg' },
  { id: 'gourmet-spirals', name: 'Gourmet Spirals', category: 'sandwiches', price: 69.99, serves: [8, 10, 15, 20, 25], description: 'Assorted gourmet spiral wraps', image: '/images/products/catering/gourmet-spirals.jpg' },
  { id: 'slider-trio', name: 'Slider Trio', category: 'sandwiches', price: 89.99, serves: [8, 10, 15, 20], description: 'Three varieties of gourmet sliders', image: '/images/products/catering/slider-trio.jpg' },
  { id: 'cuban-platter', name: 'Cuban Platter', category: 'sandwiches', price: 79.99, serves: [8, 10, 15, 20], description: 'Authentic Cuban sandwiches', image: '/images/products/catering/cuban-platter.jpg' },
  
  // PLATTERS
  { id: 'shrimp-platter', name: 'Shrimp Platter', category: 'platters', price: 129.99, serves: [8, 10, 15, 20], description: 'Fresh jumbo shrimp with cocktail sauce', image: '/images/products/catering/shrimp-platter.jpg' },
  { id: 'chicken-tenders', name: 'Chicken Tenders', category: 'platters', price: 79.99, serves: [10, 15, 20, 25], description: 'Crispy chicken tenders', image: '/images/products/catering/chicken-tenders.jpg' },
  { id: 'chicken-wings', name: 'Chicken Wings', category: 'platters', price: 89.99, serves: [10, 15, 20, 25], description: 'Buffalo or BBQ chicken wings', image: '/images/products/catering/chicken-wings.jpg' },
  { id: 'large-charcuterie', name: 'Large Charcuterie Platter', category: 'platters', price: 149.99, serves: [15, 20, 25], description: 'Premium meats, cheeses, fruits, and nuts', image: '/images/products/catering/large-charcuterie.jpg' },
  { id: 'med-charcuterie', name: 'Medium Charcuterie Box', category: 'platters', price: 99.99, serves: [8, 10, 12], description: 'Curated selection of meats and cheeses', image: '/images/products/catering/med-charcuterie.jpg' },
  { id: 'antipasti', name: 'Antipasti Platter', category: 'platters', price: 89.99, serves: [8, 10, 15], description: 'Italian cured meats, cheeses, olives, and vegetables', image: '/images/products/catering/antipasti.jpg' },
  { id: 'cheese-taster', name: 'Cheese Taster Platter', category: 'platters', price: 79.99, serves: [8, 10, 12], description: 'Artisan cheese selection with accompaniments', image: '/images/products/catering/cheese-taster.jpg' },
  { id: 'pretzel-bagel', name: 'Pretzel & Bagel Bite Platter', category: 'platters', price: 69.99, serves: [10, 15, 20], description: 'Soft pretzels and mini bagels with dips', image: '/images/products/catering/pretzel-bagel.jpg' },
  
  // BOWLS & SALADS
  { id: 'caesar-salad', name: 'Caesar Salad Platter', category: 'bowls', price: 79.99, serves: [8, 10, 15, 20], description: 'Classic Caesar with parmesan and croutons', image: '/images/products/catering/caesar-salad.jpg' },
  { id: 'greek-salad', name: 'Greek Salad', category: 'bowls', price: 79.99, serves: [8, 10, 15, 20], description: 'Fresh Greek salad with feta and olives', image: '/images/products/catering/greek-salad.jpg' },
  { id: 'chef-salad', name: 'Chef Salad', category: 'bowls', price: 89.99, serves: [8, 10, 15, 20], description: 'Garden salad with turkey, ham, and cheese', image: '/images/products/catering/chef-salad.jpg' },
  { id: 'wild-salmon-salad', name: 'Wild Salmon Salad', category: 'bowls', price: 119.99, serves: [8, 10, 15], description: 'Grilled wild salmon over mixed greens', image: '/images/products/catering/wild-salmon.jpg' },
  { id: 'caesar-pasta', name: 'Caesar Pasta Bowl', category: 'bowls', price: 89.99, serves: [8, 10, 15, 20], description: 'Pasta with Caesar dressing and parmesan', image: '/images/products/catering/caesar-pasta.jpg' },
  { id: 'greek-pasta', name: 'Greek Style Pasta Salad', category: 'bowls', price: 79.99, serves: [8, 10, 15, 20], description: 'Mediterranean pasta salad', image: '/images/products/catering/greek-pasta.jpg' },
  { id: 'italian-caprese', name: 'Italian Caprese Pasta', category: 'bowls', price: 89.99, serves: [8, 10, 15], description: 'Fresh mozzarella, tomatoes, and basil', image: '/images/products/catering/italian-caprese.jpg' },
  { id: 'tabouli', name: 'Tabouli Salad', category: 'bowls', price: 69.99, serves: [8, 10, 15], description: 'Traditional Lebanese tabouli', image: '/images/products/catering/tabouli.jpg' },
  
  // VEGETARIAN
  { id: 'fresh-fruit', name: 'Fresh Fruit Platter', category: 'vegetarian', price: 79.99, serves: [8, 10, 15, 20], description: 'Seasonal fresh fruit selection', image: '/images/products/catering/fresh-fruit.jpg' },
  { id: 'garden-vegetable', name: 'Garden Vegetable Platter', category: 'vegetarian', price: 69.99, serves: [8, 10, 15, 20], description: 'Fresh vegetables with dips', image: '/images/products/catering/garden-vegetable.jpg' },
  { id: 'hummus-platter', name: 'Greek Style Hummus Platter', category: 'vegetarian', price: 59.99, serves: [8, 10, 15], description: 'Assorted hummus with pita and vegetables', image: '/images/products/catering/hummus-platter.jpg' },
  { id: 'med-naan', name: 'Mediterranean Naan Platter', category: 'vegetarian', price: 69.99, serves: [8, 10, 15], description: 'Warm naan with Mediterranean spreads', image: '/images/products/catering/med-naan.jpg' },
  { id: 'savory-naan', name: 'Savory Naan', category: 'vegetarian', price: 64.99, serves: [8, 10, 15], description: 'Assorted savory naan breads', image: '/images/products/catering/savory-naan.jpg' },
  
  // DESSERTS
  { id: 'gourmet-brownies', name: 'Gourmet Brownies Platter', category: 'desserts', price: 69.99, serves: [10, 15, 20, 25], description: 'Assorted gourmet brownies', image: '/images/products/catering/gourmet-brownies.jpg' },
  { id: 'gourmet-cookies', name: 'Gourmet Cookie Platter', category: 'desserts', price: 64.99, serves: [10, 15, 20, 25], description: 'Freshly baked artisan cookies', image: '/images/products/catering/gourmet-cookies.jpg' },
  { id: 'dessert-tarts', name: 'Dessert Tart Platter', category: 'desserts', price: 89.99, serves: [8, 10, 15], description: 'Assorted French-style tarts', image: '/images/products/catering/dessert-tarts.jpg' },
  { id: 'macarons', name: 'Macaron & Strawberry Platter', category: 'desserts', price: 79.99, serves: [10, 15, 20], description: 'French macarons with chocolate-covered strawberries', image: '/images/products/catering/macarons.jpg' },
  { id: 'muffin-platter', name: 'Muffin Platter', category: 'desserts', price: 59.99, serves: [10, 15, 20], description: 'Assorted fresh-baked muffins', image: '/images/products/catering/muffins.jpg' },
  { id: 'croissant-platter', name: 'Croissant Platter', category: 'desserts', price: 64.99, serves: [10, 15, 20], description: 'Butter croissants and pastries', image: '/images/products/catering/croissants.jpg' },
];

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'sandwiches', name: 'Sandwiches & Wraps' },
  { id: 'platters', name: 'Platters' },
  { id: 'bowls', name: 'Bowls & Salads' },
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'desserts', name: 'Desserts' }
];

export default function CateringPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem } = useCart();

  const filteredProducts = selectedCategory === 'all' 
    ? cateringProducts 
    : cateringProducts.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <div className="py-6 text-sm text-[#6b6b6b]">
          <Link href="/Miami-Yacht-Charter-Add-Ons" className="hover:text-[#c4a265]">Add-Ons</Link>
          <span className="mx-2">/</span>
          <span>Catering</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="rule-gold mb-6" />
          <h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl text-[#0f0f0f] mb-6" style={{ fontWeight: 300 }}>
            Yacht Charter <span className="text-[#c4a265]">Catering</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-3xl" style={{ fontWeight: 300 }}>
            Gourmet catering delivered fresh to your yacht. From elegant platters to fresh salads and decadent desserts.
          </p>
        </div>

        {/* Disclaimers */}
        <div className="bg-white border border-black/5 p-6 mb-12">
          <p className="text-[#6b6b6b] text-xs mb-2" style={{ fontWeight: 300 }}>
            <strong className="text-[#0f0f0f] font-medium">Please note:</strong> You must have a yacht charter reservation before ordering catering. 
            You will be asked to input your yacht charter information at checkout to attach your order to your reservation.
          </p>
          <p className="text-[#6b6b6b] text-xs" style={{ fontWeight: 300 }}>
            <strong className="text-[#0f0f0f] font-medium">Minimum order:</strong> 2 platters per charter. 
            Orders with less than 2 platters will be canceled. All catering orders must be placed a minimum of 36 hours prior to your departure.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-black/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#c4a265] text-white'
                  : 'bg-white text-[#6b6b6b] hover:bg-[#c4a265]/10 hover:text-[#c4a265] border border-black/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-black/5 hover:border-[#c4a265]/30 transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="aspect-square bg-[#f0ece6] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23f0ece6" width="400" height="400"/%3E%3C/svg%3E';
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-[#0f0f0f] mb-2 group-hover:text-[#c4a265] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#6b6b6b] text-sm mb-4" style={{ fontWeight: 300 }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#0f0f0f] font-medium">from ${product.price}</span>
                  <span className="text-xs text-[#6b6b6b]">Serves {product.serves[0]}+</span>
                </div>
                <button
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: 'catering',
                    minQuantity: 2,
                    image: product.image
                  })}
                  className="w-full bg-white border border-[#0f0f0f] text-[#0f0f0f] py-3 text-sm uppercase tracking-wider hover:bg-[#c4a265] hover:border-[#c4a265] hover:text-white transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="border-t border-[#c4a265]/20 pt-16 pb-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[#c4a265]" />
              <span className="text-[#c4a265] text-xs uppercase tracking-[0.3em]">Delivery Details</span>
              <div className="w-16 h-px bg-[#c4a265]" />
            </div>
            
            <p className="text-[#6b6b6b] text-xs leading-relaxed" style={{ fontWeight: 300 }}>
              All catering orders are prepared fresh and delivered directly to your yacht before departure. 
              Each platter arrives beautifully presented and ready to serve your guests.
            </p>
            
            <p className="text-[#6b6b6b]/60 text-xs leading-relaxed">
              A valid yacht charter reservation is required. Orders must be placed a minimum of 36 hours prior to departure. 
              Two platter minimum per charter. Special dietary accommodations available upon request.
            </p>
          </div>
        </div>
      </div>

      <DarkFooter />
    </main>
  );
}
