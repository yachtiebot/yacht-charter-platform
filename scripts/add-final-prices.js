#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, '../lib/store/catering-catalog.json');
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

// Final batch of prices
const finalPrices = {
  'choc-red-velvet': { price: 69.99, sizes: [] },
  'croissantplatter': { price: 59.99, sizes: [] },
  'customizable-cookies-and-cream-cake-6n3m8': { price: 89.99, sizes: [] },
  'customizable-floral-cake': { price: 89.99, sizes: [] },
  'customizable-party-balloon-cake-aar5e': { price: 89.99, sizes: [] },
  'desert-tart-6mpcy': { price: 49.99, sizes: ['Serves 4'] },
  'german-choc-cake': { price: 69.99, sizes: [] },
  'greek-style-pasta-salad-etjrx': { price: 79.99, sizes: ['Serves 10'] },
  'grilled-chicken-pasta-bowl-5cg2c': { price: 79.99, sizes: ['Serves 10'] },
  'large-charcuterie-platter': { price: 239.99, sizes: [] },
  'largebrunchplatter': { price: 89.99, sizes: [] },
  'macaronchocolatestrawberry': { price: 89.99, sizes: [] },
  'pudding-cake': { price: 69.99, sizes: [] },
  'straw-almond-cream-cake': { price: 69.99, sizes: [] },
  'straw-leche-cake': { price: 69.99, sizes: [] },
  'taboulisalad': { price: 79.99, sizes: [] }
};

console.log('📝 Adding final batch of prices...\n');

let updated = 0;

catalog.forEach(product => {
  const priceData = finalPrices[product.id];
  
  if (priceData) {
    product.price = priceData.price;
    product.needsPricing = false;
    product.priceSource = 'batch_webfetch';
    
    if (priceData.sizes && priceData.sizes.length > 0) {
      product.options = priceData.sizes.map(size => ({
        label: size,
        value: parseInt(size.match(/\d+/)[0]),
        price: priceData.price
      }));
    }
    
    console.log(`✅ ${product.name}: $${priceData.price}`);
    updated++;
  }
});

fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));

const remaining = catalog.filter(p => p.needsPricing).length;
const total = catalog.length;
const complete = total - remaining;

console.log('\n' + '='.repeat(60));
console.log('🎉 CATALOG COMPLETE!\n');
console.log(`📊 FINAL STATISTICS:`);
console.log(`   • Total products: ${total}`);
console.log(`   • With pricing: ${complete} (${(complete/total*100).toFixed(1)}%)`);
console.log(`   • Remaining: ${remaining}`);
console.log('='.repeat(60));
