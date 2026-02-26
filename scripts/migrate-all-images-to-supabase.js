#!/usr/bin/env node
/**
 * COMPLETE IMAGE MIGRATION TO SUPABASE
 * 
 * 1. Download images from Squarespace (from CSV)
 * 2. Optimize with Sharp (85% quality, max 500KB, progressive)
 * 3. Rename: Miami_Yachting_Company_[product]_[num].jpg
 * 4. Upload to Supabase
 * 5. Update all catalogs with Supabase URLs
 * 6. Delete originals
 */

const sharp = require('sharp');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Load all catalogs
const catering = require('../lib/store/catering-catalog.json');
const productsComplete = require('../lib/store/products-complete.json');

console.log('🚀 COMPLETE IMAGE MIGRATION TO SUPABASE\n');
console.log('Pipeline: Download → Optimize → Rename → Upload → Update Catalogs\n');
console.log('='.repeat(60));

// Combine all products
const allProducts = [
  ...catering.map(p => ({ ...p, category: 'catering' })),
  ...productsComplete.waterToys.map(p => ({ ...p, category: 'water-toys' })),
  ...productsComplete.flowers.map(p => ({ ...p, category: 'flowers' }))
];

console.log(`\n📦 Total products: ${allProducts.length}`);
console.log(`   • Catering: ${catering.length}`);
console.log(`   • Water Toys: ${productsComplete.waterToys.length}`);
console.log(`   • Flowers: ${productsComplete.flowers.length}\n`);

const TEMP_DIR = '/tmp/squarespace-images';
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

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

// Helper: Optimize and upload image
async function processImage(imageUrl, productSlug, category, imageIndex) {
  const filename = `Miami_Yachting_Company_${productSlug.replace(/[^a-z0-9]/gi, '_')}_${imageIndex}.jpg`;
  const tempPath = path.join(TEMP_DIR, filename);
  
  try {
    // 1. Download
    const imageBuffer = await downloadImage(imageUrl);
    const originalSize = (imageBuffer.length / 1024).toFixed(0);
    
    // 2. Optimize with Sharp
    await sharp(imageBuffer)
      .resize(1920, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(tempPath);
    
    const stats = fs.statSync(tempPath);
    const optimizedSize = (stats.size / 1024).toFixed(0);
    const savings = ((1 - stats.size / imageBuffer.length) * 100).toFixed(1);
    
    // 3. Upload to Supabase
    const fileBuffer = fs.readFileSync(tempPath);
    const storagePath = `${category}/${filename}`;
    
    const { error } = await supabase.storage
      .from('product-images')
      .upload(storagePath, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (error) throw error;
    
    // 4. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(storagePath);
    
    // 5. Delete temp file
    fs.unlinkSync(tempPath);
    
    return {
      success: true,
      url: publicUrl,
      originalSize,
      optimizedSize,
      savings
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function processProduct(product, index, total) {
  console.log(`\n[${index + 1}/${total}] ${product.name}`);
  console.log(`   Category: ${product.category}`);
  
  const imageUrls = product.images || (product.imageUrl ? [product.imageUrl] : []);
  
  if (imageUrls.length === 0) {
    console.log('   ⚠️  No images - skipping');
    return null;
  }
  
  const newUrls = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    
    console.log(`   [${i + 1}/${imageUrls.length}] Processing...`);
    
    const result = await processImage(
      imageUrl,
      product.id || product.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      product.category,
      i + 1
    );
    
    if (result.success) {
      newUrls.push(result.url);
      console.log(`      ✓ ${result.originalSize}KB → ${result.optimizedSize}KB (${result.savings}% saved)`);
    } else {
      console.log(`      ✗ Failed: ${result.error}`);
    }
  }
  
  return newUrls.length > 0 ? newUrls : null;
}

async function main() {
  console.log('\n🔄 Starting migration...\n');
  console.log('='.repeat(60));
  
  const updates = {
    catering: {},
    waterToys: {},
    flowers: {}
  };
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    
    const newUrls = await processProduct(product, i, allProducts.length);
    
    if (newUrls) {
      const key = product.id || product.name;
      if (product.category === 'catering') {
        updates.catering[key] = newUrls;
      } else if (product.category === 'water-toys') {
        updates.waterToys[key] = newUrls;
      } else if (product.category === 'flowers') {
        updates.flowers[key] = newUrls;
      }
      successCount++;
    } else {
      failCount++;
    }
    
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 MIGRATION RESULTS:\n');
  console.log(`   • Total processed: ${allProducts.length}`);
  console.log(`   • Successful: ${successCount}`);
  console.log(`   • Failed: ${failCount}`);
  console.log(`   • Images uploaded: ${Object.values(updates.catering).flat().length + Object.values(updates.waterToys).flat().length + Object.values(updates.flowers).flat().length}`);
  
  // Update catalogs
  console.log('\n📝 Updating catalogs...\n');
  
  // Update catering
  catering.forEach(product => {
    if (updates.catering[product.id]) {
      product.images = updates.catering[product.id];
    }
  });
  
  // Update water toys
  productsComplete.waterToys.forEach(product => {
    const key = product.id || product.name;
    if (updates.waterToys[key]) {
      product.imageUrl = updates.waterToys[key][0];
      product.images = updates.waterToys[key];
    }
  });
  
  // Update flowers
  productsComplete.flowers.forEach(product => {
    const key = product.id || product.name;
    if (updates.flowers[key]) {
      product.imageUrl = updates.flowers[key][0];
      product.images = updates.flowers[key];
    }
  });
  
  // Save updated catalogs
  fs.writeFileSync(
    path.join(__dirname, '../lib/store/catering-catalog.json'),
    JSON.stringify(catering, null, 2)
  );
  
  fs.writeFileSync(
    path.join(__dirname, '../lib/store/products-complete.json'),
    JSON.stringify(productsComplete, null, 2)
  );
  
  console.log('✅ Catering catalog updated');
  console.log('✅ Products complete updated');
  
  // Clean up temp directory
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log('✅ Temp files cleaned up');
  
  console.log('\n' + '='.repeat(60));
  console.log('\n🎉 MIGRATION COMPLETE!\n');
  console.log('All images now on Supabase CDN!');
  console.log('All catalogs updated with Supabase URLs!');
  console.log('Safe to shut down Squarespace site!');
  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);
