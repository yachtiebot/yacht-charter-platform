#!/usr/bin/env npx tsx
/**
 * CORRECT Vessel Scraper - Following VESSEL_PHOTO_ARCHITECTURE.md
 * 
 * Usage: npx tsx scripts/scrape-vessel-correct.ts <squarespace-url>
 * Example: npx tsx scripts/scrape-vessel-correct.ts https://www.miamiyachtingcompany.com/monterey-black
 */

import * as cheerio from 'cheerio';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { unlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface VesselData {
  yachtId: string;          // 27-Monterey
  boatName: string;         // 27 ft Monterey Black
  brand: string;            // Monterey
  model: string;            // Black
  length: number;           // 27
  passengerCapacity: number;
  location: string;
  staterooms: number;
  bathrooms: number;
  stereo: string;           // Bluetooth/Aux ONLY
  description: string;
  pricing: { hours: number; price: number }[];
  imageUrls: string[];
}

async function fetchPage(url: string): Promise<string> {
  console.log(`📡 Fetching ${url}...`);
  const response = await axios.get(url);
  return response.data;
}

function parseVesselData(html: string): VesselData {
  const $ = cheerio.load(html);
  const text = $.text();
  
  // Extract title
  const title = $('title').text();
  const titleMatch = title.match(/^(.+?)\s+—/);
  const fullName = titleMatch ? titleMatch[1].trim() : 'Unknown Vessel';
  
  // Parse: "27 ft Monterey Boat Charter in Miami Beach"
  // Extract: length, brand, model/color
  const lengthMatch = fullName.match(/(\d+)\s*ft/i);
  const length = lengthMatch ? parseInt(lengthMatch[1]) : 0;
  
  // Extract brand and model
  // Pattern: "27 ft {Brand} {Model/Color} [rest]"
  const afterLength = fullName.replace(/^\d+\s*ft\s*/i, '');
  const parts = afterLength.split(/\s+/);
  const brand = parts[0] || 'Unknown';
  
  // Model is the second word if it's not "Boat", "Charter", "Rental"
  const skipWords = ['boat', 'charter', 'rental', 'in', 'miami', 'beach'];
  const model = parts[1] && !skipWords.includes(parts[1].toLowerCase()) 
    ? parts[1] 
    : '';
  
  // Generate IDs
  const yachtId = `${length}-${brand}`;
  const boatName = model 
    ? `${length} ft ${brand} ${model}`
    : `${length} ft ${brand}`;
  
  // Extract description (clean it)
  const descMatch = text.match(/Climb aboard[\s\S]*?(?=Location:|Passenger|$)/);
  let description = descMatch ? descMatch[0].trim() : '';
  // Clean: capitalize "South Florida", remove extra spaces
  description = description
    .replace(/south florida/gi, 'South Florida')
    .replace(/miami beach/gi, 'Miami Beach')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Extract passenger capacity
  const passengerMatch = text.match(/Passenger Capacity:\s*(\d+)/i);
  const passengerCapacity = passengerMatch ? parseInt(passengerMatch[1]) : 0;
  
  // Extract location (only capture until next field or newline)
  const locationMatch = text.match(/Location:\s*([^A-Z\n]+?)(?=\s*(?:Passenger|Stereo|Staterooms|Bathrooms|$))/i);
  let location = locationMatch ? locationMatch[1].trim() : 'Miami Beach';
  // Clean up
  location = location
    .replace(/\s+/g, ' ')
    .replace(/miami beach/gi, 'Miami Beach')
    .replace(/miami/gi, 'Miami')
    .trim();
  
  // Extract staterooms
  const stateroomsMatch = text.match(/Staterooms:\s*(\d+)/i);
  const staterooms = stateroomsMatch ? parseInt(stateroomsMatch[1]) : 0;
  
  // Extract bathrooms
  const bathroomsMatch = text.match(/Bathrooms:\s*(\d+)/i);
  const bathrooms = bathroomsMatch ? parseInt(bathroomsMatch[1]) : 0;
  
  // Extract stereo - ONLY accept "Bluetooth/Aux" format
  const stereoMatch = text.match(/Stereo:\s*([^\n]+)/i);
  let stereo = 'Bluetooth/Aux'; // Default
  if (stereoMatch) {
    const raw = stereoMatch[1].trim();
    // Clean to standard format
    if (raw.toLowerCase().includes('bluetooth') || raw.toLowerCase().includes('aux')) {
      stereo = 'Bluetooth/Aux';
    }
  }
  
  // Extract pricing
  const pricing: { hours: number; price: number }[] = [];
  const pricingMatches = text.matchAll(/(\d+)\s*HOURS?\s*\$(\d+)/gi);
  for (const match of pricingMatches) {
    pricing.push({
      hours: parseInt(match[1]),
      price: parseInt(match[2])
    });
  }
  
  // Extract images (only vessel gallery photos, skip banners/backgrounds)
  const imageUrls: string[] = [];
  const imageMatches = html.matchAll(/https:\/\/images\.squarespace-cdn\.com\/[^"'\s)]+\.(jpg|jpeg|png)/gi);
  const seenBaseFilenames = new Set<string>();
  
  for (const match of imageMatches) {
    const fullUrl = match[0];
    const baseUrl = fullUrl.split('?')[0];
    
    // Skip unwanted images
    if (baseUrl.includes('favicon') || 
        baseUrl.includes('logo') || 
        baseUrl.includes('MYC_LOGO') ||
        baseUrl.includes('unsplash-image') ||  // Skip Unsplash banner/background images
        baseUrl.includes('stock-photo')) {
      continue;
    }
    
    // Extract the actual filename (PRINT-47.jpg, etc.)
    // Format: .../1616100514054-V7BOWGJMUKS3FE1HTYJZ/PRINT-47.jpg
    const filenameMatch = baseUrl.match(/\/([A-Z]+-\d+)\.(jpg|jpeg|png)$/i);
    if (!filenameMatch) continue;  // Skip if not a gallery image
    
    const baseFilename = filenameMatch[1];  // e.g., "PRINT-47"
    
    // De-duplicate by base filename
    if (seenBaseFilenames.has(baseFilename)) continue;
    seenBaseFilenames.add(baseFilename);
    
    imageUrls.push(fullUrl);
  }
  
  return {
    yachtId,
    boatName,
    brand,
    model,
    length,
    passengerCapacity,
    location,
    staterooms,
    bathrooms,
    stereo,
    description,
    pricing,
    imageUrls
  };
}

async function downloadAndOptimizeImage(
  url: string,
  index: number,
  yachtId: string
): Promise<{ localPath: string; supabasePath: string }> {
  console.log(`  📥 Downloading image ${index + 1}...`);
  
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);
  
  const tempDir = join(process.cwd(), 'temp');
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }
  
  // Naming: Miami_Yachting_Company_{Yacht-ID}_{hero|01|02...}.webp
  const imageType = index === 0 ? 'hero' : String(index).padStart(2, '0');
  const filename = `Miami_Yachting_Company_${yachtId}_${imageType}.webp`;
  const localPath = join(tempDir, filename);
  
  // Optimize with Sharp (max 500KB, WebP)
  console.log(`  🔧 Optimizing to ${filename}...`);
  let quality = 85;
  
  while (quality >= 50) {
    await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toFile(localPath);
    
    const stats = require('fs').statSync(localPath);
    const sizeKB = stats.size / 1024;
    
    if (sizeKB <= 500) {
      console.log(`  ✅ Optimized to ${sizeKB.toFixed(0)}KB (quality: ${quality})`);
      break;
    }
    
    quality -= 5;
  }
  
  return {
    localPath,
    supabasePath: `${yachtId}/${filename}`
  };
}

async function uploadToSupabase(localPath: string, supabasePath: string): Promise<string> {
  console.log(`  ☁️  Uploading to yacht-photos/${supabasePath}...`);
  
  const fileBuffer = require('fs').readFileSync(localPath);
  
  const { error } = await supabase.storage
    .from('yacht-photos')
    .upload(supabasePath, fileBuffer, {
      contentType: 'image/webp',
      upsert: true
    });
  
  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('yacht-photos')
    .getPublicUrl(supabasePath);
  
  console.log(`  ✅ Uploaded!`);
  
  // Delete local file (save space per CLS_RULES)
  unlinkSync(localPath);
  console.log(`  🗑️  Deleted local file`);
  
  return publicUrl;
}

async function createAirtableRecord(vessel: VesselData): Promise<void> {
  console.log(`\n📝 Creating Airtable record...`);
  
  // Map pricing to fields
  const pricingFields: any = {};
  vessel.pricing.forEach(p => {
    pricingFields[`${p.hours}-Hour Price`] = p.price;
  });
  
  const record = {
    fields: {
      'Yacht ID': vessel.yachtId,
      'Boat Name': vessel.boatName,
      'Brand': vessel.brand,
      'Model': vessel.model || 'Unknown',
      'Length in Feet': vessel.length,
      'Maximum Passengers': vessel.passengerCapacity,
      'Main Departure Location': vessel.location,
      'Full Description': vessel.description,
      'Features: Number of Staterooms': vessel.staterooms,
      'Features: Number of Bathrooms': vessel.bathrooms,
      'Sound System Type': vessel.stereo,
      'Show on Website?': true,
      'Boat Type': 'Day Boat',
      ...pricingFields
    }
  };
  
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
}

async function updateYachtCacheFile(yachtId: string, photoCount: number): Promise<void> {
  console.log(`\n📝 Updating yacht-cache.ts...`);
  
  const cachePath = join(process.cwd(), 'lib', 'yacht-cache.ts');
  let content = require('fs').readFileSync(cachePath, 'utf-8');
  
  // Find photoMapping object
  const mappingMatch = content.match(/(const photoMapping[^=]*=\s*\{[^}]+\})/);
  if (!mappingMatch) {
    console.error('❌ Could not find photoMapping in yacht-cache.ts');
    return;
  }
  
  const oldMapping = mappingMatch[0];
  
  // Add new entry
  const newEntry = `  '${yachtId}': ${photoCount}`;
  const updatedMapping = oldMapping.replace(/(\};)/, `,\n${newEntry}\n  };`);
  
  content = content.replace(oldMapping, updatedMapping);
  require('fs').writeFileSync(cachePath, content);
  
  console.log(`✅ Added '${yachtId}': ${photoCount} to photoMapping`);
}

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.error('❌ Usage: npx tsx scripts/scrape-vessel-correct.ts <url>');
    process.exit(1);
  }
  
  console.log('🚢 Miami Yachting Company - Vessel Scraper\n');
  console.log('═'.repeat(60));
  
  try {
    // Step 1: Parse vessel data
    const html = await fetchPage(url);
    const vessel = parseVesselData(html);
    
    console.log(`\n✅ Scraped vessel data:`);
    console.log(`   Yacht ID: ${vessel.yachtId}`);
    console.log(`   Boat Name: ${vessel.boatName}`);
    console.log(`   Brand: ${vessel.brand}`);
    console.log(`   Model: ${vessel.model || '(none)'}`);
    console.log(`   Length: ${vessel.length}ft`);
    console.log(`   Capacity: ${vessel.passengerCapacity} passengers`);
    console.log(`   Images found: ${vessel.imageUrls.length}`);
    
    // Step 2: Process images
    console.log(`\n📸 Processing ${vessel.imageUrls.length} images...`);
    
    for (let i = 0; i < vessel.imageUrls.length; i++) {
      try {
        const { localPath, supabasePath } = await downloadAndOptimizeImage(
          vessel.imageUrls[i],
          i,
          vessel.yachtId
        );
        
        await uploadToSupabase(localPath, supabasePath);
      } catch (error: any) {
        console.error(`  ❌ Failed image ${i + 1}:`, error.message);
      }
    }
    
    console.log(`\n✅ Uploaded ${vessel.imageUrls.length} images to yacht-photos/${vessel.yachtId}/`);
    
    // Step 3: Create Airtable record
    await createAirtableRecord(vessel);
    
    // Step 4: Update yacht-cache.ts (gallery count = total - 1 for hero)
    const galleryCount = vessel.imageUrls.length - 1;
    await updateYachtCacheFile(vessel.yachtId, galleryCount);
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ COMPLETE! Next steps:\n');
    console.log('1. Commit yacht-cache.ts changes:');
    console.log(`   git add lib/yacht-cache.ts`);
    console.log(`   git commit -m "Add ${vessel.yachtId} to yacht photo mapping (${galleryCount} gallery images)"`);
    console.log('   git push origin main');
    console.log('');
    console.log('2. View in Airtable: https://airtable.com/' + AIRTABLE_BASE_ID);
    console.log('');
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
