#!/usr/bin/env npx tsx
/**
 * Vessel Scraper - Extract vessel data from Squarespace and populate Airtable
 * 
 * Usage: npx tsx scripts/scrape-vessel.ts <squarespace-url>
 * Example: npx tsx scripts/scrape-vessel.ts https://www.miamiyachtingcompany.com/monterey-black
 */

import * as cheerio from 'cheerio';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { writeFileSync, unlinkSync, existsSync, mkdirSync, statSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Airtable config
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface VesselData {
  name: string;
  description: string;
  length?: number;
  brand?: string;
  model?: string;
  passengerCapacity: number;
  location: string;
  staterooms: number;
  bathrooms: number;
  stereo?: string;
  waterToys?: string[];
  review?: {
    text: string;
    author: string;
    source: string;
  };
  pricing: {
    hours: number;
    price: number;
  }[];
  imageUrls: string[];
}

async function fetchVesselPage(url: string): Promise<string> {
  console.log(`📡 Fetching ${url}...`);
  const response = await axios.get(url);
  return response.data;
}

function parseVesselData(html: string, url: string): VesselData {
  const $ = cheerio.load(html);
  const text = $.text();
  
  // Extract vessel name from title
  const title = $('title').text();
  const nameMatch = title.match(/^(.+?)\s+—/);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown Vessel';
  
  // Extract brand and model from name
  // Example: "27 ft Monterey Boat" -> brand: "Monterey", model: "Boat"
  const brandModelMatch = name.match(/\d+\s*ft\s+(\w+)\s+(.+?)(?:\s+Charter|\s+Rental|$)/i);
  const brand = brandModelMatch ? brandModelMatch[1] : undefined;
  const model = brandModelMatch ? brandModelMatch[2].trim() : undefined;
  
  // Extract length from name/title
  const lengthMatch = name.match(/(\d+)\s*ft/i);
  const length = lengthMatch ? parseInt(lengthMatch[1]) : undefined;
  
  // Extract description
  const descMatch = text.match(/Climb aboard.*?(?=Location:|Passenger|$)/s);
  const description = descMatch ? descMatch[0].trim() : '';
  
  // Extract passenger capacity
  const passengerMatch = text.match(/Passenger Capacity:\s*(\d+)/i);
  const passengerCapacity = passengerMatch ? parseInt(passengerMatch[1]) : 0;
  
  // Extract location
  const locationMatch = text.match(/Location:\s*([^\n]+)/i);
  const location = locationMatch ? locationMatch[1].trim() : 'Miami Beach';
  
  // Extract staterooms
  const stateroomsMatch = text.match(/Staterooms:\s*(\d+)/i);
  const staterooms = stateroomsMatch ? parseInt(stateroomsMatch[1]) : 0;
  
  // Extract bathrooms
  const bathroomsMatch = text.match(/Bathrooms:\s*(\d+)/i);
  const bathrooms = bathroomsMatch ? parseInt(bathroomsMatch[1]) : 0;
  
  // Extract stereo info
  const stereoMatch = text.match(/Stereo:\s*([^\n]+)/i);
  const stereo = stereoMatch ? stereoMatch[1].trim() : undefined;
  
  // Extract water toys
  const toysMatch = text.match(/Optional Toys.*?:\s*([^\n]+)/i);
  const waterToys = toysMatch ? toysMatch[1].split(',').map(t => t.trim()) : undefined;
  
  // Extract review
  let review: VesselData['review'];
  const reviewMatch = text.match(/"([^"]+)"\s*—\s*([^"]+)"([^"]+)"/);
  if (reviewMatch) {
    review = {
      text: reviewMatch[1].trim(),
      author: reviewMatch[2].trim(),
      source: reviewMatch[3].trim()
    };
  }
  
  // Extract pricing
  const pricing: VesselData['pricing'] = [];
  const pricingMatches = text.matchAll(/(\d+)\s*HOURS?\s*\$(\d+)/gi);
  for (const match of pricingMatches) {
    pricing.push({
      hours: parseInt(match[1]),
      price: parseInt(match[2])
    });
  }
  
  // Extract images from Squarespace CDN
  const imageUrls: string[] = [];
  const imageMatches = html.matchAll(/https:\/\/images\.squarespace-cdn\.com\/[^"'\s)]+\.(jpg|jpeg|png)/gi);
  const seenImages = new Set<string>();
  
  for (const match of imageMatches) {
    let url = match[0];
    // Remove query parameters for deduplication
    const baseUrl = url.split('?')[0];
    
    // Skip favicons and logos
    if (baseUrl.includes('favicon') || baseUrl.includes('logo') || baseUrl.includes('MYC_LOGO')) {
      continue;
    }
    
    // Skip duplicates
    if (seenImages.has(baseUrl)) {
      continue;
    }
    
    seenImages.add(baseUrl);
    imageUrls.push(url);
  }
  
  return {
    name,
    description,
    length,
    brand,
    model,
    passengerCapacity,
    location,
    staterooms,
    bathrooms,
    stereo,
    waterToys,
    review,
    pricing,
    imageUrls: Array.from(imageUrls)
  };
}

async function downloadAndOptimizeImage(url: string, index: number, vesselName: string): Promise<{ localPath: string; supabasePath: string }> {
  console.log(`  📥 Downloading image ${index + 1}...`);
  
  // Download image
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);
  
  // Create temp directory
  const tempDir = join(process.cwd(), 'temp');
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }
  
  // Generate filename following CLS_RULES: Miami_Yachting_Company_[description].ext
  const vesselSlug = vesselName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  const imageType = index === 0 ? 'hero' : `gallery-${index}`;
  const filename = `Miami_Yachting_Company_${vesselSlug}-${imageType}.jpg`;
  const localPath = join(tempDir, filename);
  
  // Optimize with Sharp (max 500KB as per CLS_RULES)
  console.log(`  🔧 Optimizing to ${filename}...`);
  await sharp(buffer)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(localPath);
  
  // Check file size and reduce quality if needed
  let stats = statSync(localPath);
  let quality = 85;
  
  while (stats.size > 500 * 1024 && quality > 50) {
    quality -= 5;
    console.log(`  ⚠️  File too large (${(stats.size / 1024).toFixed(0)}KB), reducing quality to ${quality}...`);
    await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, progressive: true })
      .toFile(localPath);
    stats = statSync(localPath);
  }
  
  console.log(`  ✅ Optimized to ${(stats.size / 1024).toFixed(0)}KB`);
  
  return {
    localPath,
    supabasePath: `vessels/${filename}`
  };
}

async function uploadToSupabase(localPath: string, supabasePath: string): Promise<string> {
  console.log(`  ☁️  Uploading to Supabase: ${supabasePath}...`);
  
  const fileBuffer = require('fs').readFileSync(localPath);
  
  const { data, error } = await supabase.storage
    .from('vessel-images')
    .upload(supabasePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('vessel-images')
    .getPublicUrl(supabasePath);
  
  console.log(`  ✅ Uploaded!`);
  
  // Delete local file to save space (as per CLS_RULES)
  unlinkSync(localPath);
  console.log(`  🗑️  Deleted local file`);
  
  return publicUrl;
}

async function createAirtableRecord(vesselData: VesselData, imageUrls: string[]): Promise<void> {
  console.log(`\n📝 Creating Airtable record...`);
  
  // Map pricing to Airtable fields
  const pricingFields: any = {};
  vesselData.pricing.forEach(p => {
    pricingFields[`${p.hours}-Hour Price`] = p.price;
  });
  
  // Prepare the record matching actual Airtable field names
  const record = {
    fields: {
      'Yacht ID': vesselData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      'Boat Name': vesselData.name,
      'Brand': vesselData.brand || 'Unknown',
      'Model': vesselData.model || 'Unknown',
      'Length in Feet': vesselData.length,
      'Maximum Passengers': vesselData.passengerCapacity,
      'Main Departure Location': vesselData.location,
      'Full Description': vesselData.description,
      'Features: Number of Staterooms': vesselData.staterooms,
      'Features: Number of Bathrooms': vesselData.bathrooms,
      'Hero Image URL': imageUrls[0] || '',
      'Sound System Type': vesselData.stereo,
      'Show on Website?': true,
      'Boat Type': 'Day Boat',
      ...pricingFields
    }
  };
  
  // Add notes field with review and gallery images
  const notes = [];
  if (vesselData.review) {
    notes.push(`Review: "${vesselData.review.text}" - ${vesselData.review.author} (${vesselData.review.source})`);
  }
  if (imageUrls.length > 1) {
    notes.push(`Gallery Images: ${imageUrls.slice(1).join(', ')}`);
  }
  if (notes.length > 0) {
    record.fields['Notes'] = notes.join('\n\n');
  }
  
  // Create record in Airtable
  const response = await axios.post(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Yachts`,
    { records: [record] },
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log(`✅ Created Airtable record: ${response.data.records[0].id}`);
  console.log(`   Yacht ID: ${record.fields['Yacht ID']}`);
}

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.error('❌ Please provide a Squarespace URL');
    console.error('Usage: npx tsx scripts/scrape-vessel.ts <url>');
    process.exit(1);
  }
  
  console.log('🚢 Miami Yachting Company - Vessel Scraper\n');
  console.log('═'.repeat(60));
  
  try {
    // Step 1: Fetch and parse vessel data
    const html = await fetchVesselPage(url);
    const vesselData = parseVesselData(html, url);
    
    console.log(`\n✅ Scraped vessel data:`);
    console.log(`   Name: ${vesselData.name}`);
    console.log(`   Brand: ${vesselData.brand || 'Unknown'}`);
    console.log(`   Model: ${vesselData.model || 'Unknown'}`);
    console.log(`   Length: ${vesselData.length}ft`);
    console.log(`   Capacity: ${vesselData.passengerCapacity} passengers`);
    console.log(`   Location: ${vesselData.location}`);
    console.log(`   Images found: ${vesselData.imageUrls.length}`);
    console.log(`   Pricing tiers: ${vesselData.pricing.length}`);
    
    // Step 2: Process images
    console.log(`\n📸 Processing ${vesselData.imageUrls.length} images...`);
    const uploadedImageUrls: string[] = [];
    
    for (let i = 0; i < vesselData.imageUrls.length; i++) {
      const imageUrl = vesselData.imageUrls[i];
      
      try {
        // Download and optimize
        const { localPath, supabasePath } = await downloadAndOptimizeImage(
          imageUrl,
          i,
          vesselData.name
        );
        
        // Upload to Supabase
        const publicUrl = await uploadToSupabase(localPath, supabasePath);
        uploadedImageUrls.push(publicUrl);
        
      } catch (error: any) {
        console.error(`  ❌ Failed to process image ${i + 1}:`, error.message);
      }
    }
    
    console.log(`\n✅ Processed ${uploadedImageUrls.length}/${vesselData.imageUrls.length} images`);
    
    // Step 3: Create Airtable record
    await createAirtableRecord(vesselData, uploadedImageUrls);
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ COMPLETE! Vessel successfully scraped and added to Airtable\n');
    
    // Show summary
    console.log('📋 Summary:');
    console.log(`   • Vessel: ${vesselData.name}`);
    console.log(`   • Images uploaded: ${uploadedImageUrls.length}`);
    console.log(`   • Pricing tiers: ${vesselData.pricing.map(p => `${p.hours}hrs=$${p.price}`).join(', ')}`);
    if (vesselData.review) {
      console.log(`   • Review: "${vesselData.review.text.substring(0, 50)}..."`);
    }
    console.log(`\n🌐 View in Airtable: https://airtable.com/${AIRTABLE_BASE_ID}/tblbnJKFeq5g57X9x\n`);
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

main();
