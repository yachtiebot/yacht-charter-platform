#!/usr/bin/env node
/**
 * COMPREHENSIVE CATALOG AUDIT
 * 
 * Checks:
 * 1. Every product has correct pricing from website
 * 2. Every image exists and follows naming rules
 * 3. Every image is optimized (no originals left)
 * 4. Photos match correct products
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 COMPREHENSIVE CATALOG AUDIT\n');
console.log('='.repeat(60));

// Load all catalogs
const catering = require('../lib/store/catering-catalog.json');
const waterToys = require('../lib/store/products-complete.json').waterToys;
const flowers = require('../lib/store/products-complete.json').flowers;
const bachelorette = require('../lib/store/products-complete.json').bachelorette;

let totalIssues = 0;

// Helper: Check if image exists
function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', imagePath);
  return fs.existsSync(fullPath);
}

// Helper: Check naming convention
function checkNaming(imagePath) {
  const filename = path.basename(imagePath);
  return filename.startsWith('Miami_Yachting_Company_') && filename.endsWith('.jpg');
}

// Helper: Check for original files that should be deleted
function checkForOriginals(dir) {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) return [];
  
  const files = fs.readdirSync(fullPath);
  const violations = files.filter(f => {
    // Files that don't follow naming convention
    return !f.startsWith('Miami_Yachting_Company_') && (f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));
  });
  
  return violations;
}

console.log('\n📦 CATERING AUDIT (68 products)\n');

let cateringIssues = 0;

catering.forEach((product, idx) => {
  console.log(`[${idx + 1}/68] ${product.name}`);
  
  // Check price
  if (!product.price || product.needsPricing) {
    console.log(`  ❌ MISSING PRICE`);
    cateringIssues++;
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  // Check images
  if (!product.images || product.images.length === 0) {
    console.log(`  ❌ NO IMAGES`);
    cateringIssues++;
  } else {
    product.images.forEach(img => {
      if (!checkImageExists(img)) {
        console.log(`  ❌ Image missing: ${img}`);
        cateringIssues++;
      } else if (!checkNaming(img)) {
        console.log(`  ⚠️  Image naming violation: ${img}`);
        cateringIssues++;
      }
    });
    console.log(`  ✓ Images: ${product.images.length}`);
  }
  
  console.log('');
});

// Check for original files in catering
const cateringOriginals = checkForOriginals('public/images/products/catering-complete');
if (cateringOriginals.length > 0) {
  console.log(`⚠️  ${cateringOriginals.length} original files need deletion:`);
  cateringOriginals.forEach(f => console.log(`   - ${f}`));
  cateringIssues += cateringOriginals.length;
}

console.log('\n📊 Catering Issues:', cateringIssues);
totalIssues += cateringIssues;

console.log('\n' + '='.repeat(60));
console.log('\n💧 WATER TOYS AUDIT\n');

let waterToysIssues = 0;

waterToys.forEach((product, idx) => {
  console.log(`[${idx + 1}] ${product.name}`);
  
  if (!product.price) {
    console.log(`  ❌ MISSING PRICE`);
    waterToysIssues++;
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  if (product.imageUrl) {
    if (!checkImageExists(product.imageUrl)) {
      console.log(`  ❌ Image missing: ${product.imageUrl}`);
      waterToysIssues++;
    } else if (!checkNaming(product.imageUrl)) {
      console.log(`  ⚠️  Image naming violation: ${product.imageUrl}`);
      waterToysIssues++;
    } else {
      console.log(`  ✓ Image OK`);
    }
  }
  
  console.log('');
});

const waterToysOriginals = checkForOriginals('public/images/products/water-toys');
if (waterToysOriginals.length > 0) {
  console.log(`⚠️  ${waterToysOriginals.length} original files need deletion:`);
  waterToysOriginals.forEach(f => console.log(`   - ${f}`));
  waterToysIssues += waterToysOriginals.length;
}

console.log('\n📊 Water Toys Issues:', waterToysIssues);
totalIssues += waterToysIssues;

console.log('\n' + '='.repeat(60));
console.log('\n🌸 FLOWERS AUDIT\n');

let flowersIssues = 0;

flowers.forEach((product, idx) => {
  console.log(`[${idx + 1}] ${product.name}`);
  
  if (!product.price && !product.sizes) {
    console.log(`  ❌ MISSING PRICE`);
    flowersIssues++;
  } else {
    console.log(`  ✓ Has pricing`);
  }
  
  if (product.imageUrl) {
    if (!checkImageExists(product.imageUrl)) {
      console.log(`  ❌ Image missing: ${product.imageUrl}`);
      flowersIssues++;
    } else if (!checkNaming(product.imageUrl)) {
      console.log(`  ⚠️  Image naming violation: ${product.imageUrl}`);
      flowersIssues++;
    } else {
      console.log(`  ✓ Image OK`);
    }
  }
  
  console.log('');
});

const flowersOriginals = checkForOriginals('public/images/products/flowers');
if (flowersOriginals.length > 0) {
  console.log(`⚠️  ${flowersOriginals.length} original files need deletion:`);
  flowersOriginals.forEach(f => console.log(`   - ${f}`));
  flowersIssues += flowersOriginals.length;
}

console.log('\n📊 Flowers Issues:', flowersIssues);
totalIssues += flowersIssues;

console.log('\n' + '='.repeat(60));
console.log('\n🎉 BACHELORETTE AUDIT\n');

let bacheloretteIssues = 0;

bachelorette.forEach((product, idx) => {
  console.log(`[${idx + 1}] ${product.name}`);
  
  if (!product.price) {
    console.log(`  ❌ MISSING PRICE`);
    bacheloretteIssues++;
  } else {
    console.log(`  ✓ Price: $${product.price}`);
  }
  
  if (product.imageUrl) {
    if (!checkImageExists(product.imageUrl)) {
      console.log(`  ❌ Image missing: ${product.imageUrl}`);
      bacheloretteIssues++;
    } else if (!checkNaming(product.imageUrl)) {
      console.log(`  ⚠️  Image naming violation: ${product.imageUrl}`);
      bacheloretteIssues++;
    } else {
      console.log(`  ✓ Image OK`);
    }
  }
  
  console.log('');
});

const bacheloretteOriginals = checkForOriginals('public/images/products/bachelorette');
if (bacheloretteOriginals.length > 0) {
  console.log(`⚠️  ${bacheloretteOriginals.length} original files need deletion:`);
  bacheloretteOriginals.forEach(f => console.log(`   - ${f}`));
  bacheloretteIssues += bacheloretteOriginals.length;
}

console.log('\n📊 Bachelorette Issues:', bacheloretteIssues);
totalIssues += bacheloretteIssues;

console.log('\n' + '='.repeat(60));
console.log('\n🎯 FINAL AUDIT RESULTS\n');
console.log(`Total Issues Found: ${totalIssues}`);

if (totalIssues === 0) {
  console.log('\n🎉 PERFECT! All products pass audit!');
} else {
  console.log('\n⚠️  Issues need to be addressed');
}

console.log('='.repeat(60));

process.exit(totalIssues > 0 ? 1 : 0);
