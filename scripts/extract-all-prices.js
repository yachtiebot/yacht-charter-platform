#!/usr/bin/env node
/**
 * EXTRACT ALL PRICES USING WEB_FETCH PATTERN
 * 
 * This script processes all products and extracts pricing
 * Note: Requires manual execution via tool since we can't call web_fetch from Node
 */

const fs = require('fs');
const path = require('path');

const MERGED_JSON = path.join(__dirname, '../scraped-data/catering-merged.json');
const OUTPUT_JSON = path.join(__dirname, '../scraped-data/catering-final.json');

// Load products
const products = JSON.parse(fs.readFileSync(MERGED_JSON, 'utf8'));

// Helper: Extract base price from "from $XX.XX" text
function extractBasePrice(text) {
  const match = text.match(/from\s+\$?([\d,]+\.?\d*)/i);
  return match ? parseFloat(match[1].replace(/,/g, '')) : null;
}

// Helper: Extract size options
function extractSizeOptions(text) {
  const options = [];
  const sizePattern = /Serves?\s+(\d+)/gi;
  let match;
  
  while ((match = sizePattern.exec(text)) !== null) {
    const servings = parseInt(match[1]);
    options.push({
      label: `Serves ${servings}`,
      value: servings
    });
  }
  
  // Remove duplicates
  return options.filter((opt, idx, self) => 
    idx === self.findIndex(o => o.value === opt.value)
  );
}

// Helper: Estimate price based on servings
function estimatePriceByServings(basePrice, servings, baseSizeServings = 10) {
  if (!basePrice) return null;
  
  // Price scaling logic based on typical catering pricing
  const pricePerServing = basePrice / baseSizeServings;
  return Math.round(pricePerServing * servings * 100) / 100;
}

// Process single product with fetched text
function processProduct(product, fetchedText) {
  const basePrice = extractBasePrice(fetchedText);
  const sizeOptions = extractSizeOptions(fetchedText);
  
  if (!basePrice) {
    console.log(`⚠️  No price found for ${product.name}`);
    return { ...product, priceStatus: 'manual_needed' };
  }
  
  // If no size options found, product has single price
  if (sizeOptions.length === 0) {
    return {
      ...product,
      price: basePrice,
      needsPricing: false,
      priceExtractedAt: new Date().toISOString()
    };
  }
  
  // Build options with estimated prices
  const options = sizeOptions.map((opt, idx) => {
    // First option gets base price, others are estimated
    const price = idx === 0 ? basePrice : estimatePriceByServings(basePrice, opt.value, sizeOptions[0].value);
    return {
      label: opt.label,
      value: opt.value,
      price: price,
      priceSource: idx === 0 ? 'extracted' : 'estimated'
    };
  });
  
  return {
    ...product,
    price: basePrice,
    options: options,
    needsPricing: false,
    priceExtractedAt: new Date().toISOString()
  };
}

console.log('📋 Price Extraction Processor Ready');
console.log('📊 Total products:', products.length);
console.log('🔍 Need pricing:', products.filter(p => p.needsPricing).length);
console.log('\n💡 Run via tool to fetch and process all products');

module.exports = {
  extractBasePrice,
  extractSizeOptions,
  estimatePriceByServings,
  processProduct,
  products
};
