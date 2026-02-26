#!/usr/bin/env node
/**
 * BUILD COMPLETE CATERING CATALOG
 * 
 * Combines:
 * 1. Scraped images from catering-complete/
 * 2. Extracted prices from /tmp/catering-prices.txt
 * 3. Product metadata from catering-merged.json
 * 
 * Output: Perfect catalog with matched images + prices
 */

const fs = require('fs');
const path = require('path');

const MERGED_JSON = path.join(__dirname, '../scraped-data/catering-merged.json');
const PRICES_FILE = '/tmp/catering-prices.txt';
const OUTPUT_JSON = path.join(__dirname, '../lib/store/catering-catalog.json');

console.log('🔧 BUILDING COMPLETE CATERING CATALOG\n');

// Load merged products
const products = JSON.parse(fs.readFileSync(MERGED_JSON, 'utf8'));
console.log(`📦 Loaded ${products.length} products`);

// Load extracted prices
const pricesData = fs.readFileSync(PRICES_FILE, 'utf8').trim().split('\n');
const pricesMap = {};

pricesData.forEach(line => {
  const [id, price, sizes] = line.split('|');
  if (price && price !== '') {
    pricesMap[id] = {
      basePrice: parseFloat(price),
      sizes: sizes ? sizes.split(',').filter(s => s.trim()).map(s => s.trim()) : []
    };
  }
});

console.log(`💰 Loaded ${Object.keys(pricesMap).length} products with prices\n`);

// Helper: Estimate price based on servings
function estimatePriceForSize(basePrice, baseSizeServings, targetSizeServings) {
  const pricePerServing = basePrice / baseSizeServings;
  return Math.round(pricePerServing * targetSizeServings * 100) / 100;
}

// Helper: Extract serving number from "Serves X" string
function getServingNumber(sizeStr) {
  const match = sizeStr.match(/Serves?\s+(\d+)/i);
  return match ? parseInt(match[1]) : null;
}

// Build complete catalog
const catalog = products.map(product => {
  const priceData = pricesMap[product.id];
  
  // If we have price data, build options
  if (priceData && priceData.basePrice) {
    const options = [];
    
    if (priceData.sizes.length > 0) {
      // Extract serving numbers and sort
      const sizesWithServings = priceData.sizes
        .map(s => ({ label: s, servings: getServingNumber(s) }))
        .filter(s => s.servings !== null)
        .sort((a, b) => a.servings - b.servings);
      
      if (sizesWithServings.length > 0) {
        // First size gets base price, others estimated
        const baseServings = sizesWithServings[0].servings;
        
        sizesWithServings.forEach((size, idx) => {
          const price = idx === 0 
            ? priceData.basePrice 
            : estimatePriceForSize(priceData.basePrice, baseServings, size.servings);
          
          options.push({
            label: size.label,
            value: size.servings,
            price: price
          });
        });
      }
    }
    
    return {
      ...product,
      price: priceData.basePrice,
      options: options.length > 0 ? options : undefined,
      needsPricing: false,
      priceSource: 'extracted',
      images: product.localImages || product.images
    };
  }
  
  // No price data - keep as needs pricing
  return {
    ...product,
    needsPricing: true,
    priceSource: 'manual_required',
    images: product.localImages || product.images
  };
});

// Save catalog
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(catalog, null, 2));

// Stats
const withPrices = catalog.filter(p => !p.needsPricing).length;
const withoutPrices = catalog.filter(p => p.needsPricing).length;
const withOptions = catalog.filter(p => p.options && p.options.length > 0).length;

console.log('='.repeat(60));
console.log('✅ CATALOG BUILD COMPLETE!\n');
console.log('📊 STATISTICS:');
console.log(`   • Total products: ${catalog.length}`);
console.log(`   • With pricing: ${withPrices} (${(withPrices/catalog.length*100).toFixed(1)}%)`);
console.log(`   • Need manual pricing: ${withoutPrices}`);
console.log(`   • With size options: ${withOptions}`);
console.log(`\n💾 Saved to: ${OUTPUT_JSON}`);
console.log('='.repeat(60));

if (withoutPrices > 0) {
  console.log('\n⚠️  PRODUCTS NEEDING MANUAL PRICING:');
  catalog.filter(p => p.needsPricing).forEach(p => {
    console.log(`   • ${p.name} (${p.id})`);
  });
}

console.log('\n🎯 NEXT STEP: Review catalog and add manual prices for remaining products');
