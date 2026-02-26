#!/usr/bin/env node
/**
 * FILTER TO LIVE PRODUCTS ONLY
 * Keep only products that are actually on the Squarespace catering page
 */

const fs = require('fs');
const path = require('path');

// List of live product slugs from Squarespace catering page
const liveProducts = [
  'gourmetspirals',
  'gourmet-wraps',
  'slider-trio',
  'cubanplatter',
  'shrimp-platter',
  'shrimp-surimi',
  'chilledtenders',
  'chickentenders',
  'chicken-wings',
  'popcornchicken',
  'customcharcuteriebox',
  'med-charcuterie-box',
  'large-charcuterie-platter',
  'prosciuttoskewers',
  'bread-bowl-platter',
  'wildsalmonsalad',
  'caesarsaladplatter',
  'chickenlettucewraps',
  'lettucewraps',
  'chefsalad',
  'turkeysaladplatter',
  'lettucewraps-bf5d7',
  'greeksalad',
  'garden-vegetable-platter-7m7gt',
  'briefruitplatter',
  'fresh-fruit-platter-np56z',
  'classicvarietydip',
  'pretzel-bagel-bite-platter',
  'gourmet-meat-and-cheese-platter',
  'gourmetmeatandcheesecubeplatter',
  'cheese-taster-platter-j3ld4',
  'antipasti-platter',
  'savorynaan',
  'mednaan',
  'greekstylehummusplatter',
  'deli-egg-platter',
  'med-style-platter',
  'mini-croissant-platter',
  'caesarpasta',
  'taboulisalad',
  'italiancapresepasta',
  'greek-style-pasta-salad-etjrx',
  'grilled-chicken-pasta-bowl-5cg2c',
  'chocolatehummusplatter',
  'largebrunchplatter',
  'croissantplatter',
  'gourmetbrowniesplatter-tnst9',
  'strawberryandmacaron',
  'muffinplatter',
  'gourmetcookieplatter',
  'desert-tart-platter-9hdg4',
  'desert-tart-6mpcy',
  'gourmettartplatter',
  'macaronchocolatestrawberry',
  'chocstraw',
  'decadent-desert-platter',
  'delightful-desert-platter',
  'gourmetbrowniesplatter',
  'bachelorettecupcakes',
  'customizable-cookies-and-cream-cake-6n3m8',
  'customizable-floral-cake',
  'customizable-party-balloon-cake-aar5e',
  'choc-red-velvet',
  'straw-almond-cream-cake',
  'german-choc-cake',
  'pudding-cake',
  'straw-leche-cake',
  'deli-sandwich-combo-platter-93wrm' // Also in CSV
];

const allProducts = require('../lib/store/catering-catalog-new.json');

console.log('🔍 FILTERING TO LIVE PRODUCTS\n');
console.log(`Total imported: ${allProducts.length}`);
console.log(`Live products: ${liveProducts.length}`);
console.log('\n' + '='.repeat(60) + '\n');

const filtered = allProducts.filter(product => {
  return liveProducts.includes(product.id);
});

console.log('✅ FILTERED CATALOG:\n');
filtered.forEach((p, i) => {
  console.log(`[${i + 1}/${filtered.length}] ${p.name}`);
  console.log(`   ID: ${p.id}`);
  console.log(`   Price: $${p.price}`);
  if (p.options && p.options.length > 1) {
    console.log(`   Options: ${p.options.length}`);
  }
  console.log('');
});

console.log('='.repeat(60));
console.log(`\n📊 Results:`);
console.log(`   • Kept: ${filtered.length} products`);
console.log(`   • Removed: ${allProducts.length - filtered.length} old/non-catering items`);

// Save filtered catalog
const outputPath = path.join(__dirname, '../lib/store/catering-catalog-live.json');
fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));

console.log(`\n✅ Saved to: catering-catalog-live.json`);
console.log('\n' + '='.repeat(60));
