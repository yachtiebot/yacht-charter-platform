#!/usr/bin/env node
/**
 * ADD MANUAL PRICES TO CATALOG
 * Prices fetched via web_fetch
 */

const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, '../lib/store/catering-catalog.json');
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

// Manual prices from web_fetch
const manualPrices = {
  'bachelorettecupcakes': { price: 99.99, sizes: [] },
  'caesarpasta': { price: 79.99, sizes: [] },
  'chickenlettucewraps': { price: 49.99, sizes: [] },
  'gourmet-wraps': { price: 69.99, sizes: ['Serves 8', 'Serves 10', 'Serves 15', 'Serves 20', 'Serves 25'] },
  'slider-trio': { price: 79.99, sizes: ['Serves 8', 'Serves 10', 'Serves 13'] },
  'shrimp-platter': { price: 79.99, sizes: ['Serves 8 (32 oz)', 'Serves 16 (56 oz)', 'Serves 20 (88 oz)'] },
  'chicken-wings': { price: 69.99, sizes: ['Serves 8', 'Serves 10', 'Serves 18', 'Serves 28'] }
};

console.log('📝 Adding manual prices...\n');

let updated = 0;

catalog.forEach(product => {
  const priceData = manualPrices[product.id];
  
  if (priceData) {
    product.price = priceData.price;
    product.needsPricing = false;
    product.priceSource = 'manual_webfetch';
    
    // Add size options if available
    if (priceData.sizes && priceData.sizes.length > 0) {
      product.options = priceData.sizes.map((size, idx) => {
        const servings = parseInt(size.match(/\d+/)[0]);
        const baseServings = parseInt(priceData.sizes[0].match(/\d+/)[0]);
        const price = idx === 0 ? priceData.price : Math.round((priceData.price / baseServings) * servings * 100) / 100;
        
        return {
          label: size,
          value: servings,
          price: price
        };
      });
    }
    
    console.log(`✅ ${product.name}: $${priceData.price}`);
    updated++;
  }
});

// Save updated catalog
fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));

const remaining = catalog.filter(p => p.needsPricing).length;

console.log(`\n✅ Updated ${updated} products`);
console.log(`⚠️  ${remaining} still need pricing`);

module.exports = catalog;
