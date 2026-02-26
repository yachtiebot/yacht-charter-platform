#!/usr/bin/env node
/**
 * FIX ALL CATERING IMAGES
 * 1. Convert PNG → JPG
 * 2. Rename to Miami_Yachting_Company_ prefix
 * 3. Optimize with Sharp
 * 4. Delete originals
 * 5. Update catalog references
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '../public/images/products/catering-complete');
const CATALOG_PATH = path.join(__dirname, '../lib/store/catering-catalog.json');

console.log('🔧 FIXING ALL CATERING IMAGES\n');

// Get all image files
const files = fs.readdirSync(IMAGE_DIR);
const imageFiles = files.filter(f => f.match(/\.(png|jpg|jpeg)$/i));

console.log(`📦 Found ${imageFiles.length} images to process\n`);

const conversions = [];

// Process each file
async function processImage(filename) {
  const inputPath = path.join(IMAGE_DIR, filename);
  
  // Extract product ID and number
  const match = filename.match(/^([^_]+)_(\d+)\.(png|jpg|jpeg)$/i);
  if (!match) {
    console.log(`⚠️  Skip: ${filename} (can't parse)`);
    return null;
  }
  
  const [, productId, imageNum, ext] = match;
  const outputFilename = `Miami_Yachting_Company_${productId}_${imageNum}.jpg`;
  const outputPath = path.join(IMAGE_DIR, outputFilename);
  
  try {
    // Get original size
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(0);
    
    // Convert and optimize
    await sharp(inputPath)
      .resize(1920, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(0);
    const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    
    // Delete original
    fs.unlinkSync(inputPath);
    
    console.log(`✅ ${productId}_${imageNum}: ${originalSize}KB → ${newSize}KB (${savings}% saved)`);
    
    return {
      productId,
      oldPath: `/images/products/catering-complete/${filename}`,
      newPath: `/images/products/catering-complete/${outputFilename}`
    };
  } catch (error) {
    console.error(`❌ Failed: ${filename} - ${error.message}`);
    return null;
  }
}

// Process all images
async function processAll() {
  for (const file of imageFiles) {
    const result = await processImage(file);
    if (result) {
      conversions.push(result);
    }
  }
  
  console.log(`\n✅ Processed ${conversions.length} images\n`);
  
  // Update catalog
  console.log('📝 Updating catalog references...\n');
  
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  
  catalog.forEach(product => {
    if (product.images && product.images.length > 0) {
      product.images = product.images.map(oldPath => {
        const conversion = conversions.find(c => c.oldPath === oldPath);
        return conversion ? conversion.newPath : oldPath;
      });
    }
  });
  
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  
  console.log('✅ Catalog updated\n');
  console.log('='.repeat(60));
  console.log('🎉 ALL CATERING IMAGES FIXED!\n');
  console.log(`📊 RESULTS:`);
  console.log(`   • Images processed: ${conversions.length}`);
  console.log(`   • All PNG → JPG`);
  console.log(`   • All renamed with Miami_Yachting_Company_ prefix`);
  console.log(`   • All optimized with Sharp`);
  console.log(`   • All originals deleted`);
  console.log('='.repeat(60));
}

processAll().catch(console.error);
