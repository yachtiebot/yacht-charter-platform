import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/yachts endpoint
 * Fetches yacht data directly from Airtable "Yacht Brain"
 * Airtable is the source of truth - Supabase is only for file storage
 */
export async function GET(request: NextRequest) {
  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;
    
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
      throw new Error('Airtable credentials not configured');
    }
    
    // Fetch all vessels from Airtable
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
    const response = await fetch(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Airtable API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter to only show yachts with "Show on Website?" = true
    const activeYachts = data.records.filter((record: any) => 
      record.fields['Show on Website?'] === true
    );
    
    return NextResponse.json({ yachts: activeYachts });
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch yachts', yachts: [] },
      { status: 500 }
    );
  }
}
