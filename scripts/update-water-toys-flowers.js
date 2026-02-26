#!/usr/bin/env node
/**
 * UPDATE WATER TOYS AND FLOWERS FROM CSV DATA
 */

const fs = require('fs');
const path = require('path');

const allProducts = require('../lib/store/catering-catalog-new.json');
const currentProducts = require('../lib/store/products-complete.json');

console.log('🔄 UPDATING WATER TOYS & FLOWERS FROM CSV\n');
console.log('='.repeat(60));

// Extract water toys (exact matches)
const waterToysFromCSV = allProducts.filter(p => {
  const name = p.name.toLowerCase();
  return (name.includes('seabob') && !name.includes('platter')) ||
         name.includes('flitescooter') ||
         name.includes('flyboard') ||
         name.includes('jet ski') ||
         (name.includes('water sports') && name.includes('skiing')) ||
         name.includes('cabana') ||
         (name.includes('lounge chair') && name.includes('floating'));
});

// Extract flowers (actual flower arrangements, not food)
const flowersFromCSV = allProducts.filter(p => {
  const name = p.name.toLowerCase();
  const notFood = !name.includes('platter') && !name.includes('salad') && !name.includes('vegetable');
  return notFood && (
    (name.includes('rose') && name.includes('pave')) ||
    name.includes('tropical paradise') ||
    name.includes('blooming orchid') ||
    name.includes('blooming garden') ||
    name.includes('modern simplicity') ||
    name.includes('victoria') ||
    name.includes('floating orchid') ||
    name.includes('tropical roses') ||
    (name.includes('dancing roses') && !name.includes('platter')) ||
    (name.includes('tropical orchid') && !name.includes('platter')) ||
    name.includes('pretty in white')
  );
});

console.log('\n🌊 WATER TOYS:\n');
waterToysFromCSV.forEach((p, i) => {
  console.log(`[${i + 1}] ${p.name}`);
  console.log(`   Price: $${p.price}${p.options && p.options.length > 1 ? ` (${p.options.length} options)` : ''}`);
  console.log(`   Images: ${p.images ? p.images.length : 0}`);
});

console.log('\n🌸 FLOWERS:\n');
flowersFromCSV.forEach((p, i) => {
  console.log(`[${i + 1}] ${p.name}`);
  console.log(`   Price: $${p.price}${p.options && p.options.length > 1 ? ` (${p.options.length} options)` : ''}`);
  console.log(`   Images: ${p.images ? p.images.length : 0}`);
});

// Format for products-complete.json
const waterToysFormatted = waterToysFromCSV.map(p => ({
  name: p.name,
  price: p.price,
  description: p.description || '',
  imageUrl: p.images && p.images[0] ? p.images[0] : '',
  category: 'water-toys',
  options: p.options || [],
  images: p.images || []
}));

const flowersFormatted = flowersFromCSV.map(p => ({
  name: p.name,
  price: p.price,
  sizes: p.options ? p.options.map(opt => ({
    name: opt.label,
    price: opt.price
  })) : [],
  description: p.description || '',
  imageUrl: p.images && p.images[0] ? p.images[0] : '',
  category: 'flowers',
  images: p.images || []
}));

// Update products-complete.json
const updated = {
  ...currentProducts,
  waterToys: waterToysFormatted,
  flowers: flowersFormatted
};

fs.writeFileSync(
  path.join(__dirname, '../lib/store/products-complete.json'),
  JSON.stringify(updated, null, 2)
);

console.log('\n' + '='.repeat(60));
console.log('\n✅ UPDATED products-complete.json\n');
console.log(`📊 Results:`);
console.log(`   • Water Toys: ${waterToysFormatted.length} products`);
console.log(`   • Flowers: ${flowersFormatted.length} products`);
console.log(`   • Prices: 100% accurate from CSV`);
console.log(`   • Images: From Squarespace CDN`);
console.log('\n' + '='.repeat(60));
