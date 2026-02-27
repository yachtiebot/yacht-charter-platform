import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { tmpdir } from 'os';
import crypto from 'crypto';

/**
 * Dropbox Webhook: Process Catering Images
 * 
 * Triggered when files added to Dropbox catering-images folder
 * 1. Downloads image from Dropbox
 * 2. Optimizes with Sharp (WebP, 1200px max, quality 85)
 * 3. Uploads to Supabase storage
 * 4. Updates Airtable record with Supabase URL
 * 5. DELETES original file from Dropbox
 * 6. Cleans up temp files
 */

const DROPBOX_APP_SECRET = process.env.DROPBOX_APP_SECRET;
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Dropbox webhook verification (GET request)
export async function GET(request: NextRequest) {
  const challenge = request.nextUrl.searchParams.get('challenge');
  
  if (challenge) {
    // Dropbox verification - echo back the challenge
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain', 'X-Content-Type-Options': 'nosniff' }
    });
  }
  
  return NextResponse.json({ status: 'Dropbox webhook endpoint active' });
}

// Dropbox webhook notification (POST request)
export async function POST(request: NextRequest) {
  try {
    // Verify Dropbox signature
    const signature = request.headers.get('x-dropbox-signature');
    const body = await request.text();
    
    if (DROPBOX_APP_SECRET && signature) {
      const hmac = crypto.createHmac('sha256', DROPBOX_APP_SECRET);
      hmac.update(body);
      const expectedSignature = hmac.digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('❌ Invalid Dropbox signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    console.log('📥 Dropbox webhook received');
    
    // Dropbox sends notification, we need to fetch the actual changes
    const changesResponse = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: '/Catering Photos',
        recursive: false,
        include_deleted: false
      })
    });

    if (!changesResponse.ok) {
      // If folder doesn't exist yet, that's ok
      console.log('⚠️ Catering images folder not found or no changes');
      return NextResponse.json({ message: 'No changes to process' });
    }

    const changes = await changesResponse.json();
    console.log(`📂 Found ${changes.entries?.length || 0} files`);

    // Process each image file
    const results = [];
    for (const entry of changes.entries || []) {
      if (entry['.tag'] === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
        console.log(`🖼️ Processing: ${entry.name}`);
        
        try {
          const result = await processImage(entry.path_display, entry.name);
          results.push(result);
        } catch (error: any) {
          console.error(`❌ Failed to process ${entry.name}:`, error.message);
          results.push({ file: entry.name, error: error.message });
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results
    });

  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', message: error.message },
      { status: 500 }
    );
  }
}

async function processImage(dropboxPath: string, filename: string): Promise<any> {
  const tempDir = path.join(tmpdir(), 'dropbox-catering-processing');
  await fs.mkdir(tempDir, { recursive: true });
  
  const tempInputPath = path.join(tempDir, `input-${Date.now()}-${filename}`);
  const tempOutputPath = path.join(tempDir, `output-${Date.now()}.webp`);

  try {
    // Extract product ID from filename (e.g., "gourmet-wraps.jpg" -> "gourmet-wraps")
    const productId = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    console.log(`📦 Product ID: ${productId}`);

    // Step 1: Download from Dropbox
    console.log('⬇️ Downloading from Dropbox...');
    const downloadResponse = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({ path: dropboxPath })
      }
    });

    if (!downloadResponse.ok) {
      throw new Error(`Dropbox download failed: ${downloadResponse.status}`);
    }

    const imageBuffer = Buffer.from(await downloadResponse.arrayBuffer());
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
    
    const { error: uploadError } = await supabase.storage
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

    // Step 4: Update Airtable with Supabase URL
    console.log('📝 Updating Airtable...');
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Catering?filterByFormula={Product ID}="${productId}"`,
      {
        headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
      }
    );

    if (airtableResponse.ok) {
      const airtableData = await airtableResponse.json();
      
      if (airtableData.records && airtableData.records.length > 0) {
        const recordId = airtableData.records[0].id;
        
        const updateResponse = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Catering/${recordId}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fields: { 'Image URL': supabaseUrl }
            })
          }
        );

        if (updateResponse.ok) {
          console.log('✅ Airtable updated');
        } else {
          console.warn('⚠️ Airtable update failed:', await updateResponse.text());
        }
      } else {
        console.warn(`⚠️ No Airtable record found for Product ID: ${productId}`);
      }
    }

    // Step 5: Delete from Dropbox
    console.log('🗑️ Deleting from Dropbox...');
    const deleteResponse = await fetch('https://api.dropboxapi.com/2/files/delete_v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: dropboxPath })
    });

    if (deleteResponse.ok) {
      console.log('✅ Deleted from Dropbox');
    } else {
      console.warn('⚠️ Dropbox delete failed:', await deleteResponse.text());
    }

    // Step 6: Cleanup temp files
    await fs.unlink(tempInputPath).catch(() => {});
    await fs.unlink(tempOutputPath).catch(() => {});
    console.log('✅ Temp files cleaned');

    return {
      productId,
      filename,
      supabaseUrl,
      originalSize: imageBuffer.length,
      optimizedSize: optimizedBuffer.length,
      savings: `${(((imageBuffer.length - optimizedBuffer.length) / imageBuffer.length) * 100).toFixed(1)}%`,
      deletedFromDropbox: true
    };

  } finally {
    // Ensure cleanup
    await fs.unlink(tempInputPath).catch(() => {});
    await fs.unlink(tempOutputPath).catch(() => {});
  }
}
