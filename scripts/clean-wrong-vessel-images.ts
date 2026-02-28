#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanWrongImages() {
  console.log('🗑️  Cleaning up incorrectly uploaded Monterey images...\n');
  
  // List all files in vessel-images/vessels/
  const { data: files, error } = await supabase.storage
    .from('vessel-images')
    .list('vessels', {
      limit: 100
    });
  
  if (error) {
    console.error('❌ Error listing files:', error);
    return;
  }
  
  console.log(`Found ${files?.length || 0} files in vessel-images/vessels/\n`);
  
  // Delete Monterey images
  const montereyFiles = files?.filter(f => f.name.includes('monterey')) || [];
  
  for (const file of montereyFiles) {
    console.log(`  🗑️  Deleting: ${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from('vessel-images')
      .remove([`vessels/${file.name}`]);
    
    if (deleteError) {
      console.error(`    ❌ Error:`, deleteError.message);
    } else {
      console.log(`    ✅ Deleted`);
    }
  }
  
  console.log(`\n✅ Cleaned up ${montereyFiles.length} incorrect images`);
}

cleanWrongImages();
