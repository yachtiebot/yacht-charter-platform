#!/usr/bin/env node
/**
 * FIX IMAGE-TO-PRODUCT MATCHES
 * 
 * Re-downloads images from actual Squarespace product pages
 * to ensure correct image-product associations
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const catering = require('../lib/store/catering-catalog.json');

console.log('🔧 FIXING IMAGE-PRODUCT MATCHES\n');
console.log('This will re-download images from Squarespace product pages');
console.log('to ensure correct associations.\n');

// Helper: Download image from URL
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Helper: Get product page HTML
function fetchPage(productSlug) {
  return new Promise((resolve, reject) => {
    const url = `https://www.miamiyachtingcompany.com/catering/p/${productSlug}`;
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Helper: Extract image URLs from product page
function extractImageUrls(html) {
  const urls = [];
  
  // Match Squarespace image patterns
  const patterns = [
    /https:\/\/images\.squarespace-cdn\.com\/content\/[^"'\s]+/g,
    /"url":"(https:\/\/[^"]+\.jpg[^"]*)"/g
  ];
  
  patterns.forEach(pattern => {
    const matches = html.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const url = match.replace(/"url":"/g, '').replace(/"/g, '');
        if (url.includes('.jpg') || url.includes('.png')) {
          urls.push(url);
        }
      });
    }
  });
  
  // Deduplicate
  return [...new Set(urls)];
}

async function fixProduct(product) {
  console.log(`\n📦 ${product.name}`);
  
  if (!product.squarespaceUrl) {
    console.log('  ⚠️  No Squarespace URL - skipping');
    return null;
  }
  
  // Extract slug from URL
  const slug = product.squarespaceUrl.split('/p/')[1];
  if (!slug) {
    console.log('  ⚠️  Could not extract slug - skipping');
    return null;
  }
  
  try {
    // Fetch product page
    console.log(`  → Fetching page...`);
    const html = await fetchPage(slug);
    
    // Extract image URLs
    const imageUrls = extractImageUrls(html);
    console.log(`  ✓ Found ${imageUrls.length} images`);
    
    if (imageUrls.length === 0) {
      console.log('  ⚠️  No images found');
      return null;
    }
    
    // Download and upload first 5 images
    const newUrls = [];
    const limit = Math.min(imageUrls.length, 5);
    
    for (let i = 0; i < limit; i++) {
      const imageUrl = imageUrls[i];
      const productSlug = slug.replace(/\//g, '-');
      const filename = `Miami_Yachting_Company_${productSlug}_${i + 1}.jpg`;
      
      try {
        console.log(`  ↓ Downloading image ${i + 1}...`);
        const imageBuffer = await downloadImage(imageUrl);
        
        console.log(`  ↑ Uploading to Supabase...`);
        const { error } = await supabase.storage
          .from('product-images')
          .upload(`catering-complete/${filename}`, imageBuffer, {
            contentType: 'image/jpeg',
            upsert: true
          });
        
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(`catering-complete/${filename}`);
        
        newUrls.push(publicUrl);
        console.log(`  ✅ Uploaded: ${filename}`);
        
      } catch (err) {
        console.error(`  ❌ Failed image ${i + 1}:`, err.message);
      }
    }
    
    return newUrls.length > 0 ? newUrls : null;
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Starting image fix for all products...\n');
  console.log('This will take 10-15 minutes for 68 products.\n');
  console.log('⚠️  WARNING: This is a test run on first 5 products only!');
  console.log('If results look good, remove the slice(0, 5) limit.\n');
  
  const updates = {};
  
  // TEST: Only process first 5 products
  const testProducts = catering.slice(0, 5);
  
  for (const product of testProducts) {
    const newUrls = await fixProduct(product);
    if (newUrls) {
      updates[product.id] = newUrls;
    }
    
    // Rate limit: wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 RESULTS:\n');
  console.log(`Products processed: ${testProducts.length}`);
  console.log(`Successful updates: ${Object.keys(updates).length}`);
  
  if (Object.keys(updates).length > 0) {
    console.log('\n📋 Ready to update catalog with these new URLs:');
    console.log(JSON.stringify(updates, null, 2));
    
    fs.writeFileSync(
      path.join(__dirname, '../image-fix-results.json'),
      JSON.stringify(updates, null, 2)
    );
    console.log('\n✅ Saved results to: image-fix-results.json');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n⚠️  MANUAL VERIFICATION REQUIRED:');
  console.log('Please check the first 5 products on the website to verify');
  console.log('images now match correctly before running for all 68 products.');
}

main().catch(console.error);
