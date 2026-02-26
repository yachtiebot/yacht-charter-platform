#!/usr/bin/env node
/**
 * MERGE SCRAPED DATA WITH EXISTING PRICES
 * 
 * Strategy:
 * 1. Use existing products-complete.json as source of truth for prices
 * 2. Add new products from scrape (with images but no prices - manual entry needed)
 * 3. Update images for existing products if we found better ones
 */

const fs = require('fs');
const path = require('path');

const EXISTING_JSON = path.join(__dirname, '../lib/store/products-complete.json');
const SCRAPED_JSON = path.join(__dirname, '../scraped-data/catering-products-complete.json');
const OUTPUT_JSON = path.join(__dirname, '../scraped-data/catering-merged.json');

console.log('🔄 MERGING SCRAPED DATA WITH EXISTING PRICES\n');

// Load both datasets
const existing = JSON.parse(fs.readFileSync(EXISTING_JSON, 'utf8'));
const scraped = JSON.parse(fs.readFileSync(SCRAPED_JSON, 'utf8'));

console.log(`📦 Existing products: ${existing.catering.length}`);
console.log(`📦 Scraped products: ${scraped.length}\n`);

// Create a map of existing products by ID
const existingMap = {};
existing.catering.forEach(product => {
  existingMap[product.id] = product;
});

// Merge strategy
const merged = [];
const newProducts = [];
const updated = [];

scraped.forEach(scrapedProduct => {
  const existingProduct = existingMap[scrapedProduct.id];
  
  if (existingProduct) {
    // Product exists - keep existing prices, update images if we have better ones
    merged.push({
      ...existingProduct,
      images: scrapedProduct.localImages, // Use new scraped images
      description: existingProduct.description || scrapedProduct.description, // Prefer existing description
      scrapedAt: new Date().toISOString()
    });
    updated.push(scrapedProduct.id);
  } else {
    // New product - add it but mark as needs pricing
    merged.push({
      id: scrapedProduct.id,
      name: scrapedProduct.name,
      slug: scrapedProduct.slug,
      description: scrapedProduct.description,
      images: scrapedProduct.localImages,
      needsPricing: true,
      sourceUrl: scrapedProduct.sourceUrl,
      scrapedAt: new Date().toISOString()
    });
    newProducts.push(scrapedProduct.id);
  }
});

// Sort by ID
merged.sort((a, b) => a.id.localeCompare(b.id));

// Save merged data
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(merged, null, 2));

console.log('='.repeat(60));
console.log('✅ MERGE COMPLETE!\n');
console.log(`📊 RESULTS:`);
console.log(`   • Total products: ${merged.length}`);
console.log(`   • Updated (images refreshed): ${updated.length}`);
console.log(`   • New products (need pricing): ${newProducts.length}`);
console.log(`\n💾 Saved to: ${OUTPUT_JSON}`);
console.log('='.repeat(60));

if (newProducts.length > 0) {
  console.log('\n📝 NEW PRODUCTS (need manual pricing):');
  newProducts.forEach(id => {
    const product = merged.find(p => p.id === id);
    console.log(`   • ${product.name} (${id})`);
    console.log(`     ${product.sourceUrl}`);
  });
}

console.log('\n💡 NEXT STEPS:');
console.log('   1. Review new products at URLs above');
console.log('   2. Manually add pricing info to merged JSON');
console.log('   3. Copy merged JSON to lib/store/products-complete.json');
console.log('   4. Update catering page to use new image paths');
