/**
 * Catering Data Cache Layer
 * 
 * Provides resilient data fetching with:
 * - 15-minute cache revalidation
 * - Fallback to stale data on Airtable failure
 * - Static fallback data for emergencies
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const CATERING_TABLE_ID = 'tblcB6VXbUoXXBnPH'; // Catering table

// Static fallback data (from products-complete.json)
const FALLBACK_CATERING = [
  {
    id: 'gourmet-wraps',
    name: 'Gourmet Wraps Platter',
    category: 'sandwiches',
    price: 69.99,
    description: 'Made fresh to order, includes lettuce and tomato',
    options: [
      { label: 'Serves 8', value: '8', price: 69.99 },
      { label: 'Serves 10', value: '10', price: 79.99 },
      { label: 'Serves 15', value: '15', price: 99.99 },
      { label: 'Serves 20', value: '20', price: 129.99 },
      { label: 'Serves 25', value: '25', price: 159.99 }
    ],
    minQuantity: 2
  }
];

// In-memory cache (survives between requests in same process)
let cachedData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute (temporary for development)

export async function getCateringWithCache() {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('✓ Serving catering from memory cache');
    return cachedData;
  }
  
  // Try to fetch fresh data from Airtable
  try {
    console.log('→ Fetching fresh catering data from Airtable');
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CATERING_TABLE_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 60 } // 1 minute (temporary for development)
      }
    );
    
    if (!response.ok) {
      throw new Error(`Airtable responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter to active products only
    const activeProducts = data.records.filter((record: any) => 
      record.fields && record.fields.Status === 'Active'
    );
    
    // Transform to website format
    const catering = activeProducts.map((record: any) => {
      const fields = record.fields;
      
      // Build options from price fields
      const options: any[] = [];
      Object.keys(fields).forEach(key => {
        const match = key.match(/^Price - Serves (\d+)$/);
        if (match && fields[key]) {
          options.push({ 
            label: `Serves ${match[1]}`, 
            value: match[1], 
            price: fields[key] 
          });
        }
      });
      
      // Sort by serving size
      options.sort((a, b) => parseInt(a.value) - parseInt(b.value));
      
      if (options.length === 0 && fields['Base Price']) {
        options.push({ 
          label: 'Base Price', 
          value: 'base', 
          price: fields['Base Price'] 
        });
      }

      return {
        id: fields['Product ID'],
        name: fields['Name'],
        description: fields['Description'] || '',
        category: fields['Category'] || 'platters',
        price: fields['Base Price'] || (options[0]?.price),
        image: fields['Image URL'] || '',
        options: options,
        minQuantity: 2
      };
    });
    
    // Update cache
    cachedData = { catering };
    cacheTimestamp = now;
    
    console.log(`✓ Fresh catering data cached (${catering.length} products)`);
    return cachedData;
    
  } catch (error) {
    console.error('✗ Airtable fetch failed:', error);
    
    // Return stale cache if available
    if (cachedData) {
      console.log('⚠  Serving stale catering cache data');
      return cachedData;
    }
    
    // Last resort: static fallback
    console.log('⚠  Serving static catering fallback data');
    return { catering: FALLBACK_CATERING };
  }
}
