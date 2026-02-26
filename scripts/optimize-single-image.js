#!/usr/bin/env node
/**
 * Optimize single image with Sharp
 * Usage: node scripts/optimize-single-image.js input.jpg output.jpg
 */

const sharp = require('sharp');
const fs = require('fs');

async function optimizeImage(input, output) {
  const originalStats = fs.statSync(input);
  console.log(`📊 Original: ${(originalStats.size / 1024).toFixed(2)}KB`);
  
  await sharp(input)
    .resize(1920, null, { 
      fit: 'inside',
      withoutEnlargement: true 
    })
    .jpeg({ 
      quality: 85,
      progressive: true 
    })
    .toFile(output);
  
  const newStats = fs.statSync(output);
  console.log(`✅ Optimized: ${(newStats.size / 1024).toFixed(2)}KB`);
  console.log(`💾 Saved: ${((1 - newStats.size / originalStats.size) * 100).toFixed(1)}%`);
  
  if (input !== output) {
    fs.unlinkSync(input);
    console.log(`🗑️  Deleted original: ${input}`);
  }
}

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node optimize-single-image.js input.jpg output.jpg');
  process.exit(1);
}

optimizeImage(input, output).catch(console.error);
