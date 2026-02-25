const { createClient } = require('@supabase/supabase-js');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  'https://wojjcivzlxsbinbmblhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc'
);

const TEMP_DIR = path.join(__dirname, '..', 'temp');
const YACHT_ID = '27-Regal';

async function convertAndUpload(inputNum) {
  return new Promise((resolve, reject) => {
    const inputFile = path.join(TEMP_DIR, `temp_${inputNum}.png`);
    const outputFile = path.join(TEMP_DIR, `regal_${inputNum}.webp`);
    const paddedNum = String(inputNum).padStart(2, '0');
    const filename = `Miami_Yachting_Company_${YACHT_ID}_${paddedNum}.webp`;

    if (!fs.existsSync(inputFile)) {
      console.log(`  ⚠️  Skipping ${inputNum} - file not found`);
      resolve();
      return;
    }

    // Convert with ImageMagick
    const cmd = `convert "${inputFile}" -quality 80 -define webp:method=6 "${outputFile}"`;
    
    exec(cmd, async (error) => {
      if (error) {
        console.error(`  ✗ Convert failed ${inputNum}:`, error.message);
        resolve();
        return;
      }

      try {
        // Check file size and adjust quality if needed
        let stats = fs.statSync(outputFile);
        let quality = 80;
        
        while (stats.size > 500 * 1024 && quality > 60) {
          quality -= 5;
          const adjustCmd = `convert "${inputFile}" -quality ${quality} -define webp:method=6 "${outputFile}"`;
          await new Promise(res => exec(adjustCmd, () => res()));
          stats = fs.statSync(outputFile);
        }

        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`  Converted ${inputNum}: ${sizeKB}KB (q:${quality})`);

        // Upload to Supabase
        const fileBuffer = fs.readFileSync(outputFile);
        const { error: uploadError } = await supabase.storage
          .from('yacht-photos')
          .upload(`${YACHT_ID}/${filename}`, fileBuffer, {
            contentType: 'image/webp',
            upsert: true
          });

        if (uploadError) {
          console.error(`  ✗ Upload failed ${inputNum}:`, uploadError.message);
        } else {
          const url = `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/${YACHT_ID}/${filename}`;
          console.log(`  ✓ ${inputNum}/15 uploaded`);
        }

        // Cleanup
        fs.unlinkSync(outputFile);
        
        resolve();
      } catch (err) {
        console.error(`  ✗ Error processing ${inputNum}:`, err.message);
        resolve();
      }
    });
  });
}

async function main() {
  console.log('=== Processing 27-Regal Photos ===\n');

  // Process all 15 photos
  for (let i = 1; i <= 15; i++) {
    console.log(`[${i}/15]`);
    await convertAndUpload(i);
  }

  // Create hero image from first photo
  console.log('\n[Hero Image]');
  const heroCmd = `convert "${path.join(TEMP_DIR, 'temp_1.png')}" -quality 75 -define webp:method=6 "${path.join(TEMP_DIR, 'hero.webp')}"`;
  
  exec(heroCmd, async (error) => {
    if (error) {
      console.error('  ✗ Hero conversion failed');
      return;
    }

    const heroBuffer = fs.readFileSync(path.join(TEMP_DIR, 'hero.webp'));
    const { error: uploadError } = await supabase.storage
      .from('yacht-photos')
      .upload(`${YACHT_ID}/Miami_Yachting_Company_${YACHT_ID}_hero.webp`, heroBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) {
      console.error('  ✗ Hero upload failed:', uploadError.message);
    } else {
      console.log('  ✓ Hero uploaded');
    }

    fs.unlinkSync(path.join(TEMP_DIR, 'hero.webp'));
    console.log('\n✓ Complete!');
  });
}

main().catch(console.error);
