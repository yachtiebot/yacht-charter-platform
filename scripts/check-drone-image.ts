#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDroneImage() {
  console.log('📸 Checking drone services image...\n');
  
  const { data, error } = await supabase.storage
    .from('yacht-photos')
    .list('hero-images', {
      limit: 100
    });
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  const droneFiles = data?.filter(f => f.name.toLowerCase().includes('drone')) || [];
  
  console.log('Drone-related files found:');
  droneFiles.forEach(file => {
    console.log(`  • ${file.name}`);
    console.log(`    Size: ${((file.metadata as any).size / 1024).toFixed(2)} KB`);
    console.log(`    Updated: ${file.updated_at || file.created_at}`);
    console.log(`    URL: https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/hero-images/${file.name}`);
    console.log('');
  });
  
  if (droneFiles.length === 0) {
    console.log('  ⚠️  No drone images found!');
  }
}

checkDroneImage();
