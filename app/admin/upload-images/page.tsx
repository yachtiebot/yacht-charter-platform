'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface Product {
  id: string;
  name: string;
  category: string;
}

interface UploadZoneProps {
  category: string;
  title: string;
  color: string;
}

function UploadZone({ category, title, color }: UploadZoneProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    // Banners - Large full-width hero images
    if (category === 'banners') {
      const banners = [
        // Homepage Banners
        { id: 'hero-main', name: 'Homepage - Main Hero Banner', category },
        { id: 'cta-background', name: 'Homepage - Bottom Page Banner', category },
        { id: 'philosophy-yacht', name: 'Homepage - Philosophy Section Banner', category },
        
        // Contact Page
        { id: 'contact-hero', name: 'Contact Page - Hero Banner', category },
      ];
      setProducts(banners.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
      return;
    }

    // Hero images/thumbnails - Cards, badges, logos, smaller images
    if (category === 'hero-images') {
      const thumbnails = [
        // Fleet Cards
        { id: 'fleet-dayboats', name: 'Fleet - Dayboats Card', category },
        { id: 'fleet-luxury', name: 'Fleet - Luxury Yachts Card', category },
        { id: 'fleet-superyacht', name: 'Fleet - Superyacht Card', category },
        { id: 'fleet-complete', name: 'Fleet - Complete Fleet Card', category },
        
        // Experience Cards
        { id: 'experiences-sightseeing', name: 'Experiences - Sightseeing', category },
        { id: 'experiences-celebrations', name: 'Experiences - Celebrations', category },
        { id: 'experiences-corporate', name: 'Experiences - Corporate Events', category },
        { id: 'experiences-sandbars', name: 'Experiences - Sandbars & Beyond', category },
        { id: 'experiences-bachelorette', name: 'Experiences - Bachelorette', category },
        { id: 'experiences-large-groups', name: 'Experiences - Large Groups', category },
        
        // Departure Locations
        { id: 'departures-miami', name: 'Departures - Miami', category },
        { id: 'departures-miami-beach', name: 'Departures - Miami Beach', category },
        { id: 'departures-coconut-grove', name: 'Departures - Coconut Grove', category },
        { id: 'departures-key-biscayne', name: 'Departures - Key Biscayne', category },
        { id: 'departures-fort-lauderdale', name: 'Departures - Fort Lauderdale', category },
        { id: 'departures-hollywood', name: 'Departures - Hollywood', category },
        
        // Add-Ons Thumbnails
        { id: 'addons-catering-thumb', name: 'Add-Ons - Catering Thumbnail', category },
        { id: 'addons-water-toys-thumb', name: 'Add-Ons - Water Toys Thumbnail', category },
        { id: 'addons-flowers-thumb', name: 'Add-Ons - Flowers Thumbnail', category },
        { id: 'addons-bachelorette-thumb', name: 'Add-Ons - Bachelorette Thumbnail', category },
        
        // Premium Add-Ons
        { id: 'premium-alcohol', name: 'Premium - Alcohol Package', category },
        { id: 'premium-transport', name: 'Premium - Luxury Transport', category },
        { id: 'premium-hero', name: 'Premium - Hero Image', category },
        { id: 'premium-watersports', name: 'Premium - Watersports', category },
      ];
      setProducts(thumbnails.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
      return;
    }

    // Fetch products for this category
    const fetchProducts = async () => {
      try {
        let endpoint = '';
        if (category === 'catering') endpoint = '/api/catering';
        else if (category === 'water-toys') endpoint = '/api/water-toys';
        else if (category === 'flowers') endpoint = '/api/flowers';
        else if (category === 'bachelorette') endpoint = '/api/bachelorette-packages';
        
        if (endpoint) {
          const response = await fetch(endpoint);
          const data = await response.json();
          const productList = Array.isArray(data) ? data : data.products || data.catering || [];
          const mappedProducts = productList.map((p: any) => ({
            id: p.id,
            name: p.name,
            category
          }));
          // Alphabetize by name
          setProducts(mappedProducts.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!selectedProduct) {
      setResult({ success: false, message: 'Please select a product first!' });
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);
    setProgress('Uploading...');
    setResult(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', selectedProduct);
      formData.append('category', category);

      // Upload to our API
      setProgress('Optimizing image...');
      const response = await fetch('/api/admin/process-image', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setProgress('');
        setResult({
          success: true,
          message: `✅ Success! Image live on website. Saved ${result.savings}`
        });
        setSelectedProduct(''); // Reset for next upload
      } else {
        setProgress('');
        setResult({
          success: false,
          message: `❌ Error: ${result.error || 'Upload failed'}`
        });
      }
    } catch (error: any) {
      setProgress('');
      setResult({
        success: false,
        message: `❌ Error: ${error.message}`
      });
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    disabled: !selectedProduct || uploading
  });

  return (
    <div className="bg-white border border-[#0f0f0f]/10 p-8 hover:border-[#c4a265]/30 transition-all">
      <h2 className="editorial-card-name text-[#0f0f0f] mb-6">
        {title}
      </h2>

      {/* Product Selector */}
      <div className="mb-6">
        <label className="block editorial-label text-[#0f0f0f] mb-3">
          Select Product
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => {
            setSelectedProduct(e.target.value);
            setResult(null);
          }}
          className="w-full px-4 py-3 border border-[#0f0f0f]/20 bg-white text-[#0f0f0f] font-light focus:border-[#c4a265] focus:ring-0 transition-colors"
          disabled={uploading}
        >
          <option value="">Choose a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed p-12 text-center cursor-pointer transition-all
          ${!selectedProduct ? 'border-[#0f0f0f]/10 bg-[#faf9f7] cursor-not-allowed' : ''}
          ${selectedProduct && !isDragActive ? 'border-[#0f0f0f]/20 bg-white hover:bg-[#faf9f7] hover:border-[#c4a265]' : ''}
          ${isDragActive ? 'border-[#c4a265] bg-[#c4a265]/5' : ''}
          ${uploading ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c4a265] mx-auto mb-4"></div>
            <p className="text-[#6b6b6b] font-light">{progress}</p>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-[#6b6b6b] mb-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {!selectedProduct ? (
              <p className="text-[#6b6b6b] font-light">Select a product first</p>
            ) : isDragActive ? (
              <p className="text-[#c4a265] font-light">Drop the image here</p>
            ) : (
              <div>
                <p className="text-[#0f0f0f] font-light mb-2">
                  Drag image here or click to browse
                </p>
                <p className="text-[#6b6b6b] text-sm font-light">
                  JPG, PNG, or WebP
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Result Message */}
      {result && (
        <div
          className={`mt-6 p-4 border ${
            result.success
              ? 'bg-[#c4a265]/5 border-[#c4a265]/20 text-[#0f0f0f]'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <p className="font-light">{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default function UploadImagesPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-[1px] bg-[#c4a265] mx-auto mb-6"></div>
          <h1 className="editorial-display text-5xl md:text-6xl text-[#0f0f0f] mb-4" style={{ fontWeight: 300 }}>
            Upload Product Images
          </h1>
          <p className="text-[#6b6b6b] font-light text-lg">
            Select a product, drag an image, and watch it go live
          </p>
        </div>

        {/* Product Images Section - MOST USED */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="editorial-card-name text-[#0f0f0f] mb-2">Product Images</h2>
            <p className="text-[#6b6b6b] font-light">Upload images for products managed in Airtable (most frequently updated)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UploadZone
              category="catering"
              title="Catering"
              color="#c4a265"
            />
            
            <UploadZone
              category="water-toys"
              title="Water Toys"
              color="#c4a265"
            />
            
            <UploadZone
              category="flowers"
              title="Flowers"
              color="#c4a265"
            />
            
            <UploadZone
              category="bachelorette"
              title="Bachelorette Packages"
              color="#c4a265"
            />
          </div>
        </div>

        {/* Marketing Images Section - LESS FREQUENT */}
        <div className="border-t border-[#0f0f0f]/10 pt-16">
          <div className="mb-12">
            <h2 className="editorial-card-name text-[#0f0f0f] mb-2">Marketing Images</h2>
            <p className="text-[#6b6b6b] font-light mb-8">Banners, thumbnails, and icons (updated less frequently)</p>
            
            {/* Banners */}
            <div className="mb-12">
              <div className="mb-6">
                <h3 className="editorial-label text-[#0f0f0f] mb-2">Banners & Hero Images</h3>
                <p className="text-[#6b6b6b] font-light text-sm">Large banner images and page hero images (full-width sections)</p>
              </div>
              
              <UploadZone
                category="banners"
                title="Banners"
                color="#c4a265"
              />
            </div>

            {/* Hero Thumbnails */}
            <div>
              <div className="mb-6">
                <h3 className="editorial-label text-[#0f0f0f] mb-2">Thumbnails & Icons</h3>
                <p className="text-[#6b6b6b] font-light text-sm">Thumbnails, cards, badges, logos, and smaller marketing images</p>
              </div>
              
              <UploadZone
                category="hero-images"
                title="Hero Thumbnails"
                color="#c4a265"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white border border-[#0f0f0f]/10 p-8">
          <h3 className="editorial-label text-[#0f0f0f] mb-6">
            How to Use
          </h3>
          <ol className="space-y-3 text-[#6b6b6b] font-light">
            <li><strong>Banners:</strong> Large full-width hero images (homepage hero, page headers)</li>
            <li><strong>Hero Thumbnails:</strong> Cards, badges, logos, smaller marketing images</li>
            <li><strong>Product Images:</strong> Product must exist in Airtable with a Product ID first</li>
            <li>Select the image from the dropdown</li>
            <li>Drag and drop an image or click to browse</li>
            <li>Wait 10-30 seconds for processing</li>
            <li>Image automatically appears on website</li>
          </ol>
          
          <div className="mt-6 p-6 bg-[#faf9f7] border border-[#0f0f0f]/5">
            <p className="text-sm text-[#6b6b6b] font-light mb-3">
              <strong>Automatic Optimization:</strong> Images are converted to WebP format
              and resized to 1200px max. Original files are never stored — only the
              optimized version goes on the CDN.
            </p>
            <p className="text-sm text-[#6b6b6b] font-light">
              <strong>Complete Inventory:</strong> See HERO_THUMBNAILS_INVENTORY.md for a full list of 
              all banners, thumbnails, badges, and logos, plus where they appear on the site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
