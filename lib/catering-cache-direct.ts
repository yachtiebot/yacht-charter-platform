/**
 * DIRECT Airtable fetch - NO CACHE, NO SAFETY
 * For development/testing only
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const CATERING_TABLE_ID = 'tblcB6VXbUoXXBnPH';

export async function getCateringWithCache() {
  console.log('→ Fetching DIRECT from Airtable (no cache, no safety)');
  
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CATERING_TABLE_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
      cache: 'no-store' // Force fresh every time
    }
  );
  
  if (!response.ok) {
    throw new Error(`Airtable error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Filter to active products
  const activeProducts = data.records.filter((record: any) => 
    record.fields && record.fields.Status === 'Active'
  );
  
  // Transform to website format
  const catering = activeProducts.map((record: any) => {
    const fields = record.fields;
    
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
      tags: fields['Tags'] || [],
      price: fields['Base Price'] || (options[0]?.price),
      image: fields['Image URL'] || '',
      options: options,
      minQuantity: 2
    };
  });
  
  console.log(`✓ Fetched ${catering.length} catering items directly from Airtable`);
  
  return { catering };
}
