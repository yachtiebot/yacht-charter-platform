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
          setProducts(productList.map((p: any) => ({
            id: p.id,
            name: p.name,
            category
          })));
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

        {/* Upload Zones Grid */}
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

        {/* Instructions */}
        <div className="mt-16 bg-white border border-[#0f0f0f]/10 p-8">
          <h3 className="editorial-label text-[#0f0f0f] mb-6">
            How to Use
          </h3>
          <ol className="space-y-3 text-[#6b6b6b] font-light">
            <li>1. Product must already exist in Airtable with a Product ID</li>
            <li>2. Select the product from the dropdown</li>
            <li>3. Drag and drop an image or click to browse</li>
            <li>4. Wait 10-30 seconds for processing</li>
            <li>5. Image automatically appears on website</li>
          </ol>
          
          <div className="mt-6 p-6 bg-[#faf9f7] border border-[#0f0f0f]/5">
            <p className="text-sm text-[#6b6b6b] font-light">
              Images are automatically optimized to WebP format
              and resized to 1200px max. Original files are never stored — only the
              optimized version goes on the CDN.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
