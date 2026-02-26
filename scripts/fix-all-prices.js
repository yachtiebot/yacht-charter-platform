#!/usr/bin/env node
/**
 * FIX ALL CATERING PRICES
 * 
 * Re-scrapes actual prices from Squarespace product pages
 * by parsing the raw HTML for price data
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const catering = require('../lib/store/catering-catalog.json');

console.log('💰 FIXING ALL CATERING PRICES\n');
console.log('Re-scraping from Squarespace...\n');

// Helper: Fetch product page HTML
function fetchProductHTML(slug) {
  return new Promise((resolve, reject) => {
    const url = `https://www.miamiyachtingcompany.com/catering/${slug}`;
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Helper: Extract prices from Squarespace HTML
function extractPrices(html) {
  try {
    // Squarespace stores product data in JSON-LD or page data
    // Look for price patterns
    const pricePatterns = [
      /"price":"?(\d+\.?\d*)"?/g,
      /"salePrice":"?(\d+\.?\d*)"?/g,
      /"value":"?(\d+\.?\d*)"?.*?"label":"?([^"]+)"?/g,
    ];
    
    const prices = [];
    
    // Try to find structured data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    if (jsonLdMatch) {
      try {
        const data = JSON.parse(jsonLdMatch[1]);
        if (data.offers && data.offers.price) {
          return [{ label: 'Base', price: parseFloat(data.offers.price) }];
        }
      } catch (e) {
        // Continue to other methods
      }
    }
    
    // Look for variant data in Squarespace's data structure
    const variantMatch = html.match(/variants":\s*\[(.*?)\]/s);
    if (variantMatch) {
      const variantData = variantMatch[1];
      const priceMatches = [...variantData.matchAll(/"price":\s*"?(\d+\.?\d*)"?/g)];
      const labelMatches = [...variantData.matchAll(/"value":\s*"([^"]+)"/g)];
      
      if (priceMatches.length > 0) {
        priceMatches.forEach((match, i) => {
          const price = parseFloat(match[1]) / 100; // Squarespace stores in cents
          const label = labelMatches[i] ? labelMatches[i][1] : `Option ${i + 1}`;
          prices.push({ label, price });
        });
      }
    }
    
    return prices.length > 0 ? prices : null;
  } catch (error) {
    console.error('Error extracting prices:', error.message);
    return null;
  }
}

async function fixProduct(product) {
  console.log(`\n📦 ${product.name}`);
  
  const slug = product.id;
  
  try {
    console.log(`  → Fetching from Squarespace...`);
    const html = await fetchProductHTML(slug);
    
    const prices = extractPrices(html);
    
    if (prices && prices.length > 0) {
      console.log(`  ✓ Found ${prices.length} price options:`);
      prices.forEach(p => console.log(`     ${p.label}: $${p.price.toFixed(2)}`));
      return prices;
    } else {
      console.log(`  ⚠️  Could not extract prices (needs manual check)`);
      return null;
    }
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log(`Processing ${catering.length} products...\n`);
  console.log('⚠️  TEST RUN: First 10 products only');
  console.log('Remove slice(0, 10) to process all\n');
  console.log('='.repeat(60));
  
  const updates = {};
  const testProducts = catering.slice(0, 10);
  
  for (const product of testProducts) {
    const prices = await fixProduct(product);
    if (prices) {
      updates[product.id] = prices;
    }
    
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 RESULTS: Found prices for ${Object.keys(updates).length}/${testProducts.length} products\n`);
  
  if (Object.keys(updates).length > 0) {
    fs.writeFileSync(
      path.join(__dirname, '../price-fixes.json'),
      JSON.stringify(updates, null, 2)
    );
    console.log('✅ Saved to: price-fixes.json');
    console.log('\nNext: Review the prices and apply to catalog');
  } else {
    console.log('❌ No prices extracted - HTML structure may have changed');
    console.log('\n💡 ALTERNATIVE: Provide CSV with correct prices:');
    console.log('   product-id, size, price');
    console.log('   gourmet-wraps, Serves 8, 69.99');
    console.log('   gourmet-wraps, Serves 10, 79.99');
    console.log('   etc...');
  }
  
  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);
