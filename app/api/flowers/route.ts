import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

// No cache - instant updates
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Flowers`,
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
    const flowers = activeRecords.map((record: any) => {
      const fields = record.fields;
      
      // Build sizes object from Option fields
      const sizes: any = {};
      for (let i = 1; i <= 5; i++) {
        const optionName = fields[`Option ${i} Name`];
        const optionPrice = fields[`Option ${i} Price`];
        const optionSize = fields[`Option ${i} Size`];
        
        if (optionName && optionPrice) {
          // Map to lowercase size name (small, medium, large, etc.)
          const key = optionName.toLowerCase();
          sizes[key] = {
            option: optionSize || optionName,
            price: optionPrice
          };
        }
      }
      
      // Parse image URLs (comma-separated)
      let images = ['/images/products/flowers/placeholder.jpg'];
      if (fields['Image URL']) {
        const urls = fields['Image URL'].split(',').map((url: string) => url.trim());
        if (urls.length > 0 && urls[0]) {
          images = urls;
        }
      }
      
      return {
        id: fields['Product ID'],
        name: fields['Name'],
        description: fields['Description'] || '',
        details: fields['Details'] || '',
        images,
        sizes: Object.keys(sizes).length > 0 ? sizes : null
      };
    });

    return NextResponse.json(flowers, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Flowers API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flowers', message: error.message },
      { status: 500 }
    );
  }
}
