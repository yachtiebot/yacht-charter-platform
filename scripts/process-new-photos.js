#!/usr/bin/env node
/**
 * AUTOMATED PHOTO PROCESSOR
 * 
 * Usage: node scripts/process-new-photos.js <category> <product-slug>
 * Example: node scripts/process-new-photos.js flowers "rose_pave"
 * 
 * Process:
 * 1. Optimize with Sharp
 * 2. Rename properly (Miami_Yachting_Company_ prefix)
 * 3. Upload to Supabase
 * 4. Update catalog
 * 5. PURGE originals (automatic!)
 */

const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Config
const STAGING_DIR = path.join(__dirname, '../staging/photos');
const CATEGORY = process.argv[2]; // catering-complete, flowers, bachelorette, water-toys
const PRODUCT_SLUG = process.argv[3]; // e.g., "rose_pave"

const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('🚀 AUTOMATED PHOTO PROCESSOR\n');
console.log('='.repeat(60));

if (!CATEGORY || !PRODUCT_SLUG) {
  console.error('\n❌ Missing arguments!');
  console.error('\nUsage: node scripts/process-new-photos.js <category> <product-slug>');
  console.error('\nCategories: catering-complete, flowers, bachelorette, water-toys');
  console.error('Example: node scripts/process-new-photos.js flowers "rose_pave"');
  process.exit(1);
}

if (!fs.existsSync(STAGING_DIR)) {
  console.error(`\n❌ Staging directory not found: ${STAGING_DIR}`);
  console.error('Create it and place photos there first!');
  process.exit(1);
}

async function processPhoto(inputPath, productSlug, imageNumber) {
  const filename = `Miami_Yachting_Company_${productSlug}_${imageNumber}.jpg`;
  const tempPath = path.join('/tmp', filename);
  
  console.log(`\n📸 Processing: ${path.basename(inputPath)}`);
  
  // 1. Optimize with Sharp
  const originalStats = fs.statSync(inputPath);
  const originalSizeKB = (originalStats.size / 1024).toFixed(0);
  
  await sharp(inputPath)
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
  const sizeKB = (stats.size / 1024).toFixed(0);
  const savings = ((1 - stats.size / originalStats.size) * 100).toFixed(1);
  
  console.log(`  ✓ Optimized: ${originalSizeKB}KB → ${sizeKB}KB (${savings}% savings)`);
  
  if (stats.size > 512000) { // > 500KB
    console.warn(`  ⚠️  Warning: ${sizeKB}KB exceeds 500KB target`);
  }
  
  // 2. Upload to Supabase
  console.log(`  ↑ Uploading to Supabase...`);
  
  const fileBuffer = fs.readFileSync(tempPath);
  const storagePath = `${CATEGORY}/${filename}`;
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(storagePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) {
    console.error(`  ❌ Upload failed: ${error.message}`);
    throw error;
  }
  
  // 3. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(storagePath);
  
  // 4. Clean up temp file
  fs.unlinkSync(tempPath);
  
  console.log(`  ✅ Uploaded: ${filename}`);
  console.log(`  🔗 URL: ${publicUrl}`);
  
  return publicUrl;
}

async function main() {
  console.log(`\nCategory: ${CATEGORY}`);
  console.log(`Product: ${PRODUCT_SLUG}`);
  console.log(`Source: ${STAGING_DIR}\n`);
  console.log('='.repeat(60));
  
  // Get all image files from staging
  const files = fs.readdirSync(STAGING_DIR)
    .filter(f => f.match(/\.(jpg|jpeg|png|heic|webp)$/i))
    .sort();
  
  if (files.length === 0) {
    console.error('\n❌ No image files found in staging directory!');
    process.exit(1);
  }
  
  console.log(`\n📦 Found ${files.length} photo(s) to process\n`);
  
  const urls = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(STAGING_DIR, file);
    
    try {
      const url = await processPhoto(inputPath, PRODUCT_SLUG, i + 1);
      urls.push(url);
    } catch (error) {
      console.error(`\n❌ Failed to process ${file}:`, error.message);
      process.exit(1);
    }
  }
  
  // 5. PURGE ORIGINALS (Critical!)
  console.log('\n' + '='.repeat(60));
  console.log('\n🗑️  PURGING ORIGINALS...');
  
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  fs.mkdirSync(STAGING_DIR, { recursive: true });
  
  console.log('✅ All original files deleted!');
  console.log('📁 Staging directory cleaned');
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n🎉 PROCESSING COMPLETE!\n');
  console.log(`📊 Results:`);
  console.log(`   • Photos processed: ${urls.length}`);
  console.log(`   • Originals purged: Yes ✓`);
  console.log(`   • Storage: Supabase CDN`);
  
  console.log('\n📋 Add these URLs to your catalog:\n');
  console.log('```json');
  console.log('"images": [');
  urls.forEach((url, i) => {
    const comma = i < urls.length - 1 ? ',' : '';
    console.log(`  "${url}"${comma}`);
  });
  console.log(']');
  console.log('```');
  
  console.log('\n='.repeat(60));
}

main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});
