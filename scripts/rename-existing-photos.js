#!/usr/bin/env node

/**
 * Rename and optimize existing photos to follow SEO naming convention
 * Updates all references in code automatically
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const MAX_FILE_SIZE_KB = 500;
const PUBLIC_DIR = path.join(__dirname, '../public/images');
const APP_DIR = path.join(__dirname, '../app');

// Generate SEO-friendly name from old path
function generateSEOName(oldPath) {
  const relativePath = oldPath.replace(PUBLIC_DIR + '/', '');
  const parts = relativePath.split('/');
  const filename = parts[parts.length - 1];
  const category = parts.length > 1 ? parts[0] : '';
  
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  let description = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Add category prefix if exists
  if (category && category !== 'images') {
    description = `${category}-${description}`;
  }
  
  const ext = path.extname(filename).toLowerCase();
  return `Miami_Yachting_Company_${description}${ext}`;
}

// Optimize image if over 500KB
async function optimizeIfNeeded(inputPath, outputPath) {
  const stats = fs.statSync(inputPath);
  const inputSizeKB = stats.size / 1024;
  
  if (inputSizeKB <= MAX_FILE_SIZE_KB) {
    // Just copy if already optimized
    if (inputPath !== outputPath) {
      fs.copyFileSync(inputPath, outputPath);
    }
    console.log(`  ✓ Already optimized: ${inputSizeKB.toFixed(2)} KB`);
    return;
  }
  
  console.log(`  Optimizing: ${inputSizeKB.toFixed(2)} KB → target ${MAX_FILE_SIZE_KB} KB`);
  
  let quality = 90;
  let outputBuffer;
  
  while (quality >= 60) {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    outputBuffer = await image.jpeg({ quality, mozjpeg: true }).toBuffer();
    const sizeKB = outputBuffer.length / 1024;
    
    if (sizeKB <= MAX_FILE_SIZE_KB) {
      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`  ✓ Optimized: ${sizeKB.toFixed(2)} KB (quality: ${quality})`);
      return;
    }
    
    quality -= 5;
  }
  
  // Resize if still too large
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  let width = metadata.width;
  quality = 80;
  
  while (width > 800) {
    width = Math.floor(width * 0.8);
    outputBuffer = await image.resize(width).jpeg({ quality, mozjpeg: true }).toBuffer();
    const sizeKB = outputBuffer.length / 1024;
    
    if (sizeKB <= MAX_FILE_SIZE_KB) {
      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`  ✓ Optimized: ${sizeKB.toFixed(2)} KB (resized to ${width}px, quality: ${quality})`);
      return;
    }
    
    quality = Math.max(60, quality - 5);
  }
  
  fs.writeFileSync(outputPath, outputBuffer);
  console.log(`  ⚠ Best effort: ${(outputBuffer.length / 1024).toFixed(2)} KB`);
}

// Find all code references to old path
function findReferences(oldRelativePath) {
  try {
    const result = execSync(
      `grep -r "${oldRelativePath}" ${APP_DIR} --include="*.tsx" --include="*.ts" || true`,
      { encoding: 'utf-8' }
    );
    return result.trim().split('\n').filter(line => line.length > 0);
  } catch (e) {
    return [];
  }
}

// Update all references in code
function updateReferences(oldRelativePath, newFilename) {
  const newRelativePath = `/images/${newFilename}`;
  
  try {
    execSync(
      `find ${APP_DIR} -type f \\( -name "*.tsx" -o -name "*.ts" \\) -exec sed -i 's|${oldRelativePath}|${newRelativePath}|g' {} \\;`,
      { encoding: 'utf-8' }
    );
    console.log(`  ✓ Updated code references`);
  } catch (e) {
    console.error(`  ✗ Error updating references: ${e.message}`);
  }
}

async function main() {
  console.log('=== Rename & Optimize Existing Photos ===\n');
  
  // Find all old photos (not following naming convention)
  const allFiles = [];
  
  function scanDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(item.name) && !item.name.startsWith('Miami_Yachting_Company_')) {
        allFiles.push(fullPath);
      }
    }
  }
  
  scanDir(PUBLIC_DIR);
  
  console.log(`Found ${allFiles.length} photos to rename\n`);
  
  const processed = [];
  const skipped = [];
  
  for (const oldPath of allFiles) {
    const oldRelativePath = oldPath.replace(path.join(__dirname, '../public'), '');
    const newFilename = generateSEOName(oldPath);
    const newPath = path.join(PUBLIC_DIR, newFilename);
    
    console.log(`\nProcessing: ${path.basename(oldPath)}`);
    console.log(`  Old: ${oldRelativePath}`);
    console.log(`  New: /images/${newFilename}`);
    
    // Check if used in code
    const refs = findReferences(oldRelativePath);
    if (refs.length === 0) {
      console.log(`  ⚠ Not referenced in code - skipping`);
      skipped.push({ oldPath, reason: 'not referenced' });
      continue;
    }
    
    console.log(`  Found ${refs.length} reference(s) in code`);
    
    try {
      // Optimize and rename
      await optimizeIfNeeded(oldPath, newPath);
      
      // Update code references
      updateReferences(oldRelativePath, newFilename);
      
      processed.push({
        oldPath: oldRelativePath,
        newPath: `/images/${newFilename}`,
        refs: refs.length
      });
      
      console.log(`  ✓ Complete`);
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
      skipped.push({ oldPath, reason: error.message });
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`✓ Processed: ${processed.length}`);
  console.log(`⚠ Skipped: ${skipped.length}`);
  
  if (processed.length > 0) {
    console.log('\nProcessed files:');
    processed.forEach(p => {
      console.log(`  ${p.oldPath} → ${p.newPath} (${p.refs} refs)`);
    });
  }
  
  if (skipped.length > 0) {
    console.log('\nSkipped files:');
    skipped.forEach(s => {
      console.log(`  ${path.basename(s.oldPath)}: ${s.reason}`);
    });
  }
  
  console.log('\n✓ Renaming complete!');
  console.log('\nNext steps:');
  console.log('1. Delete old photos: find public/images -type f \\( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \\) ! -name "Miami_Yachting_Company_*" -delete');
  console.log('2. Test the website locally');
  console.log('3. Commit: git add -A && git commit -m "Rename all photos to SEO convention" && git push');
}

main().catch(console.error);
