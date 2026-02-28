#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteAll() {
  console.log('🗑️  Deleting all 27-Monterey images from Supabase...\n');
  
  // List all files
  const { data: files, error: listError } = await supabase.storage
    .from('yacht-photos')
    .list('27-Monterey');
  
  if (listError || !files) {
    console.error('Error listing files:', listError);
    return;
  }
  
  console.log(`Found ${files.length} files to delete\n`);
  
  // Delete all files
  const filePaths = files.map(f => `27-Monterey/${f.name}`);
  
  const { error: deleteError } = await supabase.storage
    .from('yacht-photos')
    .remove(filePaths);
  
  if (deleteError) {
    console.error('Error deleting files:', deleteError);
    return;
  }
  
  console.log(`✅ Deleted ${files.length} files`);
  console.log('\nNow run the scraper again to get the correct images!');
}

deleteAll();
