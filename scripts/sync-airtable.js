// Airtable to Supabase Sync Script
// Run via: node scripts/sync-airtable.js
// Or via Vercel cron: /api/cron/sync-vessels

const https = require('https');

// Airtable Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Vessels';

// Supabase Configuration  
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function fetchFromAirtable() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?view=Active`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function syncToSupabase(vessels) {
  const supabase = require('@supabase/supabase-js').createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
  );

  for (const record of vessels.records) {
    const fields = record.fields;
    
    // Transform Airtable data to our schema
    const vesselData = {
      public_code: fields['Public Code'] || `${fields['Make']}-${fields['Length']}-${fields['Location']}`.toLowerCase().replace(/\s+/g, '-'),
      make: fields['Make'],
      model: fields['Model'],
      length_ft: fields['Length (ft)'],
      category: fields['Category'],
      location_tag: fields['Location'],
      capacity_guests: fields['Max Guests'],
      min_hours: fields['Min Hours'],
      max_hours: fields['Max Hours'],
      allowed_durations: fields['Duration Options'],
      toys: fields['Toys'] || [],
      amenities: fields['Amenities'] || [],
      hero_image_url: fields['Photos']?.[0]?.url || null,
      gallery_image_urls: fields['Photos']?.slice(1).map(p => p.url) || [],
      public_description: fields['Description'],
      is_active: fields['Status'] === 'Active'
    };

    // Upsert vessel
    const { error } = await supabase
      .from('public_vessels')
      .upsert(vesselData, { onConflict: 'public_code' });

    if (error) {
      console.error('Error syncing vessel:', vesselData.make, error);
    } else {
      console.log('✓ Synced:', vesselData.make);
    }
  }
}

async function main() {
  try {
    console.log('Fetching vessels from Airtable...');
    const data = await fetchFromAirtable();
    
    console.log(`Found ${data.records.length} vessels`);
    
    console.log('Syncing to Supabase...');
    await syncToSupabase(data);
    
    console.log('✓ Sync complete!');
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
