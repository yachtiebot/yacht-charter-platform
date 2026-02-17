import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This endpoint syncs vessels from Airtable to Supabase
// Call it via: GET /api/cron/sync-vessels
// Or set up Vercel cron to run it hourly

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Airtable not configured' },
        { status: 500 }
      );
    }

    // Fetch from Airtable
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Vessels?view=Active`;
    const airtableResponse = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const airtableData = await airtableResponse.json();

    // Initialize Supabase admin client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let syncedCount = 0;
    let errorCount = 0;

    for (const record of airtableData.records) {
      const fields = record.fields;

      const vesselData = {
        public_code:
          fields['Public Code'] ||
          `${fields['Make']}-${fields['Length']}-${fields['Location']}`
            .toLowerCase()
            .replace(/\s+/g, '-'),
        make: fields['Make'],
        model: fields['Model'] || null,
        length_ft: fields['Length (ft)'],
        category: fields['Category'],
        location_tag: fields['Location'],
        capacity_guests: fields['Max Guests'] || null,
        min_hours: fields['Min Hours'] || 4,
        max_hours: fields['Max Hours'] || 8,
        allowed_durations: fields['Duration Options'] || [4, 6, 8],
        toys: fields['Toys'] || [],
        amenities: fields['Amenities'] || [],
        hero_image_url: fields['Photos']?.[0]?.url || null,
        gallery_image_urls: fields['Photos']?.slice(1).map((p: any) => p.url) || [],
        public_description: fields['Description'] || null,
        is_active: fields['Status'] === 'Active',
      };

      const { error } = await supabase
        .from('public_vessels')
        .upsert(vesselData, { onConflict: 'public_code' });

      if (error) {
        console.error('Error syncing vessel:', vesselData.make, error);
        errorCount++;
      } else {
        syncedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      synced: syncedCount,
      errors: errorCount,
      total: airtableData.records.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Sync failed:', error);
    return NextResponse.json(
      { error: 'Sync failed', message: error.message },
      { status: 500 }
    );
  }
}
