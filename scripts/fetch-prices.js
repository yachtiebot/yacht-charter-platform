#!/usr/bin/env node
/**
 * FETCH PRICES WITH WEB_FETCH
 * 
 * Uses web_fetch to extract pricing from product pages
 */

const fs = require('fs');
const path = require('path');

const MERGED_JSON = path.join(__dirname, '../scraped-data/catering-merged.json');
const OUTPUT_JSON = path.join(__dirname, '../scraped-data/catering-with-prices.json');

// Load merged data
const products = JSON.parse(fs.readFileSync(MERGED_JSON, 'utf8'));

console.log('📦 Loaded', products.length, 'products');
console.log('🔍 Products needing prices:', products.filter(p => p.needsPricing).length);
console.log('\nExport products list for web_fetch processing...\n');

// Create a simple list of URLs to process
const urlsToFetch = products
  .filter(p => p.needsPricing)
  .map(p => ({
    id: p.id,
    name: p.name,
    url: p.sourceUrl
  }));

// Save URLs list
fs.writeFileSync(
  path.join(__dirname, '../scraped-data/urls-to-fetch.json'),
  JSON.stringify(urlsToFetch, null, 2)
);

console.log('✅ Created urls-to-fetch.json');
console.log('📋 Total URLs to process:', urlsToFetch.length);
console.log('\n🔄 Now processing with web_fetch...\n');

module.exports = { products, urlsToFetch };
