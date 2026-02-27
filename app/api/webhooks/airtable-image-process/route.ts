import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { tmpdir } from 'os';

/**
 * Airtable Webhook: Process Hero Images
 * 
 * Triggered when a catering item has a new Hero Image attachment
 * 1. Downloads image from Airtable
 * 2. Optimizes with Sharp (WebP, 1200px max, quality 85)
 * 3. Uploads to Supabase storage
 * 4. Updates Airtable record with Supabase URL
 * 5. Deletes Airtable attachment
 * 6. Cleans up temp files
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_WEBHOOK_SECRET = process.env.AIRTABLE_WEBHOOK_SECRET;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    if (AIRTABLE_WEBHOOK_SECRET && authHeader !== `Bearer ${AIRTABLE_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('📥 Webhook received:', JSON.stringify(body, null, 2));

    // Extract record data from webhook payload
    const { recordId, baseId, tableId } = body;
    
    if (!recordId) {
      return NextResponse.json({ error: 'No record ID provided' }, { status: 400 });
    }

    // Fetch the full record from Airtable
    const recordResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Catering/${recordId}`,
      {
        headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
      }
    );

    if (!recordResponse.ok) {
      throw new Error(`Failed to fetch record: ${recordResponse.status}`);
    }

    const record = await recordResponse.json();
    const heroImage = record.fields['Hero Image'];

    // Check if there's a Hero Image attachment
    if (!heroImage || !Array.isArray(heroImage) || heroImage.length === 0) {
      console.log('⚠️ No hero image found, skipping');
      return NextResponse.json({ message: 'No hero image to process' });
    }

    const attachment = heroImage[0]; // Get first attachment
    const imageUrl = attachment.url;
    const productId = record.fields['Product ID'] || recordId;

    console.log(`🖼️ Processing image for product: ${productId}`);
    console.log(`📎 Original URL: ${imageUrl}`);

    // Create temp directory for processing
    const tempDir = path.join(tmpdir(), 'airtable-image-processing');
    await fs.mkdir(tempDir, { recursive: true });
    
    const tempInputPath = path.join(tempDir, `${productId}-original-${Date.now()}`);
    const tempOutputPath = path.join(tempDir, `${productId}-optimized-${Date.now()}.webp`);

    try {
      // Step 1: Download image from Airtable
      console.log('⬇️ Downloading image...');
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      await fs.writeFile(tempInputPath, imageBuffer);
      console.log(`✅ Downloaded: ${(imageBuffer.length / 1024).toFixed(1)} KB`);

      // Step 2: Optimize with Sharp
      console.log('🔧 Optimizing image...');
      await sharp(tempInputPath)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(tempOutputPath);

      const optimizedBuffer = await fs.readFile(tempOutputPath);
      console.log(`✅ Optimized: ${(optimizedBuffer.length / 1024).toFixed(1)} KB`);

      // Step 3: Upload to Supabase
      console.log('☁️ Uploading to Supabase...');
      const supabasePath = `catering/${productId}.webp`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('yacht-photos')
        .upload(supabasePath, optimizedBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

      if (uploadError) {
        throw new Error(`Supabase upload failed: ${uploadError.message}`);
      }

      const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/yacht-photos/${supabasePath}`;
      console.log(`✅ Uploaded: ${supabaseUrl}`);

      // Step 4: Update Airtable record - set Image URL and clear Hero Image attachment
      console.log('📝 Updating Airtable record...');
      const updateResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Catering/${recordId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              'Image URL': supabaseUrl,
              'Hero Image': [] // Clear the attachment field
            }
          })
        }
      );

      if (!updateResponse.ok) {
        console.error('⚠️ Failed to update Airtable:', await updateResponse.text());
      } else {
        console.log('✅ Airtable updated, attachment deleted');
      }

      // Step 5: Cleanup temp files
      console.log('🧹 Cleaning up temp files...');
      await fs.unlink(tempInputPath).catch(() => {});
      await fs.unlink(tempOutputPath).catch(() => {});
      console.log('✅ Cleanup complete');

      return NextResponse.json({
        success: true,
        productId,
        supabaseUrl,
        originalSize: imageBuffer.length,
        optimizedSize: optimizedBuffer.length,
        savings: `${(((imageBuffer.length - optimizedBuffer.length) / imageBuffer.length) * 100).toFixed(1)}%`
      });

    } finally {
      // Ensure cleanup even if something fails
      await fs.unlink(tempInputPath).catch(() => {});
      await fs.unlink(tempOutputPath).catch(() => {});
    }

  } catch (error: any) {
    console.error('❌ Image processing error:', error);
    return NextResponse.json(
      { error: 'Image processing failed', message: error.message },
      { status: 500 }
    );
  }
}
