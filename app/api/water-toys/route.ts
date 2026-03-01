import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

// No cache - instant updates like catering
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Water%20Toys`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        },
        cache: 'no-store' // No cache - always fetch fresh
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
    const waterToys = activeRecords.map((record: any) => {
      const fields = record.fields;
      
      // Build features array from Feature 1-6 fields
      const features = [];
      for (let i = 1; i <= 6; i++) {
        if (fields[`Feature ${i}`]) {
          features.push(fields[`Feature ${i}`]);
        }
      }
      
      // Build sizes object from Option fields
      const sizes: any = {};
      for (let i = 1; i <= 5; i++) {
        const optionName = fields[`Option ${i} Name`];
        const optionPrice = fields[`Option ${i} Price`];
        
        if (optionName && optionPrice) {
          const key = `option-${i}`;
          sizes[key] = {
            option: optionName,
            price: optionPrice
          };
        }
      }
      
      // Parse image URLs (comma-separated)
      let images = ['/images/products/water-toys/placeholder.jpg'];
      if (fields['Image URL']) {
        const urls = fields['Image URL'].split(',').map((url: string) => url.trim());
        if (urls.length > 0 && urls[0]) {
          images = urls;
        }
      }
      
      return {
        id: fields['Product ID'],
        name: fields['Name'],
        price: fields['Price'] || null,
        depositPrice: fields['Deposit Price'] || null,
        pricePerChair: fields['Price Per Chair'] || null,
        description: fields['Description'] || '',
        details: fields['Details'] || '',
        images,
        maxQuantity: fields['Max Quantity'] || null,
        minQuantity: fields['Min Quantity'] || null,
        features,
        requiresWaiver: fields['Requires Waiver'] || false,
        licenseLink: fields['License Link'] || null,
        vendorEmail: fields['Vendor Email'] || null,
        sizes: Object.keys(sizes).length > 0 ? sizes : null
      };
    });

    return NextResponse.json(waterToys, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Water toys API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch water toys', message: error.message },
      { status: 500 }
    );
  }
}
