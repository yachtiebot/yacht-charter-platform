#!/usr/bin/env node
/**
 * DOWNLOAD IMAGES FROM SQUARESPACE AND UPLOAD TO SUPABASE
 * Uses the image URLs from the CSV to get correct images
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const catalog = require('../lib/store/catering-catalog-new.json');

console.log('📥 DOWNLOADING AND UPLOADING IMAGES\n');
console.log('='.repeat(60));

// Filter to only catering products (no flowers, water toys, bachelorette)
const cateringProducts = catalog.filter(p => {
  // Exclude non-catering items
  if (p.id === 'flyboard' || p.id === 'jet-ski' || p.id === 'water-sports') return false;
  if (p.name.includes('Seabob') || p.name.includes('Flitescooter') || p.name.includes('Cabana')) return false;
  if (p.name.includes('Rose') || p.name.includes('Orchid') || p.name.includes('Tropical')) return false;
  if (p.name.includes('Last Toast') || p.name.includes('Last Sail') || p.name.includes('Something Blue')) return false;
  return true;
});

console.log(`\n📦 Processing ${cateringProducts.length} catering products\n`);

// Helper: Download image
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

async function processProduct(product, index) {
  console.log(`\n[${index + 1}/${cateringProducts.length}] ${product.name}`);
  
  if (!product.images || product.images.length === 0) {
    console.log('  ⚠️  No images in CSV - skipping');
    return { success: false, reason: 'no-images' };
  }
  
  const newImageUrls = [];
  
  for (let i = 0; i < product.images.length; i++) {
    const imageUrl = product.images[i];
    const filename = `Miami_Yachting_Company_${product.id.replace(/[^a-z0-9]/gi, '_')}_${i + 1}.jpg`;
    
    try {
      console.log(`  ↓ Downloading image ${i + 1}/${product.images.length}...`);
      const imageBuffer = await downloadImage(imageUrl);
      
      console.log(`  ↑ Uploading to Supabase...`);
      const { error } = await supabase.storage
        .from('product-images')
        .upload(`catering/${filename}`, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(`catering/${filename}`);
      
      newImageUrls.push(publicUrl);
      console.log(`  ✅ Uploaded: ${filename}`);
      
    } catch (error) {
      console.error(`  ❌ Failed image ${i + 1}: ${error.message}`);
    }
  }
  
  return {
    success: newImageUrls.length > 0,
    imageUrls: newImageUrls
  };
}

async function main() {
  const updates = {};
  let successCount = 0;
  
  for (let i = 0; i < cateringProducts.length; i++) {
    const product = cateringProducts[i];
    
    const result = await processProduct(product, i);
    
    if (result.success) {
      updates[product.id] = result.imageUrls;
      successCount++;
    }
    
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ DOWNLOAD COMPLETE!\n`);
  console.log(`📊 Results:`);
  console.log(`   • Products processed: ${cateringProducts.length}`);
  console.log(`   • Successfully uploaded: ${successCount}`);
  console.log(`   • Failed: ${cateringProducts.length - successCount}`);
  
  // Update catalog with new URLs
  catalog.forEach(product => {
    if (updates[product.id]) {
      product.images = updates[product.id];
    }
  });
  
  // Save updated catalog
  fs.writeFileSync(
    path.join(__dirname, '../lib/store/catering-catalog-verified.json'),
    JSON.stringify(catalog, null, 2)
  );
  
  console.log(`\n✅ Updated catalog saved to: catering-catalog-verified.json`);
  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);
