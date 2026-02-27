import { NextResponse } from 'next/server';

const waterToysData = [
  {
    id: 'seabob',
    name: 'Seabob',
    price: 499,
    depositPrice: 99,
    description: 'Ride on the surface or emerge under water with these luxury underwater jet skis. Easy to ride for young and old. Recommended age is 12+.',
    details: 'Comes fully charged, batteries last 1-2 hours. Charger included. Yours for the duration of your charter.',
    maxQuantity: 2,
    features: ['Age 12+', 'Fully charged', '1-2 hour battery', 'Max 2 per charter', 'Yours for the duration of charter']
  },
  {
    id: 'flitescooter',
    name: 'Flitescooter',
    price: 499,
    depositPrice: 99,
    description: 'Enhance your yacht charter experience with a Flitescooter board! Electric hydrofoil surfboard for an unforgettable water experience.',
    details: 'Instructor available upon request for additional charge. Comes fully charged, batteries last 1-2 hours. Max load 225lbs. Yours for the duration of your charter.',
    maxQuantity: 1,
    features: ['Max load 225lbs', 'Instructor available', '1-2 hour battery', 'Max 1 per charter', 'Yours for the duration of charter']
  },
  {
    id: 'water-sports-boat',
    name: 'Water Sports Boat',
    description: 'Dedicated watersports boat with wakeboarding, water skiing, and tubing. Accommodates up to six guests.',
    details: '$300 per hour. Operated independently by professional vendor. Activities subject to provider requirements.',
    requiresWaiver: true,
    features: ['Up to 6 guests', 'Wakeboarding', 'Water skiing', 'Tubing'],
    sizes: {
      '2-hours': { duration: '2 Hours', price: 600 },
      '3-hours': { duration: '3 Hours', price: 900 },
      '4-hours': { duration: '4 Hours', price: 1200 }
    }
  },
  {
    id: 'floating-cabana',
    name: 'Floating Cabana',
    price: 349,
    description: 'Spacious floating oasis with plush seating and ample space for sunbathing, drinks, and dining.',
    details: 'Perfect for groups. Anchored behind your yacht. Stable and safe design. Yours for the duration of your charter.',
    features: ['Plush seating', 'Sunbathing space', 'Stable design', 'Multiple available', 'Yours for the duration of charter']
  },
  {
    id: 'floating-lounge-chair',
    name: 'Floating Lounge Chair',
    price: 199,
    pricePerChair: 99,
    description: 'Luxurious floating lounge chairs designed for ultimate relaxation on the water.',
    details: 'Each chair is $99. Two chair minimum for delivery and setup. Yours for the duration of your charter.',
    minQuantity: 2,
    features: ['$99 per chair', '2 chair minimum', 'Premium comfort', 'Perfect for groups', 'Yours for the duration of charter']
  },
  {
    id: 'jet-ski',
    name: 'Jet Ski',
    description: 'Premium jet ski rental for thrilling water exploration.',
    details: 'Must be born on or after January 1, 1988. Must have successfully completed a National Association of State Boating Law Administrators approved boating safety course. Valid ID required. Instruction available. 48 hours notice required.',
    features: ['Born on/after 1/1/88', 'Boating safety course required', 'Valid ID required'],
    licenseLink: 'https://checkinmyc.com/PWCLicense',
    sizes: {
      '1ski-2hours': { option: '1 Ski / 2 Hours', price: 320 },
      '2skis-1hour': { option: '2 Skis / 1 Hour', price: 320 },
      '2skis-2hours': { option: '2 Skis / 2 Hours', price: 640 }
    }
  },
  {
    id: 'flyboard',
    name: 'Flyboard Experience',
    description: 'Fly above the water with this incredible water-powered jetpack experience. Includes instructor and all equipment.',
    details: '$450 per hour. Prior experience not required.',
    features: ['Instructor included', 'All equipment provided', 'Beginner friendly'],
    sizes: {
      '1-hour': { duration: '1 Hour', price: 450 },
      '2-hours': { duration: '2 Hours', price: 900 }
    }
  }
];

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'Water Toys';

export async function GET() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return NextResponse.json(
      { error: 'Missing Airtable credentials' },
      { status: 500 }
    );
  }

  const results = {
    created: [],
    updated: [],
    errors: []
  };

  for (const toy of waterToysData) {
    try {
      const record = {
        'Product ID': toy.id,
        'Name': toy.name,
        'Description': toy.description,
        'Details': toy.details || '',
        'Price': toy.price || null,
        'Deposit Price': toy.depositPrice || null,
        'Price Per Chair': toy.pricePerChair || null,
        'Max Quantity': toy.maxQuantity || null,
        'Min Quantity': toy.minQuantity || null,
        'Features': toy.features ? toy.features.join('\n') : '',
        'Requires Waiver': toy.requiresWaiver || false,
        'License Link': toy.licenseLink || '',
        'Sizes': toy.sizes ? JSON.stringify(toy.sizes, null, 2) : ''
      };

      // Check if exists
      const searchUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}?filterByFormula={Product ID}='${toy.id}'`;
      const searchResponse = await fetch(searchUrl, {
        headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
      });
      
      const searchData = await searchResponse.json();

      if (searchData.records && searchData.records.length > 0) {
        // Update
        const existingId = searchData.records[0].id;
        const updateUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}/${existingId}`;
        
        const updateResponse = await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fields: record })
        });

        if (updateResponse.ok) {
          results.updated.push(toy.name);
        } else {
          const error = await updateResponse.json();
          results.errors.push({ name: toy.name, error: error.error });
        }
      } else {
        // Create
        const createUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;
        
        const createResponse = await fetch(createUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fields: record })
        });

        if (createResponse.ok) {
          results.created.push(toy.name);
        } else {
          const error = await createResponse.json();
          results.errors.push({ name: toy.name, error: error.error });
        }
      }

      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 220));

    } catch (error: any) {
      results.errors.push({ name: toy.name, error: error.message });
    }
  }

  return NextResponse.json({
    success: true,
    summary: {
      created: results.created.length,
      updated: results.updated.length,
      errors: results.errors.length
    },
    details: results
  });
}
