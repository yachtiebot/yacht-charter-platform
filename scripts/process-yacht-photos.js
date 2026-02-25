#!/usr/bin/env node

/**
 * STANDARD YACHT PHOTO PROCESSING SCRIPT
 * 
 * Downloads photos from Dropbox, optimizes with Sharp, uploads to Supabase
 * 
 * Features:
 * - Auto-naming: Miami_Yachting_Company_[yacht-id]_[number]
 * - Optimization: 500KB max for website (Supabase)
 * - Extra compression: 200KB for Airtable hero image
 * - Cleanup: Deletes temp files automatically
 * 
 * Usage: node scripts/process-yacht-photos.js "/dropbox-folder" "yacht-id"
 * Example: node scripts/process-yacht-photos.js "/37 Axopar Photos" "37-axopar"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const DROPBOX_REFRESH_TOKEN = 'YyrJI2fZ8s0AAAAAAAAAAYjQXGmNy4deO2XMka5B2nuA1JzS-f6ThExuz1FpHj08';
const DROPBOX_CLIENT_ID = 'kjl4jhjq9taugf3';
const DROPBOX_CLIENT_SECRET = 'lzvh7q4q3tpk2vt';
const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';
const BUCKET_NAME = 'yacht-photos';
const MAX_SIZE_WEBSITE_KB = 500;
const MAX_SIZE_AIRTABLE_KB = 200;
const TEMP_DIR = path.join(__dirname, '../temp');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Ensure temp dir exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Get Dropbox access token
async function getDropboxToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: DROPBOX_REFRESH_TOKEN,
      client_id: DROPBOX_CLIENT_ID,
      client_secret: DROPBOX_CLIENT_SECRET
    }).toString();

    const req = https.request({
      hostname: 'api.dropboxapi.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).access_token);
        } else {
          reject(new Error(`Token refresh failed: ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// List files in Dropbox folder
async function listDropboxFiles(token, folderPath) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.dropboxapi.com',
      path: '/2/files/list_folder',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const json = JSON.parse(data);
          resolve(json.entries.filter(e => e['.tag'] === 'file'));
        } else {
          reject(new Error(`List failed: ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({ path: folderPath }));
    req.end();
  });
}

// Download file from Dropbox
async function downloadFile(token, dropboxPath, localPath) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'content.dropboxapi.com',
      path: '/2/files/download',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Dropbox-API-Arg': JSON.stringify({ path: dropboxPath })
      }
    }, (res) => {
      if (res.statusCode === 200) {
        const stream = fs.createWriteStream(localPath);
        res.pipe(stream);
        stream.on('finish', () => {
          stream.close();
          resolve();
        });
        stream.on('error', reject);
      } else {
        reject(new Error(`Download failed: ${res.statusCode}`));
      }
    });
    req.on('error', reject);
    req.end();
  });
}

// Optimize image with Sharp
async function optimizeImage(inputPath, maxSizeKB) {
  const stats = fs.statSync(inputPath);
  const inputSizeKB = stats.size / 1024;
  
  let quality = 90;
  let outputBuffer;
  
  // Try quality reduction first
  while (quality >= 60) {
    outputBuffer = await sharp(inputPath)
      .webp({ quality, effort: 6 })
      .toBuffer();
    
    if (outputBuffer.length / 1024 <= maxSizeKB) {
      return { buffer: outputBuffer, sizeKB: outputBuffer.length / 1024, quality, resized: false };
    }
    quality -= 5;
  }
  
  // Resize if still too large
  const metadata = await sharp(inputPath).metadata();
  let width = metadata.width;
  quality = 80;
  
  while (width > 800) {
    width = Math.floor(width * 0.8);
    outputBuffer = await sharp(inputPath)
      .resize(width)
      .webp({ quality, effort: 6 })
      .toBuffer();
    
    if (outputBuffer.length / 1024 <= maxSizeKB) {
      return { buffer: outputBuffer, sizeKB: outputBuffer.length / 1024, quality, width, resized: true };
    }
    quality = Math.max(60, quality - 5);
  }
  
  return { buffer: outputBuffer, sizeKB: outputBuffer.length / 1024, quality, width, resized: true };
}

// Upload to Supabase Storage
async function uploadToSupabase(buffer, storagePath) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, buffer, {
      contentType: 'image/webp',
      upsert: true
    });
  
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath);
  
  return urlData.publicUrl;
}

async function main() {
  const folderPath = process.argv[2];
  const yachtId = process.argv[3];
  
  if (!folderPath || !yachtId) {
    console.error('Usage: node process-yacht-photos.js "/dropbox-folder" "yacht-id"');
    console.error('Example: node process-yacht-photos.js "/37 Axopar Photos" "37-axopar"');
    process.exit(1);
  }
  
  console.log('=== YACHT PHOTO PROCESSING ===\n');
  console.log(`Yacht ID: ${yachtId}`);
  console.log(`Dropbox folder: ${folderPath}`);
  console.log(`Website size: ${MAX_SIZE_WEBSITE_KB}KB max`);
  console.log(`Airtable hero: ${MAX_SIZE_AIRTABLE_KB}KB max\n`);
  
  try {
    // Get Dropbox token
    console.log('Getting Dropbox access token...');
    const token = await getDropboxToken();
    console.log('✓ Token obtained\n');
    
    // List files
    console.log('Listing files...');
    const files = await listDropboxFiles(token, folderPath);
    console.log(`✓ Found ${files.length} files\n`);
    
    const results = [];
    let photoNumber = 1;
    
    for (const file of files) {
      console.log(`\n[${photoNumber}/${files.length}] ${file.name}`);
      
      const tempPath = path.join(TEMP_DIR, file.name);
      const paddedNum = String(photoNumber).padStart(2, '0');
      const websiteFilename = `Miami_Yachting_Company_${yachtId}_${paddedNum}.webp`;
      
      // Download
      console.log('  Downloading...');
      await downloadFile(token, file.path_lower, tempPath);
      
      // Optimize for website (500KB)
      console.log('  Optimizing for website (500KB max)...');
      const websiteOpt = await optimizeImage(tempPath, MAX_SIZE_WEBSITE_KB);
      console.log(`  → ${websiteOpt.sizeKB.toFixed(2)}KB (q:${websiteOpt.quality}${websiteOpt.resized ? ', resized' : ''})`);
      
      // Upload to Supabase
      console.log('  Uploading to Supabase...');
      const websiteUrl = await uploadToSupabase(websiteOpt.buffer, `${yachtId}/${websiteFilename}`);
      console.log(`  ✓ ${websiteUrl}`);
      
      // Hero image: extra compression for Airtable (200KB)
      let airtableUrl = null;
      if (photoNumber === 1) {
        console.log('  Creating Airtable hero (200KB max)...');
        const airtableOpt = await optimizeImage(tempPath, MAX_SIZE_AIRTABLE_KB);
        console.log(`  → ${airtableOpt.sizeKB.toFixed(2)}KB (q:${airtableOpt.quality})`);
        const airtableFilename = `Miami_Yachting_Company_${yachtId}_hero.webp`;
        airtableUrl = await uploadToSupabase(airtableOpt.buffer, `${yachtId}/${airtableFilename}`);
        console.log(`  ✓ ${airtableUrl}`);
      }
      
      // Clean up
      fs.unlinkSync(tempPath);
      
      results.push({
        original: file.name,
        filename: websiteFilename,
        url: websiteUrl,
        sizeKB: websiteOpt.sizeKB,
        isHero: photoNumber === 1,
        airtableUrl
      });
      
      photoNumber++;
    }
    
    // Summary
    console.log('\n=== SUMMARY ===');
    console.log(`Yacht: ${yachtId}`);
    console.log(`Photos processed: ${results.length}`);
    console.log(`Total size: ${results.reduce((sum, r) => sum + r.sizeKB, 0).toFixed(2)}KB`);
    console.log(`\nHero URL (for Airtable):`);
    console.log(results[0].airtableUrl);
    console.log(`\nGallery URLs (all ${results.length} photos):`);
    results.forEach((r, i) => console.log(`  ${i + 1}. ${r.url}`));
    
    console.log('\n✓ Complete!');
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();
