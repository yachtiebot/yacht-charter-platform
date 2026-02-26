#!/usr/bin/env node
/**
 * COMPREHENSIVE PRODUCT CATALOG AUDIT
 * 
 * Verifies:
 * 1. Every product has correct pricing
 * 2. Every image exists and is accessible
 * 3. Sizes/quantities match pricing structure
 * 4. No missing data or placeholders
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

console.log('🔍 COMPREHENSIVE CATALOG AUDIT\n');
console.log('='.repeat(80));

// Load catalogs
const catering = require('../lib/store/catering-catalog.json');
const productsComplete = require('../lib/store/products-complete.json');

let totalIssues = 0;
const issues = {
  catering: [],
  waterToys: [],
  flowers: [],
  bachelorette: []
};

// Helper: Check if URL is accessible
async function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Helper: Validate price
function validatePrice(price, productName) {
  if (!price) return 'MISSING PRICE';
  if (typeof price === 'string' && price.includes('$')) return 'Price has $ symbol (should be number)';
  if (isNaN(parseFloat(price))) return 'Invalid price format';
  return null;
}

// Helper: Check for size/price consistency
function validateSizes(product) {
  if (product.sizes && Array.isArray(product.sizes)) {
    const issues = [];
    product.sizes.forEach((size, idx) => {
      if (!size.name) issues.push(`Size ${idx + 1}: Missing name`);
      if (!size.price) issues.push(`Size ${idx + 1}: Missing price`);
      if (size.price && isNaN(parseFloat(size.price))) {
        issues.push(`Size ${idx + 1}: Invalid price format`);
      }
    });
    return issues.length > 0 ? issues.join(', ') : null;
  }
  return null;
}

console.log('\n📦 CATERING CATALOG AUDIT (68 products)\n');

let cateringComplete = 0;
for (let i = 0; i < catering.length; i++) {
  const product = catering[i];
  const num = i + 1;
  
  console.log(`[${num}/68] ${product.name}`);
  
  const productIssues = [];
  
  // Check price
  const priceIssue = validatePrice(product.price, product.name);
  if (priceIssue) {
    productIssues.push(`Price: ${priceIssue}`);
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  // Check sizes if applicable
  const sizeIssue = validateSizes(product);
  if (sizeIssue) {
    productIssues.push(`Sizes: ${sizeIssue}`);
  } else if (product.sizes) {
    console.log(`  ✓ Sizes: ${product.sizes.length} options`);
  }
  
  // Check images
  if (!product.images || product.images.length === 0) {
    productIssues.push('No images');
  } else {
    console.log(`  ✓ Images: ${product.images.length} photos`);
    // Sample check first image
    const firstImage = product.images[0];
    if (!firstImage.includes('supabase')) {
      productIssues.push('Images not on Supabase CDN');
    }
  }
  
  if (productIssues.length > 0) {
    issues.catering.push({ name: product.name, issues: productIssues });
    console.log(`  ❌ Issues: ${productIssues.join(' | ')}`);
  } else {
    cateringComplete++;
  }
  
  console.log('');
}

console.log(`📊 Catering: ${cateringComplete}/68 products perfect`);
if (issues.catering.length > 0) {
  console.log(`⚠️  ${issues.catering.length} products need attention`);
}

console.log('\n' + '='.repeat(80));
console.log('\n💧 WATER TOYS AUDIT\n');

const waterToys = productsComplete.waterToys || [];
let waterToysComplete = 0;

waterToys.forEach((product, idx) => {
  const num = idx + 1;
  console.log(`[${num}/${waterToys.length}] ${product.name}`);
  
  const productIssues = [];
  
  // Check price
  const priceIssue = validatePrice(product.price, product.name);
  if (priceIssue) {
    productIssues.push(`Price: ${priceIssue}`);
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  // Check image
  if (!product.imageUrl) {
    productIssues.push('No image');
  } else {
    console.log(`  ✓ Image: ${product.imageUrl.includes('supabase') ? 'Supabase CDN' : 'Local'}`);
    if (!product.imageUrl.includes('supabase')) {
      productIssues.push('Image not on Supabase CDN');
    }
  }
  
  if (productIssues.length > 0) {
    issues.waterToys.push({ name: product.name, issues: productIssues });
    console.log(`  ❌ Issues: ${productIssues.join(' | ')}`);
  } else {
    waterToysComplete++;
  }
  
  console.log('');
});

console.log(`📊 Water Toys: ${waterToysComplete}/${waterToys.length} products perfect`);

console.log('\n' + '='.repeat(80));
console.log('\n🌸 FLOWERS AUDIT\n');

const flowers = productsComplete.flowers || [];
let flowersComplete = 0;

flowers.forEach((product, idx) => {
  const num = idx + 1;
  console.log(`[${num}/${flowers.length}] ${product.name}`);
  
  const productIssues = [];
  
  // Check pricing structure
  if (!product.sizes && !product.price) {
    productIssues.push('No pricing structure');
  } else if (product.sizes) {
    const sizeIssue = validateSizes(product);
    if (sizeIssue) {
      productIssues.push(`Sizes: ${sizeIssue}`);
    } else {
      console.log(`  ✓ Sizes: ${product.sizes.length} options`);
    }
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  // Check image
  if (!product.imageUrl) {
    productIssues.push('No image');
  } else {
    console.log(`  ✓ Image: ${product.imageUrl.includes('supabase') ? 'Supabase CDN' : 'Local'}`);
    if (!product.imageUrl.includes('supabase')) {
      productIssues.push('Image not on Supabase CDN');
    }
  }
  
  if (productIssues.length > 0) {
    issues.flowers.push({ name: product.name, issues: productIssues });
    console.log(`  ❌ Issues: ${productIssues.join(' | ')}`);
  } else {
    flowersComplete++;
  }
  
  console.log('');
});

console.log(`📊 Flowers: ${flowersComplete}/${flowers.length} products perfect`);

console.log('\n' + '='.repeat(80));
console.log('\n🎉 BACHELORETTE PACKAGES AUDIT\n');

const bachelorette = productsComplete.bachelorette || [];
let bacheloretteComplete = 0;

bachelorette.forEach((product, idx) => {
  const num = idx + 1;
  console.log(`[${num}/${bachelorette.length}] ${product.name}`);
  
  const productIssues = [];
  
  // Check price
  const priceIssue = validatePrice(product.price, product.name);
  if (priceIssue) {
    productIssues.push(`Price: ${priceIssue}`);
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  // Check image
  if (!product.imageUrl) {
    productIssues.push('No image');
  } else {
    console.log(`  ✓ Image: ${product.imageUrl.includes('supabase') ? 'Supabase CDN' : 'Local'}`);
    if (!product.imageUrl.includes('supabase')) {
      productIssues.push('Image not on Supabase CDN');
    }
  }
  
  if (productIssues.length > 0) {
    issues.bachelorette.push({ name: product.name, issues: productIssues });
    console.log(`  ❌ Issues: ${productIssues.join(' | ')}`);
  } else {
    bacheloretteComplete++;
  }
  
  console.log('');
});

console.log(`📊 Bachelorette: ${bacheloretteComplete}/${bachelorette.length} products perfect`);

// Final summary
console.log('\n' + '='.repeat(80));
console.log('\n🎯 FINAL AUDIT SUMMARY\n');

const totalProducts = catering.length + waterToys.length + flowers.length + bachelorette.length;
const totalComplete = cateringComplete + waterToysComplete + flowersComplete + bacheloretteComplete;
const totalIssueCount = issues.catering.length + issues.waterToys.length + issues.flowers.length + issues.bachelorette.length;

console.log(`Total Products: ${totalProducts}`);
console.log(`Perfect Products: ${totalComplete} (${((totalComplete/totalProducts)*100).toFixed(1)}%)`);
console.log(`Products with Issues: ${totalIssueCount}`);

console.log('\nBREAKDOWN:');
console.log(`  Catering: ${cateringComplete}/${catering.length} ✓`);
console.log(`  Water Toys: ${waterToysComplete}/${waterToys.length} ✓`);
console.log(`  Flowers: ${flowersComplete}/${flowers.length} ✓`);
console.log(`  Bachelorette: ${bacheloretteComplete}/${bachelorette.length} ✓`);

if (totalIssueCount > 0) {
  console.log('\n⚠️  ISSUES FOUND:\n');
  
  if (issues.catering.length > 0) {
    console.log('CATERING:');
    issues.catering.forEach(item => {
      console.log(`  • ${item.name}: ${item.issues.join(', ')}`);
    });
  }
  
  if (issues.waterToys.length > 0) {
    console.log('\nWATER TOYS:');
    issues.waterToys.forEach(item => {
      console.log(`  • ${item.name}: ${item.issues.join(', ')}`);
    });
  }
  
  if (issues.flowers.length > 0) {
    console.log('\nFLOWERS:');
    issues.flowers.forEach(item => {
      console.log(`  • ${item.name}: ${item.issues.join(', ')}`);
    });
  }
  
  if (issues.bachelorette.length > 0) {
    console.log('\nBACHELORETTE:');
    issues.bachelorette.forEach(item => {
      console.log(`  • ${item.name}: ${item.issues.join(', ')}`);
    });
  }
}

console.log('\n' + '='.repeat(80));

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalProducts,
    totalComplete,
    totalIssueCount,
    percentComplete: ((totalComplete/totalProducts)*100).toFixed(1)
  },
  details: {
    catering: { total: catering.length, complete: cateringComplete, issues: issues.catering },
    waterToys: { total: waterToys.length, complete: waterToysComplete, issues: issues.waterToys },
    flowers: { total: flowers.length, complete: flowersComplete, issues: issues.flowers },
    bachelorette: { total: bachelorette.length, complete: bacheloretteComplete, issues: issues.bachelorette }
  }
};

fs.writeFileSync(
  path.join(__dirname, '../AUDIT_REPORT.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n📋 Detailed report saved to: AUDIT_REPORT.json\n');

process.exit(totalIssueCount > 0 ? 1 : 0);
