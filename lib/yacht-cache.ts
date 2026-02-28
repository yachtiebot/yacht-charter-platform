/**
 * Yacht Data Cache Layer
 * 
 * Provides resilient data fetching with:
 * - 15-minute cache revalidation
 * - Fallback to stale data on Airtable failure
 * - Static fallback data for emergencies
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID!;

// Static fallback data (updated periodically)
const FALLBACK_YACHTS = [
  {
    id: 'rec1',
    fields: {
      'Yacht ID': '37-Axopar',
      'Boat Name': '37 ft Axopar',
      'Boat Type': 'Day Boat',
      'Brand': 'Axopar',
      'Model': '37 Sun Top',
      'Length in Feet': 37,
      'Maximum Passengers': 12,
      'Main Departure Location': 'Miami Beach',
      'Show on Website?': true,
      '2-Hour Price': 900,
      '3-Hour Price': 1200,
      '4-Hour Price': 1500,
      '5-Hour Price': 1800,
      '6-Hour Price': 2100,
      '7-Hour Price': 2400,
      '8-Hour Price': 2700,
    }
  },
  {
    id: 'rec2',
    fields: {
      'Yacht ID': '27-Regal',
      'Boat Name': '27 ft Regal',
      'Boat Type': 'Day Boat',
      'Brand': 'Regal',
      'Model': '2700',
      'Length in Feet': 27,
      'Maximum Passengers': 10,
      'Main Departure Location': 'Miami Beach',
      'Show on Website?': true,
      '2-Hour Price': 600,
      '3-Hour Price': 800,
      '4-Hour Price': 1000,
      '5-Hour Price': 1200,
      '6-Hour Price': 1400,
      '7-Hour Price': 1600,
      '8-Hour Price': 1800,
    }
  },
  {
    id: 'rec3',
    fields: {
      'Yacht ID': '116-Pershing',
      'Boat Name': '116 ft Pershing',
      'Boat Type': 'Superyacht',
      'Brand': 'Pershing',
      'Model': '116',
      'Length in Feet': 116,
      'Maximum Passengers': 12,
      'Main Departure Location': 'Miami',
      'Show on Website?': true,
      '2-Hour Price': 16700,
      '3-Hour Price': 16700,
      '4-Hour Price': 16700,
      '5-Hour Price': 17800,
      '6-Hour Price': 19000,
      '7-Hour Price': 20200,
      '8-Hour Price': 21400,
    }
  }
];

// In-memory cache (survives between requests in same process)
let cachedData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 0; // No cache - instant updates for development

export async function getYachtsWithCache() {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('✓ Serving from memory cache');
    return cachedData;
  }
  
  // Try to fetch fresh data from Airtable
  try {
    console.log('→ Fetching fresh data from Airtable');
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 0 } // No cache - instant updates for development
      }
    );
    
    if (!response.ok) {
      throw new Error(`Airtable responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter to active yachts only
    const activeYachts = data.records.filter((record: any) => 
      record.fields['Show on Website?'] === true
    );
    
    // Enhance with Supabase photo URLs
    const enhancedYachts = enhanceWithPhotos(activeYachts);
    
    // Update cache
    cachedData = { yachts: enhancedYachts };
    cacheTimestamp = now;
    
    console.log(`✓ Fresh data cached (${enhancedYachts.length} yachts)`);
    return cachedData;
    
  } catch (error) {
    console.error('✗ Airtable fetch failed:', error);
    
    // Fallback 1: Return stale cache if available
    if (cachedData) {
      console.log('⚠ Serving stale cache data');
      return cachedData;
    }
    
    // Fallback 2: Return static fallback data
    console.log('⚠ Serving static fallback data');
    const enhancedFallback = enhanceWithPhotos(FALLBACK_YACHTS);
    return { yachts: enhancedFallback };
  }
}

function enhanceWithPhotos(yachts: any[]) {
  const supabaseBaseUrl = 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos';
  const photoMapping: { [key: string]: number } = {
    '116-Pershing': 46,
    '100-Skipperliner': 15,  // 15 gallery images + hero (16 total) - from PDF
    '37-Axopar': 13,
    '27-Regal': 15,
    '27-Monterey-Black': 16,
    '27-Monterey-Blue': 12,
    '29-Sea-Ray': 16
  };
  
  // Amenity checkbox field mapping (Airtable checkboxes → website array)
  const amenityMapping: { [key: string]: string } = {
    'Amenities: Air Conditioning': 'Air-conditioning',
    'Amenities: BBQ Grill': 'Barbecue Grill',
    'Amenities: Satellite TV': 'Satellite TV',
    'Amenities: StarLink': 'Starlink',
    'Amenities: WiFi': 'Wi-Fi',
    'Amenities: Tender': 'Tender',
    'Amenities: Jacuzzi': 'Jacuzzi',
    'Amenities: Wet Bar': 'Wet Bar',
    'Amenities: Kitchen': 'Kitchen'
  };
  
  // Toy checkbox field mapping (Airtable checkboxes → website array)
  const toyMapping: { [key: string]: string } = {
    'Water Toys: Inflatables': 'Inflatables',
    'Water Toys: Floating Island Mat': 'Floating Island Mat',
    'Water Toys: Waterslide': 'Waterslide',
    'Water Toys: Jet Ski': 'Jet Ski',
    'Water Toys: SeaBob': 'SeaBob',
    'Water Toys: Paddleboard': 'Paddleboard',
    'Water Toys: Kayak': 'Kayak',
    'Water Toys: Snorkel Gear': 'Snorkel Gear'
  };
  
  return yachts.map((yacht: any) => {
    const yachtId = yacht.fields['Yacht ID'];
    const photoCount = photoMapping[yachtId] || 0;
    
    // Add Supabase photo URLs
    if (photoCount > 0) {
      yacht.fields['Supabase Hero URL'] = `${supabaseBaseUrl}/${yachtId}/Miami_Yachting_Company_${yachtId}_hero.webp`;
      yacht.fields['Supabase Gallery URLs'] = Array.from(
        { length: photoCount },
        (_, i) => `${supabaseBaseUrl}/${yachtId}/Miami_Yachting_Company_${yachtId}_${String(i + 1).padStart(2, '0')}.webp`
      );
    }
    
    // Convert checkbox amenities to array AND mirror to Features: fields for detail page
    const amenities: string[] = [];
    Object.keys(amenityMapping).forEach(field => {
      if (yacht.fields[field] === true) {
        amenities.push(amenityMapping[field]);
        
        // Also set Features: field for detail page compatibility
        const featureField = field.replace('Amenities:', 'Features:');
        yacht.fields[featureField] = true;
      }
    });
    if (amenities.length > 0) {
      yacht.fields['amenities'] = amenities;
    }
    
    // Convert checkbox toys to array
    const toys: string[] = [];
    Object.keys(toyMapping).forEach(field => {
      if (yacht.fields[field] === true) {
        toys.push(toyMapping[field]);
      }
    });
    if (toys.length > 0) {
      yacht.fields['toys'] = toys;
    }
    
    // Build features array from Features: boolean fields (for above-the-line display)
    const features: string[] = [];
    
    // Bars
    if (yacht.fields['Features: Bar']) {
      const numBars = yacht.fields['Features: Number of Bars'];
      if (numBars && numBars > 0) {
        features.push(numBars === 1 ? '1 Bar' : `${numBars} Bars`);
      } else {
        features.push('Bar');
      }
    }
    
    // Kitchen
    if (yacht.fields['Features: Kitchen']) {
      const isCommercial = yacht.fields['Features: Commercial Kitchen'];
      features.push(isCommercial ? 'Commercial Kitchen' : 'Kitchen');
    }
    
    // TVs
    const numTVs = yacht.fields['Features: Number of TVs'];
    if (numTVs && numTVs > 0) {
      features.push(numTVs === 1 ? '1 TV' : `${numTVs} TVs`);
    }
    
    // Staterooms
    const numStaterooms = yacht.fields['Features: Number of Staterooms'];
    if (numStaterooms && numStaterooms > 0) {
      features.push(numStaterooms === 1 ? '1 Stateroom' : `${numStaterooms} Staterooms`);
    }
    
    if (features.length > 0) {
      yacht.fields['features'] = features;
    }
    
    return yacht;
  });
}
