'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/CartContext';
import DarkFooter from '@/components/DarkFooter';
import ScrollIndicator from '@/components/ScrollIndicator';
import CharcuterieCustomizationModal, { CharcuterieCustomization } from '@/components/modals/CharcuterieCustomizationModal';
import WrapCustomizationModal, { WrapCustomization } from '@/components/modals/WrapCustomizationModal';
import SpiralCustomizationModal, { SpiralCustomization } from '@/components/modals/SpiralCustomizationModal';
import DeliSandwichCustomizationModal, { DeliSandwichCustomization } from '@/components/modals/DeliSandwichCustomizationModal';
import DippingSauceModal, { DippingSauceCustomization } from '@/components/modals/DippingSauceModal';

// Available platter images (rotating through these 10 images for all products)
const platterImages = [
  '/images/products/catering/Miami_Yachting_Company_platter.jpg',
  '/images/products/catering/Miami_Yachting_Company_large_platter.jpg',
  '/images/products/catering/Miami_Yachting_Company_chef_salad_platter_1.jpg',
  '/images/products/catering/Miami_Yachting_Company_chef_salad_platter_2.jpg',
  '/images/products/catering/Miami_Yachting_Company_relish_platter.jpg',
  '/images/products/catering/Miami_Yachting_Company_wheel_platter.jpg',
  '/images/products/catering/Miami_Yachting_Company_cubes_platter.jpg',
  '/images/products/catering/Miami_Yachting_Company_small_platter.jpg',
  '/images/products/catering/miami_yachting_company_muffin_platter.jpg',
  '/images/products/catering/Miami_Yachting_Company_cookie_platter.jpg'
];

// Map product images logically based on available photos
const imageMapping: { [key: string]: string } = {
  // Sandwiches & Wraps - use generic platter images
  'gourmet-wraps': platterImages[0],        // MYC+platter
  'gourmet-spirals': platterImages[1],      // large_platter
  'slider-trio': platterImages[7],          // MYC_small_platter
  'cuban-platter': platterImages[4],        // relish_platter
  
  // Platters - use various platter images
  'shrimp-platter': platterImages[1],       // large_platter
  'chicken-tenders': platterImages[0],      // MYC+platter
  'chicken-wings': platterImages[7],        // MYC_small_platter
  'large-charcuterie': platterImages[6],    // cubesplatter (cheese)
  'med-charcuterie': platterImages[6],      // cubesplatter (cheese)
  'antipasti': platterImages[5],            // wheel+platter
  'cheese-taster': platterImages[6],        // cubesplatter (cheese)
  'pretzel-bagel': platterImages[0],        // MYC+platter
  
  // Bowls & Salads - use chef salad images
  'caesar-salad': platterImages[2],         // chef+salad+platter1
  'greek-salad': platterImages[3],          // chef+salad+platter2
  'chef-salad': platterImages[2],           // chef+salad+platter1
  'wild-salmon-salad': platterImages[3],    // chef+salad+platter2
  'caesar-pasta': platterImages[2],         // chef+salad+platter1
  'greek-pasta': platterImages[3],          // chef+salad+platter2
  'italian-caprese': platterImages[4],      // relish_platter
  'tabouli': platterImages[3],              // chef+salad+platter2
  
  // Vegetarian - use fresh/colorful images
  'fresh-fruit': platterImages[5],          // wheel+platter
  'garden-vegetable': platterImages[4],     // relish_platter
  'hummus-platter': platterImages[5],       // wheel+platter
  'med-naan': platterImages[0],             // MYC+platter
  'savory-naan': platterImages[1],          // large_platter
  
  // Desserts - use ACTUAL dessert images
  'gourmet-brownies': platterImages[9],     // cookieplatter (closest)
  'gourmet-cookies': platterImages[9],      // cookieplatter (CORRECT)
  'dessert-tarts': platterImages[8],        // muffin_platter
  'macarons': platterImages[9],             // cookieplatter
  'muffin-platter': platterImages[8],       // muffin_platter (CORRECT)
  'croissant-platter': platterImages[8],    // muffin_platter (closest)
  'chocolate-platter': platterImages[9]     // cookieplatter
};

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'sandwiches', name: 'Sandwiches & Wraps' },
  { id: 'platters', name: 'Platters' },
  { id: 'bowls', name: 'Bowls & Salads' },
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'desserts', name: 'Desserts' }
];

export default function CateringPage() {
  const [cateringProducts, setCateringProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: number}>({});
  const { addItem } = useCart();
  
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [pendingProduct, setPendingProduct] = useState<any>(null);

  // Fetch catering from Airtable API
  useEffect(() => {
    const fetchCatering = async () => {
      try {
        const response = await fetch('/api/catering');
        const data = await response.json();
        
        // Map images to products - Use Airtable image first, fallback to hardcoded mapping
        const productsWithImages = data.map((product: any, index: number) => ({
          ...product,
          image: product.image || imageMapping[product.id] || platterImages[index % platterImages.length]
        }));
        
        setCateringProducts(productsWithImages);
      } catch (error) {
        console.error('Failed to fetch catering:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCatering();
  }, []);

  // Define category order
  const categoryOrder = ['sandwiches & wraps', 'platters', 'bowls & salads', 'vegetarian', 'desserts'];
  
  const filteredProducts = selectedCategory === 'all' 
    ? cateringProducts.sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        return aIndex - bIndex;
      })
    : cateringProducts.filter(p => p.category === selectedCategory);

  const handleSizeSelect = (productId: string, sizeIndex: number) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: sizeIndex }));
  };

  // Check if product needs customization
  const needsCustomization = (productId: string) => {
    return ['gourmet-wraps', 'gourmet-spirals', 'large-charcuterie', 'med-charcuterie', 'chicken-wings', 'chicken-tenders', 'deli-sandwich'].includes(productId);
  };

  // Handle add to cart - open modal if needed
  const handleAddToCart = (product: any, selectedOption: any) => {
    const productBase = product.id.split('-')[0]; // e.g., 'gourmet' from 'gourmet-wraps'
    
    if (productBase === 'gourmet' && product.id === 'gourmet-wraps') {
      setPendingProduct({ ...product, selectedOption });
      setActiveModal('wraps');
    } else if (productBase === 'gourmet' && product.id === 'gourmet-spirals') {
      setPendingProduct({ ...product, selectedOption });
      setActiveModal('spirals');
    } else if (product.id.includes('charcuterie')) {
      setPendingProduct({ ...product, selectedOption });
      setActiveModal('charcuterie');
    } else if (product.id === 'deli-sandwich') {
      setPendingProduct({ ...product, selectedOption });
      setActiveModal('deli-sandwich');
    } else if (product.id === 'chicken-wings' || product.id === 'chicken-tenders') {
      setPendingProduct({ ...product, selectedOption });
      setActiveModal('sauce');
    } else {
      // No customization needed - add directly
      addItem({
        id: `${product.id}-${selectedOption.value}`,
        name: `${product.name} (${selectedOption.label})`,
        price: selectedOption.price,
        category: 'catering',
        minQuantity: product.minQuantity || 1,
        image: product.image
      });
    }
  };

  // Modal submit handlers
  const handleCharcuterieSubmit = (customization: CharcuterieCustomization) => {
    if (!pendingProduct) return;
    addItem({
      id: `${pendingProduct.id}-${pendingProduct.selectedOption.value}`,
      name: `${pendingProduct.name} (${pendingProduct.selectedOption.label})`,
      price: pendingProduct.selectedOption.price,
      category: 'catering',
      minQuantity: pendingProduct.minQuantity || 1,
      image: pendingProduct.image,
      customization
    });
    setActiveModal(null);
    setPendingProduct(null);
  };

  const handleWrapSubmit = (customization: WrapCustomization) => {
    if (!pendingProduct) return;
    addItem({
      id: `${pendingProduct.id}-${pendingProduct.selectedOption.value}`,
      name: `${pendingProduct.name} (${pendingProduct.selectedOption.label})`,
      price: pendingProduct.selectedOption.price,
      category: 'catering',
      minQuantity: pendingProduct.minQuantity || 1,
      image: pendingProduct.image,
      customization
    });
    setActiveModal(null);
    setPendingProduct(null);
  };

  const handleSpiralSubmit = (customization: SpiralCustomization) => {
    if (!pendingProduct) return;
    addItem({
      id: `${pendingProduct.id}-${pendingProduct.selectedOption.value}`,
      name: `${pendingProduct.name} (${pendingProduct.selectedOption.label})`,
      price: pendingProduct.selectedOption.price,
      category: 'catering',
      minQuantity: pendingProduct.minQuantity || 1,
      image: pendingProduct.image,
      customization
    });
    setActiveModal(null);
    setPendingProduct(null);
  };

  const handleDeliSandwichSubmit = (customization: DeliSandwichCustomization) => {
    if (!pendingProduct) return;
    addItem({
      id: `${pendingProduct.id}-${pendingProduct.selectedOption.value}`,
      name: `${pendingProduct.name} (${pendingProduct.selectedOption.label})`,
      price: pendingProduct.selectedOption.price,
      category: 'catering',
      minQuantity: pendingProduct.minQuantity || 1,
      image: pendingProduct.image,
      customization
    });
    setActiveModal(null);
    setPendingProduct(null);
  };

  const handleSauceSubmit = (customization: DippingSauceCustomization) => {
    if (!pendingProduct) return;
    addItem({
      id: `${pendingProduct.id}-${pendingProduct.selectedOption.value}`,
      name: `${pendingProduct.name} (${pendingProduct.selectedOption.label})`,
      price: pendingProduct.selectedOption.price,
      category: 'catering',
      minQuantity: pendingProduct.minQuantity || 1,
      image: pendingProduct.image,
      customization
    });
    setActiveModal(null);
    setPendingProduct(null);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p>Loading catering menu...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center pt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full">
          {/* Breadcrumb */}
          <div className="py-6 text-sm text-[#6b6b6b]">
            <Link href="/miami-yacht-charter-add-ons" className="hover:text-[#c4a265]">Add Ons</Link>
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
        </div>
        
        <ScrollIndicator dark />
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

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
          {filteredProducts.map((product) => {
            // Get selected size or default to first option
            const selectedIndex = selectedSizes[product.id] ?? 0;
            const selectedOption = product.options[selectedIndex];
            
            return (
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
                  <h3 className="text-lg text-[#0f0f0f] mb-2 group-hover:text-[#c4a265] transition-colors" style={{ fontWeight: 300 }}>
                    {product.name}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm mb-4" style={{ fontWeight: 300 }}>
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div className="space-y-3 mb-4">
                    <label className="text-xs uppercase tracking-wider text-[#6b6b6b]">Select Serving Size</label>
                    <div className={`grid gap-2 ${
                      (product.options?.length || 0) <= 3 ? 'grid-cols-3' : 
                      (product.options?.length || 0) === 4 ? 'grid-cols-4' : 
                      'grid-cols-5'
                    }`}>
                      {product.options?.map((option: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSizeSelect(product.id, idx)}
                          className={`py-3 px-2 text-xs border transition-all ${
                            selectedIndex === idx
                              ? 'bg-[#c4a265] text-white border-[#c4a265]'
                              : 'bg-white text-[#6b6b6b] border-[#6b6b6b]/20 hover:border-[#c4a265]'
                          }`}
                        >
                          <div className="font-medium mb-1">
                            {option.label.includes('Serves') ? (
                              <>
                                <div>Serves</div>
                                <div>{option.label.replace('Serves ', '')}</div>
                              </>
                            ) : option.label}
                          </div>
                          <div className="text-[10px] opacity-80">${option.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl text-[#0f0f0f]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                      ${selectedOption.price}
                    </span>
                    <span className="text-sm text-[#6b6b6b]">{selectedOption.label}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product, selectedOption)}
                    className="w-full bg-white border border-[#0f0f0f] text-[#0f0f0f] py-3 text-sm uppercase tracking-wider hover:bg-[#c4a265] hover:border-[#c4a265] hover:text-white transition-all duration-300"
                  >
                    {needsCustomization(product.id) ? 'Customize & Add' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
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

      {/* Customization Modals */}
      {pendingProduct && (
        <>
          <CharcuterieCustomizationModal
            isOpen={activeModal === 'charcuterie'}
            onClose={() => { setActiveModal(null); setPendingProduct(null); }}
            onSubmit={handleCharcuterieSubmit}
            productName={pendingProduct.name}
            productPrice={pendingProduct.selectedOption?.price || 0}
          />
          
          <WrapCustomizationModal
            isOpen={activeModal === 'wraps'}
            onClose={() => { setActiveModal(null); setPendingProduct(null); }}
            onSubmit={handleWrapSubmit}
            productName={pendingProduct.name}
            productPrice={pendingProduct.selectedOption?.price || 0}
          />
          
          <SpiralCustomizationModal
            isOpen={activeModal === 'spirals'}
            onClose={() => { setActiveModal(null); setPendingProduct(null); }}
            onSubmit={handleSpiralSubmit}
            productName={pendingProduct.name}
            productPrice={pendingProduct.selectedOption?.price || 0}
          />

          <DeliSandwichCustomizationModal
            isOpen={activeModal === 'deli-sandwich'}
            onClose={() => { setActiveModal(null); setPendingProduct(null); }}
            onSubmit={handleDeliSandwichSubmit}
            productName={pendingProduct.name}
            productPrice={pendingProduct.selectedOption?.price || 0}
            servingSize={pendingProduct.selectedOption?.value || 10}
          />
          
          <DippingSauceModal
            isOpen={activeModal === 'sauce'}
            onClose={() => { setActiveModal(null); setPendingProduct(null); }}
            onSubmit={handleSauceSubmit}
            productName={pendingProduct.name}
            productPrice={pendingProduct.selectedOption?.price || 0}
          />
        </>
      )}
    </main>
  );
}
