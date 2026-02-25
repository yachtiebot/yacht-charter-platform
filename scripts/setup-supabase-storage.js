#!/usr/bin/env node

/**
 * Setup Supabase Storage for Yacht Photos
 * Creates bucket and uploads existing photos
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';
const BUCKET_NAME = 'yacht-photos';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupBucket() {
  console.log('=== Supabase Storage Setup ===\n');
  
  // Check if bucket exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('Error listing buckets:', listError);
    return false;
  }
  
  const bucketExists = buckets.find(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`Creating bucket: ${BUCKET_NAME}`);
    const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true, // Photos are public
      fileSizeLimit: 10485760, // 10MB limit
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    });
    
    if (error) {
      console.error('Error creating bucket:', error);
      return false;
    }
    
    console.log('✓ Bucket created successfully\n');
  } else {
    console.log(`✓ Bucket already exists: ${BUCKET_NAME}\n`);
  }
  
  return true;
}

async function uploadPhoto(filePath, storagePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const contentType = filePath.endsWith('.webp') ? 'image/webp' : 
                      filePath.endsWith('.png') ? 'image/png' : 
                      'image/jpeg';
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true // Replace if exists
    });
  
  if (error) {
    console.error(`  ✗ Error uploading ${storagePath}:`, error.message);
    return null;
  }
  
  // Get public URL
  const { data: publicUrl } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath);
  
  return publicUrl.publicUrl;
}

async function migrateExistingPhotos() {
  console.log('=== Migrating Existing Photos ===\n');
  
  const yachtsDir = path.join(__dirname, '../public/images/yachts');
  
  if (!fs.existsSync(yachtsDir)) {
    console.log('No yacht photos directory found');
    return;
  }
  
  const yachtFolders = fs.readdirSync(yachtsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`Found ${yachtFolders.length} yacht folders\n`);
  
  const results = [];
  
  for (const yachtFolder of yachtFolders) {
    console.log(`Processing: ${yachtFolder}`);
    const yachtPath = path.join(yachtsDir, yachtFolder);
    const photos = fs.readdirSync(yachtPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    console.log(`  Found ${photos.length} photos`);
    
    const photoUrls = [];
    
    for (const photo of photos) {
      const localPath = path.join(yachtPath, photo);
      const storagePath = `${yachtFolder}/${photo}`;
      
      const url = await uploadPhoto(localPath, storagePath);
      
      if (url) {
        photoUrls.push(url);
        console.log(`  ✓ Uploaded: ${photo}`);
      }
    }
    
    results.push({
      yachtId: yachtFolder,
      photoCount: photos.length,
      uploadedCount: photoUrls.length,
      urls: photoUrls
    });
    
    console.log(`  ✓ Complete: ${photoUrls.length}/${photos.length} uploaded\n`);
  }
  
  return results;
}

async function generateManifest(results) {
  console.log('=== Generating Photo Manifest ===\n');
  
  const manifest = {};
  
  for (const result of results) {
    manifest[result.yachtId] = {
      photoCount: result.uploadedCount,
      heroUrl: result.urls[0] || null, // First photo is hero
      galleryUrls: result.urls,
      updatedAt: new Date().toISOString()
    };
  }
  
  const manifestPath = path.join(__dirname, '../photo-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`✓ Manifest saved to: ${manifestPath}\n`);
  
  return manifest;
}

async function main() {
  try {
    // Step 1: Setup bucket
    const bucketReady = await setupBucket();
    if (!bucketReady) {
      throw new Error('Failed to setup bucket');
    }
    
    // Step 2: Migrate existing photos
    const results = await migrateExistingPhotos();
    
    if (!results || results.length === 0) {
      console.log('No photos to migrate');
      return;
    }
    
    // Step 3: Generate manifest
    const manifest = await generateManifest(results);
    
    // Summary
    console.log('=== Summary ===');
    console.log(`Total yachts: ${results.length}`);
    console.log(`Total photos uploaded: ${results.reduce((sum, r) => sum + r.uploadedCount, 0)}`);
    console.log(`\nManifest keys:`);
    Object.keys(manifest).forEach(key => {
      console.log(`  ${key}: ${manifest[key].photoCount} photos`);
    });
    
    console.log('\n✓ Supabase Storage setup complete!');
    console.log('\nNext steps:');
    console.log('1. Update Airtable records with Supabase URLs from photo-manifest.json');
    console.log('2. Update website to load photos from Supabase CDN');
    console.log('3. (Optional) Remove photos from /public/images/yachts/ to save space');
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();
