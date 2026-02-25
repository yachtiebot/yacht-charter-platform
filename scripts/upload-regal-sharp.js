const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  'https://wojjcivzlxsbinbmblhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc'
);

const TEMP_DIR = path.join(__dirname, '..', 'temp');
const YACHT_ID = '27-Regal';
const MAX_SIZE_KB = 500;

async function processAndUpload(inputNum) {
  const inputFile = path.join(TEMP_DIR, `temp_${inputNum}.png`);
  const paddedNum = String(inputNum).padStart(2, '0');
  const filename = `Miami_Yachting_Company_${YACHT_ID}_${paddedNum}.webp`;

  if (!fs.existsSync(inputFile)) {
    console.log(`  ⚠️  Skipping ${inputNum} - not found`);
    return;
  }

  try {
    // Start with quality 85
    let quality = 85;
    let buffer = await sharp(inputFile)
      .webp({ quality, effort: 6 })
      .toBuffer();

    // Reduce quality if too large
    while (buffer.length > MAX_SIZE_KB * 1024 && quality > 60) {
      quality -= 5;
      buffer = await sharp(inputFile)
        .webp({ quality, effort: 6 })
        .toBuffer();
    }

    const sizeKB = (buffer.length / 1024).toFixed(2);
    console.log(`  ${inputNum}: ${sizeKB}KB (q:${quality})`);

    // Upload
    const { error } = await supabase.storage
      .from('yacht-photos')
      .upload(`${YACHT_ID}/${filename}`, buffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      console.error(`  ✗ Upload failed:`, error.message);
    } else {
      console.log(`  ✓ Uploaded ${inputNum}/15`);
    }
  } catch (err) {
    console.error(`  ✗ Error ${inputNum}:`, err.message);
  }
}

async function main() {
  console.log('=== Processing 27-Regal Photos ===\n');

  // Process all photos
  for (let i = 1; i <= 15; i++) {
    console.log(`[${i}/15]`);
    await processAndUpload(i);
  }

  // Hero image
  console.log('\n[Hero]');
  const heroInput = path.join(TEMP_DIR, 'temp_1.png');
  if (fs.existsSync(heroInput)) {
    let quality = 75;
    let heroBuffer = await sharp(heroInput)
      .webp({ quality, effort: 6 })
      .toBuffer();

    while (heroBuffer.length > 200 * 1024 && quality > 60) {
      quality -= 5;
      heroBuffer = await sharp(heroInput)
        .webp({ quality, effort: 6 })
        .toBuffer();
    }

    const { error } = await supabase.storage
      .from('yacht-photos')
      .upload(`${YACHT_ID}/Miami_Yachting_Company_${YACHT_ID}_hero.webp`, heroBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      console.error('  ✗ Hero upload failed:', error.message);
    } else {
      const sizeKB = (heroBuffer.length / 1024).toFixed(2);
      console.log(`  ✓ Hero uploaded (${sizeKB}KB, q:${quality})`);
    }
  }

  console.log('\n✓ Complete!');
  console.log('\nPhotos available at:');
  console.log('https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/27-Regal/');
}

main().catch(console.error);
