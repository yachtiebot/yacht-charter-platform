#!/usr/bin/env node
/**
 * UPDATE CATALOGS TO USE SUPABASE URLs
 * Images are already on Supabase, just need to update the catalog references
 */

const fs = require('fs');
const path = require('path');

const catering = require('../lib/store/catering-catalog.json');
const products = require('../lib/store/products-complete.json');

console.log('🔄 UPDATING CATALOG URLS TO SUPABASE\n');
console.log('='.repeat(60));

const SUPABASE_BASE = 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/product-images';

let updatedCount = 0;

// Update catering
catering.forEach(product => {
  if (product.images && product.images.length > 0) {
    const slug = product.id.replace(/[^a-z0-9]/gi, '_');
    
    product.images = product.images.map((img, idx) => {
      updatedCount++;
      return `${SUPABASE_BASE}/catering/Miami_Yachting_Company_${slug}_${idx + 1}.jpg`;
    });
  }
});

// Update water toys
products.waterToys.forEach(product => {
  if (product.imageUrl) {
    const slug = (product.id || product.name).toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newUrl = `${SUPABASE_BASE}/water-toys/Miami_Yachting_Company_${slug}_1.jpg`;
    
    product.imageUrl = newUrl;
    if (!product.images) product.images = [];
    product.images[0] = newUrl;
    updatedCount++;
  }
});

// Update flowers
products.flowers.forEach(product => {
  if (product.imageUrl) {
    const slug = (product.id || product.name).toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newUrl = `${SUPABASE_BASE}/flowers/Miami_Yachting_Company_${slug}_1.jpg`;
    
    product.imageUrl = newUrl;
    if (!product.images) product.images = [];
    product.images[0] = newUrl;
    updatedCount++;
  }
});

// Save
fs.writeFileSync(
  path.join(__dirname, '../lib/store/catering-catalog.json'),
  JSON.stringify(catering, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../lib/store/products-complete.json'),
  JSON.stringify(products, null, 2)
);

console.log(`✅ Updated ${updatedCount} image references to Supabase`);
console.log(`✅ Catering: ${catering.length} products`);
console.log(`✅ Water Toys: ${products.waterToys.length} products`);
console.log(`✅ Flowers: ${products.flowers.length} products`);
console.log('\n' + '='.repeat(60));
console.log('\n🎉 ALL CATALOGS NOW POINT TO SUPABASE!');
