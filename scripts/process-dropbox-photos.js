#!/usr/bin/env node

/**
 * Dropbox Photo Processing Script
 * 
 * Downloads photos from Dropbox, optimizes with Sharp, renames according to SEO rules.
 * 
 * Usage: node scripts/process-dropbox-photos.js <dropbox-folder-path>
 * Example: node scripts/process-dropbox-photos.js "/web content photos"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DROPBOX_REFRESH_TOKEN = 'YyrJI2fZ8s0AAAAAAAAAAYjQXGmNy4deO2XMka5B2nuA1JzS-f6ThExuz1FpHj08';
const DROPBOX_CLIENT_ID = 'kjl4jhjq9taugf3';
const DROPBOX_CLIENT_SECRET = 'lzvh7q4q3tpk2vt';
const MAX_FILE_SIZE_KB = 500;
const OUTPUT_DIR = path.join(__dirname, '../public/images');
const TEMP_DIR = path.join(__dirname, '../temp');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

/**
 * Get fresh Dropbox access token using refresh token
 */
async function getAccessToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: DROPBOX_REFRESH_TOKEN,
      client_id: DROPBOX_CLIENT_ID,
      client_secret: DROPBOX_CLIENT_SECRET
    }).toString();

    const options = {
      hostname: 'api.dropboxapi.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const json = JSON.parse(data);
          resolve(json.access_token);
        } else {
          reject(new Error(`Token refresh failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * List files in Dropbox folder
 */
async function listDropboxFiles(accessToken, folderPath) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ path: folderPath });

    const options = {
      hostname: 'api.dropboxapi.com',
      path: '/2/files/list_folder',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const json = JSON.parse(data);
          resolve(json.entries.filter(e => e['.tag'] === 'file'));
        } else {
          reject(new Error(`List files failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Download file from Dropbox
 */
async function downloadDropboxFile(accessToken, dropboxPath, localPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'content.dropboxapi.com',
      path: '/2/files/download',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({ path: dropboxPath })
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(localPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(localPath);
        });
        fileStream.on('error', reject);
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => reject(new Error(`Download failed: ${res.statusCode} ${data}`)));
      }
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Generate SEO-friendly filename from original name
 */
function generateSEOFilename(originalName) {
  const nameWithoutExt = path.basename(originalName, path.extname(originalName));
  
  let description = nameWithoutExt
    .replace(/^Miami[_\s-]Yachting[_\s-]Company[_\s-]*/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  if (!description) {
    description = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  const ext = path.extname(originalName).toLowerCase();
  return `Miami_Yachting_Company_${description}${ext}`;
}

/**
 * Optimize image with Sharp
 */
async function optimizeImage(inputPath, outputPath, maxSizeKB = MAX_FILE_SIZE_KB) {
  const stats = fs.statSync(inputPath);
  const inputSizeKB = stats.size / 1024;
  
  console.log(`  Input size: ${inputSizeKB.toFixed(2)} KB`);
  
  let quality = 90;
  let outputBuffer;
  
  while (quality >= 60) {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    if (metadata.format === 'png') {
      outputBuffer = await image.jpeg({ quality, mozjpeg: true }).toBuffer();
    } else {
      outputBuffer = await image.jpeg({ quality, mozjpeg: true }).toBuffer();
    }
    
    const sizeKB = outputBuffer.length / 1024;
    
    if (sizeKB <= maxSizeKB) {
      if (metadata.format === 'png' && path.extname(outputPath) === '.png') {
        outputPath = outputPath.replace('.png', '.jpg');
      }
      
      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`  Output size: ${sizeKB.toFixed(2)} KB (quality: ${quality})`);
      console.log(`  ✓ Optimized and saved: ${path.basename(outputPath)}`);
      return outputPath;
    }
    
    quality -= 5;
  }
  
  console.log(`  Warning: Couldn't achieve ${maxSizeKB}KB at quality 60. Resizing...`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  let width = metadata.width;
  quality = 80;
  
  while (width > 800) {
    width = Math.floor(width * 0.8);
    
    outputBuffer = await image.resize(width).jpeg({ quality, mozjpeg: true }).toBuffer();
    
    const sizeKB = outputBuffer.length / 1024;
    
    if (sizeKB <= maxSizeKB) {
      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`  Output size: ${sizeKB.toFixed(2)} KB (width: ${width}px, quality: ${quality})`);
      console.log(`  ✓ Optimized and saved: ${path.basename(outputPath)}`);
      return outputPath;
    }
    
    quality = Math.max(60, quality - 5);
  }
  
  fs.writeFileSync(outputPath, outputBuffer);
  const sizeKB = outputBuffer.length / 1024;
  console.log(`  Final output size: ${sizeKB.toFixed(2)} KB`);
  console.log(`  ⚠ Warning: Could not achieve ${maxSizeKB}KB target`);
  return outputPath;
}

/**
 * Process a single photo
 */
async function processPhoto(accessToken, file) {
  console.log(`\nProcessing: ${file.name}`);
  
  const tempPath = path.join(TEMP_DIR, file.name);
  const seoFilename = generateSEOFilename(file.name);
  const outputPath = path.join(OUTPUT_DIR, seoFilename);
  
  try {
    console.log(`  Downloading from Dropbox...`);
    await downloadDropboxFile(accessToken, file.path_lower, tempPath);
    
    console.log(`  Optimizing with Sharp...`);
    await optimizeImage(tempPath, outputPath);
    
    fs.unlinkSync(tempPath);
    
    console.log(`  ✓ Complete: ${seoFilename}`);
    
    return {
      success: true,
      originalName: file.name,
      optimizedName: seoFilename,
      outputPath
    };
  } catch (error) {
    console.error(`  ✗ Error processing ${file.name}:`, error.message);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return {
      success: false,
      originalName: file.name,
      error: error.message
    };
  }
}

/**
 * Main function
 */
async function main() {
  const folderPath = process.argv[2];
  
  if (!folderPath) {
    console.error('Usage: node process-dropbox-photos.js <dropbox-folder-path>');
    console.error('Example: node process-dropbox-photos.js "/web content photos"');
    process.exit(1);
  }
  
  console.log('=== Dropbox Photo Processing ===\n');
  console.log(`Folder: ${folderPath}`);
  console.log(`Max file size: ${MAX_FILE_SIZE_KB} KB`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);
  
  try {
    console.log('Getting Dropbox access token...');
    const accessToken = await getAccessToken();
    console.log('✓ Access token obtained\n');
    
    console.log('Listing files in Dropbox folder...');
    const files = await listDropboxFiles(accessToken, folderPath);
    console.log(`✓ Found ${files.length} file(s)\n`);
    
    if (files.length === 0) {
      console.log('No files to process.');
      return;
    }
    
    const results = [];
    for (const file of files) {
      const result = await processPhoto(accessToken, file);
      results.push(result);
    }
    
    console.log('\n=== Summary ===');
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✓ Successful: ${successful.length}`);
    console.log(`✗ Failed: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log('\nProcessed files:');
      successful.forEach(r => {
        console.log(`  ${r.originalName} → ${r.optimizedName}`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\nFailed files:');
      failed.forEach(r => {
        console.log(`  ${r.originalName}: ${r.error}`);
      });
    }
    
    const tempFiles = fs.readdirSync(TEMP_DIR);
    tempFiles.forEach(file => {
      fs.unlinkSync(path.join(TEMP_DIR, file));
    });
    
    console.log('\n✓ Processing complete!');
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();
