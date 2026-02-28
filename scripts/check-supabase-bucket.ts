#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🪣 Checking Supabase storage buckets...\n');
  
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('❌ Error listing buckets:', error);
    return;
  }
  
  console.log('Available buckets:');
  buckets.forEach(bucket => {
    console.log(`  • ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
  });
  
  // Check if vessel-images exists
  const vesselBucket = buckets.find(b => b.name === 'vessel-images');
  
  if (!vesselBucket) {
    console.log('\n⚠️  "vessel-images" bucket not found. Creating it...');
    
    const { data, error: createError } = await supabase.storage.createBucket('vessel-images', {
      public: true,
      fileSizeLimit: 524288 // 500KB
    });
    
    if (createError) {
      console.error('❌ Error creating bucket:', createError);
    } else {
      console.log('✅ Created "vessel-images" bucket!');
    }
  } else {
    console.log('\n✅ "vessel-images" bucket exists!');
  }
}

main();
