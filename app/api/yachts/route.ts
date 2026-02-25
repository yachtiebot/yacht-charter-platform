import { NextRequest, NextResponse } from 'next/server';

/**
 * Legacy /api/yachts endpoint
 * Transforms /api/public/vessels data to Airtable format for yacht-rental-miami page
 * 
 * TODO: Update yacht-rental-miami page to use /api/public/vessels directly
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch from the real vessels API
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/public/vessels`);
    
    if (!response.ok) {
      throw new Error(`Vessels API returned ${response.status}`);
    }
    
    const data = await response.json();
    const vessels = data.vessels || [];
    
    // Transform to Airtable-like format that yacht-rental-miami page expects
    const transformedYachts = vessels.map((vessel: any) => ({
      id: vessel.id,
      fields: {
        'Yacht ID': vessel.public_code || vessel.id,
        'Boat Name': `${vessel.make} ${vessel.model}`,
        'Boat Type': vessel.category || 'yacht',
        'Boat Style': vessel.category || '',
        'Length in Feet': vessel.length_ft || 0,
        'Maximum Passengers': vessel.capacity_guests || 0,
        'Main Departure Location': vessel.location_tag || 'Miami',
        'Short Description': vessel.public_description || '',
        '2-Hour Price': vessel.min_hours >= 2 ? 500 : 0, // Placeholder pricing
        '4-Hour Price': vessel.min_hours >= 4 ? 900 : 0, // Placeholder pricing
        'toys': vessel.toys || [],
        'amenities': vessel.amenities || [],
        'Instant Booking Enabled': true,
        'Photo Attachments': vessel.hero_image_url ? [{
          url: vessel.hero_image_url,
          width: 1200,
          height: 800
        }] : []
      }
    }));
    
    return NextResponse.json({ yachts: transformedYachts });
  } catch (error) {
    console.error('Error in /api/yachts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch yachts', yachts: [] },
      { status: 500 }
    );
  }
}
