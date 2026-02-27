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
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
      <h2 className="text-2xl font-semibold mb-4" style={{ color }}>
        {title}
      </h2>

      {/* Product Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Product:
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => {
            setSelectedProduct(e.target.value);
            setResult(null);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={uploading}
        >
          <option value="">-- Choose a product --</option>
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
          border-4 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${!selectedProduct ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : ''}
          ${selectedProduct && !isDragActive ? 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400' : ''}
          ${isDragActive ? 'border-blue-500 bg-blue-50' : ''}
          ${uploading ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">{progress}</p>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
              <p className="text-gray-500">Select a product first</p>
            ) : isDragActive ? (
              <p className="text-blue-600 font-semibold">Drop the image here...</p>
            ) : (
              <div>
                <p className="text-gray-700 font-medium mb-1">
                  Drag & drop image here
                </p>
                <p className="text-gray-500 text-sm">
                  or click to browse (JPG, PNG, WebP)
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Result Message */}
      {result && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            result.success
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="font-medium">{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default function UploadImagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Upload Product Images
          </h1>
          <p className="text-gray-600">
            Select a product, drag an image, and watch it go live!
          </p>
        </div>

        {/* Upload Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadZone
            category="catering"
            title="🍽️ Catering"
            color="#c4a265"
          />
          
          <UploadZone
            category="water-toys"
            title="🏄 Water Toys"
            color="#0ea5e9"
          />
          
          <UploadZone
            category="flowers"
            title="🌸 Flowers"
            color="#ec4899"
          />
          
          <UploadZone
            category="bachelorette"
            title="💃 Bachelorette Packages"
            color="#8b5cf6"
          />
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            📝 How to Use:
          </h3>
          <ol className="space-y-2 text-gray-700">
            <li>1. Product must already exist in Airtable with a Product ID</li>
            <li>2. Select the product from the dropdown</li>
            <li>3. Drag and drop an image (or click to browse)</li>
            <li>4. Wait 10-30 seconds for processing</li>
            <li>5. ✅ Image automatically appears on website!</li>
          </ol>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Images are automatically optimized to WebP format
              and resized to 1200px max. Original files are never stored - only the
              optimized version goes on the CDN.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
