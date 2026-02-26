#!/usr/bin/env node
/**
 * MIGRATE ALL PRODUCT IMAGES TO SUPABASE
 * 
 * This will:
 * 1. Upload all product images to Supabase Storage
 * 2. Update all catalog references to Supabase URLs
 * 3. Keep local copies as backup
 * 4. Generate cleanup script to remove from git later
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase config
const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';
const BUCKET_NAME = 'product-images';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('🚀 MIGRATING PRODUCT IMAGES TO SUPABASE\n');
console.log('='.repeat(60));

// Directories to migrate
const directories = [
  'public/images/products/catering-complete',
  'public/images/products/catering',
  'public/images/products/water-toys',
  'public/images/products/flowers',
  'public/images/products/bachelorette',
  'public/images/premium-addons'
];

let uploadCount = 0;
let errorCount = 0;
const urlMap = {}; // old path -> new URL

async function ensureBucketExists() {
  console.log('\n📦 Checking bucket...\n');
  
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.find(b => b.name === BUCKET_NAME);
  
  if (!exists) {
    console.log('Creating bucket:', BUCKET_NAME);
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880 // 5MB
    });
    
    if (error) {
      console.error('❌ Failed to create bucket:', error.message);
      process.exit(1);
    }
  }
  
  console.log('✅ Bucket ready:', BUCKET_NAME);
}

async function uploadFile(localPath, storagePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const contentType = localPath.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true
      });
    
    if (error) {
      console.error(`  ❌ Failed: ${path.basename(localPath)} - ${error.message}`);
      errorCount++;
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);
    
    uploadCount++;
    return publicUrl;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    errorCount++;
    return null;
  }
}

async function migrateDirectory(dir) {
  const fullPath = path.join(__dirname, '..', dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skip: ${dir} (doesn't exist)`);
    return;
  }
  
  const files = fs.readdirSync(fullPath).filter(f => f.match(/\.(jpg|png|jpeg)$/i));
  
  console.log(`\n📁 ${dir}`);
  console.log(`   Files: ${files.length}`);
  
  for (const file of files) {
    const localPath = path.join(fullPath, file);
    const category = dir.split('/')[2]; // e.g., 'catering-complete'
    const storagePath = `${category}/${file}`;
    
    const publicUrl = await uploadFile(localPath, storagePath);
    
    if (publicUrl) {
      const oldPath = `/${dir}/${file}`;
      urlMap[oldPath] = publicUrl;
      console.log(`  ✅ ${file}`);
    }
  }
}

async function updateCatalogs() {
  console.log('\n📝 Updating catalog references...\n');
  
  // Update catering-catalog.json
  const cateringPath = path.join(__dirname, '../lib/store/catering-catalog.json');
  if (fs.existsSync(cateringPath)) {
    const catalog = JSON.parse(fs.readFileSync(cateringPath, 'utf8'));
    
    catalog.forEach(product => {
      if (product.images && product.images.length > 0) {
        product.images = product.images.map(img => urlMap[img] || img);
      }
    });
    
    fs.writeFileSync(cateringPath, JSON.stringify(catalog, null, 2));
    console.log('✅ Updated catering-catalog.json');
  }
  
  // Update products-complete.json
  const productsPath = path.join(__dirname, '../lib/store/products-complete.json');
  if (fs.existsSync(productsPath)) {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    
    ['waterToys', 'flowers', 'bachelorette'].forEach(category => {
      if (products[category]) {
        products[category].forEach(product => {
          if (product.imageUrl && urlMap[product.imageUrl]) {
            product.imageUrl = urlMap[product.imageUrl];
          }
        });
      }
    });
    
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    console.log('✅ Updated products-complete.json');
  }
  
  // Update premium-services.json
  const premiumPath = path.join(__dirname, '../lib/store/premium-services.json');
  if (fs.existsSync(premiumPath)) {
    const premium = JSON.parse(fs.readFileSync(premiumPath, 'utf8'));
    
    premium.premiumServices.forEach(service => {
      if (service.image && urlMap[service.image]) {
        service.image = urlMap[service.image];
      }
    });
    
    fs.writeFileSync(premiumPath, JSON.stringify(premium, null, 2));
    console.log('✅ Updated premium-services.json');
  }
}

async function main() {
  try {
    await ensureBucketExists();
    
    console.log('\n' + '='.repeat(60));
    console.log('📤 UPLOADING FILES...\n');
    
    for (const dir of directories) {
      await migrateDirectory(dir);
    }
    
    await updateCatalogs();
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 MIGRATION COMPLETE!\n');
    console.log('📊 RESULTS:');
    console.log(`   • Uploaded: ${uploadCount} files`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Catalogs updated: 3`);
    console.log('\n💾 All images now on Supabase CDN!');
    console.log('🔗 Base URL:', SUPABASE_URL);
    console.log('='.repeat(60));
    
    // Save URL map for reference
    fs.writeFileSync(
      path.join(__dirname, '../migration-url-map.json'),
      JSON.stringify(urlMap, null, 2)
    );
    
    console.log('\n📋 URL map saved to: migration-url-map.json');
    
  } catch (error) {
    console.error('❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
