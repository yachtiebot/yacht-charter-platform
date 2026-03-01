import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

// No cache - instant updates
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Bachelorette%20Packages`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Airtable');
    }

    const data = await response.json();
    
    // Filter to active products only (Status = "Active")
    const activeRecords = data.records.filter((record: any) => 
      record.fields['Status']?.toLowerCase() === 'active'
    );
    
    // Transform Airtable records to website format
    const packages = activeRecords.map((record: any) => {
      const fields = record.fields;
      
      // Build includes array from Feature 1-10 fields
      const includes = [];
      for (let i = 1; i <= 10; i++) {
        if (fields[`Feature ${i}`]) {
          includes.push(fields[`Feature ${i}`]);
        }
      }
      
      // Parse image URLs (comma-separated)
      let images = ['/images/products/bachelorette/placeholder.jpg'];
      if (fields['Image URL']) {
        const urls = fields['Image URL'].split(',').map((url: string) => url.trim());
        if (urls.length > 0 && urls[0]) {
          images = urls;
        }
      }
      
      return {
        id: fields['Product ID'],
        name: fields['Name'],
        subtitle: fields['Subtitle'] || '',
        price: fields['Price'] || null,
        description: fields['Description'] || '',
        includes,
        images,
        featured: fields['Featured'] || false
      };
    });

    return NextResponse.json(packages, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Bachelorette packages API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bachelorette packages', message: error.message },
      { status: 500 }
    );
  }
}
