#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * Usage: node scripts/optimize-images.js <input-folder> <output-folder>
 * 
 * This script:
 * - Preserves original quality (quality: 90)
 * - Converts to WebP for modern browsers
 * - Generates multiple sizes for responsive images
 * - No visible quality loss
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const QUALITY = 90; // High quality - no visible degradation
const SIZES = [400, 800, 1200, 1920, 2400]; // Responsive sizes

async function optimizeImage(inputPath, outputDir, filename) {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  
  try {
    // Original WebP (high quality)
    await sharp(inputPath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(path.join(outputDir, `${name}.webp`));
    
    console.log(`✅ Optimized: ${filename} -> ${name}.webp`);
    
    // Generate responsive sizes
    for (const size of SIZES) {
      await sharp(inputPath)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(path.join(outputDir, `${name}-${size}w.webp`));
      
      console.log(`   📐 Generated: ${name}-${size}w.webp`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return false;
  }
}

async function processFolder(inputFolder, outputFolder) {
  try {
    // Ensure output folder exists
    await fs.mkdir(outputFolder, { recursive: true });
    
    // Read all files from input folder
    const files = await fs.readdir(inputFolder);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`\n🚀 Processing ${imageFiles.length} images...\n`);
    
    let success = 0;
    for (const file of imageFiles) {
      const inputPath = path.join(inputFolder, file);
      const result = await optimizeImage(inputPath, outputFolder, file);
      if (result) success++;
    }
    
    console.log(`\n✨ Done! Successfully optimized ${success}/${imageFiles.length} images`);
    console.log(`📁 Output: ${outputFolder}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// CLI usage
const [inputFolder, outputFolder] = process.argv.slice(2);

if (!inputFolder || !outputFolder) {
  console.log(`
📸 Image Optimization Script

Usage: node scripts/optimize-images.js <input-folder> <output-folder>

Example:
  node scripts/optimize-images.js ./raw-images ./public/images

Settings:
  - Quality: ${QUALITY} (near-lossless)
  - Format: WebP
  - Sizes: ${SIZES.join(', ')}px
  `);
  process.exit(1);
}

processFolder(inputFolder, outputFolder);
