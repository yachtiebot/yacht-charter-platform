#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixDroneImage() {
  console.log('🔧 Fixing drone image filename...\n');
  
  // Download the new image (_0 version)
  const { data: downloadData, error: downloadError } = await supabase.storage
    .from('yacht-photos')
    .download('hero-images/Miami_Yachting_Company_premium_drone_videos_0.webp');
  
  if (downloadError) {
    console.error('❌ Error downloading new image:', downloadError);
    return;
  }
  
  console.log('✅ Downloaded new image');
  
  // Re-upload with correct filename (without _0)
  const arrayBuffer = await downloadData.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const { error: uploadError } = await supabase.storage
    .from('yacht-photos')
    .upload('hero-images/Miami_Yachting_Company_premium_drone_videos.webp', buffer, {
      contentType: 'image/webp',
      upsert: true
    });
  
  if (uploadError) {
    console.error('❌ Error uploading:', uploadError);
    return;
  }
  
  console.log('✅ Uploaded with correct filename');
  
  // Delete the _0 version
  const { error: deleteError } = await supabase.storage
    .from('yacht-photos')
    .remove(['hero-images/Miami_Yachting_Company_premium_drone_videos_0.webp']);
  
  if (deleteError) {
    console.error('❌ Error deleting old file:', deleteError);
    return;
  }
  
  console.log('✅ Deleted old _0 version');
  console.log('\n🎉 Done! Image is now at correct path.');
}

fixDroneImage();
