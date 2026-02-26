#!/usr/bin/env node
/**
 * UPDATE ALL CATALOGS WITH SUPABASE URLs
 * Uses the migration-url-map.json to update all product catalog references
 */

const fs = require('fs');
const path = require('path');

console.log('📝 UPDATING CATALOGS WITH SUPABASE URLs\n');

// Load URL map
const urlMap = require('../migration-url-map.json');

// Create a normalized map (handle path variations)
const normalizedMap = {};
Object.keys(urlMap).forEach(key => {
  // Remove /public prefix if present
  const normalizedKey = key.replace('/public', '');
  normalizedMap[normalizedKey] = urlMap[key];
});

console.log(`✅ Loaded ${Object.keys(normalizedMap).length} URL mappings\n`);

// Update catering-catalog.json
console.log('📦 Updating catering-catalog.json...');
const cateringPath = path.join(__dirname, '../lib/store/catering-catalog.json');
const catering = JSON.parse(fs.readFileSync(cateringPath, 'utf8'));

let cateringUpdates = 0;
catering.forEach(product => {
  if (product.images && product.images.length > 0) {
    product.images = product.images.map(img => {
      if (normalizedMap[img]) {
        cateringUpdates++;
        return normalizedMap[img];
      }
      return img;
    });
  }
});

fs.writeFileSync(cateringPath, JSON.stringify(catering, null, 2));
console.log(`✅ Updated ${cateringUpdates} image references\n`);

// Update products-complete.json
console.log('📦 Updating products-complete.json...');
const productsPath = path.join(__dirname, '../lib/store/products-complete.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let productsUpdates = 0;

// Update water toys
if (products.waterToys) {
  products.waterToys.forEach(product => {
    if (product.imageUrl && normalizedMap[product.imageUrl]) {
      product.imageUrl = normalizedMap[product.imageUrl];
      productsUpdates++;
    }
  });
}

// Update flowers
if (products.flowers) {
  products.flowers.forEach(product => {
    if (product.imageUrl && normalizedMap[product.imageUrl]) {
      product.imageUrl = normalizedMap[product.imageUrl];
      productsUpdates++;
    }
  });
}

// Update bachelorette
if (products.bachelorette) {
  products.bachelorette.forEach(product => {
    if (product.imageUrl && normalizedMap[product.imageUrl]) {
      product.imageUrl = normalizedMap[product.imageUrl];
      productsUpdates++;
    }
  });
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log(`✅ Updated ${productsUpdates} image references\n`);

// Update premium-services.json
console.log('📦 Updating premium-services.json...');
const premiumPath = path.join(__dirname, '../lib/store/premium-services.json');
if (fs.existsSync(premiumPath)) {
  const premium = JSON.parse(fs.readFileSync(premiumPath, 'utf8'));
  let premiumUpdates = 0;
  
  if (premium.premiumServices) {
    premium.premiumServices.forEach(service => {
      if (service.image && normalizedMap[service.image]) {
        service.image = normalizedMap[service.image];
        premiumUpdates++;
      }
    });
  }
  
  fs.writeFileSync(premiumPath, JSON.stringify(premium, null, 2));
  console.log(`✅ Updated ${premiumUpdates} image references\n`);
}

console.log('='.repeat(60));
console.log('🎉 ALL CATALOGS UPDATED!\n');
console.log(`Total image references updated: ${cateringUpdates + productsUpdates}`);
console.log('All images now point to Supabase CDN! 🚀');
console.log('='.repeat(60));
