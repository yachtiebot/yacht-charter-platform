import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { tmpdir } from 'os';

/**
 * Admin Image Upload API
 * 
 * Handles drag-and-drop image uploads from admin interface
 * 1. Receives image file + product ID + category
 * 2. Optimizes with Sharp (WebP, 1200px max, quality 85)
 * 3. Uploads to Supabase storage
 * 4. Updates Airtable record with Supabase URL
 * 5. Cleans up temp files
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Map categories to Airtable table names
const CATEGORY_TABLES: { [key: string]: string } = {
  'catering': 'Catering',
  'water-toys': 'Water Toys',
  'flowers': 'Flowers',
  'bachelorette': 'Bachelorette Packages'
};

export async function POST(request: NextRequest) {
  const tempDir = path.join(tmpdir(), 'admin-image-upload');
  await fs.mkdir(tempDir, { recursive: true });
  
  let tempInputPath = '';
  let tempOutputPath = '';

  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;
    const category = formData.get('category') as string;

    if (!file || !productId || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`🖼️ Processing upload: ${productId} (${category})`);

    // Create temp file paths
    tempInputPath = path.join(tempDir, `upload-${Date.now()}-${file.name}`);
    tempOutputPath = path.join(tempDir, `optimized-${Date.now()}.webp`);

    // Step 1: Save uploaded file to temp location
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(tempInputPath, buffer);
    console.log(`✅ Uploaded: ${(buffer.length / 1024).toFixed(1)} KB`);

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

    // Step 3: Upload to Supabase with SEO-friendly naming
    console.log('☁️ Uploading to Supabase...');
    // SEO naming: Miami_Yachting_Company_[description]
    const seoFileName = `Miami_Yachting_Company_${productId.replace(/-/g, '_')}.webp`;
    const supabasePath = `${category}/${seoFileName}`;
    
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

    // Step 4: Update Airtable with Supabase URL (skip for hero-images and banners - they don't have Airtable records)
    const tableName = CATEGORY_TABLES[category];
    if (tableName && category !== 'hero-images' && category !== 'banners') {
      console.log(`📝 Updating Airtable ${tableName}...`);
      
      // Find record by Product ID
      const searchResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?filterByFormula={Product ID}="${productId}"`,
        {
          headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
        }
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        
        if (searchData.records && searchData.records.length > 0) {
          const recordId = searchData.records[0].id;
          
          const updateResponse = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}/${recordId}`,
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
    }

    // Cleanup
    await fs.unlink(tempInputPath).catch(() => {});
    await fs.unlink(tempOutputPath).catch(() => {});

    return NextResponse.json({
      success: true,
      productId,
      category,
      supabaseUrl,
      originalSize: buffer.length,
      optimizedSize: optimizedBuffer.length,
      savings: `${(((buffer.length - optimizedBuffer.length) / buffer.length) * 100).toFixed(1)}%`
    });

  } catch (error: any) {
    console.error('❌ Image processing error:', error);
    
    // Cleanup on error
    if (tempInputPath) await fs.unlink(tempInputPath).catch(() => {});
    if (tempOutputPath) await fs.unlink(tempOutputPath).catch(() => {});

    return NextResponse.json(
      { error: 'Image processing failed', message: error.message },
      { status: 500 }
    );
  }
}
